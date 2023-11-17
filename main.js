const apiKey = '305fd51aea274f3ca1e62815231711';
const apiUrl = 'https://api.weatherapi.com/v1/current.json?';
const weatherBox = document.querySelector('.weatherBox');

const loader = document.querySelector('.dot-pulse ');

weatherBox.addEventListener("keypress", async function searchCity(e, city) {
    const weatherCard = document.querySelector('.weather-card');
    const errorBox = document.querySelector('.error-box');
    if(e.key === 'Enter' && e.target.value) {
        city = weatherBox.value;
        const response = await fetch(apiUrl + 'key=' + apiKey + '&q=' + city);
        if(response.status === 404) {
            errorBox.style.display = 'block';
            errorBox.textContent = 'Server can\'t find requested resource';
            weatherCard.style.display = 'none';
            loader.style.display = 'block';
            return;
        } else if (response.status === 400) {
            errorBox.style.display = 'block';
            errorBox.textContent = 'Please enter correct name of city: ';
            weatherCard.style.display = 'none';
            loader.style.display = 'block';
            return;
        }
        const data = await response.json();
        weatherBox.disabled=true;
        console.log(data);
        errorBox.style.display = 'none';
        weatherCard.style.display = 'flex';
        weatherBox.disabled=false;
        weatherBox.value = '';
        let location = document.querySelector('.location');
        location.textContent = data.location.name+', '+data.location.country;
        const date1 = document.querySelector('.date');
        const localtime = data.location.localtime.split(' ')
        const [date, time] = localtime;
        console.log(time);
        const now = new Date(date)
        const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        date1.textContent = formattedDate;
        const time2 = document.querySelector('.time');
        time2.textContent = time;
        const pictureImg = document.querySelector('.picture');
        pictureImg.src =`https:${data.current.condition.icon}`;
        const temp = document.querySelector('.temp');
        temp.textContent = Math.round(data.current.temp_c) + '°c';
        const conditionBlock = document.querySelector('.condition');
        conditionBlock.textContent = data.current.conditionBlock.text;
        const temp_feels = document.querySelector('.temp-feels');
        temp_feels.textContent = data.current.feelslike_c + '°c' ;
        const humidity = document.querySelector('.humid-value');
        humidity.textContent = data.current.humidity + '%';
        const wind = document.querySelector('.wind-value');
        wind.textContent = data.current.wind_kph + 'kph';
        const country = document.querySelector('#country');
        country.style.display = 'none';
        loader.style.display = 'none';
    } else {
        errorBox.style.display = 'block';
        errorBox.textContent = 'Please enter the name of the city and press enter to see the results';
        weatherCard.style.display = 'none';
        loader.style.display = 'block';
        return;
    }
});