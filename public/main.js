
// let params = {
//     country: "SA",
//     city: "Makkah al Mukarramah"
// };
let today = new Date();
let currentDay = today.getDate();
// console.log(currentDay);

function GetPrayerTimingOfCity(cityName) {
    let params = {
        country: "SA",
        city: cityName
    }

    axios.get('http://api.aladhan.com/v1/calendarByCity', {
        params: params
    })
        .then(function (response) {
            const timings = response.data.data[currentDay].timings;
            FillTimeForPrayer("fajr-time", RemoveCountryCode(timings.Fajr));
            FillTimeForPrayer("sunrise-time", RemoveCountryCode(timings.Sunrise));
            FillTimeForPrayer("dhurh-time", RemoveCountryCode(timings.Dhuhr));
            FillTimeForPrayer("asr-time", RemoveCountryCode(timings.Asr));
            FillTimeForPrayer("sunset-time", RemoveCountryCode(timings.Sunset));
            FillTimeForPrayer("isha-time", RemoveCountryCode(timings.Isha));
            FillTimeForPrayer("Date", response.data.data[currentDay].date.readable + " " + response.data.data[currentDay].date.hijri.weekday.ar);
            // document.getElementById("fajr-time").innerHTML = timings.Fajr;
            console.log(response);
            console.log(response.data.data[currentDay].timings);
            console.log(response.data.data[currentDay].date.readable);
            console.log(response.data.data[currentDay].date.hijri.weekday.ar);
            console.log(response.data.data[currentDay].date.hijri.weekday.ar + " " + response.data.data[currentDay].date.readable)
        })
        .catch(function (error) {
            console.log(error);
        });
}

function FillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time;
}
function RemoveCountryCode(time) {
    return time.split(' ')[0];
}

// --------------------
//Fill Select Dynamic
// let cities = ["الرياض ", "الاسكندريه", "جدة", "القاهره", "مكة المكرمة"]
let cities = [{
    arabicName: "مكة المكرمة",
    nameIso: "Makkah al Mukarramah"
}, {
    arabicName: "الرياض",
    nameIso: "Ar Riyāḑ"
}, {
    arabicName: "تبوك",
    nameIso: "	Tabūk"
}, {
    arabicName: "جدة",
    nameIso: "Makkah al Mukarramah"
}, {}
]



for (let city of cities) {
    const content = `<option>${city.arabicName}</option>`;
    document.getElementById("cities_select").innerHTML += content;
};

document.getElementById("cities_select").addEventListener("change", function () {
    // if (this.value == "الرياض") {
    //     GetPrayerTimingOfCity("Ar Riyāḑ") its not dynamic code 
    // }
    document.getElementById("CityNAme").innerHTML = this.value
    let cityName = "";
    for (let city of cities) {
        if (city.arabicName == this.value) {
            cityName = city.nameIso
            // document.getElementById("CityNAme").innerHTML = city.arabicName
        }
    }
    GetPrayerTimingOfCity(cityName)
});

GetPrayerTimingOfCity("Makkah al Mukarramah");    //The first call to function
