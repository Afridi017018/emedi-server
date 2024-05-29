const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFiles = (files) => {
  const fileNames = {};

  Object.keys(files).forEach((key) => {
    const file = files[key];
    const uniqueFileName = `${uuidv4()}_${file.name}`;
    const rootPath = process.cwd();
    const filePath = path.join(rootPath, "/public/files/", uniqueFileName);

    file.mv(filePath, (error) => {
      if (error) {
        return res.status(500).json({ status: "error", message: error });
      }
    });

    fileNames[key] = uniqueFileName;
  });

  return fileNames;
};

module.exports = { uploadFiles };
