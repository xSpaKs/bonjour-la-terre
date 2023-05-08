const getWeather = async (lat, long) =>
    await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=fr&units=metric&appid=daa39785fe14e3a3f0ad1650cfc06d79`
    )
        .then((res) => res.json())
        .then((json) => {
            return json;
        })
        .catch((error) => console.error("error >", error));

export { getWeather };
