let cellEstrellasByNumber=[
[null,0,null,0,null],
[0,null,null,null,0],
[0,null,null,null,0],
[0,null,null,null,0],
[0,null,null,null,0],
[null,0,null,0,null]
];



function MINEROS_get(y,x){
return cellEstrellasByNumber[y][x];
}

function MINEROS_set(y,x){
cellEstrellasByNumber[y][x]++;
}

async function MINEROS_load(){
//////////////////
await GetFecha_n();
VARIABLES_setProgress(55);
const mineros=await MinerosGet_m();
VARIABLES_setProgress(75);
/////////////////
for(let y=0;y<6;y++){
for(let x=0;x<5;x++){
if(y===0){
if(x===1){cellEstrellasByNumber[y][x]=Number(mineros.substring(4,5));}//E
if(x===3){cellEstrellasByNumber[y][x]=Number(mineros.substring(5,6));}//F
}
if(y===1){
if(x===0){cellEstrellasByNumber[y][x]=Number(mineros.substring(3,4));}//D
if(x===4){cellEstrellasByNumber[y][x]=Number(mineros.substring(6,7));}//G
}
if(y===2){
if(x===0){cellEstrellasByNumber[y][x]=Number(mineros.substring(2,3));}//C
if(x===4){cellEstrellasByNumber[y][x]=Number(mineros.substring(7,8));}//H
}
if(y===3){
if(x===0){cellEstrellasByNumber[y][x]=Number(mineros.substring(1,2));}//B
if(x===4){cellEstrellasByNumber[y][x]=Number(mineros.substring(8,9));}//I
}
if(y===4){
if(x===0){cellEstrellasByNumber[y][x]=Number(mineros.substring(0,1));}//A
if(x===4){cellEstrellasByNumber[y][x]=Number(mineros.substring(9,10));}//J
}
if(y===5){
if(x===1){cellEstrellasByNumber[y][x]=Number(mineros.substring(11,12));}//L
if(x===3){cellEstrellasByNumber[y][x]=Number(mineros.substring(10,11));}//K
}
}
}
await MINEROS_calcular_eth_por_hora();
VARIABLES_setProgress(95);
await MINEROS_get_ETH_Mined(mineros);
}



function MINEROS_calcularHorasEntreFechas(fechaMenor,fechaMayor){
// Convertir las fechas al formato de objeto Date
function convertirAFecha(fecha) {
const year = parseInt(fecha.slice(0, 2), 10) + 2000; // Año (suponiendo que es del siglo XXI)
const month = parseInt(fecha.slice(2, 4), 10) - 1;   // Mes (de 0 a 11)
const day = parseInt(fecha.slice(4, 6), 10);         // Día del mes
const hours = parseInt(fecha.slice(6, 8), 10);       // Horas
const minutes = parseInt(fecha.slice(8, 10), 10);    // Minutos
const seconds = parseInt(fecha.slice(10, 12), 10);   // Segundos
return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
}
const date1 = convertirAFecha(fechaMenor);
const date2 = convertirAFecha(fechaMayor);
// Calcular la diferencia en milisegundos
const diferenciaMs = Math.abs(date2 - date1);
// Convertir la diferencia a horas
const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
// Retornar la diferencia con 2 decimales
return parseFloat(diferenciaHoras.toFixed(2));
}





//100000000000A241229013015
async function MINEROS_get_ETH_Mined(mineros){
mineros=mineros.substring(12);
const fechaActual=VARIABLES_get_hora_actual();
let eth_minado=0;
let eth_invertido=0;
let fecha;
let fechaAnterior=fechaActual;
let mineroAnterior;
let estrellas=0;
let cellPrice;
let cellPriceAnterior;
let mineroOk=false;
let minero_free=true;
//////////////////////
while(true){
if(mineros.length===0){break}
const minero=mineros.substring(0,1);
mineroOk=false;
//IZQUIERDA
if(minero==='A'){cellPrice=CONSTANTES_cellPrecioByNumber()[4][0];mineroOk=true;}
if(minero==='B'){cellPrice=CONSTANTES_cellPrecioByNumber()[3][0];mineroOk=true;}
if(minero==='C'){cellPrice=CONSTANTES_cellPrecioByNumber()[2][0];mineroOk=true;}
if(minero==='D'){cellPrice=CONSTANTES_cellPrecioByNumber()[1][0];mineroOk=true;}
//ARRIBA
if(minero==='E'){cellPrice=CONSTANTES_cellPrecioByNumber()[0][1];mineroOk=true;}
if(minero==='F'){cellPrice=CONSTANTES_cellPrecioByNumber()[0][3];mineroOk=true;}
//DERECHA
if(minero==='G'){cellPrice=CONSTANTES_cellPrecioByNumber()[1][4];mineroOk=true;}
if(minero==='H'){cellPrice=CONSTANTES_cellPrecioByNumber()[2][4];mineroOk=true;}
if(minero==='I'){cellPrice=CONSTANTES_cellPrecioByNumber()[3][4];mineroOk=true;}
if(minero==='J'){cellPrice=CONSTANTES_cellPrecioByNumber()[4][4];mineroOk=true;}
//ABAJO
if(minero==='K'){cellPrice=CONSTANTES_cellPrecioByNumber()[5][3];mineroOk=true;}
if(minero==='L'){cellPrice=CONSTANTES_cellPrecioByNumber()[5][1];mineroOk=true;}
//////////////////////////////
if(minero_free){
minero_free=false;
cellPrice=MINEROS_getPrice(estrellas,cellPrice);
}else{
if(mineroOk){
cellPriceAnterior=0;
estrellas=0;
}
cellPrice=MINEROS_getPrice(estrellas,cellPrice);
eth_invertido=eth_invertido+(cellPrice-cellPriceAnterior);
}
///////////////////////////////
if(!mineroOk){
fecha=mineros.substring(0,12);
mineros=mineros.substring(12);
const horasMinado=MINEROS_calcularHorasEntreFechas(fecha,fechaAnterior);
const ethPorHora=MINEROS_calcularETHPorHora(cellPriceAnterior,30);
eth_minado=eth_minado+(horasMinado*ethPorHora);
estrellas++;
}else{
fecha=mineros.substring(1,13);
mineros=mineros.substring(13);
estrellas=1;
}
fechaAnterior=fecha;
mineroAnterior=minero;
cellPriceAnterior=cellPrice;
/////////////////////////////
}
////////////////////////////
//fechaActual = "241230193814"
// eth_minado = 0
// fecha = "241229013015"
// fechaAnterior = "241229013015"
// mineroAnterior = "A"
// cellPriceAnterior = "0.0003"
// estrellas = 1
const horasMinado=MINEROS_calcularHorasEntreFechas(fechaAnterior,fechaActual);
const ethPorHora=MINEROS_calcularETHPorHora(cellPrice,30);
eth_minado=MINEROS_calcularEthMinado(horasMinado,ethPorHora,eth_minado);
////////////////////////////////////
eth_minado=MINEROS_getFloat(parseFloat(eth_minado))-getFloat(eth_invertido);
////////////////////////////
VARIABLES_set_eth_minado(eth_minado);
////////////////////////////
}



function MINEROS_calcularEthMinado(horasMinado, ethPorHora,eth_minado) {
// Convertir ethPorHora a un número flotante (si está en formato de cadena)
const ethPorHoraFloat = parseFloat(ethPorHora);
// Calcular la cantidad total de ETH minado
const ethMinado = (horasMinado * ethPorHoraFloat)+eth_minado;
// Retornar el resultado con precisión (opcional)
return ethMinado.toFixed(10); // Limita a 8 decimales como es común en ETH
}



function MINEROS_calcularEthPorSegundo() {
    // Obtener el valor de ETH por hora
    let ethPorHora = VARIABLES_get_eth_por_hora();

    // Verificar si el valor es una cadena válida
    if (typeof ethPorHora === 'string') {
        ethPorHora = ethPorHora.trim(); // Eliminar espacios en blanco, si existen
    }

    // Convertir a número
    ethPorHora = parseFloat(ethPorHora);

    // Validar el valor de entrada
    if (isNaN(ethPorHora) || ethPorHora <= 0) {
        console.error("ETH por hora inválido o no definido:", ethPorHora);
        return "0.0000000000"; // Retornar "0.0000000000" en caso de error
    }

// Calcular ETH por segundo y redondear hacia abajo
    let ethPorSegundo = ethPorHora / 3600;

// Retornar el resultado limitado a 10 decimales
    return ethPorSegundo.toFixed(12);


}





function MINEROS_calcular_eth_por_hora(){
let eth_por_hora_TOTAL=0;
for(let y=0;y<6;y++){
for(let x=0;x<5;x++){
const cellPrice=CONSTANTES_cellPrecioByNumber()[y][x];
if(cellPrice===null){continue;}
const estrellas=cellEstrellasByNumber[y][x];
if(estrellas>0){
eth_por_hora_TOTAL=eth_por_hora_TOTAL+parseFloat(MINEROS_getEthPorHora(cellPrice,estrellas));
}
}
}
VARIABLES_set_eth_por_hora(eth_por_hora_TOTAL.toFixed(8));
}



function MINEROS_getEthPorHora(cellPrice,estrellas){
let price=cellPrice;
for(let i0=0;i0<estrellas;i0++){
if(i0===0){continue;}
price=parseFloat(price)*parseFloat(MINEROS_getFloat(2));
}
return MINEROS_calcularETHPorHora(price,30);
}



function MINEROS_calcularETHPorHora(ethInvertido, diasROI) {
// Calcular la cantidad de ETH necesaria por día para el ROI
let ethPorDia = ethInvertido / diasROI;
// Calcular la cantidad de ETH necesaria por hora
let ethPorHora = ethPorDia / 24;
// Retornar el resultado redondeado a 8 decimales
return ethPorHora.toFixed(8);
}


let MINEROS_tablaPrice=[0,0,0,0,0,0];


function MINEROS_getPrice(estrellas, cellPrecio) {
if(estrellas===0){
    MINEROS_tablaPrice[estrellas]=cellPrecio;
return cellPrecio;
}
const priceAnterior=MINEROS_tablaPrice[estrellas-1];
const f0 =  MINEROS_getFloat(priceAnterior);
//TODO el precio se multiplica por 2 en cada upgrade
    let resultado = parseFloat(f0) * parseFloat(MINEROS_getFloat(2));
    MINEROS_tablaPrice[estrellas]=resultado;
    return resultado;  // Retorna el valor formateado
}



function MINEROS_getFloat(number) {
    // Convertir a número flotante
    let num = parseFloat(number);

    // Verificar si el valor es un número válido
    if (!isNaN(num)) {
          // Limitar a 8 decimales
        return num.toFixed(8);  // Retorna el valor formateado
    } else {
        return null;  // Retorna null si no es un número válido
    }
}






