import { fetchMeals } from "./common/fetchMeals";
import { renderHero } from "./common/renderHeroHome";
import { searchMeal } from "./common/searchMeal";
import { renderSearch } from "./common/renderSearch";
import { renderNav } from "./common/renderNav";

function homeRouter(req, router) {
  renderNav();
  renderHero();
  fetchMeals();
  renderSearch();
  searchMeal();
}

export default homeRouter;
