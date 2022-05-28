require('dotenv').config();

const express = require('express');

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://arimantas:jurjonas@cluster0.lvpet.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const app = express();

const knygos = [
  'Haris porteris',
  'Dziungliu knyga',
];

app.listen(process.env.PORT, () => {
  console.log('Serveris paleistas. Laukia užklausų');
});

app.get('/books', (request, response) => {
  client.connect(async () => {
    const database = client.db('Knyguprojektas');
    const collection = database.collection('Knygos');
    const result = await collection.find({}).toArray();

    response.json(result);
    client.close();
  });
});

app.get('/books/:id', (request, response) => {
  response.json(knygos);
});

app.post('/books', (request, response) => {
  client.connect(async () => {
    const database = client.db('Knyguprojektas');
    const collection = database.collection('Knygos');
    const result = await collection.insertOne({
      name: request.body.bookName,
      pageCount: request.body.bookPageCount,
    });

    response.json(result);

    client.close();
  });
});

app.get('/books/:from/:to', (request, response) => {
  const fromIndex = request.params.from;
  const toIndex = request.params.to;

  const atgnybtasMasyvas = knygos.slice(fromIndex, toIndex);

  response.json(atgnybtasMasyvas);
});
