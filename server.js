const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://an2105na:<db_password>@cluster0.0bivn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storySchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  location: {
    lat: Number,
    lng: Number
  },
  media: [String]
});

const Story = mongoose.model('Story', storySchema);

app.post('/stories', async (req, res) => {
  const story = new Story(req.body);
  await story.save();
  res.send(story);
});

app.get('/stories', async (req, res) => {
  const stories = await Story.find();
  res.send(stories);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
