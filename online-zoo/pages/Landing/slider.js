const testimonialsBlock = document.querySelector(".testimonials");
//const carousel = document.querySelector(".carousel");
//const buttonTest = document.getElementById("button-test");

function slideLeft() {
  document
    .querySelector(".testimonials")
    .classList.add("testimonials-left-slide");
  setTimeout(() => {
    document
      .querySelector(".testimonials")
      .classList.remove("testimonials-left-slide");
    let feedbackElements = document.querySelectorAll(".testimonials-item");
    document.querySelector(".testimonials").append(feedbackElements[0]);
  }, 1000);
}
/*
function slideFunc() {
  console.log("test");
  carousel.scrollTo(500, 0);
  let feedbackCards = document.querySelectorAll(".testimonials-item");
  document.querySelector(".testimonials").append(feedbackCards[0]);
  //testimonialsBlock.scrollTo(0, 0);
  //let feedbackCards = document.querySelectorAll('.testimonials-item');
  //document.querySelector('.testimonials').append(feedbackCards[0]);
}*/

let autoSlideInterval = setInterval(slideLeft, 10000);
let autoSlideTimeout = null;

const delayAutoSliding = (e) => {
  clearTimeout(autoSlideTimeout);
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;

  autoSlideTimeout = setTimeout(() => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(slideLeft, 10000);
  }, 20000);
};

testimonialsBlock.addEventListener('click', delayAutoSliding);
//buttonTest.addEventListener("click", slideLeft);
