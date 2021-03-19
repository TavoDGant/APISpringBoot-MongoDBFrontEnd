function traerDatos(){
    fetch('https://spring-boot-mongo-db.herokuapp.com/allProducts')
    .then(response => response.json())
    .then(json => console.log(json))

}