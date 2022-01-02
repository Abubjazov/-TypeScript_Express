import { NextFunction, Request, Response } from 'express'
import { bodyValidator, controller, get, post, use } from './decorators'

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

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const {email, password, } = req.body
    
        if (email === 'abubjazov@mail.ru' && password === '123') {
            req.session = { 
                loggedIn: true,
                login: email
            }
            res.redirect('/')
        } else {
            res.send('Invalid email or password')
        }
    }
}
