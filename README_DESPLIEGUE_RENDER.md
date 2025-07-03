# 📦 HISTORY-CHATBOT — Despliegue seguro con Render y conexión al frontend

Este documento resume el proceso para desplegar un backend seguro con Render para proteger tu clave API de OpenAI, integrarlo a un frontend estático y garantizar que la comunicación entre ambos funcione correctamente.

---

## 🧠 ¿Por qué se creó un backend?

La clave privada de OpenAI no debe exponerse en el frontend (HTML/JS). Para protegerla:

- Creamos un servidor proxy (`api-proxy`) con Node.js y Express.
- Este servidor recibe las solicitudes del frontend y las reenvía de forma segura a OpenAI, usando la clave privada como variable de entorno.

---

## 📁 Estructura del proyecto

El proyecto final quedó así:

```
HISTORY-CHATBOT/
│
├── api-proxy/             # Backend (proxy seguro para la API)
│   ├── server.js
│   ├── .env               # Aquí va la clave OPENAI_API_KEY (nunca se sube)
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/      # Se genera con `npm install` (ignorada por git)
│
├── assets/                # Imágenes del chatbot
├── styles/                # CSS
├── script/                # JS del frontend (incluye fetch a /chat)
├── index.html             # Página principal del chatbot
├── README.md              
└── .gitignore             # Ignora node_modules y .env correctamente
```

---

## 🛠️ Cambios clave al backend (`api-proxy/server.js`)

Archivo `server.js`:

```js
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Proxy que redirige las peticiones a OpenAI
app.post("/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error al conectar con OpenAI:", error);
    res.status(500).json({ error: "Error al conectar con OpenAI" });
  }
});

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("API Proxy funcionando.");
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
```

---

## 📄 Variables de entorno

Archivo: `api-proxy/.env`

```
OPENAI_API_KEY=tu_clave_secreta_aqui
```

> 🔐 Este archivo no se sube a GitHub porque está en `.gitignore`.

---

## 📌 Archivo `.gitignore`

Debe contener:

```
node_modules/
.env
```

---

## 🚀 Despliegue del backend en Render

### 1. Crear el repositorio

Sube el proyecto a tú GitHub:  
🔗 https://github.com/Roxanaranjoes/HISTORY-CHATBOT

### 2. Crear un nuevo servicio en Render

1. Ir a: https://dashboard.render.com
2. Haz clic en **New > Web Service**.
3. Conecta tu cuenta de GitHub y selecciona el repositorio.
4. En la configuración:

   - **Name**: history-chatbot-api  
   - **Root Directory**: `api-proxy`  
   - **Runtime**: Node  
   - **Build Command**: `npm install`  
   - **Start Command**: `node server.js`  
   - **Region**: Oregón (o la que prefieras)  
   - **Branch**: `main`  (aqui pones la rama principal de tu repo)

5. Haz clic en **Advanced > Add Environment Variable**:

   - **Key**: `OPENAI_API_KEY`  
   - **Value**: tu clave privada de OpenAI  

6. Haz clic en **Create Web Service**.

---

### 3. Esperar que Render construya y despliegue el backend

Verás logs como:

```
Servidor funcionando en http://localhost:10000
==> Available at your primary URL:
https://history-chatbot-v1u7.onrender.com
```

---

## 🌐 Conexión con el frontend

En tu `script.js` (frontend):

Busca la parte donde se hace el `fetch` y usa la URL del backend de Render:

```js
const url = "https://history-chatbot-v1u7.onrender.com/chat";
```

> Asegúrate que esta URL sea la de tu servicio en Render y que al final tenga "/chat"

---

## ✅ Verificación final

1. Carga tu `index.html` desde Netlify o localmente.  
2. Escribe un mensaje.  
3. El mensaje debe llegar al backend en Render, que lo reenvía a OpenAI.  
4. Recibirás una respuesta simulando el personaje histórico.