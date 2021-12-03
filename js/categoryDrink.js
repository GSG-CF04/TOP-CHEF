let catDrink=document.getElementsByClassName('categories-drink')
let catDrinkName=[]
fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
.then(res =>res.json())
.then(
    data =>  {
        let categories=data.drinks
        categories.forEach(ele => {
            catDrinkName.push(`${ele.strCategory}`)     
    })
    console.log(catDrinkName)
    localStorage.setItem('catDrinkName',JSON.stringify(catDrinkName))
 }   
)
.catch(err => alert(err))

let catDrinkNameLocal=JSON.parse(localStorage.getItem("catDrinkName"))
    console.log(catDrinkNameLocal)
    console.log(catDrinkNameLocal.length)
for( let i=0;i<catDrinkNameLocal.length;i++) {
           console.log(catDrinkNameLocal.length)
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catDrinkNameLocal[i]}`)
    .then(res =>res.json())
    .then(
            dataCat =>{
            console.log(catDrinkNameLocal)
            let dataDrink=dataCat.drinks
                for (let x=0;x<1;x++) {
                       catDrink[0].innerHTML +=`<a class="drink-cat" href="../type/typeDrink.html">
                         <div class="category" style="background-image: url(${dataDrink[0].strDrinkThumb})">
                         <div class="overlay">
                           <span>${catDrinkNameLocal[i]}</span>
                         </div>
                       </div>
                       </a>`
                }
                let link=document.querySelectorAll('.drink-cat')
                for (let i=0 ;i<link.length;i++){
                    link[i].addEventListener('click',(e)=>{
                        console.log(link[i].childNodes[1].childNodes[1].childNodes[1])
                        const nameCategory=link[i].childNodes[1].childNodes[1].childNodes[1].textContent
                        localStorage.setItem('catDrink',nameCategory)
                    })
                }

            }
        ) 
    .catch(err => alert(err))               
}