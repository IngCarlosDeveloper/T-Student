function revisar_cant_x() {
  let input_cant_X = document.getElementById("cant_x");

  input_cant_X.addEventListener("input", () => {
    let cantidad_x = input_cant_X.value;

    crear_Xn(cantidad_x);
  });
}

function agregar_x_media() {
  //Declaramos el check para ingresar el promedio
  let check_promedio = document.getElementById("xmedia");

  let div_cant_x = document.getElementById("div_cant_x");
  let divPadre = document.getElementById("div1");

  //Monitoreamos si clickean el check
  check_promedio.addEventListener("click", () => {
    if (check_promedio.checked) {
      divPadre.innerHTML = "";

      div_cant_x.innerHTML = `<label for='cant_x'>Ingrese el X Medio:</label>
        <input type='number' class='input_cant_x' id='x1'>
        <br><br>`;
    } else {
      div_cant_x.innerHTML = `<label for='cant_x'>Ingrese el numero de variables X que quiere evaluar:</label><input type='number' id='cant_x'><br><br>`;

      revisar_cant_x();
    }
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

  let datos_form = {
    array_x_media: valores_x_input,
    hipotesis_u: u_hipotesis.value,
    confianza: confianza.value,
    significancia: significancia.value,
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

//let contenedor = 10;
//crear_Xn(contenedor);

revisar_cant_x();

trigger_btn();
console.log("perico");
preparar_datos();
agregar_x_media();
