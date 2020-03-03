import {
  getAutocompleteInstance,
  getDatePickerInstance,
} from "../plugins/materialize";

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this._form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.originalAutocomplete = autocompleteInstance(this.origin);
    this.destination = document.getElementById("autocomplete-destination");
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.depart = datePickerInstance(
      document.getElementById("datepicker-depart")
    );
    this.return = datePickerInstance(
      document.getElementById("datepicker-return")
    );
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.depart.toString();
  }

  get returnDateValue() {
    return this.return.toString();
  }

  setAutocompleteData(data) {
    this.originalAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
