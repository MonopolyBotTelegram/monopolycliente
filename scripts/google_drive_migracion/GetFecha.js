async function GetFecha_n(){
const fecha=await GetFecha_m();
VARIABLES_set_hora_actual(fecha);
return fecha;
}


async function GetFecha_m() {
    let intentos = 0;
    while (intentos < 10) {
        try {
// Crear un Promise para esperar la respuesta del servidor
            const resultado = await new Promise((resolve, reject) => {
                // Enviar solicitud para obtener pendientes
                socket.emit("fecha", {
                    userId: VARIABLES_get_chatId() // Asegúrate de esperar la respuesta de VARIABLES_get_chatId
                });

                // Escuchar la respuesta del servidor
                socket.once("FechaResponse", (data) => {
                    if (data.error) {
                        reject(`Error: ${data.error}`);
                    } else {
                        resolve(data);  // Resuelve con el texto directamente
                    }
                });
            });

            console.log("fecha:", resultado);

            return resultado;  // Devolver el resultado si lo obtenemos exitosamente

        } catch (error) {
            console.error("Error fecha:", error);
        }

        intentos++;
    }

    // Si no se obtiene resultado después de 10 intentos
    return null;
}




