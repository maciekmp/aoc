const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const array = data.split('\r\n').map(value => parseInt(value));
  let bigger = 0;
  array.forEach((s, i) => {
    if (i === 0) {
        return;
    }
    if (i === 1) {
        return;
    }
    if (i === 2) {
        return;
    }
    const A = array[i-1] + array[i-2] + array[i-3];
    const B = array[i] + array[i-1] + array[i-2];
    if(B > A) {
        bigger++;
    }
  })
  console.log(bigger);
});