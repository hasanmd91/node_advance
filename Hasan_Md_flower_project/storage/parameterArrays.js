"use strict";

//insert into flower (id, name, site, unitPrice, stock)
const toInsertArray = (flower) => [
  +flower.flowerId,
  flower.name,
  flower.site,
  +flower.unitPrice,
  +flower.stock,
];

//update flower set name=?, site=?, unitPrice=?, stock=?",
// "where flowerId=?"

const toUpdateArray = (flower) => [
  flower.name,
  flower.site,
  +flower.unitPrice,
  +flower.stock,
  +flower.flowerId,
];

module.exports = { toInsertArray, toUpdateArray };
