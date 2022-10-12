const router = require('express').Router()
const db = require("../models/")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    let {password, ...rest} = req.body
    
    // const user = await User.create({
    //     ...rest,
    //     role: 'user',
    //     birthday: undefined,
    //     gender: undefined,
    //     softskills:{
    //         "ARTS":0,
    //         "SCIENCE":0,
    //         "ATHLETICS":0,
    //         "COMMUNICATION":0,
    //         "ORGANIZATION":0,
    //         "ADAPTATION":0
    //     },
    //     passwordHash: await bcrypt.hash(password, 12)
    // })
    // res.json(user)
})


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router