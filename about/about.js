// let prev = document.querySelector(".prev");
// let next = document.querySelector(".next");
//var counter = 1; // Start from 1 to match your slide display logic
// function showSlide(n) {
//     let slideShow = document.querySelectorAll(".slide-show")
//     if (n>slideShow.length) {
//         counter=1;
//     }
//     if (n<1) {
//         counter=slideShow.length;
//     }
//     Array.from(slideShow).forEach(function (main) {
//         main.style.display= "none"
//     });
//     slideShow[counter-1].style.display= "flex"
// }
// function adding(t) {
//     showSlide(counter +=t)
// }
// prev.addEventListener("click",function (e) {
//     adding(-1)
// })
// next.addEventListener("click",function (e) {
//     adding(1)
// })
// showSlide(counter)