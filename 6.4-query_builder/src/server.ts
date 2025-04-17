import express, { Request, Response } from "express"
import { knex } from "./database/knex"
import { request } from "http"

const app = express()
app.use(express.json())

app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body

  await knex("courses").insert({ name })
  //await knex.raw("INSERT INTO courses(name) values (?)",[name])

  return response.status(201).json()
})

app.get("/courses", async (request: Request, response: Response) => {
  //const courses = await knex.raw("select * from courses")  
  const courses = await knex("courses").select().orderBy("name")
  return response.json(courses)
})

app.put("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params
  const { name } = request.body
  await knex("courses").update({ name }).where({ id })
  return response.json()
})

app.delete("/courses/:id", async(request: Request, response: Response) => {
  const { id } = request.params
  await knex("courses").delete().where({ id })
  return response.json()   
})

app.post("/modules",async(request: Request, response: Response) => {
  const {name, course_id} = request.body
  await knex("course_modules").insert({name, course_id})
  return response.status(201).json()  
})

app.get("/modules", async(request: Request, response: Response) => {
  const modules = await knex("course_modules").select()
  return response.json(modules)   
})

app.get("/courses/:id/modules",async (request: Request, response: Response) => {
  const { id } = request.params
  const courses = await knex("courses")
    .select("course_modules.id","course_modules.name as module", "courses.name as name")
    .join("course_modules","courses.id","course_modules.course_id")
    .where("courses.id",id)

  return response.json(courses)     
})


app.listen(3333, () => console.log(`Server is running on port 3333`))
