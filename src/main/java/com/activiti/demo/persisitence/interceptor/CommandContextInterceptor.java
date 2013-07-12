/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.activiti.demo.persisitence.interceptor;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Tom Baeyens
 */
public class CommandContextInterceptor extends CommandInterceptor {
  
  private final Logger log = LoggerFactory.getLogger(CommandContextInterceptor.class);

  protected CommandContextFactory commandContextFactory;
  protected boolean isContextReusePossible; // For backwards compatibility, the default is 'false'

  public CommandContextInterceptor() {
  }

  public CommandContextInterceptor(CommandContextFactory commandContextFactory) {
    this.commandContextFactory = commandContextFactory;
  }

  public <T> T execute(Command<T> command) {
    
    
    return null;
  }
  
//  public <T> T execute(Command<T> command) {
//    CommandContext context = commandContextFactory.createCommandContext(command);
//
//    try {
//      Context.setCommandContext(context);
//      Context.setProcessEngineConfiguration(processEngineConfiguration);
//      return next.execute(command);
//      
//    } catch (Exception e) {
//      context.exception(e);
//      
//    } finally {
//      try {
//        context.close();
//      } finally {
//        Context.removeCommandContext();
//        Context.removeProcessEngineConfiguration();
//      }
//    }
//    
//    return null;
//  }
  
  public CommandContextFactory getCommandContextFactory() {
    return commandContextFactory;
  }
  
  public void setCommandContextFactory(CommandContextFactory commandContextFactory) {
    this.commandContextFactory = commandContextFactory;
  }


  
  public boolean isContextReusePossible() {
    return isContextReusePossible;
  }

  
  public void setContextReusePossible(boolean isContextReusePossible) {
    this.isContextReusePossible = isContextReusePossible;
  }
  
}
