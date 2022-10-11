const db = require("../models/")
const jwt = require('json-web-token')

const { User } = db;

async function defineCurrentUser(req, res, next){
    try {
        const [ method, token ] = req.headers.authorization.split(' ')
        if(method == 'Bearer'){
            const result = await jwt.decode(process.env.JWT_SECRET, token)
            const { userId } = result.value
            console.log(userId)
            let user = await User.findOne({ 
                where: {id: userId}
            })
            console.log("FOUND?"+user)
            req.currentUser = user
        }
        next()
    } catch(err){
        console.log("NOT FOUND?")
        req.currentUser = null
        next() 
    }
}

module.exports = defineCurrentUser
