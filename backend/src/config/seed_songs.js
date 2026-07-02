// Set public DNS to avoid querySrv ECONNREFUSED issues in Node.js
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const songModel = require("../models/song.model");

const defaultSongs = [
    // HAPPY MOODS
    {
        title: "Lady Singham",
        mood: "happy",
        url: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/songs/Lady_Singham_gs01DFz-1.mp3",
        posterUrl: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/posters/Lady_Singham_VW8DGJkie.jpeg"
    },
    {
        title: "Sunny Days",
        mood: "happy",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500"
    },
    {
        title: "Upbeat Fun",
        mood: "happy",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        posterUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500"
    },
    // SAD MOODS
    {
        title: "Sad Melody",
        mood: "sad",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        posterUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500"
    },
    {
        title: "Rainy Night",
        mood: "sad",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        posterUrl: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=500"
    },
    {
        title: "Lost Love",
        mood: "sad",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        posterUrl: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=500"
    },
    // SURPRISED MOODS
    {
        title: "Surprise Beat",
        mood: "surprised",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500"
    },
    {
        title: "Sudden Twist",
        mood: "surprised",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500"
    },
    {
        title: "Wonderland Surprise",
        mood: "surprised",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        posterUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500"
    },
    // NEUTRAL MOODS
    {
        title: "Neutral Flow",
        mood: "neutral",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        posterUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=500"
    },
    {
        title: "Ambient Echoes",
        mood: "neutral",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        posterUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500"
    },
    {
        title: "Chill Vibe",
        mood: "neutral",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        posterUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500"
    }
];

mongoose.connect(process.env.MONGODB_URL)
    .then(async () => {
        console.log("Connected to MongoDB for seeding...");
        
        // Clear existing songs to prevent duplicates
        await songModel.deleteMany({});
        console.log("Cleared old songs.");
        
        // Insert new expanded song list
        await songModel.insertMany(defaultSongs);
        console.log("Inserted 12 default songs successfully!");
        
        mongoose.disconnect();
    })
    .catch(err => {
        console.error("Error during seeding:", err);
    });
