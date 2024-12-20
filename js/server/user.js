const ENDPOINT = "http://192.168.11.98:8080/orange/api/";

async function getUserById(id) {
    const response = await fetch(ENDPOINT + "user/" + id, {
        method: 'GET',  // The HTTP method to use (GET in this case)
        headers: {
            'Content-Type': 'application/json' // Set the content type as JSON (if required)
            //,'Authorization': 'Bearer your-access-token'  // Optional: Add Authorization header if needed
        }
    });
    return response.json();
}

async function listGifteesByUserId(id) {
    const response = await fetch(ENDPOINT + "user/" + id + "/giftees", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

async function populateGiftees(id) {
    const gifteesData = await listGifteesByUserId(id);
    let elementStr;
    let table = document.getElementsByClassName("dataTable")[0];
    table.innerHTML = "";
    gifteesData.forEach(function (element) {
        elementStr = 
        `<tr><td>${element.name}</td>
        <td>${element.age}</td>
        <td>${element.description}</td></tr>`;
        console.log(elementStr);
        table.innerHTML += elementStr;
    });
}

async function populateProfileData() {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = await getUserById(urlParams.get('id'));
    //const gifteesData = await listGifteesByUserId(urlParams.get('id'));

    document.getElementById("name").textContent = userData.name;
    document.getElementById("phone").textContent = userData.phone;
    document.getElementById("mail").textContent = userData.mail;

    populateGiftees(userData.id);
}

addEventListener("DOMContentLoaded", function () {
    populateProfileData();
  });