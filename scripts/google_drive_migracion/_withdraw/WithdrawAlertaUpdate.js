async function WithdrawAlertaUpdate_m(withdrawAlerta) {
    let intentos = 0;
    while (intentos < 10) {
        try {
// Crear un Promise para esperar la respuesta del servidor
const resultado = await new Promise((resolve, reject) => {
                // Enviar solicitud para obtener pendientes
                socket.emit("WithdrawAlertaUpdate", {
                    userId: VARIABLES_get_chatId(),
                    password:VARIABLES_get_password(),
                    withdrawAlerta:withdrawAlerta
                });

                // Escuchar la respuesta del servidor
                socket.once("WithdrawAlertaUpdateResponse", (data) => {
                    if (data.error) {
                        reject(`Error: ${data.error}`);
                    } else {
                        resolve(data);  // Resuelve con el texto directamente
                    }
                });
            });

            console.log("Resultado recibido:", resultado);
            return resultado;  // Devolver el resultado si lo obtenemos exitosamente

        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }

        intentos++;
    }

    // Si no se obtiene resultado después de 10 intentos
    return null;
}

