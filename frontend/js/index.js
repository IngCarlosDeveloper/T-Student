function crear_Xn(cant_x_muestras) {
  let i = 1;

  while (i <= cant_x_muestras) {
    //CREACION DEL LABEL
    let newLabel = document.createElement("label");
    newLabel.textContent = "Ingrese X" + i + ":";
    newLabel.setAttribute("for", "x" + i);

    //CREACION DEL INPUT
    let newInput = document.createElement("input");
    newInput.setAttribute("id", "x" + i);

    let newBr = document.createElement("br");

    //DECLARAMOS DIV CONTENEDOR
    let divPadre = document.getElementById("div1");

    //ANEXAMOS
    divPadre.appendChild(newLabel);
    divPadre.appendChild(newInput);
    divPadre.appendChild(newBr);

    i++;

    //alert("bu");
  }
}

function preparar_datos() {
  let X1 = document.getElementById("x1");
  let X2 = document.getElementById("x2");
  let X3 = document.getElementById("x3");
  let X4 = document.getElementById("x4");

  let u_hipotesis = document.getElementById("u_hipotesis");
  let confianza = document.getElementById("confianza");
  let significancia = document.getElementById("significancia");

  let datos_form = {
    X1_json: X1.value,
    X2_json: X2.value,
    X3_json: X3.value,
    X4_json: X4.value,
    u_hipotesis_json: u_hipotesis.value,
    confianza_json: confianza.value,
    significancia_json: significancia.value,
  };

  console.log(X1.value);
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

let contenedor = 10;
crear_Xn(contenedor);

trigger_btn();
console.log("perico");
preparar_datos();
