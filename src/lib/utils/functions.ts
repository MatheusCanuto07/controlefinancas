/**
 * Converte um objeto Date para timestamp (milissegundos desde 01/01/1970)
 * @param {Date} data - Objeto Date a ser convertido
 * @returns {number} Timestamp em milissegundos
 */
export function dataParaTimestamp(data: Date): number {
  const dataSemHora = new Date(data.getFullYear(), data.getMonth(), data.getDate());
  return dataSemHora.getTime();
}

/**
 * Converte um timestamp (milissegundos) para objeto Date
 * @param {number} timestamp - Número de milissegundos desde 01/01/1970
 * @returns {Date} Objeto Date criado a partir do timestamp
 */
export function timestampParaData(timestamp: number): Date {
    return new Date(timestamp);
}

export function getTipoCartao(tipo : string){
  return tipo == "1" ? "Crédito" : "Débito";
}