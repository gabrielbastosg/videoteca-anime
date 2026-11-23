# Videoteca de Anime

Um projeto onde vou poder guardar os vídeos de animes que vejo no YouTube, separados por anime e por tipo.

Fiz isso pois no YouTube, mesmo podendo guardar eles com like ou em biblioteca, eles ficam todos misturados.


## O que já faz

- **API REST** (Django REST Framework) com os vídeos em `/api/videos/` e os animes em `/api/animes/`.
- **Player do YouTube** dentro de cada cartão. O Django tira o id do vídeo de qualquer formato de link (`watch?v=`, `youtu.be`, `shorts`, com `&t=` no fim).
- **Só aceita link do YouTube**: um validator no model barra o resto, tanto pela API quanto pelo admin.
- **Formulário no React** que adiciona vídeo novo pela API, sem recarregar a página, e avisa se o link ou o título estiverem errados.
- **Filtro por anime** com botões, e os vídeos separados em seções por tipo (Música, Explained, Edit, Humor).
- **Grade que se ajusta** ao PC e ao celular.

## Stack

Python · Django 5.2 · Django REST Framework · django-cors-headers · React 19 · Vite · SQLite

## Como rodar

São dois servidores, cada um no seu terminal: o Django na porta 8000 e o React
na 5173.

**Backend**

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env         # Linux/macOS: cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Os vídeos e os animes são cadastrados em `http://127.0.0.1:8000/admin/`.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173/`.
