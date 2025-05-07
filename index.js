const express = require('express');
const axios = require('axios');
const app = express();

const st = "ON";
const port = 3000;

app.use(express.json());


app.get('/alldl', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Missing url query parameter' });

    const response = await axios.get(`https://aryan-video-downloader.vercel.app/alldl?url=${encodeURIComponent(url)}`);
    const data = response.data?.data;

    if (!data) {
      return res.status(404).json({ msg: response, status: st });
    }

    const videos = {
      title: data.title || null,
      thumbnail: data.thumbnail || null,
      low: data.low || null,
      high: data.high || null
    };

    res.json({ videos });
  } catch (error) {
    res.status(500).json({ status: st, url: videos });
  }
});


app.get('/imgur', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Missing url query parameter' });

    const imgurResponse = await axios.get(`https://itz.aryan-error-apis.rf.gd/upload?link=${encodeURIComponent(url)}`);

    res.json({
      success: true,
      link: imgurResponse.data.link
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image to Imgur', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
