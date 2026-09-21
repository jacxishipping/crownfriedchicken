const str = "$6.50";
console.log(parseFloat(str));
console.log(parseFloat(str.replace(/[^0-9.-]+/g,"")));
