/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcrypt");
module.exports = {
  policies: ["authorization"],
  changePassword: async function (req, res) {
    console.log(req.userType);
    console.log("change password");
    res.json("hello you change pass word.");
  },
  userSearchByName: async function (req, res) {
    try {
      const searchText = req.params.searchText;

      const userSearch = await Users.find();
      const filterUser = userSearch.filter((user) => {
        return user.name.toLowerCase().includes(searchText.toLowerCase());
      });
      const result = filterUser.map((user) => {
        return {
          name: user.name,
          id: user.id,
          avatarUrl: user.avatarUrl,
        };
      });
      console.log(result);
      res.ok(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  createNewUser: async function (req, res) {
 
    try {
      const { name, email, password } = req.body;
      const existingEmail = await Users.findOne({ email: email });
      if (!existingEmail) {
       
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser =  await Users.create({
          email: email,
          password: password,
          name: name,
        }).fetch();
       
        console.log("user create success.");
        res.json({
          id : newUser.id,
          email : newUser.email,
          password : password,
          name : newUser.name
        });
      } else {
        console.log("user create success.");
        res.json("user created...");
      }
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
