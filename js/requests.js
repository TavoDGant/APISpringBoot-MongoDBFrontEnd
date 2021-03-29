/*-------------MODALS*---------------------*/
var modalUpdate = document.getElementById("myModalUpdate");
var modalAdd = document.getElementById("myModalAdd");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const tabla = document.querySelector("#list-products tbody");
const allTable = document.getElementById("list-products");
const notFound = document.getElementById("message");

document.getElementById("search-products").onkeypress = function (event) {
    if (event.keyCode == 13 || event.which == 13) {
        searchProducts();
    }
};

function traerDatos() {
    cleanBody();
    fetch('https://spring-boot-mongo-db.herokuapp.com/allProducts')
        .then(response => response.json())
        .then(products => {
            getProducts(products);
        })
}

function searchProducts() {
    const search = document.getElementById("search-products").value;
    if (search != '') {
        cleanBody();
        fetch('https://spring-boot-mongo-db.herokuapp.com/searchProducts/' + search)
            .then(response => response.json())
            .then(products => {
                getProducts(products);
            })
    } else {
        traerDatos();
    }
}

function getProducts(data) {
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
            <td><button class="btn btn-success" onclick="updateProductModel('${prodId}','${prodName}','${prodDesc}','${prodPrice}')">Edit</button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct('${prodId}')">Delete</button></td>
        `;
        tabla.appendChild(row);
    });
}

function cleanBody() {
    var tabClear = document.querySelector("tbody");
    tabClear.innerHTML = "";
}

async function deleteProduct(id) {
    await fetch('https://spring-boot-mongo-db.herokuapp.com/deleteProduct/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => res.text()) // or res.json()
        .then(res => {
            alert("Deleted");
            traerDatos();
        });
}

function editProduct() {
    const url = 'https://spring-boot-mongo-db.herokuapp.com/updateProduct';

    var data = {
        id: document.getElementById("noId").value,
        name: document.getElementById("updateNameProduct").value,
        description: document.getElementById("updateDescriptionProduct").value,
        price: document.getElementById("updatePriceProduct").value
    };

    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(cleanForm());
}

function addProduct() {
    const url = 'https://spring-boot-mongo-db.herokuapp.com/saveProduct';

    var data = {
        name: document.getElementById("addNameProduct").value,
        description: document.getElementById("addDescriptionProduct").value,
        price: document.getElementById("addPriceProduct").value
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

function cleanForm() {
    document.getElementById("addNameProduct").value = "";
    document.getElementById("addDescriptionProduct").value = "";
    document.getElementById("addPriceProduct").value = "";
    alert("Saved");
    closeModal();
    traerDatos();
}

traerDatos();

/*-------------MODALS*---------------------*/
// When the user clicks the button, open the modal 
function updateProductModel(id, name, description, price) {
    document.getElementById("noId").value = id;
    document.getElementById("updateNameProduct").value = name;
    document.getElementById("updateDescriptionProduct").value = description;
    document.getElementById("updatePriceProduct").value = price;
    modalUpdate.style.display = "block";
}

function closeModal() {
    modalUpdate.style.display = "none";
    modalAdd.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalUpdate) {
        modalUpdate.style.display = "none";
    }
}

//------------------------------------------------
function addProductModel() {
    modalAdd.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalAdd) {
        modalAdd.style.display = "none";
    }
}