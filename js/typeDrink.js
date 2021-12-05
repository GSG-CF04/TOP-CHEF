/* Start Selectors */ 
const searchBtn = document.querySelector(".btn");
const searchInp = document.querySelector(".search-control");
const holder = document.querySelector(".cards-drink");
let titelCat = document.querySelector(".header-search");
let catName = localStorage.getItem('catDrink');
/* End Selectors */
/* Start Event Listener */
titelCat.innerHTML= `<h2>${catName} Category</h2>`;
let final = [];
searchInp.addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    let filterd = final.drinks.filter((ch) => {
        return ch.strDrink.toUpperCase().includes(searchString.toUpperCase());
    });
    if(e.key ==="Enter"){searchInp.value=""}
    showMeals(filterd);
});
/* End Event Listener */
/* Start Function */ 
const loadCh = async () => {
    try {
    let res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catName}`
    );
    final = await res.json();
        let arr  = final.drinks;
    showMeals(arr);
    } catch (err) {
    console.log(err);
    }
};
loadCh();
const showMeals = (ch) => {
    const htmlDiv = ch
    .map((ch) => {
        return `<div class="card">
            <img src="${ch.strDrinkThumb}" alt="food">
            <p>${ch.strDrink}</p>
            <button class="get-recipe">Get Recipe</button>
        </div>`;
    })
    .join("");
    holder.innerHTML = htmlDiv;
};
/* End Function */ 