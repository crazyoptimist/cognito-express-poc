import express, { Request, Response } from 'express'

import { body, validationResult } from 'express-validator'

class AuthController {
  public path = '/auth'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  private initRoutes() {
    this.router.post('/signup', this.validateBody('signUp'), this.signUp)
    this.router.post('/signin', this.validateBody('signIn'), this.signIn)
    this.router.post('/verify', this.validateBody('verify'), this.verify)
  }

  signUp(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() })
    }
    console.log('signup body is valid')
    return res.status(200).end()
  }

  signIn(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() })
    }
    console.log('signin body is valid')
    return res.status(200).end()
  }

  verify(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() })
    }
    console.log('verify body is valid')
    return res.status(200).end()
  }

  private validateBody(type: string) {
    switch (type) {
      case 'signUp':
        return [
          body('username').notEmpty().isLength({min: 6}),
          body('email').notEmpty().normalizeEmail().isEmail(),
          body('password').isString().isLength({min: 8}),
          body('birthdate').exists().isISO8601(),
          body('name').notEmpty().isString(),
          body('family_name').notEmpty().isString(),
        ]
      case 'signIn':
        return [
          body('username').notEmpty().isLength({min: 6}),
          body('password').isString().isLength({min: 8}),
        ]
      case 'verify':
        return [
          body('username').notEmpty().isLength({min: 6}),
          body('code').isString().isLength({min: 6, max: 6}),
        ]
    }
  }
}

export default AuthController
