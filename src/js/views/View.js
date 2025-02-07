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

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrror();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    //* minor algo to update only the changed parts of DOM instead of re-rendering completely
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Updated TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Updated ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
