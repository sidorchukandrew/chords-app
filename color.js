const colors = ['#fafafa', '#18181b'];

function toRGBA(hex) {
  let rHex = `${hex[1]}${hex[2]}`;
  let gHex = `${hex[3]}${hex[4]}`;
  let bHex = `${hex[5]}${hex[6]}`;

  let r = parseInt(rHex, 16);
  let g = parseInt(gHex, 16);
  let b = parseInt(bHex, 16);

  return `rgba(${r}, ${g}, ${b}, 1)`;
}

let converted = colors.map(toRGBA);

let joined = converted.join('","');

console.log('"' + joined + '"');
