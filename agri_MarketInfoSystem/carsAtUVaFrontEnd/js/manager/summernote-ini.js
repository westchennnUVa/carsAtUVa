$(document).ready(function() {
	//summernote富文本框
	$('#summernote').summernote({
		placeholder:'请输入新闻内容',
		height: '300',
		lang: 'zh-CN', // default: 'en-US'
		mode: 'text/html',
		htmlMode: true,
		toolbar: [
		 	['style', ['style']],
		    ['font', ['bold', 'underline', 'clear']],
//			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
//			['height', ['height']], 
			['help', ['help']]
		],
		keyMap: {
		    pc: {
		      'ENTER': 'insertParagraph',
		      'CTRL+Z': 'undo',
		      'CTRL+Y': 'redo',
		      'TAB': 'tab',
		      'SHIFT+TAB': 'untab',
		      'CTRL+B': 'bold',
		      'CTRL+I': 'italic',
		      'CTRL+U': 'underline',
		      'CTRL+SHIFT+S': 'strikethrough',
		      'CTRL+BACKSLASH': 'removeFormat',
		      'CTRL+SHIFT+L': 'justifyLeft',
		      'CTRL+SHIFT+E': 'justifyCenter',
		      'CTRL+SHIFT+R': 'justifyRight',
		      'CTRL+SHIFT+J': 'justifyFull',
		      'CTRL+SHIFT+NUM7': 'insertUnorderedList',
		      'CTRL+SHIFT+NUM8': 'insertOrderedList',
		      'CTRL+LEFTBRACKET': 'outdent',
		      'CTRL+RIGHTBRACKET': 'indent',
		      'CTRL+NUM0': 'formatPara',
		      'CTRL+NUM1': 'formatH1',
		      'CTRL+NUM2': 'formatH2',
		      'CTRL+NUM3': 'formatH3',
		      'CTRL+NUM4': 'formatH4',
		      'CTRL+NUM5': 'formatH5',
		      'CTRL+NUM6': 'formatH6',
		      'CTRL+ENTER': 'insertHorizontalRule',
		      'CTRL+K': 'linkDialog.show'
		    }
		 }
	});
//	$('#summernote').summernote('indent');
});