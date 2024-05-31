const { db } = require("../../../utils/db");
const { uploadFiles } = require("../../../utils/upload-files");

const PER_PAGE = 30;

const addProduct = async (req, res) => {
  const {
    name,
    type,
    unitType,
    mrp,
    b2bDiscount,
    b2bSellingPrice,
    b2cDiscount,
    b2cSellingPrice,
    isPrescriptionMandatory,
    disclaimer,
    qtyInStock,
    dosageForm,
    dosageStrength,
    genericId,
    compantId,
    categoryId,
  } = req.body;

  const files = req.files;

  let filenames;
  const productData = {
    name,
    type,
    unitType,
    mrp: parseFloat(mrp),
    b2bDiscount: parseFloat(b2bDiscount),
    b2bSellingPrice: parseFloat(b2bSellingPrice),
    b2cDiscount: parseFloat(b2cDiscount),
    b2cSellingPrice: parseFloat(b2cSellingPrice),
    isPrescriptionMandatory: isPrescriptionMandatory === "true" ? true : false,
    disclaimer,
    qtyInStock: Number(qtyInStock),
    category: {
      connect: {
        id: categoryId,
      },
    },
  };

  try {
    if (files) {
      filenames = uploadFiles(files);
    }

    if (filenames) {
      productData.image = filenames.image;
    }

    let medicine, nonmedicine;

    if (type === "MEDICINE") {
      medicine = await db.medicine.create({
        data: {
          product: {
            create: productData,
          },
          dosageForm,
          dosageStrength,
          generic: {
            connect: {
              id: genericId,
            },
          },
          company: {
            connect: {
              id: compantId,
            },
          },
        },
      });
    }

    if (type === "NONMEDICINE") {
      nonmedicine = await db.nonMedicine.create({
        data: {
          product: {
            create: productData,
          },
        },
      });
    }

    res
      .status(201)
      .json({ success: true, message: `Product has been created` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getProducts = async (req, res) => {
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
    const [products, totalProducts] = await Promise.all([
      db.product.findMany(options),
      db.product.count(countOptions),
    ]);

    res.status(200).json({ success: true, products, totalProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No such product found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const files = req.files;
  const { 
    name, 
    mrp, 
    b2bSellingPrice,
    b2bDiscount,
    b2cSellingPrice,
    b2cDiscount,
    unitType,
    qtyInStock,
    disclaimer } = req.body;
  let filenames;
  const productData = {
    name,
    unitType,
    mrp: parseFloat(mrp),
    b2bDiscount: parseFloat(b2bDiscount),
    b2bSellingPrice: parseFloat(b2bSellingPrice),
    b2cDiscount: parseFloat(b2cDiscount),
    b2cSellingPrice: parseFloat(b2cSellingPrice),
    disclaimer,
    qtyInStock: Number(qtyInStock),
  };


  try {
    if (files) {
      filenames = uploadFiles(files);
    }
    if (filenames) {
      productData.image = filenames.image;
    }
    const product = await db.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });

    res
      .status(200)
      .json({ success: true, message: `Product updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





module.exports = { addProduct, getProducts, getProduct, updateProduct };
