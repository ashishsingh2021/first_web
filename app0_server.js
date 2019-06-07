const express =require('express');
const hbs=require('hbs');
const fs=require('fs');    //TO SAVE LOG FILES 

var app=express();

app.use((req,res,imp_to_call_this)=>{                               // ANOTHER EXAMPLE OF MIDDLEWARE IS KEEP RECORD OF VISITED WEBSITES
  var d=new Date().toString();
  var log_data=`THE TIME IS ${d} REQ-METHOD ${req.method} REQ-URL ${req.url}`;
  fs.appendFile('server.log',log_data+'\n',(err)=>{
    if(err)
    {
      console.log('Unable to append to server.log ');
    }
  });
console.log(log_data);
imp_to_call_this();
});

//app.use((req,res,next)=>{                                          //UNCOMMENT THIS WHEN MAINTENANCE IS OVER
//  res.send("<h1>WE ARE UNDER MAINTENANCE. WE WILL BE BACK SOON !!!!</h1>");
//});


app.get('/',(req,res)=>{                                           //HOME PAGE
res.send("<h1>WELCOME TO HOME PAGE </h1> </br>LINK:<a href='/about'>ABOUT</a></br><a href='/help'>HELP</a>");
});




app.use(express.static(__dirname+'/server_with_HTML'));     //FOLDER CONTAINING HTML PAGES

app.set('view engine','hbs'); //TO USE TEMPLATE
hbs.registerPartials(__dirname+'/views/partials'); //FOR PARTIAL FOOTER
hbs.registerHelper('helper_fun_name_here_getCurrDate',()=>{

  var date=new Date().getDate();
  var month=new Date().getMonth();
  var year=new Date().getFullYear();
  var date_=`${date}-${month}-${year}`
  return date_;
});


app.get('/about',(req,res)=>{
  res.render('app0_template.hbs',
  {

    title_:" ABOUT PAGE",
    heading_:"ABOUT ME  AND U  ",

    body_:"I LOVE PROGRAMMING ... "
  });
});

app.get('/help',(req,res)=>{
  res.render('app0_template.hbs',
  {
    title_:" HELP PAGE",
    heading_:"HELP !!!!!! ",

    body_:"I LOVE TO EAT... "
  });
});

app.listen(3000,()=>{console.log(" SERVER LISTENING AT PORT NO 3000 ");});
