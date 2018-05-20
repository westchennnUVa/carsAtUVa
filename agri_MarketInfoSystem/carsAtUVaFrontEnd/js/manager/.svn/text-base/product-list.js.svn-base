var type = "all";
var pricel = 0;
var priceh = 10000;
var bargin = "all";
var nowpage = 1;
var pageNo =1;
var totalPage;
var pages;
var previousPage = 0;
var nextPage = 0;
var pageSize = 5;
var ajaxurl;
function cutStr(text){
	var newText = text.substring(0,12);
	var n = text.length;
	var result;
	if(n>20){
		result = newText + "...";
		}
	else result = text;
	return result;
}
$(function(){
	Config.userJudge();
	var pathMatr = (window.location.pathname.split('/'))[2].split('.');
	Config.PageJudge(pathMatr[0]);
	 document.getElementById("product_user").readOnly=true;
	 document.getElementById("product_bargin").readOnly=true;
	productinfo.loadData();
	$("#select1 dd a").click(function(){
		var typeid = this.id;
		if(typeid == "type0"){
			type = "all";
		}
		if(typeid == "type2"){
			type = "Fruit";
		}
		if(typeid == "type1"){
			type = "Vegetable";
		}
		if(typeid == "type3"){
			type = "Meat";
		}
		if(typeid == "type4"){
			type = "Other";
		}
		console.log(type);
		productinfo.loadData();
	})
	$("#select2 dd a").click(function(){
		var priceid = this.id;
		if(priceid == "price0"){
			pricel = 0;
			priceh = 10000;
		}
		if(priceid == "price1"){
			pricel = 0;
			priceh = 100;
		}
		if(priceid == "price2"){
			priceh = 300;
			pricel = 100;
		}
		if(priceid == "price3"){
			priceh = 500;
			pricel = 300;
		}
		if(priceid == "price4"){
			pricel = 500;
			priceh = 10000;
		}
		productinfo.loadData();
	})
	$("#select3 dd a").click(function(){
		var barginid = this.id;
		if(barginid == "bargin0"){
			bargin = "all";
		}
		if(barginid == "bargin1"){
			bargin = "东区";
		}
		if(barginid == "bargin2"){
			bargin = "西区";
		}
		if(barginid == "bargin3"){
			bargin = "南区";
		}
		console.log(bargin);
		console.log(type);
		productinfo.loadData();
	})
});
var strhtml ="";
function addhtml(obj){
	strhtml+="<div class='col-md-3 gallery-grid'><div class='gallery-grid-effects'><div id='nivo-lightbox-demo'><div class='ih-item square effect4 bottom_to_top box'><div class='img'><img src='"+ imgurl+"'alt='img'></div><div class='word'>"		                      	
                  		+"<div class='information-con col-md-6'>商品名：<span id='pro_name'>"+obj.productname +"</span></div>"+
                  		"<div class='information-con col-md-6'>类&nbsp;型：<span id='pro_type'>"+obj.producttype+"</span></div>"+
                  		"<div class='information-con col-md-6'>价&nbsp;格：<span id='pro_price'>"+obj.productprice+"&nbsp;每"+obj.productmeasurement+"</span></div>"+
                  		"<div class='information-con col-md-6'>库&nbsp;存：<span id='pro_num'>"+obj.productnumber+"</span></div>"+
                  		"<div class='information-con col-md-6'>摊&nbsp;主：<span id='pro_user'>"+obj.username+"</span></div>"+
				"</div>"+
              "<div class='mask1'></div><div class='mask2'></div>"+
              "<div class='info product-front'>"+
                 "<div id='description'>"
                 	+cutStr(obj.productdescription)+
                 "</div>"+
                "<div class='button-style'>"+
                 "<button class='btn btn-danger btn-do'><i class='fa fa-pencil' onclick='productinfo.deledata("+obj.productid+")'></i> 删除</button>"+
            	 "<a href='' data-toggle='modal' data-target='#myModal_do' class='btn btn-primary btn-do' onclick='productinfo.editOneData("+obj.productid+")'><i class='fa fa-edit'></i>编辑</a>"+
            	 "</div></div></div></div></div></div>";
}
var imgurl = "";
var productinfo = {
	loadData:function(){
		ajaxurl = Config.hostIp+"/AgricultureProductPriceInterval?PriceMin=" + pricel + "&PriceMax=" + priceh + "&jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
			var list = data.data;			
			$("#product-info").html("");
			strhtml ="";
			for(var i = 0;i< list.length;i++){
				var obj = list[i];
				imgurl = Config.hostIp+"/upload/" + obj.productimage;
				if(type == "all" && bargin == "all"){
					addhtml(obj);
				}
				else if(type == "all" && bargin != "all"){
					if(obj.stallcode.indexOf(bargin) != -1){
						console.log(obj.stallcode.indexOf(bargin));
						addhtml(obj);
					}
					
				}
				else if(type != "all" && bargin == "all")
				{
					if(type == obj.producttype){
						addhtml(obj);
					}
				}
				else if(type != "all" && bargin != "all"){
					if(type == obj.producttype){
						if(obj.stallcode.indexOf(bargin) != -1){
						console.log(obj.stallcode.indexOf(bargin));
						addhtml(obj);
					}
					}
				}			
			}
//			console.log(strhtml);
			$("#product-info").html(strhtml);			
		})
	},
	editOneData:function(productId){
		ajaxurl = Config.hostIp+"/AgricultureProductPriceInterval?PriceMin=" + 0 + "&PriceMax=" + 10000 + "&jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
		console.log(1);
		var list = data.data;
			for(var i = 0;i <list.length;i++){				
				var obj = list[i];
				if(obj.productid == productId){
					$("#productID").html(productId);
					$("#product_name").val(obj.productname);
					$("#product_price").val(obj.productprice);
					$("#productmeasurement").val(obj.productmeasurement);
					$("#productnumber").val(obj.productnumber);
					$("#product_user").val(obj.username);
					$("#product_type").val(obj.producttype);
					$("#product_bargin").val(obj.stallcode);
					$("#productdescription").val(obj.productdescription);				
					break;
				}
				}
			
			var _tijiao = "<button class='btn btn-default' onclick='productinfo.updata(" + obj.productid + ")'><i class=' fa fa-refresh '></i> 提交</button>";
			
			$("#tijiao").html(_tijiao);
		})
		productinfo.loadData();
		
	},
	updata:function(_prouctId)
	{
				var productname = $("#product_name").val();
				var product_price = $("#product_price").val();
				var productmeasurement = $("#productmeasurement").val();
				var productnumber =	$("#productnumber").val();
				var product_user = $("#product_user").val();
				var product_type = $("#product_type").val();
				var product_bargin = $("#product_bargin").val();
				var productdescription = $("#productdescription").val();	
				console.log(_prouctId);
		ajaxurl = Config.hostIp+"/AgricultureUpdateProduct?productid=" + _prouctId + "&productname=" + productname + "&productprice=" + product_price + "&productmeasurement=" + productmeasurement + "&productnumber=" + productnumber + "&productdescription=" + productdescription + "&producttype=" + product_type + "&jsoncallback=?";		
		$.getJSON(ajaxurl,function(data){
			$('#myModal_do').modal('hide');
		})
		console.log(1);
		productinfo.loadData();
		
	},
	deledata:function(productId){
		ajaxurl = Config.hostIp+"/AgricultureDeleteProduct?productID=" + productId + "&jsoncallback=?";	
		$.getJSON(ajaxurl,function(data){
			
		})
		productinfo.loadData();	
	}
	
};