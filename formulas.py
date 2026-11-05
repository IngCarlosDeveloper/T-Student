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

def calcular_x_media(array_muestras):

    media_aritmetica = 0

    for i in array_muestras:
        #sumamos cada termino del array
        media_aritmetica +=  float(i)

    #dividimos entre la longitud del arry
    media_aritmetica = media_aritmetica / len(array_muestras)

    return media_aritmetica

#calcular desviacion estandar
def calcular_s(array_muestras, media_aritmetica):

    sumatoria = 0

    #bucle para calcular Sum(Xi-Xmedio)**2
    for i in array_muestras:

        sumatoria += (float(i) - media_aritmetica)**2

    s_desviacion_estandar = math.sqrt(sumatoria / (len(array_muestras) - 1))
    return(s_desviacion_estandar)

def grados_libertad(array_muestras):

    grados_libertad = len(array_muestras) - 1
    return grados_libertad

#Esta funcion pasa de Nivel de confianza -> significancia
# 0 = 1 cola
# 1 = 2 colas
def calcular_significancia(nivel_confianza, tipo_cola):
    significancia = round( ((1 - nivel_confianza)), 8 )

    if(tipo_cola == "0"):
        significancia = significancia * 2

    return significancia

def t_student(array_muestra, media_arit, u_media_hipotesis, s_desv_estandar):

    #OJITO CON EL VALOR ABSOLUTO
    #t_stu = abs(media_arit - u_media_hipotesis) / ( s_desv_estandar / math.sqrt(len(array_muestra) - 1))
    t_stu = (media_arit - u_media_hipotesis) / ( s_desv_estandar / math.sqrt(len(array_muestra)))

    return(t_stu)



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


    
