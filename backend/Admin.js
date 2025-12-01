const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const Admin = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        const hashed_password = await bcryptjs.hash(process.env.PASSWORD, 8);
        const user_name = process.env.USER_NAME;
        const email = process.env.EMAIL;
        const is_admin = true;
        const ad_user = await Admin.find({email});
        if(ad_user){
        return console.log("user already exist");
    }
    const admin_user = await Admin.create({
    username: user_name,
     password:hashed_password,
     email: email,
      is_admin,
    });
    const token = jwt.sign({ id: admin_user._id, role: admin_user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: admin_user._id, email: admin_user.email, role: admin_user.role } });
        res.cookie("token", token);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};
Admin();

