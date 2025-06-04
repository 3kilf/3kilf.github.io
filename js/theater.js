document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const theaterId = urlParams.get('name');

    if (!theaterId) {
        document.getElementById('theater-info').innerHTML = 
            '<p>Театр не указан. <a href="index.html">Вернуться на главную</a></p>';
        return;
    }

    // Используем относительный путь
    fetch('data/theaters.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки JSON');
            return response.json();
        })
        .then(data => {
            if (!data.театры) throw new Error('Неправильная структура JSON');
            
            const theater = data.театры.find(t => t.id === theaterId);
            if (theater) {
                displayTheaterInfo(theater);
            } else {
                document.getElementById('theater-info').innerHTML = 
                    `<p>Театр "${theaterId}" не найден в базе. <a href="index.html">Вернуться</a></p>`;
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('theater-info').innerHTML = 
                `<p>Произошла ошибка: ${error.message}.<br>
                 Запустите сайт через локальный сервер (Live Server в VS Code).<br>
                 <a href="index.html">Вернуться на главную</a></p>`;
        });
});

function displayTheaterInfo(theater) {
    const container = document.getElementById('theater-info');
    container.innerHTML = `
        <div class="theater-card">
            <img src="${theater.фото}" alt="${theater.название}" onerror="this.src='images/no-image.jpg'">
            <h2>${theater.название}</h2>
            <p>${theater.описание}</p>
            <div class="theater-contacts">
                <p><strong>Адрес:</strong> ${theater.адрес}</p>
                <p><strong>Телефон:</strong> ${theater.телефон}</p>
                <p><strong>Сайт:</strong> <a href="${theater.сайт}" target="_blank">${theater.сайт}</a></p>
            </div>
        </div>
    `;
}