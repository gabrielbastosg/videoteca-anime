import { useState, useEffect } from 'react'

import './App.css'

function App() {
const[videos, setVideos] = useState([])
const[animes,setAnimes] = useState([])
useEffect(() => {
  fetch('http://127.0.0.1:8000/api/videos/').then(r => r.json()).then(setVideos)
  fetch('http://127.0.0.1:8000/api/animes/').then(r => r.json()).then(setAnimes)
},[])

function adicionarVideo(e) {
  e.preventDefault()
  const dados = Object.fromEntries(new FormData(e.target))
  fetch('http://127.0.0.1:8000/api/videos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }).then(r =>{
    if(r.ok){
      r.json().then(novo => setVideos([...videos, novo]))
    } else{
      alert('Nao deu para salvar o video. Confere se o titulo e o link estao certos')
    }
  })
}
  return (
    <div>
    <h1>Videoteca</h1>
    <form onSubmit={adicionarVideo}>
      <input name='titulo' placeholder="Título" />
      <select name='tipo'>
        <option value="Edit">Edit</option>
        <option value="Musica">Música</option>
        <option value="Explained">Explained</option>
        <option value="Humor">Humor</option>
      </select>
      <select name='anime'>
        {animes.map(anime => (
          <option key={anime.id} value={anime.id}>{anime.nome}</option>
        ))}
      </select>
      <input name='link' placeholder="link do Youtube" />
      <button>Adicionar</button>
    </form>
    <div className="lista-videos">
    {videos.map(video => (
      <div key={video.id} className="video-card">
        <iframe
        src={`https://www.youtube.com/embed/${video.youtube_id}`}
        allowFullScreen
        ></iframe>
        <div className="video-info">
        <p className="titulo"> {video.titulo} </p>
        <p className="detalhes"> {video.tipo_display} | {video.anime_nome} </p>
        </div>
      </div>
    ))}
      </div>
    </div>
  )
};

export default App
