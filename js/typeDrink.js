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
        <button id="ing" class=" ingr-btn-style">Ingredients</button>
        <button id="rec" class=" recpie-btn">Recpie</button>
      </div>
      </div>
      <div class="content">
      <div class="ing-with-measures">
      <p class="measure-P"></p>
      <p class="ing-p"></p> 
      </div>
  <div class="recpie-text">✎ ${drink[0].strInstructions} ✐</div></div>`;
    let measureP = document.querySelector(".measure-P");
    for (const key of Object.keys(drink[0])) {
      for (let i = 1; i <= 20; i++) {
        if (
          key === `strMeasure${i}` &&
          drink[0][key] != null &&
          drink[0][key] != "" &&
          drink[0][key] != " "

        ) {
          measureP.innerHTML += `• ${drink[0][key]}<br>`;
        }
      }
    }
    let ingP = document.querySelector(".ing-p");
    for (const key of Object.keys(drink[0])) {
      for (let i = 1; i <= 20; i++) {
        if (
        key === `strIngredient${i}` &&
        drink[0][key] != null &&
        drink[0][key] != ""  &&
        drink[0][key] != " "
        ) {
        ingP.innerHTML += `→ ${drink[0][key]}<br>`;
        }
    }
    }
    // selectors for innerhtml elements
    let ingBtn = document.querySelector("#ing");
    let recipeBtn = document.querySelector("#rec");
    let recipeText = document.querySelector(".recpie-text");
    let ingWithMeasures = document.querySelector(".ing-with-measures");
    // Adding Event Listener for ingerdients btn in popup
    ingBtn.addEventListener("click", () => {
    ingWithMeasures.style.display = "flex";
    recipeText.style.display = "none";
    recipeBtn.classList.remove("recpie-btn-style");
    recipeBtn.setAttribute("class", "recpie-btn");
    ingBtn.setAttribute("class", "ingr-btn-style");
    });
    // Adding Event Listener for recipe btn in popup
    recipeBtn.addEventListener("click", () => {
    ingWithMeasures.style.display = "none";
    recipeText.style.display = "block";
    ingBtn.classList.remove("ingr-btn-style");
    ingBtn.setAttribute("class", "ingr-btn");
    recipeBtn.setAttribute("class", "recpie-btn-style");
    });
}
  // End of the popup content for drinks recipes
// close the popup after clicking the close icon
function closePopupWindow() {
    parent.style.display = "none";
}