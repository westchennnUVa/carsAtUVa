/*
 * 特价商品
 */

var BG = {};
var nowpage = 1;
var pageNo;
var totalPage;
var pages;
var previousPage = 0;
var nextPage = 0;
var pageSize = 3;
var typeOption = "";

BG.init = function(){
    Config.userJudge();
    BG.loadData(nowpage,typeOption);
    $("#all").addClass('btn-filter-active');
}

BG.loadData = function(nowpage,typeOption){
    pageNo = nowpage;
    ajaxUrl = Config.hostIp+"/displayallcars?Option=" + typeOption + "&jsoncallback=?";
    $.get(ajaxUrl,function(data){
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
        var list = data;
//		console.log(list);
        BG.list(list);
    });
}

BG.list = function(list){
    var bargainDiv = $("<div id=\"portfolio-container\" class=\"portfolio-container row\"></div>");
    $("#portfolio-container").html("");
    if(list.length <= 0) {
        var blank_ul = "";
        blank_ul += "<ul style=\"margin-top: 50px;min-height: 460px;color: #777;text-align: center;padding-top: 40px;background: rgba(237, 255, 97, 0.24);font-size: 22px\">No content now</ul>";
        bargainDiv.append(blank_ul);
    } else {
//		var temp_ul = $("<ul class=\"ul_control\"></ul>");		
        for(var i = 0; i < list.length; i++) {
        	// alertMsg(obj.producttype);
            var obj = list[i];
            console.log(obj);
			var url = obj.productimage;
//			console.log(obj);
            var temp_div = $("<div class=\"animationImg " + obj.producttype + " col-sm-4\" data-order=\"" + (i+1) + "\"></div>");
            var temp_figure = $("<figure></figure>");
            // var temp_img = $("<img src=\"" + Config.hostIp + "/upload/" + obj.productimage + "\" alt=\"\" class=\"img-responsive\" >");
            var temp_img = $("<img src=\"" + url + "\" alt=\"\" class=\"img-responsive\" >");
            var temp_figcaption = $("<figcaption></figcaption>");
            var temp_ul = $("<ul class=\"list-unstyled list-inline\"></ul>");
            var temp_li = $("<li></li>");
            // var temp_a = $("<a class=\"venobox\" href=\"" + Config.hostIp + "/upload/" + obj.productimage + "\" data-id=\"" + obj.productid + "\" data-title=\"<i class='fa fa-yelp'></i>Check details\" data-balloon=\"查看详细\" data-balloon-pos=\"up\"><i class=\"fa fa-search\"></i></a>");
            var temp_a = $("<a class=\"venobox\" href=\"" + url + "\" data-id=\"" + obj.productid + "\" data-title=\"<i class='fa fa-yelp'></i>Check details\" data-balloon=\"Details\" data-balloon-pos=\"up\"><i class=\"fa fa-search\"></i></a>");

            temp_li.append(temp_a);
            temp_ul.append(temp_li);
            temp_figcaption.append(temp_ul);
            temp_figure.append(temp_img);
            temp_figure.append(temp_figcaption);
            temp_div.append(temp_figure);
            bargainDiv.append(temp_div);
        }
    }
    $(".portfolio-work").children("div#portfolio-container").replaceWith(bargainDiv);
//	$('#portfolio-container').mixItUp();
    $('.venobox').venobox();
}

$('.btn-filter').click(function(){
//	console.log($(this));
    $('.controls button.btn-filter-active').removeClass('btn-filter-active');
    $(this).addClass('btn-filter-active');
    var type = event.target.getAttribute('data-type');
    if(type == 'all'){
        typeOption = "";
        nowpage = 1;
        $('#hid_type').val('');
    }else if(type == 'Honda'){
        typeOption = "Honda";
        nowpage = 1;
        $('#hid_type').val('Honda');
    }else if(type == 'Toyota'){
        typeOption = "Toyota";
        nowpage = 1;
        $('#hid_type').val('Toyota');
    }else if(type == 'Mazda'){
        typeOption = "Mazda";
        nowpage = 1;
        $('#hid_type').val('Mazda');
    }else if(type == 'Other'){
        typeOption = "Other";
        nowpage = 1;
        $('#hid_type').val('Other');
    }
    BG.loadData(nowpage,typeOption);
})

BG.loadType = function(){
//	console.log(event.srcElement.id);
    $('.controls button.btn-filter-active').removeClass('btn-search-active');
    $("\"#" + event.srcElement.id + "\"").addClass('btn-filter-active');
    var type = event.target.getAttribute('data-type');
    if(type == ''){
        typeOption = "";
        nowpage = 1;
        $('#hid_type').val('');
    }else if(type == 'Honda'){
        typeOption = "Honda";
        nowpage = 1;
        $('#hid_type').val('Honda');
    }else if(type == 'Toyota'){
        typeOption = "Toyota";
        nowpage = 1;
        $('#hid_type').val('Toyota');
    }else if(type == 'Mazda'){
        typeOption = "Mazda";
        nowpage = 1;
        $('#hid_type').val('Mazda');
    }else if(type == 'Other'){
        typeOption = "Other";
        nowpage = 1;
        $('#hid_type').val('Other');
    }


//	btnFlag = 1;
//	$(this).addClass('btn-filter-active');
//	
    BG.loadData(nowpage,typeOption);
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
            alertMsg("The page number is bigger than" + pages + ".");
            return;
        }
        if (parseInt($('#toPage').val()) == nowpage) {
            return;
        } else {
            nowpage = parseInt($('#toPage').val());
        }
    }
    BG.loadData(nowpage,typeOption);
}

BG.init();

//$(document).ready(function() {
//	$('#portfolio-container').mixItUp();
//	
//})

//$(function(){
//	$('#portfolio-container').on('DOMSubtreeModified','div',function(){ 
//      $('.venobox').venobox();
//	}) 
//})