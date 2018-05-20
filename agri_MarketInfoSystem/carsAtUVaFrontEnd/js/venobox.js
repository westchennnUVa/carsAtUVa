/*
 * VenoBox - jQuery Plugin
 * version: 1.6.0
 * @requires jQuery
 *
 * Examples at http://lab.veno.it/venobox/
 * License: MIT License
 * License URI: https://github.com/nicolafranchini/VenoBox/blob/master/LICENSE
 * Copyright 2013-2015 Nicola Franchini - @nicolafranchini
 *
 */
(function($){

    var autoplay, bgcolor, blocknum, blocktitle, border, core, container, content, dest, 
        evitacontent, evitanext, evitaprev, extraCss, figliall, framewidth, frameheight, 
        infinigall, items, keyNavigationDisabled, margine, numeratio, overlayColor, overlay, 
        prima, title, thisgall, thenext, theprev, type, 
        finH, sonH, nextok, prevok;
    
    var maxwidth = 40;

    $.fn.extend({
        //plugin name - venobox
        venobox: function(options) {

          // default option
          var defaults = {
              framewidth: '',
              frameheight: '',
              border: '0',
              bgcolor: '#fff',
              titleattr: 'data-title', // specific attribute to get a title (e.g. [data-title]) - thanx @mendezcode
              numeratio: false,
              infinigall: false,
              overlayclose: true // disable overlay click-close - thanx @martybalandis 
          };

          var option = $.extend(defaults, options);

            return this.each(function() {
                  var obj = $(this);

                  // Prevent double initialization - thanx @matthistuff
                  if(obj.data('venobox')) {
                    return true;
                  }

                  obj.addClass('vbox-item');
                  obj.data('framewidth', option.framewidth);
                  obj.data('frameheight', option.frameheight);
                  obj.data('border', option.border);
                  obj.data('bgcolor', option.bgcolor);
                  obj.data('numeratio', option.numeratio);
                  obj.data('infinigall', option.infinigall);
                  obj.data('overlayclose', option.overlayclose);
                  obj.data('venobox', true);

                  obj.click(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    obj = $(this);
                    overlayColor = obj.data('overlay');
                    framewidth = obj.data('framewidth');
                    frameheight = obj.data('frameheight');
                    // set data-autoplay="true" for vimeo and youtube videos - thanx @zehfernandes
                    autoplay = obj.data('autoplay') || false; 
                    border = obj.data('border');
                    bgcolor = obj.data('bgcolor');
                    nextok = false;
                    prevok = false;
                    keyNavigationDisabled = false;

                    // set a different url to be loaded via ajax using data-href="" - thanx @pixeline
                    dest = obj.data('href') || obj.attr('href');
                    extraCss = obj.data( 'css' ) || "";

                    $('body').addClass('vbox-open');
//                  core = '<div class="vbox-overlay ' + extraCss + '" style="background:'+ overlayColor +'"><div class="vbox-preloader">Loading...</div><div class="vbox-container"><div class="vbox-content"></div></div><div class="vbox-title"></div><div class="vbox-num">0/0</div><div class="vbox-close">X</div><div class="vbox-next">next</div><div class="vbox-prev">prev</div></div>';
                    core = '<div class="vbox-overlay ' + extraCss + '" style="background:'+ overlayColor +'"><div class="vbox-container"><div class="vbox-content"></div></div><div class="vbox-title"></div><div class="vbox-num">0/0</div><div class="vbox-close">X</div><div class="vbox-next">next</div><div class="vbox-prev">prev</div></div>';
                    $('body').append(core);

                    overlay = $('.vbox-overlay');
                    container = $('.vbox-container');
                    content = $('.vbox-content');
                    blocknum = $('.vbox-num');
                    blocktitle = $('.vbox-title');

                    content.html('');
                    content.css('opacity', '0');

                    checknav();

                    overlay.css('min-height', $(window).outerHeight());
                    
                    var VB = {
                    	/* -------- 查看更多商品信息 -------- */
                    	readMore: function(data){
                    		var obj2 = JSON.parse(data);
                            // var obj2 = data.productd
//                  		console.log(obj2);
							var $detailOver = $(".detail_overflow");
							$detailOver.removeClass('detail_overflow');
							$(".detail").addClass('anima-in');
							$('#btn-more').hide();
							$('#btn-packup').show();
//							$('.detail').text(obj2.str);
							$('.detail').text(obj2.productdescription);
                    	},
                    	/* -------- 收起更多商品信息 -------- */
                    	packUp: function(){
							var $detailOver = $(".description");
							$detailOver.addClass('detail_overflow');
							$(".detail").removeClass('anima-in');
							$(".detail").text($(".detail").text().substring(0, maxwidth));
							$(".detail").html($(".detail").html() + '...');
							$('#btn-more').show();
							$('#btn-packup').hide();
                    	},                    	
                    	/* -------- 加载商品信息 -------- */
                    	loadData: function(){
                    		var obj1;
                    		var judge = $('#judgePage').attr('value');
                 		console.log(judge);
                    		if(judge == 'bargainProduct'){
                                ajaxUrl = Config.hostIp+"/displayallcars?&Option=" + $('#hid_type').val() + "&jsoncallback=?";
                                // ajaxUrl = Config.hostIp+"/AgricultureSpecialPriceProduct?Row=" + pageSize + "&Page=" + pageNo + "&Option=" + $('#hid_type').val() + "&jsoncallback=?";
                			}else if(judge == 'userProduct'){
								ajaxUrl = Config.hostIp+"/displaymycars?userid=" + storage["userid"] + "&Option=" + $('#hid_type').val() + "&jsoncallback=?";
                			}
							$.get(ajaxUrl,function(data){
//								console.log(data.data);
								for(var i=0;i<data.length;i++){
									var sortObj = data[i];
                                    // console.log(data[i]);
									if(sortObj.productid == obj.data('id')){
                                        console.log("enter");
										obj1 = sortObj;
										break;
									}
								}
//								console.log(obj1);
								var stringTest = JSON.stringify(obj1);
								var ptype;
								if(obj1.producttype == 'Honda'){
									ptype = 'Honda';
								}else if(obj1.producttype == 'Toyota'){
									ptype = 'Toyota';
								}else if(obj1.producttype == 'Mazda'){
									ptype = 'Mazda';
								}else if(obj1.producttype == 'Other'){
									ptype = 'Other';
								}
								var temp_img = $("<img id=\"anima-img\" src=\""+dest+"\" />");
	                      		var temp_div = $("<div id=\"anima-div\" class=\"imgDiv figlio\"><p>Car Name：&nbsp;&nbsp;&nbsp;" + obj1.productname + "</p><p>Brand：&nbsp;&nbsp;" + ptype + "</p><p>Price：&nbsp;&nbsp;<span class=\"curr_price\">" + obj1.productprice + "</span>&nbsp;<span class=\"ori_price\"><del></del></span></p><p>Mileage：&nbsp;&nbsp; " + obj1.productmeasurement + "</p><p class=\"description detail_overflow\">Details：&nbsp;&nbsp;<span class=\"detail\">" + obj1.productdescription + "</span></p></div>");
		                        content.append(temp_img);
		                        content.append(temp_div);
		                        // var button_test = $("<button class=\"btn-more\" id=\"btn-more\"><i class=\"fa fa-hand-o-down\"></i> Read more</button>");
		                        // button_test.bind("click", stringTest, VB.readMore);
		                        // $('.imgDiv').append(button_test);
		                        // var a_test = $("<br/><button class=\"btn-more\" id=\"btn-packup\"><i class=\"fa fa-hand-o-up\"></i> Collapse</button>");
		                        // a_test.bind("click", VB.packUp);
		                        // $('.imgDiv').append(a_test);
							});
                    	}                    	
                    	
                    }

                    
                    VB.loadData();
					
                    // fade in overlay
                    overlay.animate({opacity:1}, 250, function(){
    
                      if(obj.data('type') == 'iframe'){
                        loadIframe();
                      }else if (obj.data('type') == 'inline'){
                        loadInline();
                      }else if (obj.data('type') == 'ajax'){
                        loadAjax();
                      }else if (obj.data('type') == 'vimeo'){
                        loadVimeo(autoplay);
                      }else if (obj.data('type') == 'youtube'){
                        loadYoutube(autoplay);
                      } else {
                      	/*测试专用*/
//                    	var judge = $('#judgePage').attr('value');
//              		console.log(judge);
//                    	var data1 = {
//                    		str : '这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜'
//                    	}
//                    	var stringTest = JSON.stringify(data1);
////                    	console.log(stringTest);
////                    	console.log(obj.data('id'));  
//						var temp_img = $("<img id=\"anima-img\" src=\""+dest+"\" />");
//                    	var temp_div = $("<div id=\"anima-div\" class=\"imgDiv figlio\"><p>商品名：&nbsp;&nbsp;&nbsp;小白菜</p><p>商品价格：&nbsp;&nbsp;<span class=\"curr_price\"><i class=\"fa fa-rmb\"></i>30</span>&nbsp;<span class=\"ori_price\"><del><i class=\"fa fa-rmb\"></i>20</del></span></p><p>商品数量：&nbsp;&nbsp;30</p><p>商品摊位：&nbsp;&nbsp;西区3号</p><p class=\"description detail_overflow\">商品描述：&nbsp;&nbsp;<span class=\"detail\">这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜</span></p></div>");
////                      content.html("<img src=\""+dest+"\"><div class=\"imgDiv figlio\"><p>商品名：&nbsp;&nbsp;小白菜</p><p>商品价格：&nbsp;&nbsp;<span class=\"curr_price\"><i class=\"fa fa-rmb\"></i>30</span>&nbsp;&nbsp;<span class=\"ori_price\"><del><i class=\"fa fa-rmb\"></i>20</del></span></p><p>商品数量：&nbsp;&nbsp;30</p><p class=\"detail_overflow\">商品描述：&nbsp;&nbsp;<span class=\"detail\">这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜这是一个小白菜</span></p></div>");
//                      content.append(temp_img);
//                      content.append(temp_div);
//                       var button_test = $("<button class=\"btn-more\" id=\"btn-more\"><i class=\"fa fa-hand-o-down\"></i> 查看更多</button>");
//                      button_test.bind("click", stringTest, VB.readMore);
//                      $('.imgDiv').append(button_test);
//                      var a_test = $("<button class=\"btn-more\" id=\"btn-packup\"><i class=\"fa fa-hand-o-up\"></i> 收起</button>");
//                      a_test.bind("click", VB.packUp);
//                      $('.imgDiv').append(a_test);
                      	/*测试专用*/
                        
                        // judgeWords();
                        preloadFirst();
                      }
                    });                   
                    
                    /* -------- CHECK NEXT / PREV -------- */
                    function checknav(){

                      thisgall = obj.data('gall');
                      numeratio = obj.data('numeratio');
                      infinigall = obj.data('infinigall');

                      items = $('.vbox-item[data-gall="' + thisgall + '"]');

                      if(items.length > 1 && numeratio === true){
                        blocknum.html(items.index(obj)+1 + ' / ' + items.length);
                        blocknum.show();
                      }else{
                        blocknum.hide();
                      }

                      thenext = items.eq( items.index(obj) + 1 );
                      theprev = items.eq( items.index(obj) - 1 );

                      if(obj.attr(option.titleattr)){
                        title = obj.attr(option.titleattr);
                        blocktitle.show();
                      }else{
                        title = '';
                        blocktitle.hide();
                      }

                      if (items.length > 1 && infinigall === true) {

                        nextok = true;
                        prevok = true;

                        if(thenext.length < 1 ){
                          thenext = items.eq(0);
                        }
                        if(items.index(obj) < 1 ){
                          theprev = items.eq( items.index(items.length) );
                        }

                      } else {

                        if(thenext.length > 0 ){
                          $('.vbox-next').css('display', 'block');
                          nextok = true;
                        }else{
                          $('.vbox-next').css('display', 'none');
                          nextok = false;
                        }
                        if(items.index(obj) > 0 ){
                          $('.vbox-prev').css('display', 'block');
                          prevok = true;
                        }else{
                          $('.vbox-prev').css('display', 'none');
                          prevok = false;
                        }
                      }
                    }
                    
                     /* -------- NAVIGATION CODE -------- */
                    var gallnav = {
                      
                      prev: function() {

                        if (keyNavigationDisabled) {
                          return;
                        } else {
                          keyNavigationDisabled = true;
                        }

                        overlayColor = theprev.data('overlay');

                        framewidth = theprev.data('framewidth');
                        frameheight = theprev.data('frameheight');
                        border = theprev.data('border');
                        bgcolor = theprev.data('bgcolor');
                        dest = theprev.data('href') || theprev.attr('href');

                        autoplay = theprev.data('autoplay');

                        if(theprev.attr(option.titleattr)){
                          title = theprev.attr(option.titleattr);
                        }else{
                          title = '';
                        }

                        if (overlayColor === undefined ) {
                          overlayColor = "";
                        }

                        content.animate({ opacity:0}, 500, function(){
                          
                          overlay.css('background',overlayColor);

                          if (theprev.data('type') == 'iframe') {
                            loadIframe();
                          } else if (theprev.data('type') == 'inline'){
                            loadInline();
                          } else if (theprev.data('type') == 'ajax'){
                            loadAjax();
                          } else if (theprev.data('type') == 'youtube'){
                            loadYoutube(autoplay);
                          } else if (theprev.data('type') == 'vimeo'){
                            loadVimeo(autoplay);
                          }else{
                            content.html('<img src="'+dest+'">');
                            preloadFirst();
                          }
                          obj = theprev;
                          checknav();
                          keyNavigationDisabled = false;
                        });

                      },

                      next: function() {
                        
                        if (keyNavigationDisabled) {
                          return;
                        } else {
                          keyNavigationDisabled = true;
                        }

                        overlayColor = thenext.data('overlay');

                        framewidth = thenext.data('framewidth');
                        frameheight = thenext.data('frameheight');
                        border = thenext.data('border');
                        bgcolor = thenext.data('bgcolor');
                        dest = thenext.data('href') || thenext.attr('href');
                        autoplay = thenext.data('autoplay');

                        if(thenext.attr(option.titleattr)){
                          title = thenext.attr(option.titleattr);
                        }else{
                          title = '';
                        }

                        if (overlayColor === undefined ) {
                          overlayColor = "";
                        }

                        content.animate({ opacity:0}, 500, function(){
                          
                          overlay.css('background',overlayColor);

                          if (thenext.data('type') == 'iframe') {
                            loadIframe();
                          } else if (thenext.data('type') == 'inline'){
                            loadInline();
                          } else if (thenext.data('type') == 'ajax'){
                            loadAjax();
                          } else if (thenext.data('type') == 'youtube'){
                            loadYoutube(autoplay);
                          } else if (thenext.data('type') == 'vimeo'){
                            loadVimeo(autoplay);
                          }else{
                            content.html('<img src="'+dest+'">');
                            preloadFirst();
                          }
                          obj = thenext;
                          checknav();
                          keyNavigationDisabled = false;
                        });

                      }

                    };

                    /* -------- NAVIGATE WITH ARROW KEYS -------- */
                    $('body').keydown(function(e) {

                      if(e.keyCode == 37 && prevok == true) { // left
                        gallnav.prev();
                      }

                      if(e.keyCode == 39 && nextok == true) { // right
                        gallnav.next();
                      }

                    });

                    /* -------- PREVGALL -------- */
                    $('.vbox-prev').click(function(){
                      gallnav.prev();
                    });
                    
                    /* -------- NEXTGALL -------- */
                    $('.vbox-next').click(function(){
                      gallnav.next();
                    });
                    
                    /* -------- ESCAPE HANDLER -------- */
                    function escapeHandler(e) {
                      if(e.keyCode === 27) {
                        closeVbox();
                      }
                    }

                    /* -------- CLOSE VBOX -------- */

                    function closeVbox(){
                      
                      $('body').removeClass('vbox-open');
                      $('body').unbind('keydown', escapeHandler);

                        overlay.animate({opacity:0}, 500, function(){
                          overlay.remove();
                          keyNavigationDisabled = false;
                          obj.focus();
                        });
                    }

                    /* -------- CLOSE CLICK -------- */
                    var closeclickclass = '.vbox-close, .vbox-overlay';
                    if(!obj.data('overlayclose')){
                        closeclickclass = '.vbox-close';    // close only on X
                    }

                    $(closeclickclass).click(function(e){
                      evitacontent = '.figlio';
                      evitaprev = '.vbox-prev';
                      evitanext = '.vbox-next';
                      figliall = '.figlio *';
                      if(!$(e.target).is(evitacontent) && !$(e.target).is(evitanext) && !$(e.target).is(evitaprev)&& !$(e.target).is(figliall)){
                        closeVbox();
                      }
                    });
                    $('body').keydown(escapeHandler);
                    return false;
                  });
            });
        }
    });

    /* -------- LOAD AJAX -------- */
    function loadAjax(){
      $.ajax({
      url: dest,
      cache: false
      }).done(function( msg ) {
          content.html('<div class="vbox-inline">'+ msg +'</div>');
          updateoverlay(true);

      }).fail(function() {
          content.html('<div class="vbox-inline"><p>Error retrieving contents, please retry</div>');
          updateoverlay(true);
      })
    }

    /* -------- LOAD IFRAME -------- */
    function loadIframe(){
      content.html('<iframe class="venoframe" src="'+dest+'"></iframe>');
    //  $('.venoframe').load(function(){ // valid only for iFrames in same domain
      updateoverlay();
    //  });
    }

    /* -------- LOAD VIMEO -------- */
    function loadVimeo(autoplay){
      var pezzi = dest.split('/');
      var videoid = pezzi[pezzi.length-1];
      var stringAutoplay = autoplay ? "?autoplay=1" : "";
      content.html('<iframe class="venoframe" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" src="//player.vimeo.com/video/'+videoid+stringAutoplay+'"></iframe>');
      updateoverlay();
    }

    /* -------- LOAD YOUTUBE -------- */
    function loadYoutube(autoplay){
      var pezzi = dest.split('/');
      var videoid = pezzi[pezzi.length-1];
      var stringAutoplay = autoplay ? "?autoplay=1" : "";
      content.html('<iframe class="venoframe" webkitallowfullscreen mozallowfullscreen allowfullscreen src="//www.youtube.com/embed/'+videoid+stringAutoplay+'"></iframe>');
      updateoverlay();
    }

    /* -------- LOAD INLINE -------- */
    function loadInline(){
      content.html('<div class="vbox-inline">'+$(dest).html()+'</div>');
      updateoverlay();
    }

    /* -------- PRELOAD IMAGE -------- */
    function preloadFirst(){
        prima = $('.vbox-content').find('img');
        prima.one('load', function() {
          updateoverlay();
        }).each(function() {
          if(this.complete) $(this).load();
        });
    }

    /* -------- CENTER ON LOAD -------- */
    function updateoverlay(){

      blocktitle.html(title);
      content.find(">:first-child").addClass('figlio');
      $('.figlio').css('width', framewidth).css('height', frameheight).css('padding', border).css('background', bgcolor);

      sonH = content.outerHeight();
      finH = $(window).height();

      if(sonH+80 < finH){
        margine = (finH - sonH)/2.5;
        content.css('margin-top', margine);
        content.css('margin-bottom', margine);

      }else{
        content.css('margin-top', '40px');
        content.css('margin-bottom', '40px');
      }
      content.animate({
        'opacity': '1'
      },'slow');
    }

    /* -------- CENTER ON RESIZE -------- */
    function updateoverlayresize(){
      if($('.vbox-content').length){
        sonH = content.height();
        finH = $(window).height();

        if(sonH+80 < finH){
          margine = (finH - sonH)/2;
          content.css('margin-top', margine);
          content.css('margin-bottom', margine);
        }else{
          content.css('margin-top', '40px');
          content.css('margin-bottom', '40px');
        }
      }
    }
    
    /* -------- 限制字符个数显示省略号 -------- */
    function judgeWords(){
		var $detailOver = $(".detail");
		$("div.imgDiv .detail_overflow").find($detailOver).each(function(i) {
			if($(this).text().length > maxwidth) {
				$(this).text($(this).text().substring(0, maxwidth));
				$(this).html($(this).html() + '...');
				$('#btn-more').show();
				$('#btn-packup').hide();
			}else{
				$('#btn-more').hide();
				$('#btn-packup').hide();
			}
		});
    }
    
    $(window).resize(function(){
      updateoverlayresize();
    });

})(jQuery);

