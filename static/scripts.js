document.getElementById("btnReiniciar").addEventListener("click", function () {
  // Realizar una solicitud POST al servidor Flask para reiniciar el dispositivo
  let deviceInfoDiv = document.getElementById("deviceInfo");
  let device_id = deviceInfoDiv.dataset.deviceId;
  fetch("/reiniciar_dispositivo/" + device_id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      alert(data.message); // Mostrar un mensaje de éxito
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un error al reiniciar el dispositivo."); // Mostrar un mensaje de error
    });
});

document.getElementById("btnRefresh").addEventListener("click", function () {
  let deviceInfoDiv = document.getElementById("deviceInfo");
  let device_id = deviceInfoDiv.dataset.deviceId;

  // Realizar una solicitud POST al servidor Flask para reiniciar el dispositivo
  fetch("/refrescar_dispositivo/" + device_id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      alert(data.message); // Mostrar un mensaje de éxito

      // Redirigir a la misma página después de recibir la respuesta exitosa
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un error al refrescar el dispositivo."); // Mostrar un mensaje de error
    });
});
