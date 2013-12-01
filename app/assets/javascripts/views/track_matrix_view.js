ToneLotus.Views.Tracked = Backbone.View.extend({
	initialize: function (options) {
		this.matrix = options.matrix;
		this.$el.attr('data-cid', this.matrix.cid);
	},

	events: {

	},

	render: function(){
		this.$el.html(this.matrix.label);
		return this;
	},

	hide: function(){
		this.$el.detach();
	}
});