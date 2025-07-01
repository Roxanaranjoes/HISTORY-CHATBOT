// =====================
// Characters Data
// =====================
const personajes = [
  {
    nombre: "Jesús",
    frase: "Bienaventurados los que buscan la verdad.",
    imagen: "./assets/jesus.png",
  },
  {
    nombre: "Frida Kahlo",
    frase: "Pies, ¿para qué los quiero si tengo alas para volar?",
    imagen: "./assets/frida.png",
  },
  {
    nombre: "Nikola Tesla",
    frase: "Si quieres encontrar los secretos del universo, piensa en energía.",
    imagen: "./assets/tesla.png",
  },
  {
    nombre: "Lao Tze",
    frase: "La naturaleza no se apresura, sin embargo, todo se logra.",
    imagen: "./assets/lao.png",
  },
  {
    nombre: "Cleopatra",
    frase: "No estoy hecha para vivir en la sombra de ningún hombre.",
    imagen: "./assets/cleopatra.png",
  },
  {
    nombre: "Canserbero",
    frase: "Lo importante no es cuántas veces caes, sino cuántas te levantas.",
    imagen: "./assets/canserbero.png",
  },
  {
    nombre: "Leonardo da Vinci",
    frase: "El aprendizaje nunca agota la mente.",
    imagen: "./assets/davinci.png",
  },
  {
    nombre: "Chester Bennington",
    frase: "I tried so hard and got so far, but in the end...",
    imagen: "./assets/chester.png",
  },
  {
    nombre: "Martin Luther King",
    frase: "I have a dream.",
    imagen: "./assets/mlk.png",
  },
  {
    nombre: "Michael Jackson",
    frase: "Heal the world, make it a better place.",
    imagen: "./assets/mj.png",
  },
  {
    nombre: "Atila",
    frase: "Donde pisa mi caballo no vuelve a crecer la hierba.",
    imagen: "./assets/atila.png",
  },
  {
    nombre: "Alejandro Magno",
    frase: "No hay nada imposible para quien lo intenta.",
    imagen: "./assets/alejandro.png",
  },
  {
    nombre: "Marco Aurelio",
    frase: "Todo lo que escuchamos es una opinión, no un hecho.",
    imagen: "./assets/marco.png",
  },
  {
    nombre: "Juana de Arco",
    frase: "Estoy hecha para hacer esto, aunque muera por ello.",
    imagen: "./assets/juana.jpeg",
  },
  {
    nombre: "Abraham",
    frase: "Camina en mi presencia y sé perfecto.",
    imagen: "./assets/abraham.png",
  },
  {
    nombre: "Hitler",
    frase: "El poder sin control solo conduce a la destrucción.",
    imagen: "./assets/hitler.png",
  },
  {
    nombre: "Steve Jobs",
    frase: "Stay hungry, stay foolish.",
    imagen: "./assets/jobs.png",
  },
  {
    nombre: "Gabriel García Márquez",
    frase: "La vida no es la que uno vivió, sino la que uno recuerda.",
    imagen: "./assets/gabo.png",
  },
  {
    nombre: "Espartaco",
    frase: "Prefiero morir de pie que vivir de rodillas.",
    imagen: "./assets/espartaco.png",
  },
  {
    nombre: "Nobunaga",
    frase: "El guerrero no teme a la muerte, sino al olvido.",
    imagen: "./assets/nobunaga.png",
  },
  {
    nombre: "Newton",
    frase: "Estoy en los hombros de gigantes.",
    imagen: "./assets/newton.png",
  },
  {
    nombre: "José",
    frase: "Los sueños revelan lo que está por venir.",
    imagen: "./assets/jose.png",
  },
  {
    nombre: "Leónidas",
    frase: "¡Esto es Esparta!",
    imagen: "./assets/leonidas.png",
  },
  {
    nombre: "Walker Atkinson",
    frase: "La mente es la que crea las condiciones para el éxito.",
    imagen: "./assets/atkinson.png",
  },
  {
    nombre: "Brian Tracy",
    frase: "El éxito es el logro progresivo de un objetivo digno.",
    imagen: "./assets/tracy.png",
  },
];

const preguntasSugeridas = [
  "¿Qué consejo me darías?",
  "¿Cómo enfrentaste tus miedos?",
  "¿Cuál fue tu mayor logro?",
  "¿Cómo era la vida en tu época?",
  "¿Cuál es tu visión sobre el futuro?",
  "¿Qué piensas sobre el poder y la justicia?",
  "¿Cuál es tu filosofía de vida?",
];

// =====================
// DOM Elements
// =====================
const personajeImagen = document.getElementById("personajeImagen");
const personajeNombre = document.getElementById("personajeNombre");
const personajeFrase = document.getElementById("personajeFrase");

const chatBox = document.getElementById("chat");
const mensajeInput = document.getElementById("mensaje");
const enviarBtn = document.getElementById("enviar");
const elegirPersonajeBtn = document.getElementById("elegirPersonaje");

const acordeon = document.querySelector(".acordeon");
const panelPreguntas = document.querySelector(".panel");
const listaPreguntas = document.getElementById("lista-preguntas");

const clickSound = document.getElementById("clickSound");
const hoverSound = document.getElementById("hoverSound");

let personajeActual = personajes[Math.floor(Math.random() * personajes.length)];


let historialConversacion = [];
cargarPersonaje();

// =====================
// Functions
// =====================

// Load Character Info
function cargarPersonaje() {
  personajeImagen.src = personajeActual.imagen;
  personajeNombre.textContent = personajeActual.nombre;
  personajeFrase.textContent = `"${personajeActual.frase}"`;
}

// Add Message to Chat with Role Name
function agregarMensaje(texto, clase, nombre = "") {
  const mensajeDiv = document.createElement("div");
  mensajeDiv.classList.add("mensaje", clase);

  const nombreSpan = document.createElement("strong");
  nombreSpan.style.display = "block";
  nombreSpan.style.color = "#f5d29f";
  nombreSpan.style.marginBottom = "4px";
  nombreSpan.textContent = nombre;

  const mensajeTexto = document.createElement("p");
  mensajeTexto.textContent = texto;

  const timestamp = document.createElement("span");
  timestamp.classList.add("timestamp");
  const hora = new Date();
  timestamp.textContent = hora.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  mensajeDiv.appendChild(nombreSpan);
  mensajeDiv.appendChild(mensajeTexto);
  mensajeDiv.appendChild(timestamp);

  chatBox.appendChild(mensajeDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  return mensajeDiv;
}

// Clear chat
function limpiarChat() {
  chatBox.innerHTML = "";
}

// Artificial delay
function cargarHistorialFalso() {
  return new Promise((resolve) => {
    const cargando = agregarMensaje("Cargando mensajes antiguos…", "sistema");
    setTimeout(() => {
      cargando.remove();
      resolve();
    }, 1500);
  });
}

// Initial greeting
function renderizarHistorial() {
  limpiarChat();
  agregarMensaje(
    `Estás hablando con ${personajeActual.nombre}.`,
    "personaje",
    personajeActual.nombre
  );
}

// Send message
function enviarMensaje() {
  const texto = mensajeInput.value.trim();
  if (!texto) return;
  clickSound.play();
  agregarMensaje(texto, "usuario", "Tú");
  historialConversacion.push({ role: "user", content: texto });
  mensajeInput.value = "";
  preguntarAOpenAI();
}

// Connect to OpenAI API
async function preguntarAOpenAI() {
  const url = "https://history-chatbot-v1u7.onrender.com/chat";


  const headers = { "Content-Type": "application/json" };

  
  if (historialConversacion.length > 40) {
    historialConversacion = historialConversacion.slice(-40);
  }

  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Eres ${personajeActual.nombre}. Responde como si fueras él o ella, utiliza la jerga de la época, saluda solo la primera vez que se te hable, usa coloquios propios y responde en 4 líneas.`,
      },
      ...historialConversacion,
    ],
    temperature: 0.7,
  };

  const escribiendoDiv = agregarMensaje(
    "Esperando respuesta de la IA...",
    "personaje",
    personajeActual.nombre
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const respuesta = data.choices[0].message.content;

    escribiendoDiv.remove();
    agregarMensaje(respuesta, "personaje", personajeActual.nombre);

    historialConversacion.push({ role: "assistant", content: respuesta });
  } catch (error) {
    console.error("Error en la API:", error);
    escribiendoDiv.remove();
    agregarMensaje(
      "❌ Error al conectar con OpenAI.",
      "personaje",
      personajeActual.nombre
    );
  }
}

// =====================
// Event Listeners
// =====================

// Send Message
enviarBtn.addEventListener("click", enviarMensaje);

// Enter Key
mensajeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") enviarMensaje();
});

// Random Character Button
elegirPersonajeBtn.addEventListener("click", () => {
  clickSound.play();
  personajeActual = personajes[Math.floor(Math.random() * personajes.length)];
  historialConversacion = [];
  cargarPersonaje();
  renderizarHistorial();
});

// Acordeon Toggle
acordeon.addEventListener("click", () => {
  acordeon.classList.toggle("active");
  if (panelPreguntas.style.maxHeight) {
    panelPreguntas.style.maxHeight = null;
  } else {
    panelPreguntas.style.maxHeight = panelPreguntas.scrollHeight + "px";
  }
  clickSound.play();
});

// Load Suggested Questions
preguntasSugeridas.forEach((pregunta) => {
  const li = document.createElement("li");
  li.textContent = pregunta;
  li.addEventListener("click", () => {
    mensajeInput.value = pregunta;
    clickSound.play();
  });
  listaPreguntas.appendChild(li);
});

// Hover Sounds
document.querySelectorAll("button, li").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    try {
      hoverSound.play();
    } catch (e) {}
  });
});

// =====================
// Init
// =====================
window.addEventListener("DOMContentLoaded", async () => {
  cargarPersonaje();
  await cargarHistorialFalso();
  renderizarHistorial();
});
