const imageKit  = require("@imagekit/nodejs");
require("dotenv").config();
const client = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const uploadImage = async (file)=>{
    const result = await client.files.upload({
        file,
        fileName:"img_"+Date.now(),
        folder:"ecom-app"
    });
    return result;
}

module.exports = {
    uploadImage,
    client
};