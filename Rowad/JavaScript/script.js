let moons =  document.querySelectorAll('.mooon');

moons.forEach((moon)=>{
  moon.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-theme');
    if( document.body.classList.contains('dark-theme')){
      moon.src = '/ROWAD/Media/sun.png'
    }
    else{
      moon.src = '/ROWAD/Media/moon.png'
    }
  })
})



//////////////////////////steps progress bar/////////////////////////////////
const progressBar = document.querySelector('#progress-bar');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');

function updateProgressBar(increment) {
    const currentWidth = parseFloat(progressBar.style.width) || 0;
    let newWidth = currentWidth + increment;
    newWidth = Math.max(0, Math.min(newWidth, 100)); // Ensure the width stays between 0% and 100%
    progressBar.style.width = newWidth + '%';
}

btn1.addEventListener('click', function() {
    updateProgressBar(-33.33); // Decrease progress by 33.33% when btn1 (Previous) is clicked
});

btn2.addEventListener('click', function() {
    updateProgressBar(33.33); // Increase progress by 33.33% when btn2 (Next) is clicked
});
const optionMenu = document.querySelector(".select-menu"),
      selectBtn = optionMenu.querySelector(".select-btn"),
      options = optionMenu.querySelectorAll(".option"),
      sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
    });
});


// ThemeChanger-----------------------------

