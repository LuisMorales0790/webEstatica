var productList = [];
var idrow = 0;
var subtotal = 0;
$(document).ready(function () {

    impTabla();

    $("#btn-agregar").click(function (event) {
        event.preventDefault();
        saveProduct();
    });
});

function saveProduct() {
    let nombre = $("#txt-nombre").val();
    let precio = $("#txt-precio").val();
    let cantidad = $("#txt-cantidad").val();
    addProduct(idrow, nombre, precio, cantidad);
    impTabla();
    idrow ++;
}

function addProduct(idrow, nombre, precio, cantidad){  
    var total = precio * cantidad;   
    var newProduct ={
        id:idrow,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        total: total
    };
    console.log(newProduct);
    productList.push(newProduct); 
    totales();
}

function getProductList(){
    return productList;
}

function impTabla(){
    let list = getProductList();  
    console.log("La lista es: " + list)
    tbody = document.querySelector('#tableLista tbody');

    tbody.innerHTML = '';
    for(var i = 0; i < list.length; i++){
        var botones = '<button title="cantidad" id="btn-cantidad" onclick="cantidadUpdate(' + list[i].id + ');" class="btn btn-warning btn-sm">Cantidad</button><button title="eliminar" id="btn-eliminar" onclick="EliminarProducto(' + list[i].id + ');" class="btn btn-danger btn-sm" style="margin: 10px">Eliminar</button>';
        var row = tbody.insertRow(i);
        row.setAttribute("id", 'row'+list[i].id);
        nombreCell = row.insertCell(0);
        precioCell = row.insertCell(1);
        cantidadCell = row.insertCell(2);
        totalCell = row.insertCell(3);
        accionesCell = row.insertCell(4);

        nombreCell.innerHTML = list[i].nombre;
        precioCell.innerHTML = list[i].precio;
        cantidadCell.innerHTML = list[i].cantidad;
        totalCell.innerHTML = list[i].total;
        accionesCell.innerHTML = botones;
        tbody.appendChild(row);
    }
}

function EliminarProducto(row){
    //remover la fila de la tabla
    $("#row"+row).remove();
    //elimina fila del arreglo
    productList.splice(productList.indexOf(row),1);
    console.log(getProductList());
    totales();
}

function cantidadUpdate(row){
    let list = getProductList();  
    var cantA = list[row].cantidad;
    var totA = list[row].total;
    var canti = parseFloat(prompt("Nueva Cantidad"));
    var filaid = document.getElementById("row"+row) //obtengo la fila
    celda = filaid.getElementsByTagName('td'); //obtengo los td o las celdas
    if(isNaN(canti)){     
        celda[2].innerHTML = cantA;
        celda[3].innerHTML = totA;
    }else{
        list[row].cantidad = canti;
        list[row].total = list[row].cantidad*list[row].precio;
        celda[2].innerHTML = canti;
        celda[3].innerHTML = list[row].total;
        totales();
    }
    
    // for (var i = 0; i < list.length; i++) {      
    //         console.log(list[i])           
    //  }
    
}

function totales(){
    let list = getProductList();
    var tot = 0;
    for (var i = 0; i < list.length; i++) {      
           tot = tot + list[i].total;    
     }
     document.getElementById("total").innerHTML="Total: "+tot;
}





    
