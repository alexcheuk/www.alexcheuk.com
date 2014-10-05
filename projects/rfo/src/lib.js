;(function ( $, window, document, undefined ) {

	var defaults = {
		onSelect : function(){},
		data : []
	};

	var templates = {
		wrapper : '<div class="selectable">',
		arrow : '<div class="selectable_arrow-container">',
		content : '<div class="selectable_content">',
		data_list : '<ul>'
	}

	function Selectable( element, options ){
		this.$select = $(element);
		this.options = $.extend(null, defaults, options);
		this._init();
	}

	Selectable.prototype = {
		_init: function(){
			this._createElement();
			this._sync();
			this._initBinds();			
		},

		_sync : function(){
			if(this.$content.hasClass('selectable--placeholder')) return;

			var initOption = this.$select.find('option:selected');
			this.$content.text(initOption.text());

			this.$data_list.find('.selected').removeClass('selected');
		 	this.$data_list.find('[data-value="'+initOption.val()+'"]').addClass('selected');
		},

		 _createElement: function(){
		 	this.$wrapper = $(templates.wrapper);
		 	this.$data_list = $(templates.data_list);
		 	this.$content = $(templates.content);
		 	this.$arrow = $(templates.arrow);

		 	this.$select.replaceWith(this.$wrapper);
			this.$wrapper.append(this.$select);
			this.$wrapper.append(this.$data_list);
			this.$wrapper.append(this.$content);
			this.$wrapper.append(this.$arrow);

			//Hide Select
			this.$select.addClass('selectable--hide');

			//Label
			if(this.$select.attr('label')) this.$wrapper.append('<label>'+this.$select.attr('label')+'</label>');

			//Classes
			if(this.$select.hasClass('selectable--green')) this.$wrapper.addClass('selectable--green')
			if(this.$select.hasClass('selectable--inline')) this.$wrapper.addClass('selectable--inline')

			//Placeholder
			if(this.$select.attr('placeholder')) this.$content.text(this.$select.attr('placeholder')).addClass('selectable--placeholder');

			//Populate options to data list
			var that = this;
			this.$select.find('option').each(function(){
				var option = $(this);

				that.options.data.push({
					text : option.text(),
					value : option.prop('value')
				});

				that.$data_list.append('<li data-value="'+option.prop('value')+'">'+option.text()+'</li>')
			});
		 },

		 _initBinds: function(){
		 	var that = this;

		 	this.$wrapper.on('click', function(){
		 		that.$data_list.toggle();

		 		window.setTimeout(function(){
		 			that.$select.focus();
		 		}, 0);

		 	});

		 	that.$select.on('blur', function(){
		 		var focused = that.$data_list.find('.focused');
		 		focused.trigger('click').removeClass('focused');
		 		that.$data_list.hide();
		 	});

		 	this.$data_list.find('li').on('mouseover', function(event){
		 		that.$data_list.find('.focused').removeClass('focused');
		 		$(this).addClass('focused');
		 	}).on('mouseout', function(event){
		 		$(this).removeClass('focused');
		 	});

		 	this.$data_list.find('li').on('click', function(event){
		 		var $this = $(this);

		 		that.$select.val($this.data('value'));
		 		that.$content.removeClass('selectable--placeholder');
		 		that._sync();

		 		that.options.onSelect($this.text(), $this.data('value'));

		 		event.preventDefault();
		 		event.stopPropagation();
		 	});
		 },

		 value : function(){
		 	return this.selected_data;
		 }
	}

	$.fn.Selectable = function(method) {
		if (Selectable.prototype[method]) {
			if(!$(this).data('selectable_data')){
				console.warn('Element has not been initialized before, initializing with default options.');
				$(this).Selectable();
			}

			return $(this).data('selectable_data')[method].apply($(this).data('selectable_data'), Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return this.each(function() {
				if ( !$.data( this, "selectable_data" ) ) {
						$.data( this, "selectable_data", new Selectable( this, method || {} ) );
				}
			});
		} else {
			$.error('Method ' + method + ' does not exist on selectable');
		}
	};
})( jQuery, window, document );