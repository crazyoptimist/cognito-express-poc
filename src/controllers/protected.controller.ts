import express, { Request, Response } from 'express'

import AuthMiddleware from 'middlewares/auth.middleware'

class ProtectedController {
  public path = '/protected'
  public router = express.Router()
  private authMiddleware: AuthMiddleware

  constructor() {
    this.authMiddleware = new AuthMiddleware()
    this.initRoutes()
  }

  private initRoutes() {
    this.router.use(this.authMiddleware.verifyToken)
    this.router.get('/secret', this.home)
  }

  home(req: Request, res: Response) {
    res.send('the secret is cupcakes')
  }
}

export default ProtectedController
