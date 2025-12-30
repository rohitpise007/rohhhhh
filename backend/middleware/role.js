const role_check = async(req, res, next)=>{
    const admin_role = req.is_admin;
    if(admin_role !== true ){
        return res.status(401).json({message: "Unauthorized - Admin access required"});
    }
    next();
  }

module.exports = role_check;