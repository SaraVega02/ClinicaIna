// CARGA AUTOMÁTICA DE PACIENTES AL ABRIR LA PÁGINA
document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("listaPacientes");
  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  if (pacientes.length === 0) {
    lista.innerHTML = `<div class="alert alert-info">No hay pacientes registrados aún.</div>`;
    return;
  }

  pacientes.reverse(); // Mostrar el más reciente primero

  pacientes.forEach(paciente => {
    const div = document.createElement("div");
    div.className = "col-md-6 mb-4";

    // Asignar color visual según nivel de urgencia
    let color = "success";
    if (paciente.urgencia === "Amarillo") color = "warning";
    if (paciente.urgencia === "Rojo") color = "danger";

    div.innerHTML = `
      <div class="card border-${color} shadow">
        <div class="card-header bg-${color} text-white fw-bold">
          ${paciente.nombre} ${paciente.apellido} (${paciente.rut}) - <span class="text-uppercase">${paciente.urgencia}</span>
        </div>
        <div class="card-body">
          <p><strong>Edad:</strong> ${paciente.edad} años</p>
          <p><strong>Sexo:</strong> ${paciente.sexo}</p>
          <p><strong>Temperatura:</strong> ${paciente.temperatura} °C</p>
          <p><strong>Presión:</strong> ${paciente.presionSistolica}/${paciente.presionDiastolica} mmHg</p>
          <p><strong>Oxígeno:</strong> ${paciente.oxigeno}%</p>
          <p><strong>Pulsaciones:</strong> ${paciente.pulsaciones} bpm</p>
          <p><strong>Síntomas:</strong> ${paciente.sintomas.join(", ")}</p>
        </div>
      </div>
    `;

    lista.appendChild(div);
  });
});
