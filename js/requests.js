const tabla = document.querySelector("#list-products tbody");

document.getElementById("search-products").onkeypress = function(event){
    if (event.keyCode == 13 || event.which == 13){
        searchProducts();
    }
};

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
                <td><button href="#" class="btn btn-secondary">Edit</button></td>
            `;
            tabla.appendChild(row);
        });
    })
}

function cleanBody(){
   var tabClear = document.querySelector("tbody");
   tabClear.innerHTML = "";
}

function searchProducts(){
    const search = document.getElementById("search-products").value;
    if(search!=''){
        cleanBody();
        fetch('https://spring-boot-mongo-db.herokuapp.com/searchProducts/'+search)
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
                <td><button href="#" class="btn btn-secondary">Edit</button></td>
            `;
            tabla.appendChild(row);
        });
    })
    } else{
        traerDatos();
    }
    
}

traerDatos();