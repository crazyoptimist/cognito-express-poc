import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import fetch from 'node-fetch'

type Jwk = {
  alg: string
  e: string
  kid: string
  kty: 'RSA'
  n: string
  use: string
}

type JwkRes = {
  keys: Jwk[]
}

let pems = {}

class AuthMiddleware {
  private poolRegion = 'us-west-2'
  private userPoolId = 'us-west-2_1pp6JvzY1'

  constructor() {
    this.setUp()
  }

  verifyToken(req: Request, res: Response, next): void {
    const token = req.header('Auth')

    if (!token) {
      res.status(401).end()
    }

    let decodeJwt: any = jwt.decode(token, { complete: true })
    if (!decodeJwt) {
      res.status(401).end()
    }

    let kid = decodeJwt.header.kid
    let pem = pems[kid]
    if (!pem) {
      res.status(401).end()
    }

    jwt.verify(token, pem, (err, payload) => {
      if (err) {
        res.status(401).end()
      }
      next()
    })
  }

  private async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`
    try {
      const response = await fetch(URL)
      if (response.status !== 200) {
        throw `cognito public key request not successful`
      }
      const data = await response.json()
      const { keys } = data as JwkRes
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const jwk = {
          alg: key.alg,
          e: key.e,
          kid: key.kid,
          kty: key.kty,
          n: key.n,
          use: key.use,
        }
        const pem = jwkToPem(jwk)
        pems[key.kid] = pem
      }
      console.log('got all pems')
    } catch (error) {
      console.log(error)
      console.log('could not fetch jwks')
    }
  }
}

export default AuthMiddleware
