/* Start Selectors */ 
const searchBtn = document.querySelector(".btn");
const searchInp = document.querySelector(".search-control");
const holder = document.querySelector(".cards-food");
let titelCat = document.querySelector(".header-search");
let catName = localStorage.getItem('catFood');
let parent = document.querySelector(".overlay");
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