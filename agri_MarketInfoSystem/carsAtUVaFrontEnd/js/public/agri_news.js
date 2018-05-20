/*
 * 新闻列表
 */

var ANews = {};
var nowpage = 1;
var pageNo;
var totalPage;
var pages;
var previousPage = 0;
var nextPage = 0;
var pageSize = 5;
var keyword;
var keyDate;
var ajaxUrl;
var maxwidth = 48;	//限制显示最大字数
var flagActive = 0;
var flagID = "01";
var flagBtn = 0;

ANews.init = function(){
//	Config.userJudge();
	ANews.loadData(nowpage,keyword,keyDate);
}

ANews.loadData = function(nowpage,keyword,keyDate){
	pageNo = nowpage;
	var $url = location.search;//获取url中"?"符后的字串
    var $urlMatr = $url.split("=");   
    var btnid = $urlMatr[1];
    if(flagBtn == 1){
    	btnid = '';
    }
    if(btnid != undefined && btnid != '' && btnid !=null){
//  	alert(1);
    	keyDate = "2016-" + btnid;
    	$('.sideMenu input.btn').each(function(){
			if($(this).attr('id') == btnid){
				$(this).addClass('btn-search-active');
			}
		});
    	flagBtn = 1;
    	flagActive = 1;
    }
	if((keyword == "" || keyword == null || keyword == undefined) && (keyDate == "" || keyDate == null || keyDate == 'undefined')){
		ajaxUrl = Config.hostIp+"/AgricultureNewsDir?Row=" + pageSize + "&Page=" + pageNo + "&KeyWord=&Date=&jsoncallback=?";
	}else if((keyword == "" || keyword == null || keyword == undefined) && (keyDate != "" && keyDate != null && keyDate != undefined)){
		ajaxUrl = Config.hostIp+"/AgricultureNewsDir?Row=" + pageSize + "&Page=" + pageNo + "&KeyWord=&Date=" + keyDate + "&jsoncallback=?";		
	}else if((keyword != "" && keyword != null && keyword != undefined) && (keyDate == "" || keyDate == null || keyDate == undefined)){
		ajaxUrl = Config.hostIp+"/AgricultureNewsDir?Row=" + pageSize + "&Page=" + pageNo + "&KeyWord=" + keyword + "&Date=&jsoncallback=?";		
	}else{
		ajaxUrl = Config.hostIp+"/AgricultureNewsDir?Row=" + pageSize + "&Page=" + pageNo + "&KeyWord=" + keyword + "&Date=" + keyDate + "&jsoncallback=?";		
	}
	$.getJSON(ajaxUrl,function(data){
// 		console.log(data.data); 
		//总页数
		if(data.status == 1){
			totalPage = Math.ceil(data.RowNum/pageSize);
        	$("#pageMsg").html(pageNo+"/"+totalPage);
        	$("#toPage").val(pageNo);
		}else{
        	$("#pageMsg").html(1+"/"+0);
        	$("#toPage").val(1);        	
		}		
        
        pages = totalPage;
		pageNo = nowpage;
		//上一页
		previousPage = pageNo - 1;
//			console.log("previousPage="+previousPage);
		if(previousPage <= 1){
			previousPage = 1;
		}
		//下一页
		nextPage = pageNo + 1;
//			console.log("nextPage="+nextPage);			
		if(nextPage >= totalPage){
			nextPage = totalPage;
		}
		var list = data.data;
//			console.log(list.length);
         ANews.list(list);
   });
}

ANews.list = function(list){
	var newsDiv = $("<div id=\"newsDiv\"></div>");
	$("#newsDiv").html("");
	if(list.length <= 0) {
		var blank_ul = "";
        blank_ul += "<ul style=\"margin-top: 50px;min-height: 460px;color: #777;text-align: center;padding-top: 40px;background: rgba(237, 255, 97, 0.24);font-size: 22px\">No conteng right now</ul>";
		newsDiv.append(blank_ul);
	} else {
		var temp_ul = $("<ul class=\"ul_control\"></ul>");		
		for(var i = 0; i < list.length; i++) {
			var obj = list[i];
			var temp_li = $("<li></li>");
			var temp_h4 = $("<h4></h4>");
			var temp_a = $("<a href=\"agri_newsDetail.html?newsid=" + obj.newsid + "\" >" + obj.newsheader + "</a>");
			var temp_p = $("<p class=\"content_overflow\">" + delHtmlTag(obj.newscontext) + "</p>");
			var temp_div = $("<div class=\"news-info gradient\"></div>");
			var temp_i = $("<i>" + obj.newsdate + "&nbsp;</i>");
			var temp_button = $("<input type=\"button\" class=\"btn btn-trans\" onclick='ANews.viewDetail(event," + obj.newsid + ")' value=\"更多内容\" />");			
			temp_h4.append(temp_a);
			temp_div.append(temp_i);
			temp_div.append(temp_button);
			temp_li.append(temp_h4);
			temp_li.append(temp_p);
			temp_li.append(temp_div);
			temp_ul.append(temp_li);				
		}
		newsDiv.append(temp_ul);
	}
	$(".news-list").children("div#newsDiv").replaceWith(newsDiv);
	
	//限制字符个数显示省略号
	var $contentOver = $(".content_overflow");
	$("div#newsDiv").find($contentOver).each(function(i) {
		if($(this).text().length > maxwidth) {
			$(this).text($(this).text().substring(0, maxwidth));
			$(this).html($(this).html() + '...');
		}
	});
	$('.sideMenu input.btn').each(function(){
		if($(this).hasClass('btn-search-active')){
			flagActive = 1;
			flagID = $(this).attr('id');
		}
	});
//	console.log(location.reload);
//	location.reload = function(){
//		location.search='';
//	}
}

//查看新闻详情
ANews.viewDetail = function(event,newsid){
	//获取a节点以进行点击事件
	var $a = $(event.srcElement).parent('.news-info').prev('p').prev('h4').children('a');
	console.log($a[0]);
	$a[0].click();
}

/**
 * 翻页
 * @param page
 */
function goPage(page){
    if (page == 'up') {
        if (nowpage == previousPage) {
            return;
        }
        nowpage = previousPage;
    }
    if (page == 'down') {
        if (nowpage == nextPage) {
            return;
        }
        nowpage = nextPage;
    }
    if (page == 'page') {
        if ($('#toPage').val() == '') {
        	alertMsg("Please enter page number");
            return;
        }
        if (isNaN($('#toPage').val())) {
        	alertMsg("Please enter number");
            return;
        }
        if (parseInt($('#toPage').val()) > parseInt(pages)) {
        	alertMsg("Page number should > " + pages);
            return;
        }
        if (parseInt($('#toPage').val()) == nowpage) {
            return;
        } else {
            nowpage = parseInt($('#toPage').val());
        }
    }
    ANews.loadData(nowpage,keyword,keyDate);
}

//按月份搜索
$(".btn-search").click(function () {
//	alert($(this).attr('id'));
//	alert(flagActive);
//	alert(flagID);
	if((flagActive == 0)){
		$('.sideMenu input.btn-search-active').removeClass('btn-search-active');		
		keyDate = "2016-" + $(this).attr('id');
		nowpage = 1;
		$(this).addClass('btn-search-active');
		flagActive = 1;
		flagID = $(this).attr('id');
		ANews.loadData(nowpage,keyword,keyDate);
	}
//	else if((flagActive == 0) && ($(this).attr('id') == '01')){
//		$('.sideMenu input.btn-search-active').removeClass('btn-search-active');
//		keyDate = "";
//		nowpage = 1;		
//		flagActive = 0;
//		ANews.loadData(nowpage,keyword,keyDate);
//	}
	else if(($(this).attr('id') == flagID) && (flagActive == 1)){
		$('.sideMenu input.btn-search-active').removeClass('btn-search-active');
		keyDate = "";
		nowpage = 1;		
		flagActive = 0;
		ANews.loadData(nowpage,keyword,keyDate);		
	}else if(($(this).attr('id') != flagID) && (flagActive == 1)){
		flagActive = 0;
		$('.sideMenu input.btn-search-active').removeClass('btn-search-active');
		keyDate = "2016-" + $(this).attr('id');
		nowpage = 1;
		$(this).addClass('btn-search-active');
		flagActive = 1;
		flagID = $(this).attr('id');
		ANews.loadData(nowpage,keyword,keyDate);
	}
//	}
//	
//	if(flagActive == 0){
//		keyDate = "2016-" + $(this).attr('id');
//		nowpage = 1;
//		$(this).addClass('btn-search-active');
//		flagActive = 1;
//		ANews.loadData(nowpage,keyword,keyDate);
//	}else{
//		flagActive = 0;
//		$('.sideMenu input.btn-search-active').removeClass('btn-search-active');
//		keyDate = "2016-" + $(this).attr('id');
//		nowpage = 1;
//		$(this).addClass('btn-search-active');
//		flagActive = 1;
//		ANews.loadData(nowpage,keyword,keyDate);
//	}	
})

//按关键字搜索
$("#keyword-search").click(function () {
//	alert($(this).attr('id'));
	keyword = $('#keyword-text').val();
	nowpage = 1;
	ANews.loadData(nowpage,keyword,keyDate);
})

//去掉html标签
function delHtmlTag(str) {
	var title = str.replace(/<[^>]+>/g, "");// 去掉所有的html标记
	if (title.length > 300) {
		title = title.substring(0, 300);
	}
	return title;
}

ANews.init();
