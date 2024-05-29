const { db } = require("../../../utils/db");

const addUserAddress = async (req, res) => {
  const addressData = req.body;
  const userId = req.user;
  try {
    const addressCount = await db.address.count({
      where: {
        userId,
      },
    });

    if (addressCount >= 3) {
      return res
        .status(403) // 403 - Forbidden
        .json({
          success: false,
          message: "Maximum limit of addresses reached for this user",
        });
    }

    await db.address.create({
      data: {
        user: {
          connect: { id: userId },
        },
        ...addressData,
      },
    });

    res.json({ success: true, message: "Address data has been added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserAddresses = async (req, res) => {
  const userId = req.user;
  try {
    const addresses = await db.address.findMany({
      where: {
        userId,
      },
    });

    if (!addresses) {
      return res
        .status(404)
        .json({ success: false, message: "No addresses found for this user" });
    }

    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { addUserAddress, getUserAddresses };
