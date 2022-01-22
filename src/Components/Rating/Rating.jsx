import React, { useEffect, useState } from "react";
import RatingCardRow from "./RatingCardRow";
import { CSSTransition, TransitionGroup } from "react-transition-group";
export default function Rating({ ratings, options, imageURL, setFinish }) {
    // const nodeRef = useRef(null);
    const [imageRow, setImageRow] = useState([]);
    const handleRating = (name, rate) => {
        ratings.setRatings((state) => {
            state[name] = rate;
            let newState = { ...state };
            window.localStorage.setItem("ratings", JSON.stringify(newState));
            return newState;
        });
    };
    useEffect(() => {
        let imageRowLength = 0;
        let counter = options.counter;
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
        setTimeout(() => {
            counter++;
        }, 1);
        imageRowLength++;
        let interval = setInterval(() => {
            window.localStorage.setItem("counter", counter);
            if (counter >= options.number) {
                setFinish(true);
                window.localStorage.removeItem("counter");
                window.localStorage.removeItem("ratings");
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
    }, []);
    return (
        <>
            <TransitionGroup component={null}>
                {imageRow.map((item) => (
                    <CSSTransition
                        key={item.id}
                        timeout={options.transitionTime}
                        classNames="item"
                    >
                        <RatingCardRow
                            imageColumn={item.data}
                            handleRating={handleRating}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>
    );
}
