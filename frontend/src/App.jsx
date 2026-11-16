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
      <p key={video.id}> {video.titulo} - {video.anime_nome}</p>
    ))}
    </div>
  )
};

export default App
