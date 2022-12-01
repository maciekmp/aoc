const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const array = data.split('\r\n');
  let bigger = 0;
  array.forEach((s, i) => {
    if (i === 0) {
        return;
    }
    const prev = array[i-1];
    if(parseInt(s) > parseInt(prev)) {
        bigger++;
    }
  })
  console.log(bigger);
});