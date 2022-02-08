import AWS from 'aws-sdk'
import crypto from 'crypto'

class CognitoService {
  private config = {
    region: 'us-west-2',
  }
  private clientId: string = '5tk70rct62f2c9q35skqhhimpk'
  private clientSecret: string = '1gvkkbg1kf0e3kfa27cr8r0742as890260aat5si2kqe2j5h9p8j'
  private cognitoIdentity: any

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config)
  }

  public async signUpUser(
    username: string,
    password: string,
    userAttr: Array<any>,
  ): Promise<boolean> {
    const params = {
      ClientId: this.clientId,
      Password: password,
      Username: username,
      SecretHash: this.generateHash(username),
      UserAttributes: userAttr,
    }

    try {
      const data = await this.cognitoIdentity.signUp(params).promise()
      console.log(data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  private generateHash(username: string): string {
    return crypto
      .createHmac('SHA256', this.clientSecret)
      .update(username + this.clientId)
      .digest('base64')
  }
}

export default CognitoService
