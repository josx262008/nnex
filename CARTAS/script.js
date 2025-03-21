/************************************************************************
 * 1. GENERAR EL ARRAY dailyMessages CON 365 MENSAJES ÚNICOS
 ************************************************************************/
// Conjunto de saludos (7 elementos)
const greetings = [
  "Buenos días, mi amor.",
  "Despierta, mi diosa.",
  "Amada mía, cada amanecer es un regalo.",
  "Mi dulce sol, hoy renace la pasión.",
  "Despierta, mi musa, el día te espera.",
  "Buenos días, reina de mis sueños.",
  "Mi amor, el sol brilla para ti."
];

// Conjunto de cuerpos (7 elementos)
const bodies = [
  "Tu belleza enciende mis deseos más profundos.",
  "Cada rayo de sol me recuerda tus besos ardientes.",
  "Eres la inspiración de mis más intensas fantasías.",
  "Mi corazón late con fuerza al pensar en tus caricias.",
  "Tu mirada me enciende y me sumerge en un mar de pasión.",
  "Cada minuto sin ti es una eternidad de anhelo y placer.",
  "Eres el fuego que aviva mi alma y mis sueños."
];

// Conjunto de finales (7 elementos)
const endings = [
  "Te deseo con locura y ternura infinita.",
  "Que este día te llene de besos y dulces caricias.",
  "Mi pasión por ti crece con cada amanecer.",
  "Eres mi deseo más profundo y mi alegría sin fin.",
  "Que cada instante sea un suspiro de amor y pasión.",
  "Te amo más allá de las palabras y la razón.",
  "Eres mi fantasía, mi realidad y mi mayor anhelo."
];

let dailyMessages = [];

// Generar combinaciones: 7 x 7 x 7 = 343 mensajes
for (let i = 0; i < greetings.length; i++) {
  for (let j = 0; j < bodies.length; j++) {
    for (let k = 0; k < endings.length; k++) {
      dailyMessages.push(
        `Carta ${dailyMessages.length + 1}: ${greetings[i]} ${bodies[j]} ${endings[k]}`
      );
    }
  }
}

// Agregar 22 mensajes extra para alcanzar 365
for (let i = 1; i <= 22; i++) {
  dailyMessages.push(
    `Carta ${dailyMessages.length + 1}: Mi amor, cada amanecer contigo es un universo de placer y ternura inigualable. Te deseo con pasión y dulzura.`
  );
}

// Verificar que el array tenga 365 elementos
console.log("Total de mensajes:", dailyMessages.length);

/************************************************************************
 * 2. FUNCIONES PARA MOSTRAR LA CARTA DEL DÍA Y EL HISTORIAL
 ************************************************************************/
// Devuelve el día del año (valor entre 1 y 365/366)
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Muestra la pantalla de bienvenida
function showWelcomeScreen() {
  document.getElementById("welcomeScreen").style.display = "flex";
  document.getElementById("cardContainer").classList.add("hidden");
  document.getElementById("allCardsContainer").classList.add("hidden");
}

// Se ejecuta al pulsar "ABRIR"
function openApp() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("cardContainer").classList.remove("hidden");
  showDailyCard();
}

// Muestra la carta del día actual (solo la carta del día de hoy, sin incluir el historial)
function showDailyCard() {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  // Usamos (dayOfYear - 1) como índice, ya que el primer día es 1
  const index = (dayOfYear - 1) % dailyMessages.length;
  const message = dailyMessages[index];
  
  document.getElementById("cardMessage").innerText = message;
  document.getElementById("cardDate").innerText = "Fecha: " + today.toDateString();
  
  // Mostrar u ocultar el botón de historial: se muestra solo si ya han pasado días anteriores
  if (dayOfYear > 1) {
    document.getElementById("historyBtn").classList.remove("hidden");
  } else {
    document.getElementById("historyBtn").classList.add("hidden");
  }
}

// HISTORIAL DE CARTAS: ahora muestra solo la carta del día anterior
function showAllMessages() {
  document.getElementById("cardContainer").classList.add("hidden");
  const allCardsContainer = document.getElementById("allCardsContainer");
  allCardsContainer.classList.remove("hidden");

  const today = new Date();
  const dayOfYear = getDayOfYear(today);

  const listDiv = document.getElementById("allCardsList");
  listDiv.innerHTML = ""; // Limpiar antes de agregar

  if (dayOfYear > 1) {
    // Mostrar solo la carta del día anterior (día = dayOfYear - 1)
    const index = (dayOfYear - 2) % dailyMessages.length; // (dayOfYear-2) porque el array es 0-indexado
    const msg = dailyMessages[index];
    const p = document.createElement("p");
    p.innerText = `Día ${dayOfYear - 1}: ${msg}`;
    listDiv.appendChild(p);
  } else {
    listDiv.innerHTML = "<p>No hay cartas en el historial aún.</p>";
  }
}

  // Construir la lista de todas las cartas hasta el día anterior al actual
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  // Se muestran solo los días 1 hasta (dayOfYear - 1)
  const totalDays = Math.max(dayOfYear - 1, 0);

  const listDiv = document.getElementById("allCardsList");
  listDiv.innerHTML = ""; // Limpiar antes de agregar

  for (let i = 1; i <= totalDays; i++) {
    const index = (i - 1) % dailyMessages.length;
    const msg = dailyMessages[index];
    const p = document.createElement("p");
    p.innerText = `Día ${i}: ${msg}`;
    listDiv.appendChild(p);
  }


// Oculta el historial y vuelve a la carta del día actual
function hideAllMessages() {
  document.getElementById("allCardsContainer").classList.add("hidden");
  document.getElementById("cardContainer").classList.remove("hidden");
}

// Regresa a la pantalla de bienvenida
function goHome() {
  showWelcomeScreen();
}
