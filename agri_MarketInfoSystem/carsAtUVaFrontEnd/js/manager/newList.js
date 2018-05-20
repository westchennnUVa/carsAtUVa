/*
 * 资讯管理
 */

var newsMgr = {};
var nowpage = 1;
var pageNo;
var totalPage;
var pages;
var previousPage = 0;
var nextPage = 0;
var pageSize = 4;
var startDate;
var finishDate;
var ajaxUrl;
var maxwidth = 20;	//限制显示最大字数

$(function(){
	Config.userJudge();
	var pathMatr = (window.location.pathname.split('/'))[2].split('.');
	Config.PageJudge(pathMatr[0]);
	newsMgr.loadData(nowpage,startDate,finishDate);
	newsMgr.loadjeDate();
	newsMgr.loadconfirm.save_confirm();
});

//加载新闻数据
newsMgr.loadData = function(nowpage,startDate,finishDate){
	pageNo = nowpage;
	if((startDate == "" || startDate == null || startDate == undefined) && (finishDate == "" || finishDate == null || finishDate == 'undefined')){
		ajaxUrl = Config.hostIp+"/AgricultureMasterNewsDir?Row=" + pageSize + "&Page=" + pageNo + "&DateBegin=&DateEnd=&jsoncallback=?";
	}else if((startDate != "" && startDate != null && startDate != undefined) && (finishDate == "" || finishDate == null || finishDate == undefined)){
		ajaxUrl = Config.hostIp+"/AgricultureMasterNewsDir?Row=" + pageSize + "&Page=" + pageNo + "&DateBegin=" + startDate + "&DateEnd=&jsoncallback=?";
	}else{
		ajaxUrl = Config.hostIp+"/AgricultureMasterNewsDir?Row=" + pageSize + "&Page=" + pageNo + "&DateBegin=" + startDate + "&DateEnd=" + finishDate + "&jsoncallback=?";
	}
	console.log((ajaxUrl));	
	$.get(ajaxUrl,function(data){
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
		if(previousPage <= 1){
			previousPage = 1;
		}
		//下一页
		nextPage = pageNo + 1;
		if(nextPage >= totalPage){
			nextPage = totalPage;
		}
		var list = data;
         newsMgr.list(list);
   });
}
newsMgr.list = function(list){
	var newsDiv = $("<div id=\"new-info\"></div>");
	$("#new-info").html("");
	if(list.length <= 0) {
		var blank_ul = "";
        blank_ul += "<ul style=\"margin-top: 50px;min-height: 460px;color: #777;text-align: center;padding-top: 40px;background: #ddd;font-size: 22px\">暂无相关内容</ul>";
		newsDiv.append(blank_ul);
	} else {
		for(var i = 0; i < list.length; i++) {
			var obj = list[i];
//			console.log(delHtmlTag(obj.newscontext));
			var stringTest = JSON.stringify(obj);
			var temp_div_grid = $("<div class=\"events-grid col-md-6\"></div>");
			var temp_div_month = $("<div class=\"col-md-3 event-month wthree\"><h3 class=\"time news_time\" style=\"margin-bottom: 0.5em;\">" + (obj.newsdate.split('-'))[0] + "</h3><p class=\"time time-month\">" + (obj.newsdate.split('-'))[1] + "月" + (obj.newsdate.split('-'))[2] + "日" + "</p></div>");
			var temp_div_user = $("<div class=\"col-md-2 event-user wthree\" style=\"font-size: 2em;\">" + obj.username + "</div>");
			var temp_div_text = $("<div class=\"col-md-7 event-text left\"></div>");
			var temp_h4 = $("<h4 class=\"news_header\">" + cutStr(obj.newsheader,8) + "</h4>");
			var temp_p = $("<p class=\"news_context content_overflow\">" + delHtmlTag(obj.newscontext) + "</p>");
			var temp_a = $("<a>Read More</a>");
			var temp_btn_del = $("<button class=\"btn btn-danger btn-do\"><i class=\"fa fa-pencil\"></i> Delete</button>");
			var temp_btn_edi = $("<button class=\"btn btn-primary btn-do\"><i class=\"fa fa-edit\"></i> Edit</button>");
			temp_btn_del.bind("click", stringTest, newsMgr.delNews);
			temp_btn_edi.bind("click", stringTest, newsMgr.editNews);
//			temp_a.bind("click", stringTest, newsMgr.lookMore);
			temp_div_text.append(temp_h4);
			temp_div_text.append(temp_p);
//			temp_div_text.append(temp_a);
			temp_div_text.append(temp_btn_del);	
			temp_div_text.append(temp_btn_edi);	
			temp_div_grid.append(temp_div_month);
			temp_div_grid.append(temp_div_user);
			temp_div_grid.append(temp_div_text);		
			newsDiv.append(temp_div_grid);
		}		
	}
	$(".events-main").children("div#new-info").replaceWith(newsDiv);
	
	//限制字符个数显示省略号
	var $contentOver = $(".content_overflow");
	$("div.events").find($contentOver).each(function(i) {
		if($(this).text().length > maxwidth) {
			$(this).text($(this).text().substring(0, maxwidth));
			$(this).html($(this).html() + '...');
		}
	});
}

//创建新闻
newsMgr.createNews = function(){
	$("#btn_cancelEdit").bind("click",newsMgr.cancel);
	$('#section_list').hide();
	$('#section_edit').show();
	$('#title_create').show();
	$('#title_edit').hide();
	$('#section_status').val('create');
	$('#newsEditor').val(storage["username"]);
}

//删除新闻
newsMgr.delNews = function(str){
	var data_obj = JSON.parse(str.data);
	var newsId = data_obj.newsid;
//	console.log(data_obj);
	$.getJSON(Config.hostIp+"/AgricultureMasterNewsDelete?Newsid=" + newsId + "&jsoncallback=?",function(data){
		if(data.status == 1){
//			console.log(data.status);
			alertMsg("新闻“" + cutStr(data_obj.newscontext,10) + "”删除成功！");
			nowpage = 1;
			newsMgr.loadData(nowpage,startDate,finishDate);
		}else{
			alertMsg("删除失败，服务器错误！");
		}
	});
}

//编辑新闻
newsMgr.editNews = function(str){
	var data_obj = JSON.parse(str.data);
	$(".section_foot #btn_cancelEdit").bind("click", str.data, newsMgr.cancelEdit);
	$('#section_list').hide();
	$('#section_edit').show();
	$('#title_create').hide();
	$('#title_edit').show();
	$('#section_status').val('edit');
	$("#newsid").val(data_obj.newsid);
	$('#newsTitle').val(data_obj.newsheader);
	$('#newsTime').val(data_obj.newsdate);
	$('#newsEditor').val(data_obj.username);
//	console.log(data_obj.newscontext);
	$('#summernote').summernote('code', data_obj.newscontext);
	
}

//取消前先判断是否用户是否更改了内容
newsMgr.cancelEdit= function(obj_cancel){
	var data_obj = JSON.parse(obj_cancel.data);		
	var time_val = $("#newsTime").val();		
	var title_val = $("#newsTitle").val();		
	var content_val = $('#summernote').summernote('code');		
	if(data_obj.newsdate == time_val && data_obj.newsheader == title_val && data_obj.newscontext == content_val){
		newsMgr.cancel();
		return;
	}else{
		newsMgr.loadconfirm.cancel_confirm();
		return;
	}
}

//取消保存
newsMgr.cancel = function(){
//	alert(1);
	$('#section_list').show();
	$('#section_edit').hide();
	$("#newsid").val("");
	$("#section_status").val("");
	$("#newsTitle").val("");
	$("#newsTime").val("");
	$("#newsEditor").val("");
	$('#summernote').summernote('reset');
	$(".section_foot #btn_cancelEdit").unbind("click");
}

//保存新闻
newsMgr.saveNews = function(){
	var a_url;
	var newsheader = $("#newsTitle").val();
	var newsdate = $("#newsTime").val();
//	var newsEditor = $("#newsEditor").val();
	var newscontext = $(".note-editable").text();
//	console.log(newscontext);
	var reg = /^\s+$/g ;
	if(newsheader.length == 0 || newsheader.match(reg)) {
		alertMsg("请输入有效的新闻标题！");
		$("#newsTitle").val("");
		$("#newsTitle").focus();
		return;
	}
	if(newsdate.length == 0 || newsdate.match(reg)) {
		alertMsg("请输入有效的新闻时间！");
		$("#newsTime").val("");
		$("#newsTime").focus();
		return;
	}
	if(newscontext == "" || newscontext.match(reg)) {
		alertMsg("请输入有效的新闻内容！");
		$(".note-editable").text("");
		return;
	}
	console.log($('#summernote').summernote('code'));
//	var mystr = $('#summernote').summernote('code').replace(/nbsp;/g, "mysplitstr");
//	console.log(mystr.replace(/"/g, "my$split"));
	
	if($('#section_status').val() == 'edit'){
		a_url = Config.hostIp+"/AgricultureMasterNewsUpdate?newsdate=" + newsdate + "&newsheader=" + newsheader + "&userid=" + storage["userid"] + "&newscontext=" + encodeURIComponent($('#summernote').summernote('code')) + "&newsid=" + $("#newsid").val() + "&Option=Update&jsoncallback=?";
	}else if($('#section_status').val() == 'create'){
		a_url = Config.hostIp+"/AgricultureMasterNewsUpdate?newsdate=" + newsdate + "&newsheader=" + newsheader + "&userid=" + storage["userid"] + "&newscontext=" + encodeURIComponent($('#summernote').summernote('code')) + "&Option=Create&jsoncallback=?";
	}
	$.getJSON(a_url,function(data){
		if(data.status == 1){
			nowpage = 1;
//			startDate = '';
//			finishDate = '';
			newsMgr.loadData(nowpage,startDate,finishDate);
			$('#section_list').show();
			$('#section_edit').hide();
			if($('#section_status').val() == 'edit'){
				$(".section_foot #btn_cancelEdit").unbind("click");
				$('#section_status').val('');
				$("#newsid").val("");
				$("#section_status").val("");
				$("#newsTitle").val("");
				$("#newsTime").val("");
				$("#newsEditor").val("");
				$('#summernote').summernote('reset');
				alertMsg("编辑新闻成功！");
			}else if($('#section_status').val() == 'create'){
				$(".section_foot #btn_cancelEdit").unbind("click");
				$('#section_status').val('');
				$("#newsid").val("");
				$("#section_status").val("");
				$("#newsTitle").val("");
				$("#newsTime").val("");
				$("#newsEditor").val("");
				$('#summernote').summernote('reset');
				alertMsg("创建新闻成功！");
			}
			
		}else{
			if($('#section_status').val() == 'edit'){
				alertMsg("编辑新闻失败，服务器错误！");
			}else if($('#section_status').val() == 'create'){
				alertMsg("创建新闻失败，服务器错误！");
			}
		}
	});
}

//加载jeDate插件
newsMgr.loadjeDate = function(){
	//初始化选取时间插件
	jeDate.skin('gray');
	var start = {
	    dateCell: "#datestart",
	    format:"YYYY-MM",
	    minDate: jeDate.now(0), //设定最小日期为当前日期
	    maxDate: '2099-12 ', //最大日期
	    isTime: false,
	};
	var end = {
	    dateCell: "#datefinish",
	    format:"YYYY-MM",
	    minDate: jeDate.now(0), //设定最小日期为当前日期
	    maxDate: '2099-12 ', //最大日期
	    isTime: false,
	};
	jeDate(start);
	jeDate(end);
	jeDate({
        dateCell: '#newsTime',
        format: "YYYY-MM-DD"
    })
}

//加载confirm插件
newsMgr.loadconfirm = {
	//保存确认
	save_confirm: function(){
		$(".confirm_save").confirm({
			icon: 'glyphicon glyphicon-pencil',
		    content: "是否保存以上内容？",
		    title: "确认提示",
		    backgroundDismiss: false,
		    animation: 'top',
	    	closeAnimation: 'bottom',
		    confirm: function(button) {
		        newsMgr.saveNews();
		    },
		    cancel: function(button) {
		        // nothing to do
		    },
		    confirmButton: "保存内容",
		    cancelButton: "取消保存",
		    post: true,
		    confirmButtonClass: "btn-primary",
		    cancelButtonClass: "btn-default",
		    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
		});
	},
	//取消确认
	cancel_confirm: function(){
		$.confirm({
			icon: 'glyphicon glyphicon-pencil',
		    content: "是否取消编辑内容？",
		    title: "确认提示",
		    backgroundDismiss: false,
		    animation: 'top',
	    	closeAnimation: 'bottom',
		    confirm: function(button) {
		        newsMgr.cancel();
		    },
		    cancel: function(button) {
		        // nothing to do
		    },
		    confirmButton: "我不编辑了",
		    cancelButton: "不！我还要编辑",
		    post: true,
		    confirmButtonClass: "btn-primary",
		    cancelButtonClass: "btn-default",
		    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
		});
	}
}

//按月份搜索
newsMgr.searchByDate = function(){
	var startTime = $("#datestart").val();
	var finishTime = $("#datefinish").val();
//	console.log(startTime);
	if(startTime!=undefined && finishTime!=undefined && startTime!=null && finishTime!=null){
		if(startTime=='' && finishTime==''){
			startDate = '';
			finishDate = '';
		}else if(startTime=='' && finishTime!=''){
			alertMsg("开始日期为空！");
			return;
		}else if(startTime!='' && finishTime==''){
			startDate = startTime;
			finishDate = '';
		}else{
			var s_year = (startTime.split('-'))[0];
			var f_year = (finishTime.split('-'))[0];
			var s_month = (startTime.split('-'))[1];
			var f_month = (finishTime.split('-'))[1];
			if(s_year<f_year){
				startDate = startTime;
				finishDate = finishTime;
			}else if(s_year==f_year){
				if(parseInt(s_month) > parseInt(f_month)){
//					$("#datestart").val("");
//					$("#datefinish").val("");
					alertMsg("开始日期大于截止日期！");
					return;
				}else{
					startDate = startTime + "-01";
					finishDate = finishTime + "-99";
				}
			}else{
//				$("#datestart").val("");
//				$("#datefinish").val("");
				alertMsg("开始日期大于截止日期！");
				return;
			}			
		}
		nowpage = 1;
		newsMgr.loadData(nowpage,startDate,finishDate);
	}else{
		alertMsg("服务器错误！");
	}	
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
    if (page == 'first') {
        if (nowpage == 1) {
            return;
        }
        nowpage = 1;
    }
    if (page == 'last') {
    	console.log(pages);
        if (nowpage == parseInt(pages)) {
            return;
        }
        nowpage = parseInt(pages);
    }
    if (page == 'page') {
        if ($('#toPage').val() == '') {
        	alertMsg("请填入页数");
            return;
        }
        if (isNaN($('#toPage').val())) {
        	alertMsg("请填入数字");
            return;
        }
        if (parseInt($('#toPage').val()) > parseInt(pages)) {
        	alertMsg("填入页数大于" + pages + "页");
            return;
        }
        if (parseInt($('#toPage').val()) == nowpage) {
            return;
        } else {
            nowpage = parseInt($('#toPage').val());
        }
    }
    newsMgr.loadData(nowpage,startDate,finishDate);
}

function getyear(_time){
	var year = _time.substr(0,4);
	return year;
}
function getmonth(_time){
	var month = _time.substring(5,7);
	var day = _time.substring(8,10);
	var mon_day = month + "月"+ day +"日";
	return mon_day;
}
function gethour(_time){
	var hour = _time.substring(11,13);
	var minute = _time.substring(14,16);
	var hou_min = hour +"时"+ minute+ "分";
	return hou_min;
}
function cutStr(text,len){
	var newText = text.substring(0,len);
//	console.log(newText);
	var txtlen = text.length;
	var result;
	if(txtlen > len){
		result = newText + "...";
	}else 
		result = text;
	return result;
}




