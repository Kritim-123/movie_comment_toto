const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

router.put(
  "/upload-avatar",
  fetchUser,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      //  Upload to cloudinary
      const result = await cloudinary.uploader.upload_stream(
        {
          folder: "user_avatars",
        },

        async (error, uploadedImage) => {
          if (error) return res.status(500).json({ error: "Upload failed" });

          // Save URL in database

          const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { avatarUrl: uploadedImage.secure_url },
            { new: true }
          );

          res.json(updatedUser);
        }
      );

      // Pipe file buffer into Cloudinary upload
      req.file.stream.pipe(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
