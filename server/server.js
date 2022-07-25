const express = require('express');
const cors = require('cors');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';

const dir = `${__dirname}/public/uploads`;
const upload = multer({ dest: dir });
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.json(req.file);

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) throw err;
      const dbo = db.db('mydb');
      const image = {
        name: req.file.originalname,
        path: `http://localhost:4000/uploads/${req.file.filename}`,
      };

      dbo.collection('images').insertOne(image, (err, res) => {
        if (err) throw err;
        db.close();
      });
    });
  } else throw 'error';
});

app.get('/images', (req, res) => {
  MongoClient.connect(dbUrl, (err, db) => {
    if (err) throw err;
    const dbo = db.db('mydb');
    dbo
      .collection('images')
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
});

app.listen(PORT, () => {
  console.log('Listening at ' + PORT);
});
