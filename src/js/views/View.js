export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkupIngredient(ing) {
    return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderErrror(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="src/img/icons.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
