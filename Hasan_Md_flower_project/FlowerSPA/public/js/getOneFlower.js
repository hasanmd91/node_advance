"use strict";

(function () {
  let resultarea;
  let messagearea;
  let flowerId;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    flowerId = document.getElementById("flowerId");
    messagearea = document.getElementById("messagearea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    resultarea.innerHTML = "";
    try {
      if (flowerId.value.trim().length > 0) {
        const data = await fetch(
          `http://localhost:4000/api/flowers/${flowerId.value}`,
          { mode: "cors" }
        );
        const result = await data.json();
        console.log(result);
        if (result) {
          if (result.message) {
            updateMessage(result.message, result.type);
          } else {
            updateflower(result);
          }
        }
      }
    } catch (error) {
      updateMessage(`Not found. ${error.message}`, "error");
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

  function updateflower(result) {
    if (result.length === 0) return;
    const flower = result[0];
    console.log(flower);
    resultarea.innerHTML = `
        <p><span class="legend">Id</span> ${flower.flowerId}</p>
        <p><span class="legend">Name</span> ${flower.name}</p>
        <p><span class="legend">Type</span> ${flower.site}</p>
        <p><span class="legend">Processor</span> ${flower.unitPrice}</p>
        <p><span class="legend">Amount</span> ${flower.stock}</p>
        `;
  }
})();
