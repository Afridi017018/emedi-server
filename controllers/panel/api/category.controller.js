const { db } = require("../../../utils/db");

const addCategory = async (req, res) => {
  const { name, parentId } = req.body;

  try {
    const category = await db.category.create({
      data: {
        name,
        ...(parentId && {
          parent: {
            connect: {
              id: parentId,
            },
          },
        }),
      },
    });

    res
      .status(201)
      .json({ success: true, message: `Category: ${category.name} created` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await db.category.findMany({
      include: {
        parent: true,
        children: true,
      },
    });

    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "No such category found" });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  try {
    const category = await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    res
      .status(200)
      .json({ success: true, message: `Category has been updated` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    res.status(200).json({
      success: true,
      message: `Category: ${category.name} has been deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
