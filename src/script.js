//Variablen
let arrshortcut = [];



//Function for Enterpress 
let input = document.getElementById("inputsearch");

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if(input.value != "")
            search();
    }
});

//SearchButtonFunction
document.getElementById("searchbutton").addEventListener("click",search);
function search(){
//let search = document.getElementById("inputsearch").value;
    let url ='https://www.google.com/search?q=' + input.value;    
    window.open(url,'_self');
    input.value = "";
}


//Fill Time Div 
setInterval(function() {
    let d = new Date()
    document.getElementById("time").innerHTML = 
    d.toTimeString().slice(0,5);
    document.getElementById("date").innerHTML = 
    d.toLocaleDateString(navigator.languages[0], {dateStyle: 'full'}).slice(0,-6);
}, 100);



//Addtile
let shortinput = document.getElementById("shortcutboxinput");

shortinput.addEventListener("keyup",touchHandler);
function touchHandler(event){
    if (event.key === "Enter") {
        let name = document.getElementById("name").value;
        let link = document.getElementById("link").value;
        if(name != "" && link != "")
            console.log("Hallooooo");
        else
            console.log("Neeeeeein")
    }
    if(event.key === "Escape"){
        closeInput();
    }
    
}

document.getElementById("add").addEventListener("click",add);
function add(){
    document.getElementById("shortcutboxinput").style.visibility = "visible";
}

document.getElementById("cancel").addEventListener("click", closeInput);
function closeInput(){
    document.getElementById("name").value = "";
    document.getElementById("link").value = "";
    document.getElementById("shortcutboxinput").style.visibility = "hidden";
}

document.getElementById("create").addEventListener("click", createShortcutbox);
function createShortcutbox(){
    let name = document.getElementById("name").value;
    let link = document.getElementById("link").value;
    if(name.trim().length !== 0 && link.trim().length !== 0){
        let scwrapper = document.getElementById("shortcutboxwrapper");
        scwrapper.insertBefore(addTile(link, name), scwrapper.lastElementChild);
        closeInput();
    }
}



//Test 
let shortcutboxwrapper = document.getElementById("shortcutboxwrapper");
shortcutboxwrapper.insertBefore(addTile("www.youtube.com/","Youtube"), shortcutboxwrapper.lastElementChild);
shortcutboxwrapper.insertBefore(addTile("blog.fefe.de/","Fefe"), shortcutboxwrapper.lastElementChild);
shortcutboxwrapper.insertBefore(addTile("www.google.de/","Google"), shortcutboxwrapper.lastElementChild);
shortcutboxwrapper.insertBefore(addTile("www.heise.de/","Heise"), shortcutboxwrapper.lastElementChild);
shortcutboxwrapper.insertBefore(addTile("www.twitch.tv/","Twitch"), shortcutboxwrapper.lastElementChild);
/*
shortcutboxwrapper.appendChild(addTile("blog.fefe.de/","Fefe"));
shortcutboxwrapper.appendChild(addTile("blog.fefe.de/","Fefe"));
shortcutboxwrapper.appendChild(addTile("blog.fefe.de/","Fefe"));
shortcutboxwrapper.appendChild(addTile("blog.fefe.de/","Fefe"));
*/


//Addtile function
function addTile(url, name){
    let shortcutbox = document.createElement("center");
        let shortcutlinkwrapper = document.createElement("div");
            let shortcutlink = document.createElement("a");
                let shortcuticon = document.createElement("div");
        let shortcutunder = document.createElement("div");

    shortcutbox.className = "shortcutbox";
    
    shortcutlinkwrapper.className = "shortcutlinkwrapper";

    shortcutlink.className = "shortcutlink";
    shortcutlink.href = "https://" + url;
    
    shortcuticon.className = "shortcuticon";
    shortcuticon.style.backgroundImage = "url(https://s2.googleusercontent.com/s2/favicons?domain="+url+")";
    
    shortcutunder.className = "shortcutunder";
    shortcutunder.innerText = name;
    
    shortcutlink.append(shortcuticon);
    shortcutlinkwrapper.append(shortcutlink);
    shortcutbox.append(shortcutlinkwrapper);
    shortcutbox.append(shortcutunder);  
    return shortcutbox;
}







chrome.storage.local.set("shortcut", );
