/*
 * 配置登录、注册、修改密码等
 */
var LG = {};

LG.init = function(){
	Config.userJudge();
	// $.getJSON(Config.hostIp+"/AgriculturePreLogin?Option=Request&jsoncallback=?",function(data){
	// 	console.log(data.status);
	// 	var pathMatr = (window.location.pathname.split('/'))[2].split('.');
	// 	if(data.status == 1){
	// 		storage["userauthority"] = data.userAuthority;
	// 		storage["useraccount"] = data.userAccount;
	// 		var xiaoxi = data.newMessage + "messages";
	// 		$("#newsstall").html(xiaoxi);
	// 		Config.userJudge();
	// 	}else{
	// 		if(pathMatr[0] == 'agri_news' || pathMatr[0] == 'agri_newsDetail' || pathMatr[0] == 'bargain' || pathMatr[0] == 'nutrition_match' || pathMatr[0] == 'team'){
	// 			return;
	// 		}else{
	// 			localStorage.clear();
	// 			var pathMatr = (window.location.pathname.split('/'))[2].split('.');
	// //			console.log(pathMatr[0]);
	// 			setTimeout(function(){
	// 				if(pathMatr[0] != "index"){
	// 					window.location.href = "./index.html";
	// 				}
	// 			},1000);
	// 		}
	// 	}
	// });
}

//顶部登录按钮
LG.topLogin = function(){
	LG.emptyForm($('#loginForm'));
	$('#messInfo').text("");
	$('.login-header').show();
	$('.register-header').hide();
	$('.changePwd-part').hide();
	$('#login-btn').show();
	$('.regis-part').hide();
	$('form .checkbox').show();
	$('.register-footer').show();
}

//顶部注册按钮
LG.topRegister = function(){
	LG.emptyForm($('#loginForm'));	
	$('#messInfo').text("");	
	$('.login-header').hide();
	$('.changePwd-part').hide();	
	$('.register-header').show();
	$('#login-btn').hide();
	$('.regis-part').show();
	$('form .checkbox').hide();
	$('.register-footer').hide();
}

//模态框底部登录
LG.bottomLogin = function(){
	LG.topLogin();
}

//模态框底部注册
LG.bottomRegister = function(){
	LG.topRegister();
}

//用户登录
LG.userLogin = function(){
	var userAccount = $('#userAccount').val();
	var userPwd = $('#userPwd').val();
	var reg = /^\s+$/g ;
	if(userAccount.length == 0 || userAccount.match(reg)) {
			alertMsg("Please Input Username！");
			$("#userAccount").val("");
			$("#userAccount").focus();
			return;
	}
	if(userPwd.length == 0 || userPwd.match(reg)) {
			alertMsg("Please Input Password！");
			$("#userPwd").val("");
			$("#userPwd").focus();
			return;
	}
//	var data = {
//		userAccount: userAccount,
//		userPwd: userPwd
//	}
	
	//将用户密码加密
	var md5Pwd = $.md5(userPwd);
	console.log(md5Pwd);
	try {
		$.ajaxSetup({
		    error: function (x, e) {
		        alertMsg("Server Error！");
		        return false;
		    }
		});
		$.get(Config.hostIp+"/signin?Name=" + userAccount + "&Password=" + md5Pwd + "&jsoncallback=?",function(data){
//	        console.log(data.userauthority);    
	        if(data.status == 1){
	        	alertMsg('Login Successfully！');
				//localstorage存储用户信息
				
	        	storage["useraccount"] = data.useraccount;
	        	storage["userauthority"] = data.userauthority;
	        	storage["userid"] = data.userid;
	        	storage["useridentification"] = data.useridentification;
	        	storage["username"] = data.username;
	        	storage["userphone"] = data.userphone;

                $.get(Config.hostIp+"/getmessage?",function (data) {
                    console.log(data.newMessage);
                    storage["xiaoxi"] = data.newMessage;
                })
       	
	        	setTimeout(function () {
	        		Config.userJudge();	        		
					$('#messInfo').text('');
					$('#myModal').modal('hide');
//					location.reload();
	        	},1400);

                //
	        	// $.getJSON(Config.hostIp+"/AgriculturePreLogin?Option=Create&userAccount=" + userAccount + "&userPwd=" + md5Pwd + "&userAuthority=" + storage["userauthority"] + "&jsoncallback=?",function(data1){
	        	// 	var xiaoxi = data1.newMessage + "条消息";
					// $("#newsstall").html(xiaoxi);
	        	// });
	        }else{
	        	alertMsg('Login Error，Wrong Username or Password！');
	        }
		});
	}
	catch (ex) {
        alertMsg("服务器错误！22");
  }
}
//用户注册
LG.userRegister = function(){	
	var userAccount = $('#userAccount').val();
	var userPwd = $('#userPwd').val();
	var userName = $('#userName').val();
	var userIdentification = $('#userIdentification').val();	
	var userPhone = $('#userPhone').val();
	var reg = /^\s+$/g ;	
	var regIden = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	var regPhone = /^1[34578]\d{9}$/;
	if(userAccount.length == 0 || userAccount.match(reg)) {
			alertMsg("Please Input Username！");
			$("#userAccount").val("");
			$("#userAccount").focus();
			return;
	}
	if(userPwd.length == 0 || userPwd.match(reg)) {
			alertMsg("Please Input Password！");
			$("#userPwd").val("");
			$("#userPwd").focus();
			return;
	}
	if(userName.length == 0 || userName.match(reg)) {
			alertMsg("Please Input Name！");
			$("#userName").val("");
			$("#userName").focus();
			return;
	}
	if(userIdentification.length == 0 || userIdentification.match(reg) || (regIden.test(userIdentification) == false)) {
			alertMsg("Please Input Valid ID！");
			$("#userIdentification").val("");
			$("#userIdentification").focus();
			return;
	}
	if(userPhone.length == 0 || userPhone.match(reg) || (regPhone.test(userPhone) == false)) {
			alertMsg("Please Input Valid Phone Number！");
			$("#userPhone").val("");
			$("#userPhone").focus();
			return;
	}
	var md5Pwd = $.md5(userPwd);
	$.get(Config.hostIp+"/signup?userAccount=" + userAccount + "&userPwd=" + md5Pwd + "&userName=" + userName + "&userIdentification=" + userIdentification + "&userPhone=" + userPhone + "&jsoncallback=?",function(data){
        console.log(data);
        console.log(1);
        if(data.status == 1){
        	alertMsg("Successful，Please Login！");
        	LG.topLogin();
        }else{
			alertMsg("Registration Error！");
        }
  	});
}

//打开修改密码模态框
LG.changePwd = function(){
	$('.login-header').hide();
	$('.login-part').hide();
	$('.regis-part').hide();	
	$('.bothFooter').hide();
	$('.changePwd-part').show();	
	$('.register-header').hide();
	$('#myModal').modal('show');
}
//修改密码
LG.confirmChange = function(){
	var userOldPwd = $('#userOldPwd').val();
	var userNewPwd = $('#userNewPwd').val();
	var reg = /^\s+$/g ;
	if(userOldPwd.length == 0 || userOldPwd.match(reg)) {
			alertMsg("Please enter original password！");
			$("#userOldPwd").val("");
			$("#userOldPwd").focus();
			return;
	}
	if(userNewPwd.length == 0 || userNewPwd.match(reg)) {
			alertMsg("Please enter new password！");
			$("#userNewPwd").val("");
			$("#userNewPwd").focus();
			return;
	}
	var md5OldPwd = $.md5(userOldPwd);
	var md5NewPwd = $.md5(userNewPwd);
	$.getJSON(Config.hostIp+"/AgricultureChangePW?userAccount=" + storage["useraccount"] + "&userOldPwd=" + md5OldPwd + "&userNewPwd=" + md5NewPwd + "&jsoncallback=?",function(data){
		console.log(data);
		if(data.status == 1){
			alertMsg('Successful Edit！');
			setTimeout(function () {
				$('#myModal').modal('hide');
	//					location.reload();
	    	},1500);
	    }else{
	    	alertMsg('Edit Error!');
	    }
	});
}
//退出账号
LG.logoutAccount = function(){
	// $.getJSON(Config.hostIp+"/AgriculturePreLogin?Option=Delete&jsoncallback=?",function(data){
        localStorage.clear();
		// console.log(data.status);
		// if(data.status == 1){
		// 	localStorage.clear();
		location.reload();
		// }
	// });
}
//取消修改
LG.cancelChange = function(){
	$('#myModal').modal('hide');	
}
//清空表单
LG.emptyForm = function(formObj){
    $(formObj).find("input").each(function() {
        var $item = $(this);
        $item.val("");
    });
}

LG.init();
