import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('/stories').then(response => {
      setStories(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Vox Antiqua</h1>
      <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: "600px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stories.map(story => (
          <Marker key={story._id} position={[story.location.lat, story.location.lng]}>
            <Popup>
              <h2>{story.title}</h2>
              <p>{story.subtitle}</p>
              <p>{story.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
