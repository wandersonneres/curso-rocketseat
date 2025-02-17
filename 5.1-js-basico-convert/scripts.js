//cotacao de moedas do dia
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

//Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex,"");
})

//Capturando o evento de submit do formulario
form.onsubmit = (event) => {
    event.preventDefault();
    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$");
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€");   
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£");
            break; 
    }
}

//funcao para converter a moeda
function convertCurrency(amount, price, symbol){
    try {
        //Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        //calcula valor total
        let total = (amount * price)

        if(isNaN(total)){
            return alert("Por favor, digite o valor corretamente.")
        }

        total = formatCurrencyBRL(total).replace("R$","")
        //exibe valor total
        result.textContent = `${total} Reais`
        //aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")   
    } catch (error) {
        console.log(error);
        // remove a classe que exibe o footer na tela
        footer.classList.remove("show-result")  
        alert("Não foi possivel converter. Tente novamente mais tarde.")   
    }    
}

function formatCurrencyBRL(value){
    return Number(value).toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
    })
}