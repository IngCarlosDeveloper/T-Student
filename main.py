from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

app = FastAPI()

#Estructura de los datos que va a recibir
class datos_operacion(BaseModel):
    #verifica el tipo de dato que acepte un array
    array_x_media: str
    #que significa gt=0
    hipotesis_u: float = Field(gt=0)
    confianza: float = Field(gt=0)
    significancia: float = Field(gt=0)

#endpoint donde se reciben los datos
@app.post("/api/calcular_t_student")
def calcular():
    #aqui comenzamos a procesar los calculos de la operacion y talfi
    xd = 0
    #vamos a crear este avance solo por el commit