import { NextFunction, Request, Response } from 'express'
import { controller, get, use } from './decorators'

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request was made')
    next()
}

@controller('/auth')
class LoginController {

    @get('/login')
    @use(logger)
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
