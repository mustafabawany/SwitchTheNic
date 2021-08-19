const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;

    var data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/26537577bb";

    const options = {
        method: "POST",
        auth: "mustafa:e76d5e42ed8a6d10c47ecce06c00c617-us17"

    }

    const request = https.request(url,options,function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/index.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure" , function(req,res){
    res.sendFile(__dirname + "/index.html");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})


// e76d5e42ed8a6d10c47ecce06c00c617-us17

//26537577bb