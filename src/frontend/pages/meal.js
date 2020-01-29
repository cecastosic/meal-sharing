import { fetchMealWithId } from "./common/fetchMealWithId";
import { reservationForm } from "./common/reservationForm";
import { renderNav } from "./common/renderNav";
import { fetchReviews } from "./common/fetchReviews";

function mealsId(req, router) {
  renderNav();
  fetchMealWithId(req.param.id);
  reservationForm(req.param.id);
  setTimeout(() => fetchReviews(req.param.id), 1000);
}

export default mealsId;
