class FavoritesUI {
  constructor() {
    this.store = {};
    this.container = document.querySelector("#dropdown1");
  }

  set ticketToStore(ticket) {
    if (!FavoritesUI.isUniqueTicket(ticket, this.store)) {
      return;
    }

    this.store = {
      ...this.store,
      [ticket.id]: ticket,
    };
    // console.log(this.store)
    this.renderUI();
  }

  renderUI() {
    this.clearUI();

    const values = Object.values(this.store);
    if (values.length === 0) {
      this.container.insertAdjacentHTML(
        "afterbegin",
        FavoritesUI.emptyFavoritesTemplate()
      );
      return;
    }

    let fragment = "";
    Object.values(this.store).forEach(ticket => {
      fragment += FavoritesUI.favoritesTemplate(ticket);
    });
    this.container.insertAdjacentHTML("afterbegin", fragment);
    this.setDeleteEventListener();
  }

  removeFavoriteFromStore(id) {
    // console.log(this.store);
    delete this.store[id];
    return Object.keys(this.store).length;
  }

  clearUI() {
    this.container.innerHTML = "";
    return true;
  }

  deleteFavItem(e) {
    const favoritItem = e.target.parentNode.parentNode;
    const id = favoritItem.dataset.id;

    if (e.target.classList.contains("delete-favorite")) {
      const storLength = this.removeFavoriteFromStore(id);
      favoritItem.parentNode.removeChild(favoritItem);

      if (storLength === 0) {
        this.setEmptyUITemplate();
      }

      // restore add-favorite-button
      const favBtn = document.querySelector(
        `[data-ticketid="${id}"] button.add-favorite`
      );
      if (!favBtn) return true;

      favBtn.classList.remove("green", "accent-4");
      favBtn.classList.add("red", "accent-2");
      favBtn.textContent = `Add to favorite`;
      favBtn.insertAdjacentHTML(
        "afterbegin",
        ` <i class="material-icons">star_border</i>`
      );
      favBtn.removeAttribute("disabled");
      return true;
    }
  }

  setDeleteEventListener() {
    const favoritesElements = document.querySelectorAll(".favorite-item");
    favoritesElements.forEach(el => {
      el.addEventListener("click", e => {
        this.deleteFavItem(e);
      });
    });
  }

  setEmptyUITemplate() {
    this.container.insertAdjacentHTML(
      "afterbegin",
      FavoritesUI.emptyFavoritesTemplate()
    );
  }

  static emptyFavoritesTemplate() {
    return `
      <div class="favorite-item">
        <h4 class="favorite-item-empty">No tickets as favorite.</h4>
      </div>
    `;
  }

  static isUniqueTicket(ticket, store) {
    let isUnique = true;
    Object.values(store).forEach(val => {
      if (val.id === ticket.id) {
        isUnique = false;
        return;
      }
    });
    return isUnique;
  }

  static favoritesTemplate(ticket) {
    /* ticket
     * airline_logo: "http://pics.avs.io/200/200/7W.png"
     * airline_name: "Windrose Airlines"
     * origin_name: "Одесса"
     * destination_name: "Киев"
     * departure_at: "08 Mar 2020 06:50"
     * ticket_price: "$187"
     * transfers: "Пересадок: 0"
     * flight_number: "Номер рейса: 9024"
     */
    return `
      <div
      class="favorite-item  d-flex align-items-start"
      data-id="${ticket.airline_name}-${ticket.origin_name}-${ticket.destination_name}-${ticket.departure_at}-${ticket.flight_number}"
      >
        <img
          src="${ticket.airline_logo}"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <span class="airline-name"><b>${ticket.airline_name}</b></span>
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${ticket.origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${ticket.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-price ml-auto">${ticket.ticket_price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">${ticket.transfers}</span>
            <span class="ticket-flight-number">${ticket.flight_number}</span>
          </div>
          <a
            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
            >Delete</a
          >
        </div>
      </div>
    `;
  }
}

const favorites = new FavoritesUI();
favorites.renderUI();

export default favorites;
