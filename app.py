from flask import Flask, jsonify, redirect, render_template, request
from flask_wtf.csrf import CSRFProtect
from validaciones import validar_tag, validar_ssid, validar_contrasena
from inserciones import insertar_tag, cambiar_contrasena_por_id, cambiar_ssid_por_id
from consultas import obtener_id_por_serial_number, obtener_informacion_dispositivo, refrescar_dispositivo, reiniciar_dispositivo


app = Flask(__name__)
app.secret_key="Enred2024."
csrf = CSRFProtect(app)


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
    info_dispositivo,hosts=obtener_informacion_dispositivo(device_id, ip_servidor, puerto_servidor)

    
    return render_template('index.html',info_dispositivo=info_dispositivo,hosts=hosts)

@app.route('/reiniciar_dispositivo', methods=['POST'])
def reiniciar_dispositivo_route():

    # Obtener el ID del dispositivo usando el SerialNumber
    device_id = obtener_id_por_serial_number(serial_number, ip_servidor, puerto_servidor)

    # Reiniciar Dispositivo
    message = reiniciar_dispositivo(device_id, ip_servidor, puerto_servidor)

    return jsonify({'message': message})


@app.route('/refrescar_dispositivo', methods=['POST'])
def refrescar_dispositivo_route():

    # Obtener el ID del dispositivo usando el SerialNumber
    device_id = obtener_id_por_serial_number(serial_number, ip_servidor, puerto_servidor)
    #************************** Refrescar los parametros del dispositivo
    message = refrescar_dispositivo(device_id, ip_servidor, puerto_servidor)

    return jsonify({'message': message}) # Devolver respuesta con código 200


@app.route('/guardar_cambios', methods=['POST'])
def guardar_cambios():

    # Obtener el ID del dispositivo usando el SerialNumber
    device_id = obtener_id_por_serial_number(serial_number, ip_servidor, puerto_servidor)
    
    #Obtenidos desde el form
    ssid_dispositivo = request.form.get('ssid_dispositivo')
    contrasena_dispositivo = request.form.get('contrasena_dispositivo')
    

    #Validar y cambiar ssid
    ssid_valida = validar_ssid(ssid_dispositivo)

    if "True" in ssid_valida:
        print("El SSID es válido.")
        cambiar_ssid_por_id(device_id, ssid_dispositivo, ip_servidor, puerto_servidor)

    else:
        print("El SSID no es válido:", ssid_valida["False"])

    
    #Validar y cambiar contrasena
    contrasena_valida = validar_contrasena(contrasena_dispositivo)
    if "True" in contrasena_valida:
        print("La contraseña es válida.")
        cambiar_contrasena_por_id(device_id, contrasena_dispositivo, ip_servidor, puerto_servidor)
    else:
        print("La contraseña no es valida:", contrasena_valida["False"])
     
    
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
