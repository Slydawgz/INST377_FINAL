const express = require('express');
const path = require('path'); // Import the 'path' module
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
const supabaseUrl = 'https://bfsqoukxpynbbcxuozyr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmc3FvdWt4cHluYmJjeHVvenlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3NjA3NTQsImV4cCI6MjAzMTMzNjc1NH0.aNpGGnO4w_90OL3iLR7H2OVWLLJeAIn5Izi1x4IN3H8'; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the directory for views and the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route to render the main page
app.get('/', async (req, res) => {
  try {
    const [animeResponse, scoringResponse, top5Response] = await Promise.all([
      axios.get(`${supabaseUrl}/rest/v1/anime`, { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }),
      axios.get(`${supabaseUrl}/rest/v1/score`, { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }),
      axios.get(`${supabaseUrl}/rest/v1/top_5`, { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } })
    ]);

    const animeData = animeResponse.data || [];
    const scoringData = scoringResponse.data || [];
    const top_5_anime_data = top5Response.data || [];

    const top_5_anime = top_5_anime_data.map(anime => {
      const animeId = anime.id;
      const animeScoreObj = scoringData.find(score => score.id === animeId);
      const animeScore = animeScoreObj ? animeScoreObj.score : null;

      return {
        id: animeId,
        title: anime.title,
        image_url: anime.image_url,
        score: animeScore
      };
    });

    const page_obj = animeData.map(anime => {
      const animeId = anime.id;
      const animeScoreObj = scoringData.find(score => score.id === animeId);
      const animeScore = animeScoreObj ? animeScoreObj.score : null;

      return {
        id: animeId,
        title: anime.title,
        image_url: anime.image_url,
        score: animeScore
      };
    });

    res.render('Main', { page_obj, top_5_anime });
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle anime search
app.get('/search_anime', async (req, res) => {
  try {
    const query = req.query.query;
    const apiUrl = `https://api.jikan.moe/v4/anime?q=${query}`;

    const response = await axios.get(apiUrl);
    const searchResults = response.data.data; // Ensure to access the correct data structure
    console.log('Search Results:', searchResults);
    res.render('search_anime', { searchResults });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Other routes
app.get('/About', (req, res) => {
  res.render('About');
});

app.get('/Help', (req, res) => {
  res.render('Help');
});

app.get('/Contact', (req, res) => {
  res.render('Contact_us');
});

app.post('/submit-form', (req, res) => {
  const formData = req.body;
  res.render('Form_Submition', { formData });
});

// Start the server if not in production
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Export the app for Vercel
module.exports = app;
