const router = require('express').Router()
const db = require("../models/")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/create', async (req, res) => {
    let {password, ...rest} = req.body
    
    const user = await User.create({
        ...rest,
        role: 'user',
        username: null,
        title: null,
        profession: null,
        skillList:["","","","","",""],
        skillLevel:[0,0,0,0,0,0],
        maxSkillLevel:0,
        passwordHash: await bcrypt.hash(password, 12)
    })
    res.json(user)
})

router.put('/update', async (req, res) => {
    let {...rest} = req.body
    let findById = req.body.id
    const user = await User.update({
        ...rest,
    },{
        where: {id: findById }
    })
    res.json(user)
})

module.exports = router