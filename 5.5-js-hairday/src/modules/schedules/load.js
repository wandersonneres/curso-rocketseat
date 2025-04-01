import {hoursLoad} from '../form/hours-load.js'

const selectedDate = document.getElementById('date')

export function schedulesDay() {
    //Busar na API os agendamentos para carregar do lado direito

    const date = selectedDate.value
    // renderiza as horas disponiveis
    hoursLoad({date})
}