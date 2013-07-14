
var Stell ;

(function ($, window, undefined){
	
	
  var	framework=undefined;
  
  Stell = function Stell(){
	  if(framework){
		  return framework;
	  }
	  framework = this;
     
	  
	  this.command={
		        
	          //queues a comparison to filter records
	          query:0,
	          
	          //executes all queued commands and filters the records
	          select:1,
	          
	          //performs an immediate action to the query
	          action:2
	      };
	  
	  //common expressions
	  this.exp={
	      //gets each part of a dot notation path
	      get_path:/\./g,
	      
	      //escapes string so it can be used in a regular expression
	      escape_regex:/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g
	  };
	  
	  //common javascript types
	  this.type={
	      nothing:-1,
	      undefined:0,
	      string:1,
	      number:2,
	      array:3,
	      regex:4,
	      bool:5,
	      method:6,
	      datetime:7,
	      object:99
	  };
	  
	  //contains Stell commands and functions
      this.library={
      
          //the current commands in Stell
          commands:{},
          
          //the type comparisons for Stell
          types:{},
      
          //includes a comparison to identify Stell
          addType:function(type, compare) {
              this.library.types[type] = compare;
          },
      
          //adds a command to the jLinq library
          extend:function(commands) {
          
              //convert to an array if not already
              if (!this.util.isType(this.type.array, commands)) {
                  commands = [commands];
              }
              
              //append each method
              framework.util.each(commands, function(command) {
            	  framework.library.commands[command.name] = command;
              });
          
          },
          execute:function(name,args){
        	  framework.library.commands[name](args);
        	  
          }
      };
	  
	  
	  
	  this.util = {
		   toString:function(val) {
	                return val == null ? "" : val.toString();
	            },
			trim:function(value){
	            value = value == null ? "" : value;
	            value = value.toString();
	            
	            //trim the spaces
	            return value.replace(/^\s*|\s*$/g, "");
			},
			getType:function(obj){
				 //check if this even has a value
	            if (obj == null) { return framework.type.nothing; }
	            
	            //check each type except object
	            for (var item in this.library.types) {
	                if (framework.library.types[item](obj)) { return item; }
	            }
	            
	            //no matching type was found
	            return framework.type.object;
			},
			isType:function(type, value){
				 return framework.util.getType(value) == type;
			},
			each:function(collection, action){
				   var index = 0;
	               for(var item in collection){
	                   if (collection.hasOwnProperty(item)) action(collection[item], index++);
	               }
			},
			clone:function(obj){
				  //for arrays, copy each item
	            if (framework.util.isType(framework.type.array, obj)) { 
	                return framework.util.cloneArray(obj);
	            }
	            //for object check each value
	            else if (framework.util.isType(framework.type.object, obj)) {
	                var clone = {};
	                for(var item in obj) {
	                    if (obj.hasOwnProperty(item)) clone[item] = framework.util.clone(obj[item]);
	                }
	                return clone;
	            }
	            //all other types just return the value
	            else {
	                return obj;
	            }
			},
			cloneArray:function(array){
				  var result = [];
	            this.util.each(array, function(item) {
	                result.push(framework.util.clone(item));
	            });
	            return result;
			},
			getPath:function(path){
				 return framework.util.toString(path).split(framework.exp.get_path);
			},
			invoke:function(obj, args){
				 //copy the array to avoid breaking any other calls
                args = args.concat();
                
                //start by getting the path
                var path = args[0];
                
                //find the method and extract the arguments
                var method = framework.util.findValue(obj, path);
                args = framework.util.select(args, null, 1, null);
                
                //if we are invoking a method that hangs off
                //another object then we need to find the value
                path = path.replace(/\..*$/, "");
                var parent = framework.util.findValue(obj, path);
                obj = parent === method ? obj : parent;
                
                //return the result of the call
                try {
                    var result = method.apply(obj, args);
                    return result;
                }
                catch (e) {
                    return null;
                }
			},
			findValue:function(obj, path){
				
				 //start by checking if this is actualy an attempt to 
                //invoke a value on this property
                if (framework.util.isType(framework.type.array, path)) {
                    return this.util.invoke(obj, path);
                    
                }
                //if this referring to a field
                else if (framework.util.isType(framework.type.string, path)) {

                    //get each part of the path
                    path = framework.util.getPath(path);

                    //search for the record
                    var index = 0;
                    while(obj != null && index < path.length) {
                        obj = obj[path[index++]];
                    }
                    
                    //return the final found object
                    return obj;
                    
                }
                //nothing that can be read, just return the value
                else {
                    return obj;
                }
			},
			select:function(collection, action, start, end){
				   //grab the records if there is a range
                start = start == null ? 0 : start;
                end = end == null ? collection.length : end;
                
                //slice the records
                var results = collection.slice(start, end);
                
                //check if this is a mapping method
                if (this.util.isType(framework.type.object, action)) {
                    var map = action;
                    action = function(rec) {
                        
                        //map existing values or defaults
                        var create = {};
                        for (var item in map) {
                            if (!map.hasOwnProperty(item)) continue;
                            create[item] = rec[item]
                                ? rec[item]
                                : map[item];
                        }
                        
                        //return the created record
                        return create;
                    
                    };
                };
                
                //if there is a selection method, use it
                if (this.util.isType(framework.type.method, action)) {
                    for (var i = 0; i < results.length; i++) {
                        var record = results[i];
                        results[i] = action.apply(record, [record]);
                    }
                }
                
                //return the final set of records
                return results;
				
			},
			
			  //performs the correct action depending on the type
            when:function(value, types, state) {

                //get the kind of object this is
                var kind = framework.util.getType(value);
                
                //check each of the types
                for (var item in types) {
                    if (!types.hasOwnProperty(item)) continue;
                    var type = this.type[item];
                    if (type == kind) { 
                        return types[item].apply(state, [value]); 
                    }
                }
                
                //if there is a fallback comparison
                if (types.other) { return types.other.apply(state, [value]); }
                
                //no matches were found
                return null;
            },
			
            //makes a string save for regular expression searching
            regexEscape:function(val) {
                return (val ? val : "").toString().replace(framework.exp.escape_regex, "\\$&");
            },
            
            //matches expressions to a value
            regexMatch:function(expression, source, ignoreCase) {
            
                //get the string value if needed
                if (this.util.isType(framework.type.regex, expression)) {
                    expression = expression.source;
                }
            
                //create the actual expression and match
                expression = new RegExp(framework.util.toString(expression), ignoreCase ? "gi" : "g");
                return framework.util.toString(source).match(expression) != null;
            },
            
          //converts a command to an operator name
            operatorName:function(name) {
                return name.replace(/^\w/, function(match) { return match.toUpperCase(); });
            },
            
            //changes a value based on the type
            compare:function(value, types, state) {
                var result = framework.util.when(value, types, state);
                return result == true ? result : false;
            },
            
            //performs an action to each item in a collection and then returns the items
            grab:function(collection, action) {
                var list = [];
                this.util.each(collection, function(item) {
                    list.push(action(item));
                });
                return list;
            },
            
            //performs an action on each item in a collection
            until:function(collection, action) {
                for(var item = 0, l = collection.length; item < l; item++) {
                    var result = action(collection[item], item + 1);
                    if (result === true) { return true; }
                }
                return false;
            },
            
            //grabs remaining elements from and array
            remaining:function(array, at) {
                var results = [];
                for(; at < array.length; at++) results.push(array[at]);
                return results;
            },
            
            //append items onto a target object
            apply:function(target, source) {
                for(var item in source) {
                    if (source.hasOwnProperty(item)) target[item] = source[item];
                }
                return target;
            },
            
            //performs sorting on a collection of records
            reorder:function(collection, fields, ignoreCase) {

                //reverses the fields so that they are organized
                //in the correct order
                return framework.util._performSort(collection, fields, ignoreCase);
            },
            
            
            //handles actual work of reordering (call reorder)
            _performSort:function(collection, fields, ignoreCase) {
            
                //get the next field to use
                var field = fields.splice(0, 1);
                if (field.length == 0) { return collection; }
                field = field[0];
                
                //get the name of the field and descending or not
                var invoked = framework.util.isType(framework.type.array, field);
                var name = (invoked ? field[0] : field);
                var desc = name.match(/^\-/);
                name = desc ? name.substr(1) : name;
                
                //updat the name if needed
                if (desc) { 
                    if (invoked) { field[0] = name; } else { field = name; }
                }
                
                //IE sorting bug resolved (Thanks @rizil)
                //http://webcache.googleusercontent.com/search?q=cache:www.zachleat.com/web/2010/02/24/array-sort/+zach+array+sort
                
                //create the sorting method for this field
                var sort = function(val1, val2) {
                
                    //find the values to compare
                    var a = this.util.findValue(val1, field);
                    var b = this.util.findValue(val2, field);
                    
                    //default to something when null
                    if (a == null && b == null) { a = 0; b = 0; }
                    else if (a == null && b != null) { a = 0; b = 1; }
                    else if (a != null && b == null) { a = 1; b = 0; }
                    
                    //check for string values
                    else if (ignoreCase && 
                    	this.util.isType(this.type.string, a) && 
                    	this.util.isType(this.type.string, b)) {
                        a = a.toLowerCase();
                        b = b.toLowerCase();
                    }
                    //if there is a length attribute use it instead
                    else if (a.length && b.length) {
                        a = a.length;
                        b = b.length;
                    }
                    
                    //perform the sorting
                    var result = (a < b) ? -1 : (a > b) ? 1 : 0;
                    return desc ? -result : result;
                
                };
                
                //then perform the sorting
                collection.sort(sort);
                
                //check for sub groups if required
                if (fields.length > 0) {
                
                    //create the container for the results
                    var sorted = [];
                    var groups = framework.util.group(collection, field, ignoreCase);
                    this.util.each(groups, function(group) {
                        var listing = fields.slice();
                        var records = framework.util._performSort(group, listing, ignoreCase);
                        sorted = sorted.concat(records);
                    });
                    
                    //update the main collection
                    collection = sorted;
                }
                
                //the final results
                return collection;
            },
            
            //returns groups of unique field values
            group:function(records, field, ignoreCase) {
            
                //create a container to track group names
                var groups = {};
                for(var item = 0, l = records.length; item < l; item++) {
                    //get the values
                    var record = records[item];
                    var alias = framework.util.toString(framework.util.findValue(record, field));
                    alias = ignoreCase ? alias.toUpperCase() : alias;

                    //check for existing values
                    if (!groups[alias]) { 
                        groups[alias] = [record]; 
                    }
                    else {
                        groups[alias].push(record);
                    }
                    
                }
                
                //return the matches
                return groups;
            
            },
            
            //grabs a range of records from a collection
            skipTake:function(collection, action, skip, take) {
            
                //set the defaults
                skip = skip == null ? 0 : skip;
                take = take == null ? collection.length : take;
                
                //check if this will return any records
                if (skip >= collection.length || 
                    take == 0) {
                    return []; 
                }
            
                //return the results
                return framework.util.select(collection, action, skip, skip + take);
            },
            
			 equals:function(val1, val2, ignoreCase) {
	                return this.util.when(val1, {
	                    string:function() {
	                        return this.util.regexMatch(
	                            "^"+this.util.regexEscape(val2)+"$", 
	                            val1, 
	                            ignoreCase); 
	                    },
	                    other:function() { return (val1 == null && val2 == null) || (val1 === val2); }
	                });
	          },
	        //returns the value at the provided index
	        elementAt:function(collection, index) {
	              return collection && collection.length > 0 && index < collection.length && index >= 0 
	                   ? collection[index]
	                   : null;
	         },
		    toArray:function(obj) {
	                var items = [];
	                if (obj.length) {
	                    for (var i = 0; i < obj.length; i++) { items.push(obj[i]); }
	                }
	                else {
	                    for (var item in obj) {
	                        if (obj.hasOwnProperty(item)) items.push(obj[item]);
	                    }
	                }
	                return items;
	         }
	            
	  };
	  
	   //default types
	    framework.library.addType(framework.type.nothing, function(value) { return value == null; });
	    framework.library.addType(framework.type.array, function(value) { return value instanceof Array; });
	    framework.library.addType(framework.type.string, function(value) { return value.substr && value.toLowerCase; });
	    framework.library.addType(framework.type.number, function(value) { return value.toFixed && value.toExponential; });
	    framework.library.addType(framework.type.regex, function(value) { return value instanceof RegExp; });
	    framework.library.addType(framework.type.bool, function(value) { return value == true || value == false; });
	    framework.library.addType(framework.type.method, function(value) { return value instanceof Function; });
	    framework.library.addType(framework.type.datetime, function(value) { return value instanceof Date; });

  };
	
})(jQuery, window, undefined);