console.log('add-item.js loaded');
import { supabase } from './connection.js'

const form = document.querySelector('#add-item')
console.log('Form element:', form);

form.addEventListener('submit', async (event) => {
  event.preventDefault()
console.log('Form submitted!')

  const formData = new FormData(form)
  const name = formData.get('itemName')
  const quantity = parseInt(formData.get('quantity'))
  const date = formData.get('expiryDate')

  console.log({ name, quantity, date })

  const { data, error } = await supabase
    .from('add')
    .insert([{ name, quantity, date }])
    .select()
    .single()

    if (error) {
    console.error('Error inserting:', error.message)
    alert('Failed to add item')
    return
  }

  window.location.href = `inventory.html?id=${data.id}`
})