class FavoritesUI {
  constructor() {
    this.count = 0;
    this.store = {};
  }

  set ticketToStore(ticket) {
    if (!FavoritesUI.isUniqueTicket(ticket, this.store)) {
      return;
    }

    this.store = {
      ...this.store,
      [this.count++]: ticket,
    };
    console.log(this.store)
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

export default favorites;
