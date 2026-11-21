const { uploadImage, client } = require("../services/imagekit");

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const GALLERY_FIELD_NAMES = ["galleryImage1", "galleryImage2", "galleryImage3", "galleryImage4"];

const validateAndUploadSingleImage = async (file) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    return { error: "Only JPG, PNG and WEBP images are allowed." };
  }

  const uploaded = await uploadImage(file.buffer.toString("base64"));
  return {
    image: {
      url: uploaded.url,
      fileId: uploaded.fileId,
    },
  };
};

const processGalleryUploads = async (filesByField = {}, existingGallery = []) => {
  const nextGallery = Array.isArray(existingGallery) ? [...existingGallery] : [];
  const uploadedFileIds = [];

  for (let i = 0; i < GALLERY_FIELD_NAMES.length; i++) {
    const fieldName = GALLERY_FIELD_NAMES[i];
    const uploadedFile = filesByField?.[fieldName]?.[0];
    if (!uploadedFile) continue;

    const { error, image } = await validateAndUploadSingleImage(uploadedFile);
    if (error) {
      return { error, uploadedFileIds };
    }

    uploadedFileIds.push(image.fileId);

    const previousEntry = nextGallery[i];
    if (previousEntry?.fileId && typeof client?.files?.delete === "function") {
      await client.files.delete(previousEntry.fileId);
    }

    nextGallery[i] = image;
  }

  const compactedGallery = nextGallery.filter((entry) => entry && entry.url);
  return { gallery: compactedGallery, uploadedFileIds };
};

module.exports = {
  validateAndUploadSingleImage,
  processGalleryUploads,
  GALLERY_FIELD_NAMES,
  ALLOWED_IMAGE_TYPES,
};
