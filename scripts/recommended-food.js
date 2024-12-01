const menstrualCycleContainer = document.querySelector('.food-container');

fetch(
  'https://raw.githubusercontent.com/Natalia798/ovella-json-data/refs/heads/main/recommendedFood.json'
)
  .then((response) => response.json())
  .then((data) => {
    let tabsHTML = '';
    let contentHTML = '';

    data.forEach((foodType) => {
      const { id, foodTypeName, foodTypeDescription, foodCategory } = foodType;

      tabsHTML += `<button class="tab-link" data-tab="${id}">${foodTypeName}</button>`;

      let descriptionHTML = '';
      let accordionHTML = '';

      foodTypeDescription.forEach((typeDescription) => {
        const { description, rules, benefits } = typeDescription;
        const rulesHTML = rules
          .map((element) => `<li>${element.rule}</li>`)
          .join('');
        const benefitsHTML = benefits
          .map((element) => `<li>${element.benefit}</li>`)
          .join('');

        descriptionHTML = `
          <div class="description">
            <p>${description}</p>
            <div class="rules">
              <p>Reguli:</p>
              <ul>${rulesHTML}</ul>
            </div>
            <div class="benefits">
              <p>Beneficii:</p>
              <ul>${benefitsHTML}</ul>
            </div>
          </div>
        `;
      });

      foodCategory.forEach((foodCategoryName) => {
        const { categoryId, categoryName, foodArray } = foodCategoryName;
        const foodHTML = foodArray
          .map((element) => `<li>${element.food}</li>`)
          .join('');

        accordionHTML += `
          <div class="accordion-item">
            <button class="accordion-header" data-category="${categoryId}">${categoryName}</button>
            <div class="accordion-content">
              <ul>${foodHTML}</ul>
            </div>
          </div>
        `;
      });

      contentHTML += `
        <div class="tab-content" id="${id}">
          ${descriptionHTML}
          <div class="accordion">
            ${accordionHTML}
          </div>
        </div>
      `;
    });

    menstrualCycleContainer.innerHTML = `
      <div class="tabs">${tabsHTML}</div>
      ${contentHTML}
    `;

    setupTabs();
    setupAccordion();
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

function setupTabs() {
  document.querySelectorAll('.tab-link').forEach((tabButton) => {
    tabButton.addEventListener('click', (event) => {
      const tabName = event.target.getAttribute('data-tab'); // Get tab ID from data-tab attribute

      document.querySelectorAll('.tab-content').forEach((tab) => {
        tab.classList.remove('active');
      });

      document.querySelectorAll('.tab-link').forEach((button) => {
        button.classList.remove('active');
      });

      document.getElementById(tabName).classList.add('active');
      event.target.classList.add('active');
    });
  });
}

function setupAccordion() {
  document.querySelectorAll('.accordion-header').forEach((button) => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling; // Select the content below the header
      content.style.display =
        content.style.display === 'block' ? 'none' : 'block'; // Toggle display
    });
  });
}
