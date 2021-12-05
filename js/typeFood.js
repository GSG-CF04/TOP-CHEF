/* Start Selectors */ 
const searchBtn = document.querySelector(".btn");
const searchInp = document.querySelector(".search-control");
const holder = document.querySelector(".cards-food");
let titelCat = document.querySelector(".header-search");
let catName = localStorage.getItem('catFood');
let parent = document.querySelector(".overlay");
let container = document.createElement("div");
let recipeBar = document.querySelector(".bar");
/* End Selectors */
/* Start Event Listener */ 
titelCat.innerHTML= `<h2>${catName} Category</h2>`;
let final = [];
searchInp.addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    let filterd = final.meals.filter((meal) => {
        return meal.strMeal.toUpperCase().includes(searchString.toUpperCase());
    });
    if(e.key ==="Enter"){searchInp.value=""}
    showMeals(filterd);
});
/* End Event Listener */
/* Start Function */ 
const loadMeals = async () => {
    try {
    let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
    );
    final = await res.json();
        let arr  = final.meals;
    showMeals(arr);
    } catch (err) {
    console.log(err);
    }
};
loadMeals();
const showMeals = (meal) => {
    const htmlDiv = meal
    .map((meal) => {
        return `<div class="card">
            <img src="${meal.strMealThumb}" alt="food">
            <p>${meal.strMeal}</p>
            <button class="get-recipe" onclick="getMealRecipe(${meal.idMeal})">Get Recipe</button>
        </div>`;
    })
    .join("");
    holder.innerHTML = htmlDiv;
};
/* End Function */ 
// getting meal's data
function getMealRecipe(e) {
  // show a popup after clicking get recioe
    parent.style.display = "block";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)
    .then((response) => response.json())
    .then((data) => mealRecipeModal(data.meals));
}
// create the popup content for meal recipe
function mealRecipeModal(meal) {
    container.setAttribute("class", "pop-up");
    parent.appendChild(container);
    container.innerHTML = `
    <div id="head-container"><i class="fas fa-times-circle close" onclick="closePopupWindow()"></i>
        <h3 class = "recipe-title">${meal[0].strMeal}</h3>
        <div class="bar">
        <button id="ing" class=" ingr-btn-style" onclick="showIngredients()">Ingredients</button>
        <button id="rec" class=" recpie-btn" onclick="showRecipe()">Recpie</button>
    </div>
    </div>
    <div class="ing-with-measures">
        <div class="measures"><p class="measure-P"></p></div>
        <div class="ing-text"><p class="ing-p"></p></div>
    </div>
    <div class="recpie-text">${meal[0].strInstructions}</div>`;
let measureP = document.querySelector(".measure-P");
for (const key of Object.keys(meal[0])) {
    for (let i = 1; i <= 20; i++) {
    if (
        key === `strMeasure${i}` &&
        meal[0][key] != null &&
        meal[0][key] != ""
    )
        measureP.innerHTML += `${meal[0][key]}<br>`;
    }
}
let ingP = document.querySelector(".ing-p");
for (const key of Object.keys(meal[0])) {
    for (let i = 1; i <= 20; i++) {
    if (
        key === `strIngredient${i}` &&
        meal[0][key] != null &&
        meal[0][key] != ""
    )
        ingP.innerHTML += `${meal[0][key]}<br>`;
    }
}
// selectors for innerhtml elements
let ingBtn = document.querySelector("#ing");
let recipeBtn = document.querySelector("#rec");
let recipeText = document.querySelector(".recpie-text");
let measures = document.querySelector(".measures");
let ingText = document.querySelector(".ing-text");
// Adding Event Listener for ingerdients btn in popup
ingBtn.addEventListener("click", () => {
measures.style.display = "block";
ingText.style.display = "block";
recipeText.style.display = "none";
recipeBtn.classList.remove("recpie-btn-style");
recipeBtn.setAttribute("class", "recpie-btn");
ingBtn.setAttribute("class", "ingr-btn-style");
});
// Adding Event Listener for recipe btn in popup
recipeBtn.addEventListener("click", () => {
measures.style.display = "none";
ingText.style.display = "none";
recipeText.style.display = "block";
ingBtn.classList.remove("ingr-btn-style");
ingBtn.setAttribute("class", "ingr-btn");
recipeBtn.setAttribute("class", "recpie-btn-style");
});
}
// End of the popup content for meal recipe
// close the popup after clicking the close icon
function closePopupWindow() {
    parent.style.display = "none";
}