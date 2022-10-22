//routes for user based things

const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt');
const sequelize = require('../models').sequelize;
const { User } = db

//create new user
router.post('/create', async (req, res) => {
    let {password, ...rest} = req.body
    const user = await User.create({
        ...rest,
        role: 'user',
        username: "",
        title: "",
        profession: [""],
        biography: "",
        skillList0:[""],
        skillList1:[""],
        skillList2:[""],
        skillList3:[""],
        skillList4:[""],
        skillList5:[""],
        skillLevel:[0,0,0,0,0,0],
        maxSkillLevel:0,
        isOnline: false,
        hubPosition:[0,0],
        passwordHash: await bcrypt.hash(password, 12)
    })
    res.json(user)
})

//update user details
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

//fetches random and simpler user data
router.get('/getrandomusers/', async (req, res) => {
    const users = await User.findAll({
        attributes:['id','firstName','lastName','userName','hubPosition', 'isOnline'],
        order:[sequelize.fn('RANDOM')],
        limit: 5 })
    res.json(users)
})

//fetches simple user data
router.get('/getusers/', async (req, res) => {
    const users = await User.findAll({
        attributes:['id','firstName','lastName','userName'],
        })
    res.json(users)
})

//fetches info of user via id
router.get('/:userId', async (req, res) => {
    let userId = Number(req.params.userId)
    if (isNaN(userId)) {
        res.status(404).json({ message: `Invalid id "${userId}"` })
    } else {
        const foundUser = await User.findOne({
            attributes:['id',
            'firstName',
            'lastName',
            'userName',
            'email',
            'title',
            'profession',
            'biography',
            'skillList0',
            'skillList1',
            'skillList2',
            'skillList3',
            'skillList4',
            'skillList5',
            'skillLevel',
            'maxSkillLevel',
            'isOnline',
            'hubPosition',
        ],
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