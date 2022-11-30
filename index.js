const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'session',
    keys: ['bnvhjweggiuwypr8iho2jnb1f65fgu'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
    console.log('Listening');
});