import dayjs from "dayjs"
import { apiConfig } from "./api-config"

export async function scheduleFetchByDay({ date }) {
    try {
        const response = await fetch(`${apiConfig.baseUrl}/schedules`)

        
        const data = await response.json()
        
        //filtra os agendamentos pelo dia selecionado
        const dailySchedules = data.filter((schedule) =>
            dayjs(date).isSame(dayjs(schedule.when), "day")
        );

        console.log(dailySchedules)

        return data
    } catch (error) {
        console.error(error)
        alert("Erro ao buscar agendamentos")
    }
}