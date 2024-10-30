const jwt = require('jsonwebtoken');
const loginadmin = async (req, res) => {
    try {
        console.log(req.body)
        const { Id, password } = req.body
        if (Id === process.env.Id && password === process.env.password) {
            const token = jwt.sign(
                { id: Id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } 
            )
            return res.status(200).json({
                status: 'success',
                message: 'login successFully',
                token: token
            })
        } else {
            return res.status(404).json({
                status: 'faile',
                message: 'Id or password Invalid'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'faile',
            message: error.message
        })
    }
}

module.exports = { loginadmin }