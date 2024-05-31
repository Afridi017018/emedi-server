const { db } = require("../../../utils/db");
const { uploadFiles } = require("../../../utils/upload-files");

// For Pagination

const PER_PAGE = 30;

const addCompany = async (req, res) => {
  const { name, description } = req.body;
  const files = req.files;

  let filenames;
  const companyData = { name, description };


  try {
    if (files) {
      filenames = uploadFiles(files);
    }
    if (filenames) {
      companyData.image = filenames.image;
    }

    const company = await db.company.create({
      data: companyData,
    });

    res.status(201).json({
      success: true,
      message: `Company: ${company.name} has been created`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCompanies = async (req, res) => {
  const { page = -1, search } = req.query;


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
    const [companies, totalCompanies] = await Promise.all([
      db.company.findMany(options),
      db.company.count(countOptions),
    ]);

    res.status(200).json({ success: true, companies, totalCompanies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "No such company exists" });
    }

    res.status(200).json({ succes: true, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCompany = async (req, res) => {
  const { companyId } = req.params;
  const files = req.files;
  const companyData = req.body;
  let filenames;



  try {
    if (files) {
      filenames = uploadFiles(files);
    }
    if (filenames) {
      companyData.image = filenames.image;
    }
    const company = await db.company.update({
      where: {
        id: companyId,
      },
      data: companyData,
    });

    res
      .status(200)
      .json({ success: true, message: `Company updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const deletedCompany = await db.company.delete({
      where: {
        id: companyId,
      },
    });

    res.status(200).json({
      success: true,
      message: `Company: ${deletedCompany.name} has been deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
