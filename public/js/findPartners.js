

$(function(){$.getScript('js/utils.js');});

const fetchPartnersForm = document.querySelector('#fetch-partners');

fetchPartnersForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const latitude = document.querySelector('input#latitude').value;
  const longitude = document.querySelector('input#longitude').value;
  const range = document.querySelector('input#range').value;
  
  fetch('/partners?relativeLatitude='+latitude+'&relativeLongitude='+longitude+'&range='+range).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        var partnerDetails = $('#partner-details tbody tr').remove();
        var partnersArray = data.partnersArray;
        partnersArray.forEach(partner => {
          appendRowToTable('partner-details', 1, [partner["element"]["organization"], partner["element"]["customerLocations"], partner["element"]["website"]]);  
        });
        
      }
    })
  })
})