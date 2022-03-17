const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongo = require('./utils/connect');
const route  = require('./routes/countryroutes');

const port = process.env.PORT || 3001;
dotenv.config();

(async () => {
    try {
      // db connection
      await mongo.connect();

      //middlewares
      app.use(cors())
      app.use(express.json());
      app.get('/', (req, res) =>{
          res.send('health check')
      })
      app.use(route)

      app.listen(port, () => {
        console.log("server is up at port " + port);
      });
  
    } catch (error) {
      console.log("Error while starting app");
    }
  })();