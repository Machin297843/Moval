const renderIllness = (e) => {
  const render =
    document.getElementById('illnessChkInput').value === 'true' ? true : false;
  if (render) {
    document.getElementById('illnessInputContainer').style.display = 'flex';
  } else {
    document.getElementById('illnessInputContainer').style.display = 'none';
  }
  console.log(render);
};

const renderTreatment = (e) => {
  const render =
    document.getElementById('treatmentChkInput').value === 'si' ? true : false;
  if (render) {
    document.getElementById('treatmentInputContainer').style.display = 'flex';
  } else {
    document.getElementById('treatmentInputContainer').style.display = 'none';
  }
};
const renderContraindicated = (e) => {
  const render =
    document.getElementById('contraindicatedChkInput').value === 'si'
      ? true
      : false;
  if (render) {
    document.getElementById('contraindicatedInputContainer').style.display =
      'flex';
  } else {
    document.getElementById('contraindicatedInputContainer').style.display =
      'none';
  }
};

const submitFormBtn = document.getElementById('submitFormBtn');

const authorizationChkInput = document.getElementById('authorizationChkInput');

const sendFormData = async () => {
  const name = document.getElementById('nameInput').value.trim();
  const age = document.getElementById('ageInput').value;
  const dni = document.getElementById('ciInput').value;
  const tel = document.getElementById('telInput').value;
  const parentCell = document.getElementById('parentCelInput').value;
  const addressInput = document.getElementById('addressInput').value.trim();
  const hospital = document.getElementById('hospitalInput').value.trim();
  const medicalEmergency = document
    .getElementById('medicalEmergencyInput')
    .value.trim();
  const illness = document.getElementById('illnessInput').value.trim();
  const treatment = document.getElementById('treatmentInput').value.trim();
  const contraindicated = document
    .getElementById('contraindicatedInput')
    .value.trim();
  const serialNumber = document
    .getElementById('serialNumberInput')
    .value.trim();
  const suceptibleOidos = document.getElementById('suceptibleOidos').checked;
  const suceptibleGarganta =
    document.getElementById('suceptibleGarganta').checked;
  const suceptibleBronquitis = document.getElementById(
    'suceptibleBronquitis'
  ).checked;
  const suceptibleAsma = document.getElementById('suceptibleAsma').checked;
  const suceptibleDolorCabeza = document.getElementById(
    'suceptibleDolorCabeza'
  ).checked;
  const suceptibleMareos = document.getElementById('suceptibleMareos').checked;
  const suceptibletrastornosDigestivos = document.getElementById(
    'suceptibleTrastornosDigestivos'
  ).checked;
  const suceptibleResfrioTos = document.getElementById(
    'suceptibleResfrioTos'
  ).checked;

  if (!name || !age || !dni || !tel || !parentCell || !hospital) {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }

  let suceptiveness = '';
  suceptibleOidos && (suceptiveness += 'Oídos, ');
  suceptibleGarganta && (suceptiveness += 'Garganta, ');
  suceptibleBronquitis && (suceptiveness += 'Bronquitis, ');
  suceptibleAsma && (suceptiveness += 'Asma, ');
  suceptibleDolorCabeza && (suceptiveness += 'Dolor de cabeza, ');
  suceptibleMareos && (suceptiveness += 'Mareos, ');
  suceptibletrastornosDigestivos &&
    (suceptiveness += 'Trastornos digestivos, ');
  suceptibleResfrioTos && (suceptiveness += 'Resfrío y tos, ');

  const medicationsName = document.getElementsByClassName(
    'tableMedicationsInputName'
  );
  const medicationsDosage = document.getElementsByClassName(
    'tableMedicationsInputDosis'
  );

  let medications = [];
  for (let i = 0; i < medicationsName.length; i++) {
    const medName = medicationsName[i].value.trim();
    const medDosage = medicationsDosage[i].value.trim();
    if (medName && medDosage) {
      medications[i] = {
        name: medName,
        dosage: medDosage,
      };
    }
  }

  const data = {
    name,
    age,
    dni,
    direction: addressInput,
    telephone: tel,
    parentsCellphone: parentCell,
    hospital,
    medicalEmergency,
    illness,
    treatment,
    contraindications: contraindicated,
    susceptibleIllness: suceptiveness,
    secured: serialNumber,
    medications,
  };

  console.log(data);
  console.log(JSON.stringify(data));

  try {
    console.log('Enviando petición POST a https://back.moval.uy/api/campers');
    const response = await fetch('https://back.moval.uy/api/campers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(
      'Fetch completado. Status:',
      response.status,
      response.statusText
    );

    if (response.ok) {
      //redirigir a página de registro exitoso
      const nombreUsuario = name.split(' ')[0];
      window.location.href = '/registroExitoso.html?name=' + nombreUsuario;
      return;
    }

    alert('Ficha enviada correctamente.');
  } catch (error) {
    // Errores aquí suelen ser de red, DNS, TLS o CORS (cuando el navegador bloquea la petición)
    console.error('Fetch falló:', error);
    alert(
      'Error de red o CORS al enviar la ficha. Abre la consola para ver detalles.'
    );
  }
};

submitFormBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!authorizationChkInput.checked) {
    alert('Debe autorizar la asistencia al campamento para enviar la ficha.');
    return;
  }
  sendFormData();
});
