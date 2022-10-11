const router = require('express').Router()
const db = require("../models/")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    let {password, ...rest} = req.body
    
    const user = await User.create({
        ...rest,
        role: 'user',
        passwordHash: await bcrypt.hash(password, 12)
    })
    res.json(user)
})

module.exports = router