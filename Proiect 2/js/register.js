function createDiv(id, text, elem){
    var div = document.createElement('div');
    div.setAttribute('id', id);
    div.setAttribute("style", "color: red;");
    div.innerHTML = text;
    document.getElementById(elem).appendChild(div);
}
function modifyDiv(id, newText){
    div = document.getElementById(id);
    div.innerHTML = newText;
}

function divExists(id){
    div = document.getElementById(id);
    if(div==null)
        return false;
    else 
        return true;
}

function getText(id){
    return document.getElementById(id).getAttribute('text');
}
function deleteNode(id){
    var el = document.getElementById(id);
    if(el)
        el.remove();
}

function verifyForm(){
    var email = verifyString('an email', 'wrong-email', 'email-row', 'emailaddress');
    var username = verifyString('the username', 'wrong-username', 'username-row', 'username');
    var password = verifyString('password', 'wrong-password', 'password-row', 'password');

    console.log(email + ''+ username +''+ password +'' );// + pass + '');
	

    if(email == true && username == true && password == true) //&& pass == true)
        if(document.getElementById('appointmentOption').value == 'New')
            saveAppointment();
        else if (document.getElementById('appointmentOption').value == 'Modify last appointment.')
            modifyLastAppointment();
    
    if (document.getElementById('appointmentOption').value == 'Delete last appointment.')
            deleteLastAppointment();
   
}

function verifyString(input, id, fatherElem, elem, defaultValue) {
    var element = document.getElementById(elem).value;

    if(element==null || element==""){
        text = 'You have to enter ' +  input + '!';
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
        createDiv(id, text, fatherElem);
        return false;
    }
    else if(element.length < 1){
        text = 'You have to enter ' + input + ' with at least 1 characters!';
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
        createDiv(id, text, fatherElem);
        return false;
    }
    else if(element.length > 100){
        text = 'You have to enter ' + input + ' with at less than 100 characters!';
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
        createDiv(id, text, fatherElem);
        return false;
    }
    else {
        deleteNode(id);
        return true;
    }
}

// Ajax
// Get
appId=1;

function getAppointments() {
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/appointments";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            dogs = JSON.parse(this.responseText);
            showAppointments(dogs);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function showAppointments(appointments) {

    appointments.forEach(function (appointment) {

        var ul = document.createElement('ul');
        ul.setAttribute('id', 'Details of appointment ' + appointment.id);
        document.getElementById('lista').appendChild(ul); 

        for (property in appointment) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(appointment[property]));
            li.setAttribute('id', property);
            if(property == 'id')
                appId = appointment[property];
            ul.appendChild(li);
        }

    })
}

 getAppointments();

//post
function saveAppointment() {
    var appointment = {};
    appointment.id = appId+1;
    appointment.email = document.getElementById('emailaddress').value;
    appointment.firstname = document.getElementById('firstname').value;
    appointment.lastname = document.getElementById('lastname').value;
    appointment.password = document.getElementById('password').value; 
    var json = JSON.stringify(appointment);

    var url = "http://localhost:3000/appointments";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var appointments = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(appointments);
        } else {
            console.error(appointments);
        }
    }
    xhr.send(json);
}

//put
function modifyLastAppointment() {

    var appointment = {};
    appointment.id = appId;
    appointment.email = document.getElementById('emailaddress').value;
    appointment.firstname = document.getElementById('firstname').value;
    appointment.lastname = document.getElementById('lastname').value;
    appointment.password = document.getElementById('password').value; 
    var json = JSON.stringify(appointment);
    var url = "http://localhost:3000/appointments";
    var xhr = new XMLHttpRequest();
    console.log(appId);
    xhr.open("PUT", url+'/' + appId, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var appointment = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(appointment);
        } else {
            console.error(appointment);
        }
    }
    xhr.send(json);
}

//delete
function deleteLastAppointment(number) {
    var url = "http://localhost:3000/appointments";

    var xhr = new XMLHttpRequest();
    console.log(appId);
    xhr.open("DELETE", url + '/' + appId, true);
    xhr.onload = function () {
        var appointments = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(appointments);
        } else {
            console.error(appointments);
        }
    }
    xhr.send(null);

}