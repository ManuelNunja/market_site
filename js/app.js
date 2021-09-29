// Variables
let separator = "-".repeat(50);
// Productos
let priceProd1 = 100.00;
let priceProd2 = 90.00;
let priceProd3 = 80.50;
let priceProd4 = 70.50;
let priceProd5 = 60.50;
let arrayProductos = ["Zapatillas deportivas", "Accesorio de Computadora", "Audifonos", "Ropa", "Olla electrica"];
// Porcentaje al pagar en cuotas
let porcentajeCuotas = 5;
// Porcentaje de Impuesto a las Ventas
let valorImpuestoVentas = 18;
// Porcentaje y ticket de descuento
let ticketDescuento = "TICKET123";
let valorTicketDescuento = 10;

function listaProductos(){
    console.log("DETALLE DE COMPRA")
    console.log(separator);
    for(i = 0; i <= arrayProductos.length - 1; i++){
        console.log((i + 1) + ". " + arrayProductos[i]);
    }
    console.log(separator);
}

function CalcularSubTotal(priceProd1, priceProd2, priceProd3, priceProd4, priceProd5){
    let subTotal = (parseFloat(priceProd1) + parseFloat(priceProd2) + parseFloat(priceProd3) + parseFloat(priceProd4) + parseFloat(priceProd5)).toFixed(2);
    console.log(`Subtotal: ${subTotal}`);
    return subTotal;
}

function AgregarImpuesto(subTotal){
    let totalImpuesto = (((subTotal * (valorImpuestoVentas / 100)))).toFixed(2);
    let totalVenta = (parseFloat(totalImpuesto) + parseFloat(subTotal));
    console.log(`Total Impuesto x Venta: ${totalImpuesto}`)
    console.log(`Total Venta: ${totalVenta}`)
    return totalVenta;
}

function AplicarDescuento(total){
    let totalDescuento = (((total * (valorTicketDescuento / 100)))).toFixed(2);
    let totalVenta = (parseFloat(total) - parseFloat(totalDescuento));
    console.log(`Total descuento: ${totalDescuento}`);
    console.log(`Total Venta -descuento (${valorTicketDescuento + "% OFF"}): ${totalVenta}`)
    return totalVenta;
}

function PagoCuotas(total, numeroCuotas){
    let totalInteres = (((total * (porcentajeCuotas / 100)) + parseFloat(total))).toFixed(2);
    let valorCuota = (totalInteres / numeroCuotas);
    console.log(`Cuotas (+ ${porcentajeCuotas + "%"}): ${numeroCuotas}`)
    console.log(`Valor de cuotas mensual: ${valorCuota}`);
}

function ResumenCompra(){
    let pagarCuotas = 0;
    let ticketDescuento = "ERROR";
    // Mostrar productos
    listaProductos();
    // Sub Total ---- ---- ---- ---- ---- ---- ---- ---- ----
    let subTotalVenta = CalcularSubTotal(priceProd1, priceProd2, priceProd3, priceProd4, priceProd5);
    // Total Venta ---- ---- ---- ---- ---- ---- ---- ---- ----
    let totalVenta = AgregarImpuesto(subTotalVenta);
    // Ticket Descuento ---- ---- ---- ---- ---- ---- ---- ---- ----
    console.log(separator);
    if(confirm("¿Tiene Ticket descuento?")){
        let ticketDescuento = prompt("Ingrese el ticket de descuento","TICKET123");
        if(ticketDescuento == "TICKET123"){
            totalVenta = AplicarDescuento(totalVenta);
            console.log(separator);
        }
    }
    // Pagar en cuotas ---- ---- ---- ---- ---- ---- ---- ---- ----
    if(confirm("¿Pagar en Cuotas?")){
        pagarCuotas = prompt("Ingrese el numero de cuotas");
        if(Number(pagarCuotas) > 0){
            PagoCuotas(totalVenta, pagarCuotas)
            console.log(separator);
        }
    }
    // 
}

