import dayjs from 'dayjs';

import {openingHours} from '../../utils/opening-hours.js';
import { hoursClick } from './hours-click.js';

const hours = document.getElementById('hours')

export function hoursLoad({ date, dailySchedules }) {
    
    //limpar lista de horarios
    hours.innerHTML = '';

    //lista de horarios ocupados
    const unavailableHours = dailySchedules.map((schedule) => 
        dayjs(schedule.when).format('HH:mm')
    )
    
    const opening = openingHours.map((hour) => {
        const [scheduleHour] = hour.split(':');    
        
        // adiciona a hora na date e verifica se esta no passado
        const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs());
       
        const avaliable = !unavailableHours.includes(hour) && !isHourPast

        return {
            hour,
            avaliable,
        }
    })

    opening.forEach(({ hour, avaliable }) => {
        const li = document.createElement('li')

        li.classList.add('hour')
        li.classList.add(avaliable ? 'hour-avaliable' : 'hour-unavailable')

        li.textContent = hour

        if (hour == "9:00") {
            hourHeaderAdd("Manhã")
        } else if (hour == "13:00") {
            hourHeaderAdd("Tarde")
        } else if (hour == "19:00") {
            hourHeaderAdd("Noite")
        }     

        hours.append(li)
    })

    hoursClick();
}

function hourHeaderAdd(title){
    const header = document.createElement('li')
    header.classList.add('hour-period')
    header.textContent = title
    hours.append(header)
}