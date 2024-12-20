const ENDPOINT = "http://192.168.11.98:8080/orange/api/";
const LOGGEDINUSER = 3;

async function listAvailableGiftees(path) {
    const response = await fetch(ENDPOINT + "giftee/available", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

async function claimGiftee(id) {
  const response = await fetch(ENDPOINT + "giftee/" + id + "?user=" + LOGGEDINUSER, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
  });
  return response.json();
}

function gifteeButtonHandlers() {
    const aboutButtonList = document.querySelectorAll(".aboutMe");
    const pickButtonList = document.querySelectorAll(".hireMe");
  
    aboutButtonList.forEach((elem) => {
        elem.addEventListener('click', function(event) {
            const id = event.currentTarget.id.split("-")[2];
            window.location.href = `/html/profile.html?id=${encodeURIComponent(id)}`;
          });
    });

    pickButtonList.forEach((element) => {element.addEventListener("click", async function (event) {
        event.preventDefault();
        await claimGiftee(event.currentTarget.id.split("-")[2]);
      })
    });
  }

async function populateAvailableGiftees() {
    const gifteesData = await listAvailableGiftees();
    let elementStr;
    let gifteeSlide = document.getElementsByClassName("swiper-wrapper")[0];
    gifteeSlide.innerHTML = "";
    gifteesData.forEach(function (element) {
        elementStr = 
        `<div class="swiper-slide card">
              <div class="card-content">
                <div class="image">
                  <img src="/img/menina.png" alt="">
                </div>
    
                <div class="name-profession">
                  <span class="name">${element.name}</span>
                  <span class="profession">${element.age}</span>
                </div>
    
                <div class="button">
                    <button class="aboutMe" id="about-btn-${element.id}">About Me</button>
                    <button class="hireMe" id="pick-btn-${element.id}">Pick Me</button>
                </div>
              </div>
            </div>`;
        gifteeSlide.innerHTML += elementStr;
    });

    gifteeButtonHandlers();
}

addEventListener("DOMContentLoaded", function () {
    populateAvailableGiftees();
  });