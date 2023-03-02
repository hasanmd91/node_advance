"use strict";

(function () {
  let idField;
  let nameField;
  let siteField;
  let unitPriceField;
  let stockField;
  let messagearea;
  let searchState = true;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    idField = document.getElementById("flowerId");
    nameField = document.getElementById("name");
    siteField = document.getElementById("site");
    unitPriceField = document.getElementById("unitPrice");
    stockField = document.getElementById("stock");
    messagearea = document.getElementById("messagearea");

    updateFields();

    document.getElementById("submit").addEventListener("click", send);

    idField.addEventListener("focus", clearAll);
  }

  function updateMessage(message, type) {
    messagearea.textContent = message;
    messagearea.setAttribute("class", type);
  }

  function clearMessage() {
    messagearea.textContent = "";
    messagearea.removeAttribute("class");
  }

  function clearAll() {
    if (searchState) {
      clearFieldValues();
      clearMessage();
    }
  }

  function updateFields() {
    if (searchState) {
      idField.removeAttribute("readonly");
      nameField.setAttribute("readonly", true);
      siteField.setAttribute("readonly", true);
      unitPriceField.setAttribute("readonly", true);
      stockField.setAttribute("readonly", true);
    } else {
      idField.setAttribute("readonly", true);
      nameField.removeAttribute("readonly");
      siteField.removeAttribute("readonly");
      unitPriceField.removeAttribute("readonly");
      stockField.removeAttribute("readonly");
    }
  } //updateFields end

  function clearFieldValues() {
    idField.value = "";
    nameField.value = "";
    siteField.value = "";
    unitPriceField.value = "";
    stockField.value = "";
    searchState = true;
    updateFields();
  } //end of clearFieldValues

  function updateflower(result) {
    if (result.length === 0) return;
    const flower = result[0];
    idField.value = flower.flowerId;
    nameField.value = flower.name;
    siteField.value = flower.site;
    unitPriceField.value = flower.unitPrice;
    stockField.value = flower.stock;
    searchState = false;
    updateFields();
  }

  async function send() {
    try {
      if (searchState) {
        //get flower
        if (idField.value.trim().length > 0) {
          const data = await fetch(
            `http://localhost:4000/api/flowers/${idField.value}`,
            { mode: "cors" }
          );
          const result = await data.json();
          if (result) {
            if (result.message) {
              updateMessage(result.message, result.type);
            } else {
              updateflower(result);
            }
          }
        }
      } else {
        //put flower
        const flower = {
          flowerId: idField.value,
          name: nameField.value,
          site: siteField.value,
          unitPrice: unitPriceField.value,
          stock: stockField.value,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(flower),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        };

        const data = await fetch(
          `http://localhost:4000/api/flowers/${flower.flowerId}`,
          options
        );

        const status = await data.json();

        if (status.message) {
          updateMessage(status.message, status.type);
        }

        searchState = true;
        updateFields();
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  }
})();
