// ACTIVA FUNCIONES AL CARGAR HTML
document.addEventListener("DOMContentLoaded", function () {
  
  // VINCULA ELEMENTO CON VALOR
  const camposNumericos = [
    { id: "edad", span: "edadValor" },
    { id: "temperatura", span: "temperaturaValor" },
    { id: "presionSistolica", span: "presionSistolicaValor" },
    { id: "presionDiastolica", span: "presionDiastolicaValor" },
    { id: "pulsaciones", span: "pulsacionesValor" },
    { id: "oxigeno", span: "oxigenoValor" }
  ];

  // ACTUALIZA EL VALOR MOSTRADO
  camposNumericos.forEach(({ id, span }) => {
    const input = document.getElementById(id);
    const output = document.getElementById(span);
    output.textContent = input.value;
    input.addEventListener("input", () => output.textContent = input.value);
  });
});

// SE ENVÍA FORMULARIO
document.getElementById('formPaciente').addEventListener('submit', function (e) {
  e.preventDefault(); // EVITA ENVÍO POR DEFECTO DEL FORMULARIO

  // VALIDACIÓN DE CAMPOS
  let valido = true;
  const campos = ['nombre', 'apellido', 'rut', 'edad', 'sexo', 'temperatura', 'presionSistolica', 'presionDiastolica', 'pulsaciones', 'oxigeno'];

  campos.forEach(id => {
    const input = document.getElementById(id);
    const valor = input.value.trim();

    if (!valor || (input.type === "number" && isNaN(parseFloat(valor)))) {
      input.classList.add('is-invalid'); // AGREGA CLASE DE ERROR
      valido = false;
    } else {
      input.classList.remove('is-invalid'); // REMUEVE CLASE DE ERROR
    }
  });

  // VALIDACIONES DE RANGO
  const edad = parseInt(document.getElementById('edad').value);
  const temperatura = parseFloat(document.getElementById('temperatura').value);
  const sistolica = parseInt(document.getElementById('presionSistolica').value);
  const diastolica = parseInt(document.getElementById('presionDiastolica').value);
  const pulsaciones = parseInt(document.getElementById('pulsaciones').value);
  const oxigeno = parseInt(document.getElementById('oxigeno').value);

  if (edad <= 0 || temperatura < 30 || temperatura > 45 || sistolica <= 0 || diastolica <= 0) {
    alert("Ingrese los datos de manera correcta.");
    valido = false;
  }

  if (!valido) return; // DETIENE LA EJECUCIÓN SI HAY ERRORES

  // CAPTURA DE DATOS FORMULARIO
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const rut = document.getElementById('rut').value.trim();
  const sexo = document.getElementById('sexo').value;
  const otrosSintomas = document.getElementById('otrosSintomas').value.trim();

  let sintomas = [];

  // DETECCIÓN DE SÍNTOMAS
  if (temperatura > 37.8) sintomas.push("Fiebre");
  if (sistolica > 140 || diastolica > 90) sintomas.push("Presión alta");
  if (sistolica < 90 || diastolica < 60) sintomas.push("Presión baja");

  // DETECCIÓN DE SÍNTOMAS QUE SE AGREGAN MANUALMENTE
  document.querySelectorAll('.sintoma:checked').forEach(cb => {
    sintomas.push(cb.value);
  });

  // AGREGAR SÍNTOMAS PERSONALIZADOS
  if (otrosSintomas !== "") {
    sintomas.push(otrosSintomas);
  }

  // CLASIFICACIÓN DE URGENCIA POR NÚMERO DE SÍNTOMAS
  let urgencia = "Verde";
  if (sintomas.length >= 6) urgencia = "Rojo";
  else if (sintomas.length >= 4) urgencia = "Amarillo";

  // GUARDADO DE CLIENTE
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

  // CAMBIO DE COLOR SEGÚN URGENCIA
  const modalHeader = document.getElementById("modalHeader");
  const modalContent = document.getElementById("modalContent");

  modalHeader.className = "modal-header text-white";
  modalContent.className = "modal-content border";

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

  // ACTUALIZA TEXTO DEL MODAL Y LO MUESTRA
  document.getElementById("urgenciaModal").textContent = urgencia;
  const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
  modal.show();

  // LIMPIA EL FORMULARIO POST SUBMIT
  document.getElementById("formPaciente").reset();
  document.querySelectorAll('.is-invalid').forEach(elem => elem.classList.remove('is-invalid'));
});
