let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
let cakesContainer = document.getElementById('cakes');
let cakeDetails = document.getElementById('cakes-details');
let backBtn = document.getElementById('back-btn');
let cakesDetailsContent = document.querySelector('.cakes-details-content');
let errorContainer = document.getElementById('error-container');
let resultHeader = document.getElementById('result-heading');

let baseURL = 'https://www.themealdb.com/api/json/v1/1/';
let searchURL = baseURL + 'search.php?s=';
let lookupURL = baseURL + 'lookup.php?i=';
searchBtn.addEventListener('click', searchMeals);
cakesContainer.addEventListener("click", handlecakeclick)
backBtn.addEventListener('click', () => {
    cakeDetails.classList.add('hidden');})
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMeals();
    }});
   async function searchMeals() {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    errorContainer.textContent = 'Please enter a search term.';
    errorContainer.classList.remove('hidden');
    return;
  }

  try {
    resultHeader.textContent = `Search results for "${searchTerm}"`;
    cakesContainer.innerHTML = '';
    errorContainer.classList.add('hidden');

    const response = await fetch(searchURL + encodeURIComponent(searchTerm));
    const data = await response.json();

    if (!data.meals) {
      resultHeader.textContent = '';
      cakesContainer.innerHTML = '';
      errorContainer.textContent = 'No results found. Please try a different search term.';
      errorContainer.classList.remove('hidden');
      return;
    }

    // Filter only cake recipes
    const cakeMeals = data.meals.filter(meal =>
      meal.strMeal.toLowerCase().includes('cake')
    );

    if (cakeMeals.length === 0) {
      resultHeader.textContent = '';
      cakesContainer.innerHTML = '';
      errorContainer.textContent = 'No cake recipes found. Please try a different search term.';
    searchInput.value = '';

      errorContainer.classList.remove('hidden');
      return;
    }

    resultHeader.textContent = `Search results for ${searchTerm}`;
    displayMeals(cakeMeals);
    searchInput.value = '';

  } catch (error) {
    errorContainer.textContent = "An error occurred while fetching data. Please try again later.";
    errorContainer.classList.remove("hidden");
    console.error(error);
  }
}

function displayMeals(meals) {
  cakesContainer.innerHTML = '';
  meals.forEach(meal => {
    let categoryHTML = meal.strCategory ? `<div class="cake-category">${meal.strCategory}</div>` : '';
    cakesContainer.innerHTML += `
      <div class="cake" data-meal-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="cake-info">
          <h3 class="cake-title">${meal.strMeal}</h3>
          ${categoryHTML}
        </div>
      </div>
    `;
  });
}

// Moved OUTSIDE displayMeals
async function handlecakeclick(e) {
  const cakeElement = e.target.closest('.cake');
  if (!cakeElement) return;
  const mealID = cakeElement.getAttribute('data-meal-id');

  try {
    const response = await fetch(lookupURL + mealID);
    const data = await response.json();

    if (data.meals && data.meals[0]) {
      const cakes = data.meals[0];
      let ingredients = [];

      for (let i = 1; i <= 20; i++) {
        if (cakes[`strIngredient${i}`] && cakes[`strIngredient${i}`].trim() !== '') {
          ingredients.push({
            ingredient: cakes[`strIngredient${i}`],
            measure: cakes[`strMeasure${i}`]
          });
        }
      }

      cakesDetailsContent.innerHTML = `
        <h2 class = "cake-h2">${cakes.strMeal}</h2>
        <img src="${cakes.strMealThumb}" alt="${cakes.strMeal}" class="cake-details-img">
        <div class="cake-details-category">
          <span>${cakes.strCategory || "Uncategorized"}</span>
        </div>
        <div class="cake-details-instructions">
          <h3>Instructions</h3>
          <p>${cakes.strInstructions}</p>
        </div>
        <div class="cake-details-ingredients">
          <h3>Ingredients</h3>
          <ul class="ingredients-list">
            ${ingredients.map(item => `<li><i class="fa-regular fa-circle-check"></i>${item.measure} ${item.ingredient}</li>`).join("")}
          </ul>
        </div>
        ${cakes.strYoutube ? `
          <a href="${cakes.strYoutube}" target="_blank" class="youtube-link">
            <i class="fab fa-youtube"></i> Watch Video
          </a>` : ""}
      `;

      cakeDetails.classList.remove("hidden");
      cakeDetails.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    console.error("Error fetching meal details:", error);
    errorContainer.textContent = "Unable to load recipe details. Please try again.";
    errorContainer.classList.remove("hidden");
  }
}