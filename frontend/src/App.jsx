import { useState, useEffect } from 'react'

import './App.css'

function App() {
const[videos, setVideos] = useState([])
const[animes,setAnimes] = useState([])
const[animeEscolhido,setAnimeEscolhido] = useState(null)
const[token, setToken] = useState(null)

useEffect(() => {
  if (!token) return
  const comPulseira = { headers: { Authorization: `Token ${token}` } }
  fetch('http://127.0.0.1:8000/api/videos/', comPulseira).then(r => r.json()).then(setVideos)
  fetch('http://127.0.0.1:8000/api/animes/', comPulseira).then(r => r.json()).then(setAnimes)
},[token])


function adicionarVideo(e) {
  e.preventDefault()
  const dados = Object.fromEntries(new FormData(e.target))
  fetch('http://127.0.0.1:8000/api/videos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',  Authorization: `Token ${token}` },
    body: JSON.stringify(dados),
  }).then(r =>{
    if(r.ok){
      r.json().then(novo => setVideos([...videos, novo]))
    } else{
      alert('Nao deu para salvar o video. Confere se o titulo e o link estao certos')
    }
  })
}
function adicionarAnime(e) {
  e.preventDefault()
  const dados = Object.fromEntries(new FormData(e.target))
  if (!dados.duasCores){
    dados.cor2 = ''
  }
  fetch('http://127.0.0.1:8000/api/animes/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    body: JSON.stringify(dados),
  }).then(r =>{
    if(r.ok){
      r.json().then(novo => setAnimes([...animes, novo]))
    } else{
      alert('Nao deu para salvar o Anime.')
    }
  })
}

function fazerLogin(e) {
  e.preventDefault()
  const dados = Object.fromEntries(new FormData(e.target))
  fetch('http://127.0.0.1:8000/api/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(dados),
  }).then(r =>{
    if(r.ok){
      r.json().then(resposta => setToken(resposta.token))
    } else{
      alert('Usuario ou senha errado.')
    }
  })
}

const videosMostrados = animeEscolhido === null ? videos : videos.filter(video => video.anime === animeEscolhido) 
const tipos = ['Música','Explained','Edit','Humor']
const tiposComVideo = tipos.filter(tipo => videosMostrados.some(video => video.tipo_display === tipo))
function fundoDoBotao(anime){
  if (anime.cor2) {
    return `linear-gradient(90deg ,${anime.cor}, ${anime.cor2})`
  }else {
    return anime.cor
  }
}
  return (
    <div>
    <h1>Videoteca</h1>
    {token === null ? (
    <form onSubmit={fazerLogin} className='formulario'>
      <input name='username' placeholder='Usuário' />
      <input name='password' type='password' placeholder='Senha' />
      <button>Entrar</button>
    </form>
    ) : (
      <p>Voce Entrou</p>
    )}
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
      <form onSubmit={adicionarAnime} className='formulario'>
        <input name='nome' placeholder='Nome do anime'></input>
        <input type="color" name="cor"  defaultValue="#d8b4fe"/>
        <label><input type="checkbox" name="duasCores" /> duas cores</label>
        <input type="color" name="cor2" defaultValue="#d8b4fe" />
        <button>Adicionar anime</button>
      </form>
      <div className={animeEscolhido === null ? 'filtros' : 'filtros escolhendo'}>
        <button onClick={() => setAnimeEscolhido(null)} className={animeEscolhido === null ? 'ativo' : ''}>Todos</button>
            {animes.map(anime => (
                  <button onClick={() => setAnimeEscolhido(anime.id)} 
                  key={anime.id} className={anime.id === animeEscolhido ? 'ativo' : ''} style={{ background: fundoDoBotao(anime) }}
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
