import { scheduleFetchByDay } from '../../services/schedule-fetch-by-day.js'
import { schedulesShow } from './show.js'
import {hoursLoad} from '../form/hours-load.js'

const selectedDate = document.getElementById('date')

export async function schedulesDay() {
    //Busar na API os agendamentos para carregar do lado direito

    const date = selectedDate.value

    //busca na api os agendamentos
    const dailySchedules = await scheduleFetchByDay({ date })

    schedulesShow({ dailySchedules })

    // renderiza as horas disponiveis
    hoursLoad({date})
}