const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

// getBeers() is a method on the punkAPI and it'll return all the beers
app.get('/beers', async (req, res) => {
  try {
    const beersFromApi = await punkAPI.getBeers();
    res.render('beers', { beersFromApi });
  } catch (error) {
    console.log(error);
  }
});

// getRandom() is a method on the punkAPI and it'll return an array with a random beer, this is the reason for put await between () and [0]
app.get('/random-beer', async (req, res) => {
  try {
    const randomBeerFromApi = (await punkAPI.getRandom())[0];
    res.render('randomBeer', { randomBeerFromApi });
  } catch (error) {
    console.log(error);
  }
});

// dynamic route - grab information from url
app.get('/beer-detail/:beerId', async (req, res) => {
  try {
    const myBeerId = req.params.beerId;
    console.log('my params: ', req.params, 'my id only: ', myBeerId);

    // getBeer() return an array, this is the reason for put await between () and [0]
    const clickedBeer = (await punkAPI.getBeer(myBeerId))[0];
    console.log('here is the one: ', clickedBeer);

    res.render('beerDetail', { clickedBeer });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
