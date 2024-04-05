from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, validators
from wtforms.validators import DataRequired, Regexp

class tr069_form(FlaskForm):
    id_dispositivo = StringField('ID:', validators=[DataRequired()])
    serial_dispositivo = StringField('SN:', validators=[DataRequired()])
    ssid_dispositivo = StringField('SSID:', validators=[
        validators.DataRequired(message="El SSID es requerido."),
        validators.Length(min=5, max=30, message="El SSID debe tener entre 5 y 30 caracteres."),
    ])
    contrasena_dispositivo = StringField('CONTRASEÑA:', validators=[
        validators.DataRequired(message="La Contraseña es requerido."),
        validators.Length(min=8, max=64, message="La Contraseña debe tener entre 8 y 64 caracteres."),
        validators.Regexp(regex=r'^[a-zA-Z0-9_]+$', message="La Contraseña solo puede contener letras, números y guiones bajos."),
        validators.Regexp(r'^(?!.*\s)$', message="La Contraseña no puede contener espacios"),
    ])
    ip_dispositivo = StringField('IP:', validators=[DataRequired()])
    mac_dispositivo = StringField('MAC:', validators=[DataRequired()])
    firmware_dispositivo = StringField('FIRMWARE:', validators=[DataRequired()])
    last_boot = StringField('LASTBOOT:', validators=[DataRequired()])
    submit = SubmitField('Guardar Cambios')