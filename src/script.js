/*
http://www.inf.fu-berlin.de/inst/ag-ki/rojas_home/documents/tutorials/WieDiss-2.pdf
https://karpathy.medium.com/
http://karpathy.github.io/
*/

/* 
https://stackoverflow.com/questions/5102878/where-is-the-documentation-for-the-google-suggest-api
https://www.google.de/search?q=google+search+api+show+search+recommendations&sxsrf=ALiCzsYr77naaO2jRS5jBr3b1kaoPoXt4g%3A1664790852704&source=hp&ei=RLE6Y-TYKP6Fxc8PvYuH2A4&iflsig=AJiK0e8AAAAAYzq_VI--JdnsjxP_rHrR5ziqDKN5vhk-&oq=Google+search+api+show+search+recom&gs_lcp=Cgdnd3Mtd2l6EAMYADIFCCEQoAEyBQghEKABOgQIIxAnOgsIABCABBCxAxCDAToICAAQsQMQgwE6CAgAEIAEELEDOgcIABCABBAKOhEILhCABBCxAxCDARDHARDRAzoNCC4QgAQQxwEQ0QMQCjoHCAAQChDLAToFCAAQgAQ6BwgjELECECc6CggAELEDEIMBEAo6BQgAEMsBOgYIABAeEBY6CAgAEB4QCBANOgQIIRAVOggIIRAeEBYQHToHCCEQoAEQClAAWO5XYJZbaAtwAHgAgAF1iAGYGpIBBDM0LjaYAQCgAQE&sclient=gws-wiz
https://cssgradient.io/swatches/
https://www.google.com/search?q=CSS+Gradients+curve+&rlz=1C1CHBD_deDE938DE938&sxsrf=ALiCzsaVVmVaaxFS8y7dsz50BohrVd-qQw%3A1664658102892&ei=tqo4Y_2ONp2Xxc8PmZ-3oA4&ved=0ahUKEwj9wZTX9r_6AhWdS_EDHZnPDeQQ4dUDCA4&uact=5&oq=CSS+Gradients+curve+&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEB4QFjIGCAAQHhAWMgYIABAeEBYyBggAEB4QFjIICAAQHhAPEBY6CggAEEcQ1gQQsAM6BwgAELADEEM6DQgAEOQCENYEELADGAE6EgguEMcBENEDEMgDELADEEMYAjoPCC4Q1AIQyAMQsAMQQxgCOgUIABCABDoHCAAQChDLAToFCAAQywE6BQghEKABOgoIABAeEA8QFhAKSgQIQRgASgQIRhgBUNgBWKUiYOgiaAVwAXgAgAFbiAGwBpIBAjExmAEAoAEByAERwAEB2gEGCAEQARgJ2gEGCAIQARgI&sclient=gws-wiz
https://css-tricks.com/easing-linear-gradients/
https://stackoverflow.com/questions/45494235/is-it-possible-to-do-a-curved-line-with-css-gradient
https://meshgradient.in/
https://unused-css.com/tools/gradient-generator
*/



/*
https://stackoverflow.com/questions/32935435/use-div-as-radio-button

https://docs.keywordtool.io/docs
https://docs.keywordtool.io/docs/keyword-suggestions-endpoint
https://www.youtube.com/watch?v=QxMBHi_ZiT8
https://dev.to/codingnepal/search-bar-with-autocomplete-search-suggestions-in-javascript-32dn
*/


//Variablen / Class
class shortcut{
    constructor(link, name){
        this.link = link;
        this.name = name;
    }
}


//Test AA
//chrome.storage.local.get(null, function(data) {console.log(data);});
/*
let arrshortcut = [];
arrshortcut.push(new shortcut("www.youtube.com", "Youtube"));
arrshortcut.push(new shortcut("blog.fefe.de", "Fefe"));
arrshortcut.push(new shortcut("www.heise.de", "Heise"));
arrshortcut.push(new shortcut("www.twitch.tv", "Twitch"))
arrshortcut.push(new shortcut("amazon.de", "Amazon"));
arrshortcut.push(new shortcut("ebay.de", "Ebay"));
chrome.storage.local.set({'shortcutcollection': arrshortcut});
*/

setShortcutboxes();

//Add Enter and Escape Keys to some  
document.querySelector("body").addEventListener("keyup", BodyEscape);
function BodyEscape(event){
    if(event.key === "Escape"){
        document.getElementById("cancelinput").click();
        document.getElementById("cancelchange").click()
        document.getElementById("closesettings").click();
    }
}

document.getElementById("shortcutboxinput").addEventListener("keyup",touchHandlerShortcutboxInput);
function touchHandlerShortcutboxInput(event){
    if (event.key === "Enter") {
            document.getElementById("createinput").click();
    }
}

document.getElementById("shortcutboxchange").addEventListener("keyup",touchHandlerShortcutboxChange);
function touchHandlerShortcutboxChange(event){
    if (event.key === "Enter") {
            document.getElementById("changechange").click();
    }
}


//SearchButtonFunction
document.getElementById("searchbutton").addEventListener("click",search);
function search(){
    chrome.search.query({text:inputsearch.value});
}


//Fill Time Div
setInterval(function() {
    let d = new Date()
    document.getElementById("time").innerHTML = 
    d.toTimeString().slice(0,5);
    document.getElementById("date").innerHTML = 
    d.toLocaleDateString(navigator.languages[0], {dateStyle: 'full'}).slice(0,-6);
}, 100);



//#########################################################################################
// Add Shortcutbox
document.getElementById("add").addEventListener("click",openCreateShortcutbox);
function openCreateShortcutbox(){
    document.getElementById("shortcutboxchange").style.visibility = "hidden";
    document.getElementById("shortcutsettings").style.visibility = "hidden";

    document.querySelector("body").classList.add("body");
    let shortcutboxinput = document.getElementById("shortcutboxinput");
    shortcutboxinput.style.visibility = "visible";
    let arr = document.getElementsByClassName("penbutton");
    for(let ele of arr){
        ele.style.visibility = "hidden";
    }
    arr = document.getElementsByClassName("fa-solid fa-pen pen");
    for(let ele of arr){
        ele.style.visibility = "hidden";
    }
}

document.getElementById("createinput").addEventListener("click", createShortcutbox);
function createShortcutbox(){
    console.log('Hallo');
    let name = document.getElementById("name").value;
    let link = document.getElementById("link").value;
    if(name.trim().length !== 0 && link.trim().length !== 0){
        chrome.storage.local.get(['shortcutcollection'], function(result) {
            if(result.shortcutcollection == undefined){
                let arrshortcut = [];
                arrshortcut.push(new shortcut(link,name));
                chrome.storage.local.set({'shortcutcollection': arrshortcut});
            }
            else{
                let arrshortcut = result.shortcutcollection;
                arrshortcut.push(new shortcut(link, name));
                chrome.storage.local.set({'shortcutcollection': arrshortcut});
            }
        });

        let scwrapper = document.getElementById("shortcutboxwrapper");
        scwrapper.insertBefore(addTile(link, name), scwrapper.lastElementChild);
        closeInput();
    }
}

document.getElementById("cancelinput").addEventListener("click", closeInput);
function closeInput(){
    //document.querySelector("body").style.filter = "none";
    document.querySelector("body").classList.remove("body");
    document.getElementById("name").value = "";
    document.getElementById("link").value = "";
    let arr = document.getElementsByClassName("penbutton");
    for(let ele of arr){
        ele.style.visibility = "visible";
    }
    arr = document.getElementsByClassName("fa-solid fa-pen pen");
    for(let ele of arr){
        ele.style.visibility = "visible";
    }
    document.getElementById("shortcutboxinput").style.visibility = "hidden";
}


//#########################################################################################
// Modify Shortcutbox
function changeShortcutboxesOpen(event){
    document.getElementById("shortcutboxinput").style.visibility = "hidden";
    document.getElementById("shortcutsettings").style.visibility = "hidden";
    document.querySelector("body").classList.add("body");
    let arr = document.getElementsByClassName("penbutton");
    for(let ele of arr){
        ele.style.visibility = "hidden";
    }
    arr = document.getElementsByClassName("fa-solid fa-pen pen");
    for(let ele of arr){
        ele.style.visibility = "hidden";
    }
    var p = 0;
    if(event.path.length === 10)
        p = 2;
    else if(event.path.length === 9)
        p = 1;
    //Shortcutlikwrapper
    document.getElementById("namechange").value = (event.path[p].parentElement.children[1].innerText);
    document.getElementById("linkchange").value = (event.path[p].children[0].href).slice(8,-1);
    let shortcutboxchange = document.getElementById("shortcutboxchange");
    shortcutboxchange.style.visibility = "visible";
    document.getElementById("namechange").focus();

    //Change Shortcutboxes
    document.getElementById("changechange").addEventListener("click", changechangeshortcutboxes);
    function changechangeshortcutboxes(){
        let name = document.getElementById("namechange").value;
        let link = document.getElementById("linkchange").value;

        chrome.storage.local.get(['shortcutcollection'], function(result) {
            let arrshortcut = result.shortcutcollection;
            //Find Element to change
            arrshortcut.forEach(function(element){
                if(element.link === (event.path[2].children[0].href).slice(8,-1)){
                    element.link = link;
                    element.name = name;
                }
            });
            chrome.storage.local.set({'shortcutcollection': arrshortcut});
        });
        //Reload Website
        window.location.reload();
    }

    // Delete Shortcutboxes
    document.getElementById("deletechange").addEventListener("click", deletechangeshortcutboxes);
    function deletechangeshortcutboxes(){
        //Delete One Element from locale Storage
        chrome.storage.local.get(['shortcutcollection'], function(result) {
            let arrshortcut = result.shortcutcollection;
            arrshortcut = arrshortcut.filter(function(ele){
                let temp = event.path[2].children[0].href;
                return !((ele.link).toLowerCase() === (temp.slice(8, (temp).length-1)).toLowerCase());
            });
            chrome.storage.local.set({'shortcutcollection': arrshortcut});
        });
        //Reload Website
        window.location.reload();
    }

}

document.getElementById("cancelchange").addEventListener("click", cancelchangeshortcutboxes);
function cancelchangeshortcutboxes(){
    let arr = document.getElementsByClassName("penbutton");
    for(let ele of arr){
        ele.style.visibility = "visible";
    }
    arr = document.getElementsByClassName("fa-solid fa-pen pen");
    for(let ele of arr){
        ele.style.visibility = "visible";
    }
    //document.querySelector("body").style.filter = "none";
    document.querySelector("body").classList.remove("body");
    let shortcutboxchange = document.getElementById("shortcutboxchange").style.visibility = "hidden";
}

//#########################################################################################
// Show Settingsbox
document.getElementById("settingsbutton").addEventListener("click", openSettingsBox);
function openSettingsBox(){
    document.querySelector("body").classList.add("body");
    document.getElementById("shortcutsettings").style.visibility = "visible";
    //Radial linear gradient css
}

document.getElementById("closesettings").addEventListener("click", closeSettingsbox);
function closeSettingsbox(){
    document.querySelector("body").classList.remove("body");
    document.getElementById("shortcutsettings").style.visibility = "hidden";
}

//Select Different Background Style
let backgroundcolordiv = document.getElementById("backgroundcolor");
let backgroundcolorgradientdiv = document.getElementById("backgroundcolorgradient");

backgroundcolordiv.addEventListener("click", function(){
    backgroundcolordiv.classList.add("selectcolorfield");
    backgroundcolorgradientdiv.classList.remove("selectcolorfield");
    document.body.style.background = document.getElementById("staticcolor").value;
});

//#########################################################################################
//Set static color as Background color
let staticcolor = document.getElementById("staticcolor");
staticcolor.addEventListener("input", function(){
    console.log("11: " + staticcolor.value);
    document.body.style.background = document.getElementById("staticcolor").value;
    console.log("22: " + staticcolor.value);
});

//Gradient Color as Background
backgroundcolorgradientdiv.addEventListener("click", function(){
    backgroundcolorgradientdiv.classList.add("selectcolorfield");
    backgroundcolordiv.classList.remove("selectcolorfield");
    document.body.style.background  = "linear-gradient(" +
        document.getElementById("gradientangle").value + "deg, " + 
        document.getElementById("firstgradientcolor").value + " 0%, " + 
        document.getElementById("secondgradientcolor").value + " 50%, " + 
        document.getElementById("thirdgradientcolor").value + " 100%"; 

    //background: linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%);
    //document.body.style.background  = document.getElementById("secondgradientcolor").value;
});

let gradientangle = document.getElementById("staticcolor");
gradientangle.addEventListener("input", refreshGradient);

let firstgradientcolor = document.getElementById("staticcolor");
firstgradientcolor.addEventListener("input", refreshGradient);

let secondgradientcolor = document.getElementById("staticcolor");
secondgradientcolor.addEventListener("input", refreshGradient);

let thirdgradientcolor = document.getElementById("staticcolor");
thirdgradientcolor.addEventListener("input", refreshGradient);




// Function Settingsbox
let angle = document.getElementById("gradientangle");
let angleoutput = document.getElementById("gradientanglenumber");

angle.addEventListener("input", function(){
    angleoutput.value = angle.value;
});

angleoutput.addEventListener("input", function(){
    if(angleoutput.value > 360)
        angleoutput.value = 360;
    else if(angleoutput.value < 0)
        angleoutput.value = 0;
    else
        angle.value = angleoutput.value;
});




//Addtile function
function addTile(url, name){
    let link = url;
    if(!url.includes("https://")){
        link = "https://" + url;    
    }
    let shortcutbox = document.createElement("center");
        let penbutton = document.createElement("button");
            let pen = document.createElement("i");
        let shortcutlinkwrapper = document.createElement("div");
            let shortcutlink = document.createElement("a");
                let shortcuticon = document.createElement("div");
        let shortcutunder = document.createElement("div");

    shortcutbox.className = "shortcutbox";

    shortcutlinkwrapper.className = "shortcutlinkwrapper";

    penbutton.className = "penbutton";
    penbutton.addEventListener("click", changeShortcutboxesOpen);

    pen.className = "fa-solid fa-pen pen";

    shortcutlink.className = "shortcutlink";
    shortcutlink.href = link;
    
    shortcuticon.className = "shortcuticon";
    shortcuticon.style.backgroundImage = "url(https://s2.googleusercontent.com/s2/favicons??sz=128&domain="+link+")";
    

    shortcutunder.className = "shortcutunder";
    shortcutunder.innerText = name;

    penbutton.append(pen);
    shortcutlink.append(shortcuticon);
    shortcutlinkwrapper.append(shortcutlink);
    shortcutlinkwrapper.append(penbutton);
    shortcutbox.append(shortcutlinkwrapper);
    shortcutbox.append(shortcutunder);
    return shortcutbox;
}

function setShortcutboxes(){
    let shortcutboxwrapper = document.getElementById("shortcutboxwrapper");
    chrome.storage.local.get(['shortcutcollection'], function(result) {
        if(result.shortcutcollection == undefined){
            return;
        }
        try{
            for(ele of result.shortcutcollection){
                shortcutboxwrapper.insertBefore(addTile(ele.link,ele.name), shortcutboxwrapper.lastElementChild);
            }
        }
        catch(e){
            console.log(e);
        }
    });
}

function refreshGradient(){
    document.body.style.background  = "linear-gradient(" +
        document.getElementById("gradientangle").value + "deg, " + 
        document.getElementById("firstgradientcolor").value + " 0%, " + 
        document.getElementById("secondgradientcolor").value + " 50%, " + 
        document.getElementById("thirdgradientcolor").value + " 100%";
}