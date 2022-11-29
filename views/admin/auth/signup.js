module.exports = ({ req }) => {
    return `
        <div>
            <form method="POST">
                <input name="email" type="text" placeholder="email" />
                <input name="password" type="text" placeholder="password" />
                <input name="passwordConfirmation" type="text" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `;
};