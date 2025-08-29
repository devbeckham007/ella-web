let counter =1;
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")
var time = 1000000;
function showMain(m) {
    let slideShow = document.querySelectorAll(".work")
    if (m>slideShow.length) {
        counter= 1;
    }
    if (m<1) {
        counter =slideShow.length
    }
  Array.from(slideShow).forEach(function (main) {
    main.style.display = "none"
   
  })  
  slideShow[counter-1].style.display="flex"
}
function add(t) {
    showMain(counter+=t)
}
showMain(counter)
prev.addEventListener("click",function(e) {
    add(-1)
     main.e.target.style.transfrom="translateX(-100px)"
    slideShow.style.transfrom="translateX(0px)"
})
next.addEventListener("click",function(e) {
    add(1)
})