const films = [...document.querySelectorAll('video')];

films.forEach((film) => {
  film.addEventListener('play', () => {
    films.forEach((other) => {
      if (other !== film) other.pause();
    });
  });
});

document.querySelector('[data-watch]')?.addEventListener('click', () => {
  const film = document.getElementById('main-film');
  if (film) {
    // Native controls remain available if the browser declines playback.
    film.play().catch(() => {});
  }
});
