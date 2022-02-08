import express from 'express'
import { Application } from 'express'

type Controller = {
  path: string
  router: express.Router
}

class App {
  public app: Application
  public port: number

  constructor(appInit: { port: number; middlewares: any; controllers: Controller[] }) {
    this.app = express()
    this.port = appInit.port;

    this.routes(appInit.controllers)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App has started on port ${this.port}`)
    })
  }

  private routes(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use(controller.path, controller.router)
    })
  }
}

export default App
