const header = document.querySelector('header');

function handleMediaChange(event) {
  const isInSubdirectory = window.location.pathname.includes('/pages/');
  const basePath = isInSubdirectory ? '../' : './';

  if (!event.matches) {
    // For larger screens
    header.innerHTML = `
    <nav>
      <div class="container">
        <a href="${basePath}index.html" class="logo">ovella.</a>
        <ul>
          <li class="info-list-item">
            <a>Informații teoretice<span class="material-symbols-outlined arrow-down-icon"> arrow_drop_down </span></a>
            <div class="submenu">
              <a href="${basePath}pages/menstrual-cycle-phases.html">Fazele menstruale</a>
              <a href="${basePath}pages/fasting-types.html">Postul alimentar</a>
              <a href="${basePath}pages/recommended-food.html">Alimente recomandate</a>
              <a href="${basePath}pages/glucose-control-tips.html">Gestionarea glicemiei</a>
            </div>
          </li>
          <li><a href="${basePath}pages/meal-planner.html">Meniu personalizat</a></li>
          <li><a href="${basePath}pages/recipes.html">Rețete</a></li>
        </ul>
      </div>
    </nav>
    `;

    const infoListItem = document.querySelector('.info-list-item');
    const submenuList = document.querySelector('.submenu');
    let isSubmenuVisible = false;

    function toggleSubmenu() {
      isSubmenuVisible = !isSubmenuVisible;
      submenuList.style.display = isSubmenuVisible ? 'block' : 'none';
    }

    infoListItem.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleSubmenu();
    });

    document.addEventListener('click', () => {
      if (isSubmenuVisible) {
        isSubmenuVisible = false;
        submenuList.style.display = 'none';
      }
    });
  } else {
    // For smaller screens
    header.innerHTML = `
    <nav>
      <div class="container">
        <a href="${basePath}index.html" class="logo">ovella.</a>
        <span class="material-symbols-outlined menu-icon">menu</span>
        <ul>
          <li><a href="${basePath}pages/menstrual-cycle-phases.html">Fazele menstruale</a></li>
          <li><a href="${basePath}pages/fasting-types.html">Postul alimentar</a></li>
          <li><a href="${basePath}pages/recommended-food.html">Alimente recomandate</a></li>
          <li><a href="${basePath}pages/glucose-control-tips.html">Gestionarea glicemiei</a></li>
          <li><a href="${basePath}pages/meal-planner.html">Meniu personalizat</a></li>
          <li><a href="${basePath}pages/recipes.html">Rețete</a></li>
        </ul>
      </div>
    </nav>
    `;

    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('nav ul');

    menuIcon.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
}

const mediaQuery = window.matchMedia('(max-width: 768px)');
handleMediaChange(mediaQuery);
mediaQuery.addEventListener('change', handleMediaChange);
