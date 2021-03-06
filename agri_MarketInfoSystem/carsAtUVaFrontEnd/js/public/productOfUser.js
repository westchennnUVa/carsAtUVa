/*
 * 用户商品管理
 */

var POU = {};
var nowpage = 1;
var pageNo;
var totalPage;
var pages;
var previousPage = 0;
var nextPage = 0;
var pageSize = 3;
var ajaxUrl;
var maxwidth = 20;	//限制显示最大字数
var typeOption = "";
var stallids = [];
var stallcodes = [];
var stalldata = [];

$(function(){
//	Config.userJudge();
// 	var pathMatr = (window.location.pathname.split('/'))[2].split('.');
//	Config.PageJudge(pathMatr[0]);
//	if(storage["userauthority"] == undefined || storage["userauthority"] == null){
//		$('div.header-top-social ul.list-inline:first-child a.top-btn')[0].click();	
//		setTimeout(function(){
//			alertMsg("请先登录后再管理您的商品！");
//		},1000)
//	}
	POU.loadData(nowpage,typeOption);
	POU.loadconfirm.save_addconfirm();
	POU.loadconfirm.save_editconfirm();
	$("#all").addClass('btn-filter-active');
	$('.dropType').bind("click",this,chooseType);
});

//加载数据
POU.loadData = function(nowpage,typeOption){
	pageNo = nowpage;
	ajaxUrl = Config.hostIp+"/displaymycars?userid=" + storage["userid"]  + "&Option=" + typeOption + "&jsoncallback=?";
//	console.log((ajaxUrl));	
	$.get(ajaxUrl,function(data){
		console.log(data);
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
			console.log(list.length);
         POU.list(list);
  });
}
POU.list = function(list){
    var productDiv = $("<div id=\"portfolio-container\" class=\"portfolio-container row\"></div>");
    $("#portfolio-container").html("");
    if(list.length <= 0) {
        if(typeOption == ''){
            var blank_ul = "";
            blank_ul += "<ul style=\"margin-top: 50px;min-height: 460px;color: #777;text-align: center;padding-top: 40px;background: rgba(237, 255, 97, 0.24);font-size: 22px\">Please upload cars information firstly</ul>";
            productDiv.append(blank_ul);
        }else{
            var blank_ul = "";
            blank_ul += "<ul style=\"margin-top: 50px;min-height: 460px;color: #777;text-align: center;padding-top: 40px;background: rgba(237, 255, 97, 0.24);font-size: 22px\">No content for now</ul>";
            productDiv.append(blank_ul);
        }
    } else {
//		var temp_ul = $("<ul class=\"ul_control\"></ul>");
        for(var i = 0; i < list.length; i++) {
            var obj = list[i];
            var stringTest = JSON.stringify(obj);
            var url = obj.productimage;
			console.log(obj);
            var temp_div = $("<div class=\"animationImg " + obj.producttype + " col-sm-4\" data-order=\"" + (i+1) + "\"></div>");
            var temp_figure = $("<figure></figure>");
            var temp_img = $("<img src=\"" + url + "\" alt=\"\" class=\"img-responsive\" >");
            var temp_figcaption = $("<figcaption></figcaption>");
            var temp_ul = $("<ul class=\"list-unstyled list-inline\"></ul>");
            var temp_li = $("<li></li>");
            var temp_a_check = $("<a class=\"venobox\" href=\"" + url + "\" data-id=\"" + obj.productid + "\" data-title=\"<i class='fa fa-yelp'></i>Check details\" data-balloon=\"Details\" data-balloon-pos=\"up\"><i class=\"fa fa-search\"></i></a>");
            var temp_a_edit = $("<a class=\"a_edit\" data-title=\"<i class='fa fa-yelp'></i>Edit\" data-balloon=\"Edit\" data-balloon-pos=\"up\"><i class=\"fa fa-edit\"></i></a>");
            var temp_a_del = $("<a class=\"a_delete\" data-title=\"<i class='fa fa-yelp'></i>Delete\" data-balloon=\"Delete\" data-balloon-pos=\"up\"><i class=\"fa fa-close\"></i></a>");
            temp_a_del.bind("click", stringTest, POU.delProduct);
            temp_a_edit.bind("click", stringTest, POU.editProduct);
            temp_li.append(temp_a_check);
            temp_li.append(temp_a_edit);
            temp_li.append(temp_a_del);
            temp_ul.append(temp_li);
            temp_figcaption.append(temp_ul);
            temp_figure.append(temp_img);
            temp_figure.append(temp_figcaption);
            temp_div.append(temp_figure);
            productDiv.append(temp_div);
        }
    }
	$(".portfolio-work").children("div#portfolio-container").replaceWith(productDiv);
//	$('#portfolio-container').mixItUp();
	$('.venobox').venobox();
//	$('.btnfilter').bind('click',POU.addProduct);
}

//添加商品
POU.addProduct = function(){
	// POU.loadStall();
	$("#btn_cancelEdit").bind("click",POU.cancelEdit);
	$('.section-list').hide();
	$('.section-add').show();
	$('#title_add').show();
	$('#title_edit').hide();
	$('.confirm_addsave').show();
	$('.confirm_editsave').hide();
 	$(".btn-upload").removeAttr("disabled");
 	$("#chooseStall").removeAttr("disabled");
	$('#section_status').val('create');
	LG.emptyForm('#productForm');
	$('#productDescri').val('');
	$("#productImg").attr("src", "images/zw.png");
	//图片不存在则显示默认图片
	$("#productImg").error(function () {  
        $(this).attr("src", "images/zw.png");
  	});
}
$('.btnfilter').bind('click',POU.addProduct);

//删除商品
POU.delProduct = function(str){
	var data_obj = JSON.parse(str.data);
	var productID = data_obj.productid;
//	console.log(data_obj);
	$.getJSON(Config.hostIp+"/AgricultureDeleteProduct?productID=" + productID + "&jsoncallback=?",function(data){
		if(data.status == 1){
//			console.log(data.status);
			alertMsg(cutStr(data_obj.productname,10) + "”Delete Successfully！");
			nowpage = 1;
			POU.loadData(nowpage,typeOption);
		}else{
			alertMsg("Delete failed, server problem！");
		}
	});
}

//编辑商品
POU.editProduct = function(str){
	var data_obj = JSON.parse(str.data);
	POU.loadStall();
	$(".section_foot #btn_cancelEdit").bind("click", str.data, POU.cancelEdit);
	$('.section-list').hide();
	$('.section-add').show();
	$('#title_add').hide();
	$('#title_edit').show();
	$('.confirm_addsave').hide();
	$('.confirm_editsave').show();
	$(".btn-upload").attr({"disabled":"disabled"});
	$("#chooseStall").attr({"disabled":"disabled"});
	LG.emptyForm();
	$('#section_status').val('edit');
	$('#productid').val(data_obj.productid);
	$("#productImg").attr("src",Config.hostIp + "/upload/" + data_obj.productimage);
	//图片不存在则显示默认图片
	$("#productImg").error(function () {  
        $(this).attr("src", "images/zw.png");
  	});
  	$("#chooseStall").val(data_obj.stallcode);
	$('#productName').val(data_obj.productname);
	$('#ptype').val(data_obj.producttype);
	if(data_obj.producttype == 'Honda'){
		$('#productType').val('Honda');
	}else if(data_obj.producttype == 'Toyota'){
		$('#productType').val('Toyota');
	}else if(data_obj.producttype == 'Mazda'){
		$('#productType').val('Mazda');
	}else if(data_obj.producttype == 'Other'){
		$('#productType').val('Other');
	}
	
	$('#productNum').val(data_obj.productnumber);
	$('#productMessur').val(data_obj.productmeasurement);
	$('#productPrice').val(data_obj.productprice);
	$('#productDescri').val(data_obj.productdescription);
//	console.log(data_obj.newscontext);
	
}

//取消前先判断是否用户是否更改了内容
POU.cancelEdit= function(obj_cancel){
	console.log(obj_cancel);
	if(obj_cancel.data == null || obj_cancel.data == undefined){
		POU.loadconfirm.cancel_confirm();
		return;
	}else{
		var data_obj = JSON.parse(obj_cancel.data);		
		var productname = $('#productName').val();
		var producttype = $('#ptype').val();
		var productnumber = $("#productNum").val();
		var productmeasurement = $("#productMessur").val();
		var productprice = $("#productPrice").val();
		var productdescription = $("#productDescri").val();
		if(data_obj.productname == productname && data_obj.producttype == producttype && data_obj.productnumber == productnumber && data_obj.productmeasurement == productmeasurement && data_obj.productprice == productprice && data_obj.productdescription == productdescription){
			POU.cancel();
			return;
		}else{
			POU.loadconfirm.cancel_confirm();
			return;
		}
	}
}

//取消保存
POU.cancel = function(){
//	alert(1);
	$('.section-list').show();
	$('.section-add').hide();
	LG.emptyForm();
	$('#productDescri').val('');
	$(".section_foot #btn_cancelEdit").unbind("click");
}

//加载摊位列表到autoCompleter中
POU.loadStall = function(){
	a_url = Config.hostIp+"/AgricultureRequestUserStall?userid=" + storage["userid"] + "&jsoncallback=?";
	$.getJSON(a_url,function(data){
		if(data.status == 1){
//			console.log(data.data);
			$.each(data.data, function(m,n) {
				stallids[m] = n.stallid;
				stallcodes[m] = n.stallcode;
			});
			console.log(stallcodes.length);
            for(var i=0;i<stallcodes.length;i++){
                var obj={};
                obj.label=stallcodes[i];
                obj.value=stallcodes[i];
                stalldata[i] = obj;
            }
            $('#chooseStall').autocompleter({limit: stalldata.length,source: stalldata});
		}
	});
}

//编辑后保存商品
POU.saveEditProduct = function(){
	var a_url;
	var productname = $('#productName').val();
	var producttype = $('#ptype').val();
	var productnumber = $("#productNum").val();
	var productmeasurement = $("#productMessur").val();
	var productprice = $("#productPrice").val();
	var productdescription = $("#productDescri").val();
	var reg = /^\s+$/g ;
	if(productname.length == 0 || productname.match(reg)) {
		alertMsg("Please enter valid cars name！");
		$("#productName").val("");
		$("#productName").focus();
		return;
	}
	if(producttype.length == 0 || producttype.match(reg)) {
		alertMsg("Please choose valid cars brand！");
		$("#productType").val("");
		$("#ptype").val("");
		$("#productType").focus();
		return;
	}
	if(productnumber.length == 0 || productnumber.match(reg)) {
		alertMsg("Please enter valid year information！");
		$("#productNum").val("");
		$("#productNum").focus();
		return;
	}
	if(productmeasurement.length == 0 || productmeasurement.match(reg)) {
		alertMsg("Please enter valid mileage information！");
		$("#productMessur").val("");
		$("#productMessur").focus();
		return;
	}
	if(productprice.length == 0 || productprice.match(reg)) {
		alertMsg("Please enter valid price information！");
		$("#productPrice").val("");
		$("#productPrice").focus();
		return;
	}
	if(productdescription.length == 0 || productdescription.match(reg)) {
		alertMsg("Please enter valid description！");
		$("#productDescri").val("");
		$("#productDescri").focus();
		return;
	}
	// a_url = Config.hostIp+"/sellmycar?productid=" + $('#productid').val() + "&productname=" + productname + "&producttype=" + producttype + "&productnumber=" + productnumber + "&productmeasurement=" + productmeasurement + "&productprice=" + productprice + "&productdescription=" + productdescription + "&jsoncallback=?";
    a_url = Config.hostIp+"/sellmycar?productname=" + productname + "&producttype=" + producttype + "&productnumber=" + productnumber + "&productmeasurement=" + productmeasurement + "&productprice=" + productprice + "&productdescription=" + productdescription + "&userid=" + storage["userid"] + "&jsoncallback=?";
    $.get(a_url,function(data){
		if(data.status == 1){
			nowpage = 1;
			POU.loadData(nowpage,typeOption);
			$('.section-list').show();
			$('.section-add').hide();
			$(".section_foot #btn_cancelEdit").unbind("click");
			$('#section_status').val('');
			LG.emptyForm('#productForm');
			$('#productDescri').val('');
			$("#productImg").attr("src", "images/zw.png");
			alertMsg("Save Successfully！Wait for administrator to confirm your application!");
		}else{
			alertMsg("Try Again！");
		}
	});
	
}

//创建后保存商品
POU.saveAddProduct = function(){
	var stallcode = $("#chooseStall").val();
	var productname = $('#productName').val();
	var producttype = $('#ptype').val();
	var productnumber = $("#productNum").val();
	var productmeasurement = $("#productMessur").val();
	var productprice = $("#productPrice").val();
	var productdescription = $("#productDescri").val();
	var reg = /^\s+$/g ;
	// if(stallcode.length == 0 || stallcode.match(reg)) {
	// 	alertMsg("请选择有效的摊位编号！");
	// 	$("#chooseStall").val("");
	// 	$("#stallid").val("");
	// 	$("#chooseStall").focus();
	// 	return;
	// }
	if(productname.length == 0 || productname.match(reg)) {
		alertMsg("Please enter valid cars name！");
		$("#productName").val("");
		$("#productName").focus();
		return;
	}
	if(producttype.length == 0 || producttype.match(reg)) {
		alertMsg("Please choose valid cars brand！");
		$("#productType").val("");
		$("#ptype").val("");
		$("#productType").focus();
		return;
	}
	if(productnumber.length == 0 || productnumber.match(reg)) {
		alertMsg("Please enter valid year information！");
		$("#productNum").val("");
		$("#productNum").focus();
		return;
	}
	if(productmeasurement.length == 0 || productmeasurement.match(reg)) {
		alertMsg("Please enter valid mileage information！");
		$("#productMessur").val("");
		$("#productMessur").focus();
		return;
	}
	if(productprice.length == 0 || productprice.match(reg)) {
		alertMsg("Please enter valid price information！");
		$("#productPrice").val("");
		$("#productPrice").focus();
		return;
	}
	if(productdescription.length == 0 || productdescription.match(reg)) {
		alertMsg("Please enter valid description！");
		$("#productDescri").val("");
		$("#productDescri").focus();
		return;
	}


    a_url = Config.hostIp+"/sellmycar?productname=" + productname + "&producttype=" + producttype + "&productnumber=" + productnumber + "&productmeasurement=" + productmeasurement + "&productprice=" + productprice + "&productdescription=" + productdescription + "&userid=" + storage["userid"] + "&jsoncallback=?";
    $.get(a_url,function(data){
        if(data.status == 1){
            nowpage = 1;
            POU.loadData(nowpage,typeOption);
            $('.section-list').show();
            $('.section-add').hide();
            $(".section_foot #btn_cancelEdit").unbind("click");
            $('#section_status').val('');
            LG.emptyForm('#productForm');
            $('#productDescri').val('');
            $("#productImg").attr("src", "images/zw.png");
            alertMsg("Saving Successfully！");
        }else{
            alertMsg("Try Again！");
        }
    });
// 	if($.inArray($("#chooseStall").val(), stallcodes) != -1) {
// 		//摊位不为空，且摊位存在
// 		for(var i = 0; i < stallcodes.length; i++) {
// 			if($("#chooseStall").val() == stallcodes[i]) {
// 				searchIndex = i;
// 				break;
// 			}
// 		}
// 		$('#stallid').val(stallids[searchIndex]);
// 	}
// 	$(".section_foot #btn_cancelEdit").unbind("click");
// //	$('#stallid').val('30');
// 	$('#productForm').submit();
//	if(newsheader.length == 0 || newsheader.match(reg)) {
//		alertMsg("请输入有效的新闻标题！");
//		$("#newsTitle").val("");
//		$("#newsTitle").focus();
//		return;
//	}
//	if(newsdate.length == 0 || newsdate.match(reg)) {
//		alertMsg("请输入有效的新闻时间！");
//		$("#newsTime").val("");
//		$("#newsTime").focus();
//		return;
//	}
//	var fd = new FormData('#productForm'); 
////	var formData = new FormData($("#productForm")[0]);
//	fd.append("img",encodeURIComponent($('#productImg').src));
//	fd.append("Stallid ","1");
//	fd.append("ProductName ",$('#productName').val());
//	fd.append("ProductPrice",$('#productPrice').val());
//	fd.append("ProductMeasurement",$('#productMessur').val());
//	fd.append("ProductNum",$('#productNum').val());
//	fd.append("ProductType",$('#productType').val());
//	fd.append("ProductDescription ",$('#productDescri').val());
//	
//	if($('#section_status').val() == 'create'){
//		a_url = Config.hostIp+"/AgricultureUploadProduct";
////		a_url = Config.hostIp+"/AgricultureUploadProduct?formdata=" + formData + "&jsoncallback=?";
//	}else if($('#section_status').val() == 'edit'){
//		a_url = Config.hostIp+"/AgricultureMasterNewsUpdate?newsdate=" + newsdate + "&newsheader=" + newsheader + "&userid=" + storage["userid"] + "&Option=Create&jsoncallback=?";
//	}
//	$.getJSON(a_url,function(data){
//		if(data.status == 1){
//			nowpage = 1;
////			startDate = '';
////			finishDate = '';
//			POU.loadData(nowpage);
//			$('#section_list').show();
//			$('#section_edit').hide();
//			if($('#section_status').val() == 'edit'){
//				$(".section_foot #btn_cancelEdit").unbind("click");
//				$('#section_status').val('');
//				$("#newsid").val("");
//				$("#section_status").val("");
//				$("#newsTitle").val("");
//				$("#newsTime").val("");
//				$("#newsEditor").val("");
//				alertMsg("编辑商品成功！");
//			}else if($('#section_status').val() == 'create'){
//				$(".section_foot #btn_cancelEdit").unbind("click");
//				$('#section_status').val('');
//				$("#newsid").val("");
//				$("#section_status").val("");
//				$("#newsTitle").val("");
//				$("#newsTime").val("");
//				$("#newsEditor").val("");
//				alertMsg("创建商品成功！");
//			}
//		}else{
//			if($('#section_status').val() == 'edit'){
//				alertMsg("编辑商品失败，服务器错误！");
//			}else if($('#section_status').val() == 'create'){
//				alertMsg("创建商品失败，服务器错误！");
//			}
//		}
//	});
//	$.ajax({
//	   async:false,
//	   url: a_url,
//	   type: "post",
//	   dataType: 'jsonp',
//	   jsonp: 'jsoncallback',
//	   data: fd,
//	   processData : false,
//	   contentType : false,
//	   timeout: 5000,
//	   success: function (data) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
//		    if(json.actionErrors.length!=0){
//		           alert(json.actionErrors);
//		     }
//		    console.log(data);
////	       genDynamicContent(qsData,type,json);
//	   },
//	    complete: function(XMLHttpRequest, textStatus){
////	    	$.unblockUI({ fadeOut: 10 }); 
//	    	console.log(textStatus);
//	   },
//	   error: function(xhr){
//	    //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
//	    //请求出错处理
//	    console.log(xhr);
//	   }
//	});
}

//上传图片按钮
POU.showImgModal = function(){
	$('#inputImage').click();
//	$('#div_copImg').fadeIn(300);
//	POU.showCop();
}

POU.showCop = function(){
	(function () {
    var $image = $('.img-container > img'),
//      $dataX = $('#dataX'),
//      $dataY = $('#dataY'),
//      $dataHeight = $('#dataHeight'),
//      $dataWidth = $('#dataWidth'),
//      $dataRotate = $('#dataRotate'),
        options = {
          // strict: false,
          // responsive: false,
          // checkImageOrigin: false

          // modal: false,
          // guides: false,
          // highlight: false,
          // background: false,

          // autoCrop: false,
          // autoCropArea: 0.5,
          // dragCrop: false,
          // movable: false,
          // resizable: false,
          // rotatable: false,
          // zoomable: false,
          // touchDragZoom: false,
          // mouseWheelZoom: false,

          // minCanvasWidth: 320,
          // minCanvasHeight: 180,
          // minCropBoxWidth: 160,
          // minCropBoxHeight: 90,
          // minContainerWidth: 320,
          // minContainerHeight: 180,

          // build: null,
          // built: null,
          // dragstart: null,
          // dragmove: null,
          // dragend: null,
          // zoomin: null,
          // zoomout: null,

          aspectRatio: 1 / 1,
          preview: '.img-preview',
          crop: function (data) {
//          $dataX.val(Math.round(data.x));
//          $dataY.val(Math.round(data.y));
//          $dataHeight.val(Math.round(data.height));
//          $dataWidth.val(Math.round(data.width));
//          $dataRotate.val(Math.round(data.rotate));
          }
        };

    $image.on({
      'build.cropper': function (e) {
        console.log(e.type);
      },
      'built.cropper': function (e) {
        console.log(e.type);
      },
      'dragstart.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragmove.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragend.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'zoomin.cropper': function (e) {
        console.log(e.type);
      },
      'zoomout.cropper': function (e) {
        console.log(e.type);
      }
    }).cropper(options);


    // Methods
    $(document.body).on('click', '[data-method]', function () {
      var data = $(this).data(),
          $target,
          result;

      if (data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        result = $image.cropper(data.method, data.option);

        if (data.method === 'getCroppedCanvas') {
//      	$('#div_copImg').fadeOut(300);
//          $('.imgget').html(result);
			$('#productImg').attr('src',result.toDataURL());
        }

        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    }).on('keydown', function (e) {

      switch (e.which) {
        case 37:
          e.preventDefault();
          $image.cropper('move', -1, 0);
          break;

        case 38:
          e.preventDefault();
          $image.cropper('move', 0, -1);
          break;

        case 39:
          e.preventDefault();
          $image.cropper('move', 1, 0);
          break;

        case 40:
          e.preventDefault();
          $image.cropper('move', 0, 1);
          break;
      }

    });


    // Import image
    var $inputImage = $('#inputImage'),
        URL = window.URL || window.webkitURL,
        blobURL;

    if (URL) {
      $inputImage.change(function () {
        var files = this.files,
            file;

        if (files && files.length) {
          file = files[0];

          if (/^image\/\w+$/.test(file.type)) {
            blobURL = URL.createObjectURL(file);
            $image.one('built.cropper', function () {
              URL.revokeObjectURL(blobURL); // Revoke when load complete
            }).cropper('reset', true).cropper('replace', blobURL);
//      	$('#div_copImg').show();
            $inputImage.val('');
          } else {
            showMessage('Please choose an image file.');
          }
        }
      });
    } else {
      $inputImage.parent().remove();
    }
  }());
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
	POU.loadData(nowpage,typeOption);
})

//选择类型
function chooseType(obj){
//	console.log(obj);
	var type = obj.target.getAttribute('data-type'); 
	console.log(type);
	$('#ptype').val(type);
	if(type == 'Honda'){
//		$('#ptype').val('Fruit');
		$('#productType').val('Honda');
	}else if(type == 'Toyota'){
//		$('#ptype').val('Vegetable');
		$('#productType').val('Toyota');
	}else if(type == 'Mazda'){
//		$('#ptype').val('Meat');
		$('#productType').val('Mazda');
	}else if(type == 'Other'){
//		$('#ptype').val('Other');
		$('#productType').val('Other');
	}
}


//加载confirm插件
POU.loadconfirm = {
	//保存确认
	save_addconfirm: function(){
        // alert(1);
		$(".confirm_addsave").confirm({
			icon: 'glyphicon glyphicon-pencil',
		    content: "Do you want to save the content above？",
		    title: "Confirmation",
		    backgroundDismiss: false,
		    animation: 'top',
	    	closeAnimation: 'bottom',
		    confirm: function(button) {
		        POU.saveAddProduct();
		    },
		    cancel: function(button) {
		        // nothing to do
		    },
		    confirmButton: "Save",
		    cancelButton: "Cancel",
		    post: true,
		    confirmButtonClass: "btn-primary",
		    cancelButtonClass: "btn-default",
		    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
		});
	},
	save_editconfirm: function(){
		$(".confirm_editsave").confirm({
			icon: 'glyphicon glyphicon-pencil',
		    content: "Do you want to save the content above？",
		    title: "Do you want to save the content above？",
		    backgroundDismiss: false,
		    animation: 'top',
	    	closeAnimation: 'bottom',
		    confirm: function(button) {
		        POU.saveEditProduct();
		    },
		    cancel: function(button) {
		        // nothing to do
		    },
		    confirmButton: "Save",
		    cancelButton: "Cancel",
		    post: true,
		    confirmButtonClass: "btn-primary",
		    cancelButtonClass: "btn-default",
		    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
		});
	},
	//取消确认
	cancel_confirm: function(){
        // alert(1);
		$.confirm({
			icon: 'glyphicon glyphicon-pencil',
		    content: "Do you want to cancel editting？",
		    title: "Confirmation",
		    backgroundDismiss: false,
		    animation: 'top',
	    	closeAnimation: 'bottom',
		    confirm: function(button) {
		        POU.cancel();
		    },
		    cancel: function(button) {
		        // nothing to do
		    },
		    confirmButton: "Yes",
		    cancelButton: "No",
		    post: true,
		    confirmButtonClass: "btn-primary",
		    cancelButtonClass: "btn-default",
		    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
		});
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
        if (nowpage == parseInt(pages)) {
            return;
        }
        nowpage = parseInt(pages);
    }
    if (page == 'page') {
        if ($('#toPage').val() == '') {
        	alertMsg("Please enter page number");
            return;
        }
        if (isNaN($('#toPage').val())) {
        	alertMsg("please enter number");
            return;
        }
        if (parseInt($('#toPage').val()) > parseInt(pages)) {
        	alertMsg("The page number is bigger than" + pages + "pages");
            return;
        }
        if (parseInt($('#toPage').val()) == nowpage) {
            return;
        } else {
            nowpage = parseInt($('#toPage').val());
        }
    }
    POU.loadData(nowpage,typeOption);
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

function ProcessFile( e ) { 
	var file = document.getElementById('inputImage').files[0];
    if (file) {                
        var reader = new FileReader();
		reader.readAsDataURL(file);
        reader.onload = function ( event ) { 
	        var txt = event.target.result;
	        $('#productImg').attr('src',txt);
    	};
	}
}
function contentLoaded () {
    document.getElementById('inputImage').addEventListener( 'change' ,ProcessFile , false );
}
window.addEventListener( "DOMContentLoaded" , contentLoaded , false );