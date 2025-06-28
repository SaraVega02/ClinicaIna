document.addEventListener("DOMContentLoaded", function () {

  // SE DEFINEN ELEMENTOS DEL DOM
  const tabla = document.getElementById("tablaPacientes");
  const buscador = document.getElementById("buscador");
  const filtro = document.getElementById("filtroUrgencia");

  // ARREGLO DE PACIENTES FIJOS PRECARGADOS
  const pacientes = [
    {
      nombre: "Ignacio",
      apellido: "Larraín",
      rut: "16.907.066-0",
      edad: 37,
      sexo: "Masculino",
      temperatura: 37.5,
      presionSistolica: 125,
      presionDiastolica: 80,
      pulsaciones: 70,
      oxigeno: 97,
      sintomas: ["Dolor de cabeza"],
      urgencia: "Verde"
    },
    {
      nombre: "Sara",
      apellido: "Vega",
      rut: "22.222.222-2",
      edad: 60,
      sexo: "Femenino",
      temperatura: 38.2,
      presionSistolica: 150,
      presionDiastolica: 95,
      pulsaciones: 90,
      oxigeno: 91,
      sintomas: ["Fiebre", "Presión alta", "Fatiga", "Tos"],
      urgencia: "Amarillo"
    },
    {
      nombre: "Adam",
      apellido: "Rubilar",
      rut: "33.333.333-3",
      edad: 75,
      sexo: "Masculino",
      temperatura: 39.5,
      presionSistolica: 160,
      presionDiastolica: 100,
      pulsaciones: 110,
      oxigeno: 85,
      sintomas: ["Fiebre", "Presión alta", "Fatiga", "Tos", "Dolor muscular", "Mareos"],
      urgencia: "Rojo"
    }
  ];

  // FUNCIÓN QUE MUESTRA LOS PACIENTES EN LA TABLA
  function renderPacientes(data) {
    tabla.innerHTML = "";

    if (data.length === 0) {
      tabla.innerHTML = `<tr><td colspan="11">No se encontraron pacientes.</td></tr>`;
      return;
    }

    data.forEach((paciente, index) => {

      // ASIGNA COLOR DE FILA SEGÚN URGENCIA
      let colorClass = "";
      if (paciente.urgencia === "Rojo") {
        colorClass = "table-danger";
      } else if (paciente.urgencia === "Amarillo") {
        colorClass = "table-warning";
      } else {
        colorClass = "table-success";
      }

      // FILA PRINCIPAL
      const row = document.createElement("tr");
      row.classList.add(colorClass);
      row.innerHTML = `
        <td>${paciente.nombre} ${paciente.apellido}</td>
        <td>${paciente.rut}</td>
        <td>${paciente.edad}</td>
        <td class="d-none d-md-table-cell">${paciente.sexo}</td>
        <td class="d-none d-md-table-cell">${paciente.temperatura} °C</td>
        <td class="d-none d-md-table-cell">${paciente.presionSistolica}/${paciente.presionDiastolica}</td>
        <td class="d-none d-md-table-cell">${paciente.oxigeno}%</td>
        <td class="d-none d-md-table-cell">${paciente.pulsaciones}</td>
        <td class="d-none d-md-table-cell">${paciente.sintomas.join(", ")}</td>
        <td class="d-none d-md-table-cell"><strong>${paciente.urgencia}</strong></td>
        <td class="d-md-none">
          <button class="btn btn-sm btn-outline-primary w-100" data-toggle="detalle-${index}">Ver más</button>
        </td>
      `;
      tabla.appendChild(row);

      // DETALLES EXPANDIBLES EN MODO MÓVIL
      const detalle = document.createElement("tr");
      detalle.className = "d-none d-md-none";
      detalle.id = `detalle-${index}`;
      detalle.innerHTML = `
        <td colspan="11">
          <strong>Sexo:</strong> ${paciente.sexo}<br>
          <strong>Temperatura:</strong> ${paciente.temperatura} °C<br>
          <strong>Presión:</strong> ${paciente.presionSistolica}/${paciente.presionDiastolica}<br>
          <strong>Oxígeno:</strong> ${paciente.oxigeno}%<br>
          <strong>Pulsaciones:</strong> ${paciente.pulsaciones}<br>
          <strong>Síntomas:</strong> ${paciente.sintomas.join(", ")}<br>
          <strong>Urgencia:</strong> ${paciente.urgencia}
        </td>
      `;
      tabla.appendChild(detalle);
    });
  }

  // FUNCIÓN PARA FILTRAR PACIENTES POR TEXTO Y URGENCIA
  function filtrarPacientes() {
    const texto = buscador?.value.toLowerCase() || "";
    const urgenciaSeleccionada = filtro?.value || "";

    const filtrados = pacientes.filter(paciente => {
      const coincideTexto = `${paciente.nombre} ${paciente.apellido} ${paciente.rut}`.toLowerCase().includes(texto);
      const coincideUrgencia = urgenciaSeleccionada === "" || paciente.urgencia === urgenciaSeleccionada;
      return coincideTexto && coincideUrgencia;
    });

    renderPacientes(filtrados);
  }

  // EVENTO PARA MOSTRAR U OCULTAR DETALLES EN MÓVIL
  tabla.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-toggle]");
    if (btn) {
      const id = btn.getAttribute("data-toggle");
      const detalle = document.getElementById(id);
      detalle.classList.toggle("d-none");
    }
  });

  // EVENTOS DE FILTRO POR TEXTO Y URGENCIA
  if (buscador) buscador.addEventListener("input", filtrarPacientes);
  if (filtro) filtro.addEventListener("change", filtrarPacientes);

  // MOSTRAR PACIENTES AL INICIO
  renderPacientes(pacientes);
});
