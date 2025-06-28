// clientes.js

document.addEventListener("DOMContentLoaded", function () {
  const tabla = document.getElementById("tablaPacientes");
  const buscador = document.getElementById("buscador");
  const filtro = document.getElementById("filtroUrgencia");

  if (!localStorage.getItem("pacientes")) {
    const demo = [
      {
        nombre: "Pedro",
        apellido: "Pérez",
        rut: "11.111.111-1",
        edad: 35,
        sexo: "Masculino",
        temperatura: 37.5,
        presionSistolica: 125,
        presionDiastolica: 80,
        pulsaciones: 70,
        oxigeno: 97,
        sintomas: ["Dolor de cabeza"],
        urgencia: "Verde"
      }
    ];
    localStorage.setItem("pacientes", JSON.stringify(demo));
  }

  let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  function renderPacientes(data) {
    tabla.innerHTML = "";

    if (data.length === 0) {
      tabla.innerHTML = `<tr><td colspan="11">No se encontraron pacientes.</td></tr>`;
      return;
    }

    data.forEach((p, i) => {
      let colorClass =
        p.urgencia === "Rojo" ? "table-danger" :
        p.urgencia === "Amarillo" ? "table-warning" :
        "table-success";

      const row = document.createElement("tr");
      row.classList.add(colorClass);
      row.innerHTML = `
        <td>${p.nombre} ${p.apellido}</td>
        <td>${p.rut}</td>
        <td>${p.edad}</td>
        <td class="d-none d-md-table-cell">${p.sexo}</td>
        <td class="d-none d-md-table-cell">${p.temperatura} °C</td>
        <td class="d-none d-md-table-cell">${p.presionSistolica}/${p.presionDiastolica}</td>
        <td class="d-none d-md-table-cell">${p.oxigeno}%</td>
        <td class="d-none d-md-table-cell">${p.pulsaciones}</td>
        <td class="d-none d-md-table-cell">${p.sintomas.join(", ")}</td>
        <td class="d-none d-md-table-cell"><strong>${p.urgencia}</strong></td>
        <td class="d-md-none">
          <button class="btn btn-sm btn-outline-primary w-100" data-toggle="detalle-${i}">Ver más</button>
        </td>
      `;
      tabla.appendChild(row);

      const detalle = document.createElement("tr");
      detalle.className = "d-none d-md-none";
      detalle.id = `detalle-${i}`;
      detalle.innerHTML = `
        <td colspan="11">
          <strong>Sexo:</strong> ${p.sexo}<br>
          <strong>Temperatura:</strong> ${p.temperatura} °C<br>
          <strong>Presión:</strong> ${p.presionSistolica}/${p.presionDiastolica}<br>
          <strong>Oxígeno:</strong> ${p.oxigeno}%<br>
          <strong>Pulsaciones:</strong> ${p.pulsaciones}<br>
          <strong>Síntomas:</strong> ${p.sintomas.join(", ")}<br>
          <strong>Urgencia:</strong> ${p.urgencia}
        </td>
      `;
      tabla.appendChild(detalle);
    });
  }

  function filtrarPacientes() {
    const texto = buscador?.value.toLowerCase() || "";
    const urgenciaSeleccionada = filtro?.value || "";

    const filtrados = pacientes.filter(p => {
      const coincideTexto = `${p.nombre} ${p.apellido} ${p.rut}`.toLowerCase().includes(texto);
      const coincideUrgencia = urgenciaSeleccionada === "" || p.urgencia === urgenciaSeleccionada;
      return coincideTexto && coincideUrgencia;
    });

    renderPacientes(filtrados);
  }

  tabla.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-toggle]");
    if (btn) {
      const id = btn.getAttribute("data-toggle");
      const detalle = document.getElementById(id);
      detalle.classList.toggle("d-none");
    }
  });

  if (buscador) buscador.addEventListener("input", filtrarPacientes);
  if (filtro) filtro.addEventListener("change", filtrarPacientes);

  renderPacientes(pacientes);
});
