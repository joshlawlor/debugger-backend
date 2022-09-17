const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const showAll = (req,res) => {
    User.find({}, (err, users) => {
        if(err) {
            res.status(400).json(err)
            return 
        }
        res.json(users)
    })
}

const showPosts = (req,res) => {
    const posts = req.user.posts
    res.json(posts)
}

const signUp = (req, res) =>{
    const user = new User(req.body);
    user.save()
    const token = createJWT(user)
    console.log('Signup function:', token, user)
    res.json({token})
}


async function login(req, res) {
    try {
        console.log('BODY',req.body)
      const user = await User.findOne({ email: req.body.email }).select('+password');
    //   console.log(user);
      if (!user) return res.status(401).json({ err: 'bad credentials' });
      user.comparePassword(req.body.password, (err, isMatch) => { //LITERALLY JUST NEEDED TO CHANGE pw TO PASSWORD 
        if (isMatch) {
          const token = createJWT(user);
          res.json({ token });
        } else {
          return res.status(401).json({ err: 'bad credentials' });
        }
      });
    } catch (err) {
      return res.status(400).json({err: 'lin 39'});
    }
  }

  async function getUser(req, res) {
    try {
        console.log('BODY',req.body)
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (!user) return res.status(401).json({ err: 'bad credentials' });
      const token = createJWT(user);
          res.json({ token });
    } catch (err) {
      return res.status(400).json({err: 'lin 39'});
    }
  }

const deleteUser = (req,res) => {
    console.log(req.user)
    User.findByIdAndDelete({_id: req.params.id}, (err, user) => {
        if(err){
            res.status(400).json(err)
        }
        res.json({msg: 'user deleted'})
    })
}

function createJWT(user) {
    console.log('JWT function', user)
    try {
        return jwt.sign(
            {user},
            SECRET,
            {expiresIn: '24h'}
        )
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    signUp,
    showAll,
    login,
    deleteUser,
    showPosts,
    getUser
}