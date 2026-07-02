const songModel = require("../models/song.model")
const storageService = require("../services/storage.service")
const id3 = require("node-id3")


async function uploadSong(req, res) {

    const songBuffer = req.file.buffer
    const { mood } = req.body

    const tags = id3.read(songBuffer)

    const [ songFile, posterFile ] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })

}

async function getSong(req, res) {
    const { mood } = req.query

    try {
        const count = await songModel.countDocuments({ mood })
        if (count === 0) {
            return res.status(200).json({
                message: "No song found for this mood.",
                song: null,
            })
        }

        const randomIdx = Math.floor(Math.random() * count)
        const song = await songModel.findOne({ mood }).skip(randomIdx)

        res.status(200).json({
            message: "song fetched successfully.",
            song,
        })
    } catch (err) {
        console.error("Error fetching song:", err)
        res.status(500).json({
            message: "Error fetching song",
            error: err.message
        })
    }
}


module.exports = { uploadSong, getSong }