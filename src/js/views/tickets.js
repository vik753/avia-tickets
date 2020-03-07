import currencyUI from "./currency";
import favorites from "./favorites";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-sections .row");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currencyUI);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";
    const currency = this.getCurrencySymbol();

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);

    //setup Listeners for Favorite Buttons
    const addFavBtns = document.querySelectorAll(".add-favorite");
    addFavBtns.forEach(button => {
      button.addEventListener("click", TicketsUI.addTicketToFavStore);
    });
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static addTicketToFavStore(e) {
    e.preventDefault();
    const btn = e.target;
    const parentTicketCard = btn.parentElement.parentElement;
    const ticket = TicketsUI.getTicketData(parentTicketCard);
    favorites.ticketToStore = ticket;
    btn.classList.remove("red", "accent-2");
    btn.classList.add("green", "accent-4");
    btn.textContent = `In favorites`;
    btn.insertAdjacentHTML(
      "afterbegin",
      ` <i class="material-icons">star_border</i>`
    );
  }

  static getTicketData(parentNode) {
    try {
      const imgEl = parentNode.querySelector("img");
      const airline_nameEl = parentNode.querySelector(".ticket-airline-name");
      const origin_nameEl = parentNode.querySelector(".origin_name");
      const destination_nameEl = parentNode.querySelector(".destination_name");
      const departure_atEl = parentNode.querySelector(".ticket-time-departure");
      const ticket_priceEl = parentNode.querySelector(".ticket-price");
      const transfersEl = parentNode.querySelector(".ticket-transfers");
      const flight_numberEl = parentNode.querySelector(".ticket-flight-number");

      const airline_logo = imgEl ? imgEl.getAttribute("src") || "" : "";
      const airline_name = airline_nameEl.textContent.trim();
      const origin_name = origin_nameEl.textContent.trim();
      const destination_name = destination_nameEl.textContent.trim();
      const departure_at = departure_atEl.textContent.trim();
      const ticket_price = ticket_priceEl.textContent.trim();
      const transfers = transfersEl.textContent.trim();
      const flight_number = flight_numberEl.textContent.trim();

      return {
        airline_logo,
        airline_name,
        origin_name,
        destination_name,
        departure_at,
        ticket_price,
        transfers,
        flight_number,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">
        По вашему запросу билетов не найдено.
      </div>
    `;
  }

  static ticketTemplate(ticket, currencySymbol) {
    // console.log(currencySymbol);
    return `
      <div class="col s12 m6">
        <div class="card ticket-card">
          <div class="d-flex align-items-center justify-items-right">
            <button class="d-flex align-items-center red accent-2 add-favorite">
              <i class="material-icons">star_border</i>
              Add to favorite
            </button>
          </div>
          <div class="ticket-airline d-flex align-items-center">
            <img
              src="${ticket.airline_logo}"
              class="ticket-airline-img"
            />
            <span class="ticket-airline-name">
              ${ticket.airline_name}
            </span>
          </div>
          <div class="ticket-destination d-flex align-items-center">
            <div class="d-flex align-items-center mr-auto">
              <span class="ticket-city origin_name">${ticket.origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="ticket-city destination_name">${ticket.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-price ml-auto">${currencySymbol}${ticket.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
          </div>
        </div>
      </div>
    `;
  }
}

const ticketsUi = new TicketsUI(currencyUI);

export default ticketsUi;
