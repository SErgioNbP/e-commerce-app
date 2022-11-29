const usersRepo = require('../../repositories/users');

app.get('/signup', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" type="text" placeholder="email" />
                <input name="password" type="text" placeholder="password" />
                <input name="passwordConfirmation" type="text" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/signup', async (req, res) => {
    const {
        email,
        password,
        passwordConfirmation
    } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email already in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Password must match');
    }

    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id; // Added by cookie session

    res.send('Account created');

});

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});

app.get('/signin', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" type="text" placeholder="email" />
                <input name="password" type="text" placeholder="password" />
                <button>Sign In</button>
            </form>
        </div>
    `);
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePassword(
        user.password, 
        password
    );
    if (!validPassword) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;

    res.send('You signed in successfully!');
});