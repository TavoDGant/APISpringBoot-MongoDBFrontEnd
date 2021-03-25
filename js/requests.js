const tabla = document.querySelector("#list-products tbody");
const allTable = document.getElementById("list-products");
const notFound = document.getElementById("message");

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
            getProducts(products);
    })
}

function searchProducts(){
    const search = document.getElementById("search-products").value;
    if(search!=''){
        cleanBody();
        fetch('https://spring-boot-mongo-db.herokuapp.com/searchProducts/'+search)
        .then(response => response.json())
        .then(products => {
                getProducts(products);
    })
    } else{
        traerDatos();
    }
}

function getProducts(data){
        data.forEach(products => {
        const row = document.createElement('tr');
        var prodId = products.id;
        var prodName = products.name;
        var prodDesc = products.description;
        var prodPrice = products.price;
        row.innerHTML += `
            <td>${prodName.replace(/\b\w/g, l => l.toUpperCase())}</td>
            <td>${prodDesc.replace(/\b\w/g, l => l.toUpperCase())}</td>
            <td>$ ${products.price}</td>
            <td><a href="updateProduct.html" class="btn btn-secondary">Edit</a></td>
        `;
        tabla.appendChild(row);
    });
}

function cleanBody(){
    var tabClear = document.querySelector("tbody");
    tabClear.innerHTML = "";
}

traerDatos();
