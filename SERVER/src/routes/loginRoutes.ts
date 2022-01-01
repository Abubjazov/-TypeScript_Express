import { NextFunction, Request, Response, Router } from 'express'

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next()
        return
    }
    
    res.status(403)
    res.send('Access denied')
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <h1>Welcome to our website ${req.session.login}</h1>
            <hr>
            <p>You are logged in</p>
            <a href="/logout">Logout</a>     
        </div>
        `)
    } else {
        res.send(`
        <div>
            <h1>Sorry</h1>
            <hr>
            <p>You are not logged in</p>
            <a href="/login">Login</a>     
        </div>
        `)
    }
})

router.get('/login', (req: Request, res: Response) => {
    res.send(`
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
})

router.post('/login', (req: RequestWithBody, res: Response) => {
    const {email, password, } = req.body

    if (email && password && email === 'abubjazov@mail.ru' && password === '123') {
        req.session = { 
            loggedIn: true,
            login: email
        }
        res.redirect('/')
    } else {
        res.send('Invalid email or password')
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route, logged in user')
})

export { router }
