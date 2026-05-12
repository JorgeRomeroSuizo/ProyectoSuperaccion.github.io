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
    <button>No mucho</button>
    <br>
    <br>
    <button onclick="cambio2()">A veces</button>
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
    <button>Hablar con desconocidos</button>
    <br>
    <br>
    <button onclick="cambio3()">Grupos grandes</button>
    <br>
    <br>
    <button>Iniciar conversaciones</button>
    <br>
    <br>
    <button>Mantener conversaciones</button>
  `;
}
function cambio3(){
    document.body.innerHTML = `
    <h1>¿Que ritmo prefieres para interactuar?</h1>
    <br>
    <br>
    <button>Lento y tranquilo</button>
    <br>
    <br>
    <button onclick="cambio4()">Normal</button>
    <br>
    <br>
    <button>Poco a poco pero constante</button>
  `;
}
function cambio4(){
    document.body.innerHTML = `
    <h1>¿Cómo te gustaría empezar a interactuar?</h1>
    <br>
    <br>
    <button>Con ayuda guiada paso a paso</button>
    <br>
    <br>
    <button>Con alguien en una situación similar</button>
    <br>
    <br>
    <button onclick="cambio5()">Solo explorar por ahora</button>
  `;
}
function cambio5(){
    document.body.innerHTML = `
    <h1>¿Quieres compartir algo mas sobre ti? (opcional)</h1>
    <br>
    <br>
    <button>Si</button>
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