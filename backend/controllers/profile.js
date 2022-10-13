const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/create', async (req, res) => {
    let {password, ...rest} = req.body
    
    const user = await User.create({
        ...rest,
        role: 'user',
        username: null,
        title: null,
        profession: [""],
        biography: null,
        skillList0:[""],
        skillList1:[""],
        skillList2:[""],
        skillList3:[""],
        skillList4:[""],
        skillList5:[""],
        skillLevel:[0,0,0,0,0,0],
        maxSkillLevel:0,
        passwordHash: await bcrypt.hash(password, 12)
    })
    res.json(user)
})

router.put('/update', async (req, res) => {
    let {...rest} = req.body
    let userId = req.body.id
    const user = await User.update({
        ...rest,
    },{
        where: {id: userId }
    })
    res.json(user)
})


router.get('/:userId', async (req, res) => {
    let userId = Number(req.params.userId)
    if (isNaN(userId)) {
        res.status(404).json({ message: `Invalid id "${userId}"` })
    } else {
        const foundUser = await User.findOne({
            where: { id: userId },
        })
        if (!foundUser) {
            res.status(404).json({ message: `Could not find user with id "${userId}"` })
        } else {
            res.json(foundUser)
        }
    }
})

module.exports = router