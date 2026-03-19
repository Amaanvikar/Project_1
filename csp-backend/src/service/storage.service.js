const ImageKit = require('@imagekit/nodejs');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, fileName = `image-${Date.now()}.jpg`) {
  if (!buffer) {
    throw new Error('No file buffer provided to uploadFile');
  }

  const result = await imagekit.files.upload({
    file: buffer.toString('base64'),
    fileName,
    useUniqueFileName: true,
    folder: process.env.IMAGEKIT_FOLDER || '/',
  });

  return result;
}

module.exports = uploadFile;