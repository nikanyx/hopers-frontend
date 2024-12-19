const ENDPOINT = "http://localhost:8080/orange/api/";

async function getGifteeById(id) {
    const response = await fetch(ENDPOINT + "giftee/" + id, {
        method: 'GET',  // The HTTP method to use (GET in this case)
        headers: {
            'Content-Type': 'application/json' // Set the content type as JSON (if required)
            //,'Authorization': 'Bearer your-access-token'  // Optional: Add Authorization header if needed
        }
    });
    return response.json();
}

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
    const gifteeData = await getGifteeById(urlParams.get('id'));
    const instData = await getInstitution(gifteeData.institutionId);
    document.getElementById("name").textContent = gifteeData.name;
    document.getElementById("age").textContent = gifteeData.age;
    document.getElementById("instName").textContent = instData.name;
    document.getElementById("needsDescr").textContent = gifteeData.description;
}

addEventListener("DOMContentLoaded", function () {
    populateProfileData();
  });