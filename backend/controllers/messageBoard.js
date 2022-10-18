const router = require('express').Router()
const db = require("../models")

const sequelize = require('../models').sequelize;


const { messageBoard } = db

router.post('/postmessage', async (req, res) => {
    let {userId, chatContent} = req.body
    
    const chat = await MessageBoard.create({
        senderId: userId,
        chat: chatContent
    })

    res.json(chat)
})

router.get('/getallmessages', async (req, res) => {
    const message = await messageBoard.findAll({
        attributes:['title','id', 'authorId'],
        order:[['createdAt', 'ASC']],
        limit: 10 })

    res.json(message)
})

router.post('/new', async (req, res) => {
    let authorId = req.body.authorId
    let title = req.body.title
    let content = req.body.content
    console.log(authorId,title,content)

    const newMessageBoard = await messageBoard.create({
        authorId: authorId,
        title: title,
        content: content
    })
    res.json(newMessageBoard)
})
router.get('/:messageId', async (req, res) => {
    let messageId = Number(req.params.messageId)
    if (isNaN(messageId)) {
        res.status(404).json({ message: `Invalid id "${messageId}"` })
    } else {
        const foundMessage = await messageBoard.findOne({
            where: { id: messageId },
        })
        if (!foundMessage) {
            res.status(404).json({ message: `Could not find message with id "${messageId}"` })
        } else {
            res.json(foundMessage)
        }
    }
})
router.put('/update/:messageId', async (req, res) => {
    let updatedCommenter = req.body[0]
    let updatedComment = req.body[1]
    let messageBoardId = req.body[2]
    console.log(updatedComment,updatedCommenter,messageBoardId)
    const updateMessageBoard = await messageBoard.update({
        comment: updatedComment,
        commenterId: updatedCommenter
    },{
        where: {id: messageBoardId }
    })
    res.json(updateMessageBoard)
})



module.exports = router