const ENDPOINT = "http://localhost:8080/orange/api/";

async function listAvailableInstitutionsWithSchedule() {
    const response = await fetch(ENDPOINT + "institution/institutions-available", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

async function populateAvailableInstitutions() {
    const instData = await listAvailableInstitutionsWithSchedule();
    console.log(instData);
    let elementStr;
    let instContainer = document.getElementsByClassName("card__container")[0];
    instContainer.innerHTML = "";
    instData.forEach(function (element) {
        elementStr = 
        `<article class="card__article">
              <img src="/img/${element.id}.png" alt="image" class="card__img">

              <div class="card__data">
                 <p class="card__title">${element.name}</p>
                 <p><b>Email address:</b> ${element.mail}</p>
                 <p><b>Address:</b> ${element.address}</p>
                 <p><b>Schedule:</b> ${element.schedule}</p>
              </div>
           </article>`;
        instContainer.innerHTML += elementStr;
    });
}

addEventListener("DOMContentLoaded", function () {
    populateAvailableInstitutions();
  });