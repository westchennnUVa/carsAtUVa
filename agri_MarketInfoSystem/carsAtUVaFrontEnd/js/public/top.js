/*
 * 系统配置|公用js
 */
var storage = window.localStorage;    
var getUseraccount = storage["useraccount"];
var getUserauthority = storage["userauthority"];
var getUserid = storage["userid"];
var getUseridentification = storage["useridentification"];
var getUsername = storage["username"];
var getUserphone = storage["userphone"];
var getUserpw = storage["userpw"];
var getNowPageHtml = storage["nowPageHtml"];
var newsstall = storage["newstall"];
var shenQingXiaoXi = storage["xiaoxi"];

var Config ={
	hostIp:"https://0tsuakdem8.execute-api.us-east-1.amazonaws.com/prod",
	userJudge: function(){
		if(storage["userauthority"] == "administrator"){
			$('.top-consult-btn').hide();
			$('#top-userName').text(storage["useraccount"]);
			$('.top-userInfor').show();
			$('.ordUser-part').hide();
			$('.admin-part').show();
			var xiaoxi = storage["xiaoxi"] + "messages";
			if (storage["xiaoxi"] === 0){
				$("#newsstall").html("null message");
			}else
				$("#newsstall").html(xiaoxi);
		}else if(storage["userauthority"] == "user"){
			$('.top-consult-btn').hide();
			$('#top-userName').text(storage["useraccount"]);
			$('.top-userInfor').show();	
			$('.admin-part').hide();			
			$('.ordUser-part').show();
		}else if(storage["userauthority"] == undefined){
			$('#top-userName').text('');
			$('.top-userInfor').hide();	
			$('.top-consult-btn').show();	
			$('.admin-part').hide();			
			$('.ordUser-part').hide();
		}
	},
	//判断页面
	PageJudge: function(page){
		var myPage;
		if(page == 'productOfUser' || page == 'stall_Infor'){
			if(storage["userauthority"] == 'user'){
				return;
			}else{
				myPage = page;
			}
		}else if(page == 'newsList' || page == 'userList' || page == 'stall-news' || page == 'productList' || page == 'bargin-list'){
			if(storage["userauthority"] == 'administrator'){
				return;
			}else{
				myPage = page;
			}
		}
		window.location.href = "./jumpPage.html?authority=" + myPage;
	}
}

//弹出提示信息
function alertMsg(content) {
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

//将页面名存入localstorage
function storePageHtml(){
	var path = window.location.pathname;
	var urlMatr = path.split('/');
	storage["nowPageHtml"] = urlMatr[2];
}

//文本输入框剩余字数计算
function checkMaxInput(obj,name,maxLen) {
//	var strResult;
	var $obj = $(obj);
//	var maxLen = parseInt(maxLen_str);
	if(obj.value.length > maxLen) { //如果输入的字数超过了限制
		obj.value = obj.value.substring(0, maxLen); //就去掉多余的字
		alertMsg(name + " word limit at " + maxLen + "！");
//		$obj.val('');
		document.execCommand('undo');
		$obj.focus();
	}
}

//文本框输入类型检查
function checkInputType(obj,name){
//	console.log(obj.value);
	var reNum=/^\d*$/;
	if(name == '商品数量' || name == '商品价格' || name == 'pageNo'){
		if(isNaN(obj.value)){
			alertMsg("Please enter valid number！");
			$(obj).val('');
			$(obj).focus();
		}
	}
//	else if(name == '计量单位'){
////		console.log(reNum.test(obj.value))
//		if(!reNum.test(obj.value)){
//			alertMsg("请进行有效输入！");
//			$(obj).val('');
//			$(obj).focus();
//		}else{
//			
//		}
//	}
}

//去掉html标签
function delHtmlTag(str) {
	var title = str.replace(/<[^>]+>/g, "");// 去掉所有的html标记
	if (title.length > 300) {
		title = title.substring(0, 300);
	}
	return title;
}