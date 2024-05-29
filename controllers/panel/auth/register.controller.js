const bcrypt = require("bcrypt");
const { db } = require("../../../utils/db");

const { validationResult } = require("express-validator");

const registerPanelUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: errors.formatWith((error) => error.msg).array(),
    });
  }

  const { name, email, phone, password } = req.body;

  const userExists = await db.panelUser.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (userExists) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await db.panelUser.create({
      data: {
        name,
        email,
        phone,
        password: hashedPwd,
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

module.exports = { registerPanelUser };
