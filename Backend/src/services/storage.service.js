const ImageKit = require("@imagekit/nodejs").default

const client = new ImageKit({
    publicKey: process.env.IMAGE_PUBLIC_KEY,
    privateKey: process.env.IMAGE_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_URL_ENDPOINT
})

async function uploadFile({ buffer, filename, folder = "" }) {

    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: filename,
        folder
    })

    return file

}

module.exports = { uploadFile }