// Javascript file to fetch weather data using API key

const apiKey='bdf6dcd87ee7429c94375409252907';

async function getWeather(){
    const city=document.getElementById("cityInput").value.trim();
    const errorE1=document.getElementById("error");
    const card=document.getElementById("weatherCard");

    errorE1.textContent='';
    card.innerHTML='';

// Handling of case when user doesn't enter a city name for fetching weather data
    if(!city){
        errorE1.textContent="Please enter a city name.";
        return;
    }

    try{
        const response=await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        const data=await response.json();

        if(data.error){
            throw new Error(data.error.message);
        }

        const { location, current }=data;
// Displaying the fetched data
        card.innerHTML=`
        <h2>${location.name}, ${location.country}</h2>
        <img src="https:${current.condition.icon}" alt="weather icon"/>
        <p><strong>Condition:</strong>${current.condition.text}</p>
        <p><strong>Temp:</strong>${current.temp_c}C</p>
        <p><strong>Humidity:</strong>${current.humidity}%</p>
        <p><strong>Wind Speed:</strong>${current.wind_kph} km/h</p>
        <p><strong>Last Updated:</strong>${current.last_updated}</p>
        `;
    }
    catch(error){
        console.error("WeatherAPI error:",error.message);
        errorE1.textContent= "Couldn't fetch weather data.";
    }

}
