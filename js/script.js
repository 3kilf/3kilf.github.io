document.addEventListener('DOMContentLoaded', function() {
    // Обработка формы отзывов (если есть на странице)
    if (document.getElementById('review-form')) {
        setupReviewForm();
        loadUserReviews();
    }
});

// Функции для формы отзывов
function setupReviewForm() {
    const form = document.getElementById('review-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const theaterName = document.getElementById('theater-name').value;
        const reviewText = document.getElementById('review-text').value;
        
        if (theaterName && reviewText) {
            saveReview(theaterName, reviewText);
            form.reset();
            loadUserReviews();
        }
    });
}

function saveReview(theaterName, reviewText) {
    let reviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    
    reviews.push({
        theater: theaterName,
        text: reviewText,
        date: new Date().toLocaleDateString()
    });
    
    localStorage.setItem('userReviews', JSON.stringify(reviews));
}

function loadUserReviews() {
    const reviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    const container = document.getElementById('user-reviews');
    container.innerHTML = '';
    
    if (reviews.length === 0) {
        container.innerHTML = '<p>У вас пока нет сохраненных отзывов.</p>';
        return;
    }
    
    reviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'review-card';
        div.innerHTML = `
            <h4>${review.theater}</h4>
            <p>${review.text}</p>
            <small>${review.date}</small>
        `;
        container.appendChild(div);
    });
}
// Функция для переключения темы
function toggleTheme() {
  const body = document.body;
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'dark') {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
  
  updateThemeIcon();
}

// Функция для обновления иконки кнопки
function updateThemeIcon() {
  const themeBtn = document.getElementById('theme-btn');
  if (document.body.classList.contains('dark-theme')) {
    themeBtn.innerHTML = '☀️'; // Солнце для светлой темы
  } else {
    themeBtn.innerHTML = '🌙'; // Луна для темной темы
  }
}

// Инициализация темы при загрузке страницы
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
  
  // Создаем кнопку переключения темы
  const themeSwitcher = document.createElement('div');
  themeSwitcher.className = 'theme-switcher';
  themeSwitcher.innerHTML = `
    <button id="theme-btn" class="theme-btn" aria-label="Переключить тему"></button>
  `;
  document.body.appendChild(themeSwitcher);
  
  // Устанавливаем обработчик события
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);
  
  // Обновляем иконку
  updateThemeIcon();
}

// Добавляем вызов initTheme в обработчик DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  
  // Остальной существующий код...
  if (document.getElementById('review-form')) {
    setupReviewForm();
    loadUserReviews();
  }
});