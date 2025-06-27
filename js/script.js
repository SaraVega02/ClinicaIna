document.getElementById('formPaciente').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Captura de campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
    const temperatura = parseFloat(document.getElementById('temperatura').value);
    const sistolica = parseInt(document.getElementById('presionSistolica').value);
    const diastolica = parseInt(document.getElementById('presionDiastolica').value);
    const oxigeno = parseInt(document.getElementById('oxigeno').value);
    const pulsaciones = parseInt(document.getElementById('pulsaciones').value);
    const otrosSintomas = document.getElementById('otrosSintomas').value.trim();
  
    let sintomas = [];
  
    // Detectar síntomas automáticos
    if (temperatura > 37.8) sintomas.push("Fiebre");
    if (sistolica > 140 || diastolica > 90) sintomas.push("Presión alta");
    if (sistolica < 90 || diastolica < 60) sintomas.push("Presión baja");
  
    // Detectar síntomas marcados manualmente
    document.querySelectorAll('.sintoma:checked').forEach(cb => {
      sintomas.push(cb.value);
    });
  
    // Agregar "otros síntomas"
    if (otrosSintomas !== "") {
      sintomas.push(otrosSintomas);
    }
  
    // Clasificación según cantidad de síntomas
    let urgencia = "Verde";
    if (sintomas.length >= 6) urgencia = "Rojo";
    else if (sintomas.length >= 4) urgencia = "Amarillo";
  
    // Aquí podrías guardar en un arreglo o localStorage
    alert(`Paciente registrado con ${sintomas.length} síntomas. Nivel: ${urgencia}`);
  });
  