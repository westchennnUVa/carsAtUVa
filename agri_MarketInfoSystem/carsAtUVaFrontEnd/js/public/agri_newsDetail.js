/*
 * 具体新闻内容
 */

var ANDetail = {};
var keyword;
var keyDate;
var ajaxUrl;
var maxwidth = 48;	//限制显示最大字数
var flagActive = 0;
var flagID = "01";
var NewsID = "1";
var userID;

ANDetail.init = function(){
	Config.userJudge();
	ANDetail.loadData();
}

ANDetail.loadData = function(){
	var $url = location.search;//获取url中"?"符后的字串
    var $urlMatr = $url.split("=");   
	console.log($urlMatr);    
    var newsid = $urlMatr[1];
    if(newsid == undefined){
    	window.location.href="./agri_news.html";
    }
	$.getJSON(Config.hostIp+"/AgricultureNewsDetail?NewsID=" + newsid + "&jsoncallback=?",function(data1){
		var news = data1.data;
   		ANDetail.loadNewsDeatail(news);
   });
}

ANDetail.loadNewsDeatail = function(news){
	var newsDetailDiv = $("<div class=\"news\"></div>");
	$(".news").html("");
	if(news.length <= 0) {
		var blank_ul = "";
        blank_ul += "<div style=\"margin-top: 50px;min-height: 460px;color: #777;text-align: center;padding-top: 40px;background: rgba(237, 255, 97, 0.24);font-size: 22px\">暂无相关内容</div>";
		newsDetailDiv.append(blank_ul);
	} else {
		var navBarDiv = $("<div class=\"navBar\"></div>");
		var navBar_h2 = $("<h2 class=\"news_header\">" + news.newsheader + "</h2>");
		var navBar_p = $("<p class=\"news_publishDate\">" + news.newsdate + "</p>");
		var news_contentDiv = $("<div class=\"news_content\">" + news.newscontext + "</div>");		
		var news_writerDiv = $("<div class=\"news_writer\"></div>");				
		var news_writer_p = $("<p>Editor：" + news.username + "</p>");
		navBarDiv.append(navBar_h2);
		navBarDiv.append(navBar_p);
		news_writerDiv.append(news_writer_p);
		
		newsDetailDiv.append(navBarDiv);
		newsDetailDiv.append(news_contentDiv);
		newsDetailDiv.append(news_writerDiv);
		//在搜索栏上选中该条新闻的月份
		var month; 
		var dateMatr = news.newsdate.split('-');	
//		if(parseInt(dateMatr[1]) < 10){
//			month = dateMatr[1].substring(1);
//		}else{
			month = dateMatr[1];
//		}
		$('.sideMenu input.btn').each(function(){
//			console.log($(this).attr('value'));
			if($(this).attr('id') == month){
				$(this).addClass('btn-search-active');
			}
		});
	}
	$(".single-page").children("div.news").replaceWith(newsDetailDiv); 	
}

//按月份搜索
$(".btn-search").click(function () {
	var btnId = $(this).attr('id');	
	location.href = "agri_news.html?btnId=" + btnId;
})

//按关键字搜索
$("#keyword-search").click(function () {
	var keyword = $('#keyword-text').val();
//	var newsText = $('.news_header').prop("innerHTML");
	var newsText = $('.news').text();
//	var text1 = $("h3").contents().filter(function() { return this.nodeType === 3; }).text(); 
	console.log(newsText);	
})

//返回新闻列表页面
$('#btn-backNewsList').click(function(){
//	window.history.back();
	location.href = "agri_news.html";
})

ANDetail.init();
