import React, { useEffect, useState } from "react";
import "./scss/Rating.scss";
import Loader from "./Components/Loader";
import useRatingInit from "./Hooks/useRatingInit";
import FinishRating from "./Components/Rating/FinishRating";
import Instruction from "./Components/Rating/Instruction";
import Rating from "./Components/Rating/Rating";
export default function App() {
    // const nodeRef = useRef(null);
    const [loading, ratings, options, imageURL] = useRatingInit();
    const [instruction, setInstruction] = useState(true);
    const [finish, setFinish] = useState(false);
    useEffect(() => {
        return () => {};
    }, []);
    return (
        <>
            {loading ? (
                <Loader />
            ) : instruction ? (
                <div className="rating-container">
                    <Instruction setInstruction={setInstruction} />
                </div>
            ) : finish ? (
                <div className="rating-container game-end-wrapper">
                    <FinishRating ratings={ratings} />
                </div>
            ) : (
                <div className="rating-container">
                    <Rating
                        ratings={ratings}
                        options={options}
                        imageURL={imageURL}
                        setFinish={setFinish}
                    />
                </div>
            )}
        </>
    );
}
