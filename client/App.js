import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import StoryMarker from './StoryMarker';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('/stories')
      .then(response => {
        setStories(response.data);
      })
      .catch(error => {
        console.error('Error fetching stories:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Vox Antiqua</h1>
      <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: "600px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stories.map(story => (
          <StoryMarker key={story._id} story={story} />
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
