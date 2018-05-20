


$(document).ready(function() {
 	var sync1 = $("#sync1");
 	sync1.owlCarousel({
	singleItem : true,
	slideSpeed : 1000,
	navigation: false,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
	pagination:false,
//	afterAction : syncPosition,
	responsiveRefreshRate : 200,
	transitionStyle : "fade"
  });
	//MoxItUp Activate
//	$('#portfolio-container').mixItUp();
    
    //Scroll To Top
    $("a[href='#scrolltop']").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
    
    //jQuery Counter
    $('.counter').counterUp({
        delay: 10,
        time: 2500
    });
	//Sticky Menu
    $("#main-navbar").sticky({topSpacing:0});
    
    //Lightbox
//  $('.venobox').venobox();
    
});
$(window).load(function() { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({
		'overflow': 'visible'
	});
	$('#portfolio-container').mixItUp();
	$('.venobox').venobox();
//	$("#portfolio-container").on('DOMContentLoaded', function(e) {
//		alert(1);
//		$('.venobox').venobox();
//	});
//	$('.portfolio-work').on('DOMSubtreeModified','div',function(){ 
//      $('.venobox').venobox();
//	}) 
})