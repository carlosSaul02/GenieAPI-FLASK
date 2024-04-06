// CODIGO PARA ENVIAR METODO POST DEL BOTON DE REFRESH
document.getElementById("btn_reiniciar").addEventListener("click", function () {
  // Mostrar el loader
  document.getElementById("loader").style.display = "block";

  var csrfToken = document.querySelector('input[name="csrf_token"]').value;
  // Realizar una solicitud POST al servidor Flask para reiniciar el dispositivo
  fetch("/reiniciar_dispositivo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken, // Incluir el token CSRF en los headers
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

// CODIGO PARA ENVIAR METODO POST DEL BOTON DE REFRESH
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
      "X-CSRFToken": csrfToken, // Incluir el token CSRF en los headers
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
document
  .getElementById("ssid_dispositivo")
  .addEventListener("input", function () {
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
document
  .getElementById("contrasena_dispositivo")
  .addEventListener("input", function () {
    var contrasena = this.value;
    var contrasenaError = document.getElementById("contrasenaError");

    if (contrasena.length < 8) {
      contrasenaError.innerText =
        "La contraseña debe tener al menos 8 caracteres.";
    } else if (contrasena.length > 64) {
      contrasenaError.innerText =
        "La contraseña debe tener un máximo de 64 caracteres.";
    } else if (contrasena.includes(" ")) {
      contrasenaError.innerText =
        "La contraseña no puede contener espacios en blanco.";
    } else if (!/^[a-zA-Z0-9]*$/.test(contrasena)) {
      contrasenaError.innerText =
        "La contraseña no puede contener caracteres especiales.";
    } else {
      contrasenaError.innerText = ""; // Limpiar mensaje de error si es válido
    }
  });

// CODIGO PARA ENVIAR POR METODO POST EL FORMULARIO A TRAVES DEL BOTON DE GUARDAR
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

  // Mostrar el loader
  document.getElementById("loader").style.display = "block";

  // Enviar el formulario cuando se haga clic en el botón
  form.submit();
});

// CODIGO PARA HABILITAR O DESHABILITAR VER CONTRASEÑA
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("contrasena_dispositivo");

togglePassword.addEventListener("click", function () {
  const fieldType = passwordField.getAttribute("type");
  if (fieldType === "password") {
    passwordField.setAttribute("type", "text");
    togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
  } else {
    passwordField.setAttribute("type", "password");
    togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
});

// CODIGO PARA HABILITAR EL BOTON SAVE CUANDO HAY UN CAMBIO EN SSID O CONTRASEÑA
const ssidInput = document.getElementById("ssid_dispositivo");
const contrasenaInput = document.getElementById("contrasena_dispositivo");
const guardarBtn = document.getElementById("btn_guardar");

ssidInput.addEventListener("input", function () {
  ssidInput.disabled = false;
  ssidInput.focus();
  guardarBtn.disabled = false;
});

contrasenaInput.addEventListener("input", function () {
  contrasenaInput.disabled = false;
  contrasenaInput.focus();
  guardarBtn.disabled = false;
});