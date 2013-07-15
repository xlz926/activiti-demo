<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
  <script id="processTmpl" type="text/x-jsrender">
                <div data-accordion class="ignore " id="processAttr">
                <div class="group">
                    <h3 style="border: 0px;">
                        <a class='header'><span class="title" style="margin-left: 20px;">基本属性</span></a></h3>
                <ul title="基本属性">
                <li ><label >流程编号</label><input  type="text" data-link="id"/></li>
<li class="span3"><label >流程名称</label><input  id="flowId" type="text" data-link="name" /></li>
 </ul>
                </div>

             
                </div>
              </script>
           

              <script id="activitiTmpl" type="text/x-jsrender">
                 <div data-accordion>
                    <div class="group">
                    <h3 style="border: 0px;">
                <a class='header'><span class="title" style="margin-left: 20px;">基本属性</span></a></h3>
                 <ul>
				       <li><label>活动ID</label><input  type="text" readonly="readonly" data-link="key" /></li>
                       <li><label>活动名称</label><input  type="text" readonly="readonly" data-link="name" /></li>
                        {{if category == "sequenceFlow"}}         
                       <li><label>条件设置</label>
                            <div class='input-append field-group'>
                         <input  type="text" class="input-medium" data-link="conditions"/><span class='add-on'><i class='icon-tags'></i></span></div></li>
                        {{else category == "exclusiveGateway"}}
                        <li><label>默认条件</label>
                          <select id="exclusiveGateway">
               
                          </select>
                          
                              </li>
                        {{/if}}
                  </ul>
                </div>
 					{{if category != "sequenceFlow"}}
                           {{for properties.extensionElements tmpl="#taskListenerTmpl"/}}
                    {{/if}}
                  
        </div>  
              </script>
  
 
              <script id="taskListenerTmpl" type="text/x-jsrender">
          
             <div class="group {{:attr.__class}}"  id="{{:attr.__id}}"   >
                    <h3 style="border: 0px;">
                    <a class='header'><span class="title" style="margin-left: 20px;">{{:attr.__name}}</span></a></h3>
                <ul>
                   {{for activiti_taskListener}}
                      {{if attr.__type=="field-group"}}
                          <li class="{{:attr.__liClass}}"><label>{{:attr.__name}}</label>
                            <div class='input-append field-group'>
                                <input class="input-medium" type="text" data-link="attr.__value" />
                               <span class='add-on'><i class='{{:attr.__class}}'></i></span>
                            </div>
                           </li>
                       {{else attr.__type =="field-radio"}}
                          <li class="{{:attr.__liClass}}"> <label>{{:attr.__name}}</label>
                              <div data-buttonset>
                               {{for attr.__helpName}}  
                                <input type="radio" id="{{:__group}}{{:#index}}"  name="{{:__group}}"  value="{{:__value}}" /><label for="{{:__group}}{{:#index}}" data-link="__name"></label>
                              {{/for}}
                               </div> 
                            </li>
                         {{else attr.__type == "field-select"}}
                          <li class="{{:attr.__liClass}}"> <label>{{:attr.__name}}</label>
                                     <select class="{{:attr.__class}}" id="{{:attr.__id}}">
                                    {{for attr.__helpName}}  
                                    <option   value="{{:__value}}"  data-link="__name"></option>
                                    {{/for}} 
                                   </select>
                             </li>
                        {{else}}
                       <li class="{{:attr.__liClass}}"> 
                            <label>{{:attr.__name}}</label><input class="{{:attr.__class}}" type="text" data-link="activiti_field.activiti_expression" />
                         </li>
                        {{/if}}
                   {{/for}}

  {{for activiti_executionListener}}    
       {{if attr.__type=="field-group"}}
                          <li class="{{:attr.__liClass}}"><label>{{:attr.__name}}</label>
                            <div class='input-append field-group'>
                                <input class="input-medium" type="text" data-link="attr.__value" />
                               <span class='add-on'><i class='{{:attr.__class}}'></i></span>
                            </div>
                           </li>
                       {{else attr.__type =="field-radio"}}
                          <li class="{{:attr.__liClass}}"> <label>{{:attr.__name}}</label>
                              <div data-buttonset>
                               {{for attr.__helpName}}  
                                <input type="radio" id="{{:__group}}{{:#index}}"  name="{{:__group}}"  value="{{:__value}}" /><label for="{{:__group}}{{:#index}}" data-link="__name"></label>
                              {{/for}}
                               </div> 
                            </li>
                         {{else attr.__type == "field-select"}}
                          <li class="{{:attr.__liClass}}"> <label>{{:attr.__name}}</label>
                                     <select class="{{:attr.__class}}" id="{{:attr.__id}}">
                                    {{for attr.__helpName}}  
                                    <option   value="{{:__value}}"  data-link="__name"></option>
                                    {{/for}} 
                                   </select>
                             </li>
                        {{else}}
                       <li class="{{:attr.__liClass}}"> 
                            <label>{{:attr.__name}}</label><input class="{{:attr.__class}}" type="text" data-link="activiti_field.activiti_expression" />
                         </li>
                        {{/if}}
 {{/for}}
                  
                </ul>
                </div>
              </script>




