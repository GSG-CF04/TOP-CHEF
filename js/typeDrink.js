/* Start Selectors */ 
const searchBtn = document.querySelector(".btn");
const searchInp = document.querySelector(".search-control");
const holder = document.querySelector(".cards-drink");
let titelCat = document.querySelector(".header-search");
let catName = localStorage.getItem('catDrink');
let parent = document.querySelector(".overlay");
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
