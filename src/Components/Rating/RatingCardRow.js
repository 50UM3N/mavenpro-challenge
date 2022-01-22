import React from "react";
import RatingCard from "./RatingCard";
const RatingCardRow = ({ imageColumn }) => {
    return (
        <>
            {imageColumn.map((item) => (
                <RatingCard key={item.id} image={item.url} />
            ))}
        </>
    );
};

export default RatingCardRow;
