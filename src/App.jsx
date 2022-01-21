import React, { useEffect, useState } from "react";
import "./scss/Rating.scss";
import Loader from "./Components/Loader";
import useRatingInit from "./Hooks/useRatingInit";
export default function App() {
    const [loading, ratings, options, imageURL] = useRatingInit();
    const [imageRow, setImageRow] = useState([]);
    console.log({ ratings, options, imageURL });
    console.log(imageRow);
    let imageRowLength = 0;
    useEffect(() => {
        if (loading) return;
        let counter = options.counter;
        setImageRow((state) => {
            let index = 0 * options.noOfColumns;
            let sample = [...state];
            let column = [];
            for (let i = 0; i < options.noOfColumns; i++) {
                if (index + i == options.noOfImages) break;
                column[i] = imageURL[index + i];
            }
            console.log(column);
            sample.push([...column]);
            return [...sample];
        });
        counter++;
        imageRowLength++;
        let interval = setInterval(() => {
            if (counter >= options.number) {
                // window.localStorage.removeItem("counter");
                // window.localStorage.removeItem("ratings");
                clearInterval(interval);
                return;
            }
            console.log(imageRow.length);
            if (imageRowLength === options.noOfRows) {
                setImageRow((state) => {
                    let sample = state.filter((_, index) => index !== 0);
                    return [...sample];
                });
                imageRowLength--;
            }
            setImageRow((state) => {
                let index = counter * options.noOfColumns;
                let sample = [...state];
                let column = [];
                for (let i = 0; i < options.noOfColumns; i++) {
                    if (index + i == options.noOfImages) break;
                    column.push(imageURL[index + i]);
                }
                sample.push([...column]);
                return [...sample];
            });
            counter++;
            imageRowLength++;
        }, options.timeInterval + options.transitionTime);
        return () => {
            clearInterval(interval);
        };
    }, [loading]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="container" id="main-wrapper"></div>
            )}
        </>
    );
}
