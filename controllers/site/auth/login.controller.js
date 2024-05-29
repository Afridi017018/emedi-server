const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../../../utils/db");

const loginSiteUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "valid credentials required" });
  }

  try {
    const foundUser = await db.siteUser.findUnique({
      where: {
        phone,
      },
    });

    if (!foundUser) {
      return res.status(401).json({ success: false, message: "Unauthorized" }); // 401 - unauthorized
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return res.status(401).json({ success: false, message: "Unauthorized" }); // 401 - unauthorized
    }

    const accessToken = jwt.sign(
      {
        userId: foundUser.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: `Welcome! ${foundUser.name}.`,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { loginSiteUser };
