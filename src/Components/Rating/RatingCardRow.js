import React from "react";
import RatingCard from "./RatingCard";
const RatingCardRow = ({ imageColumn }) => {
    return (
        <div className="img-row">
            {imageColumn.map((item) => (
                <RatingCard key={item.id} image={item.url} />
            ))}
        </div>
    );
};

export default RatingCardRow;
