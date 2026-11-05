from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import formulas
import tabla_prueba

app = FastAPI()

#Estructura de los datos que va a recibir
class datos_operacion(BaseModel):
    array_x_media: list
    confianza: float
    significancia: float
    hipotesis_u: float
    cola: str

#endpoint donde se reciben los datos
@app.post("/api/calcular_t_student")
def calcular(datos: datos_operacion):
    print("recibiendo datos")
    print(datos)

    #calcular Xmedio
    xmedia = formulas.calcular_x_media(datos.array_x_media)

    #calcular la desviacion estandar
    desviacion_s = formulas.calcular_s(datos.array_x_media, xmedia)

    #calcular T
    resultado_t = formulas.t_student(datos.array_x_media, xmedia, datos.hipotesis_u, desviacion_s)

    #calcular grados de libertad

    grados_libertad = formulas.grados_libertad(datos.array_x_media)

    if(datos.significancia == 0):
        datos.significancia = formulas.calcular_significancia(datos.confianza, datos.cola)

    resultado_tabla = tabla_prueba.encontrar_valor_tabla(grados_libertad, datos.significancia)

    

    print("Xmedia: " + str(xmedia))
    print("Desviacion S: " + str(desviacion_s))
    print("Resultado de T: " + str(resultado_t))

#servir el frontend
app.mount(
    "/",
    StaticFiles(directory="frontend", html=True),
    name="frontend"
)