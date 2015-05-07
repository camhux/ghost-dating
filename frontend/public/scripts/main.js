var views = {};

var Ghost = Backbone.Model.extend({

  defaults: {
    name: '',
    age: 0
  },

  validate: function validate(attrs, options) {
    if (!attrs.name) {
      return 'You must pick a name to represent yourself here, even if you are ancient and innominate';
    }
  }

});


var GhostListView = Backbone.View.extend({

  tagName: 'li',

  template: _.template($('#list-item-tpl').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    $('#list').append(this.el);
    return this;
  },

  events: {
    click: 'open'
  },

  open: function(e) {
    var newOpenView = new GhostOpenView({model: this.model});
    newOpenView.render();
  }

});


var GhostOpenView = Backbone.View.extend({

  el: '#open-pane',

  template: _.template($('#open-tpl').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  }

});

var ghostCollection = new Backbone.Collection({
  model: Ghost
});

ghostCollection.url = '/ghosts';

ghostCollection.fetch();

console.log(ghostCollection.models);

ghostCollection.each(function(model) {
  var view = views[model.cid] = new GhostListView({model: model});
});