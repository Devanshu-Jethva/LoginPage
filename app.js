const { response, json } = require('express');
const express = require('express');
const app = express();
const https = require('https')

app.use(express.urlencoded())

app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req, res)=>{
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/a93b691f2c";

    const option = {
        auth : "Devanshu:49c2011cade68fac3c58b8be16fc3ff4-us17",
        method : 'POST'
    }

    const request = https.request(url, option, (response)=>{
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})


app.post("/failure",(req, res)=>{
    res.redirect("/");
})

// api key 49c2011cade68fac3c58b8be16fc3ff4-us17
// audience id a93b691f2c

app.listen(process.env.PORT || 3000, (req, res)=>{
    console.log("app is listening on port 3000 at http://localhost:3000");
})