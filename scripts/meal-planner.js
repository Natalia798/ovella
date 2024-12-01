const dropdownButton = document.querySelector('.dropdown-button');
const dropdownList = document.querySelector('.dropdown-list');
const menuContainer = document.querySelector('.menu-container');

function handleOpenDropdown() {
  dropdownList.style.display =
    dropdownList.style.display === 'block' ? 'none' : 'block';
}

dropdownButton.addEventListener('click', handleOpenDropdown);

async function fetchRecipes() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Natalia798/ovella-json-data/refs/heads/main/recipes.json'
    );
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error('Nu am putut prelua rețetele de la server', error);
    return []; // Return an empty array on error
  }
}

function filterRecipes(recipes, phaseCategory) {
  const validDietTypes = {
    menstrual: ['ketobiotic', 'post-break'],
    postOvulation: ['ketobiotic', 'post-break'],
    ovulation: ['hormone-support', 'post-break'],
    care: ['hormone-support', 'post-break'],
  };

  return recipes.filter((recipe) =>
    validDietTypes[phaseCategory].includes(recipe.category)
  );
}

function getRandomRecipe(recipes) {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}

function generateDailyMenu(filteredRecipes) {
  const meals = {
    firstMeal: getRandomRecipe(
      filteredRecipes.filter((r) => r.meal === 'first')
    ),
    secondMeal: getRandomRecipe(
      filteredRecipes.filter((r) => r.meal === 'second')
    ),
    snack: getRandomRecipe(filteredRecipes.filter((r) => r.meal === 'snack')),
  };

  return meals;
}

function calculateTotals(menu) {
  const totals = {
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
  };

  for (const meal of Object.values(menu)) {
    if (meal) {
      totals.protein += meal.nutrients.protein;
      totals.carbs += meal.nutrients.carbs;
      totals.fat += meal.nutrients.fat;
      totals.calories +=
        meal.nutrients.protein * 4 +
        meal.nutrients.carbs * 4 +
        meal.nutrients.fat * 9;
    }
  }

  return totals;
}

function displayMenu(menu, totals, phaseText, phaseCategory) {
  menuContainer.innerHTML = `
    <h3 class="menu-title">Meniu personalizat pentru ${phaseText.toLowerCase()}</h3>
   ${Object.values(menu)
     .map(
       (meal) => `
    <div class="recipe-card">
      <div class="recipe-name">${meal.name}</div>
      <div class="nutrients">
        <i class="fas fa-drumstick-bite"></i> ${meal.nutrients.protein}g
        <i class="fas fa-bread-slice"></i> ${meal.nutrients.carbs}g
        <i class="fas fa-cheese"></i> ${meal.nutrients.fat}g
        <i class="fas fa-fire-alt"></i> ${Math.round(
          meal.nutrients.protein * 4 +
            meal.nutrients.carbs * 4 +
            meal.nutrients.fat * 9
        )}kcal
      </div>
    </div>
  `
     )
     .join('')}

    <div class="recipe-card total-menu">
      <div class="recipe-name">Total</div>
      <div class="nutrients">
        <i class="fas fa-drumstick-bite"></i> ${totals.protein}g
        <i class="fas fa-bread-slice"></i> ${totals.carbs}g
        <i class="fas fa-cheese"></i> ${totals.fat}g
        <i class="fas fa-fire-alt"></i> ${totals.calories}kcal
      </div>
    </div>
    <button class="regenerate-menu-button">Regenerează meniul</button>
  `;

  const regenerateButton = document.querySelector('.regenerate-menu-button');
  regenerateButton.addEventListener('click', () =>
    displayRecommendations(phaseCategory, phaseText)
  );
}

function displayRecommendations(phaseCategory, phaseText) {
  fetchRecipes().then((recipes) => {
    const filteredRecipes = filterRecipes(recipes, phaseCategory);
    const dailyMenu = generateDailyMenu(filteredRecipes);
    const totals = calculateTotals(dailyMenu);

    const dietLimits = {
      ketobiotic: { minProtein: 30, maxProtein: 75, maxCarbs: 50 },
      hormoneSupport: { minProtein: 30, maxProtein: 50, maxCarbs: 150 },
    };

    const limits =
      phaseCategory === 'menstrual' || phaseCategory === 'postOvulation'
        ? dietLimits.ketobiotic
        : dietLimits.hormoneSupport;

    if (
      totals.protein < limits.minProtein ||
      totals.protein > limits.maxProtein ||
      totals.carbs > limits.maxCarbs
    ) {
      displayRecommendations(phaseCategory, phaseText);
    } else {
      displayMenu(dailyMenu, totals, phaseText, phaseCategory);
    }
  });
}

dropdownList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const selectedPhase = event.target.classList[0];
    const phaseText = event.target.textContent;
    dropdownList.style.display = 'none';

    displayRecommendations(selectedPhase, phaseText);
  }
});
