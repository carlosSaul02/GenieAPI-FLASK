from flask import Flask, jsonify, render_template, request
from validaciones import validar_tag, validar_ssid, validar_contrasena
from inserciones import insertar_tag, cambiar_contrasena_por_id, cambiar_ssid_por_id
from consultas import obtener_id_por_serial_number, obtener_informacion_dispositivo, refrescar_dispositivo, reiniciar_dispositivo

def main():
    serial_number = "CDKT2AD24296"
    ip_servidor = "192.168.77.203"
    puerto_servidor = "7557"
    #device_id = "E89FEC-FTTH-CDKT2AD24296"


    #************************** Obtener el ID del dispositivo usando el SerialNumber
    device_id = obtener_id_por_serial_number(serial_number, ip_servidor, puerto_servidor)


    #************************** Obtener informacion general del dispositivo
    #obtener_informacion_dispositivo(device_id, ip_servidor, puerto_servidor)

    


    #************************** Refrescar los parametros del dispositivo
    #refrescar_dispositivo(device_id, ip_servidor, puerto_servidor)


    #************************** Reiniciar Dispositivo
    #reiniciar_dispositivo(device_id, ip_servidor, puerto_servidor)


    #************************** Cambiar el SSID del dispositivo usando su ID
    #ssid = "PRUEBA"
    #es_valida1 = validar_ssid(ssid)
    #if "True" in es_valida1:
    #    print("El SSID es válido.")
    #    cambiar_ssid_por_id(device_id, ssid, ip_servidor, puerto_servidor)
    #else:
    #    print("El SSID no es válido:", es_valida1["False"])


    #************************** Cambiar el CONTRASENA del dispositivo usando su ID
    #contrasena = "FARAJUEGAROBLOX"
    #es_valida = validar_contrasena(contrasena)
    #if "True" in es_valida:
    #    print("La contraseña es válida.")
    #    cambiar_contrasena_por_id(device_id, contrasena, ip_servidor, puerto_servidor)
    #else:
    #    print("La contraseña no es válida:", es_valida["False"])



    #************************** Insertar Tag
    #tag = "Provisional1"
    #es_valida2 = validar_tag(tag)
    #if "True" in es_valida2:
    #    print("El Tag es válido.")
    #    insertar_tag(device_id, ip_servidor, puerto_servidor, tag)
    #else:
    #    print("El Tag no es válido:", es_valida2["False"])

app = Flask(__name__)
serial_number = "000000"
ip_servidor = "192.168.77.203"
puerto_servidor = "7557"

@app.route('/', methods=['POST','GET'])
def index():
    if request.method == 'POST':
        print("hola")

    #************************** Obtener el ID del dispositivo usando el SerialNumber
    device_id = obtener_id_por_serial_number(serial_number, ip_servidor, puerto_servidor)


    #************************** Obtener informacion general del dispositivo
    info_dispositivo=obtener_informacion_dispositivo(device_id, ip_servidor, puerto_servidor)

    
    return render_template('index.html',info_dispositivo=info_dispositivo)

@app.route('/reiniciar_dispositivo/<device_id>', methods=['POST'])
def reiniciar_dispositivo_route(device_id):

    # Obtener el ID del dispositivo usando el SerialNumber
    #device_id = obtener_id_por_serial_number(serial_number, ip_servidor, puerto_servidor)

    # Reiniciar Dispositivo
    message = reiniciar_dispositivo(device_id, ip_servidor, puerto_servidor)

    return jsonify({'message': message})


@app.route('/refrescar_dispositivo/<device_id>', methods=['POST'])
def refrescar_dispositivo_route(device_id):
    # Simulamos el refresco del dispositivo y retornamos un mensaje
 #************************** Refrescar los parametros del dispositivo
    message = refrescar_dispositivo(device_id, ip_servidor, puerto_servidor)

    return jsonify({'message': message}) # Devolver respuesta con código 200



if __name__ == '__main__':
    main()
    app.run(debug=True)
