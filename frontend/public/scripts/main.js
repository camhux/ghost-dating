var ghostCollection = new Backbone.Collection;

ghostCollection.url = '/ghosts';

$('#fetch').click(function() {
  ghostCollection.fetch()
    .done(function(data) {
      alert(ghostCollection.pluck('name'));
    });
});