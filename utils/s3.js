require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");

// Create an S3 client (works for AWS S3 and DigitalOcean Spaces)
const s3 = new S3Client({
  region: "us-east-1", // Default for DO Spaces, change if needed
  endpoint: process.env.SPACES_ENDPOINT, // e.g. https://nyc3.digitaloceanspaces.com
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
  forcePathStyle: false, // DO Spaces compatibility
});

module.exports = s3;
