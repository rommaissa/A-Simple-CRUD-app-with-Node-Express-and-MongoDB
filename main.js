const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose
  .connect('mongodb://localhost/star-wars-quotes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('database connected'))
  .catch((err) => console.log(err.message));

const quotesSchema = new mongoose.Schema({
  name: String,
  quote: String,
});

const Quote = mongoose.model('quotes', quotesSchema);

app.get('/', (req, res) => {
  Quote.find({}, (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(result);
      res.render('index.ejs', { quote: result, err: null });
    }
  });
});

app.post('/quotes', (req, res) => {
  const quote = new Quote({
    name: req.body.name,
    quote: req.body.quote,
  });

  quote.save(function (err) {
    if (err) throw err;
    console.log('quote created!');
  });
  res.redirect('/');
});

app.put('/quotes', (req, res) => {
  Quote.findOneAndUpdate(
    { name: 'Yoda' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote,
      },
    },
    { new: true }
  )
    .then((doc) => res.json(doc))
    .catch((err) => res.status(400).send(err));
});

app.delete('/quotes', (req, res) => {
  Quote.deleteOne({ name: req.body.name }, { new: true }, function (err, data) {
    if (err) console.log(err);
    if (data.deletedCount === 0) {
      return res.json('No quote to delete');
    }
    res.json("Deleted Darth Vadar's quote");
  });
});

app.listen(5000, function () {
  console.log('app listening on 5000');
});
