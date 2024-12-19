let currentIndex = 0;
let translate = 0;
const speedTime = 500;

const carousel = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".carousel-slide");

const nowpage = document.querySelector(".nowpage");
const slideLength = document.querySelector(".slide-length");
slideLength.innerHTML = slides.length;

/* 클론 */
const firstClone = slides[0].cloneNode(true);
carousel.appendChild(firstClone);
const lastClone = slides[slides.length - 1].cloneNode(true);
carousel.insertBefore(lastClone, slides[0]);

/* CSSOM 셋업 */
const sliderCloneLis = document.querySelectorAll(".carousel-slide");
const liWidth = slides[0].clientWidth;
const sliderWidth = liWidth * sliderCloneLis.length;
carousel.style.width = `${sliderWidth}px`;
currentIdx = 1;
translate = -liWidth;
carousel.style.transform = `translateX(${translate}px)`;

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

document.addEventListener("click", (e) => {
  moveSlide(e);
  console.log*currentIdx
  if(currentIdx > slides.length){
    nowpage.innerHTML = 1  
  }else if(currentIdx < 1){
    nowpage.innerHTML = slides.length
  }else{
    nowpage.innerHTML = currentIdx;
  }
});

/* 슬라이드 실행 */
function move(D) {
  currentIdx += -1 * D;
  translate += liWidth * D;
  carousel.style.transform = `translateX(${translate}px)`;
  carousel.style.transition = `all ${speedTime}ms ease`;
  
}

/* 클릭 버튼 */
function moveSlide(event) {
  event.preventDefault();
  if (event.target.closest(".next")) {
    move(-1);
    if (currentIdx === sliderCloneLis.length - 1)
      setTimeout(() => {
        carousel.style.transition = "none";
        currentIdx = 1;
        translate = -liWidth;
        carousel.style.transform = `translateX(${translate}px)`;
      }, speedTime);
  } else if (event.target.closest(".prev")) {
    move(1);
    if (currentIdx === 0) {
      setTimeout(() => {
        carousel.style.transition = "none";
        currentIdx = sliderCloneLis.length - 2;
        translate = -(liWidth * currentIdx);
        carousel.style.transform = `translateX(${translate}px)`;
      }, speedTime);
    }
  }
}