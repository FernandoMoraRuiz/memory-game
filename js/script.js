        let iconos = []
        let selecciones = []
        let niveles = 1
        let cartas = 4
        let parejaCorre = new Audio("./audio/paraja-correcta.aac")
        let ganaste = new Audio("./audio/juego-ganado.mp3")

        function cargarIconos() {
            iconos = [
                `<img src="img/0.png" alt="imagen por adivinar">`,
                `<img src="img/1.png" alt="imagen por adivinar">`,
                `<img src="img/2.png" alt="imagen por adivinar">`,
                `<img src="img/3.png" alt="imagen por adivinar">`,
                `<img src="img/4.png" alt="imagen por adivinar">`,
                `<img src="img/5.png" alt="imagen por adivinar">`,
                `<img src="img/6.png" alt="imagen por adivinar">`,
                `<img src="img/7.png" alt="imagen por adivinar">`,
                `<img src="img/8.png" alt="imagen por adivinar">`,
                `<img src="img/9.png" alt="imagen por adivinar">`,
            ]
        }

        function generarTablero() {

            document.getElementById("boton").style.display = "none" 

            cargarIconos()
            selecciones = []
            let tablero = document.getElementById("tablero")
            let tarjetas = []
            let nivel = document.getElementById("nivel")
            nivel.innerText = "Nivel 1"
            let sonidoInicio = new Audio("./audio/new-game.wav")
            sonidoInicio.play()
            for (let i = 0; i < cartas; i++) {
                tarjetas.push(`
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                    <div class="tarjeta" id="tarjeta${i}">
                        <div class="cara trasera" id="trasera${i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            <img src="img/simbolo.png" alt="imagen incógnito">
                        </div>
                    </div>
                </div>        
                `)
                if (i % 2 == 1) {
                    iconos.splice(0, 1)
                }
            }
            tarjetas.sort(() => Math.random() - 0.5)
            tablero.innerHTML = tarjetas.join(" ")
        }

        function seleccionarTarjeta(i) {
            let tarjeta = document.getElementById("tarjeta" + i)
            if (tarjeta.style.transform != "rotateY(180deg)") {
                tarjeta.style.transform = "rotateY(180deg)"

                let seleccionCarta = new Audio("/audio/click-carta.wav")
                seleccionCarta.play()

                selecciones.push(i)
            }
            if (selecciones.length == 2) {
                deseleccionar(selecciones)
                selecciones = []
            }
        }

        function deseleccionar(selecciones) {

            setTimeout(() => {
                let trasera1 = document.getElementById("trasera" + selecciones[0])
                let trasera2 = document.getElementById("trasera" + selecciones[1])
                if (trasera1.innerHTML != trasera2.innerHTML) {
                    let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
                    let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
                    tarjeta1.style.transform = "rotateY(0deg)"
                    tarjeta2.style.transform = "rotateY(0deg)"
                }else{
                    trasera1.style.background = "#80e280"
                    trasera2.style.background = "#80e280"
                    
                    parejaCorre.play()

                    niveles++ 

                    console.log(niveles)

                    if (niveles === 3) {
                        cartas = 6
                        generarTablero()
                        ganaste.play()

                        let nivel = document.getElementById("nivel")
                        nivel.innerText = "Nivel 2"
                    }

                    else if(niveles === 6) {
                        cartas = 8
                        generarTablero()
                        ganaste.play()

                        let nivel = document.getElementById("nivel")
                        nivel.innerText = "Nivel 3"
                    }

                    else if(niveles === 10) {
                        cartas = 12
                        generarTablero()
                        ganaste.play()

                        let nivel = document.getElementById("nivel")
                        nivel.innerText = "Nivel 4"
                    }

                    else if(niveles === 16) {
                        niveles = 1
                        cartas = 4
                        ganaste.play()

                        tablero.innerHTML = `
                        <div class="contenedor-texto">
                            <h1 class="titulo">¡Felicidades! <br> Has Ganado</h1>
                        </div>
                        `

                        document.getElementById("boton").style.display = "block" 


                    }

                }
            }, 1000);
        }