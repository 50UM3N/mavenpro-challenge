import React from "react";
import RatingCard from "./RatingCard";
const RatingCardRow = ({ imageColumn }) => {
    return (
        <div className="img-row active">
            {imageColumn.map((item) => (
                <RatingCard key={Math.random()} image={item} />
            ))}
        </div>
    );
};

export default RatingCardRow;
