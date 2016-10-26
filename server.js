var express = require('express');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');
var parser = require('osu-parser');

app.use(express.static('nso'));

app.get('/test/:dir/:file', function(req, res) {
  res.send(req.params.dir + ', ' + req.params.file);
});

app.get('/skin/:skin/:file', function(req, res) {
  var path = __dirname + '/nso/Skins/' + req.params.skin + '/' + req.params.file;
  if (fs.existsSync(path))
    res.sendFile(path);
  else {
    path = __dirname + '/nso/Skins/Default/' + req.params.file;
    if (fs.existsSync(path))
      res.sendFile(path);
    else
      res.sendStatus(599);
  }
});

app.get('/parsemap/:dir/:file', function(req, res) {
  var file = "nso/Songs/" + req.params.dir + "/" + req.params.file;
  parser.parseFile(file, function(err, beatmap) {
    if (err) console.log(err);
    res.json(beatmap);
  });
});

app.get('/parseskin/:file', function(req, res) {
  var file = "nso/Skins/" + req.params.file + "/skin.ini";
  parser.parseSkinFile(file, function(err, skin) {
    if (err) { console.log(err); res.json(err) }
    res.json(skin);
  });
});

server.listen(process.env.PORT, function() {
  console.log('Running...');
});