/*
 * 营养搭配
 */

var NM = {};

$(function(){
	Config.userJudge();
	$('.box').bind('click',this,NM.showBox);
})

NM.showBox = function(obj){
	var elet = obj.currentTarget;
//	console.log(elet);
	if (elet) {
    	if (elet.className == 'box') {
	      	while (document.getElementById('main').getElementsByClassName('box target')[0]) {
	   	 		document.getElementById('main').getElementsByClassName('box target')[0].className = 'box';
	      	}
	      	elet.className = 'box target';
    	}else{
      		elet.className = 'box';
    	}
  	}
}
