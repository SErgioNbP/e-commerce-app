const layout = require('../layout');

module.exports = () => {
    return layout({
        content: `
            <div>
                <form method="POST">
                    <input name="email" type="text" placeholder="email" />
                    <input name="password" type="text" placeholder="password" />
                    <button>Sign In</button>
                </form>
            </div>
        `
    });
};