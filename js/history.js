document.addEventListener('DOMContentLoaded', function() {
    fetch('data/theaters.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки JSON');
            return response.json();
        })
        .then(data => {
            if (!data.история) throw new Error('Нет исторических данных');
            
            // Загрузка основной информации
            const historyInfo = document.getElementById('history-info');
            historyInfo.innerHTML = `<p>${data.история.общая}</p>`;
            
            // Загрузка фотографий
            const photosContainer = document.getElementById('history-photos');
            data.история.фотографии.forEach(photo => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'gallery-item';
                imgDiv.innerHTML = `<img src="${photo}" alt="Историческое фото" onerror="this.src='images/no-image.jpg'">`;
                photosContainer.appendChild(imgDiv);
            });
            
            // Загрузка событий
            const eventsList = document.getElementById('history-events-list');
            data.история.ключевые_события.forEach(event => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${event.год}:</strong> ${event.событие}`;
                eventsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('history-info').innerHTML = 
                `<p>Произошла ошибка при загрузке исторических данных: ${error.message}</p>`;
        });
});
