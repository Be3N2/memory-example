
/*
Proof of debugger memory issue
Compare this in a browser with the dubugger active
vs one that is inactive:

for (var i = 0; i < 10000; i++) {
    $('button').click();
}
*/

$ (function () {
	'use strict';
  

	var ButtonView = Backbone.View.extend ({
		tagName : 'button',

		events : {
			'click' : 'onClick'
		},

		initialize : function (options) {
			this.collection = options.collection;
		},

		render : function () {
			this.$el.html ('Click');
			return this;
		},

		onClick : function (event) {
			this.collection.reset ([
				{ "id" : _.random (0, 1000), data : new Array (100000).join ('a') },
				{ "id" : _.random (0, 1000), data : new Array (100000).join ('a') },
				{ "id" : _.random (0, 1000), data : new Array (100000).join ('a') }
			]);
		}
	});

	var ListView = Backbone.View.extend ({
		tagName : 'ul',

		initialize : function (options) {
			console.log("initialize");
			options || (options = {});

			this.views = [];
			this.collection = options.collection;

			this.listenTo (this.collection, 'reset', this.render);
		},

		empty : function () {
			console.log("Empty")
			_.each (this.views, function (view) {
				view.remove ();
			});

			this.$el.empty ();
			this.views = [];

			if (this.collection) console.log("Has collection");
			this.collection.each(function(item) {
				console.log("In empty", item.cid);
			});
		},

		render : function () {
			this.empty ();

			this.collection.each (function (model) {
				var view = new ListItemView ({ model : model });
				this.views.push (view);
				this.$el.append (view.render ().el);
			}, this);

			return this;
		}
	});

	var ListItemView = Backbone.View.extend ({
		tagName : 'li',

		initialize : function (options) {
			options || (options = {});

			this.model = options.model;

			this.listenTo (this.model, 'change', this.render);
		},

		render : function () {
			this.$el.html (this.model.get ('id'));
			return this;
		},

		remove : function () {
			
			if (this.model) {
				//this.model.clear ();
				console.log("Should remove", this.model.cid);
				//delete this.model;
			}
			
		}
	});

	var Model = Backbone.Model.extend ({
		defaults : {
			id : null,
			name : '',
			data : ''
		}
	});

	var Collection = Backbone.Collection.extend ({
		model : Model,

		parse : function (response, options) {
			return response.models || response;
		}
	});

	var collection = new Collection ();
	var list = new ListView ({ collection : collection });
	var button = new ButtonView ({ collection : collection });

	$ ('body')
		.append (list.render ().el)
		.append (button.render ().el);

});
