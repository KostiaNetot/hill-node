const fs = require('fs');

// Node.js Event Loop understanding 

console.log('START');                                           // 1

setTimeout(() => console.log('setTimeout 1'), 0);               // 6

setImmediate(() => console.log('setImmediate'));

fs.readFile(__filename, () => {
  setTimeout(() => console.log('readFile setTimeout'), 0);      // 10
  setImmediate(() => console.log('readFile setImmediate'));     // 9 
  process.nextTick(() => console.log('readFile Next Tick'));    // 8   
});

Promise.resolve()                                 
  .then(() => {
    console.log('Promise');                                     // 4                                       
    process.nextTick(() => console.log('Promise Next Tick'));   // 5
  });

process.nextTick(() => console.log('Next Tick'));               // 3 

setTimeout(() => console.log('setTimeout 2'), 0);               // 7 

console.log('END');                                             // 2 
