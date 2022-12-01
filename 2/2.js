const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const array = data.split('\r\n');
  let pos = 0;
  let depth = 0;
  let aim = 0;
  array.forEach((s, i) => {
    const [command, value] = s.split(' ');
    const v = parseInt(value);
    if (command === 'forward') {
      pos += v;
      depth += aim * v;
    }
    if (command === 'down') {
      aim += v
    }
    if (command === 'up') {
      aim -= v;
    }
  })
  console.log(pos, depth, pos * depth);
});