import { renderMealsData } from "./renderDataMealsDB";

const fetchMeals = () => {
    
    fetch("/api/meals")
        .then(response => response.json())
        .then(data => {
            renderData(data);
        });

  // render all meals from db
  const renderData = (data) => {
    const root = document.getElementById("root");
    const mealsSection = document.createElement("section");
    root.append(mealsSection);
    mealsSection.className = "meals";
    mealsSection.id = "meals";
    renderMealsData(data);
  } 
}

export { fetchMeals };