using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

using CodeSmith.Engine;
using CodeSmith.BaseTemplates;
using CodeSmith.CustomProperties;
using SchemaExplorer;

namespace CSMyBatisBuilder
{




    #region ClassOption

    /// <summary><c>ClassOption</c> is the base class for customizing a C# type.</summary>
    [TypeConverter(typeof(ExpandableObjectConverter))]
    [PropertySerializer(typeof(XmlPropertySerializer))]
    public abstract class ClassOption
    {

        #region Namespace

        private String m_Namespace;

        [Optional]
        [Description("(Recommanded) The namespace of the generated class.")]
        public String Namespace
        {
            get ;
            set { m_Namespace = (value != null) ? value.Trim() : String.Empty; }
        }

        #endregion

        #region Assembly

        private String m_Assembly;

        [Optional]
        [Description("The assembly name, defult to the Namespace.")]
        public String Assembly
        {
            get { return m_Assembly; }
            set { m_Assembly = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region BaseType

        private String m_BaseType;

        [Optional]
        [Description("(Optional) base class name and/or interfance(s).")]
        public String BaseType
        {
            get { return m_BaseType; }
            set { m_BaseType = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region IsPartial

        private const bool m_DefaultIsPartial = true;

        private bool m_IsPartial = m_DefaultIsPartial;

        [Optional]
        [DefaultValue(m_DefaultIsPartial)]
        [Description("(Optional) If to generate a partial class/interface.")]
        public bool IsPartial
        {
            get { return m_IsPartial; }
            set { m_IsPartial = value; }
        }

        #endregion

        #region Usings

        private StringCollection m_Usings = new StringCollection();

        [Optional]
        [Description("Additional namespaces should be imported")]
        public StringCollection Usings
        {
            get { return m_Usings; }
            set { m_Usings = value; }
        }

        #endregion

    }

    #endregion


    #region EntityOption

    [TypeConverter(typeof(ExpandableObjectConverter))]
    [PropertySerializer(typeof(XmlPropertySerializer))]
    public class EntityOption : ClassOption
    {

        public EntityOption() { }

        private const String m_DefaultNameFmt = "{0}";

        private String m_NameFmt = m_DefaultNameFmt;

        [DefaultValue(m_DefaultNameFmt)]
        [Description("The entity class name. The first format arg is the result converted from table name.")]
        public String NameFmt
        {
            get { return m_NameFmt; }
            set { m_NameFmt = CSHelper.Trim(value, true); }
        }

        #region PrefixToTrim

        private String m_PrefixToTrim;

        [Optional]
        [Description("(Optional) The table prefix that will be stripped from the class name.")]
        public String PrefixToTrim
        {
            get { return m_PrefixToTrim; }
            set { m_PrefixToTrim = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region SuffixToTrim

        private String m_SuffixToTrim;

        [Optional]
        [Description("(Optional) The table suffix that will be stripped from the class name.")]
        public String SuffixToTrim
        {
            get { return m_SuffixToTrim; }
            set { m_SuffixToTrim = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region InPascalCase

        private const bool m_DefaultInPascalCase = true;

        private bool m_InPascalCase = m_DefaultInPascalCase;

        [DefaultValue(m_DefaultInPascalCase)]
        [Description("Ensures the class name is in pascal case.")]
        public bool InPascalCase
        {
            get { return m_InPascalCase; }
            set { m_InPascalCase = value; }
        }

        #endregion

        #region InSingular

        private const bool m_DefaultInSingular = false;

        private bool m_InSingular = m_DefaultInSingular;

        [DefaultValue(m_DefaultInSingular)]
        [Description("Removes the last 's' for ensuring the class name is in singular form.")]
        public bool InSingular
        {
            get { return m_InSingular; }
            set { m_InSingular = value; }
        }

        #endregion

    }

    #endregion


    #region MemberOption

    [TypeConverter(typeof(ExpandableObjectConverter))]
    [PropertySerializer(typeof(XmlPropertySerializer))]
    public class MemberOption
    {

        #region PrefixToTrim

        private String m_PrefixToTrim;

        [Optional]
        [Description("(Optional) The column prefix that will be stripped from the property name.")]
        public String PrefixToTrim
        {
            get { return m_PrefixToTrim; }
            set { m_PrefixToTrim = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region SuffixToTrim

        private String m_SuffixToTrim;

        [Optional]
        [Description("(Optional) The column Suffix that will be stripped from the property name.")]
        public String SuffixToTrim
        {
            get { return m_SuffixToTrim; }
            set { m_SuffixToTrim = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region TrimTablePrefix

        private const bool m_DefaultTrimTablePrefix = true;

        private bool m_TrimTablePrefix = m_DefaultTrimTablePrefix;

        [DefaultValue(m_DefaultTrimTablePrefix)]
        [Description("Checks if the column is prefixed with the table name and strips.")]
        public bool TrimTablePrefix
        {
            get { return m_TrimTablePrefix; }
            set { m_TrimTablePrefix = value; }
        }

        #endregion

        #region TrimTableSuffix

        private const bool m_DefaultTrimTableSuffix = true;

        private bool m_TrimTableSuffix = m_DefaultTrimTableSuffix;

        [DefaultValue(m_DefaultTrimTableSuffix)]
        [Description("Checks if the column is prefixed with the class name and strips.")]
        public bool TrimTableSuffix
        {
            get { return m_TrimTableSuffix; }
            set { m_TrimTableSuffix = value; }
        }

        #endregion

        #region TablePrePrefix

        private String m_TablePrePrefix;

        [Description("(Optional) specifies the table prefix that will be trimmed before applying TrimTablePrefix.")]
        public String TablePrePrefix
        {
            get { return m_TablePrePrefix; }
            set { m_TablePrePrefix = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region TablePostSuffix

        private String m_TablePostSuffix;

        [Description("(Optional) specifies the table suffix that will be trimmed before applying TrimTableSuffix.")]
        public String TablePostSuffix
        {
            get { return m_TablePostSuffix; }
            set { m_TablePostSuffix = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region PropInPascalCase

        private const bool m_DefaultPropInPascalCase = true;

        private bool m_PropInPascalCase = m_DefaultPropInPascalCase;

        [DefaultValue(m_DefaultPropInPascalCase)]
        [Description("Ensures the property name in pascal case.")]
        public bool PropInPascalCase
        {
            get { return m_PropInPascalCase; }
            set { m_PropInPascalCase = value; }
        }

        #endregion

        #region PropAccess

        private const MemberAccess M_DefaultPropAccess = MemberAccess.Public;

        private MemberAccess m_PropAccess = M_DefaultPropAccess;

        [DefaultValue(M_DefaultPropAccess)]
        [Description("Gets or sets the visibility of property.")]
        public MemberAccess PropAccess
        {
            get { return m_PropAccess; }
            set { m_PropAccess = value; }
        }

        #endregion

        #region VarInCamelCase

        private const bool m_DefaultVarInCamelCase = true;

        private bool m_VarInCamelCase = m_DefaultVarInCamelCase;

        [DefaultValue(m_DefaultVarInCamelCase)]
        [Description("Ensures the member variable name in camel case.")]
        public bool VarInCamelCase
        {
            get { return m_VarInCamelCase; }
            set { m_VarInCamelCase = value; }
        }

        #endregion

        #region VarPrefix

        private String m_VarPrefix = "m_";

        [Optional]
        [DefaultValue("m_")]
        [Description("(Optional) The prefix of the member variable name.")]
        public String VarPrefix
        {
            get { return m_VarPrefix; }
            set { m_VarPrefix = (value != null) ? value.Trim() : null; }
        }

        #endregion

        #region VarAccess

        private const MemberAccess m_DefaultVarAccess = MemberAccess.Private;

        private MemberAccess m_VarAccess = m_DefaultVarAccess;

        [DefaultValue(m_DefaultVarAccess)]
        [Description("The visibility of member variable.")]
        public MemberAccess VarAccess
        {
            get { return m_VarAccess; }
            set { m_VarAccess = value; }
        }

        #endregion

        #region UseNullable

        private const bool m_DefaultUseNullable = true;

        private bool m_UseNullable = m_DefaultUseNullable;

        [DefaultValue(m_DefaultUseNullable)]
        [Description("Indicates if System.Nullable{T} will be used for columns allow null.")]
        public bool UseNullable
        {
            get { return m_UseNullable; }
            set { m_UseNullable = value; }
        }

        #endregion

    }

    #endregion

    
    
    
    
    
    
    
    
    #region ITableBuilderOption

    /// <summary><c>ITableBuilderOption</c> contains a group of options used by <see cref="TableBuilder"/>.</summary>
    public interface ITableBuilderOption
    {

        /// <summary>Gets the options for data class generation.</summary>
        EntityOption EntityOption { get; }

        /// <summary>Gets the options for property/variable generation.</summary>
        MemberOption MemberOption { get; }

    }
    
    
    
    
    
    #region TableBuilder
    public class TableBuilder:ITableBuilderOption
    {
        public TableBuilder(TableSchema sourceTable, ITableBuilderOption builderOption){
          if (sourceTable == null) throw new ArgumentNullException("sourceTable");
        
        
        
        }
        
        public  IList<ColumnInfo> columns {get ;private set}
        public  IList<ColumnInfo> pkColumns {get ;private set}
        public  IList<ColumnInfo> nonPkColumns {get ;private set}
        public  IList<ColumnInfo> finderColumns {get ;private set}
        public  IList<ColumnInfo> lobColumns {get ;private set}
        public  IList<ColumnInfo> nonLobColumns {get ;private set}
        
        
        private static String GetEntityName(String tableName)
        {
            
        }
    }
    #endregion



    #region Utilities

    public static class CSHelper
    {

        #region GetPascalCase/GetCamelCase

        public static string GetPascalCase(string s)
        {
            char[] delimiters = { '_', ' ' };
            string[] parts = s.Split(delimiters);
            string result = "";
            foreach (string part in parts)
            {
                if (part.Length > 0)
                    result += part.Substring(0, 1).ToUpper() + part.Substring(1);
            }
            return result;
        }

        public static string GetCamelCase(string s)
        {
            String pascalName = GetPascalCase(s);
            return pascalName.Substring(0, 1).ToLower() + pascalName.Substring(1);
        }

        #endregion

        #region StripPrefix/StripSuffix

        public static string StripPrefix(String s, String prefix)
        {
            if ((s != null) && (s.Length > 0) && (prefix != null) && (prefix.Length > 0))
            {
                if (s.StartsWith(prefix))
                    return s.Substring(prefix.Length);
            }
            return s;
        }

        public static string StripSuffix(String s, String suffix)
        {
            if ((s != null) && (s.Length > 0) && (suffix != null) && (suffix.Length > 0))
            {
                if (s.EndsWith(suffix))
                    return s.Substring(0, s.Length - suffix.Length);
            }
            return s;
        }

        #endregion

        #region IsNotBlank/Trim

        public static bool IsNotBlank(String s)
        {
            return (s != null) && (s.Trim().Length > 0);
        }

        /// <summary>Gets a trimmed string.</summary>
        public static String Trim(String s, bool checkNonBlank)
        {
            String result = (s != null) ? s.Trim() : s;
            if ((String.IsNullOrEmpty(s)) && (checkNonBlank))
                throw new ArgumentException("The input string is null, or contains whitespace only!");
            return result;
        }

        #endregion

        #region ToStringArray

        public delegate String StringConverterDelegate(Object o);

        /// <summary>Converts a list of object to an <see cref="String"/> array.</summary>
        public static String[] ToArray(IList list, StringConverterDelegate converter)
        {
            if (list == null) throw new ArgumentNullException("list");
            if (converter == null) throw new ArgumentNullException("converter");
            String[] result = new String[list.Count];
            for (int i = 0; i < list.Count; i++)
            {
                result[i] = converter(list[i]);
            }
            return result;
        }

        #endregion


        #region GetQualifiedName, GetAssemblyQualifiedName
        public static String GetQualifiedName(String className, String ns)
        {
            ns = Trim(ns, false);
            if (!String.IsNullOrEmpty(ns))
                ns = ns + ".";

            return ns + Trim(className, true);
        }

        public static String GetAssemblyQualifiedName(String qualifiedName, String assemblyName)
        {
            String temp = Trim(assemblyName, false);
            if (!String.IsNullOrEmpty(temp))
                return qualifiedName + ", " + temp;
            return qualifiedName;
        }

        #endregion

        #region GetCSharpIdentifier

        public static string GetCSharpIdentifier(String s)
        {
            return s = Trim(s, true).Replace(" ", "");
        }

        #endregion

        #region getCharpVariableType
        public static string GetCSharpVariableType(ColumnSchema column)
        {
            if (column.Name.EndsWith("TypeCode"))
            {
                return column.Name;
            }

            switch (column.DataType)
            {
                case DbType.AnsiString: return "String";
                case DbType.AnsiStringFixedLength: return "String";
                case DbType.Binary: return "Byte[]";
                case DbType.Boolean: return "Boolean";
                case DbType.Byte: return "Byte";
                case DbType.Currency: return "Double";
                case DbType.Date: return "Date";
                case DbType.DateTime: return "Date";
                case DbType.Decimal: return "Double";
                case DbType.Double: return "Double";
                case DbType.Int16: return "Short";
                case DbType.Int32: return "Integer";
                case DbType.Int64: return "Long";
                case DbType.Object: return "Object";
                case DbType.SByte: return "Byte";
                case DbType.Single: return "Float";
                case DbType.String: return "String";
                case DbType.StringFixedLength: return "String";
                case DbType.Time: return "Date";
                case DbType.UInt16: return "Short";
                case DbType.UInt32: return "Integer";
                case DbType.UInt64: return "Long";
                case DbType.VarNumeric: return "Double";
                default:
                    {
                        return "__UNKNOWN__" + column.NativeType;
                    }
            }
        
        }
        #endregion
    }

    #endregion

}