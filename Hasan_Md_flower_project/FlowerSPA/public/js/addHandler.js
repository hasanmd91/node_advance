"use strict";

(function () {
  let flowerIdField;
  let nameField;
  let siteField;
  let unitPriceField;
  let stockField;
  let messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    flowerIdField = document.getElementById("flowerId");
    nameField = document.getElementById("name");
    siteField = document.getElementById("site");
    unitPriceField = document.getElementById("unitPrice");
    stockField = document.getElementById("stock");
    messagearea = document.getElementById("messagearea");

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    const flower = {
      flowerId: +flowerIdField.value,
      name: nameField.value,
      site: siteField.value,
      unitPrice: +unitPriceField.value,
      stock: +stockField.value,
    };

    console.log(flower);

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(flower),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      };

      const data = await fetch("http://localhost:4000/api/flowers", options);
      const status = await data.json();
      console.log(status);

      if (status.message) {
        updateMessage(status.message, status.type);
      }
    } catch (error) {
      updateMessage(error.message, "error");
    }
  }

  function updateMessage(message, type) {
    messagearea.textContent = message;
    messagearea.setAttribute("class", type);
  }

  function clearMessage() {
    messagearea.textContent = "";
    messagearea.removeAttribute("class");
  }
})();
