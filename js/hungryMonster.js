let meals = document.getElementById("meals");
let singleMeal = document.getElementById("single_meal");

document.getElementById('search-btn').addEventListener('click', searchClick =>{

    let searchValue = document.getElementById('search-meal-input');
    //console.log(searchValue.value);
    meals.innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue.value}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        
        for(let i = 0; i < data.meals.length; i++){
            const meal = data.meals[i];

            let html2 =`
            <div class="card" style="width:100%">
                <img class="card-img-top" src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%">
                <div class="card-body">
                <h4 class="card-title text-center">${meal.strMeal}</h4>
                </div>
            </div>
            `;
           // console.log(meals);
            //console.log(mealInfo)
            let sec = document.createElement("div")
            sec.innerHTML = html2;
            sec.setAttribute("id", meal.idMeal);
            //sec.setAttribute("onclick",`displayMeals(${meal.idMeal})`)
            sec.setAttribute("class", "col-md-3 mb-5 m-auto")
            sec.addEventListener("click",()=>{
                console.log(meal)
                let mealInfo = `
                <div class="row bg-light border border-secondary rounded" style="--bs-gutter-x: 0;">
                    <div class="col-md-4 " style="">
                        <img class="img-top" src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%">
                        </div>
                        <div class="col-md-8" style="padding-left: 15px; padding-top: 10px">
                        <h4 class="card-title">${meal.strMeal}</h4>
                        <b>Ingredients:</b>
                        <ul>`;
                    for(let i = 1; i <= 10; i++){
                        let str = "strIngredient"+i;
                        if( meal[str] == "" ) break;
                        mealInfo += `<li>`;
                        mealInfo += meal[str]
                        mealInfo + ` </li>`
                    }
                        
                mealInfo += `  
                        </ul>
                        
                    </div>
                    </div>
                `;
                singleMeal.innerHTML = mealInfo;

            })
            meals.appendChild(sec);

        }
    });
    
    function displayMeals(mealID){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }
})
