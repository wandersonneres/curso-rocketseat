import dayjs from 'dayjs';

import {openingHours} from '../../utils/opening-hours.js';
import { hoursClick } from './hours-click.js';

const hours = document.getElementById('hours')

export function hoursLoad({ date }) {
    
    hours.innerHTML = '';

    const opening = openingHours.map((hour) => {
        const [scheduleHour] = hour.split(':');    
        
        const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs());
       
        return {
            hour,
            avaliable: isHourPast,
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