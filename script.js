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
    <button>Si, bastante</button>
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
function cambio7() {
    document.body.innerHTML = `
    <div id="chat"></div>
    <input id="message" placeholder="Mensaje">
    <button onclick="sendMessage()">Enviar</button>
  `;

    const ahora = Date.now();

    db.ref("messages").orderByChild("time").startAt(ahora).on("child_added", function(snapshot) {
        const msg = snapshot.val();
        document.getElementById("chat").innerHTML += `
      <p><b>${msg.name}:</b> ${msg.text}</p>
    `;
    });
}
function sendMessage() {
    const name = nombre;
    const text = document.getElementById("message").value;

    if (!name || !text) return;

    db.ref("messages").push({
        name: name,
        text: text,
        time: Date.now()
    });

    document.getElementById("message").value = "";
}