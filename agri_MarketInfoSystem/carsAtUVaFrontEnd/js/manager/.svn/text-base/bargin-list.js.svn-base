$(function(){
	Config.userJudge();
	var pathMatr = (window.location.pathname.split('/'))[2].split('.');
	Config.PageJudge(pathMatr[0]);
	stallinfo.loadData();
});
var stall = "东区";
var eman = 3;
function show_three(){
	$("#min_identity").html("南区摊位使用情况");
	stall = "南区";
	stallinfo.loadData();
}
function show_two(){
	$("#min_identity").html("西区摊位使用情况");
	stall = "西区";
	stallinfo.loadData();
}
function show_one(){
	$("#min_identity").html("东区摊位使用情况");
	stall = "东区";
	stallinfo.loadData();
}

function showBarginUser(barginNum){
	$("#stallCode_Edit").val(barginNum);
	console.log(1);
}
function show(em){
	eman = em;
	stallinfo.loadtData();
}
var strhtml;
function addhtml(obj){
	            if(obj.stallisused == "0"){
	            	if(obj.examination == 1)
	            	{strhtml +="<a class='col-md-3 team-gd' value='0' >";											
					strhtml +="<h4>"+obj.stallcode+"</h4></a>";}
	            	else{
	            		strhtml +="<a class='col-md-3 team-gd bargin-waring' value='0' href='' data-toggle='modal' data-target='#small-dialog' onclick='stallinfo.loadoneshenData(" + obj.stallid +")' >";											
						strhtml +="<h4>"+obj.stallcode+"</h4></a>";
	            	}
				}
				if(obj.stallisused == "1"){
					strhtml +="<a class='col-md-3 team-gd bargin-active' value='1' href='' data-toggle='modal' data-target='#small-dialog1' onclick='stallinfo.showBarginUser(" + obj.stallid +")'>";											
					strhtml +="<h4>"+obj.stallcode+"</h4></button>";					
				}				
}
var stallinfo = {
	loadData:function(){
		ajaxurl = Config.hostIp+"/AgricultureStallRequest?jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
			strhtml ="";
			$("#bargin-con").html("");
			var list = data.data;
			for(var i = 0;i < list.length;i++){
				var obj = list[i];
				if(obj.stallcode.indexOf(stall) != -1)

				{
					addhtml(obj);		
				}

			}
//			console.log(strhtml);
			$("#bargin-con").html(strhtml);		
		})
	},
	loadtData:function(){
		ajaxurl = Config.hostIp+"/AgricultureStallRequest?jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
			strhtml ="";
			console.log(2);
			$("#bargin-con").html("");
			var list = data.data;
			for(var i = 0;i < list.length;i++){
				var obj = list[i];
				if(obj.stallcode.indexOf(stall) != -1)

				{
					if(eman == 3){addhtml(obj);}
					if(eman == 0){
						 if(obj.stallisused == "0"){
			            	if(obj.examination == 1)
			            	{
			            		strhtml +="<a class='col-md-3 team-gd' value='0' >";											
								strhtml +="<h4>"+obj.stallcode+"</h4></a>";
			            	}
						}
					}
					if(eman == 1){
						if(obj.stallisused == "1"){
							strhtml +="<a class='col-md-3 team-gd bargin-active' value='1' href='' data-toggle='modal' data-target='#small-dialog1' onclick='stallinfo.showBarginUser(" + obj.stallid +")'>";											
							strhtml +="<h4>"+obj.stallcode+"</h4></button>";					
						}	
					}
					if(eman == 2){
						 if(obj.stallisused == "0"){
			            	if(obj.examination == 0)
			            	{
			            		strhtml +="<a class='col-md-3 team-gd bargin-waring' value='0' href='' data-toggle='modal' data-target='#small-dialog' onclick='stallinfo.loadoneshenData(" + obj.stallid +")' >";											
								strhtml +="<h4>"+obj.stallcode+"</h4></a>";
			            	}
						}
					}
							
				}

			}
						
			console.log(strhtml);
			$("#bargin-con").html(strhtml);		
			
				
					
		})
		
	},
	loadshenData:function(){
		ajaxurl = Config.hostIp+"/AgricultureMasterNewMessage?jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
			strhtml ="";
			console.log(2);
			$("#bargin-con").html("");
			var list = data.data;
			for(var i = 0;i < list.length;i++){
				var obj = list[i];
				addhtml(obj);
			}
						
			console.log(strhtml);
			$("#bargin-con").html(strhtml);		
											
		})
	},
	showBarginUser:function(stallid){
		ajaxurl = Config.hostIp+"/AgricultureStallRequest?jsoncallback=?";
		$.getJSON(ajaxurl,function(data){		
			var tijiao = "";
			$("#tijiao").html();
			var list = data.data;
			for(var i = 0;i < list.length;i++){
				var obj = list[i];
				if(obj.stallid == stallid)
				{	
					$("#e-barginid").html(obj.stallcode);
					$("#ebargin-usename").html(obj.username);
					$("#ebargin-Id").html(stallid);
					$("#ebargin-code").html(obj.stallcode);
					$("#ebargin-userId").html(obj.userid);
					$("#ebargin-name").html(obj.username);
					
					$("#ebargin-phone").html(obj.userphone);
					tijiao = "<div class='col-md-12'><input type='button' name='' id='' value='撤销摊位' class='btn btn-circle btn-default btn-c' onclick='stallinfo.quxiao(" + obj.stallid +")'/></div>";
					$("#tijiao").html(tijiao);
					break;
				}
			}
						
											
		})
	},
	quxiao:function(stallid){
		ajaxurl = Config.hostIp+"/AgricultureMasterDeleteStall?stallid="+stallid+"&jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
			console.log(1);
			stallinfo.loadData();
			location.reload([true]);
//			document.getElementById("modal-bar2").style.display="none";
			
		})
		
	},
	loadoneshenData:function(stallid){
		ajaxurl = Config.hostIp+"/AgricultureStallRequest?jsoncallback=?";
		$.getJSON(ajaxurl,function(data){
		
		
			var tijiao = "";
			$("#btntijiao").html();
			var list = data.data;
			for(var i = 0;i < list.length;i++){
				var obj = list[i];
				if(obj.stallid == stallid)
				{					
					$("#bargin-usename").html(obj.username);
					$("#bargin-Id").html(stallid);
					$("#bargin-code").html(obj.stallcode);
					$("#bargin-userId").html(obj.userid);
					$("#bargin-name").html(obj.username);
					tijiao = "<div class='col-md-5'><input type='button' name='' id='' value='审核未通过' class='btn btn-circle btn-default btn-c' onclick='stallinfo.shenhe(" + obj.stallid +",0)'/></div><div class='col-md-5'><input type='button' name='' id='' value='审核通过' class='btn btn-circle btn-danger btn-c' onclick='stallinfo.shenhe(" + obj.stallid +",1)'/></div>";
					$("#btntijiao").html(tijiao);
					break;
				}
			}
						
											
		})
	},
	shenhe:function(barginid,em){
		if(em == 0){
		ajaxurl = Config.hostIp+"/AgriculturePassStallRequest?stallid="+barginid+"&Option=NO"+"&jsoncallback=?";
		}
		else if(em == 1){
		ajaxurl = Config.hostIp+"/AgriculturePassStallRequest?stallid="+barginid+"&Option=YES"+"&jsoncallback=?";			
		}
		$.getJSON(ajaxurl,function(data){
			console.log(1);
			location.reload([true]);
//			document.getElementById("modal-bar1").style.display="none";
			
		})
		
		
		
	}
	
}

