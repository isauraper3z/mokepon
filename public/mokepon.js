const  sectionReiniciar = document.getElementById('reiniciar')
const  botonMascotaJugador = document.getElementById('boton-mascota')
const  botonReiniciar = document.getElementById('boton-reiniciar')


const  sectionSeleccionarMascota = document.getElementById('selecionar-mascota')

const  spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const  spanMascotaJugador = document.getElementById('mascota-jugador')


const  spanVidasJugador = document.getElementById('vidas-jugador')
const  spanVidasEnemigo = document.getElementById('vidas-enemigo')
const  sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')

const  sectionMensajes = document.getElementById('resultado')
const  ataquesDelJugador = document.getElementById('ataques-del-jugador')
const  ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const  contenedorTarjetas = document.getElementById('contenedorTarjetas')
const  contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones  
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador 
let mascotaJugadorOjeto 
let ataquesMokepon 
let ataquesMokeponEnemigo
let botonFuego
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3
let vidasEnemigo = 3 
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350


if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 /800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null ) {
     this.id = id
     this.nombre = nombre
     this.foto = foto
     this.vida = vida
     this.ataques = []
     this.ancho = 25
     this.alto = 25
     this.x = aleatorio(0, mapa.width - this.ancho)
     this.y = aleatorio(0, mapa.height - this.alto)
     this.mapaFoto = new Image()
     this.mapaFoto.src = fotoMapa
     this.velocidadX = 0 
     this,this.velocidadY = 0 
   }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
         ) 
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5,  './assets/ratigueya.png')

const HIPODOGE_ATAQUES  = [ 
    { nombre:'💧', id:'boton-agua'},
    { nombre:'💧', id:'boton-agua'},
    { nombre:'💧', id:'boton-agua'},
    { nombre:'🔥', id:'boton-fuego'},
    { nombre:'🌱', id:'boton-tierra'},]
 
hipodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEPO_ATAQUES = [  
    { nombre:'🌱', id:'boton-tierra'},
    { nombre:'🌱', id:'boton-tierra'},
    { nombre:'🌱', id:'boton-tierra'},
    { nombre:'💧', id:'boton-agua'},
    { nombre:'🔥', id:'boton-fuego'},]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const ATAQUES_RATIGUEYA = [
    { nombre:'🔥', id:'boton-fuego'},
    { nombre:'🔥', id:'boton-fuego'},
    { nombre:'🔥', id:'boton-fuego'},
    { nombre:'💧', id:'boton-agua'},
    { nombre:'🌱', id:'boton-tierra'},]

ratigueya.ataques.push(...ATAQUES_RATIGUEYA)




mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
         sectionVerMapa.style.display = 'none'
        sectionSeleccionarAtaque.style.display = 'none'

        mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
         <input type="radio" name="mascota" id=${mokepon.nombre} >
           <label class="tarjeta-de-mokepon" for=${mokepon.nombre} > 
                <p>${mokepon.nombre} </p>
                <img src=${mokepon.foto} alt=${mokepon.nombre} >
            </label>
           `
         contenedorTarjetas.innerHTML +=  opcionDeMokepones

             inputHipodoge = document.getElementById('Hipodoge')
             inputCapipepo  = document.getElementById('Capipepo')
             inputRatigueya  = document.getElementById('Ratigueya')
         }) 
        botonMascotaJugador.addEventListener('click', selecionarMacotaJugador)
        botonReiniciar.addEventListener('click', reiniciarJuego)

        unirseAlJuego()
 }

function unirseAlJuego () {
      fetch("http://localhost:8080/unirse") 
      .then(function(res) {
         if (res.ok){
             res.text()
                .then(function (respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
         }
      })
 
}

function selecionarMacotaJugador() {  
    
    if (inputHipodoge.checked){ 
        spanMascotaJugador.innerHTML= inputHipodoge.id 
        mascotaJugador = inputHipodoge.id 
    }  else if (inputCapipepo.checked) {       
        spanMascotaJugador.innerHTML= inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }  else if (inputRatigueya.checked){                                        
        spanMascotaJugador.innerHTML= inputRatigueya.id 
        mascotaJugador = inputRatigueya.id 
    } else { 
        alert ('Selecciona una mascota') 
        return
    }
    sectionSeleccionarMascota.style.display = 'none'
    selecionarMokepon(mascotaJugador)

      extraerAtaques(mascotaJugador)
      iniciarMapa()
      sectionVerMapa.style.display = 'flex'
    
      
}

function selecionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}` , {
        method : "post", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                mokepon:mascotaJugador
               
        
        })
   })            
}  


function extraerAtaques(mascotaJugador) {
    let ataques

        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador ===  mokepones[i].nombre) { 
                 ataques = mokepones[i].ataques
         }
        
    }
      mostrarAtaques(ataques)  
}

function mostrarAtaques(ataques) {
       ataques.forEach((ataque) => {
        ataquesMokepon =`
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>  
        `
        contenedorAtaques.innerHTML += ataquesMokepon

       }) 

         botonFuego = document.getElementById('boton-fuego')
         botonAgua = document.getElementById('boton-agua')
         botonTierra = document.getElementById('boton-tierra')
         botones = document.querySelectorAll('.BAtaque')

}


function secuenciaAtaque(){
        botones.forEach((boton) => {
         boton.addEventListener('click',(e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else { 
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if(ataqueJugador.length === 5) {
                enviarAtaque()
            }
           
        })
    })
    
}

function enviarAtaque() {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
      method: "post",
      headers: {
        "Content-type": "application/json" 

       },
       body: JSON.stringify({
            ataques: ataqueJugador
       })
   }) 

   intervalo = setInterval (obtenerAtaques, 50)
}

function obtenerAtaques () {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
        if (res.ok) {
            res.json ()
               .then(function ({ ataques}) {
                  if (ataques.length === 5) {
                      ataqueEnemigo = ataques
                      combate()
                  }
               })
        }
    })
}

function seleccionarMacotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {  
    console.log('Ataque enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    }   else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    }   else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea (){
    if (ataqueJugador.length===5) {
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo) {
     indexAtaqueJugador = ataqueJugador[jugador]
     indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
     clearInterval(intervalo)
              
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index]=== ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index) 
            crearMensaje ('EMPATE')
        } else if (ataqueJugador[index]==='FUEGO' && ataqueEnemigo [index] === 'TIERRA') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index]=== 'AGUA'&& ataqueEnemigo [index] ==='FUEGO') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index]=== 'TIERRA'&& ataqueEnemigo [index] === 'AGUA') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else { 
            indexAmbosOponentes(index,index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

      revisarVictorias()
}

function revisarVictorias(){

    if(victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Esto fue un enpate!')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Felicitaciones, Ganaste!!')
    } else {
        crearMensajeFinal('Lo siento, Perdiste.')
    }

}

function crearMensaje(resultado){

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado 

    nuevoAtaqueDelJugador.innerHTML =  indexAtaqueJugador 
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal (resultadoFinal){
  let sectionMensajes = document.getElementById('resultado')

    sectionMensajes.innerHTML = resultadoFinal 
   
    sectionReiniciar.style.display = 'block'

}
function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max ){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {


    mascotaJugadorOjeto.x = mascotaJugadorOjeto.x + mascotaJugadorOjeto.velocidadX
    mascotaJugadorOjeto.y = mascotaJugadorOjeto.y + mascotaJugadorOjeto.velocidadY
    lienzo.clearRect(0,0, mapa.clientWidth, mapa.height)
    lienzo.drawImage(
        mapaBackground, 
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorOjeto.pintarMokepon()

    enviarPosicion (mascotaJugadorOjeto.x, mascotaJugadorOjeto.y)

    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ enemigos }) {
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    console.log(enemigos);
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""

                    if (mokeponNombre === "Hipodoge") {
                        mokeponEnemigo = new Mokepon ('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png', enemigo.id)

                    } else if (mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon ('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png', enemigo.id)

                    } else if (mokeponNombre === "Ratigueya") {
                        mokeponEnemigo = new Mokepon ('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5,  './assets/ratigueya.png', enemigo.id)
                    }

                    mokeponEnemigo.x = enemigo.x 
                    mokeponEnemigo.y = enemigo.y 

                    return mokeponEnemigo
                })
            })
        }
    })
}

function moverDerecha () {
     mascotaJugadorOjeto.velocidadX = 5
     
}

function moverIzquierda () {
    mascotaJugadorOjeto.velocidadX = -5 
}

function moverAbajo () {
    mascotaJugadorOjeto.velocidadY = 5
}

function moverArriba () {
    mascotaJugadorOjeto.velocidadY = -5 
}

function detenerMovimiento(){
    mascotaJugadorOjeto.velocidadX = 0
    mascotaJugadorOjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
  switch (event.key) {
    case 'ArrowUp':
        moverArriba()
        break
        case 'ArrowDown':
        moverAbajo()
        break
        case 'ArrowLeft':
        moverIzquierda()
        break
        case 'ArrowRight':
        moverDerecha()
        break
    default:
        break;
  }
}

function iniciarMapa() {
    mascotaJugadorOjeto = obtenerOjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

     window.addEventListener('keydown', sePresionoUnaTecla)
     window.addEventListener('keyup', detenerMovimiento)
}

function obtenerOjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador ===  mokepones[i].nombre) { 
             return mokepones[i]
     }

   }
    
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y 
    const abajoEnemigo = enemigo.y + enemigo.alto 
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota = mascotaJugadorOjeto.y 
    const abojoMascota= mascotaJugadorOjeto.y + mascotaJugadorOjeto.alto 
    const derechaMascota = mascotaJugadorOjeto.x + mascotaJugadorOjeto.ancho
    const izquierdaMascota = mascotaJugadorOjeto.x 

    if (  
       abojoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota <  izquierdaEnemigo ||
        izquierdaMascota >  derechaEnemigo 
    )  {
         return 
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
     sectionSeleccionarAtaque.style.display = 'flex'
     sectionVerMapa.style.display = 'none'
     seleccionarMacotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)