from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import formulas
import tabla_prueba

app = FastAPI()

#Estructura de los datos que va a recibir
#(los nombres deben ser iguales a las llaves del JSON que arma el index.js)
class datos_operacion(BaseModel):
    arrayXMedia: list
    confianza: float
    significancia: float
    hipotesisU: float
    cola: str

#endpoint donde se reciben los datos
@app.post("/api/calcular_t_student")
def calcular(datos: datos_operacion):
    print("recibiendo datos")
    print(datos)

    #con menos de 2 muestras no se puede calcular S (se divide entre n-1)
    if(len(datos.arrayXMedia) < 2):
        raise HTTPException(status_code=400, detail="Debe ingresar al menos 2 muestras")

    #la confianza y la significancia se escriben como porcentaje (95, 5) pero
    #la tabla y las formulas trabajan con decimales (0.95, 0.05), por eso se divide entre 100
    if(datos.confianza < 0 or datos.confianza > 100 or datos.significancia < 0 or datos.significancia > 100):
        raise HTTPException(status_code=400, detail="La confianza y la significancia deben estar entre 0 y 100")

    #round para evitar decimales raros del float
    datos.confianza = round(datos.confianza / 100, 8)
    datos.significancia = round(datos.significancia / 100, 8)

    #calcular Xmedio
    xMedia = formulas.calcular_x_media(datos.arrayXMedia)

    #calcular la desviacion estandar
    desviacionS = formulas.calcular_s(datos.arrayXMedia, xMedia)

    #calcular T
    resultadoT = formulas.t_student(datos.arrayXMedia, xMedia, datos.hipotesisU, desviacionS)

    #calcular grados de libertad
    gradosLibertad = formulas.grados_libertad(datos.arrayXMedia)

    #si el usuario escribio la confianza (la significancia llega en 0)
    #la calculamos a partir de ella, esa funcion ya ajusta por la cola
    if(datos.significancia == 0):
        datos.significancia = formulas.calcular_significancia(datos.confianza, datos.cola)
    else:
        #si el usuario escribio la significancia directamente tambien
        #hay que ajustarla, porque la tabla es de 2 colas
        datos.significancia = formulas.ajustar_significancia_por_cola(datos.significancia, datos.cola)

    #si la significancia no existe en la tabla avisamos en vez de dejar caer el servidor
    if(datos.significancia not in tabla_prueba.tablaTStudent2Colas):
        raise HTTPException(status_code=400, detail="La significancia/confianza ingresada no esta en la tabla")

    resultadoTabla = tabla_prueba.encontrar_valor_tabla(gradosLibertad, datos.significancia)

    #decision: si |T| supera al valor de la tabla se rechaza H0
    #(en 1 cola se asume que la muestra va hacia el lado de H1)
    if(abs(resultadoT) > resultadoTabla):
        conclusion = "Como |T| > T de la tabla, se RECHAZA la hipotesis nula (H0)"
    else:
        conclusion = "Como |T| <= T de la tabla, NO se rechaza la hipotesis nula (H0)"

    print("Xmedia: " + str(xMedia))
    print("Desviacion S: " + str(desviacionS))
    print("Resultado de T: " + str(resultadoT))
    print("Valor de la tabla: " + str(resultadoTabla))

    #lo que se le devuelve al index.js (redondeado a 4 decimales para que se vea bien)
    return {
        "n": len(datos.arrayXMedia),
        "xMedia": round(xMedia, 4),
        "desviacionS": round(desviacionS, 4),
        "gradosLibertad": gradosLibertad,
        "significanciaTabla": datos.significancia,
        "resultadoT": round(resultadoT, 4),
        "resultadoTabla": resultadoTabla,
        "conclusion": conclusion
    }

#servir el frontend
app.mount(
    "/",
    StaticFiles(directory="frontend", html=True),
    name="frontend"
)
