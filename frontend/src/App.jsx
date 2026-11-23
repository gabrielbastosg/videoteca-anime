import { useState, useEffect } from 'react'

import './App.css'

function App() {
const[videos, setVideos] = useState([])
const[animes,setAnimes] = useState([])
const [animeEscolhido,setAnimeEscolhido] = useState(null)

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
const videosMostrados = animeEscolhido === null ? videos : videos.filter(video => video.anime === animeEscolhido) 
const tipos = ['Humor','Música','Edit','Explained']
const tiposComVideo = tipos.filter(tipo => videosMostrados.some(video => video.tipo_display === tipo))
  return (
    <div>
    <h1>Videoteca</h1>
    <form onSubmit={adicionarVideo} className='formulario'>
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
      <div className='filtros'>
        <button onClick={() => setAnimeEscolhido(null)}>Todos</button>
            {animes.map(anime => (
                  <button onClick={() => setAnimeEscolhido(anime.id)} 
                  key={anime.id} className={anime.id === animeEscolhido ? 'ativo' : ''}
                  >{anime.nome} 
                  </button>
                ))}
        </div>
      
      {tiposComVideo.map(tipo => (
        <div key={tipo}>
          <h2>{tipo}</h2>
    <div className="lista-videos">
    {videosMostrados.filter(video => video.tipo_display === tipo).map(video => (
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
      ))}
    </div>
  )
}

export default App
