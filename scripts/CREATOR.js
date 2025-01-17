let actualizar_balance_cell=true;
async function CREATOR_balance_cell() {
    const balance_cells = document.getElementsByClassName('balance-cell'); // Selecciona todos los elementos con la clase 'balance-cell'

    if (balance_cells.length > 0) {
        const cell = balance_cells[0]; // Usamos solo la primera celda

        // Configurar el estilo de la celda
        cell.style.backgroundImage = `url('${CONSTANTES_cellImg0()}')`;
        cell.style.backgroundSize = '75% 50%'; // Ajusta el tamaño de la imagen
        cell.style.backgroundPosition = 'center bottom'; // Centra la imagen
        cell.style.backgroundRepeat = 'no-repeat';
        cell.style.position = 'relative';

        // Verificar si el texto ya existe
        let cellText = cell.querySelector('span');
        if (!cellText) {
            // Crear el texto si no existe
            cellText = document.createElement('span');
            cell.appendChild(cellText);
        }

        // Configurar estilo del texto
        cellText.style.position = 'absolute';
        cellText.style.top = '65%';
        cellText.style.left = '50%';
        cellText.style.transform = 'translateX(-50%)';
        cellText.style.fontSize = '16px';
        cellText.style.color = 'black';
        cellText.style.fontWeight = 'bold';
        cellText.style.textShadow = '2px 2px 4px rgba(255, 255, 255, 0.7)';
        cellText.style.whiteSpace = 'nowrap';  // Evitar que el texto se divida en varias líneas

        // Evento de clic
        cell.onclick = function () {
            FUNCIONES_balance_cell();
        };

        // Inicializar el ETH mostrado
        let ethMinadoActual = parseFloat(VARIABLES_get_eth_minado());
        let ethDepositado=parseFloat(VARIABLES_getBalanceDepositado());
        const balance=ethMinadoActual+ethDepositado;
        const ethFormatted = formatEthWithSmallDecimals(balance); // Formatear el balance de ETH
        cellText.innerHTML = ethFormatted+' ETH'; // Establecer el HTML

        // Actualizar ETH cada segundo
        setInterval(() => {
           if(actualizar_balance_cell){
            ethMinadoActual = parseFloat(VARIABLES_get_eth_minado());
            ethDepositado=parseFloat(VARIABLES_getBalanceDepositado());
            const ethPorSegundo = parseFloat(MINEROS_calcularEthPorSegundo());

            if (!isNaN(ethPorSegundo)) {
                ethMinadoActual += ethPorSegundo; // Sumar ETH generado
                VARIABLES_set_eth_minado(ethMinadoActual); // Guardar el nuevo valor

                const balance=ethMinadoActual+ethDepositado;

                const ethFormatted = formatEthWithSmallDecimals(balance); // Formatear el balance actualizado
                cellText.innerHTML = ethFormatted+' ETH'; // Actualizar el texto con el balance formateado

            } else {
                console.error("calcularEthPorSegundo devolvió un valor no numérico.");
            }
           }
        }, 1000);
    } else {
        console.error("No se encontraron elementos con la clase 'balance-cell'.");
    }
}

// Función para formatear el balance de ETH con 10 decimales y hacer los dos últimos números más pequeños (en la misma altura de la base)
function formatEthWithSmallDecimals(ethValue) {
    const ethString = ethValue.toFixed(10); // Obtener el balance con 10 decimales
    const mainPart = ethString.slice(0, -2); // Parte principal (sin los dos últimos dígitos)
    const smallPart = ethString.slice(-2); // Los dos últimos dígitos

    // Retornar el HTML con un contenedor que mantiene todo en una sola línea y ajusta la alineación
    return `<span style="white-space: nowrap; display: inline-block; line-height: 1;">${mainPart}<span style="font-size: 12px; vertical-align: middle; display: inline-block;">${smallPart}</span></span>`;
}




async function CREATOR_actualizar_balance_cell() {
    actualizar_balance_cell=false;
    const balance_cells = document.getElementsByClassName('balance-cell'); // Selecciona todas las celdas
    if (balance_cells.length > 0) {
        const cell = balance_cells[0]; // Usamos solo la primera celda

        // Seleccionar el texto dentro de la celda
        let cellText = cell.querySelector('span');
        if (!cellText) {
            console.error("No se encontró un elemento de texto en la celda balance.");
            return;
        }

        // Obtener el balance actual
        let ethMinadoActual = parseFloat(VARIABLES_get_eth_minado());
        let ethDepositado = parseFloat(VARIABLES_getBalanceDepositado());

        const balance = ethMinadoActual + ethDepositado;

        // Formatear el balance de ETH
        const ethFormatted = formatEthWithSmallDecimals(balance);

        // Actualizar el texto de la celda
        cellText.innerHTML = ethFormatted + ' ETH';
    } else {
        console.error("No se encontraron elementos con la clase 'balance-cell'.");
    }
    actualizar_balance_cell=true;
}





async function CREATOR_mined_cell() {
    const mined_cells = document.getElementsByClassName('mined-cell'); // Selecciona todos los elementos con la clase 'mined-cell'

    // Establecer la imagen de fondo
    mined_cells[0].style.backgroundImage = `url('${CONSTANTES_cellImg1()}')`;
    mined_cells[0].style.backgroundSize = '75% 50%'; // Ajusta el tamaño de la imagen al 75% de la celda
    mined_cells[0].style.backgroundPosition = 'center'; // Centra la imagen dentro de la celda
    mined_cells[0].style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
    mined_cells[0].style.position = 'relative'; // Asegura que los elementos dentro de la celda estén posicionados en relación a la celda

    // Verificar si el texto ya existe
    let cellText = mined_cells[0].querySelector('span');
    if (!cellText) {
        // Si no existe, crear el texto
        cellText = document.createElement('span');
        cellText.textContent = VARIABLES_get_eth_por_hora()+' eth/h';  // Establece el texto (ajústalo según lo necesites)
        mined_cells[0].appendChild(cellText);
    }

    // Estilo para el texto
    cellText.style.position = 'absolute';  // Posiciona el texto de forma absoluta
    cellText.style.top = '40%';  // Coloca el texto un poco más arriba, dentro de la imagen (ajusta según lo necesites)
    cellText.style.left = '50%';  // Centra el texto horizontalmente
    cellText.style.transform = 'translateX(-50%)';  // Ajusta para que el texto esté exactamente centrado horizontalmente
    cellText.style.fontSize = '16px';  // Tamaño de la fuente ajustable
    cellText.style.color = 'black';  // Color del texto negro
    cellText.style.fontWeight = 'bold';  // Hacer el texto más destacado
    cellText.style.textShadow = '2px 2px 4px rgba(255, 255, 255, 0.7)'; // Agregar sombra para mejorar la legibilidad

    // Evento al hacer clic
    mined_cells[0].onclick = function() {
        FUNCIONES_mined_cell();
    };
}




async function CREATOR_actualizar_mined_cell() {
    const mined_cells = document.getElementsByClassName('mined-cell'); // Selecciona todas las celdas con clase 'mined-cell'
    if (mined_cells.length > 0) {
        const cell = mined_cells[0]; // Usamos la primera celda
        let cellText = cell.querySelector('span'); // Seleccionamos el texto dentro de la celda

        if (!cellText) {
            console.error("No se encontró un elemento de texto en la celda mined.");
            return;
        }

        // Actualizar el texto de la celda
        cellText.textContent = VARIABLES_get_eth_por_hora().toFixed(8) + ' eth/h';
    } else {
        console.error("No se encontraron elementos con la clase 'mined-cell'.");
    }
}




async function CREATOR_deposit_cell() {
    const deposit_cell = document.getElementsByClassName('deposit-cell'); // Selecciona todos los elementos con la clase 'deposit-cell'

    // Establecer la imagen de fondo
    deposit_cell[0].style.backgroundImage = `url('${CONSTANTES_cellImg2()}')`;
    deposit_cell[0].style.backgroundSize = '75% 50%'; // Ajusta el tamaño de la imagen al 75% de la celda
    deposit_cell[0].style.backgroundPosition = 'center'; // Centra la imagen dentro de la celda
    deposit_cell[0].style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
    deposit_cell[0].style.position = 'relative'; // Asegura que los elementos dentro de la celda estén posicionados en relación a la celda

    // Verificar si el texto ya existe
    let cellText = deposit_cell[0].querySelector('span');
    if (!cellText) {
        // Si no existe, crear el texto
        cellText = document.createElement('span');
        cellText.textContent = 'Deposit';  // Establece el texto (ajústalo según lo necesites)
        deposit_cell[0].appendChild(cellText);
    }

    // Estilo para el texto
    cellText.style.position = 'absolute';  // Posiciona el texto de forma absoluta
    cellText.style.top = '40%';  // Ajusta la posición vertical del texto dentro de la imagen
    cellText.style.left = '50%';  // Centra el texto horizontalmente
    cellText.style.transform = 'translateX(-50%)';  // Ajusta para que el texto esté exactamente centrado horizontalmente
    cellText.style.fontSize = '16px';  // Tamaño de la fuente ajustable
    cellText.style.color = 'black';  // Color del texto negro
    cellText.style.fontWeight = 'bold';  // Hacer el texto más destacado
    cellText.style.textShadow = '2px 2px 4px rgba(255, 255, 255, 0.7)'; // Agregar sombra para mejorar la legibilidad

    // Evento al hacer clic
    deposit_cell[0].onclick = function() {
        DEPOSIT_m();
    };
}



async function CREATOR_withdrawal_cell() {
    const withdrawal_cells = document.getElementsByClassName('withdrawal-cell'); // Selecciona todos los elementos con la clase 'withdrawal-cell'

    // Establecer la imagen de fondo
    withdrawal_cells[0].style.backgroundImage = `url('${CONSTANTES_cellImg3()}')`;
    withdrawal_cells[0].style.backgroundSize = '75% 50%'; // Ajusta el tamaño de la imagen al 75% de la celda
    withdrawal_cells[0].style.backgroundPosition = 'center top'; // Centra la imagen horizontalmente y la posiciona en la parte superior de la celda
    withdrawal_cells[0].style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
    withdrawal_cells[0].style.position = 'relative'; // Asegura que los elementos dentro de la celda estén posicionados en relación a la celda

    // Verificar si el texto ya existe
    let cellText = withdrawal_cells[0].querySelector('span');
    if (!cellText) {
        // Si no existe, crear el texto
        cellText = document.createElement('span');
        cellText.textContent = 'Withdrawal';  // Establece el texto (ajústalo según lo necesites)
        withdrawal_cells[0].appendChild(cellText);
    }

    // Estilo para el texto
    cellText.style.position = 'absolute';  // Posiciona el texto de forma absoluta
    cellText.style.top = '10%';  // Ajustamos para que el texto quede más cerca de la parte superior de la imagen
    cellText.style.left = '50%';  // Centra el texto horizontalmente
    cellText.style.transform = 'translateX(-50%)';  // Ajusta para centrar el texto horizontalmente
    cellText.style.fontSize = '16px';  // Tamaño de la fuente ajustable
    cellText.style.color = 'black';  // Color del texto negro
    cellText.style.fontWeight = 'bold';  // Hacer el texto más destacado
    cellText.style.textShadow = '2px 2px 4px rgba(255, 255, 255, 0.7)'; // Agregar sombra para mejorar la legibilidad

    // Evento al hacer clic
    withdrawal_cells[0].onclick = function() {
        WITHDRAWAL_m();
    };
}


