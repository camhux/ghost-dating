var views = {list: {}, panes: {}};
var $listEl = $('#list');
var $paneEl = $('#open-pane');

var ghostCollection = new GhostCollection();

ghostCollection.on('add', function(ghost) {
  ghost.save();
  var view = views.list[ghost.cid] = new GhostListView({model: ghost});
  view.render();
  $listEl.append(view.el);
});

var ghostRouter;

ghostCollection.fetch({reset: true})
  .then(function() {

    ghostCollection.forEach(function(ghost) {
      var view = views.list[ghost.cid] = new GhostListView({model: ghost});
      view.render();
      $listEl.append(view.el);
    });

    ghostRouter = new GhostRouter();
    _.each(views.list, function(view) {
      ghostRouter.listenTo(view, 'open', function(data) {
        this.navigate(view.model.cid);
      });
    });

    Backbone.history.start();
  });

var $addButton = $('#create-ghost');
var $profileForm;

$addButton.click(function clickHandler(event) {
  ghostRouter.navigate('create');
  var newGhost = new Ghost();

  $paneEl.html($('#create-tpl').html());
  $profileForm = $('#profile-form');

  $profileForm.submit(function(event) {
    event.preventDefault();
    newGhost.set({
      name: $profileForm.find('[name="name"]').val(),
      age: +($profileForm.find('[name="age"]').val())
   });
    console.log(newGhost);
    if (!newGhost.isValid()) {
      alert(newGhost.validationError);
      newGhost.clear();
    } else {
      ghostCollection.add(newGhost);
      ghostRouter.navigate('', {trigger: true});
    }
  });
});
