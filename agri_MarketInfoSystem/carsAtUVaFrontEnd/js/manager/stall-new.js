$(function(){
	Config.userJudge();
	// var pathMatr = (window.location.pathname.split('/'))[2].split('.');
	// Config.PageJudge(pathMatr[0]);
	stallinfo.loadData();
});
var strhtml;
function addhtml(obj){
	            	strhtml += "<tr><td>"+obj.userid+"</td>"+
              						"<td>"+obj.producttype+"</td>"+
              						"<td>"+obj.productid+"</td>"+
              						"<td>"+obj.productdescription+"</td>"+
//            						"<td>"+obj.userphone+"</td>"+
                                    "<td><label>Approve<input type='checkbox' class='ios-switch green' onclick='stallinfo.shenhe(" + obj.productid +",1)' /><div><div></div></div></label><label>Object<input type='checkbox' class='ios-switch red' onclick='stallinfo.shenhe(" + obj.productid +",0)' /><div><div></div></div></label></td>"+
                                "</tr>"; 	
}
var stallinfo = {
	loadData:function(){
		ajaxurl = Config.hostIp+"/getapplyinginfo?jsoncallback=?";
		$.get(ajaxurl,function(data){
			strhtml ="";
			$("#stallht").html("");
			// var list = data.data;
			// for(var i = 0;i < list.length;i++){
			// 	var obj = list[i];
			// 		addhtml(obj);
			// 		console.log(strhtml);
			// }
			if(data.userid !== 0 && data.productid !==0)
				addhtml(data);
//			console.log(strhtml);
			$("#stallht").html(strhtml);		
		})
	},
	shenhe:function(barginid,em){
		if(em == 0){
		ajaxurl = Config.hostIp+"/passornot?productid="+barginid+"&Option=NO"+"&jsoncallback=?";
		}
		else if(em == 1){
		ajaxurl = Config.hostIp+"/passornot?productid="+barginid+"&Option=YES"+"&jsoncallback=?";
		storage["xiaoxi"]--;
		}
		$.get(ajaxurl,function(data){
			console.log(1);
			stallinfo.loadData();
			
		})
	}
	
}
