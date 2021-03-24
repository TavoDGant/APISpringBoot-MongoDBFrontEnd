function traerDatos(){
    fetch('https://spring-boot-mongo-db.herokuapp.com/allProducts')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        recorrer(data);
    })
}

function recorrer(dat){
    for (let i = 0; i < dat.length; i++) {
        console.log(dat[i]);
    }
}