var express = require('express'),
    bodyParser = require('body-parser');

var db = require('../db/ghostModel');

var ghostRouter;
module.exports = ghostRouter = express.Router();

ghostRouter.use(bodyParser.json({extended: true}));

ghostRouter.get('/:id', function (req, res) {
  var ghost = db.get(req.params.id);
  if(!ghost) {
    return res.status(404).json({error: 'ghost not found'});
  }

  res.json(ghost);
});

ghostRouter.post('/', function (req, res) {
  var newGhost = db.save(req.body);

  if(!newGhost) {
    return res.status(400).json({error: 'empty request'});
  }

  res.json(newGhost);
});

ghostRouter.put('/:id', function (req, res) {
  var updatedGhost = db.update(req.params.id, req.body);

  if (!updatedGhost) {
    return res.status(404).json({error: 'ghost not found'});
  }

  res.json(updatedGhost)
});