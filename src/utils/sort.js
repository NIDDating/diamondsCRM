const sort = function(a, b){
  if(a.firstname < b.firstname) { return -1; }
  if(a.firstname > b.firstname) { return 1; }
  return 0;
}

export default sort;