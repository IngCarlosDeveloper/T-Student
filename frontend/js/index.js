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

function preparar_datos() {
  // let X1 = document.getElementById("x1");
  // let X2 = document.getElementById("x2");
  // let X3 = document.getElementById("x3");
  // let X4 = document.getElementById("x4");

  //leemos todos los inputs Xn
  let inputs_x = document.querySelectorAll(".input_cant_x");

  console.log(inputs_x);

  let valores_x_input = Array.from(inputs_x).map((input) => input.value);
  console.log(valores_x_input);

  let u_hipotesis = document.getElementById("u_hipotesis");
  let confianza = document.getElementById("confianza");
  let significancia = document.getElementById("significancia");

  let datos_form = {
    Xn_json: valores_x_input,
    u_hipotesis_json: u_hipotesis.value,
    confianza_json: confianza.value,
    significancia_json: significancia.value,
  };

  console.log(datos_form);
}

function trigger_btn() {
  //Declaramos btn del html
  btn_calcular = document.getElementById("btn_calcular");

  //Declaramos listener para click
  btn_calcular.addEventListener("click", () => {
    preparar_datos();
    console.log("olaaaaa");
  });
}

//let contenedor = 10;
//crear_Xn(contenedor);

revisar_cant_x();

trigger_btn();
console.log("perico");
preparar_datos();
