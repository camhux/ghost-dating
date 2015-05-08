var views = {list: {}, panes: {}};

var Ghost = Backbone.Model.extend({

  defaults: {
    name: '',
    age: 0,
    image: 'https://placekitten.com/g/200/400'
  },

  validate: function validate(attrs, options) {
    if (!attrs.name) {
      return 'You must pick a name to represent yourself here, even if you are ancient and innominate';
    }

    if (isNaN(attrs.age)) {
      return 'Age must be a number';
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
    var openView;
    if (!views.panes[this.model.cid]) {
      openView = views.panes[this.model.cid] = new GhostOpenView({model: this.model});
    } else openView = views.panes[this.model.cid];
    openView.render();
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

ghostCollection.on('add', function(ghost) {
  ghost.save();
  var view = views.list[ghost.cid] = new GhostListView({model: ghost});
  view.render();
});

ghostCollection.url = '/ghosts';

ghostCollection.fetch({reset: true})
  .done(function() {
    ghostCollection.forEach(function(ghost) {
      var view = views.list[ghost.cid] = new GhostListView({model: ghost});
      view.render();
    });
  });

var $addButton = $('#create-ghost');
var $profileForm;

$addButton.click(function(event) {
  var newGhost = new Ghost();

  $('#open-pane').html($('#create-tpl').html());
  $profileForm = $('#profile-form');

  $profileForm.submit(function(event) {
    event.preventDefault();
    newGhost.set({
      name: $profileForm.find('[name="name"]').val(),
     age: parseInt($profileForm.find('[name="age"]').val(), 10)
   });
    console.log(newGhost);
    if (!newGhost.isValid()) {
      alert(newGhost.validationError);
      newGhost.clear();
    } else {
      ghostCollection.add(newGhost);
      $('#open-pane').empty();
    }
  });
});

