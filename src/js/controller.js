import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

//* Polyfill for async/await and other ES6 features
import "core-js/stable";
import "regenerator-runtime/runtime";

//* Manual HMR
/* if (import.meta.hot) {
  import.meta.hot.accept();
} */

// https://forkify-api.herokuapp.com/v2 //* API Documentation

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrror();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get and search query
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
