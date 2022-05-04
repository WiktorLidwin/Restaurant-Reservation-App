const { ConnectionCheckOutFailedEvent } = require("mongodb");

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


function reservationSubmitonCLick(){
    table = document.getElementById("table")
            
    // document.getElementsByClassName("tableRow").remove();
    var children = table.children;
    // table.children = [table.children[0]];
    for (var i = 1; i < children.length; i++) {
        var tableChild = children[i];
        // console.log(tableChild.children[3].children[0].value)
        // console.log()
        if(tableChild.children[3].children[0].checked){
            if (document.cookie == ""||document.cookie == undefined || document.cookie == null ||  document.cookie == "undefined"){
                window.location.href = "/login.html"
            }
            var formData ={"confirmationNumber":tableChild.children[3].children[0].id, "email":cookies = JSON.parse(document.cookie).email, "token":cookies = JSON.parse(document.cookie).token}
    
            $.ajax({
                type: 'post',
                url: '/api/reserve',   
                contentType: 'application/json',
                data: JSON.stringify(formData),
                xhrFields: {
                    withCredentials: false
                },  
                headers: {
            
                }, 
                success: function (data) {
                    console.log(data)
                    // reseverations = JSON.parse(data)
                    confirmationText = document.getElementById("confirmationText")
                    confirmationText.textContent = "Your confirmation number is " + tableChild.children[3].children[0].id
                    confirmationText.style.visibility = "visible"
            
                    console.log('Success');
                    yardhouseOnClickBtn()
                    // document.cookie = JSON.stringify(data);
                    // window.location.href = "/profile.html"
                },  
                error: function (err) {
                    console.log(err)
                    console.log(err.status, " ", err.responseText)
                    console.log('We are sorry but our servers are having an issue right now');
                }
            })
            return;
        }
        // if(tableChild.class !== "tableRow"){
        //     console.log("remove")
        //     tableChild.remove()
        // }
    }
}


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
            console.log(data)
            console.log(reseverations)
            table = document.getElementById("table")
            
            // document.getElementsByClassName("tableRow").remove();
            var children = table.children;
            // table.children = [table.children[0]];
            for (var i = 1; i < children.length; i++) {
                var tableChild = children[i];
                tableChild.remove()
                i--;
                // if(tableChild.class !== "tableRow"){
                //     console.log("remove")
                //     tableChild.remove()
                // }
            }
            // for(child in children){
            //     if (child.class == "tableRow"){
            //         child.remove()
            //     }
            // }
            for (var i = 0; i < reseverations.length; i++) {
                var reseveration = reseverations[i];
                var row = document.createElement("TR");
                row.class="tableRow"
                var refCell = document.createElement("TD");
                var growerCell = document.createElement("TD");
                var itemCell = document.createElement("TD");
                var checkbox = document.createElement("TD");
                

                row.appendChild(refCell);
                row.appendChild(itemCell);
                row.appendChild(growerCell);
                row.appendChild(checkbox);
            
                var ref = document.createTextNode(reseveration.table);
                var grower = document.createTextNode(reseveration.reservationDate);
                var item = document.createTextNode(reseveration.numberOfPeople);
                var reserveText = document.createTextNode("Reserve");
                var reserveCheckbox = document.createElement("INPUT");
                reserveCheckbox.type = "checkbox"
                reserveCheckbox.name = "selected-table"
                
                reserveCheckbox.value = "1"
                reserveCheckbox.value = "Reserve"
                reserveCheckbox.id = reseveration.confirmationNumber

                refCell.appendChild(ref);
                growerCell.appendChild(grower);
                itemCell.appendChild(item);
                
                checkbox.appendChild(reserveText);
                checkbox.appendChild(reserveCheckbox);
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

    table = document.getElementById("profileTable");
     
    if (document.cookie == ""||document.cookie == undefined || document.cookie == null ||  document.cookie == "undefined"){
        window.location.href = "/login.html"
    }
    var formData ={"email":cookies = JSON.parse(document.cookie).email, "token":cookies = JSON.parse(document.cookie).token}

    $.ajax({
        type: 'post',
        url: '/api/userreservations',   
        contentType: 'application/json',
        data: JSON.stringify(formData),
        xhrFields: {
            withCredentials: false
        },  
        headers: {
    
        }, 
        success: function (data) {
            console.log(data)
            reseverations = JSON.parse(data)
            for (var i = 0; i < reseverations.length; i++) {
                var reseveration = reseverations[i];
                var row = document.createElement("TR");
                row.class="tableRow"
                var refCell = document.createElement("TD");
                var growerCell = document.createElement("TD");
                var itemCell = document.createElement("TD");
                var confirmationbox = document.createElement("TD");
                

                row.appendChild(refCell);
                row.appendChild(itemCell);
                row.appendChild(growerCell);
            
                var ref = document.createTextNode(reseveration.table);
                var grower = document.createTextNode(reseveration.reservationDate);
                var item = document.createTextNode(reseveration.numberOfPeople);
                var confirmationNumber = document.createTextNode(reseveration.confirmationNumber);
                

                refCell.appendChild(ref);
                growerCell.appendChild(grower);
                itemCell.appendChild(item);
                confirmationbox.appendChild(confirmationNumber);
                
                table.appendChild(row);
                // document.body.appendChild(document.createElement('hr'));
              }
            
        },  
        error: function (err) {
            console.log(err)
            console.log(err.status, " ", err.responseText)
            console.log('We are sorry but our servers are having an issue right now');
        }
    })


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