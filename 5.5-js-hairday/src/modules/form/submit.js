import dayjs from "dayjs"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")


// date atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// carrega a data atual
selectedDate.value = inputToday

//definir data minima
selectedDate.min = inputToday

form.onsubmit = (event) => {
    event.preventDefault()
    
    try {
        const name = clientName.value.trim()

        if (!name) {
            return alert("Preencha o nome do cliente")            
        }

        const hourSelected = document.querySelector(".hour.selected")

        if (!hourSelected) {
            return alert("Selecione um horário")
        }

        const [hour] = hourSelected.innerHTML.split(":")

        const when = dayjs(selectedDate.value).add(hour,"hour")

        const id = new Date().getTime() 

    } catch (error) {
        alert("Erro ao enviar o agendamento")
        console.error(error)
    }
}