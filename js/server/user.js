const ENDPOINT = "http://localhost:8080/orange/api/";

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
    let table = document.getElementById("dataTable");
    table.innerHTML = "";
    gifteesData.forEach(function (element) {
        elementStr = 
        `<tr><td>${gifteesData.name}</td>
        <td>${gifteesData.age}</td>
        <td>${gifteesData.description}</td></tr>`;
        table.innerHTML += elementStr;
    });
}

async function populateProfileData() {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = await getUserById(urlParams.get('id'));

    document.getElementById("name").textContent = userData.name;
    document.getElementById("phone").textContent = userData.phone;
    document.getElementById("mail").textContent = userData.mail;
    document.getElementById("needsDescr").textContent = userData.description;

    populateGiftees(userData.id);
}

addEventListener("DOMContentLoaded", function () {
    populateProfileData();
  });