
import mongoose from "mongoose";
import express from "express";
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 1010;
const LIMIT = 3000;

let hits = 0;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pixel', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected to database'))
.catch((error) => console.log("Mongoose error", error))

const DataSchema = new mongoose.Schema({
  price: Number
});

const DataModel = mongoose.model('Data', DataSchema);

const API_URL = 'https://dev.pixelsoftwares.com/api.php';
const TOKEN = 'ab4086ecd47c568d5ba5739d4078988f';

let responseData = null;
let lastUpdateTime = null;

app.get('/api/data', async (req, res) => {
  if (hits >= LIMIT) {
    console.log('API hit limit reached. Stopping server.');
    server.close();
  } else if (responseData && lastUpdateTime && Date.now() - lastUpdateTime < 60000) {
    res.json(responseData);
  } else {
    await fetchData();
    res.json(responseData);
  }
});
async function fetchData(){
  if (!responseData || Date.now() - lastUpdateTime >= 60000) {
    try {
      const response = await axios.post(API_URL, 'symbol=BTCUSDT', {
        headers: {
          token: TOKEN,
        },
      });
      responseData = response.data.data;
      lastUpdateTime = Date.now();
      const newData = new DataModel({
        price: responseData.price 
      });
      await newData.save();
      hits++; 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
