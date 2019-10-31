require('dotenv').config();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const singleImageUpload = (req, res, next) => {

    //check if file was uploaded
    if(!req.files || Object.keys(req.files).length === 0) {
        //no image uploaded
        next();
    }

    const uploadedImage = req.files.photo;
    const allowedMimeTypes = ['image/jpeg'];
    if(!allowedMimeTypes.includes(uploadedImage.mimetype))
        return res.status(400).json({message: "Invalid image uploaded. Upload only .jpeg or .jpg files."});


    cloudinary.uploader.upload(uploadedImage.tempFilePath, (err, result) => {
        
        if(err) return res.status(400).json({message: "Error uploading image.", err});

        req.body.photo = result.secure_url;

        next();
    });
}

module.exports = singleImageUpload;