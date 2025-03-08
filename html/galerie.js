    let ob_imagini = 
    [{sursa: "toamna_la_deal.jpg", alt:"toamna_la_deal"}, 
    {sursa: "gradina_ceata.jpg", alt:"vreme cetoasa in gradina"}, 
    {sursa: "apus_livada_primavara.jpg", alt:"livada inflorita"}, 
    {sursa: "vie_apus_1.jpg", alt:"apus in vie"}, 
    {sursa: "ulita_iarna.jpg", alt:"iarna pe ulita"},
    {sursa: "helesteu_aprilie_1.jpg", alt:"primavara la tara"}, 
    {sursa: "gradina_furtuna.jpg", alt:"vreme furtunoasa"},
    {sursa: "helesteu_aprilie_2.jpg", alt:"padurea"}];

let slideshow = document.getElementById("slideshow");    


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

function afisare_galerie(colectie_poze, nr){
    let poza_bigsize = colectie_poze[nr].cloneNode();
    poza_bigsize.id = "centru";

    let poza_stanga, poza_dreapta;
    if(nr == 0){
        poza_stanga = colectie_poze[colectie_poze.length - 1].cloneNode();
    }
    else{
        poza_stanga = colectie_poze[nr - 1].cloneNode();
    }

    if(nr == colectie_poze.length - 1){
        poza_dreapta = colectie_poze[0].cloneNode();
    }
    else{
        poza_dreapta = colectie_poze[nr + 1].cloneNode();
    }
    poza_stanga.id = "stanga";
    poza_dreapta.id = "dreapta";

    slideshow.appendChild(poza_bigsize);
    slideshow.insertBefore(poza_stanga, poza_bigsize);
    slideshow.appendChild(poza_dreapta);
    let fotos = slideshow.children;
    for(var f of fotos){
        var ecl = f.classList;
        ecl.remove("galerie-poza-mini")
        ecl.add("imagine-slideshow");
        if(f != poza_bigsize){
            ecl.add("imagine-laterala");
        }
    }
}


window.addEventListener("load", creareGalerie);
function creareGalerie(){
    let galerie = document.getElementById("galerie-mini");
    for(var ob of ob_imagini){
        let img = document.createElement("img")
        img.className = "galerie-poza-mini";
        img.src = "pictures/" + ob.sursa;
        img.alt = ob.alt;
        galerie.appendChild(img);
    }
    let poze = document.getElementsByClassName("galerie-poza-mini");
    let nr_random = Math.floor(Math.random() * poze.length);
    //prima poza afisata
    afisare_galerie(poze, nr_random);

    let index = nr_random, prev_index, next_index;
    function slide(){
        if(index == 0){
            prev_index = poze.length-1;
        }
        else{
            prev_index = index - 1;
        }
        if(index == poze.length - 1){
            next_index = 0;
        }
        else{
            next_index = index + 1;
        }
        //cele trei poze din slideshow
        let stanga = document.getElementById("stanga");
        let centru = document.getElementById("centru");
        let dreapta = document.getElementById("dreapta");
        //cele trei poze din galerie
        let prev_pic = poze[prev_index];
        let crrt_pic = poze[index];
        let next_pic = poze[next_index];

        stanga.src = prev_pic.src; stanga.alt = prev_pic.alt;
        centru.src = crrt_pic.src; centru.alt = crrt_pic.alt;
        dreapta.src = next_pic.src; dreapta.alt = next_pic.alt;
        
        if(index == poze.length - 1)
            index = 0;
        else 
            index ++;
    }
    //console.log(poze.length);
    var repeta = setInterval(function(){
        slide();    
    }, 
    2000);           
    for (let poza of poze){
        poza.onclick = function(){
            clearInterval(repeta);
            let centru = document.getElementById("centru");
            centru.src = poza.src;
            centru.alt = poza.alt;
        }
    }
}