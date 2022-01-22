import React, { useEffect, useState } from "react";
const FinishRating = ({ ratings }) => {
    const [result, setResult] = useState(null);
    useEffect(() => {
        let rate = [[], [], [], [], [], []];
        for (let [key, value] of Object.entries(ratings.ratings)) {
            value = Number(value);
            rate[value].push(key);
        }
        setResult(rate);
    }, []);

    return (
        <>
            <h4>Finish ratings!!!</h4>
            {result &&
                result.map((item, key) => (
                    <div key={key}>
                        <p className="type-rate"> Rating {key}</p>
                        {item.map((item2, key2) => (
                            <p key={key2} className="brand">
                                {item2}
                            </p>
                        ))}
                    </div>
                ))}
        </>
    );
};

export default FinishRating;
