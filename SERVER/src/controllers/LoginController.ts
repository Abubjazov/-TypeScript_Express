import { Request, Response } from 'express'
import { controller, get } from './decorators'

@controller('/auth')
class LoginController {

    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(
            `
            <div>
                <h1>Welcome to our website</h1>
                <hr>
                <form method="POST">
                    <div>
                        <label>Your Email</label>
                        <input name="email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" type="password" />
                    </div>
                    <button type="submit">Log in</button>
                </form>       
            </div>
            `
        )
    } 
}
