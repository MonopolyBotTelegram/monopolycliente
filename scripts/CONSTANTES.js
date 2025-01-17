const cellImgByNumber = [
['imgs/celdas/CASUAL_0.png','imgs/celdas/VERDE_CLARO.png','imgs/celdas/TAX.png','imgs/celdas/VERDE_CLARO.png','imgs/celdas/JAIL.png'],
['imgs/celdas/NARANJA.png', null, null, null, 'imgs/celdas/VERDE_OSCURO.png'],
['imgs/celdas/NARANJA.png', null, null, null, 'imgs/celdas/VERDE_OSCURO.png'],
['imgs/celdas/AMARILLO.png', null, null, null, 'imgs/celdas/AZUL.png'],
['imgs/celdas/AMARILLO.png', null, null, null,'imgs/celdas/AZUL.png'],
['imgs/celdas/START.png','imgs/celdas/VIOLETA.png','imgs/celdas/BANK.png','imgs/celdas/VIOLETA.png','imgs/celdas/CASUAL_1.png']
];

const casillas=[
[6,7,8,9,10],
[5,null,null,null,11],
[4,null,null,null,12],
[3,null,null,null,13],
[2,null,null,null,14],
[1,18,17,16,15]
];

const cellPrecioByNumber=[
[null,'0.0015',null,'0.0018',null],
['0.0012',null,null,null,'0.0021'],
['0.0009',null,null,null,'0.0024'],
['0.0006',null,null,null,'0.0027'],
['0.0003',null,null,null,'0.003'],
[null,'0.01',null,'0.005',null]
];


const cellRaresaByNumber=[
[null,'Rare',null,'Rare',null],
['Uncommon',null,null,null,'Epic'],
['Uncommon',null,null,null,'Epic'],
['Common',null,null,null,'Legend'],
['Common',null,null,null,'Legend'],
[null,'Mythical',null,'Mythical',null]
];


const cellMineroByNumber=[
[null,'E',null,'F',null],
['D',null,null,null,'G'],
['C',null,null,null,'H'],
['B',null,null,null,'I'],
['A',null,null,null,'J'],
[null,'L',null,'K',null]
];


const cellNamesByNumber={1:'START',2:'Cafeteria',3:'Restaurant',4:'Self',5:'Gas',6:'?',7:'Beauty',8:'TAX',9:'Fitness',10:'JAIL',11:'Store',12:'Supermarket',13:'Cellular',14:'Internet',15:'?',16:'Factory',17:'BANK',18:'Plant'};
const cellImg0 = 'imgs/balance.png';
const cellImg1 = 'imgs/withdrawal.png';
const cellImg2 = 'imgs/deposit.png';
const cellImg3 = 'imgs/mined.png';


function CONSTANTES_cellImgByNumber(){return cellImgByNumber;}
function CONSTANTES_casillas(){return casillas;}
function CONSTANTES_cellPrecioByNumber(){return cellPrecioByNumber;}
function CONSTANTES_cellNamesByNumber(){return cellNamesByNumber;}
function CONSTANTES_cellRaresaByNumber(){return cellRaresaByNumber;}
function CONSTANTES_cellImg0(){return cellImg0;}
function CONSTANTES_cellImg1(){return cellImg1;}
function CONSTANTES_cellImg2(){return cellImg2;}
function CONSTANTES_cellImg3(){return cellImg3;}
function CONSTANTES_cellMineroByNumber(){return cellMineroByNumber;}


const url_get_mineros='https://script.google.com/macros/s/AKfycbxcJHXF0t-rUElQbaGK_l9fOEerbxz40V8fYme0VN3vfrkOOJ58Ugk7nuTXhyluJA793Q/exec';
function CONSTANTES_url_get_mineros(){return url_get_mineros;}

const url_hora_actual='https://script.google.com/macros/s/AKfycbypxgNdDb2CFHXVERVBw-PHeDfk56HYAZvM6speTpJosAUyZx0OAvY3XWi453R1DfFG/exec';
function CONSTANTES_url_hora_actual(){return url_hora_actual;}

const url_updateMinerosAlerta='https://script.google.com/macros/s/AKfycbx7CtMQeisxLfRXtxvRBrGvNLyZfneeHs-JqqbSO5WaLoAxFYp3GY_P0LhOTCczwTyAZg/exec';
function CONSTANTES_url_updateMinerosAlerta(){return url_updateMinerosAlerta;}

const url_getBalanceDepositado='https://script.google.com/macros/s/AKfycbxhJgk7iAkPNfproYS2q6BgR1oXGSsl52OstwugswQm1xoQdt5-Nzc3hKh7cAWmzeYiDA/exec';
function CONSTANTES_url_getBalanceDepositado(){return url_getBalanceDepositado;}

const url_updateMaviaAlerta='https://script.google.com/macros/s/AKfycbzntbjrzDpuvW7aYxg6Fs14QAXnUabXs7r_MN6xHvvvW1U9CP6CirIzKPwkTr75lCaLpg/exec';
function CONSTANTES_url_updateMaviaAlerta(){return url_updateMaviaAlerta;}

const url_getMaviaAlerta='https://script.google.com/macros/s/AKfycbwTtC78fsC43JkRwfC8MYVLkM_52fre8TAgb5ucaYtiPouP7N44lntYbDJLUP_U0Lnz/exec';
function CONSTANTES_url_getMaviaAlerta(){return url_getMaviaAlerta;}

const url_getPendientes='https://script.google.com/macros/s/AKfycbwHNVLOYpl89N49UXQ_rODjudcrsTKjnRvXh2H74uryf_yNkH_bN0Wvu8N3KRChBT5L/exec';
function CONSTANTES_url_getPendientes(){return url_getPendientes;}

const url_updateWithdrawalAlerta='https://script.google.com/macros/s/AKfycbzkFcoMeVksVfnIINJknPGrS5EeZtny0C9i9udvToHghQwGUhtdx3CL0R9nMWzKVuwBZQ/exec';
function CONSTANTES_url_updateWithdrawalAlerta(){return url_updateWithdrawalAlerta;}

const url_getWithdrawAlerta='https://script.google.com/macros/s/AKfycbwoHgNfwsjJwQ1aJDdDrl0kb-TXOcmAAVyAZ144Du-V29vSBWcHdcA7s7amrxr8WYWL9A/exec';
function CONSTANTES_url_getWithdrawAlerta(){return url_getWithdrawAlerta;}

const url_setTareas='https://script.google.com/macros/s/AKfycbw1u16DeR1dQebxSaCOSQ_mDqDqxPNCHWLZNCx8H2eOTJ4iDGCArcHs26BlMovD4uiAjQ/exec';
function CONSTANTES_url_setTareas(){return url_setTareas;}

const minWithdrawal=0.00001
function CONSTANTES_minWithdrawal(){return minWithdrawal;}

const withdrawalFee='0.000003';
function CONSTANTES_withdrawalFee(){return withdrawalFee;}
