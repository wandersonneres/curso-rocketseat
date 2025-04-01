export function hoursClick(){
    const hours = document.querySelectorAll('.hour-avaliable');

    hours.forEach((avaliable) => { 
        avaliable.addEventListener('click', (selected) => {
            
            hours.forEach((hour) => {
                hour.classList.remove('hour-selected')
            })

            selected.target.classList.add('hour-selected')
        })
    })
}