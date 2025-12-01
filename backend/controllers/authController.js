const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

const patient_register =async function(req,res){
    try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Missing fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed, phone });
    await user.save();
    res.send("connection done");
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

const patient_login =async function(req, res){
     try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });
    // res.send("lodein user succesfully");
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    res.cookie("authorization", `Bearer ${token}`);
  } catch (err) {
    console.error(err);
    return res.status(200).json({ token:`Bearer ${token}`});
  }


}

const Plogout = (req, res) =>{
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .json({ message: "Logout successful" });

}
const Doctor_login =async function(req ,res){
  try {
      const { email, password } = req.body;
      console.log(email,password)
      if (!email | !password) {
         return  res.status(202).json({ message: "incomplete content" });
      } else {
          auth_user = await Doctor.findOne({ email });
          console.log(auth_user);
          if (!auth_user) {
                return  res
                  .status(401)
                  .json({ message: `user with ${email} no found` });
          } else {
              const verify = await bcrypt.compare(password, auth_user.password);
              if(!verify){
                  return res
          .status(401)
          .json({ message: "email or password incorrect" });
              }else{
                    const token = jwt.sign(
                    { id: auth_user._id, email: auth_user.email },
                     process.env.JWT_SECRET
                    );
                  res.cookie("authorization", `Bearer ${token}`);
                  return res.status(200).json({ token:`Bearer ${token}`, user:auth_user});
              }

          }
      }


  } catch (error) {
      res.status(500).json({ message: error.message });


  }


};
  

module.exports ={ patient_register, patient_login,  Doctor_login, Plogout};