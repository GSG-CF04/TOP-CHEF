/* Start Selectors */ 
const searchBtn = document.querySelector(".btn");
const searchInp = document.querySelector(".search-control");
const holder = document.querySelector(".cards-drink");
let titelCat = document.querySelector(".header-search");
let catName = localStorage.getItem('catDrink');
let parent = document.querySelector(".overlay");
let container = document.createElement("div");
/* End Selectors */
/* Start Event Listener */
titelCat.innerHTML= `<h2>${catName} Category</h2>`;
let final = [];
searchInp.addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    let filterd = final.drinks.filter((drink) => {
        return drink.strDrink.toUpperCase().includes(searchString.toUpperCase());
    });
    if(e.key ==="Enter"){searchInp.value=""}
    showDrinks(filterd);
});
/* End Event Listener */
/* Start Function */ 
const loadDrinks = async () => {
    try {
    let res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catName}`
    );
    final = await res.json();
        let arr  = final.drinks;
    showDrinks(arr);
    } catch (err) {
    console.log(err);
    }
};
loadDrinks();
const showDrinks = (drink) => {
    const htmlDiv = drink
    .map((drink) => {
        return `<div class="card">
            <img src="${drink.strDrinkThumb}" alt="drink">
            <p>${drink.strDrink}</p>
            <button class="get-recipe" onclick="getDrinkRecipe(${drink.idDrink})">Get Recipe</button>
        </div>`;
    })
    .join("");
    holder.innerHTML = htmlDiv;
};
/* End Function */ 
// getting Drinks's data
function getDrinkRecipe(e) {
    // show a popup after clicking get recipe btn
    parent.style.display = "block";
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${e}`)
    .then((response) => response.json())
    .then((data) => drinkRecipeModal(data.drinks));
}
// create the popup content for drinks recipes
function drinkRecipeModal(drink) {
    container.setAttribute("class", "pop-up");
    parent.appendChild(container); 
    container.innerHTML = `
      <div id="head-container"><i class="fas fa-times-circle close" onclick="closePopupWindow()"></i>
        <h3 class = "recipe-title">${drink[0].strDrink}</h3>
        <div class="bar">
        <button id="ing" class=" ingr-btn-style" onclick="showIngredients()">Ingredients</button>
        <button id="rec" class=" recpie-btn" onclick="showRecipe()">Recpie</button>
      </div>
      </div>
      <div class="ing-with-measures">
      <div class="measures"><p class="measure-P"></p></div>
      <div class="ing-text"><p class="ing-p"></p> 
  </div>
  </div>
  <div class="recpie-text">${drink[0].strInstructions}</div>`;
    let measureP = document.querySelector(".measure-P");
    for (const key of Object.keys(drink[0])) {
      for (let i = 1; i <= 20; i++) {
        if (
          key === `strMeasure${i}` &&
          drink[0][key] != null &&
          drink[0][key] != ""
        ) {
          measureP.innerHTML += `${drink[0][key]}<br>`;
        }
      }
    }
    let ingP = document.querySelector(".ing-p");
    for (const key of Object.keys(drink[0])) {
      for (let i = 1; i <= 20; i++) {
        if (
          key === `strIngredient${i}` &&
          drink[0][key] != null &&
          drink[0][key] != ""
        ) {
          ingP.innerHTML += `${drink[0][key]}<br>`;
        }
      }
    }
  }
  // End of the popup content for drinks recipes
