import { fetchMeals } from "./common/fetchMeals";
import { searchMeal } from "./common/searchMeal";
import { renderSearch } from "./common/renderSearch";
import { renderNav } from "./common/renderNav";
import { renderHeroMeals } from "./common/renderHeroMeals";

function mealsRouter(req, router) {
    renderNav();
    renderHeroMeals();
    fetchMeals();
    renderSearch();
    searchMeal();
}
  
  export default mealsRouter;
  