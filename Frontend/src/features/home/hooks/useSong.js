import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";


export const useSong = () => {
    const context = useContext(SongContext)

    const { loading, setLoading, song, setSong } = context

    async function handleGetSong({ mood }) {
        if (!mood || mood === "Detecting...") {
            console.log("No valid expression detected yet.");
            return;
        }
        setLoading(true)
        try {
            const data = await getSong({ mood })
            if (data && data.song) {
                setSong({
                    ...data.song,
                    playTrigger: Date.now()
                })
            } else {
                console.warn(`No song found for mood: ${mood}`);
                alert(`No song found in the database for mood: "${mood}". Make sure the database is seeded.`);
            }
        } catch (error) {
            console.error("Failed to fetch song:", error)
        } finally {
            setLoading(false)
        }
    }

    return ({ loading, song, handleGetSong })

}
