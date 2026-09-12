const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finance-legal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

cron.schedule('0 9 * * *', async () => {
  console.log('Running contract deadline check...');
});

cron.schedule('0 */6 * * *', async () => {
  console.log('Running financial health check...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
