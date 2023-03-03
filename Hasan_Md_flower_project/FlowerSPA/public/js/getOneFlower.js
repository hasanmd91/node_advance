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
    <table>
      <tr>
        <td><span class="legend">Id</span></td>
        <td>${flower.flowerId}</td>
      </tr>
      <tr>
        <td><span class="legend">Name</span></td>
        <td>${flower.name}</td>
      </tr>
      <tr>
        <td><span class="legend">Type</span></td>
        <td>${flower.site}</td>
      </tr>
      <tr>
        <td><span class="legend">Processor</span></td>
        <td>${flower.unitPrice}</td>
      </tr>
      <tr>
        <td><span class="legend">Amount</span></td>
        <td>${flower.stock}</td>
      </tr>
    </table>
  `;
  }
})();
