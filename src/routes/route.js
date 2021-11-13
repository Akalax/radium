const express = require('express');

const router = express.Router();
module.exports = router;



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});





router.get('/movies', function (req, res) {

    res.send(["Shersah","suryavanshi","3 idiots","Lagaan","Kyon kii"])
});






router.get('/movies/:index', function (req, res) {
    let value=req.params.index;
    console.log("The passindex is  "+value);
    let arr=["Shersah","suryavanshi","3 idiots","Lagaan","Kyon kii","Nirhua rikshaw wala"];
    let a=arr.length;
    if(value<=a-1)
    {
        res.send(arr[value]);
    }
    else{
        res.send("The index does not exists");
    }

    
});


router.get('/films', function (req, res) {
    let arr=[{id:1 ,name:"The shining"},{id:2,name:"incendices"},{id:3,name:"Rang de basanti"},{id:4,name:"Finding Nemo"}];
    res.send(arr);
    // let len=arr.length;
    // for(let i=0;i<len;i++)
    // {
    //     res.send(arr[i]);
    // }
});





router.get('/films/:filmid', function (req, res) {
    let arr=[{id:1 ,name:"The shining"},{id:2,name:"incendices"},{id:3,name:"Rang de basanti"},{id:4,name:"Finding Nemo"}];
     let len=arr.length;
     let b=0;
     let a = Number(req.params.filmid);
    for(let i=0;i<len;i++)
     {
        if(arr[i].id===a)
        {
            res.send(arr[i]);
            b=1;
            break;
        }
     }
     if(b===0)
     {
         res.send("The movie doesnot exist with this id ="+a);
     }
});

// finding the missing number
router.get('/number', function (req, res) {

    let arr=[1,2,3,4,6,7,9];
    let len=arr.length;
    let num=arr[0];
    for(let i=0;i<len;i++)
    {
        if(arr[i]!==num){
            res.send("This number is missing: "+num);
            break;
        }
        num++;
    }
    
});

// finding the number missing more than 2
router.get('/numberTwo', function (req, res) {

    let arr=[33,35,36,37,39];
    let len=arr.length;
    let num=arr[0];
    let arr1=[];
    for(let i=0;i<len;i++)
    {
        if(arr[i]!==num){
            arr1.push(num);
            num++;
        }
        num++;
    }
    res.send("These number are missing from sequence :"+arr1);
    
});



let arr=[{"id":1 ,"name":"The shining", "rating":8, "director": "Stanley Kubrik", "genre": "horror"},
    {"id":2, "name":"Shersah", "rating":5, "director": "Vishnu vardhan", "genre": "Action"},
    {"id":3, "name":"Rang de basanti", "rating":9, "director": "Rakesh omparkash", "genre": "Comedy"},
    {"id":4, "name":"Enternals", "rating":10, "director": "Chloe Zhao", "genre": "Action and Suspense"}];
//Write a GET api to fetch specific movies (path -> /specific-movies) with the help of query params - rating and genre
router.get('/findMov', function (req, res) {
     let len=arr.length;
     let b=0;
     let rate = (req.query.rating);
     let gen =(req.query.genre);

    for(let i=0;i<len;i++)
     {
        if(arr[i].rating==rate && arr[i].genre==gen)
        {
            res.send({"movies":arr[i]});
            b=1;
            break;
        }
     }
     if(b===0)
     {
         res.send("The movie doesnot exist with given rating and genre");
     }
});



// Write a POST api to add a movie to the movies collection (path -> /specific-movies ).
router.post('/specific-movies', function (req, res) {

    let value=req.body;
    console.log(value);
    if(value.rating>10)
    {
        res.send("The rating is not greter than 10")
    }
    else if(value.director==false)
    {
        res.send("The director name is mandatory")
    }
    else{
        arr.push(value);
       res.send({"movies":arr});
    }
});




//Write a GET api (path -> /best-movie) that returns only one movie that has the highest rating in the collection
router.get('/best-movie', function (req, res) {
    let len=arr.length;
    let arr1=[];

   for(let i=0;i<len;i++)
    {
       arr1.push(arr[i].rating);
    }
    let max=Math.max(...arr1);
    for(let j=0;j<len;j++)
    {
        if(arr[j].rating===max)
        {
            res.send({"Movies":arr[j]})
        }
    }
});


//Write a POST /players api that saves a player’s details and doesn’t allow saving the data of a player with a name that
//already exists in the data

let player=[{
    "name": "manish",
    "dob": "1/1/1995",
    "gender": "male",
    "city": "jalandhar",
    "sports": ["swimming"]
    }];
let booking=[{
    "bookingNumber": 1,
    "sportId": "",
    "centerId": "",
    "type": "private",
    "slot": 16286598000000,
    "bookedOn": "31/08/2021",
    "bookedFor": "01/09/2021"
    }];

router.post('/players', function (req, res) {
    let a=req.body;
    let b=0;
    if(player.length===0) //If player array is empty then push the value without cheking any condition
    {
        player.push(a);
        res.send(player);
    }
    else{
        let len=player.length;  //calculating the length of array of players
        for(let i=0;i<len;i++)
        {
            if(a.name===player[i].name)  //Its cheking the player name is not same
            {
                b=1;
                break;
            }
        }
        if(b===0)
        {
            player.push(a);          // pushing the object if player is not same
            res.send(player);
        }
        else{
            res.send("This player is already exists");    //sending to the client error message
        }

    }
});

router.post('/players1/:playername/booking/:bookingid' , function(req,res){
    let newBooking=req.body;    //Accessing the value from post body
    let bid=req.params.bookingid;   //Accessing the value from bookingid variable
    let plName=req.params.playername; ////Accessing the value playername variable
    let len=player.length;            // calculating the length of player array
    let lenOfBookArr=booking.length;
    let b=0;
    let flag=true;
    for(let i=0;i<len;i++)        // Array traversal is performed
    {
        if(player[i].name===plName){    //Cheking the player name is exists or not
            b=1;
        }
        if(lenOfBookArr>0){               // cheking the if booking is empty or noot
            if(booking[i].bookingNumber==bid) //Cheking the booking id is exists or not
            {
                flag=false;
            }

        }
    }
    if(b===0)
    {
        res.send("The player doesnot exits");// throw the Error message to the client 
    }
    else{
        if(flag===false)
        {
            res.send("This id is already exists");    // Throw the erroe message to the client if given id is already exists
        }
        else{
            booking.push(newBooking);
            res.send(booking);
        }

    }


});
