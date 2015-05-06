var db = require('../fixtureData');

module.exports = {
  get: function(id) {
    return db.ghosts[id] || false;
  },

  save: function(data) {
    if (Object.keys(data).length > 0) {
      console.log(data);
      db.ghosts.push(data);

      return db.ghosts[db.ghosts.length - 1];
    }

    return false;
  },

  update: function(id, data) {
    if(!db.ghosts[id]) {
      return false;
    }

    db.ghosts[id] = data;
    return db.ghosts[id];
  },

  delete: function(id) {
    if (!db.ghosts[id]) {
      return false;
    }

    db.ghosts[id] = null;
    return true;
  }
};
