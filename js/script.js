document.getElementById('buscarBtn').addEventListener('click', function() {
    const apiKey = '6c0842fdac94e6b682601454876bf1c4';
    const ciudad = document.getElementById('ciudadInput').value.trim();
    const ciudadInput = document.getElementById('ciudadInput');
    const resultadoDiv = document.getElementById('resultado');
    const imagenClima = document.getElementById('imagenClima');
    const form = document.querySelector('.form');

    // Verificar si el campo de entrada tiene un valor
    if (ciudadInput.value.trim() !== '') {
        // Si hay un valor, expandir el formulario
        form.classList.add('expandido');
    } else {
        // Si no hay valor, mantener el formulario normal
        form.classList.remove('expandido');
    }

    // Mostrar el contenedor de resultados solo si la ciudad está ingresada
    if (ciudadInput.value.trim() !== '') {
        resultadoDiv.style.display = 'block';
        resultadoDiv.style.marginTop = '80px'; // Ajustar el margen superior al mostrar el resultado
        imagenClima.classList.add('oculto'); // Ocultar la imagen cuando se muestra el resultado
    } else {
        imagenClima.style.display = 'none';
    }
    if (ciudad !== '') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&lang=es`) // Agrega &lang=es para recibir la descripción en español
            .then(response => response.json())
            .then(data => {
                console.log(data);
                mostrarResultado(data);
            })
            .catch(error => {
                console.error('Error al obtener los datos del clima:', error);
                mostrarError();
            });
    } else {
        mostrarError();
    }

    
});

function mostrarResultado(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (data.cod === 200) {
        const temperatura = Math.round(data.main.temp - 273.15);
        const descripcion = traducirDescripcion(data.weather[0].description); // Aquí se traduce la descripción
        const icono = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        resultadoDiv.innerHTML = `
        
        <img src="${icono}" alt="Icono del clima">
            <h2>El clima en ${data.name} es:</h2>
            <p>Temperatura: ${temperatura}°C</p>
            <p>${descripcion}</p>
        `;
    } else {
        resultadoDiv.textContent = 'Ciudad no encontrada. Por favor, ingresa un nombre de ciudad válido.';
        resultadoDiv.style.marginTop = '-5em';
    resultadoDiv.style.marginBottom = '2em';
    }
}

function mostrarError() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = 'Por favor, ingresa un nombre de ciudad válido.';
    resultadoDiv.style.marginTop = '-5em';
    resultadoDiv.style.marginBottom = '7em';
}

function traducirDescripcion(description) {
    switch (description.toLowerCase()) {
        case 'clear sky':
            return 'Cielo despejado';
        case 'few clouds':
            return 'Algunas nubes';
        case 'scattered clouds':
            return 'Nubes dispersas';
        case 'broken clouds':
            return 'Nubes rotas';
        case 'overcast clouds':
            return 'Nublado';
        case 'shower rain':
            return 'Lluvia ligera';
        case 'light rain':
            return 'Lluvia ligera';
        case 'moderate rain':
            return 'Lluvia moderada';
        case 'rain':
            return 'Lluvia';
        case 'thunderstorm':
            return 'Tormenta eléctrica';
        case 'snow':
            return 'Nieve';
        case 'mist':
            return 'Niebla';
        default:
            return description; // Si no se encuentra una traducción, se devuelve la descripción original
    }
}

