import re

def validar_contrasena(contrasena):
    # Verificar si la contraseña tiene al menos 8 caracteres
    if len(contrasena) < 8:
        return {"False": "La contraseña debe tener al menos 8 caracteres."}
    
    # Verificar si el la contraseña tiene un maximo de 64 caracteres
    if len(contrasena) > 64:
        return {"False": "El SSID debe tener un maximo de 64 caracteres."}
    
    # Verificar si la contraseña tiene espacios en blanco
    if ' ' in contrasena:
        return {"False": "La contraseña no puede contener espacios en blanco."}
    
    # Verificar si la contraseña tiene caracteres especiales
    if not re.match("^[a-zA-Z0-9_]*$", contrasena):
        return {"False": "La contraseña solo puede contener letras, números y guion bajo(_)."}
    
    return {"True": "Contraseña válida."}


def validar_ssid(ssid):
    # Verificar si el SSID tiene al menos 8 caracteres
    if len(ssid) < 5:
        return {"False": "El SSID debe tener al menos 5 caracteres."}
    
    # Verificar si el SSID tiene un maximo de 30 caracteres
    if len(ssid) > 30:
        return {"False": "El SSID debe tener un maximo de 30 caracteres."}
    
    return {"True": "SSID válido."}
