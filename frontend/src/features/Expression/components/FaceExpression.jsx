import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

    useEffect(() => {
        let active = true;
        let animationId;

        const runDetection = () => {
            if (!active) return;
            detect({ landmarkerRef, videoRef, setExpression });
            animationId = requestAnimationFrame(runDetection);
        };

        init({ landmarkerRef, videoRef, streamRef })
            .then(() => {
                if (active) {
                    runDetection();
                }
            })
            .catch(err => {
                console.error("Camera setup failed:", err);
                setExpression("Camera access failed");
            });

        return () => {
            active = false;
            cancelAnimationFrame(animationId);
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        if (expression === "No face detected" || expression === "Detecting...") {
            alert("No face detected! Please position your face in the camera frame.");
            return;
        }
        onClick(expression);
    }


    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button onClick={handleClick} >Detect expression</button>
        </div>
    );
}