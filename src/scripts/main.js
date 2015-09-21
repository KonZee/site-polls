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

	/*
	 * Columns on the result page
	 */
	// Show/Hide options menu
	$('.js-results-settings').on('click', function(e){
		e.preventDefault();
		$('.js-results-options').slideToggle();
	});

	// Prepare data for options window
	var resultsTable = $('.js-results-table');
	var dataLength = resultsTable.find('th').length;
	for (var i = 0; i < dataLength; i++){
		var th = resultsTable.find('th').eq(i);
		var text = th.text();
		$('.js-results-options-content').append("<label class='input__label input__label--checkbox input__label--block'><input class='input input--checkbox' type='checkbox'><span>" + text+ "</span></div>");
		if(th.is(':visible')){
			$('.js-results-options-content').children().eq(i).find('input').prop('checked', true);
		}
	}

	// Set minimum height of results for prevent options out of table
	var optionsHeigth = $('.js-results-options').show().height();
	$('.js-results-options').hide();
	$('.results').css({'min-height': optionsHeigth + 100 + 'px'});

	// Check/uncheck checkbox
	$('.js-results-options-content').on('click', 'label', function(){
		var index = $(this).index();
		if ($(this).children('input').is(':checked')){
			resultsTable.find('tr').each(function(){
				$(this).children().eq(index).show();
			});
		}
		else{
			resultsTable.find('tr').each(function(){
				$(this).children().eq(index).hide();
			});
		}
	});

 });
