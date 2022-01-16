let loader;

function loadNow(opacity) {
  if (opacity <= 0) {
    displayContent();
  } else {
    loader.style.opacity = opacity;
    window.setTimeout(() => {
      loadNow(opacity - 0.05);
    }, 50);
  }
}

function displayContent() {
  loader.style.display = 'none';
  document.getElementById('content').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  loader = document.getElementById('loader');
  loadNow(1);
});
