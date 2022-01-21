import { useEffect, useState } from "react";
import BRANDS from "../data/brand.json";
const useRatingInit = () => {
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState({});
    const [options, setOptions] = useState({});
    const [imageURL, setImageURL] = useState([]);
    useEffect(() => {
        console.log("useeffect");
        let localOptions = {
            noOfRows: 0,
            timeInterval: 0,
            noOfImages: 0,
            noOfColumns: 0,
            counter: 0,
            number: 0,
            transitionTime: 200,
        };
        let localImageURL = [];
        const preloadImages = (urls, allImagesLoadedCallback) => {
            var loadedCounter = 0;
            var toBeLoadedNumber = urls.length;
            urls.forEach(function (data) {
                let [index, url] = data.split("|");
                preloadImage(url, function (img) {
                    localImageURL[Number(index)] = img.src;
                    loadedCounter++;
                    if (loadedCounter == toBeLoadedNumber) {
                        allImagesLoadedCallback();
                    }
                });
            });
            function preloadImage(url, anImageLoadedCallback) {
                var img = new Image();
                img.onload = () => anImageLoadedCallback(img);
                img.src = url;
            }
        };
        // setting up local storage
        let localCounter = window.localStorage.getItem("counter");
        let localRatings = JSON.parse(window.localStorage.getItem("ratings"));
        if (localCounter === null && localRatings === null) {
            let _ratings = {};
            for (let i = 0; i < BRANDS.length; i++)
                _ratings[BRANDS[i].split(".")[0]] = 0;
            localOptions.noOfImages = BRANDS.length;
            setRatings({ ..._ratings });
        } else {
            localOptions.noOfImages = Object.keys(localRatings).length;
            localOptions.counter = Number(localCounter);
            setRatings({ ...localRatings });
        }
        // setting up responsiveness
        // setting up rows
        let totalSpacing = 8 + 8; // padding top .5rem and bottom .5rem
        let screenHeight = window.innerHeight - totalSpacing; // later it will be change to window.innerHeight
        let colHeight = 150 + 28 + totalSpacing;
        localOptions.noOfRows = Math.floor(screenHeight / colHeight);
        // setting up columns
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1400) {
            localOptions.timeInterval = 16000;
            localOptions.noOfColumns = 8;
            localOptions.number =
                localOptions.noOfImages / localOptions.noOfColumns;
        } else if (windowWidth >= 1024) {
            localOptions.timeInterval = 1000;
            localOptions.noOfColumns = 6;
            localOptions.number =
                localOptions.noOfImages / localOptions.noOfColumns;
        } else if (windowWidth >= 768) {
            localOptions.timeInterval = 8000;
            localOptions.noOfColumns = 4;
            localOptions.number =
                localOptions.noOfImages / localOptions.noOfColumns;
        } else {
            localOptions.timeInterval = 4000;
            localOptions.noOfColumns = 2;
            localOptions.number =
                localOptions.noOfImages / localOptions.noOfColumns;
        }
        // image loading
        preloadImages(
            BRANDS.map((item, index) => `${index}|brand_logos/${item}`),
            () => {
                setImageURL(localImageURL);
                setOptions({ ...localOptions });
                setLoading(false);
            }
        );
    }, []);

    return [loading, ratings, options, imageURL];
};

export default useRatingInit;
