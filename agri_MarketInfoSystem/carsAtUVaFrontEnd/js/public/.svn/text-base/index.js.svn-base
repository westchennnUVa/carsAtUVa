/*
 * 系统首页
 */

var HP = {};

HP.init = function () {
//	localStorage.removeItem("nowPageHtml");
	Config.userJudge();
	$('#haveAccout').bind("click",HP.haveAccout);
	$('#haveNoAccout').bind("click",HP.haveNoAccout);
}

HP.haveAccout = function(){
	$('div.header-top-social ul.list-inline:first-child a.top-btn')[0].click();
}

HP.haveNoAccout = function(){
	$('div.header-top-social ul.list-inline:first-child a.top-btn')[1].click();
}

HP.storePageHtml = function(){
	var path = window.location.pathname;
	var urlMatr = path.split('/');
	storage["nowPageHtml"] = urlMatr[2];
}

HP.init();
