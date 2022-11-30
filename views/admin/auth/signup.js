const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
    return layout({
        content: `
            <div>
                <form method="POST">
                    <input name="email" type="text" placeholder="email" />
                    ${getError(errors, 'email')}
                    <input name="password" type="text" placeholder="password" />
                    ${getError(errors, 'password')}
                    <input name="passwordConfirmation" type="text" placeholder="password confirmation" />
                    ${getError(errors, 'passwordConfirmation')}
                    <button>Sign Up</button>
                </form>
            </div>
        `
    });
};