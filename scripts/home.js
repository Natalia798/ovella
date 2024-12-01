const cardsContainer = document.querySelector('.cards-container');

fetch(
  'https://raw.githubusercontent.com/Natalia798/ovella-json-data/refs/heads/main/welcomeCards.json'
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((cardDetails) => {
      const { title, description, imageSrc, buttonRef, buttonName } =
        cardDetails;

      cardsContainer.innerHTML += `
        <div class="card">
          <div class="card-content">
            <img src="${imageSrc}" alt="" class="card-image" />
              <div class="card-content-details">
                <h3>${title}</h3>
                <p>${description}</p>
                <a href="${buttonRef}">${buttonName}</a>
              </div>
          </div>
        </div>
        `;
    });
  });
