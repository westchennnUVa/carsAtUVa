var nowpage = 1;
var pageNo =1;
var totalPage;
var pages;
var previousPage = 0;
var nextPage = 0;
var pageSize = 6;
var identy = 0;
var ajaxurl;
var ceng = 0;
function fenye(page){
	pageNo = ceng*5 + page;
	pagenow = "No."+pageNo+"Page";
	$("#pagenow").html(pagenow);
	$("#gopage").val(pageNo);
	userinfo.loadData();
}
function gopage(){
	var pagenoo = $("#gopage").val();
	var r1 = /[0-9]+/
	if(r1.test(pagenoo))
	{
		pageNo = pagenoo;
		userinfo.loadData();
	}
	else{
		alert(typeof(pagenoo));
	}
	
}
function xiang(a){
	if(a == 1){pageNo = pageNo +1;}
	if(a == 0){if(pageNo >= 1)pageNo = pageNo -1;}
	pagenow = "No."+pageNo+"Page";
	$("#pagenow").html(pagenow);
	$("#gopage").val(pageNo);
	userinfo.loadData();
}
function qian(b){
	if(b == 1){ceng = ceng+1;}
	if(b == 0){if(ceng > 0)ceng = ceng-1;}
	for(var i = 0;i < 6;i++){
		var idn = "#id_" + i;
		$(idn).html(ceng*5+i);
	}
}
$(function(){
	Config.userJudge();
	// var pathMatr = (window.location.pathname.split('/'))[2].split('.');
	// Config.PageJudge(pathMatr[0]);
	userinfo.loadData();
});
function one_edit(one_info){
	console.log(one_info);
	$("#userID").html(one_info);
}
function mar_user(){
	$("#min_identity").html("Administers Info");
	identy ="administrator";
	userinfo.loadData();
	console.log(1);
}
// function bar_user(){
// 	$("#min_identity").html("所有客户信息");
// 		identy = 1;
// 	userinfo.loadData();
// 	console.log(1);
// }
function show_user(){
	$("#min_identity").html("Users Info");
		identy = "user";
	userinfo.loadData();
	// console.log(1);
}
var userinfo={
	loadData:function(){
		ajaxurl = Config.hostIp+"/usermanagement?user_Identy=" + identy + "&jsoncallback=?";
		$.get(ajaxurl,function(data){
		var list = data;
		$("#user-info").html("");
			var strhtml = "";
			for(var i = 0;i <list.length;i++){
				var obj = list[i];
				if(i == 0)
				{
					console.log(i);
					strhtml+="<div class='col-md-3 w3agile'><li><div class='ch-item'><div class='ch-info'><div class='ch-info-front ch-img-1'>"+
					"<div class='information-con' style='color: wheat;'>Name：<span id='user_name'>"+obj.user_name+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Username：<span id='login_name'>"+obj.login_name+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Userauthority：<span id='user_Identy'>"+obj.user_Identy+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Phone：<span id='user_phone'>"+obj.user_phone+"</span></div>"+
					"</div>"+
					"<div class='ch-info-back'><div class='code_style code_title' style='color: wheat;margin-top: 2em;'>ID:</div>"+
										"<span id='user_code' class='code_style' style='display: block;'>"+obj.userID+"</span>"+
					"<div class='button-style'>"+
					"<a href='' data-toggle='modal' data-target='#myModal_do' class='btn btn-primary btn-do' onclick='userinfo.editOneData("+obj.userID+")'><i class='fa fa-edit'></i>Edit</a>"
					if(obj.user_Identy == "user"){
						strhtml+="<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> Delete</button>";
					}
//					"<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> 删除</button>"+
					strhtml+="</div></div></div></div></li></div>";
				}
				if(i == 1)
				{
                    console.log(i);
                    strhtml+="<div class='col-md-3 w3agile'><li><div class='ch-item'><div class='ch-info'><div class='ch-info-front ch-img-2'>"+
                        "<div class='information-con' style='color: wheat;'>Name：<span id='user_name'>"+obj.user_name+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Username：<span id='login_name'>"+obj.login_name+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Userauthority：<span id='user_Identy'>"+obj.user_Identy+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Phone：<span id='user_phone'>"+obj.user_phone+"</span></div>"+
                        "</div>"+
                        "<div class='ch-info-back'><div class='code_style code_title' style='color: wheat;margin-top: 2em;'>ID:</div>"+
                        "<span id='user_code' class='code_style' style='display: block;'>"+obj.userID+"</span>"+
                        "<div class='button-style'>"+
                        "<a href='' data-toggle='modal' data-target='#myModal_do' class='btn btn-primary btn-do' onclick='userinfo.editOneData("+obj.userID+")'><i class='fa fa-edit'></i>Edit</a>"
                    if(obj.user_Identy == "user"){
                        strhtml+="<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> Delete</button>";
                    }
//					"<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> 删除</button>"+
                    strhtml+="</div></div></div></div></li></div>";
				}
				if(i == 2)
				{
                    console.log(i);
                    strhtml+="<div class='col-md-3 w3agile'><li><div class='ch-item'><div class='ch-info'><div class='ch-info-front ch-img-3'>"+
                        "<div class='information-con' style='color: wheat;'>Name：<span id='user_name'>"+obj.user_name+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Username：<span id='login_name'>"+obj.login_name+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Userauthority：<span id='user_Identy'>"+obj.user_Identy+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Phone：<span id='user_phone'>"+obj.user_phone+"</span></div>"+
                        "</div>"+
                        "<div class='ch-info-back'><div class='code_style code_title' style='color: wheat;margin-top: 2em;'>ID:</div>"+
                        "<span id='user_code' class='code_style' style='display: block;'>"+obj.userID+"</span>"+
                        "<div class='button-style'>"+
                        "<a href='' data-toggle='modal' data-target='#myModal_do' class='btn btn-primary btn-do' onclick='userinfo.editOneData("+obj.userID+")'><i class='fa fa-edit'></i>Edit</a>"
                    if(obj.user_Identy == "user"){
                        strhtml+="<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> Delete</button>";
                    }
//					"<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> 删除</button>"+
                    strhtml+="</div></div></div></div></li></div>";
				}
				if(i == 3)
				{
                    console.log(i);
                    strhtml+="<div class='col-md-3 w3agile'><li><div class='ch-item'><div class='ch-info'><div class='ch-info-front ch-img-4'>"+
                        "<div class='information-con' style='color: wheat;'>Name：<span id='user_name'>"+obj.user_name+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Username：<span id='login_name'>"+obj.login_name+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Userauthority：<span id='user_Identy'>"+obj.user_Identy+"</span></div>"+
                        "<div class='information-con' style='color: wheat;'>Phone：<span id='user_phone'>"+obj.user_phone+"</span></div>"+
                        "</div>"+
                        "<div class='ch-info-back'><div class='code_style code_title' style='color: wheat;margin-top: 2em;'>ID:</div>"+
                        "<span id='user_code' class='code_style' style='display: block;'>"+obj.userID+"</span>"+
                        "<div class='button-style'>"+
                        "<a href='' data-toggle='modal' data-target='#myModal_do' class='btn btn-primary btn-do' onclick='userinfo.editOneData("+obj.userID+")'><i class='fa fa-edit'></i>Edit</a>"
                    if(obj.user_Identy == "user"){
                        strhtml+="<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> Delete</button>";
                    }
//					"<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> 删除</button>"+
                    strhtml+="</div></div></div></div></li></div>";
				}
				if(i == 4)
				{
                    console.log(i);
					strhtml+="<div class='col-md-3 col-md-offset-1 w3agile'><li><div class='ch-item'><div class='ch-info'><div class='ch-info-front ch-img-1'>"+
					"<div class='information-con' style='color: wheat;'>Name：<span id='user_name'>"+obj.user_name+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Username：<span id='login_name'>"+obj.login_name+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Userauthority：<span id='user_Identy'>"+obj.user_Identy+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Phone：<span id='user_phone'>"+obj.user_phone+"</span></div>"+
					"</div>"+
					"<div class='ch-info-back'><div class='code_style code_title' style='color: wheat;margin-top: 2em;'>ID：</div>"+
										"<span id='user_code' class='code_style' style='display: block;'>"+obj.userID+"</span>"+
					"<div class='button-style'>"+
					"<a href='' data-toggle='modal' data-target='#myModal_do' class='btn btn-primary btn-do' onclick='userinfo.editOneData("+obj.userID+")'><i class='fa fa-edit'></i>Edit</a>";
					if(obj.user_Identy == "user"){
						strhtml+="<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> Delete</button>";
					}
//					"<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> 删除</button>"+
					strhtml+="</div></div></div></div></li></div>";
				}
				if(i == 5)
				{
                    console.log(i);
					strhtml+="<div class='col-md-4 w3agile'><li><div class='ch-item'><div class='ch-info'><div class='ch-info-front ch-img-2'>"+
					"<div class='information-con' style='color: wheat;'>Name：<span id='user_name'>"+obj.user_name+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Username：<span id='login_name'>"+obj.login_name+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Userauthority：<span id='user_Identy'>"+obj.user_Identy+"</span></div>"+
					"<div class='information-con' style='color: wheat;'>Phone：<span id='user_phone'>"+obj.user_phone+"</span></div>"+
					"</div>"+
					"<div class='ch-info-back'><div class='code_style code_title' style='color: wheat;margin-top: 2em;'>ID:</div>"+
										"<span id='user_code' class='code_style' style='display: block;'>"+obj.userID+"</span>"+
					"<div class='button-style'>"+
					"<a href='' data-toggle='modal' data-target='#myModal_do' class='btn btn-primary btn-do' onclick='userinfo.editOneData("+obj.userID+")'><i class='fa fa-edit'></i>Edit</a>";
					if(obj.user_Identy == "user"){
						strhtml+="<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> Delete</button>";
					}
//					"<button class='btn btn-danger btn-do' onclick='userinfo.deleteData("+obj.userID+")'><i class='fa fa-pencil'></i> 删除</button>"+
					strhtml+="</div></div></div></div></li></div>";
				}
			}
			strhtml+= "<a href='' data-toggle='modal' data-target='#myModal_add' class=''><div class='col-md-3 w3agile'><li><div class='ch-item'><div class='ch-info'><div class='ch-info-front ch-img-3'>"+
					"<div class='information-con' style='color: wheat;'><span class='glyphicon add-con glyphicon-plus add-gly' style='font-size: 10em'></span></div>"+
					"</div>"+
					"<div class='ch-info-back' style='cursor: pointer;'><div class='code_style code_title' style='color: wheat;margin-top: 6em;'>Add new user：</div>"+
					"</div></div></div></li></div></a>";
			$("#user-info").html(strhtml);
			
	})
	},
	editOneData:function(userid){		
		ajaxurl = Config.hostIp+"/AgricultureMasterUserRequest?user_Identy=" + identy + "&Row=" + pageSize + "&Page=" + pageNo + "&jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
		console.log(1);
		var list = data.data;
		$("#user-info").html("");
			var strhtml = "";
			for(var i = 0;i <list.length;i++){
				
				var obj = list[i];
				if(obj.userID == userid){
					$("#userID").html(userid);
					$("#user-name").val(obj.user_name);
					$("#user-login").val(obj.user_name);
					$("#user-Identy").val(obj.user_Identy);
					if(obj.user_Identy == "user")
					{
						$("#euserid").val(1);
					}
					else{
						$("#euserid").val(2);
					}
					
					$("#user-code").val(obj.user_code);
					$("#user-phone").val(obj.user_phone);
					break;
				}
				}
			
			var _tijiao = "<button class='btn btn-default' onclick='userinfo.updata(" + obj.userID + ")'><i class=' fa fa-refresh '></i> Submit</button>";
			
			$("#tijiao").html(_tijiao);
		})
		userinfo.loadData();
		
	},
	updata:function(_userid){
		var _userauthority  = "administer";
		if($('#euserid').val()==1){
			_userauthority = "user";
		}
		if($('#euserid').val() == 2){
			_userauthority = "administer";
		}
		var _userName  = $("#user-name").val();
		var _userIdentification   = $("#user-code").val();
		var _userPhone   = $("#user-phone").val();
		ajaxurl = Config.hostIp+"/AgricultureUpdateUser?userid=" + _userid + "&userauthority=" + _userauthority + "&userName=" + _userName + "&userIdentification=" + _userIdentification + "&userPhone=" + _userPhone + "&jsoncallback=?";		
		$.getJSON(ajaxurl,function(data){
			$('#myModal_do').modal('hide');
		})
		userinfo.loadData();
	},
	deleteData:function(_userid){
		ajaxurl = Config.hostIp+"/AgricultureDeleteUser?userid=" + _userid + "&jsoncallback=?";	
		$.getJSON(ajaxurl,function(data){
			
		})
		userinfo.loadData();	
	},
	adduser:function(){
		var _userAccount = $('#user_login').val();
		var userPwd = $('#user_pss').val();
		var _userName = $('#_username').val();
		var userIdentification = $('#_usercode').val();	
		var userPhone = $('#_userphone').val();
		var identy;
		var userIdenty = "administer";
		if($('#euserid').val()==1){
			userIdenty == "user";
		}
		if($('#euserid').val() == 2){
			userIdenty == "administer";
		}
//		var userIdenty = $('#_useridenty').val();
		var reg = /^\s+$/g ;	
		var regIden = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		var regPhone = /^1[34578]\d{9}$/;
		if(_userAccount.length == 0 || _userAccount.match(reg)) {
				alertMsg("Input username here！");
				$("#user_login").val("");
				$("#user_login").focus();
				return;
		}
		if(userPwd.length == 0 || userPwd.match(reg)) {
				alertMsg("Input password here！");
				$("#user_pss").val("");
				$("#user_pss").focus();
				return;
		}
		if(_userName.length == 0 || _userName.match(reg)) {
				alertMsg("Input name here！");
				$("#_username").val("");
				$("#_username").focus();
				return;
		}
		if(userIdentification.length == 0 || userIdentification.match(reg) || (regIden.test(userIdentification) == false)) {
				alertMsg("Input valid ID here！");
				$("#_usercode").val("");
				$("#_usercode").focus();
				return;
		}
		if(userPhone.length == 0 || userPhone.match(reg) || (regPhone.test(userPhone) == false)) {
				alertMsg("Input valid phone number here！");
				$("#_userphone").val("");
				$("#_userphone").focus();
				return;
		}
		if(userIdenty.length == 0){
				alertMsg("Input useridenty！");
				$("#_useridenty").val("");
				$("#_useridenty").focus();
				return;
		}
		ajaxurl = Config.hostIp+"/AgricultureMasterRegister?userauthority="+ userIdenty +"&userAccount="+ _userAccount + "&userPwd=" + userPwd + "&userName=" + _userName + "&userIdentification=" + userIdentification + "&userPhone=" + userPhone + "&jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
        	userinfo.loadData();
        	$('#myModal_add').modal('hide');
  	})
  
	}
}
function alertMsgMsg(content) {
    // create the notification
	var notification = new NotificationFx({
		message : '<p>' + content + '</p>',
		layout : 'growl',
		effect : 'genie',
		type : 'error', // notice, warning or error
		onClose : function() {}
	});
	// show the notification
	notification.show();
}
	