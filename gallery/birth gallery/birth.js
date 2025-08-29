let works = document.querySelectorAll(".work")
works.forEach(function (main) {
    main.style.display ="none"
});

let show = document.querySelector("#show")
show.addEventListener("change",function () {
    works.forEach(function(main) {
        if (show.checked) {
            main.style.display= "block"
        } else{
             main.style.display= "none"
        }
    });
})