async function DEPOSIT_m() {
    let fecha_crono_10_min;
    let fechaActual;

    await FUNCIONES_runLoading();
    const alerta = await DepositAlertaGet_m();
    fechaActual = await GetFecha_n(); // Formato yyMMddHHmmss
    await FUNCIONES_stopLoading();

    let updateMaviaAlerta = true;
    let withdrawal_pendiente_1 = typeof alerta === 'string' && alerta.startsWith('1');
    if (withdrawal_pendiente_1) {
        const fechaBase = alerta.slice(1); // Fecha base extraída del mensaje
        const tiempoRestante = await calcularTiempoRestante(fechaBase,fechaActual);

        if (tiempoRestante.minutos <= 0 && tiempoRestante.segundos <= 0) {

        }else{
        updateMaviaAlerta = false;
        }
    }

    // Función para sumar minutos al formato yyMMddHHmmss
    async function sumarMinutos(fecha, minutos) {
        const year = parseInt(fecha.slice(0, 2)) + 2000;
        const month = parseInt(fecha.slice(2, 4)) - 1; // Los meses van de 0 a 11
        const day = parseInt(fecha.slice(4, 6));
        const hour = parseInt(fecha.slice(6, 8));
        const minute = parseInt(fecha.slice(8, 10));
        const second = parseInt(fecha.slice(10, 12));

        // Calcular el total de segundos
        const totalSegundos = second + minute * 60 + hour * 3600 + minutos * 60;

        // Convertir nuevamente a horas, minutos y segundos
        const newHour = Math.floor(totalSegundos / 3600) % 24;
        const newMinute = Math.floor(totalSegundos / 60) % 60;
        const newSecond = totalSegundos % 60;

        // Crear la nueva fecha en formato yyMMddHHmmss
        const nuevaFecha = `${String(year - 2000).padStart(2, '0')}${String(month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}${String(newHour).padStart(2, '0')}${String(newMinute).padStart(2, '0')}${String(newSecond).padStart(2, '0')}`;
        return nuevaFecha;
    }

    if (updateMaviaAlerta) {
        await FUNCIONES_runLoading();
        await DepositAlertaUpdate_m('1' + fechaActual);
        await TareasSet_m('A');
        await FUNCIONES_stopLoading();
        fecha_crono_10_min = await sumarMinutos(fechaActual, 10);
    } else {
        const fecha_base = alerta.slice(1); // Fecha base extraída del mensaje
        fecha_crono_10_min = await sumarMinutos(fecha_base, 10);
    }

    const modal = document.getElementById('cellModal_deposit');
    const modalTable = document.getElementById('modalTable_deposit');
    const modalTitle = document.getElementById('modalTitle_deposit');
    const closeModalBtn = document.getElementById('close_deposit-button');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    } else {
        console.error('El botón de cerrar no se encontró en el DOM');
    }

    modalTitle.textContent = 'Deposit';
    modal.style.display = 'flex';
    modal.style.backgroundColor = '#228B22';
    modal.style.backgroundSize = 'cover';
    modal.style.backgroundPosition = 'center';
    modalTable.innerHTML = '';

    const addressContainer = document.createElement('div');
    addressContainer.classList.add('address-container');

    const addressText = document.createElement('span');
    addressText.textContent = await VARIABLES_get_walletAddress();
    addressContainer.appendChild(addressText);

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Address';
    copyButton.classList.add('copy-button');
    addressContainer.appendChild(copyButton);

    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
    const nota = 'Important note: The deposit only allows ETH on the BASE network.';
    const noteText = document.createElement('span');
    noteText.textContent = nota;
    noteContainer.appendChild(noteText);

    modalTable.appendChild(noteContainer);
    modalTable.appendChild(addressContainer);

    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');
    const timerText = document.createElement('span');
    timerContainer.appendChild(timerText);
    addressContainer.appendChild(timerContainer);

    copyButton.addEventListener('click', async () => {
        navigator.clipboard.writeText(await VARIABLES_get_walletAddress()).then(() => {
            copyButton.textContent = 'Address Copied!';
            copyButton.classList.add('copied');
            setTimeout(() => {
                copyButton.textContent = 'Copy Address';
                copyButton.classList.remove('copied');
            }, 1000);
        }).catch(err => {
            console.error('Error copying text: ', err);
        });
    });

    async function calcularTiempoRestante(fechaBase, fechaActual) {
        const baseHora = parseInt(fechaBase.slice(6, 8));
        const baseMinuto = parseInt(fechaBase.slice(8, 10));
        const baseSegundo = parseInt(fechaBase.slice(10, 12));

        const actualHora = parseInt(fechaActual.slice(6, 8));
        const actualMinuto = parseInt(fechaActual.slice(8, 10));
        const actualSegundo = parseInt(fechaActual.slice(10, 12));

        const baseTotalSegundos = baseHora * 3600 + baseMinuto * 60 + baseSegundo;
        const actualTotalSegundos = actualHora * 3600 + actualMinuto * 60 + actualSegundo;

        const diferencia = baseTotalSegundos - actualTotalSegundos;
        const minutos = Math.floor(diferencia / 60);
        const segundos = diferencia % 60;
        return { minutos, segundos };
    }

   function iniciarCronometro(fechaBase) {
        const intervalo = setInterval(async () => {

            const tiempoRestante = await calcularTiempoRestante(fechaBase,fechaActual);

            if (tiempoRestante.minutos <= 0 && tiempoRestante.segundos <= 0) {
                clearInterval(intervalo);
                timerText.textContent = '00:00';
                await FUNCIONES_runLoading();
                await DepositAlertaUpdate_m('0');
                await TareasSet_m('A');
                await FUNCIONES_stopLoading();
                modal.style.display = 'none';
            } else {
                timerText.textContent = `${String(tiempoRestante.minutos).padStart(2, '0')}:${String(tiempoRestante.segundos).padStart(2, '0')}`;
            }
            fechaActual=await sumarSegundos(fechaActual,1);
        }, 1000);
    }


    // Función para sumar segundos al formato yyMMddHHmmss
    async function sumarSegundos(fecha, segundos) {
        const year = parseInt(fecha.slice(0, 2)) + 2000;
        const month = parseInt(fecha.slice(2, 4)) - 1; // Los meses van de 0 a 11
        const day = parseInt(fecha.slice(4, 6));
        const hour = parseInt(fecha.slice(6, 8));
        const minute = parseInt(fecha.slice(8, 10));
        const second = parseInt(fecha.slice(10, 12));

        // Calcular el total de segundos desde el inicio del día
        const totalSegundos = second + minute * 60 + hour * 3600 + segundos;

        // Convertir nuevamente a horas, minutos y segundos
        const newHour = Math.floor(totalSegundos / 3600) % 24; // Mantener dentro del rango de 24 horas
        const newMinute = Math.floor(totalSegundos / 60) % 60;
        const newSecond = totalSegundos % 60;

        // Crear la nueva fecha en formato yyMMddHHmmss
        const nuevaFecha = `${String(year - 2000).padStart(2, '0')}${String(month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}${String(newHour).padStart(2, '0')}${String(newMinute).padStart(2, '0')}${String(newSecond).padStart(2, '0')}`;
        return nuevaFecha;
    }


    iniciarCronometro(fecha_crono_10_min);
}
