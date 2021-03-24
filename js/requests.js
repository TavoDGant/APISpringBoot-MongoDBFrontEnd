const tabla = document.querySelector("#list-products tbody");

function traerDatos(){
    cleanBody();
    fetch('https://spring-boot-mongo-db.herokuapp.com/allProducts')
    .then(response => response.json())
    .then(products => {
        products.forEach(products => {
            const row = document.createElement('tr');
            var prodName = products.name;
            var prodDesc = products.description;
            row.innerHTML += `
                <td>${prodName.replace(/\b\w/g, l => l.toUpperCase())}</td>
                <td>${prodDesc.replace(/\b\w/g, l => l.toUpperCase())}</td>
                <td>$ ${products.price}</td>
            `;
            tabla.appendChild(row);
        });
    })
}

function cleanBody(){
   var tabClear = document.querySelector("tbody");
   tabClear.innerHTML = "";
}