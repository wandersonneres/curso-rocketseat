import { scheduleCancel } from "../../services/schedule-cancel.js"
import { schedulesDay } from './load.js'

const periods = document.querySelectorAll('.period');

//gerar evento click para cada periodo(manha, tarde e noite)
periods.forEach((period) => {
    period.addEventListener('click', async (event) => {
        if (event.target.classList.contains('cancel-icon')){
            //obter a li pai do elemento clicado
            const item = event.target.closest('li');
            const { id } = item.dataset
            // confirma que o id foi selecionado
            if (id) {
                //confirma se o usuario quer cancelar
                const isConfirm = confirm(
                    "Tem certeza que deseja cancelar o agendamento?"
                )

                // cancela na api e carrega os agendamentos
                if (isConfirm) {
                    await scheduleCancel({id})
                    schedulesDay()
                }
            }
        }
    })
})