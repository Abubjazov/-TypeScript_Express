import { Request, Response, Router } from 'express';

const router = Router()

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

router.post('/login', (req: Request, res: Response) => {
    const {email, password} = req.body

    res.send(email + " " + password)
})

export { router }
