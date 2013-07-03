<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <div class="row-fluid">
					<div class="span12 center form-area" title="个人信息">					
						<ul>
		<li>
			<label class="red">单据编号：</label>
			
				
					<input type="text" readonly="" value="${billNo}" validate="{required:true}" name="billNo">
		</li>
		<li>
			<label class="red">申请日期：</label>
			
				
					<input type="text" readonly="" value="2013-07-03 15:19:35" validate="{required:true}" id="applyDate" name="applyDate">
				
				
			
			<input type="hidden" value="" name="modifyDate">
		</li>
		<li>
			<label class="red">申请部门：</label>
			<div class="input-append">
			
				
				
					
						
						
							<input type="text" readonly="" value="广州开发组" name="applyOrgName" id="applyOrgName" class="input-medium"><!-- 申请机构名称 -->
							<input type="hidden" maxlength="20" value="0000000035" name="applyOrgId" id="applyOrgId">
						
					
				
			
			<input type="hidden" value="104-0511" name="orgCode" id="orgCode">
			
				
				
					
						
						
							<input type="hidden" value="0000000038" name="formalOrgId" id="formalOrgId">
							<input type="hidden" value="测试组" name="formalOrgName" id="formalOrgName">
						
					
				
			
			<span id="selectApplyOrg" class="add-on"><i class="icon-home"></i></span>
			</div>
		</li>
		<li>
			<label class="red">申请人：</label>
			<div class="input-append">
				
					
					
							<input type="text" readonly="" value="安娜" validate="{required:true}" maxlength="20" id="applyName" name="applyName" class="input-medium">
						<input type="hidden" readonly="" value="104000014" maxlength="20" validate="{required:true}" id="applyAccount" name="applyAccount">
					
				
			<span id="selectApplyAccount" class="add-on"><i class="icon-user"></i></span>
			</div>
		</li>
		<li>
			<label class="red">职务：</label>
			
				
				
					<input type="text" readonly="" value="主任级" validate="{required:true}" id="duty" name="duty">
				
			
		</li>
		<li>
			<label class="red">制单人：</label> 
			
				
				
					<input type="text" readonly="" value="安娜" validate="{required:true}" id="creatorName" name="creatorName"> 
					<input type="hidden" value="104000014" maxlength="20" validate="{required:true}" id="creatorAccount" name="creatorAccount">
				
			
		</li>
	</ul>
					</div>	
				</div>