const express = require('express');
const formidable = require('formidable');
const fs = require('fs');


const app = express();


app.use(express.static('html'));
app.use(express.static('pictures'));
app.use('/post', express.urlencoded({extended:true}));

app.post('/homepage.html', function(request, response){
    var ob;
	if (fs.existsSync("poze.json"))
	    ob=JSON.parse(fs.readFileSync("poze.json"));
	else
	    ob=[];
    var form = new formidable.IncomingForm({uploadDir:'upload', keepExtensions:true});
    form.keepFileName=true;
    form.parse(request, function(err,fields,files){
        var obiect_din_formular= {  nume:fields.nume, 
                                    mail:fields.mail, 
                                    descriere:fields.descriere, 
                                    data:fields.data, 
                                    poza:files.mypicture,
                                    };
        ob.push(obiect_din_formular);

        if(err) 
            return response.redirect('404.html');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        //response.redirect(303, '/thank-you');

        fs.writeFileSync("poze.json", JSON.stringify(ob));
    });
   //response.send("Raspunsul dvs. a fost inregistrat!");
});



app.listen(8020, function(){
    console.log("Serverul asculta cereri pe portul 8020.");
});
