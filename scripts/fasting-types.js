const typesContainer = document.querySelector('.fasting-types-container');
const principleContainer = document.querySelector('.fasting-container');

fetch(
  'https://raw.githubusercontent.com/Natalia798/ovella-json-data/refs/heads/main/fastingTypes.json'
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((fastingType) => {
      const {
        fastingName,
        fastingTypeLength,
        fastingTypeDescription,
        fastingTypeBenefits,
        id,
      } = fastingType;

      const descriptionHTML = fastingTypeDescription
        .map((element) => `<p>${element.description}</p>`)
        .join('');

      const benefitsHTML = fastingTypeBenefits
        .map((element) => `<li>${element.benefit}</li>`)
        .join('');

      typesContainer.innerHTML += `
        <div class="fasting-type" id="fasting-type-${id}">
          <h3>${fastingName}</h3>
          <p>${fastingTypeLength}</p>
          <button class="details-button" data-id="${id}">Detalii</button>
          <div class="popup-container" id="popup-${id}" style="visibility: hidden;">
            <div class="popup">
              <span class="material-symbols-outlined close-button">close</span>
              <div class="popup-content">
                <h3 class="popup-title">${fastingName}</h3>
                <div class="description">${descriptionHTML}</div>
                <ul class="benefits">${benefitsHTML}</ul>
              </div>
            </div>
          </div>
        </div>`;
    });
  })
  .catch((error) => console.error('Error fetching data:', error)); // Log errors

typesContainer.addEventListener('click', (event) => {
  const isDetailsButton = event.target.classList.contains('details-button');
  const popupId = event.target.getAttribute('data-id');
  const popupContainer = document.querySelector(`#popup-${popupId}`);
  const isCloseButton = event.target.classList.contains('close-button');
  const containerTitle = document.querySelector('.fasting-container-title');

  if (isDetailsButton) {
    const allTypes = document.querySelectorAll('.fasting-type');
    allTypes.forEach((type) => {
      type.style.display = 'none';
    });

    popupContainer.style.visibility = 'visible';

    const currentType = document.querySelector(`#fasting-type-${popupId}`);
    currentType.style.display = 'block';

    principleContainer.style.height =
      Math.round(
        containerTitle.scrollHeight * 2.5 + popupContainer.scrollHeight
      ) + 'px';
  }

  if (isCloseButton) {
    const popupContainer = event.target.closest('.popup-container');
    popupContainer.style.visibility = 'hidden';

    const allTypes = document.querySelectorAll('.fasting-type');
    allTypes.forEach((type) => {
      type.style.display = 'block';
    });

    principleContainer.style.height = 'fit-content';
  }
});
