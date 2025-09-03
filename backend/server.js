const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MikroORM } = require('@mikro-orm/core');
const mikroOrmConfig = require('./mikro-orm.config');
const { initRouter } = require('./routes/requests');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: false,
}));
app.use(bodyParser.json());

const start = async () => {
  try {
    const orm = await MikroORM.init(mikroOrmConfig);

  
    const generator = orm.getSchemaGenerator();
    await generator.ensureDatabase();
    await generator.updateSchema();

    const router = initRouter(orm);
    app.use('/api', router);
const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log('Backend running on http://localhost:5000'));
  } catch (err) {
    console.error(err);
  }
};

start();
