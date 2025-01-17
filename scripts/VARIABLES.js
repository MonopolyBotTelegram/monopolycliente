let chatId=null;
let walletAddress=null;
let password=null;
let corsOK=false;
let eth_por_hora;
let eth_minado;
let hora_actual;
let balance_depositado;
let progress=0;

function VARIABLES_get_chatId(){return chatId;}
function VARIABLES_get_walletAddress(){return walletAddress;}
function VARIABLES_get_password(){return password;}

function VARIABLES_set_chatId(p){chatId=p;}
function VARIABLES_set_walletAddress(p){walletAddress=p;}
function VARIABLES_set_password(p){password=p;}


function VARIABLES_set_url_cors(p){corsOK=p;}
function VARIABLES_get_url_cors(){
if(corsOK){
return'https://cors-anywhere.herokuapp.com/';
}else{
return'';
}
}


function VARIABLES_set_hora_actual(p){hora_actual=p;}
function VARIABLES_get_hora_actual(){return hora_actual;}

function VARIABLES_set_eth_por_hora(p){eth_por_hora=p;}
function VARIABLES_get_eth_por_hora(){return eth_por_hora;}

function VARIABLES_set_eth_minado(p){eth_minado=p;}
function VARIABLES_get_eth_minado(){return eth_minado;}

function VARIABLES_setBalanceDepositado(p){balance_depositado=p;}
function VARIABLES_getBalanceDepositado(){return balance_depositado;}

function VARIABLES_setProgress(p){progress=p;}
function VARIABLES_getProgress(){return progress;}
