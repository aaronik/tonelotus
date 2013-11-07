// an attempt at binding space bar - i thought maybe if the view contained the whole doc, it'd 
//  be able to bind a listenTo to it as it's not outside of its "scope" or whatever

ToneLotus.Views.BodyView = Backbone.View.extend({
	$el: $(document),

	initialize: function(){
		console.log("in bodyview and my $el is " + this.$el)
		this.listenTo(this.$el, 'keypress', function(){alert("body_view heard a keypress")});
	}
})