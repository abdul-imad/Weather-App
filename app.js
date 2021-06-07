let latitude, longitude;
const feelsLike = document.getElementById("feels-like");
const cloudCover = document.getElementById("cloud-cover");
const uvIndex = document.getElementById("uv-index");
const visibility = document.getElementById("visibility");

const input = document.querySelector(".input-bar");
const search = document.querySelector("button");
const weatherLocation = document.getElementById("city");
const country = document.getElementById("country");
const temp = document.getElementById("temp");
const weatherDesc = document.getElementById("desc");
const timeElem = document.getElementById("time");
const dateElem = document.getElementById("date");

const humidity = document.getElementById("humidity");
const airPress = document.getElementById("pressure");
const rain = document.getElementById("rain");
const windSpeed = document.getElementById("wind");
input.addEventListener("click", () => {
	// input.style.border = "none";
});

search.addEventListener("click", () => {
	city = input.value;
	console.log(city);
	callAPI(city);
	input.value = "";
});

input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		city = input.value;
		console.log(city);
		callAPI(city);
		input.value = "";
	}
});

let options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

success = (pos) => {
	latitude = pos.coords.latitude;
	longitude = pos.coords.longitude;
	console.log(latitude, longitude);
	let city = latitude + "," + longitude;
	callAPI(city);
};
error = (err) => {
	let citiesArr =  ["tokyo","delhi","shanghai","kolkata","cairo","dhaka","osaka","manila","lagos","rio","seoul","ahmedabad","sau paulo"];
    let randomCity = citiesArr[(Math.floor(Math.random() * citiesArr.length))]
	callAPI(randomCity);
	alert("Please allow location access for weather info at current location! Currently displaying weather info of random city..")
};
navigator.geolocation.getCurrentPosition(success, error, options);

let today = new Date();
let date =
	today.getFullYear() +
	"-" +
	"0" +
	(today.getMonth() + 1) +
	"-" +
	(today.getDate() > 9 ? today.getDate() : "0" + today.getDate());
let time =
	(today.getHours() > 9 ? today.getHours() : "0" + today.getHours()) +
	":" +
	(today.getMinutes() > 9 ? today.getMinutes() : "0" + today.getMinutes());

timeElem.innerText = time;
dateElem.innerText = date;

callAPI = (city) => {
	fetch(
		`http://api.weatherstack.com/forecast?access_key=47daa00be6607e7e643c6bbd5cb5cacd&query=${city}`
	)
		.then((response) => {
			console.log(response.status);
			return response.json();
		})
		.then((data) => {
			if (data.current) {
				console.log(data);
				if (data.location.country === "United States of America") {
					country.innerText = "USA";
				} else if (data.location.country === "United Kingdom") {
					country.innerText = "UK";
				} else {
					country.innerText = data.location.country;
				}
				weatherLocation.innerText = data.location.name + ", '";
				temp.innerText = data.current.temperature + "° C";
				weatherDesc.innerText = data.current.weather_descriptions[0];
				feelsLike.innerText = data.current.feelslike;
				humidity.innerText = data.current.humidity + "%";
				airPress.innerText = data.current.pressure + " PS";
				rain.innerText = data.current.precip + "%";
				windSpeed.innerText = data.current.wind_speed + " km/h";
				cloudCover.innerText = data.current.cloudcover + "%";
				uvIndex.innerText = data.current.uv_index;
				visibility.innerText = data.current.visibility;
			} else if (data.error.code == 601 || data.error.code === 615) {
				alert("enter valid city name");
			}
		});
};
