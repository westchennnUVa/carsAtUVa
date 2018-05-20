var pic;
var picid;
function getid(id) {
	return document.getElementById(id);
}
function Output(msg) {
	var m = getid("messages");
	m.innerHTML = msg + m.innerHTML;
}
var oDragWrap =getid('uploadready');
//拖进
oDragWrap.addEventListener('dragenter', function(e) {
　e.preventDefault();
  getid('dropbox').className='box-shadow';
}, false);

//拖离
oDragWrap.addEventListener('dragleave', function(e) {
  getid('dropbox').className='';
}, false);

//拖来拖去 
oDragWrap.addEventListener('dragover', function(e) {
　e.preventDefault();
}, false);

//扔下
oDragWrap.addEventListener('drop', function(e) {
e.stopPropagation();
 e.preventDefault();
var files = e.target.files || e.dataTransfer.files;
dropHandler(files)

}, false);

var arrFiles=[];
var dropHandler = function(files) {
  getid('pageContent').className='';
getid('upload_btn').style.display='block';
for(var f=0;f<files.length;f++){	
	if(files[f].type.indexOf("image")==-1){
		alert('文件' + files[f].name + '不是图片。')
		}
		else{
			arrFiles.push(files[f]);
			//console.log('files['+f+'].index'+files[f].index)			
			}
	}
            getid('pageContent').innerHTML='';
   for(var i=0; i<arrFiles.length;i++){
	   if(arrFiles[i].index!=='no'){
  	  arrFiles[i].index=parseInt(Math.random() * 9000000);
	  }
	   }
 for(var i=0; i<arrFiles.length;i++){
	 	if(arrFiles[i].index!=='no'){
	  viewfile(arrFiles[i])
		}
	  }

 //调试代码
 for (var i=0; i<arrFiles.length;i++){
	 console.log('新数组的索引'+'arrFiles'+i+':'+arrFiles[i].index)
	 }	
getid('upload_btn').addEventListener('click', function(e) {
　e.preventDefault();
getid('upload_btn').style.display='none';//隐藏上传按钮
for(var s=0; s<arrFiles.length;s++){
	if(arrFiles[s].index!=='no'){
	ajaxUpload(arrFiles[s])  
	}
	}
arrFiles=null;
arrFiles=[];	

}, false);	
}  
	  
//放入完毕
  function ajaxUpload(files){
	 var xhr=new XMLHttpRequest();
	xhr.upload.addEventListener('progress',function(e){
		var pc=parseInt(e.loaded/e.total*100);
		if(getid('progress'+files.index)){
		getid('progress'+files.index).value=pc;}
console.log(getid('progress'+files.index))
		},false)		 
	 xhr.onreadystatechange = function(e) {
	if (xhr.readyState == 4) {
	var oldli=getid('imgViewList'+files.index);	
	var imgsrc='uploads/'+files.name;
   var	uploadLi=document.createElement('li');	 
    var   html  = '';
		  html += '<div  onclick="insertPic(this)" class="img_and_info">';
		  html += '<img  border="0" src="'+imgsrc+'">';
		  html += '</div>';
		  html += ' <p class="imginfo" contenteditable="true">上传完毕</p>';
          uploadLi.innerHTML=html;
          var oldLi=getid('imgViewList'+files.index);
		   getid('pageContent').removeChild(oldLi);
	   getid('uploaded').appendChild(uploadLi);   
	  var bbscode='';
	       bbscode+='[img]/000/uploads/'+files.name+'[/img]<br/>'
          getid('uploadView').innerHTML+=bbscode;
		}
			};
	
//	       xhr.open("POST",'upload.php', true);
//			xhr.setRequestHeader("X_FILENAME", files.name);
//			xhr.send(files);
	  }
  	  
// ajaxUpload();
function viewfile(file){
	if(window.webkitURL){
		
	var	imgsrc=window.webkitURL.createObjectURL(file)
createView(file,imgsrc)
		
		}
	else if(window.URL){
		
		var	imgsrc=window.URL.createObjectURL(file)
	
createView(file,imgsrc)
		}	

	else{
	
	
	
   var reader = new FileReader();
　reader.onload = function(e) {
	
var	imgsrc=e.target.result;
     
createView(file,imgsrc)
　}
  reader.readAsDataURL(file);
  }
  

	}
	//创建预览dom
	function createView(file,imgsrc){		
		  var html = "";
		  picid = "imgViewList"+file.index;
		  pic = imgsrc;
		  html += '<li id="imgViewList'+file.index+'">';
		  html += '<div class="img_and_info">';
		  html += '<img  border="0" src="'+imgsrc+'">';
		  html += '</div>';
		  html += '<span onclick="del(\'imgViewList'+file.index+'\')" class="upload_delete" title="删除">删除</span>'
              html += '<progress value="0" max="100" id="progress'+file.index+'"></progress>'; 
		  html += '</li>';
  getid('pageContent').innerHTML+=html;	
		
		}
Array.prototype.del=function(n) {　//n表示第几项，从0开始算起。
　if(n<0){　//如果n<0，则不进行任何操作。
　　return this;}
　else{
　　return this.slice(0,n).concat(this.slice(n+1,this.length));
}
}
	
//删除预览
  function del(obj){
	   var n=parseInt(obj.substring(11));//获取数组索引
	 console.log('数组长度为：'+arrFiles.length);
	   for(var s=0;s<arrFiles.length; s++){
		   
		   if(arrFiles[s].index==n){
			   
	   	console.log(arrFiles[s].index='no');
			   
			   }
		   }
	   	   getid(obj).parentNode.removeChild($(obj))
		console.log('目前数组为：'+arrFiles);

	   }
function saveImg()
{ 
	copy("G:\\1.JPG","D:\\");
}
var fs = require('fs');
 
function copy(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

