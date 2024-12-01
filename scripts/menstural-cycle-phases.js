const menstrualCycleContainer = document.querySelector('.cycle-container');
const principleContainer = document.querySelector('.menstrual-cycle');

fetch(
  'https://raw.githubusercontent.com/Natalia798/ovella-json-data/refs/heads/main/menstrualCyclePhases.json'
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((menstrualType) => {
      const {
        id,
        phaseName,
        foodChoices,
        phaseDays,
        fastingLength,
        phaseDescription,
      } = menstrualType;

      const descriptionHTML = phaseDescription
        .map((element) => `<p>${element.description}</p>`)
        .join('');

      menstrualCycleContainer.innerHTML += `
        <div class="menstrual-type" id="menstrual-type-${id}">
          <h3>${phaseName}</h3>
          <p>${phaseDays}</p>
          <p>${foodChoices}</p>
          <p><strong>Lungime post:</strong> ${fastingLength}</p>
          <button class="details-button" data-id="${id}">Detalii</button>
          <button class="recommend-button">
            <a href="../pages/recommended-food.html">Vezi alimentele recomandate</a>
          </button>
          <div class="popup-container" id="popup-${id}" style="visibility: hidden;">
            <div class="popup">
              <span class="material-symbols-outlined close-button">close</span>
              <div class="popup-content">
                <h3 class="popup-title">${phaseName} - ${phaseDays}</h3>
                <div class="description">${descriptionHTML}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch((error) => console.log('Error fetching data:', error));

menstrualCycleContainer.addEventListener('click', (event) => {
  const detailsButton = event.target.classList.contains('details-button');
  const popupId = event.target.getAttribute('data-id');
  const popupContainer = document.querySelector(`#popup-${popupId}`);
  const closePopupButton = event.target.classList.contains('close-button');
  const containerTitle = document.querySelector('.cycle-container-title');
  if (detailsButton) {
    const allTypes = document.querySelectorAll('.menstrual-type');
    allTypes.forEach((type) => {
      type.style.display = 'none';
    });

    popupContainer.style.visibility = 'visible';

    const currentType = document.querySelector(`#menstrual-type-${popupId}`);
    currentType.style.display = 'block';

    principleContainer.style.height =
      Math.round(
        containerTitle.scrollHeight * 2.5 + popupContainer.scrollHeight
      ) + 'px';
  }

  if (closePopupButton) {
    const popupContainer = event.target.closest('.popup-container');
    popupContainer.style.visibility = 'hidden';

    const allTypes = document.querySelectorAll('.menstrual-type');
    allTypes.forEach((type) => {
      type.style.display = 'block';
    });

    principleContainer.style.height = 'fit-content';
  }
});
