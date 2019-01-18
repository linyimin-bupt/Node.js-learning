const xah_obj_to_map = ( obj => {
  const mp = new Map;
  Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
  return mp;
});

// --------------------------------------------------
// test

const ob = {"a":2, "b":9, "c":4};
console.log ( xah_obj_to_map ( ob ) );
// Map { 'a' => 2, 'b' => 9, 'c' => 4 }

const xah_map_to_obj = ( aMap => {
  const obj = {};
  aMap.forEach ((v,k) => { obj[k] = v });
  return obj;
});

// --------------------------------------------------
// test
const mm = new Map([["a", 1], ["b", 2], ["c", 3]]);
console.log ( xah_map_to_obj (mm) );
// { a: 1, b: 2, c: 3 }