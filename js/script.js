// ACTUALIZACIÓN DINÁMICA DE VALORES DE RANGOS
document.addEventListener("DOMContentLoaded", function () {
  const campos = [
    { id: "edad", span: "edadVal" },
    { id: "temperatura", span: "tempVal" },
    { id: "presionSistolica", span: "sisVal" },
    { id: "presionDiastolica", span: "diaVal" },
    { id: "pulsaciones", span: "pulVal" },
    { id: "oxigeno", span: "oxiVal" }
  ];

  campos.forEach(({ id, span }) => {
    const input = document.getElementById(id);
    const output = document.getElementById(span);
    output.textContent = input.value;
    input.addEventListener("input", () => output.textContent = input.value);
  });
});

// EVENTO SUBMIT DEL FORMULARIO
document.getElementById('formPaciente').addEventListener('submit', function (e) {
  e.preventDefault();

  // VALIDACIÓN GENERAL
  let valido = true;

  const campos = ['nombre', 'apellido', 'rut', 'edad', 'sexo', 'temperatura', 'presionSistolica', 'presionDiastolica', 'pulsaciones', 'oxigeno'];
  campos.forEach(id => {
    const input = document.getElementById(id);
    const valor = input.value.trim();

    if (!valor || (input.type === "number" && isNaN(parseFloat(valor)))) {
      input.classList.add('is-invalid');
      valido = false;
    } else {
      input.classList.remove('is-invalid');
    }
  });

  const edad = parseInt(document.getElementById('edad').value);
  const temperatura = parseFloat(document.getElementById('temperatura').value);
  const sistolica = parseInt(document.getElementById('presionSistolica').value);
  const diastolica = parseInt(document.getElementById('presionDiastolica').value);
  const pulsaciones = parseInt(document.getElementById('pulsaciones').value);
  const oxigeno = parseInt(document.getElementById('oxigeno').value);

  if (edad <= 0 || temperatura < 30 || temperatura > 45 || sistolica <= 0 || diastolica <= 0) {
    alert("Ingrese algo correcto");
    valido = false;
  }

  if (!valido) return;

  // CAPTURA DE DATOS
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const rut = document.getElementById('rut').value.trim();
  const sexo = document.getElementById('sexo').value;
  const otrosSintomas = document.getElementById('otrosSintomas').value.trim();

  let sintomas = [];

  // DETECCIÓN AUTOMÁTICA DE SÍNTOMAS
  if (temperatura > 37.8) sintomas.push("Fiebre");
  if (sistolica > 140 || diastolica > 90) sintomas.push("Presión alta");
  if (sistolica < 90 || diastolica < 60) sintomas.push("Presión baja");

  // DETECCIÓN DE SÍNTOMAS MANUALES
  document.querySelectorAll('.sintoma:checked').forEach(cb => {
    sintomas.push(cb.value);
  });

  if (otrosSintomas !== "") {
    sintomas.push(otrosSintomas);
  }

  // CLASIFICACIÓN DE URGENCIA
  let urgencia = "Verde";
  if (sintomas.length >= 6) urgencia = "Rojo";
  else if (sintomas.length >= 4) urgencia = "Amarillo";

  // GUARDADO CLIENTE
  const paciente = {
    nombre,
    apellido,
    rut,
    edad,
    sexo,
    temperatura,
    presionSistolica: sistolica,
    presionDiastolica: diastolica,
    pulsaciones,
    oxigeno,
    sintomas,
    urgencia
  };

  let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  pacientes.push(paciente);
  localStorage.setItem("pacientes", JSON.stringify(pacientes));

// CAMBIAR COLOR DEL MODAL SEGÚN URGENCIA
const modalHeader = document.getElementById("modalHeader");
const modalContent = document.getElementById("modalContent");

// Limpia clases previas
modalHeader.className = "modal-header text-white";
modalContent.className = "modal-content border";

// Aplica clases dinámicas
if (urgencia === "Verde") {
  modalHeader.classList.add("bg-success");
  modalContent.classList.add("border-success");
} else if (urgencia === "Amarillo") {
  modalHeader.classList.add("bg-warning");
  modalContent.classList.add("border-warning");
} else {
  modalHeader.classList.add("bg-danger");
  modalContent.classList.add("border-danger");
}

// Insertar texto y mostrar modal
document.getElementById("urgenciaModal").textContent = urgencia;
const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
modal.show();

  // LIMPIEZA DEL FORMULARIO
  document.getElementById("formPaciente").reset();
  document.querySelectorAll('.is-invalid').forEach(elem => elem.classList.remove('is-invalid'));
});
