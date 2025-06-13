import { supabase } from './connection.js';

async function loadItems() {
    const expiringTodayItems = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);
    oneWeekLater.setHours(23, 59, 59, 999);

    // Fetch all items ordered by date ascending
    const { data, error } = await supabase
        .from('add')
        .select('*')
        .order('date', { ascending: true });

    if (error) {
        console.error('Failed to load items:', error);
        return;
    }

    // Clear containers
    const todayContainer = document.getElementById('expiring-today-list');
    const weekContainer = document.getElementById('expiring-week-list');
    todayContainer.innerHTML = '';
    weekContainer.innerHTML = '';

    // Helper to format date as DD/MM/YY
    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }

    function parseLocalDate(dateStr) {
        const [year, month, day] = dateStr.split('T')[0].split('-').map(Number);
        return new Date(year, month - 1, day);

    }

    function isSameDay(date1, date2) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    data.forEach(item => {
        const itemDate = parseLocalDate(item.date);

        const itemHTML = `
    <div class="item">
      <div>
        <p class="name">${item.name}</p>
        <p class="date">${formatDate(item.date)}</p>
      </div>
      <a href="recipe.html?name=${encodeURIComponent(item.name)}">
        <img src="assets/food-menu.svg" alt="Recipe book icon">
      </a>
    </div>`;

        if (isSameDay(itemDate, today)) {
            expiringTodayItems.push(item);
            todayContainer.insertAdjacentHTML('beforeend', itemHTML);
        } else if (itemDate > today && itemDate <= oneWeekLater) {
            weekContainer.insertAdjacentHTML('beforeend', itemHTML);
        } else {
            console.log('Not adding:', item.name);
        }
    });

if (expiringTodayItems.length > 0) {
    const notificationModal = document.getElementById('notification-inline');
    const notificationText = document.getElementById('notification-text');
    const closeBtn = document.getElementById('notification-close');

    notificationText.textContent = `⚠️ You have ${expiringTodayItems.length} item(s) expiring today!`;
    notificationModal.classList.remove('hidden');

    closeBtn.addEventListener('click', () => {
        notificationModal.classList.add('hidden');
    });

}
}

document.addEventListener('DOMContentLoaded', loadItems);