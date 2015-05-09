var GhostRouter = Backbone.Router.extend({

  routes: {
    '' : 'index',
    ':cid' : 'openProfile'
  },

  index: function() {
    $('#open-pane').empty();
  },

  openProfile: function(cid) {
    views.list[cid].open();
  }

});