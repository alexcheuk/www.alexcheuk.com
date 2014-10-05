$(function(){

	var RFO = {

		searchTimer: null,

		init: function(){
			this.cacheElements();
			this.initBinds();
			this.initSelectables();
		},

		cacheElements: function(){
			this.$searchbar = $('.rfo-input-search');
			this.$searchbar_wrapper = $('.rfo-searchbar-wrapper');
			this.$searchresult_wrapper = $('.rfo-result-wrapper');
			this.$lineitem_form = $('.rfo-createform-lineitem');
			this.$rfo_progression = $('.rfo-progression');

			this.$cart_wrapper = $('.cart-wrapper');
			this.$cart_btn_expand = $('.cw-expand-btn');

			this.$btn_add_line = $('.rcl-submit-btn');
		},

		initBinds: function(){
			this.$searchbar.on('keydown', this.OnSearch);

			this.$searchresult_wrapper.on('click', '.rrw-itemlist li', this.OnSearchResultClick);
			this.$cart_btn_expand.on('click', function(){
				RFO.$cart_wrapper.toggleClass('cart-wrapper--expanded');
			});

			this.$btn_add_line.on('click', function(){
				RFO.$cart_wrapper.addClass('cart-wrapper--expanded');
			});
		},

		initSelectables: function(){
			$('.selectable').Selectable();
		},

		setStage: function(stage){
			switch(stage){
				case "search":
					RFO.$searchbar_wrapper.show().addClass('active');
					break;
				
				case "create":
					RFO.$searchbar_wrapper.hide().removeClass('active');
					RFO.$searchresult_wrapper.hide().removeClass('active');
					this.$rfo_progression.addClass('rfo-progression--2');
					RFO.$lineitem_form.show();
					break;					
			}
		},

		OnSearch: function(e){
			if(RFO.searchTimer){
				clearTimeout(RFO.searchTimer);
			}

			RFO.searchTimer = setTimeout(function(){
				RFO.$searchresult_wrapper.show();

				setTimeout(function(){
					RFO.$searchresult_wrapper.addClass('active');
				});

			}, 300);
		},

		OnSearchResultClick: function(e){
			RFO.setStage("create");
			RFO.$lineitem_form.show();
		}
	};
	RFO.init();
	window.RFO = RFO;

	// RFO.setStage("create");
	
});