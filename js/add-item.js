console.log('add-item.js loaded');
import { supabase } from './connection.js';

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#add-item')
  console.log('Form element:', form);

  if (!form) {
    console.error('Form not found!');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log('Form submitted!');

    const formData = new FormData(form);
    const name = formData.get('itemName');
    const quantity = formData.get('quantity');
    const unit = formData.get('unit');
    const date = formData.get('expiryDate');

    console.log({ name, quantity, unit, date });

    const { data, error } = await supabase
      .from('add')
      .insert([{ name, quantity, unit, date }])
      .select()
      .single();

    if (error) {
      console.error('Error inserting:', error.message)
      alert('Failed to add item')
      return;
    }

    document.querySelector('form').style.display = 'none';
    document.querySelector('#confirmation-message').style.display = 'block';
    document.querySelector('header').style.display = 'none';
  });

});