/**
 * UploadImageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { uploadFileGoogleDrive } = require("../../service/googleApi/googleApi");
const path = require('path');
module.exports = {
  uploadImage: async function (req, res) {
    

    req
      .file("file")
      .upload(
        { dirname: "assets/images" },
        async function (err, uploadedFiles) {
          if (err) {
            return res.serverError(err);
          }
          const uploadedFile = uploadedFiles[0];
          console.log(uploadedFiles[0]);

          console.log(uploadedFiles[0].fd);


          const fileName = uploadedFile.filename;
          const pathToTmpImg = uploadedFiles[0].fd
          const fileNameWithExtension = path.basename(pathToTmpImg); // 'fddc05ff-b95c-40a6-bbee-76fa434b3283.png'
          console.log(fileNameWithExtension)
        
          const mimeType = uploadedFile.type;
          const subFolder = ".tmp/uploads/assets/images"; // thư mục chứa ảnh
          const folderId = '1lqcssKdYalF-dX1QjxYUGDjuVYHQa6Z2';
          const fileId = await uploadFileGoogleDrive(
            fileNameWithExtension,
            mimeType,
            folderId,
            subFolder
          );
          let linkReturn = `https://drive.google.com/uc?export=view&id=${fileId}`
          console.log(linkReturn)
          return res.ok(linkReturn);
        }
      );
  },
};
