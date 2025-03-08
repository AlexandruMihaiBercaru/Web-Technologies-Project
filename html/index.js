
window.addEventListener("load", function(){
  let buton_mic = document.getElementById("menu-button");
  let meniu = document.getElementById("multilevel-dropdown");
  buton_mic.addEventListener("click", afismeniu);
  function afismeniu(){
      if(window.innerWidth < 768){
          if(meniu.style.display === "none"){
              meniu.style.display = "flex";
          }
          else{
              meniu.style.display = "none";
          }
      }
  }
})



window.addEventListener("load", function(){
    var textarea = document.getElementById("descriere-poza");
    textarea.style.width = 500;
    var heightLimit = 500; /* Maximum height: 200px */
    textarea.oninput = function() {
    textarea.style.height = ""; /* Reset the height*/
    textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
    };
})
