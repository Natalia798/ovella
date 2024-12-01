const recipeList = document.querySelector('.recipe-list');

let activeCategory = null;
let activeMeal = null;

fetch(
  'https://raw.githubusercontent.com/Natalia798/ovella-json-data/refs/heads/main/recipes.json'
)
  .then((response) => response.json())
  .then((data) => {
    function displayRecipes() {
      recipeList.innerHTML = '';

      if (!activeCategory || !activeMeal) {
        recipeList.innerHTML = `
          <p class="message">Selectează o categorie și un tip de masă pentru a vedea rețetele.</p>
        `;
        return;
      }

      const filteredRecipes = data.filter(
        (recipe) =>
          recipe.category === activeCategory && recipe.meal === activeMeal
      );

      if (filteredRecipes.length === 0) {
        recipeList.innerHTML = `
          <p class="message">Nu au fost găsite rețete pentru categoria și tipul mesei selectate.</p>
        `;
        return;
      }

      filteredRecipes.forEach((recipe) => {
        const { name, nutrients } = recipe;

        const calories = Math.round(
          nutrients.protein * 4 + nutrients.carbs * 4 + nutrients.fat * 9
        );

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeName = document.createElement('div');
        recipeName.classList.add('recipe-name');
        recipeName.textContent = name;

        const nutrientsDiv = document.createElement('div');
        nutrientsDiv.classList.add('nutrients');
        nutrientsDiv.innerHTML = `
          <i class="fas fa-drumstick-bite"></i> ${nutrients.protein}g
          <i class="fas fa-bread-slice"></i> ${nutrients.carbs}g
          <i class="fas fa-cheese"></i> ${nutrients.fat}g
          <i class="fas fa-fire-alt"></i> ${calories}kcal
        `;

        recipeCard.appendChild(recipeName);
        recipeCard.appendChild(nutrientsDiv);

        recipeList.appendChild(recipeCard);
      });
    }

    document.querySelectorAll('.tab-link').forEach((tab) => {
      tab.addEventListener('click', (e) => {
        document
          .querySelectorAll('.tab-link')
          .forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        activeCategory = e.target.getAttribute('data-category');

        displayRecipes();
      });
    });

    document.querySelectorAll('.sub-tab-link').forEach((subTab) => {
      subTab.addEventListener('click', (e) => {
        document
          .querySelectorAll('.sub-tab-link')
          .forEach((st) => st.classList.remove('active'));
        subTab.classList.add('active');

        activeMeal = e.target.getAttribute('data-meal');

        displayRecipes();
      });
    });

    displayRecipes();
  })
  .catch((error) => {
    console.log(error);
    recipeList.innerHTML = `
      <p>Eroare la încărcarea rețetelor. Vă rugăm să încercați din nou mai târziu.</p>
    `;
  });
