const wrapper = document.querySelector("#main-wrapper");
// main section
let TIME_INTERVAL = 4000; // interval time
let NO = 62; // no of the rows
let NO_COLUMNS = 4;

const TRANSITION = 120; // animation transition time
let counter = 0; // counter
let currentTime = new Date(); // current time when the script load
let stack = [];
let totalSpacing = 8 + 8; // padding top .5rem and bottom .5rem
let screenHeight = wrapper.offsetHeight - totalSpacing; // later it will be change to window.innerHeight
let colHeight = 150 + 28 + totalSpacing;
let noOfRows = Math.floor(screenHeight / colHeight);

const preprocess = () => {
    const width = window.innerWidth;
    if (width >= 1400) {
        TIME_INTERVAL = 16000;
        NO_COLUMNS = 8;
    } else if (width >= 1024) {
        TIME_INTERVAL = 12000;
        NO_COLUMNS = 6;
    } else if (width >= 768) {
        TIME_INTERVAL = 8000;
        NO_COLUMNS = 4;
    } else {
        TIME_INTERVAL = 4000;
        NO_COLUMNS = 2;
    }
};

const displayTime = () => {
    let time = new Date();
    let t = time.getTime() - currentTime.getTime();
    currentTime = time;
    return t;
};

// creating the dynamic element and adding eventListener to every rating
const createElement = (id) => {
    let parser = new DOMParser();
    let dom = parser.parseFromString(
        `<div id="${id}" class="img-row">
            <div class="img-col">
                <div class="image-wrapper">
                    <img src="brand_logos/${brand[0]}" alt="">
                </div>
                <div class="rating" data-id="${imgArr[id]
                    .split("/")
                    .pop()
                    .split(".")[0]
                    .replace("%20", " ")}">
                    <i data-idx="1" class="rating__star star regular"></i>
                    <i data-idx="2" class="rating__star star regular"></i>
                    <i data-idx="3" class="rating__star star regular"></i>
                    <i data-idx="4" class="rating__star star regular"></i>
                    <i data-idx="5" class="rating__star star regular"></i>
                </div>
            </div>
            <div class="img-col">
                <div class="image-wrapper">
                    <img src="brand_logos/${brand[0]}"  alt="">
                </div>
                <div class="rating" data-id="${imgArr[id + 1]
                    .split("/")
                    .pop()
                    .split(".")[0]
                    .replace("%20", " ")}">
                    <i data-idx="1" class="rating__star star regular"></i>
                    <i data-idx="2" class="rating__star star regular"></i>
                    <i data-idx="3" class="rating__star star regular"></i>
                    <i data-idx="4" class="rating__star star regular"></i>
                    <i data-idx="5" class="rating__star star regular"></i>
                </div>
            </div>
        </div>`,
        "text/html"
    );
    let element = dom.getElementById(id);
    const images = element.querySelectorAll("img");
    images[0].src = imgArr[id];
    images[1].src = imgArr[id + 1];
    // images[0].src = `brand_logos/${brand[id]}`;
    // images[1].src = `brand_logos/${brand[id + 1]}`;
    let raters = element.querySelectorAll(".rating");
    raters[0].addEventListener("click", giveRating);
    raters[1].addEventListener("click", giveRating);
    let timer = setTimeout(() => {
        element.classList.toggle("active");
        clearTimeout(timer);
    }, 20);
    return element;
};

// removing the single element
const removeElement = (element, flag = false) => {
    let raters = element.querySelectorAll(".rating");
    raters[0].removeEventListener("click", giveRating);
    raters[1].removeEventListener("click", giveRating);
    if (flag) {
        element.remove();
    } else {
        let timer = setTimeout(() => {
            element.classList.add("de-active");
            clearTimeout(timer);
            let timer1 = setTimeout(() => {
                element.remove();
                clearTimeout(timer1);
            }, TRANSITION);
        }, TRANSITION);
    }
};

// removing the all element at the end
const removeAllElement = () => {
    const children = [...wrapper.children];
    for (let i = 0; i < children.length; i++) {
        removeElement(children[i], true);
    }
};

// give rating function attach to the eventListener
const giveRating = (e) => {
    const which = e.currentTarget.getAttribute("data-id");
    const stars = [...e.currentTarget.children];
    if (e.target !== e.currentTarget) {
        let idx = Number(e.target.getAttribute("data-idx")) - 1;
        stars.forEach((star) => {
            star.classList.remove("solid");
            star.classList.add("regular");
        });
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.add("solid");
            if (idx == i) break;
        }
        ratings[which] = idx + 1;
    }
};

// close
const finish = () => {
    removeAllElement();
    let rate = { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" };
    for (let [key, value] of Object.entries(ratings)) {
        value = Number(value);
        rate[value] += `${key}<br>`;
    }
    let str = "";
    for (let [key, value] of Object.entries(rate)) {
        str += `<p class="type-rate">Rating ${key}</p><p class="brand">${value}</p>`;
    }
    const para = document.createElement("div");
    para.innerHTML = `<h4>Finish ratings!!!</h4>${str}`;
    wrapper.appendChild(para);
    wrapper.classList.add("game-end-wrapper");
};

// start
const startRating = () => {
    currentTime = new Date();
    console.time();
    wrapper.append(createElement(counter * 2));
    counter++;
    let interval = setInterval(() => {
        if (counter == NO) {
            console.timeEnd();
            clearInterval(interval);
            finish();
            return;
        }
        if (wrapper.childElementCount === noOfRows) {
            removeElement(wrapper.firstElementChild);
        }
        wrapper.append(createElement(counter * 2));
        counter++;
    }, TIME_INTERVAL + TRANSITION);
};

const displayInstruction = () => {
    const para = document.createElement("p");
    para.classList.add("start-para");
    para.innerHTML = `You will see images coming up now .... <br><br>
                        Please give your 5-star rating to them <br><br>
                        Each image will wait 2 seconds for your rating`;
    wrapper.appendChild(para);
    const offsetHeight = para.offsetHeight;
    // let cont = Math.ceil(screenHeight / offset);
    let bottom = 32;
    let i = 0;
    let interval = setInterval(() => {
        console.log(offsetHeight + para.offsetTop);
        if (offsetHeight + para.offsetTop < 0) {
            clearInterval(interval);
            para.remove();
            startRating();
            return;
        }
        para.style.bottom = `calc(50% + ${bottom}px )`;
        bottom += 32;
    }, 1000);
};
let imgArr = [];
function preloadImages(urls, allImagesLoadedCallback) {
    var loadedCounter = 0;
    var toBeLoadedNumber = urls.length;
    urls.forEach(function (url) {
        preloadImage(url, function (img) {
            imgArr.push(img.src);
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
}

// Let's call it:
// preloadImages(
//     brand.map((item) => `brand_logos/${item}`),
//     () => {
//         document.querySelector(".spinner-wrapper").remove();
//         if (confirm("Start the rating process") == true) {
//             displayInstruction();
//             // startRating();
//         } else {
//             const para = document.createElement("p");
//             para.classList.add("game-end");
//             para.innerHTML = `You cancel the game refresh to restart`;
//             wrapper.appendChild(para);
//             wrapper.classList.add("game-end-wrapper");
//         }
//     }
// );
