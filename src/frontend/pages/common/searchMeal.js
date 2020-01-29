import { renderMealsData } from "./renderDataMealsDB";

const searchMeal = () => {
    
    const search = document.getElementById("search");

    const showSearchedData = () => {

        fetch("/api/meals?title=" + search.value)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                renderData(data);
            });
    }

   // render meals from db
  const renderData = (data) => {
      clearData();
      renderMealsData(data);
  } 

  const clearData = () => {
    const mealsSection = document.getElementById("meals");
    mealsSection.innerHTML = "";
  }

    search.addEventListener("input", (e) => {
        e.preventDefault();
        showSearchedData();
    });
    
    search.addEventListener("keypress", (e) => {
        // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
          e.preventDefault();
          document.getElementById("meals").scrollIntoView({behavior: "smooth"});
          showSearchedData();
        }
      });
      
}

export { searchMeal };