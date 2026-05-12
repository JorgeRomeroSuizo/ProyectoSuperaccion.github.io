// let userId = "";
const firebaseConfig = {
    apiKey: "AIzaSyAXD6ZaDuXJBiaHue40xGxY6JvVouER_QA",
    authDomain: "superaccionchat.firebaseapp.com",
    databaseURL: "https://superaccionchat-default-rtdb.firebaseio.com",
    projectId: "superaccionchat",
    storageBucket: "superaccionchat.firebasestorage.app",
    messagingSenderId: "430325481857",
    appId: "1:430325481857:web:67efe7bae4ba4df0f5e880"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

//Variables compatibilidad
let extraversion = 0
let incomodidad = 0
let ritmo = 0
let inicio = 0


function alterarV(cambio=0, ex=0, inc=0, rit=0, start=0){
    if (ex===1) {
    extraversion=extraversion+cambio
    }
    if (inc===1) {
        incomodidad=incomodidad+cambio
    }
    if (rit===1) {
        ritmo=ritmo+cambio
    }
    if (start===1) {
        inicio=inicio+cambio
    }
}
let boton1 = document.getElementById("iCrearCuenta")
let nombre = ""
boton1.addEventListener("click", cambio0)
function cambio0(){
    document.body.innerHTML = `
    <h1>Porfavor ingrese su nombre</h1>
    <br>
    <br>
    <input id="name" placeholder="Tu nombre">
    <br>
    <br>
    <button onclick="cambio1()">Listo para empezar</button>
  `;

}
function cambio1(){
    nombre = document.getElementById("name").value;
    document.body.innerHTML = `
    <h1>¿Te cuesta socializar?</h1>
    <br>
    <br>
    <button onclick="cambio2(); alterarV(cambio=1, ex=1, inc=0, rit=0, start=0)">No mucho</button>
    <br>
    <br>
    <button onclick="cambio2(); alterarV(cambio=0.5, ex=1, inc=0, rit=0, start=0)">A veces</button>
    <br>
    <br>
    <button onclick="cambio2(); alterarV(cambio=0, ex=1, inc=0, rit=0, start=0)">Si, bastante</button>
  `;
}
function cambio2(){
    document.body.innerHTML = `
    <h1>¿En qué situaciones te sientes mas incómodo?</h1>
    <br>
    <br>
    <button onclick="cambio3(); alterarV(cambio=0.25, ex=0, inc=1, rit=0, start=0)">Hablar con desconocidos</button>
    <br>
    <br>
    <button onclick="cambio3(); alterarV(cambio=1, ex=0, inc=1, rit=0, start=0)">Grupos grandes</button>
    <br>
    <br>
    <button onclick="cambio3(); alterarV(cambio=0.50, ex=0, inc=1, rit=0, start=0)">Iniciar conversaciones</button>
    <br>
    <br>
    <button onclick="cambio3(); alterarV(cambio=0.75, ex=0, inc=1, rit=0, start=0)">Mantener conversaciones</button>
  `;
}
function cambio3(){
    document.body.innerHTML = `
    <h1>¿Que ritmo prefieres para interactuar?</h1>
    <br>
    <br>
    <button onclick="cambio4(); alterarV(cambio=0.0, ex=0, inc=0, rit=1, start=0)">Lento y tranquilo</button>
    <br>
    <br>
    <button onclick="cambio4(); alterarV(cambio=0.5, ex=0, inc=0, rit=1, start=0)">Normal</button>
    <br>
    <br>
    <button onclick="cambio4(); alterarV(cambio=1, ex=0, inc=0, rit=1, start=0)">Poco a poco pero constante</button>
  `;
}
function cambio4(){
    document.body.innerHTML = `
    <h1>¿Cómo te gustaría empezar a interactuar?</h1>
    <br>
    <br>
    <button onclick="cambio5(); alterarV(cambio=0.0, ex=0, inc=0, rit=0, start=1)">Con ayuda guiada paso a paso</button>
    <br>
    <br>
    <button onclick="cambio5(); alterarV(cambio=0.5, ex=0, inc=0, rit=0, start=1)">Con alguien en una situación similar</button>
    <br>
    <br>
    <button onclick="cambio5(); alterarV(cambio=1, ex=0, inc=0, rit=0, start=1)"">Solo explorar por ahora</button>
  `;
}
function cambio5(){
    document.body.innerHTML = `
    <h1>¿Quieres compartir algo mas sobre ti? (opcional)</h1>
    <br>
    <br>
    <button onclick="alert('Esta funcion aun no esta disponible, agradecemos su paciencia')">Si</button>
    <br>
    <br>
    <button onclick="cambio6()">No</button>
  `;
}
function cambio6(){
    document.body.innerHTML = `
    <p>Preparando tu espacio seguro...</p>
    <br>
    <div id="loader"></div>
  `;
    setTimeout(() => cambio7(), 3000);
}
let userId = db.ref("users").push().key; // unique ID for this user

function cambio7() {
    if (!sessionStorage.getItem("userId")) {
        sessionStorage.setItem("userId", db.ref("users").push().key);
    }
    userId = sessionStorage.getItem("userId");

    db.ref("users/" + userId).set({
        nombre: nombre,
        extraversion: extraversion,
        incomodidad: incomodidad,
        ritmo: ritmo,
        inicio: inicio,
        roomId: null,
        time: Date.now()
    }).then(() => {
        escucharSolicitudes(); // start listening for requests
        buscarMatch();
    });
}
function buscarMatch() {
    let segundos = 10;

    document.body.innerHTML = `
        <p>Buscando usuarios compatibles...</p>
        <p id="countdown">${segundos} segundos</p>
    `;

    // Countdown timer
    const timer = setInterval(() => {
        segundos--;
        if (document.getElementById("countdown")) {
            document.getElementById("countdown").innerText = segundos + " segundos";
        }
        if (segundos <= 0) clearInterval(timer);
    }, 1000);

    // Keep checking for 30 seconds then show results
    setTimeout(() => {
        db.ref("users").once("value", function(snapshot) {
            const users = snapshot.val();
            let matches = [];

            for (let id in users) {
                if (id === userId) continue;
                if (users[id].nombre === nombre) continue; // skip same name

                if (Date.now() - users[id].time > 5 * 60 * 1000) {
                    db.ref("users/" + id).remove(); // delete inactive user
                    continue;
                }
                const u = users[id];
                const score =
                    Math.abs(u.extraversion - extraversion) +
                    Math.abs(u.incomodidad - incomodidad) +
                    Math.abs(u.ritmo - ritmo) +
                    Math.abs(u.inicio - inicio);

                matches.push({ id, score, ...u });
            }
            matches.sort((a, b) => a.score - b.score);
            matches = matches.slice(0, 3);
            mostrarMatches(matches);
        });
    }, 10000);
}

function mostrarMatches(matches) {
    if (matches.length === 0) {
        document.body.innerHTML = `
            <h1>No encontramos usuarios compatibles aún</h1>
            <p>Intenta más tarde</p>
        `;
        return;
    }

    const maxScore = 4;

    let botones = matches.map(match => {
        const compatibilidad = Math.round((1 - match.score / maxScore) * 100);
        return `
        <button onclick="iniciarChat('${match.id}', '${match.nombre}', ${compatibilidad})">
            ${match.nombre} — ${compatibilidad}% compatible
        </button>
        <br><br>
    `;
    }).join("");

    document.body.innerHTML = `
        <h1>Usuarios compatibles</h1>
        <br>
        ${botones}
    `;
}
function iniciarChat(matchId, matchNombre, compatibilidad) {
    const roomId = userId < matchId
        ? userId + "_" + matchId
        : matchId + "_" + userId;

    db.ref("users/" + matchId + "/request").set({
        from: userId,
        fromNombre: nombre,
        roomId: roomId,
        compatibilidad: compatibilidad
    });

    document.body.innerHTML = `<p>Esperando que ${matchNombre} acepte...</p>`;

    // Listen for acceptance
    db.ref("rooms/" + roomId + "/accepted").on("value", function(snapshot) {
        if (snapshot.val() === true) {
            entrarChat(roomId, matchNombre);
        }
    });
}

function aceptarChat(roomId, matchNombre, matchId) {
    db.ref("users/" + userId + "/request").remove();
    document.getElementById("popup")?.remove();

    // Set accepted FIRST, then enter chat
    db.ref("rooms/" + roomId + "/accepted").set(true).then(() => {
        entrarChat(roomId, matchNombre);
    });
}
function entrarChat(roomId, matchNombre) {
    document.body.innerHTML = `
        <h1>Chat con ${matchNombre}</h1>
        <div id="chat"></div>
        <input id="message" placeholder="Mensaje">
        <button onclick="sendMessage('${roomId}')">Enviar</button>
    `;

    const ahora = Date.now();

    db.ref("rooms/" + roomId + "/messages")
        .orderByChild("time").startAt(ahora)
        .on("child_added", function(snapshot) {
            const msg = snapshot.val();
            document.getElementById("chat").innerHTML += `
                <p><b>${msg.name}:</b> ${msg.text}</p>
            `;
        });
}
function escucharSolicitudes() {
    db.ref("users/" + userId + "/request").on("value", function(snapshot) {
        const req = snapshot.val();
        if (!req) return;

        // Show popup no matter what page they're on
        const popup = document.createElement("div");
        popup.id = "popup";
        popup.innerHTML = `
            <p><b>${req.fromNombre}</b> quiere hablar contigo</p>
            <p>${req.compatibilidad}% compatible</p>
            <button onclick="aceptarChat('${req.roomId}', '${req.fromNombre}', '${req.from}')">Aceptar</button>
            <button onclick="rechazarChat('${req.from}')">Rechazar</button>
        `;
        document.body.appendChild(popup);
    });
}


function rechazarChat(matchId) {
    db.ref("users/" + matchId + "/request").remove();
    db.ref("users/" + userId + "/request").remove();
    document.getElementById("popup")?.remove();
}
// function iniciarChat(matchId, matchNombre) {
//     const roomId = userId < matchId
//         ? userId + "_" + matchId
//         : matchId + "_" + userId;
//     db.ref("users/" + matchId + "/request").set({
//         from: userId,
//         fromNombre: nombre,
//         roomId: roomId,
//         compatibilidad: compatibilidad
//     });
//     db.ref("users/" + userId + "/roomId").set(roomId);
//
//     document.body.innerHTML = `
//         <h1>Chat con ${matchNombre}</h1>
//         <div id="chat"></div>
//         <input id="message" placeholder="Mensaje">
//         <button onclick="sendMessage('${roomId}')">Enviar</button>
//     `;
//
//     const ahora = Date.now();
//
//     db.ref("rooms/" + roomId + "/messages")
//         .orderByChild("time").startAt(ahora)
//         .on("child_added", function(snapshot) {
//             const msg = snapshot.val();
//             document.getElementById("chat").innerHTML += `
//                 <p><b>${msg.name}:</b> ${msg.text}</p>
//             `;
//         });
// }

function sendMessage(roomId) {
    const text = document.getElementById("message").value;
    if (!text) return;

    db.ref("rooms/" + roomId + "/messages").push({
        name: nombre,
        text: text,
        time: Date.now()
    });

    document.getElementById("message").value = "";
}
window.addEventListener("beforeunload", function() {
    db.ref("users/" + userId).remove();
});
