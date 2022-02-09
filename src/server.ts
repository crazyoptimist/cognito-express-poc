import App from 'app'
import bodyParser from 'body-parser'

import HomeController from 'controllers/home.controller'
import AuthController from 'controllers/auth.controller'
import ProtectedController from 'controllers/protected.controller'

const app = new App({
  port: 3000,
  controllers: [new HomeController(), new AuthController(), new ProtectedController()],
  middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
})

app.listen()
