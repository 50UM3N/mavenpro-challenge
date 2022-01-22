import React, { useState } from "react";

const RatingStar = ({ giveRating }) => {
    const [ratings, setRatings] = useState([false, false, false, false, false]);
    const handleClick = (index) => {
        setRatings((state) => {
            for (let i = 0; i < state.length; i++) state[i] = false;
            for (let i = 0; i <= index; i++) state[i] = true;
            return [...state];
        });
        giveRating(index + 1);
    };
    return (
        <div className="rating">
            {ratings.map((active, index) => (
                <i
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`rating__star star ${
                        active ? "solid" : "regular"
                    }`}
                ></i>
            ))}
        </div>
    );
};

export default RatingStar;
