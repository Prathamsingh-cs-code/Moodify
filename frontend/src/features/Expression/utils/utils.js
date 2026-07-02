import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";


export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};

let lastLoggedExpression = "";

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current || videoRef.current.readyState < 2) return null;

    try {
        const results = landmarkerRef.current.detectForVideo(
            videoRef.current,
            performance.now()
        );

        if (results && results.faceBlendshapes && results.faceBlendshapes.length > 0) {
            const blendshapes = results.faceBlendshapes[ 0 ].categories;

            const getScore = (name) =>
                blendshapes.find((b) => b.categoryName === name)?.score || 0;

            const smileLeft = getScore("mouthSmileLeft");
            const smileRight = getScore("mouthSmileRight");
            const jawOpen = getScore("jawOpen");
            const browUp = getScore("browInnerUp");
            const frownLeft = getScore("mouthFrownLeft");
            const frownRight = getScore("mouthFrownRight");

            // Calculate averages to handle head tilts, lighting variations and asymmetries
            const avgSmile = (smileLeft + smileRight) / 2;
            const avgFrown = (frownLeft + frownRight) / 2;
            const avgSurprise = (jawOpen + browUp) / 2;

            let currentExpression = "neutral";

            if (avgSmile > 0.25) {
                currentExpression = "happy";
            } else if (avgSurprise > 0.12) {
                currentExpression = "surprised";
            } else if (avgFrown > 0.10) {
                currentExpression = "sad";
            }

            // Log facial landmarks coordinates only on state transitions to keep console clean
            if (lastLoggedExpression !== currentExpression) {
                console.log(`[Expression Transition] Detected: "${currentExpression}"`, {
                    avgSmile: avgSmile.toFixed(3),
                    avgFrown: avgFrown.toFixed(3),
                    avgSurprise: avgSurprise.toFixed(3),
                    raw: {
                        smileLeft: smileLeft.toFixed(3),
                        smileRight: smileRight.toFixed(3),
                        frownLeft: frownLeft.toFixed(3),
                        frownRight: frownRight.toFixed(3),
                        jawOpen: jawOpen.toFixed(3),
                        browUp: browUp.toFixed(3)
                    }
                });
                lastLoggedExpression = currentExpression;
            }

            if (setExpression) {
                setExpression(currentExpression);
            }
            return currentExpression;
        } else {
            const currentExpression = "No face detected";
            if (lastLoggedExpression !== currentExpression) {
                console.log(`[Expression Transition] Detected: "${currentExpression}"`);
                lastLoggedExpression = currentExpression;
            }
            if (setExpression) {
                setExpression(currentExpression);
            }
            return currentExpression;
        }
    } catch (err) {
        console.error("Error during face detection:", err);
        return null;
    }
};