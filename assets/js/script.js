const form = document.querySelector('.busca')
let date = new Date()
let hours = date.getHours()
const c = (c) => document.querySelector(c)

// definindo a data

let dayOfWeek = ''
let day = date.getDate()
let month = ''

switch (date.getDay()) {
    case 0:
        dayOfWeek = 'Domingo'
        break
    case 1:
        dayOfWeek = 'Segunda-feira'
        break
    case 2:
        dayOfWeek = 'Terça-feira'
        break
    case 3:
        dayOfWeek = 'Quarta-feira'
        break
    case 4:
        dayOfWeek = 'Quinta-feira'
        break
    case 5:
        dayOfWeek = 'Sexta-feira'
        break
    case 6:
        dayOfWeek = 'Sábado'
        break
}

switch (date.getMonth()) {
    case 0:
        month = 'Janeiro'
        break
    case 1:
        month = 'Fevereiro'
        break
    case 2:
        month = 'Março'
        break
    case 3:
        month = 'Abril'
        break
    case 4:
        month = 'Maio'
        break
    case 5:
        month = 'Junho'
        break
    case 6:
        month = 'Julho'
        break
    case 7:
        month = 'Agosto'
        break
    case 8:
        month = 'Setembro'
        break
    case 9:
        month = 'Outubro'
        break
    case 10:
        month = 'Novembro'
        break
    case 11:
        month = 'Dezembro'
        break
}


let todayDate = `${dayOfWeek}, ${day} de ${month}`

// funções principais: dados sobre o clima

form.addEventListener ('submit', async (event) => {
    event.preventDefault(); // previne o comportamento padrão do form
    showWarning('Buscando..')
    let inputValue = document.querySelector('#searchInput').value

    if (!inputValue) {
        showWarning('Insira uma localização válida no campo em branco.')
    } else {
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputValue)}&appid=083d619689b40702371f0e0fde09de20&units=metric&lang=pt_br`);
        let json = await results.json();

        if (json.cod == 200) {
            showResults(json)
        } else {
            showWarning('Não encontramos esta localização. Tente novamente.')
        }

    }
})

function showResults (json) {
    c('img').setAttribute ('src', `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
    c('.input_div').style.display = 'none'
    c('#warning').innerHTML = ''
    c('.weather').style.display = 'flex'


    c('.titulo').innerHTML = json.name
    c('.date').innerHTML = todayDate

    let weatherStatus = json.weather[0].description
    c('#weather_status').innerHTML = weatherStatus.replace(weatherStatus[0], weatherStatus[0].toUpperCase())
    
    c('#temp_max_min').innerHTML = `${json.main.temp_min.toFixed(2)}° - ${json.main.temp_max.toFixed(2)}°`
    c('#temp').innerHTML = `${parseInt(json.main.temp)}°`
    c('#wind').innerHTML = `${json.wind.speed.toFixed(2)} km/h`
    c('#humidity').innerHTML = `${parseInt(json.main.humidity)}%`
}

function showWarning(message) {
    document.querySelector ('#warning').innerHTML = message
}


// return button

c('.fa-arrow-left').addEventListener('click', () => {
    c('.input_div').style.display = 'flex'
    c('.weather').style.display = 'none'
})

// nigth mode button

c('.fa-moon').addEventListener('click', () => {
    c('body').classList.toggle('light')
})
