var GhostRouter = Backbone.Router.extend({

  routes: {
    '' : 'index',
    ':cid' : 'openProfile'
  },

  index: function() {
    $paneEl.empty();
  },

  openProfile: function(cid) {
    views.list[cid].open();
  }

});