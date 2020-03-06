class FavoritesUI {
  constructor() {
    this.count = 0;
    this.store = {};
    this.container = document.querySelector("#dropdown1");
  }

  set ticketToStore(ticket) {
    if (!FavoritesUI.isUniqueTicket(ticket, this.store)) {
      return;
    }

    this.store = {
      ...this.store,
      [this.count++]: ticket,
    };

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
  }

  removeFavorites() {
    this.store = {};
    this.container.innerHTML = "";
    return true;
  }

  clearUI() {
    this.container.innerHTML = "";
    return true;
  }

  static emptyFavoritesTemplate() {
    return `
      <div class="favorite-item">
        <h4 class="favorite-item-empty">No tickets as favorite.</h4>
      </div>
    `;
  }

  static favoritesTemplate(ticket) {
    return `
      <div class="favorite-item  d-flex align-items-start">
        <img
          src="http://pics.avs.io/200/200/PS.png"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">Харьков </span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">Львов</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">14 Sep 2019 02:30</span>
            <span class="ticket-price ml-auto">$315</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: 1</span>
            <span class="ticket-flight-number">Номер рейса: 26</span>
          </div>
          <a
            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
            >Delete</a
          >
        </div>
      </div>
    `;
  }

  static isUniqueTicket(ticket, store) {
    let isUnique = true;
    Object.values(store).forEach(val => {
      if (
        val.airline_name === ticket.airline_name &&
        val.origin_name === ticket.origin_name &&
        val.destination_name === ticket.destination_name &&
        val.departure_at === ticket.departure_at &&
        val.flight_number === ticket.flight_number
      ) {
        isUnique = false;
        return;
      }
    });
    return isUnique;
  }
}

const favorites = new FavoritesUI();
favorites.renderUI();

export default favorites;
