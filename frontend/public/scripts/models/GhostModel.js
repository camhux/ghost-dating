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