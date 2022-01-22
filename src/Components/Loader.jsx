import React from "react";
import "../scss/Loading.scss";
const Loader = () => {
    return (
        <div className="spinner-wrapper">
            <div className="spinner-grow" role="status"></div>
            loading
        </div>
    );
};

export default Loader;
