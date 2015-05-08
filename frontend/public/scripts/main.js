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
  className: 'ghostEntry',

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

  tagName: 'div',
  className: 'ghostOpen',

  template: _.template($('#open-tpl').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    $('#open-pane').html(this.el);
    return this;
  }

});

var ghostCollection = new Backbone.Collection({
  model: Ghost
});

ghostCollection.url = '/ghosts';

ghostCollection.fetch({reset: true})
  .done(function() {
    ghostCollection.forEach(function(ghost) {
      var view = views[ghost.cid] = new GhostListView({model: ghost});
      view.render();
    });
  });