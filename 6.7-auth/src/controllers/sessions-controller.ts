import { Request, Response } from "express"

class SessionsController {
  async create(request: Request, response: Response) {
    return response.json({ message: "ok"})
  }
}

export { SessionsController }
