/* Global Variables */

// I hide the API_KEY for security reasons, but i tested with my personal API_KEY and it's work!

const API_KEY = ''; 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const btn = document.querySelector("#generate");
btn.addEventListener("click", performAction);

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}`;
    getApi(baseURL)
        .then(function (data) {
            let newObj = {
                date: newDate,
                temp: data.main.temp,
                content: feelings
            }
            postData("/add", newObj)
                .then((crap) => {
                    updateUI()
                        .then(data => console.log("Successful updated the ui"))
                        .catch(err => console.log(err));
                })
                .catch(err => console.error("Error:", err));
        })

        .catch(err => console.log(err))

}

const getApi = async (url) => {

    try {
        const res = await fetch(url, {
            credentials: "same-origin"
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;

    } catch (error) {
        console.log("error", error);
    }
}