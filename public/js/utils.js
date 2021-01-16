function appendRowToTable(tableId, rowId, arr){
    var table = $('#'+tableId).find('tbody');
    var row;
    for(var i=0; i<arr.length; i++){
      row = row+'<td>'+arr[i]+'</td>';
    }
    table.append('<tr id='+JSON.stringify(rowId)+' >'+row+'</tr>');
}
