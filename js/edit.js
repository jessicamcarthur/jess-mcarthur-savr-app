import { supabase } from './connection.js';

// Get name from URL
const params = new URLSearchParams(window.location.search);
const name = params.get('name');

document.querySelector('h1').textContent = name;

// Form and input elements
const form = document.getElementById('edit-item-form');
const quantityInput = document.getElementById('quantity');
const dateInput = document.getElementById('date');

// Prefill the form with existing data
async function loadItem() {
  const { data, error } = await supabase
    .from('add')
    .select('quantity, date')
    .eq('name', name)
    .single();

  if (error) {
    console.error('Failed to load item:', error);
    return;
  }

  quantityInput.value = data.quantity;
  dateInput.value = data.date;
}
loadItem();

// Update item on submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newQuantity = quantityInput.value;
  const newDate = dateInput.value;

  const { error } = await supabase
    .from('add')
    .update({ quantity: newQuantity, date: newDate })
    .eq('name', name);

  if (error) {
    console.error('Failed to update item:', error);
  } else {
    window.location.href = 'inventory.html';
  }
});

// Delete modal elements
const deleteBtn = document.getElementById('delete-bin');
const modal = document.getElementById('confirm-modal');
const confirmText = document.getElementById('confirm-text');
const cancelDelete = document.getElementById('cancel-delete');
const confirmDelete = document.getElementById('confirm-delete');

// Set the confirm message
confirmText.textContent = `Are you sure you want to delete "${name}"?`;

// Show modal on delete icon click
if (deleteBtn && modal && confirmText) {
  confirmText.textContent = `Are you sure you want to delete "${name}"?`;

  deleteBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
}

if (cancelDelete && modal) {
  cancelDelete.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

if (confirmDelete) {
  confirmDelete.addEventListener('click', async () => {
    const { error } = await supabase
      .from('add')
      .delete()
      .eq('name', name);

    if (error) {
      console.error('Failed to delete item:', error);
    } else {
      window.location.href = 'inventory.html';
    }
  });
}