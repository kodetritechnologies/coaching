import multer from "multer";
import File from "../models/file.schema.js";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const uploadPath = path.join("public", "uploads", `${year}`, `${month}`, `${day}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const uploadMiddleware = upload.fields([
  { name: "featured_image", maxCount: 1 },
  { name: "gallery", maxCount: 30 },
  { name: "document", maxCount: 30 },
]);

const generatePayload = (req, file) => {
  const { _id } = req.admin || {};
  const customer = req.customer;

  // Construct the URL based on the file path relative to 'public'
  // The file.path is 'public\\uploads\\2025\\12\\20\\filename.jpg' (on Windows)
  // We need to convert it to a URL path: '/uploads/2025/12/20/filename.jpg'

  const relativePath = file.path.replace(/\\/g, "/").replace("public/", "");
  const fullUrl = `${req.protocol}://${req.get("host")}/${relativePath}`;

  return {
    filename: file.originalname,
    fieldname: file.fieldname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    url: fullUrl,
    admin: _id || null,
    customer: customer?._id || null,
  };
};

export const fileUploads = async (req) => {
  let fields = req.files;
  const uploadedFiles = {};
  if (fields && fields["featured_image"]) {
    const file = fields?.featured_image[0];
    try {
      const payload = generatePayload(req, file);
      if (payload) {
        const response = await File.create(payload);
        uploadedFiles.featured_image = response;
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (fields && fields["gallery"]) {
    const result = await Promise.all(
      fields.gallery.map(async (file) => {
        const payload = generatePayload(req, file);
        const response = await File.create(payload);
        return response;
      })
    );
    uploadedFiles.gallery = result;
  }

  if (fields && fields["document"]) {
    const result = await Promise.all(
      fields.document.map(async (file) => {
        const payload = generatePayload(req, file);
        const response = await File.create(payload);
        return response;
      })
    );
    uploadedFiles.document = result;
  }
  return uploadedFiles;
};
