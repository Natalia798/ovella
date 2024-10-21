const scrollToTopButton = document.querySelector('.scroll-to-top-button');

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

document.addEventListener('scroll', () => {
  const viewportHeight = window.innerHeight;
  if (window.scrollY < viewportHeight / 2) {
    scrollToTopButton.style.visibility = 'hidden';
  } else {
    scrollToTopButton.style.visibility = 'visible';
  }
});
