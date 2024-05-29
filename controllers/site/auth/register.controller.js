const bcrypt = require("bcrypt");
const { db } = require("../../../utils/db");

const registerSiteUser = async (req, res) => {
  const { name, phone, password } = req.body;

  const userExists = await db.siteUser.findFirst({
    where: {
      phone,
    },
  });

  if (userExists) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.siteUser.create({
      data: {
        name,
        phone,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: `user ${user.name} has been created`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error: ${error}` });
  }
};

module.exports = { registerSiteUser };
