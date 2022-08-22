const { getUsers } = require("../db.request")


const logIn = async (req, res) => {
  try {

    const users = await getUsers()
    const user = users.find(el => el.name === req.body.userName)
    if (user && user.password === req.body.password) {
      res.status(200).json({ msg: 'Welcome' });
    }else{
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (error) {

  }
}

module.exports = { logIn }