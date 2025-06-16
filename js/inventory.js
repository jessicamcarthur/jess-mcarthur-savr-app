import { supabase } from './connection.js';

const inventoryList = document.querySelector('.inventory-list');

async function fetchAndAppendItems() {
  const inventoryList = document.querySelector('.inventory-list');

    if (!inventoryList) {
    console.error('No .inventory-list element found on the page.');
    return;
  }
  
  const { data, error } = await supabase
    .from('add')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching items:', error);
    return;
  }

  data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    itemDiv.innerHTML = `
      <div>
        <p class="name">${item.name}</p>
        <p class="date">${formatDate(item.date)}</p>
      </div>
      <div class="item-details">
        <span class="quantity">${item.quantity} ${item.unit}</span>
        <a href="edit.html?name=${encodeURIComponent(item.name)}" class="edit-item">
          <img src="assets/edit.svg" alt="Edit icon">
        </a>
      </div>
    `;

    inventoryList.appendChild(itemDiv);
  });
}

// Helper to format date from "YYYY-MM-DD" to "DD/MM/YY"
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = `${date.getFullYear()}`.slice(-2);
  return `${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', fetchAndAppendItems);