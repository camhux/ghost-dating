var GhostPaneView = Backbone.View.extend({

  tagName: 'div',
  className: 'ghostOpen',

  template: _.template($('#open-tpl').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    $('#open-pane').html(this.el);
    return this;
  }

});