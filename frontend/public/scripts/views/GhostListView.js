var GhostListView = Backbone.View.extend({

  tagName: 'li',
  className: 'ghostEntry',

  template: _.template($('#list-item-tpl').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    $listEl.append(this.el);
    return this;
  },

  events: {
    'click' : 'open'
  },

  open: function(e) {
    this.trigger('open', {cid: this.model.cid});
    var openView;
    if (!views.panes[this.model.cid]) {
      openView = views.panes[this.model.cid] = new GhostPaneView({model: this.model});
    } else openView = views.panes[this.model.cid];
    openView.render();
  }

});