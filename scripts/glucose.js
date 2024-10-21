const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const dotsArray = Array.from(document.querySelectorAll('.dot'));

const showSlides = elementIndex => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < dots.length; index++) {
    if (index === elementIndex) {
      slides[index].style.display = 'block';
      dots[index].className += ' active';
    } else {
      slides[index].style.display = 'none';
      dots[index].className = dots[elementIndex].className.replace(
        ' active',
        '',
      );
    }
  }
};

const handleDotsClick = element => {
  if (element.target.classList.contains('dot')) {
    const dotIndex = dotsArray.indexOf(element.target);
    showSlides(dotIndex);
  }
};

document.addEventListener('click', handleDotsClick);
