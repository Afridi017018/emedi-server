const { db } = require("../../../utils/db");

// For Pagination

const PER_PAGE = 30;

const addGeneric = async (req, res) => {
  const { name } = req.body;

  try {
    const generic = await db.generic.create({
      data: { name },
    });

    res.status(201).json({
      success: true,
      message: `Generic: ${generic.name} has been created`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Internal Server Error` });
  }
};

const getGenerics = async (req, res) => {
  const { page = -1, search } = req.query;
console.log(search)

  let options = {};
  if (Number(page) >= 0) {
    options = {
      take: PER_PAGE,
      skip: page ? (+page - 1) * PER_PAGE : 0,
    };

  }

  const countOptions = {};

  if (search) {
    options.where = {
      name: {
        contains: search,
      },
    };
    countOptions.where = options.where;
  }

  try {
    const [generics, totalGenerics] = await Promise.all([
      db.generic.findMany(options),
      db.generic.count(countOptions),
    ]);

    res.status(200).json({ success: true, generics, totalGenerics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Internal Server Error` });
  }
};

const getGeneric = async (req, res) => {
  const { genericId } = req.params;

  try {
    const generic = await db.generic.findUnique({
      where: {
        id: genericId,
      },
    });

    if (!generic) {
      return res
        .status(404)
        .json({ success: false, message: "No such generic found" });
    }

    res.status(200).json({ success: true, generic });
  } catch (error) {
    console.error(error);
  }
};

const updateGeneric = async (req, res) => {
  const { genericId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ success: false, message: "Bad Request" });
  }

  try {
    const generic = await db.generic.update({
      where: {
        id: genericId,
      },
      data: { name },
    });

    res.status(200).json({
      success: true,
      message: `The Generic name has been updated to ${generic.name}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Internal Server Error` });
  }
};

const deleteGeneric = async (req, res) => {
  const { genericId } = req.params;

  try {
    const generic = await db.generic.delete({
      where: {
        id: genericId,
      },
    });

    res.status(200).json({
      success: true,
      message: `Generic ${generic.name} has been deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addGeneric,
  getGenerics,
  getGeneric,
  updateGeneric,
  deleteGeneric,
};
