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
    <div className="lista-videos">
    {videos.map(video => (
      <div key={video.id} className="video-card">
        <iframe
        src={`https://www.youtube.com/embed/${video.youtube_id}`}
        allowFullScreen
        ></iframe>
        <p>{video.titulo} - {video.anime_nome}</p>
      </div>
    ))}
      </div>
    </div>
  )
};

export default App
