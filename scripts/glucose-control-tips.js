const slideContainer = document.querySelector('.slideshow-container');
const dotsContainer = document.querySelector('.dots');

fetch(
  'https://raw.githubusercontent.com/Natalia798/ovella-json-data/refs/heads/main/glucoseControlTips.json'
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((glucoseControlTip, index) => {
      const { id, tipsTitle, tipsDescription } = glucoseControlTip;

      const descriptionHTML = tipsDescription
        .map((element) => `<p>${element.tip}</p>`)
        .join('');

      slideContainer.innerHTML += `
        <div class="slide fade" id="slide-${id}">
          <div class="details">
              <h3>${tipsTitle}</h3>
              <div>${descriptionHTML}</div>
          </div>
        </div>`;

      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.setAttribute('data-id', id);
      dotsContainer.appendChild(dot);

      dot.addEventListener('click', () => showSlide(index));
    });

    slideContainer.innerHTML += `
      <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
      <a class="next" onclick="changeSlide(1)">&#10095;</a>
    `;

    showSlide(0);
  })
  .catch((error) => console.error('Error fetching data:', error));

let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  slides.forEach((slide, slideIndex) => {
    slide.style.display = slideIndex === index ? 'flex' : 'none';
    dots[slideIndex].classList.toggle('active', slideIndex === index);
  });

  currentSlide = index;
}

function changeSlide(step) {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide + step + slides.length) % slides.length;
  showSlide(currentSlide);
}
