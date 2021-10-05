// VARIABLES 
let separator = "-".repeat(70);
let listaProductos = [];
let resumenCompra = [];
// PRODUCTOS
let priceProd1 = 100.00;
let priceProd2 = 90.00;
let priceProd3 = 80.50;
let priceProd4 = 70.50;
let priceProd5 = 60.50;
// ARRAYS
let arrayPrecios = [100.00, 90.00, 80.5, 70.5, 60.5];
let arrayProductos = ["Zapatillas deportivas", "Accesorio de Computadora", "Audifonos", "Ropa", "Olla electrica"];
let arrayMarcas = ["Adidas", "Rayzer", "Sony", "DG", "Record"];
// PORCENTAJE AL PAGAR EN CUOTAS
let porcentajeCuotas = 5;
// PORCENTAJE DE IMPUESTO A LAS VENTAS
let valorImpuestoVentas = 18;
// PORCENTAJE Y TICKET DE DESCUENTO
let ticketDescuento = "TICKET123";
let valorTicketDescuento = 10;
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// CLASES
class Producto{
    constructor(prodCodigo, prodNombre, prodMarca, prodDescripcion, prodPrecio){
        this.prodCodigo = prodCodigo;
        this.prodNombre = prodNombre;
        this.prodMarca = prodMarca;
        this.prodDescripcion = prodDescripcion;
        this.prodPrecio = prodPrecio;
    }
    formatPrecio(){
        this.prodPrecio = parseFloat(this.prodPrecio).toFixed(2);
    }
}
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
function mostrarProductos(){
    console.log("DETALLE DE COMPRA")
    console.log(separator);
    for(i = 0; i <= arrayProductos.length - 1; i++){
        let prodCodigo = i.toString().padStart(10, '0');
        let prodNombre = arrayProductos[i].toString();
        let prodMarca = arrayMarcas[i].toString();
        let prodDescripcion = "Descripcion de " + arrayProductos[i].toString();
        let prodPrecio = arrayPrecios[i].toString();
        let produto = new Producto(prodCodigo,prodNombre, prodMarca, prodDescripcion, prodPrecio);
        produto.formatPrecio();
        listaProductos.push(produto);
        console.log((i + 1) + ". " + listaProductos[i].prodNombre.padEnd(35, ' ')  + listaProductos[i].prodMarca.padEnd(20, ' ') + listaProductos[i].prodPrecio);
    }
    console.log(separator);
}
function CalcularSubTotal(priceProd1, priceProd2, priceProd3, priceProd4, priceProd5){
    let subTotal = 0;//(parseFloat(priceProd1) + parseFloat(priceProd2) + parseFloat(priceProd3) + parseFloat(priceProd4) + parseFloat(priceProd5)).toFixed(2);
    for(i = 0; i <= listaProductos.length - 1; i++){
        subTotal = (parseFloat(subTotal) + parseFloat(listaProductos[i].prodPrecio));
    }
    return subTotal.toFixed(2);
}
function AgregarImpuesto(subTotal){
    let totalImpuesto = (((subTotal * (valorImpuestoVentas / 100)))).toFixed(2);
    return totalImpuesto;
}
function AplicarDescuento(total){
    let totalDescuento = (((total * (valorTicketDescuento / 100)))).toFixed(2);
    return totalDescuento;
}
function PagoCuotas(total, numeroCuotas){
    let totalInteres = (((total * (porcentajeCuotas / 100)) + parseFloat(total))).toFixed(2);
    let valorCuota = (totalInteres / numeroCuotas).toFixed(2);
    return valorCuota;
}
function ResumenCompra(){
    let pagarCuotas = 0;
    let ticketDescuento = "ERROR";
    let subTotalVenta = -1;
    let totalImpuesto = -1;
    let totalVenta = -1;
    // LISTA DE PRODUCTOS SELECCIONADOS ---- ---- ---- ---- ---- ----
    mostrarProductos();
    // SUMA DE PRECIOS ---- ---- ---- ---- ---- ---- ---- ---- ----
    subTotalVenta = CalcularSubTotal();
    console.log(`Subtotal: ${subTotalVenta.toString().padStart((54), ' ')}`);
    // IMPUESTO ---- ---- ---- ---- ---- ---- ---- ---- ----
    totalImpuesto = AgregarImpuesto(subTotalVenta);
    totalVenta = (parseFloat(totalImpuesto) + parseFloat(subTotalVenta));
    console.log(`Total Impuesto x Venta: ${totalImpuesto.toString().padStart((54 - 15), ' ')}`)    
    console.log(`Total Venta: ${totalVenta.toString().padStart((54 - 3), ' ')}`)
    // TICKET DESCUENTO ---- ---- ---- ---- ---- ---- ---- ---- ----
    console.log(separator);
    if(confirm("¿Tiene Ticket descuento?")){
        let ticketDescuento = prompt("Ingrese el ticket de descuento","TICKET123");
        if(ticketDescuento == "TICKET123"){
            totalDescuento = AplicarDescuento(totalVenta);
            totalVenta = (parseFloat(totalVenta) - parseFloat(totalDescuento));
            console.log(`Total descuento: ${totalDescuento.toString().padStart((54 - 8), ' ')}`);
            console.log(`Total Venta -descuento (${valorTicketDescuento + "% OFF"}): ${totalVenta.toString().padStart((54-24), ' ')}`)
            console.log(separator);
        }
    }
    // PAGAR EN CUOTAS ---- ---- ---- ---- ---- ---- ---- ---- ----
    if(confirm("¿Pagar en Cuotas?")){
        pagarCuotas = prompt("Ingrese el numero de cuotas");
        if(Number(pagarCuotas) > 0){
            let valorCuota = PagoCuotas(totalVenta, pagarCuotas)
            console.log(`Cuotas (+ ${porcentajeCuotas + "%"}): ${pagarCuotas}`)
            console.log(`Valor de cuotas mensual: ${valorCuota.toString().padStart((54-15), ' ')}`);
            console.log(separator);
        }
    }
    // 
}

