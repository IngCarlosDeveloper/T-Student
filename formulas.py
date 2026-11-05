import math
import tabla_prueba

#----------------------------------------VARIABLES GLOBALES-----------------------------------------------

# CANTIDAD DE MUESTRAS
# n_muestras = int(input("Ingrese N (cantidad de muestras a evaluar): "))

# # VALOR ESTIMADO
# u_esperado = float(input("Ingrese U (el valor esperado del promedio): "))

# # MEDIA ARITMETICA
# x_media = float(input("Ingrese X medio (el promedio de las muestras evaluadas): "))

# # DESVIACION ESTANDAR
# s_des_estandar = float(input("Ingrese S (desviacion estandar): "))

#x = [2, 4, 6, 10, 12]

#x = [137.4, 140.0, 138.8, 139.1, 144.4, 139.2, 141.8, 137.3, 133.5, 138.2, 141.1, 139.7, 136.7, 136.3,
#     135.6, 138.0, 140.9, 140.6, 136.7, 134.1]

#x = [11, 9, 12, 17, 8, 11, 9, 4, 5, 9, 14, 9, 17, 24, 19, 10, 17, 17, 8,
#    23, 8, 6, 14, 16, 6, 7, 15, 20, 14, 15]

#x = [155, 179, 175, 175, 161]

x = [0.021, 0.019, 0.023, 0.020]

#------------------------------------------FUNCIONES---------------------------------------------------

#T STUDENT
#t_student = (x_media - u_esperado) / (s_des_estandar / math.sqrt(n_muestras))

#print(t_student)

def calcular_x_media(arrayMuestras):

    mediaAritmetica = 0

    for i in arrayMuestras:
        #sumamos cada termino del array
        mediaAritmetica +=  float(i)

    #dividimos entre la longitud del arry
    mediaAritmetica = mediaAritmetica / len(arrayMuestras)

    return mediaAritmetica

#calcular desviacion estandar
def calcular_s(arrayMuestras, mediaAritmetica):

    sumatoria = 0

    #bucle para calcular Sum(Xi-Xmedio)**2
    for i in arrayMuestras:

        sumatoria += (float(i) - mediaAritmetica)**2

    sDesviacionEstandar = math.sqrt(sumatoria / (len(arrayMuestras) - 1))
    return(sDesviacionEstandar)

def grados_libertad(arrayMuestras):

    gradosLibertad = len(arrayMuestras) - 1
    return gradosLibertad

#Esta funcion pasa de Nivel de confianza -> significancia
# 0 = 1 cola
# 1 = 2 colas
def calcular_significancia(nivelConfianza, tipoCola):
    significancia = round( ((1 - nivelConfianza)), 8 )

    #el ajuste de la cola se hace en una funcion aparte
    #para poder usarlo tambien cuando escriben la significancia a mano
    significancia = ajustar_significancia_por_cola(significancia, tipoCola)

    return significancia

#la tabla que tenemos es de 2 colas, entonces si el ejercicio es de 1 cola
#hay que duplicar la significancia para buscar en la columna correcta
# 0 = 1 cola
# 1 = 2 colas
def ajustar_significancia_por_cola(significancia, tipoCola):

    #la cola llega como texto ("0" o "1") desde el formulario
    if(tipoCola == "0"):
        #round para evitar errores de decimales (ej: 0.1 + 0.1 en float)
        significancia = round(significancia * 2, 8)

    return significancia

def t_student(arrayMuestra, mediaArit, uMediaHipotesis, sDesvEstandar):

    #OJITO CON EL VALOR ABSOLUTO
    #t_stu = abs(media_arit - u_media_hipotesis) / ( s_desv_estandar / math.sqrt(len(array_muestra) - 1))
    tStu = (mediaArit - uMediaHipotesis) / ( sDesvEstandar / math.sqrt(len(arrayMuestra)))

    return(tStu)



# media = calcular_x_media(x)
# print("media aritmetica: " + str(media))
# s = calcular_s(x, media)
# print("desviacion standar: " + str(s))
# u = 0.02

# # g = grados_libertad(x)
# # significancia = calcular_significancia(0.99)

# # print("signigicancia: " + str(significancia))

# # resultado_tabla = tabla_prueba.encontrar_valor_tabla(g, significancia)


# respuesta = t_student(x, media, u, s)

# print("Respuesta T-student: " + str(respuesta))

# # print("Resultado tabla estadistica: " + str(resultado_tabla))


    
