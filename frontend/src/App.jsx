import { useState, useEffect } from 'react'

import './App.css'

function App() {
const[videos, setVideos] = useState([])
useEffect(() => {
  fetch('http://127.0.0.1:8000/api/videos/').then(r => r.json()).then(setVideos)
},[])

  return (
    <div>
    <h1>Videoteca</h1>
    {videos.map(video => (
      <div key={video.id}>
        <p>{video.titulo} - {video.anime_nome}</p>
        <iframe
        src={`https://www.youtube.com/embed/${video.youtube_id}`}
        width="560"
        height="315"
        allowFullScreen
        ></iframe>
      </div>
    ))}
    </div>
  )
};

export default App
