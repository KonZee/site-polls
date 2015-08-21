$(document).ready(function(){

	// Main menu polls section
	$('.menu__polls').mouseenter(function(){
		$('.menu__polls-dropdown').slideDown('fast');
	});
	$('.menu__polls').mouseleave(function(){
		$('.menu__polls-dropdown').slideUp('fast');
	});

	// input[type="file"] styling
	$(':file').filestyle();

	// Add elements on page
	$('.input__addelement').on('click', function(e){
		e.preventDefault();
		var prev = $(this).prev();
		var clone = prev.clone();
		clone.find('.attachment').removeClass('attachment');
		clone.insertBefore(this);
		clone.find(':file').filestyle();
	});
	// Remove elements
	$('.form__group').on('click', '.input__remove', function(){
		$(this).parent().remove();
	});
//	$('.form__group').on('click', '.attach-icon--remove', function(){
//		$(this).parent().remove();
//	});

	// Enable tablesorter
	$('table').tablesorter();

 });
