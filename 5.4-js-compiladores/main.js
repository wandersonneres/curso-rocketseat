class User {
  constructor({name}) {
    this.name = name
  }
  sendMessage(){
    console.log("Mensagem enviada para:", this.name)
  }
}

let user = new User({name: 'Teste'})
user.sendMessage()