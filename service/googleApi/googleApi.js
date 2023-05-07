const path = require("path");
const { dirname } = require("path");
const { fileURLToPath } = require("url");
const { google } = require("googleapis");
const fs = require("fs");

const uploadFileGoogleDrive = async (
  fileName,
  mimeType,
  folderId,
  subFolder
) => {
  const keyFileLink = path.join(__dirname, "/meowBookDrive.json");
  // E:\APP_REACT\meowBook\server\image
  const imageFile = path.join(__dirname, "");
  const filePath = `././${subFolder}/${fileName}`;
  console.log();

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFileLink,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveServices = google.drive({
      version: "v3",
      auth,
    });
    const fileMetaData = {
      name: `${fileName}` /*  @params */,
      parents: [folderId] /*  @params */,
    };
    // server\image\test.jpg
    // server\function\googleApi\googleApi.js
    const media = {
      mimeType: `${mimeType}` /*  @params */,
      body: fs.createReadStream(
        `././${subFolder}/${fileName}`
      ) /*  @params fileName : test.jpg  */,
    };

    const response = await driveServices.files.create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    });



    // Delete the temporary file after upload
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });

    return response.data.id;
  } catch (error) {
    console.error("some error   >>>>>>>>");
    console.info(error);
  }
};
const deleteFileGoogleDrive = async (googleDriveId) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./function/googleApi/meowBookDrive.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveServices = google.drive({
      version: "v3",
      auth,
    });

    const data = await driveServices.files.delete({
      fileId: googleDriveId, // @params fileId
    });
    console.log("files deleted successfully from drive google");

    return data;
  } catch (error) {
    console.error("some error when delete   >>>>>>>>");
    console.info(error);
  }
};
module.exports = {
  uploadFileGoogleDrive,
  deleteFileGoogleDrive,
};
