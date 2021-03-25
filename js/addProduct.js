function addProduct(){
    const url = 'https://spring-boot-mongo-db.herokuapp.com/saveProduct';
    
    var data = { name: document.getElementById("nameProduct").value,
                 description: document.getElementById("descriptionProduct").value,
                 price: document.getElementById("priceProduct").value
                };

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(cleanForm());
    /*  .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
      
*/
}

function cleanForm(){
    document.getElementById("nameProduct").value="";
    document.getElementById("descriptionProduct").value = "";
    document.getElementById("priceProduct").value = "";
    alert("Saved");
}
