const sortArrayDesc = (array, key) =>{
  array.sort((a, b) => {
    console.log(key);
    var x = a['element'][key]; 
    var y = b['element'][key];
    console.log(a);
    console.log(b);
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
  return array
}

module.exports = {sortArrayDesc}