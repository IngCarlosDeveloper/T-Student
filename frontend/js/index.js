function revisar_cant_x() {
  let input_cant_X = document.getElementById("cant_x");

  input_cant_X.addEventListener("input", () => {
    let cantidad_x = input_cant_X.value;

    crear_Xn(cantidad_x);
  });
}

//Crea los inputs para escribir N cantidad de X
function crear_Xn(cant_x_muestras) {
  let i = 1;

  //DECLARAMOS DIV CONTENEDOR
  let divPadre = document.getElementById("div1");

  //LIMPIAMOS
  divPadre.innerHTML = "";

  while (i <= cant_x_muestras) {
    //CREACION DEL LABEL
    let newLabel = document.createElement("label");
    newLabel.textContent = "Ingrese X" + i + ":";
    newLabel.setAttribute("for", "x" + i);
    newLabel.setAttribute("class", "label_input_x");

    //CREACION DEL INPUT
    let newInput = document.createElement("input");
    newInput.setAttribute("id", "x" + i);
    newInput.setAttribute("class", "input_cant_x");

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
  let inputs_x = document.querySelectorAll(".input_cant_x");

  console.log(inputs_x);

  let valores_x_input = Array.from(inputs_x).map((input) => input.value);
  console.log(valores_x_input);

  let u_hipotesis = document.getElementById("u_hipotesis");
  let confianza = document.getElementById("confianza");
  let significancia = document.getElementById("significancia");
  let tipo_cola = document.getElementById("cola");

  let datos_form = {
    array_x_media: valores_x_input,
    hipotesis_u: u_hipotesis.value,
    confianza: confianza.value,
    significancia: significancia.value,
    cola: tipo_cola.value,
  };

  console.log(datos_form);

  try {
    //enviar respuesta a python

    let respuesta = await fetch("/api/calcular_t_student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos_form),
    });

    if (!respuesta.ok) {
      throw new Error("Error al procesar los datos");
    }
  } catch (error) {
    //resultado.textContent = error.message;
    alert("algo fallo amiguito");
  }
}

function trigger_btn() {
  //Declaramos btn del html
  btn_calcular = document.getElementById("btn_calcular");

  //Declaramos listener para click
  btn_calcular.addEventListener("click", async () => {
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
preparar_datos();
