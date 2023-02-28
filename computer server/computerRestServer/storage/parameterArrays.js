'use strict';

//insert into computer (id, name, type, processor, amount)
const toInsertArray=computer=>[
    +computer.id, computer.name, computer.type, 
    computer.processor, +computer.amount
];

//update computer set name=?, type=?, processor=?, amount=?",
// "where id=?"

const toUpdateArray = computer => [
    computer.name, computer.type, computer.processor,
    +computer.amount, +computer.id
];

module.exports={toInsertArray, toUpdateArray}