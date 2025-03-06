// Seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    //Obtem o valor atual do input e remove os caracteres não numericos
    let value = amount.value.replace(/\D/g,"")

    //transforma o valor em centavos
    value = Number(value)/100

    //atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR",{
        style : "currency",
        currency: "BRL",   
    })
    return value
}


//Captura o evento de submit do formulario para obter os valores.
form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense)

}

//Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        //criar o elemento para adicionar na lista.
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //cria categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona nome e categoria na div das informacoes da despesa
        expenseInfo.append(expenseName, expenseCategory)

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","")}`

        //cria o icone de remove
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src","img/remove.svg")
        removeIcon.setAttribute("alt","remover")

        //adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //adiciona o item na lista
        expenseList.append(expenseItem)

        //limpar o formulario para adicionar um novo
        formClear();

        //atualiza os totais
        updateTotals();

    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas.")
        console.log(error.message)
    }
}

//Atualiza os totais
function updateTotals(){
    try {
        //Recupeta todos os itens (li) da lista (ul)
        const items = expenseList.children
        
        //atualiza itens da lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
        
        //variavel para incrementar o total
        let total = 0

        //percorre cada item da lista
        for( let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")
            let value = itemAmount.textContent.replace(/[^\d,]/g,"").replace(",",".")
            value = parseFloat(value)
            //verifica se é um numero valido
            if (isNaN(value)){
                return alert("Não foi possivel calcular o total. O valor não parecer ser um numero")
            }

            total += Number(value)
        }
        
        //criar a span para adicionar o r$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"
        
        //formata o valor e remove o R$ que será exibido pelo small com um estilo
        total = formatCurrencyBRL(total).toUpperCase().replace("R$","")

        //limpa o conteudo do elemento
        expensesTotal.innerHTML = ""

        //adiciona o simbolo da moeda e valor total formatado
        expensesTotal.append(symbolBRL, total)
        
        //expensesTotal.textContent = formatCurrencyBRL(total)
    } catch (error) {
        console.log(error)
        alert("Não foi possivel atualizar os totais")
    }
}


//Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function(event){
    //verifica se o elemento clicado é o icone de remover
    if (event.target.classList.contains("remove-icon")){
        //obter a li pai do elemento clicado
        const item = event.target.closest(".expense")
        item.remove()
    }
    updateTotals()
})


function formClear(){
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus();
} 