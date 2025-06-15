import { supabase } from './connection.js'

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const ingredient = params.get("name");

    if (!ingredient) {
        document.getElementById("recipe-title").textContent = "No ingredient specified";
        return;
    }

    // Get all recipes
    const { data: recipes, error } = await supabase
        .from("recipes")
        .select("*");

    if (error || !recipes) {
        document.getElementById("recipe-title").textContent = "No recipe found";
        console.error(error);
        return;
    }

    // Filter recipes in JavaScript based on ingredient
    const matchedRecipe = recipes.find(recipe =>
        recipe.ingredients.some(item =>
            item.name.toLowerCase().includes(ingredient.toLowerCase())
        )
    );

    if (!matchedRecipe) {
        document.getElementById("recipe-title").textContent = "No recipe found for that ingredient";
        return;
    }

    // Populate recipe
    document.getElementById("recipe-title").textContent = matchedRecipe.title;
    document.getElementById("recipe-image").src = `assets/${matchedRecipe.image}`;

    // Show ingredients
    const ingredientsList = document.getElementById("ingredients-list");
    ingredientsList.innerHTML = "";
    matchedRecipe.ingredients.forEach((ing) => {
        ingredientsList.innerHTML += `
      <div class="item">
        <div><p class="name">${ing.name}</p></div>
        <div class="item-details"><span class="quantity">${ing.quantity}</span></div>
      </div>`;
    });

    // Show steps
    const stepsList = document.getElementById("steps-list");
    stepsList.innerHTML = "";
    matchedRecipe.steps.forEach((step) => {
        stepsList.innerHTML += `
      <div class="item">
        <div><p class="step">${step}</p></div>
      </div>`;
    });
});
