const s3 = require("../utils/s3");
const UserService = require("../services/User.service");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

class FileDocumentController {
  // 🔑 helper to generate presigned + cdn url
  generatePresignedUrl = async (key, expires = 300) => {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.SPACES_BUCKET,
        Key: key,
      });

      // ✅ must await
      const url = await getSignedUrl(s3, command, { expiresIn: expires });

      // Optional: swap hostname to CDN endpoint
      let cdnUrl = url;
      if (process.env.SPACES_CDN) {
        try {
          const u = new URL(url);
          const cdnHost = new URL(process.env.SPACES_CDN).hostname;
          u.hostname = cdnHost;
          cdnUrl = u.toString();
        } catch (e) {
          console.error("CDN swap failed:", e);
        }
      }

      return { cdnUrl, expires };
    } catch (err) {
      console.error("🚀 ~ generatePresignedUrl error:", err);
      throw err;
    }
  };

  // Upload file (private) and return presigned URL
  uploadFile = async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file found" });

      const key = `${Date.now()}_${req.file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "private", // keep private
      });

      await s3.send(command);

      console.log(
        "🚀 ~ FileDocumentController ~ req.body.isProfileImage:",
        req.body.isProfileImage
      );
      console.log(
        `🚀 ~ FileDocumentController ~ req.body.isProfileImage === "true" ||
        req.body.isProfileImage === true:`,
        req.body.isProfileImage === "true" || req.body.isProfileImage === true
      );


      const { cdnUrl, expires } = await this.generatePresignedUrl(key);

      if (
        req.query.isProfileImage === "true" ||
        req.query.isProfileImage === true
      ) {
        const payload = {
          where: { id: req.userDetails.id },
        };
        try {
          console.log("cdnUrl", cdnUrl)
          let reslt = await UserService.put({ ProfilePicture: cdnUrl }, payload);
          console.log("🚀 ~ FileDocumentController ~ reslt:", reslt);
        } catch (error) {
          console.log("🚀 ~ FileDocumentController ~ error:", error);
        }
      }

      return res.json({ success: true, ok: true, key, cdnUrl, expires });
    } catch (err) {
      console.error("🚀 ~ FileDocumentController ~ uploadFile err:", err);
      res.status(500).json({ error: "upload_failed" });
    }
  };

  uploadFileHelper = async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file found" });

      const key = `${Date.now()}_${req.file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "private", // keep private
      });

      await s3.send(command);

      if (
        req.body.isProfileImage === "true" ||
        req.body.isProfileImage === true
      ) {
        const payload = {
          where: { id: req.userDetails.id },
        };
        await UserService.put({ profilePicture: key }, payload);
      }

      const { cdnUrl, expires } = await this.generatePresignedUrl(key);

      return { key, cdnUrl, expires };
    } catch (err) {
      console.error("🚀 ~ FileDocumentController ~ uploadFile err:", err);
      res.status(500).json({ error: "upload_failed" });
    }
  };

  // Generate pre-signed download URL separately
  getPresignedUrl = async (req, res) => {
    try {
      const key = req.query.key;
      if (!key) return res.status(400).json({ error: "missing_key" });

      const expires = Number(req.query.expires) || 300;
      const { cdnUrl } = await this.generatePresignedUrl(key, expires);

      res.json({ cdnUrl, expires });
    } catch (err) {
      console.error("🚀 ~ FileDocumentController ~ getPresignedUrl err:", err);
      res.status(500).json({ error: "presign_failed" });
    }
  };
}

module.exports = new FileDocumentController();
