import App from './app'
import HomeController from './controllers/home.controller';

const app = new App({
  port: 3000,
  controllers: [
    new HomeController()
  ],
  middlewares: []
})

app.listen();
