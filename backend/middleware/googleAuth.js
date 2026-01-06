const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const googleAuthMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ error: "Unauthorized" });

  try {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const tokenInfo = await client.getTokenInfo(accessToken);
    if (!tokenInfo || tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ googleId: tokenInfo.sub });
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = googleAuthMiddleware;