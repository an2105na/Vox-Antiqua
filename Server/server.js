const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('[![Netlify Status](https://api.netlify.com/api/v1/badges/49a08648-855f-4ed2-8118-f9ca92fcea2e/deploy-status)](https://app.netlify.com/sites/voxantique/deploys)', {
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
