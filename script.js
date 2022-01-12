const wrapper = document.querySelector("#main-wrapper");
const TIME_INTERVAL = 1000; // interval time
const TRANSITION = 100; // animation transition time
const NO = 50; // no of the rows
let counter = 0; // counter
let currentTime = new Date(); // current time when the script load
let stack = [];
let totalSpacing = 8 + 8; // padding top .5rem and bottom .5rem
let screenHeight = wrapper.offsetHeight - totalSpacing; // later it will be change to window.innerHeight
let colHeight = 200 + totalSpacing;
let noOfRows = Math.floor(screenHeight / colHeight);
let ratings = {};

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
                <p class="indicator">No: ${id + 1}</p>
                <div class="image-wrapper">Hi ${id + 1}</div>
                <div class="rating" data-id="${id + 1}">
                    <i data-idx="1" class="rating__star far fa-star"></i>
                    <i data-idx="2" class="rating__star far fa-star"></i>
                    <i data-idx="3" class="rating__star far fa-star"></i>
                    <i data-idx="4" class="rating__star far fa-star"></i>
                    <i data-idx="5" class="rating__star far fa-star"></i>
                </div>
            </div>
            <div class="img-col">
                <p class="indicator">No: ${id + 2}</p>
                <div class="image-wrapper">Hi ${id + 2}</div>
                <div class="rating" data-id="${id + 2}">
                    <i data-idx="1" class="rating__star far fa-star"></i>
                    <i data-idx="2" class="rating__star far fa-star"></i>
                    <i data-idx="3" class="rating__star far fa-star"></i>
                    <i data-idx="4" class="rating__star far fa-star"></i>
                    <i data-idx="5" class="rating__star far fa-star"></i>
                </div>
            </div>
        </div>`,
        "text/html"
    );
    let element = dom.getElementById(id);
    let raters = element.querySelectorAll(".rating");
    raters[0].addEventListener("click", giveRating);
    raters[1].addEventListener("click", giveRating);
    let timer = setTimeout(() => {
        element.classList.toggle("active");
        clearTimeout(timer);
    }, 1);
    return element;
};

// removing the single element
const removeElement = (element) => {
    let raters = element.querySelectorAll(".rating");
    raters[0].removeEventListener("click", giveRating);
    raters[1].removeEventListener("click", giveRating);
    let timer = setTimeout(() => {
        element.remove();
        clearTimeout(timer);
    }, 100);
};

// removing the all element at the end
const removeAllElement = () => {
    const children = [...wrapper.children];
    for (let i = 0; i < children.length; i++) {
        removeElement(children[i]);
    }
};

// give rating function attach to the eventListener
const giveRating = (e) => {
    const which = Number(e.currentTarget.getAttribute("data-id"));
    const stars = [...e.currentTarget.children];
    if (e.target !== e.currentTarget) {
        let idx = Number(e.target.getAttribute("data-idx")) - 1;
        stars.forEach((star) => {
            star.classList.remove("fas");
            star.classList.add("far");
        });
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.add("fas");
            if (idx == i) break;
        }
        ratings[which] = idx + 1;
    }
};

// close
const finish = () => {
    removeAllElement();
    const para = document.createElement("p");
    para.classList.add("game-end");
    para.innerHTML = `Thanks for giving ratings!!!`;
    wrapper.appendChild(para);
    wrapper.classList.add("game-end-wrapper");
    console.log("clear");
};

// start
const startRating = () => {
    currentTime = new Date();
    console.time();
    wrapper.append(createElement(counter * 2));
    // console.log(displayTime());
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
    const offset = para.offsetHeight;
    let cont = Math.ceil(screenHeight / offset);
    let bottom = 8 + offset;
    let i = 0;
    let interval = setInterval(() => {
        if (i == cont) {
            clearInterval(interval);
            para.remove();
            startRating();
            return;
        }
        para.style.bottom = bottom + "px";
        bottom += offset;
        i++;
    }, 1000);
};

if (confirm("Start the rating process") == true) {
    startRating();
} else {
    console.log("end");
}