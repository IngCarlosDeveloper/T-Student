function revisar_cant_x() {
  let inputCantX = document.getElementById("cant_x");

  inputCantX.addEventListener("input", () => {
    let cantidadX = inputCantX.value;

    crear_Xn(cantidadX);
  });
}

//Crea los inputs para escribir N cantidad de X
function crear_Xn(cantXMuestras) {
  let i = 1;

  //DECLARAMOS DIV CONTENEDOR
  let divPadre = document.getElementById("div1");

  //LIMPIAMOS
  divPadre.innerHTML = "";

  while (i <= cantXMuestras) {
    //CREACION DEL LABEL
    let newLabel = document.createElement("label");
    newLabel.textContent = "Ingrese X" + i + ":";
    newLabel.setAttribute("for", "x" + i);
    newLabel.setAttribute("class", "label_input_x");

    //CREACION DEL INPUT
    let newInput = document.createElement("input");
    newInput.setAttribute("id", "x" + i);
    newInput.setAttribute("class", "input_cant_x");
    //number con step any para aceptar decimales, y required para que no se pueda enviar vacio
    newInput.setAttribute("type", "number");
    newInput.setAttribute("step", "any");
    newInput.setAttribute("required", "");

    let newBr = document.createElement("br");
    newBr.setAttribute("class", "br_input_x");

    //ANEXAMOS
    divPadre.appendChild(newLabel);
    divPadre.appendChild(newInput);
    divPadre.appendChild(newBr);

    i++;
  }
}

async function preparar_datos() {
  //leemos todos los inputs Xn
  let inputsX = document.querySelectorAll(".input_cant_x");

  console.log(inputsX);

  let valoresXInput = Array.from(inputsX).map((input) => input.value);
  console.log(valoresXInput);

  let uHipotesis = document.getElementById("u_hipotesis");
  let confianza = document.getElementById("confianza");
  let significancia = document.getElementById("significancia");
  let tipoCola = document.getElementById("cola");

  let datosForm = {
    arrayXMedia: valoresXInput,
    hipotesisU: uHipotesis.value,
    confianza: confianza.value,
    significancia: significancia.value,
    cola: tipoCola.value,
  };

  console.log(datosForm);

  try {
    //enviar respuesta a python

    let respuesta = await fetch("/api/calcular_t_student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosForm),
    });

    //leemos lo que responde python
    let datosRespuesta = await respuesta.json();

    if (!respuesta.ok) {
      //si python mando un mensaje de error (detail) lo usamos
      throw new Error(datosRespuesta.detail);
    }

    mostrar_resultado(datosRespuesta);
  } catch (error) {
    document.getElementById("resultado").textContent = "Error: " + error.message;
    alert("algo fallo amiguito");
  }
}

//Escribe en pantalla los resultados que devolvio python
function mostrar_resultado(datosRespuesta) {
  let divResultado = document.getElementById("resultado");

  //LIMPIAMOS
  divResultado.innerHTML = "";

  let lineas = [
    "Cantidad de muestras (n): " + datosRespuesta.n,
    "X media: " + datosRespuesta.xMedia,
    "Desviacion estandar (S): " + datosRespuesta.desviacionS,
    "Grados de libertad: " + datosRespuesta.gradosLibertad,
    "Significancia usada en la tabla (2 colas): " + datosRespuesta.significanciaTabla,
    "T calculado: " + datosRespuesta.resultadoT,
    "T de la tabla: " + datosRespuesta.resultadoTabla,
    datosRespuesta.conclusion,
  ];

  //un parrafo por cada linea
  for (let linea of lineas) {
    let newP = document.createElement("p");
    newP.textContent = linea;

    //la conclusion lleva color: verde si no se rechaza H0, rojo si se rechaza
    if (linea == datosRespuesta.conclusion) {
      if (linea.includes("NO se rechaza")) {
        newP.setAttribute("class", "conclusion no_rechaza");
      } else {
        newP.setAttribute("class", "conclusion rechaza");
      }
    }

    divResultado.appendChild(newP);
  }
}

function trigger_btn() {
  //Declaramos el form del html
  let formulario = document.getElementById("formulario");

  //Declaramos listener para el submit (el navegador revisa los required antes de disparar este evento)
  formulario.addEventListener("submit", async (evento) => {
    //evitamos que el form recargue la pagina
    evento.preventDefault();
    preparar_datos();
  });
}

//si escribes confianza, no anotas significancia
function monitorear_confianza_significancia() {
  let confianza = document.getElementById("confianza");
  let significancia = document.getElementById("significancia");

  confianza.addEventListener("input", () => {
    if (confianza.value != "") {
      significancia.value = 0;
      significancia.disabled = true;
    } else {
      significancia.disabled = false;
    }
  });

  significancia.addEventListener("input", () => {
    if (significancia.value != "") {
      confianza.value = 0;
      confianza.disabled = true;
    } else {
      confianza.disabled = false;
    }
  });
}

//let contenedor = 10;
//crear_Xn(contenedor);

revisar_cant_x();
monitorear_confianza_significancia();

trigger_btn();
console.log("perico");

//esta llamada enviaba el formulario vacio apenas cargaba la pagina (daba error 422),
//ahora solo se envia cuando se presiona el boton
//preparar_datos();
