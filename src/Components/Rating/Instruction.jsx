import React, { useState, useEffect, useRef } from "react";
const Instruction = ({ setInstruction }) => {
    const para = useRef(null);
    const [previous, setPrevious] = useState(false);
    useEffect(() => {
        let localCounter = window.localStorage.getItem("counter");
        if (localCounter !== null) setPrevious(false);
        else setPrevious(true);
        const offsetHeight = para.current.offsetHeight;
        let bottom = 32;
        let interval = setInterval(() => {
            if (offsetHeight + para.current.offsetTop < 0) {
                clearInterval(interval);
                setInstruction(false);
                return;
            }
            para.current.style.bottom = `calc(50% + ${bottom}px )`;
            bottom += 32;
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [previous]);

    return (
        <>
            <p ref={para} className="start-para">
                {previous ? (
                    <>
                        You will see images coming up now .... <br />
                        <br />
                        Please give your 5-star rating to them <br />
                        <br />
                        Each image will wait 2 seconds for your rating
                    </>
                ) : (
                    <>
                        Your previous rating session was not complete
                        <br />
                        <br />
                        Starting from where left
                        <br />
                        <br />
                        Please give your 5-star rating to them <br />
                        <br />
                        Each image will wait 2 seconds for your rating
                    </>
                )}
            </p>
        </>
    );
};

export default Instruction;
