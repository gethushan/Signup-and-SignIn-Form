const router = require('express').Router()
const User = require('./userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register' , async(req,res) => {
    try {
        var emailExist = await User.findOne({email:req.body.email})
        if(emailExist){
            return res.status(400).json("Email already exist")
    
        }
        // Password hash
        var hash = await bcrypt.hash(req.body.password, 10)
    
        const user = new User({
            email:req.body.email ,
            password: hash,
        })

        var data = user.save()
        res.json(user)
    } catch (error) {
        res.send(error)
    }

})

router.post('/login',async (req,res) =>{
    try {
        var userData = await User.findOne({email:req.body.email})
        if(!userData){
            return res.status(400).json("Email not exist")
        }
        var validPsw = await bcrypt.compare(req.body.password,userData.password)

        if (!validPsw) {
            return res.status(400).json("Invalid Password")
        }
        var userToken = await jwt.sign({email:userData.email},process.env.JSON_TOKEN)
        res.header('auth',userToken)
        res.json(userToken)
        
    } catch (error) {
        res.json(error)
    }
})

const validUser = (req,res,next) =>{
    var token = req.header('auth')
    req.token = token
    next()
}

router.get('/getAll', validUser ,async (req,res) =>{
    jwt.verify(req.token,'ragasiyam', async(err,data) =>{
        if(err){
            res.json(err)
            console.log(err)
        } else{
            const data = await User.find().select(['-password'])
            res.json(data) 
        }
    })
})


module.exports = router;