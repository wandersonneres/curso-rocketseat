let username : string

username = "wanderson"

let total : number
total = 3

total = 7.5

let totaln = 7.5

let names: string[] = ["Rodrigo","Wanderson"]
let numbers = []

function sum(x: number, y: number) : number{
    const result = x + y
    
    return result
}

const result = sum(3,2)

const showMessage = (name:string): string => {
    const message = "Olá" + name
    return message
}

showMessage("Rodrigo")


let user : {name: string, age: number, urlAvatar?: string } = {name:"Wanderson", age:27}

// function signIn(email: string, password: string){

// }

// signIn("Rodrigo","123")

function signIn({ email, password}:{email:string,password:string}){
    console.log("Usuario " + email)
}

signIn({email: "Rodrigo@email.com",password: "123"})

// interface Product {
//     id: number,
//     name: string,
// }

// function newProduct(product:Product) {

// }

// newProduct({id:1,name:"teste"})

// interface Person {
//     id: number,
//     name: string
// }

// interface Teacher extends Person{
//     subjects: string[]
// }

// interface Student extends Person{
//     age: number
// }

// let teacher: Teacher = {id: 1, name: "Wanderson", subjects:["JavaScript","TypeScript"]}

// let student: Student = {id: 2, name: "Larry", age: 25}

type Product = {
    id: number,
    name: string
}
function newProduct(product: Product) {
}

type SelectResponse = Product[] | null

function selectProducts(): SelectResponse {
    return null
}

type Person = {
    id: number,
    name: string
}

type Teacher = Person & {
    subjects: string[]
}
type Student = Person & {
    age: number
}

let teacher : Teacher
let student : Student

// Interface x Type

interface IBaseProduct {
    price: number
}

interface IProduct extends IBaseProduct {
    id: number,
    name: string
}

interface IProduct {
    quantity: number
}

type TBaseProduct = {
    price: number
}

type TProduct = TBaseProduct & {
    id: number,
    name: string
}

let product1: IProduct = { id: 1, name: "Produto 1", price: 500, quantity: 12}
let product2: TProduct = { id: 2, name: "Produto 2", price: 550}

type TypeString = string
type TypeNumber = number

// interface X extends string {}

// asserção de tipos
type UserResponse = {
    id: number;
    name: string;
    avatar: string;
}

let userResponse = {} as UserResponse;

// restrigindo valores

type Size = "small" | "medium" | "large"

let size: Size

size = "small"

// enums 
enum Profile {
    Admin = 1,
    Client = 2,
    Seller = 3
}

let profile: number = Profile.Admin
console.log(Profile.Seller)

//Generic
/**
 * S => state
 * T => type
 * K => key
 * V => value
 * E => element
 */

function useState<T extends number | string = string>() {
    let state: T;

    function get(){
        return state;
    }

    function set(newValue: T){
        state = newValue;
    }

    return {get, set};
}

let newState = useState();
newState.get();
newState.set("Rodrigo");
//newState.set(123);
newState.set("Amanda");

// Partial
interface User {
    id: number,
    name: string,
    email: string
}

const newUser: User = { id: 1, name: "Rodrigo", email: "rodrigo@email.com"}

const updatedUser: Partial<User> = { name: "Rodrigo Gonçalves" }

// Pick
interface Book {
    title: string
    pages: number
    author: string
    description: string
}

interface BookPreview {
    title: string
}

const book1: BookPreview = { title: "TypeScript"}
const book2: Pick<Book, "title" | "pages"> = { title: "TypeScript", pages: 150}

// Omit
interface Book {
    title: string
    pages: number
    author: string
    description: string
}

const book: Omit<Book, "description" | "pages"> = { title: "TypeScript", author: "Rodrigo"}


//Record
// Cria um objeto onde todas as chaves são strings e os valores são números
const scores: Record<string, number> = {
    "Rodrigo": 10,
    "Mayk": 15
}

// Limitar valores
type Profile1 = "admin" | "user" | "guest"

const user1: Record<Profile1, number> = {
    "admin": 1,
    "guest": 2,
    "user": 3
}

// Objetos personalizados
interface User1 {
    name: string
    email: string
}

const users: Record<number, User1> = {
    1: { name: "Rodrigo", email: "rodrigo@email.com" },
    2: { name: "Rodrigo", email: "rodrigo@email.com" },
}


//typeof
interface Product2 {
    id: number
    name: string
    quantity: number
}


const product3: Product2 = { id: 1, name: "Produto 1", quantity: 3}

const product4: typeof product3 = { id: 2, name: "Produto 2", quantity: 5}


//keyof
const icons = {
    "home": "./path/home.svg",
    "add": "./path/add.svg",
    "remove": "./path/remove.svg",
}

type Icon = typeof icons

const icon: keyof Icon = "add"
