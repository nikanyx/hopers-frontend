const ENDPOINT = "http://192.168.11.98:8080/orange/api/";

async function getInstitution(id) {
    const response = await fetch(ENDPOINT + "institution/" + id, {
        method: 'GET',  // The HTTP method to use (GET in this case)
        headers: {
            'Content-Type': 'application/json' // Set the content type as JSON (if required)
            //,'Authorization': 'Bearer your-access-token'  // Optional: Add Authorization header if needed
        }
    });
    return response.json();
}

async function populateProfileData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gifteeData = await getInstitution(urlParams.get('id'));

    document.getElementById("name").textContent = gifteeData.name;
    document.getElementById("address").textContent = gifteeData.address;
    document.getElementById("mail").textContent = gifteeData.mail;
    document.getElementById("instPic").src = `/img/${gifteeData.id}.png`;
}

addEventListener("DOMContentLoaded", function () {
    populateProfileData();
  });