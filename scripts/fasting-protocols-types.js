const protocolsContainer = document.querySelector('.slideshow-container');
const dotsContainer = document.querySelector('.dots');

fetch(
  'https://raw.githubusercontent.com/Natalia798/ovella-json-data/refs/heads/main/fastingProtocols.json'
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((protocolType, index) => {
      const { protocolName, protocolDays, id } = protocolType;

      const protocolHTML = protocolDays
        .map((element) => `<li>${element.day}</li>`)
        .join('');

      protocolsContainer.innerHTML += `
        <div class="slide fade" id="slide-${id}">
          <div class="details">
            <h3>${protocolName}</h3>
            <ul>${protocolHTML}</ul>
          </div>
        </div>`;

      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.setAttribute('data-id', id);
      dotsContainer.appendChild(dot);

      dot.addEventListener('click', () => showSlide(index));
    });

    protocolsContainer.innerHTML += `
      <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
      <a class="next" onclick="changeSlide(1)">&#10095;</a> 
    `;

    showSlide(0); // Display the first slide when the page loads
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
