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
    'click' : 'triggerRoute'
  },

  triggerRoute: function() {
    ghostRouter.navigate(this.model.cid, {trigger: true});
  },

  open: function(e) {
    var openView;
    if (!views.panes[this.model.cid]) {
      openView = views.panes[this.model.cid] = new GhostPaneView({model: this.model});
    } else openView = views.panes[this.model.cid];
    openView.render();
  }

});