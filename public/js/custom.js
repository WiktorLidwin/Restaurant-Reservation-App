var socket = io();
// loginSubmit = document.getElementById("loginSubmit")
// loginSubmit.addEventListener("click", (e)=>{
//     console.log("uerere")
//     function success(data){
        
//     }
//     $.ajax({
//         type: "POST",
//         url: "/api/login",
//         data: {"email":document.getElementById("loginEmail").nodeValue ,"password":document.getElementById("loginPassword").nodeValue },
//         success: success,
//         dataType: "json"
//       });
     
// })

function yardhouseOnClickBtn(){
    numberOfPeople = document.getElementById("seats").value  
    var formData ={"resturantID":"yardhouse", "numberOfPeople":numberOfPeople}
    $.ajax({
        type: 'post',
        url: '/api/reservations',   
        contentType: 'application/json',
        data: JSON.stringify(formData),
        xhrFields: {
            withCredentials: false
        },  
        headers: {
    
        }, 
        success: function (data) {
            reseverations = JSON.parse(data)
            table = document.getElementById("table")
            var row = document.createElement("TR");
            
            var refCell = document.createElement("TD");
            var growerCell = document.createElement("TD");
            var itemCell = document.createElement("TD");
        
            row.appendChild(refCell);
            row.appendChild(growerCell);
            row.appendChild(itemCell);
        
            var ref = document.createTextNode("Table");
            var grower = document.createTextNode("Time");
            var item = document.createTextNode("Seats");
        
            refCell.appendChild(ref);
            growerCell.appendChild(grower);
            itemCell.appendChild(item);
        
            table.appendChild(row);
            for (var i = 0; i < reseverations.length; i++) {
                var reseveration = reseverations[i];
                var row = document.createElement("TR");
            
                var refCell = document.createElement("TD");
                var growerCell = document.createElement("TD");
                var itemCell = document.createElement("TD");
            
                row.appendChild(refCell);
                row.appendChild(growerCell);
                row.appendChild(itemCell);
            
                var ref = document.createTextNode(reseveration.table);
                var grower = document.createTextNode(reseveration.reservationDate);
                var item = document.createTextNode(reseveration.numberOfPeople);
            
                refCell.appendChild(ref);
                growerCell.appendChild(grower);
                itemCell.appendChild(item);
            
                table.appendChild(row);
                // document.body.appendChild(document.createElement('hr'));
              }
            console.log('Success');
            // document.cookie = JSON.stringify(data);
            // window.location.href = "/profile.html"
        },  
        error: function (err) {
            console.log(err)
            console.log(err.status, " ", err.responseText)
            console.log('We are sorry but our servers are having an issue right now');
        }
    })
}


function signUpBtnOnClick(){
    first_name = document.getElementById("signUpFirstName").value  
    last_name = document.getElementById("signUpLastName").value  
    email = document.getElementById("signUpEmail").value  
    password = document.getElementById("signUpPassword").value  
    confirmpassword = document.getElementById("signUpPasswordConfirm").value  
    type = document.getElementById("userType").value 
    if(password !== confirmpassword){
        document.getElementById("signUpPasswordConfirm").style.visibility = "visible"  
        return
    }
    var formData ={"first_name":first_name, "last_name":last_name, "email":email, "password":password, "type":type}
    $.ajax({
        type: 'post',
        url: '/api/register',   
        contentType: 'application/json',
        data: JSON.stringify(formData),
        xhrFields: {
            withCredentials: false
        },  
        headers: {
    
        }, 
        success: function (data) {
            console.log('Success');
            console.log(data);
            document.cookie = JSON.stringify(data);
            window.location.href = "/profile.html"
        },  
        error: function (err) {
            console.log(err)
            console.log(err.status, " ", err.responseText)
            console.log('We are sorry but our servers are having an issue right now');
        }
    })


}

function profileBtnOnClick(){
    console.log("btn")
    if (document.cookie == ""||document.cookie == undefined || document.cookie == null ||  document.cookie == "undefined"){
        window.location.href = "/login.html"
    }else{
        window.location.href = "/profile.html"
    }
}

function logout(){
    document.cookie = undefined
    

    window.location.href = "/login.html"
}

function profileOnLoad(){
    console.log("here")
    cookies = JSON.parse(document.cookie)
    console.log(cookies)
    
    document.getElementById("profileName").textContent = "Name: " + cookies.first_name+" "+ cookies.last_name
    document.getElementById("profileEmail").textContent = "Email: " + cookies.email

}

function helloTextOnLoad(){
    console.log("here")
    temp = document.cookie
    console.log(temp)
    console.log(temp == "undefined")
    if (temp == "undefined"){
        console.log("wat")
        window.location.href = "/indexLoggedOut.html"   
        return;
    }else{
        console.log("???")
        cookies = JSON.parse(document.cookie)
    console.log(cookies)
    
    document.getElementById("helloText").textContent = "Hello " + cookies.first_name
    }
    
}

function loginSubmitOnClick(){
    console.log("onclick")
    console.log({"email":document.getElementById("loginEmail").value ,"password":document.getElementById("loginPassword").value })
    // $.post("/api/login",{"email":document.getElementById("loginEmail").value ,"password":document.getElementById("loginPassword").value }, function(result){
    //     console.log("yaaa", result)
    // });
    var formData = {"email":document.getElementById("loginEmail").value ,"password":document.getElementById("loginPassword").value }
    $.ajax({
        type: 'post',
        url: '/api/login',   
        contentType: 'application/json',
        data: JSON.stringify(formData),
        xhrFields: {
            withCredentials: false
        },  
        headers: {
    
        }, 
        success: function (data) {
            console.log('Success');
            console.log(data);
            document.cookie = JSON.stringify(data) ;
            window.location.href = "/indexLoggedIn.html"
        },  
        error: function (err) {
            console.log(err)
            console.log(err.status, " ", err.responseText)
            console.log('We are sorry but our servers are having an issue right now');
            if(err.responseText == "Invalid Credentials"){
                console.log("wrong")
                document.getElementById("incorretPasswordText").style.visibility = "visible"
            }
        }
    })
}

// $("loginSubmit").click(function(){
    
//   });

// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});



/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}