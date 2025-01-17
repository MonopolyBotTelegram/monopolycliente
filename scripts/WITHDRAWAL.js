async function WITHDRAWAL_m(){
    // Continuar con el flujo
    await FUNCIONES_runLoading();
    const alerta = await MinerosGet_m();
    let withdrawal_pendiente_1 = typeof alerta === 'string' && alerta.startsWith('1');
    await FUNCIONES_stopLoading();


    if(withdrawal_pendiente_1){
        showDialog('You have a withdrawal in process');
        return;
    }

    let withdrawal_pendiente_2 = typeof alerta === 'string' && alerta.startsWith('2');
    if(withdrawal_pendiente_2){
        showDialog(alerta);
        return;
    }


    let withdrawal_pendiente_3 = typeof alerta === 'string' && alerta.startsWith('3');
    if(withdrawal_pendiente_3){
        await FUNCIONES_runLoading();
        await WithdrawAlertaUpdate_m('0');
        await TareasSet_m('C');
        await FUNCIONES_stopLoading();
        showDialogAlerta3(alerta);
    }

    const feeElement = document.getElementById('withdrawalFeeLabel');
    const fee = CONSTANTES_withdrawalFee(); // Llamar la función para obtener el fee
    feeElement.textContent = `Fee (ETH): ${fee}`;


    const modal = document.getElementById('cellModal_withdrawal');
    const modalTitle = document.getElementById('modalTitle_withdrawal'); // Título del modal
    const closeModalBtn = document.getElementById('close_withdrawal-button');

    const copyButton = document.getElementById('copyButton');
    const addressInput = document.getElementById('addressInput');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none'; // Cerrar el modal
        });
    } else {
        console.error('El botón de cerrar no se encontró en el DOM');
    }

    // Establecer el título del modal
    modalTitle.textContent = 'Withdrawal';

    // Mostrar el modal al cambiar la propiedad display a 'flex'
    modal.style.display = 'flex';

    // Establecer la imagen de fondo del modal
    modal.style.backgroundColor = '#4682B4';
    modal.style.backgroundSize = 'cover'; // Aseguramos que la imagen cubra todo el modal
    modal.style.backgroundPosition = 'center'; // Centrar la imagen

// Elementos del DOM
    const amountInput = document.getElementById('amountInput'); // Nuevo input para el monto de ETH

    copyButton.addEventListener('click', async () => {

        const enteredAddress = addressInput.value;
        const enteredAmount = parseFloat(amountInput.value); // Obtener la cantidad ingresada
        console.log('Entered Address:', enteredAddress);
        console.log('Entered Amount:', enteredAmount);

        // Validar dirección
        if (!enteredAddress.startsWith('0x') || enteredAddress.length !== 42) {
            showDialog('The address entered is not valid. Make sure it starts with "0x" and is 42 characters long.');
            return;
        }

        // Validar cantidad ingresada
        if (isNaN(enteredAmount) || enteredAmount <= 0) {
            showDialog('The amount entered is not valid. Please enter a positive number.');
            return;
        }

        // Comprobar balance mínimo (simulación, reemplaza con la lógica real para obtener el balance)
        const balance = parseFloat(await VARIABLES_get_eth_minado()) + parseFloat(await VARIABLES_getBalanceDepositado())+parseFloat(CONSTANTES_withdrawalFee());
        if (balance < CONSTANTES_minWithdrawal()) {
            showDialog(`Insufficient balance. You need at least ${CONSTANTES_minWithdrawal()} ETH to proceed.`);
            return;
        }

        if(enteredAmount < CONSTANTES_minWithdrawal()){
            showDialog(`The minimum amount to withdraw is ${CONSTANTES_minWithdrawal()} ETH.`);
            return;
        }

        // Verificar que el monto a retirar no supere el balance disponible
        if (enteredAmount > balance) {
            showDialog(`Insufficient balance. You only have ${balance.toFixed(8)} ETH available.`);
            return;
        }

        // Continuar con el flujo
        await FUNCIONES_runLoading();
        await WithdrawAlertaUpdate_m(`1${enteredAddress}${enteredAmount.toFixed(8)}`);
        await TareasSet_m('C');
        await FUNCIONES_stopLoading();
        modal.style.display = 'none'; // Cerrar el modal
    });






    function showDialog(message) {
        const dialog = document.getElementById('dialog_withdrawal');
        const dialogMessage = document.getElementById('dialogMessage_withdrawal');
        const closeDialog = document.getElementById('closeDialog_withdrawal');

        dialogMessage.textContent = message;
        dialog.classList.remove('hidden_withdrawal');

        closeDialog.onclick = () => {
            dialog.classList.add('hidden_withdrawal');
        };
    }




    function showDialogAlerta3(message) {
    const dialog = document.getElementById('dialog_withdrawal_alerta3');
    const dialogMessage = document.getElementById('dialogMessage_withdrawal_alerta3');
    const closeDialog = document.getElementById('closeDialog_withdrawal_alerta3');

    // Limpiar contenido previo
    dialogMessage.innerHTML = '';

    // Procesar el mensaje
    const hashMatch = message.match(/[a-f0-9]{64}/);
    const hash = hashMatch ? hashMatch[0] : "null";
    const estado = hashMatch ? message.slice(hashMatch.index + 64).trim() : "null";


        const rows = [
        "Texto: hash",
        `Hash: ${hash}`,
        "Texto: Estado",
        `Estado: ${estado}`,
    ];

    // Crear y añadir las filas al diálogo
    rows.forEach(row => {
        const p = document.createElement('p_alerta3');
        p.textContent = row;
        dialogMessage.appendChild(p);
    });

    // Mostrar el diálogo
    dialog.classList.remove('hidden_withdrawal_alerta3');

    // Manejar el cierre del diálogo
    closeDialog.onclick = () => {
        dialog.classList.add('hidden_withdrawal_alerta3');
    };
}


}
