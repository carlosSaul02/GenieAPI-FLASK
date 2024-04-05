document.getElementById("btn_reiniciar").addEventListener("click", function () {
  // Mostrar el loader
  document.getElementById("loader").style.display = "block";


  var csrfToken = document.querySelector('input[name="csrf_token"]').value;
  // Realizar una solicitud POST al servidor Flask para reiniciar el dispositivo
  fetch("/reiniciar_dispositivo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken  // Incluir el token CSRF en los headers 
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      alert(data.message); // Mostrar un mensaje de éxito

      // Ocultar el loader después de recibir la respuesta exitosa
      document.getElementById("loader").style.display = "none";

      // Redirigir a la misma página después de recibir la respuesta exitosa
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un error al reiniciar el dispositivo."); // Mostrar un mensaje de error

      // Ocultar el loader en caso de error también
      document.getElementById("loader").style.display = "none";
    });
});

document.getElementById("btn_refresh").addEventListener("click", function () {

  // Mostrar el loader
  document.getElementById("loader").style.display = "block";

  // Obtener el token CSRF del formulario
  var csrfToken = document.querySelector('input[name="csrf_token"]').value;
  // Realizar una solicitud POST al servidor Flask para reiniciar el dispositivo
  fetch("/refrescar_dispositivo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken  // Incluir el token CSRF en los headers 
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      alert(data.message); // Mostrar un mensaje de éxito

      // Ocultar el loader después de recibir la respuesta exitosa
      document.getElementById("loader").style.display = "none";

      // Redirigir a la misma página después de recibir la respuesta exitosa
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un error al refrescar el dispositivo."); // Mostrar un mensaje de error

      // Ocultar el loader en caso de error también
      document.getElementById("loader").style.display = "none";
    });
});



 // Función para validar el SSID en tiempo real
 document.getElementById("ssid_dispositivo").addEventListener("input", function () {
  var ssid = this.value;
  var ssidError = document.getElementById("ssidError");

  if (ssid.length < 5) {
      ssidError.innerText = "El SSID debe tener al menos 5 caracteres.";
  } else if (ssid.length > 30) {
      ssidError.innerText = "El SSID debe tener un máximo de 30 caracteres.";
  } else {
      ssidError.innerText = ""; // Limpiar mensaje de error si es válido
  }
});

// Función para validar la contraseña en tiempo real
document.getElementById("contrasena_dispositivo").addEventListener("input", function () {
  var contrasena = this.value;
  var contrasenaError = document.getElementById("contrasenaError");

  if (contrasena.length < 8) {
      contrasenaError.innerText = "La contraseña debe tener al menos 8 caracteres.";
  } else if (contrasena.length > 64) {
      contrasenaError.innerText = "La contraseña debe tener un máximo de 64 caracteres.";
  } else if (contrasena.includes(" ")) {
      contrasenaError.innerText = "La contraseña no puede contener espacios en blanco.";
  } else if (!/^[a-zA-Z0-9]*$/.test(contrasena)) {
      contrasenaError.innerText = "La contraseña no puede contener caracteres especiales.";
  } else {
      contrasenaError.innerText = ""; // Limpiar mensaje de error si es válido
  }
});


document.getElementById("btn_guardar").addEventListener("click", function () {
  // Validar SSID
  var ssid = document.getElementById("ssid_dispositivo").value;
  if (ssid.length < 5) {
    document.getElementById("ssidError").innerText =
      "El SSID debe tener al menos 5 caracteres.";
    return false; // Evitar que el formulario se envíe
  } else if (ssid.length > 30) {
    document.getElementById("ssidError").innerText =
      "El SSID debe tener un máximo de 30 caracteres.";
    return false; // Evitar que el formulario se envíe
  } else {
    document.getElementById("ssidError").innerText = ""; // Limpiar mensaje de error
  }
  
  // Validar contraseña
  var contrasena = document.getElementById("contrasena_dispositivo").value;
  if (contrasena.length < 8) {
    document.getElementById("contrasenaError").innerText =
      "La contraseña debe tener al menos 8 caracteres.";
    return false; // Evitar que el formulario se envíe
  } else if (contrasena.length > 64) {
    document.getElementById("contrasenaError").innerText =
      "La contraseña debe tener un máximo de 64 caracteres.";
    return false; // Evitar que el formulario se envíe
  } else if (contrasena.includes(" ")) {
    document.getElementById("contrasenaError").innerText =
      "La contraseña no puede contener espacios en blanco.";
    return false; // Evitar que el formulario se envíe
  } else if (!/^[a-zA-Z0-9]*$/.test(contrasena)) {
    document.getElementById("contrasenaError").innerText =
      "La contraseña no puede contener caracteres especiales.";
    return false; // Evitar que el formulario se envíe
  } else {
    document.getElementById("contrasenaError").innerText = ""; // Limpiar mensaje de error
  }

  // Obtener el formulario por su ID
  var form = document.getElementById("tr069_form");
  
  // Enviar el formulario cuando se haga clic en el botón
  form.submit();
  alert("SSID y Contraseña aceptados.")
});
