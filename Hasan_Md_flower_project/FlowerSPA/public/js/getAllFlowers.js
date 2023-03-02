"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      const data = await fetch("http://localhost:4000/api/flowers", {
        mode: "cors",
      });
      const flowers = await data.json();

      const resultset = document.getElementById("resultset");
      for (const flower of flowers) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(flower.flowerId));
        tr.appendChild(createCell(flower.name));
        tr.appendChild(createCell(flower.site));
        tr.appendChild(createCell(flower.unitPrice));
        tr.appendChild(createCell(flower.stock));
        resultset.appendChild(tr);
      }
    } catch (error) {
      document.getElementById("messagearea").innerHTML = `
            <p class="error">${error.message}</p>`;
    }
  } //end of init

  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
