(function($){

	'use strict';

	function FileStyle(element){
		this.element = element;
		this.init();
	}

	FileStyle.prototype = {
		init:function(){
			var element = $(this.element);
			var text = element.siblings('.placeholder');
			var parent = element.parent();
			var clear = element.siblings('.attach-icon--remove');
			//hide input field
			element.addClass('hidden');


			var placeholder = element.data('placeholder');
			if (placeholder === 'undefined'){
				placeholder = "Приложить файл";
			}
			text.text(placeholder);

			element.on('change.filestyle', function(){
				var value = element.val();
				console.log(value);
				if (value === ''){
					parent.removeClass('attachment');
					text.text(placeholder);
				}
				else{
					parent.addClass('attachment');
					text.text(value);
				}
			});

			clear.on('click', function(){
				element.val("");
				element.trigger('change.filestyle');
			});


		}
	};

	$.fn.filestyle = function(options){
		this.each(function(){
			// Attach FileStyle only if unattached
			if (!$.data(this, 'filestyle')){
				$.data(this, 'file', new FileStyle(this));
			}
		});
	};

})(jQuery);