let boton1 = document.getElementById("iCrearCuenta")
boton1.addEventListener("click", cambio1)
function cambio1(){
    document.body.innerHTML = `
    <h1>¿Te cuesta socializar?</h1>
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
}