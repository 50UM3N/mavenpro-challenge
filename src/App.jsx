import React, { useEffect, useState } from "react";
import "./scss/Rating.scss";
import Loader from "./Components/Loader";
import useRatingInit from "./Hooks/useRatingInit";
import RatingCardRow from "./Components/Rating/RatingCardRow";
import { CSSTransition, TransitionGroup } from "react-transition-group";
export default function App() {
    // const nodeRef = useRef(null);
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
                column[i] = { id: Math.random(), url: imageURL[index + i] };
            }
            sample.push({ id: Math.random(), data: [...column] });
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
                    column[i] = { id: Math.random(), url: imageURL[index + i] };
                }
                sample.push({ id: Math.random(), data: [...column] });
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
                <TransitionGroup className="rating-container">
                    {imageRow.map((item) => (
                        <CSSTransition
                            key={item.id}
                            timeout={options.transitionTime}
                            classNames="item"
                        >
                            <RatingCardRow imageColumn={item.data} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
        </>
    );
}
