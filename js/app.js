// VARIABLES 
const messageAddCart = "Producto agregado a la lista";
const messageExistsCart = "Producto ya existe en la lista";
const messageNoElements = "No hay elementos seleccionados";
const simboloMoneda = "$";
const separator = "-".repeat(70);
let listaProductos = [];
let resumenCompra;
// PRODUCTOS
// ARRAYS
const arrayProductos = ["Cuerdas de metal", "Parlante portátil", "Laptop", "Casaca naranja", "Mouse gamer", "Parlante de bolsillo", "Smartphone"];
const arrayMarcas = ["Earnie Ball", "Sony", "HP", "Adidas", "Lenovo", "JBL", "Xiomi"];
const arrayPrecios = [80.5, 90.00, 100.00, 70.5, 60.5, 50.5, 80.0];
// PORCENTAJE AL PAGAR EN CUOTAS
const porcentajeCuotas = 5;
// PORCENTAJE DE IMPUESTO A LAS VENTAS
const valorImpuestoVentas = 18;
// PORCENTAJE Y TICKET DE DESCUENTO
const ticketDescuento = "TICKET123";
const valorTicketDescuento = 10;
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// CLASES
class Producto{
    constructor(prodCodigo, prodNombre, prodStore, prodDescripcion, prodPrecio){
        this.prodCodigo = prodCodigo;
        this.prodNombre = prodNombre;
        this.prodStore = prodStore;
        this.prodDescripcion = prodDescripcion;
        this.prodPrecio = prodPrecio;
    }
    formatPrecio(){
        this.prodPrecio = parseFloat(this.prodPrecio).toFixed(2);
    }
    verProducto(){
        console.log(this.prodNombre);
        console.log(this.prodStore);
        console.log(this.prodDescripcion);
        console.log(this.prodPrecio);
    }
}
class ResumenCompra{
    constructor(resProductos, resSubTotal, resImpuesto, resDescuento, resCuotas, resvalorCuota, resTotalVenta, resTotalVentaDescuento){
        this.resProductos = [];
        this.resSubTotal = 0;
        this.resImpuesto = 0;
        this.resTotalVenta = 0;
        this.resDescuento = 0;
        this.resTotalVentaDescuento = 0;
        this.resCuotas = 0;
        this.resvalorCuota = 0;
    }
}
class Category{
    constructor(catCodigo, catNombre, catDescripcion){
        this.catCodigo = catCodigo;
        this.catNombre = catNombre;
        this.catDescripcion = catDescripcion;
    }
}
class OfficialStore{
    constructor(storeCodigo, storeNombre, storelogo){
        this.storeCodigo = storeCodigo;
        this.storeNombre = storeNombre;
        this.storeLogo = storelogo;
    }
}
class Offer{
    constructor(offerId, offerProductName, offerProductStore, offerProductPrice, offerPercentDiscount, offerExpiration, offerImage){
        this.offerId = offerId;
        this.offerProductName = offerProductName;
        this.offerProductStore = offerProductStore;
        this.offerProductPrice = offerProductPrice;
        this.offerPercentDiscount = offerPercentDiscount;
        this.offerProductPriceDiscount;
        this.offerExpiration = offerExpiration;
        this.offerImage = offerImage;
    }
    SetDiscount(price, percent){
        this.offerProductPriceDiscount = (price - (((price * (percent / 100))))).toFixed(2);
    }
}
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
const cargarProductos = () => {
    if(arrayProductos.length > 0){
        listaProductos = [];
        for(i = 0; i <= arrayProductos.length - 1; i++){
            const prodCodigo = i.toString().padStart(10, '0');
            const prodNombre = arrayProductos[i].toString();
            const prodStore = arrayMarcas[i].toString();
            const prodDescripcion = "Descripcion de " + arrayProductos[i].toString();
            const prodPrecio = arrayPrecios[i].toString();
            const produto = new Producto(prodCodigo,prodNombre, prodStore, prodDescripcion, prodPrecio);
            listaProductos.push(produto);
        }
        for(const producto1 of listaProductos){
            producto1.formatPrecio();
        }
        resumenCompra.resProductos = listaProductos;
    }
}
const CalcularSubTotal = () => {
    let subTotal = 0;
    for(i = 0; i <= listaProductos.length - 1; i++){
        subTotal = (parseFloat(subTotal) + parseFloat(listaProductos[i].prodPrecio));
    }
    resumenCompra.resSubTotal = subTotal.toFixed(2);
    return subTotal.toFixed(2);
}
const AgregarImpuesto = (subTotal) => {
    let ti = (((subTotal * (valorImpuestoVentas / 100)))).toFixed(2);
    let tv = (parseFloat(subTotal) + parseFloat(ti)).toFixed(2);
    resumenCompra.resImpuesto = ti;
    resumenCompra.resTotalVenta = tv;
    return ti;
}
const AplicarDescuento = (total) => {
    let td = (((total * (valorTicketDescuento / 100)))).toFixed(2);
    let tvd = (parseFloat(total) - parseFloat(td)).toFixed(2);
    resumenCompra.resDescuento = td;
    resumenCompra.resTotalVentaDescuento = tvd;
    return td;
}
const PagoCuotas = (total, numeroCuotas) => {
    let ti = (((total * (porcentajeCuotas / 100)) + parseFloat(total))).toFixed(2);
    let vc = (ti / numeroCuotas).toFixed(2);
    resumenCompra.resCuotas = numeroCuotas;
    resumenCompra.resvalorCuota = vc;
    return vc;
}
function mostrarProductos(lista, orden){
    lista.sort((a, b) => {
        if(orden == 1){
            if(a.prodNombre > b.prodNombre){return 1;}
            if(a.prodNombre < b.prodNombre){return -1;}
        }
        if(orden == 2){
            if(a.prodPrecio > b.prodPrecio){return 1;}
            if(a.prodPrecio < b.prodPrecio){return -1;}
        }
        return 0;
    })
    for(i = 0; i <= lista.length - 1; i++){
        console.log((i + 1) + ". " + lista[i].prodNombre.padEnd(35, ' ')  + lista[i].prodStore.padEnd(20, ' ') + lista[i].prodPrecio);
    }
    console.log(separator);
}
function mostrarTotales(){
    // SUMA DE PRECIOS ---- ---- ---- ---- ---- ---- ---- ---- ----
    let st = CalcularSubTotal();
    console.log(`Subtotal: ${st.toString().padStart((54), ' ')}`);
    // IMPUESTO ---- ---- ---- ---- ---- ---- ---- ---- ----
    let ti = AgregarImpuesto(st);
    let tv = (parseFloat(ti) + parseFloat(st));
    console.log(`Total Impuesto x Venta: ${ti.toString().padStart((54 - 15), ' ')}`)    
    console.log(`Total Venta: ${tv.toString().padStart((54 - 3), ' ')}`)
    console.log(separator);
}
function mostrarDescuento(tv){
    let td = AplicarDescuento(tv);
    tv = (parseFloat(tv) - parseFloat(td));
    console.log(`Total descuento: ${td.toString().padStart((54 - 8), ' ')}`);
    console.log(`Total Venta -descuento (${valorTicketDescuento + "% OFF"}): ${tv.toString().padStart((54-24), ' ')}`)
    console.log(separator);
}
function mostrarCuotas(cuotas){
    let tv = 0;
    if(parseFloat(resumenCompra.resTotalVentaDescuento) > 0){
        tv = resumenCompra.resTotalVentaDescuento;
    }else{
        tv = resumenCompra.resTotalVenta;
    }
    let vc = PagoCuotas(tv, cuotas)
    console.log(`Cuotas (+ ${porcentajeCuotas + "%"}): ${cuotas}`)
    console.log(`Valor de cuotas mensual: ${vc.toString().padStart((54-15), ' ')}`);
    console.log(separator);
}
function cargarCompra(){
    let cuotas = 0;
    let ticketDescuento = "ERROR";
    resumenCompra = new ResumenCompra();
    // LISTA DE PRODUCTOS SELECCIONADOS ---- ---- ---- ---- ---- ----
    console.log("DETALLE DE COMPRA");
    console.log(separator);
    cargarProductos();
    if(resumenCompra.resProductos.length > 0){
        let orden = Number(prompt("Ordenar productos por:\n 1. Nombre\n 2. Precio", "1"));
        mostrarProductos(resumenCompra.resProductos, orden);
        mostrarTotales();
        // TICKET DESCUENTO ---- ---- ---- ---- ---- ---- ---- ---- ----
        if(confirm("¿Tiene Ticket descuento?")){
            ticketDescuento = prompt("Ingrese el ticket de descuento","TICKET123");
            if(ticketDescuento == "TICKET123"){
                mostrarDescuento(resumenCompra.resTotalVenta);
            }
        }
        // PAGAR EN CUOTAS ---- ---- ---- ---- ---- ---- ---- ---- ----
        if(confirm("¿Pagar en Cuotas?")){
            cuotas = Number(prompt("Ingrese el numero de cuotas"));
            if(Number(cuotas) > 0){
                mostrarCuotas(cuotas);
            }
        }
    }else{
        console.log("No hay productos seleccionados en el carrito de compras");
    }
}
// DESAFIO: "INTERACTUAR CON HTML"
// DESAFIO: "INCORPORAR EVENTOS": se incorporo el array descriptionCategorias para obtener los valores desde el evento incorporado en linea 182
const arrayCategorias = ["DEPORTES", "TECNOLOGÍA", "JUEGOS", "MÚSICA", "HOGAR", "HERRAMIENTAS", "VEHICULOS", "ROPA", "OTROS"];
const descriptionCategorias = ["Lo mejor en ropa e implementos deportivos ...", "Lo mejor en dispositivos ...", "Las mejores consolas de videojuegos ...", "Instrumentos y más ...", "Lo mejor para decorar tu hogar ...", "Herramientas de construccion ...", "Autos, motos y más ...", "Lo mejor de la moda ...", "Mucho más !!"];

const arrayTiendas = ["ADIDAS", "CORT", "ERNIE BALL", "HP", "HUAWEI", "JBL", "KINGSTON", "LENOVO", "LEXAR", "NIKE", "PEAVEY", "PLAYSTATION", "PURINA", "ROYAL LONDON", "SAMSUNG", "SONY", "WILSON", "XIOMI"];
const logoTiendas = ["adidas", "cort", "ernie_ball", "hp", "huawei", "jbl", "kingston", "lenovo", "lexar", "nike", "peavey", "playstation", "purina", "royal_london", "samsung", "sony", "wilson", "xiomi"];

function CreateElement(categoryName, order, description, catDescripcion){
    let element = document.createElement("a");
    element.classList.add("itemCategoria");
    let paragraph = CreateParagraph(categoryName);
    element.appendChild(paragraph);
    return element;
}
function CreateParagraph(categoryName){
    let paragraph = document.createElement("p");
    paragraph.innerHTML = categoryName;
    return paragraph;
}
function CreateCategory(){
    let divContainer = document.getElementById("controlCategories");
    let background = document.createElement("div");
    let row = document.createElement("div");
    let row1 = document.createElement("div");
    let description = document.createElement("p")

    background.classList.add("background");
    row.classList.add("row");
    row1.classList.add("row");
    description.classList.add("description");
    // LOCALSTORAGE
    createJSON_Category();
    const jsonCategory = localStorage.getItem("arrayCategory");
    let arrayCategory = JSON.parse(jsonCategory)

    for(i = 0;i <= arrayCategory.length - 1; i++){
        let category = arrayCategory[i];
        let element = CreateElement(category.catNombre, i, description, category.catDescripcion);
        row.appendChild(element);
    }
    background.appendChild(row);
    divContainer.appendChild(background);
}
function createJSON_Category(){
    // LOCALSTORAGE
    let arrayCategory = [];
    for(i = 0;i <= arrayCategorias.length - 1; i++){
        let catCodigo = (i + 1).toString().padStart(5, '0');
        let catNombre = arrayCategorias[i];
        let catDescripcion = descriptionCategorias[i];
        let category = new Category(catCodigo, catNombre, catDescripcion);
        arrayCategory.push(category);
    }
    const textoJSON = JSON.stringify(arrayCategory);
    localStorage.setItem("arrayCategory", textoJSON)
}

function CreateElement_Store(storeNombre, storeLogo){
    let element = document.createElement("a");
    element.classList.add("itemTienda");
    const urlimage = `url('resources/images/logo_empresas/png/${storeLogo}.png')`;
    element.style.backgroundImage = urlimage;
    return element;
}
function CreateStore(){
    let divContainer = document.getElementById("controlStores");
    let background = document.createElement("div");
    let row = document.createElement("div");

    background.classList.add("background");
    row.classList.add("row");
    // LOCALSTORAGE
    createJSON_Stores();
    const jsonStore = localStorage.getItem("arrayStores");
    let arrayStores = JSON.parse(jsonStore)

    for(i = 0;i <= arrayStores.length - 1; i++){
        let strore = arrayStores[i];
        let element = CreateElement_Store(strore.storeNombre, strore.storeLogo);
        row.appendChild(element);
    }
    background.appendChild(row);
    divContainer.appendChild(background);
}
function createJSON_Stores(){
    // LOCALSTORAGE
    let arrayStores = [];
    for(i = 0;i <= arrayTiendas.length - 1; i++){
        let storeCodigo = (i + 1).toString().padStart(5, '0');
        let storeNombre = arrayTiendas[i];
        let storelogo = logoTiendas[i];
        let store = new OfficialStore(storeCodigo, storeNombre, storelogo);
        arrayStores.push(store);
    }
    const textoJSON = JSON.stringify(arrayStores);
    localStorage.setItem("arrayStores", textoJSON)
}

const arrayOffer = ["Cuerdas de metal", "Parlante portátil", "Laptop", "Casaca naranja", "Mouse gamer", "Parlante de bolsillo", "Smartphone"];
const relativePathImage = "resources/images/offer/";
const arrayOfferImage = ["offer1_1.png", "offer2_1.png", "offer3_1.png", "offer4_1.png", "offer5_1.png", "offer6_1.png", "offer7_1.png"];
const arrayOfferStore = ["ernie_ball", "sony", "hp", "adidas", "lenovo", "jbl", "xiomi"];
const arrayOfferPrice = [200.5, 180.00, 100.00, 70.5, 350.5, 250.5, 180.0];
let offerPercent = 0;

function CreatElement_Offer(orderOffer){
    let offerId = (orderOffer + 1).toString().padStart(5, '0');
    let delayAnim = (orderOffer + 1);
    let itemOffer = document.createElement("div");
    itemOffer.classList.add("itemOffer");
    itemOffer.classList.add("itemOffer--animation");
    let delay = ((delayAnim / 100) * 20);
    itemOffer.style.animationDelay = delay + "s";
    itemOffer.style.backgroundImage = "url(" + relativePathImage + arrayOfferImage[orderOffer] + ")";
    itemOffer.setAttribute("id", "itemOffer" + (i + 1));
    itemOffer.setAttribute("data-offer", offerId);
    return itemOffer;
}
function createJSON_Offer(){
    // LOCALSTORAGE
    let arrayOffers = [];
    for(i = 0;i <= arrayOffer.length - 1; i++){
        offerPercent = offerPercent + 10;
        let offerId = (i + 1).toString().padStart(5, '0');
        let offerProductName = arrayOffer[i];
        let offerProductStore = arrayOfferStore[i];
        let offerProductPrice = arrayOfferPrice[i].toFixed(2);
        let offerPercentDiscount = offerPercent + "%";
        let offerExpiration = "01/01/2022";
        let offerImage = relativePathImage + arrayOfferImage[i];
        let offer = new Offer(offerId, offerProductName, offerProductStore, offerProductPrice, offerPercentDiscount, offerExpiration, offerImage);
        offer.SetDiscount(offerProductPrice, offerPercent);
        arrayOffers.push(offer);
    }
    const textoJSON = JSON.stringify(arrayOffers);
    localStorage.setItem("arrayOffers", textoJSON)
}
function getOfferData(offerId){
    let arrayOffers = [];
    arrayOffers = JSON.parse(localStorage.getItem("arrayOffers"));
    let productOffer = arrayOffers.find(x => x.offerId == offerId);
    return productOffer; 
}
function createItemCart(dataOffer){
    const product = getOfferData(dataOffer);
    
    let itemCart = document.createElement("div");
    let imageProduct = document.createElement("div");
    let img = document.createElement("img");
    let nameProduct = document.createElement("div");
    let priceProduct = document.createElement("div");
    let deleteProduct = document.createElement("div");
    let a = document.createElement("a");

    itemCart.setAttribute("data-offer", product.offerId);
    nameProduct.innerHTML = product.offerProductName; //"Nombre producto";
    priceProduct.innerHTML = "$ " + product.offerProductPriceDiscount; //"S/ 100.00";
    img.src = product.offerImage;
    a.innerHTML = "x";

    itemCart.classList.add("itemCart");
    imageProduct.classList.add("imageProduct");
    nameProduct.classList.add("nameProduct");
    priceProduct.classList.add("priceProduct");
    deleteProduct.classList.add("deleteProduct");
    deleteProduct.onclick = function(){
        let cart = JSON.parse(localStorage.getItem("arrayCart"));
        let productId = itemCart.getAttribute("data-offer");
        let newCart = cart.filter(x => x.offerId != productId);
        createJSON_Cart(newCart);
        itemCart.remove();
    }

    imageProduct.append(img);
    itemCart.append(imageProduct);
    itemCart.append(nameProduct);
    itemCart.append(priceProduct);
    deleteProduct.append(a);
    itemCart.append(deleteProduct);
    //CartAddItem(product);
    return(itemCart);
}
function Cart_AddItem(productId){
    let product = Cart_FindItem(productId)
    if(product == "exists"){
        return messageExistsCart;
    }
    if(product == "add"){
        return messageAddCart;
    }
}
function Cart_FindItem(productId){
    let cart = [];
    let newCart = [];
    let product;
    cart = JSON.parse(localStorage.getItem("arrayCart"));
    if(cart != null){
        let productFind = cart.find(x => x.offerId == productId);
        if(productFind != null){
            product = "exists";
        }else{
            product = getOfferData(productId);
            if(product != null){
                cart.push(product);
                createJSON_Cart(cart);
                product = "add";
            }
        }
    }else{
        product = getOfferData(productId);
        if(product != null){
            newCart.push(product);
            createJSON_Cart(newCart);
            product = "add";
        }
    }
    return product;
}
function createJSON_Cart(arrayCart){
    const textoJSON = JSON.stringify(arrayCart);
    localStorage.setItem("arrayCart", textoJSON)
}
function showMessage(messageText){
    let messageItem = document.createElement("div");
    let background = document.createElement("div");
    let message = document.createElement("div");
    messageItem.classList.add("messageItem");
    background.classList.add("background");
    message.innerHTML = messageText;
    message.classList.add("message");
    if(messageText == messageAddCart){background.classList.add("background--info");messageItem.setAttribute("data-add",true);}
    if(messageText == messageExistsCart){background.classList.add("background--alert");messageItem.setAttribute("data-add",false);}
    background.appendChild(message);
    messageItem.appendChild(background);
    return messageItem;
}
function loadCart(){
    let cart = [];
    let array = [];
    cart = JSON.parse(localStorage.getItem("arrayCart"));
    if(cart != null){
        //console.log(cart);
        let productId;
        for(i = 0; i <= cart.length - 1; i++){
            productId = cart[i].offerId;
            //console.log(productId);
            array.push(productId);
        }
    }else{
        array = messageNoElements;
    }
    return (array);
}