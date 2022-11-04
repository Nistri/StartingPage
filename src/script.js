//Variablen / Class
class shortcut{
    constructor(link, name){
        this.link = link;
        this.name = name;
    }
}

class backgroundcolortype{
    constructor(selected, color){
        this.selected = selected;
        this.color = color;
    }
}



setShortcutboxes();
setSettingsbox();
//Add Enter and Escape Keys to some  
document.querySelector("body").addEventListener("keyup", BodyEscape);
function BodyEscape(event){
    if(event.key === "Escape"){
        document.getElementById("cancelinput").click();
        document.getElementById("cancelchange").click()
        document.getElementById("closesettings").click();
    }
}

//SearchButtonFunction
document.getElementById("searchinput").addEventListener("submit",search)
function search(event){
    event.preventDefault();
    chrome.search.query({text:document.getElementById("inputsearch").value});
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

document.getElementById("shortcutboxinput").addEventListener("submit", createShortcutbox);
function createShortcutbox(event){
    event.preventDefault();
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
                for(let temp of arrshortcut){
                    if(temp.link === link){
                        console.log("Halo");
                        return;
                    }
                }
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
    window.location.reload();
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
    document.getElementById("shortcutboxchange").addEventListener("submit", changechangeshortcutboxes);
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
    window.location.reload();
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
    window.location.reload();
}

//Select Different Background Style
let backgroundcolordiv = document.getElementById("backgroundcolor");
let backgroundcolorgradientdiv = document.getElementById("backgroundcolorgradient");

backgroundcolordiv.addEventListener("click", function(){
    backgroundcolordiv.classList.add("selectcolorfield");
    backgroundcolorgradientdiv.classList.remove("selectcolorfield");
    let scolor = document.getElementById("staticcolor").value;

    chrome.storage.local.set({'staticbackground' : new backgroundcolortype(1,scolor)});
    chrome.storage.local.get(['gradientbackground'], function(result) {
        if(result.gradientbackground !== undefined){
            let gradientbackground = result.gradientbackground;
            gradientbackground.selected = 0;
            chrome.storage.local.set({'gradientbackground': gradientbackground});
        }
    });
    document.getElementById("firstpartbackground").style.backgroundColor = scolor;
    document.getElementById("secondpartbackground").style.backgroundColor = scolor;
    document.getElementById("thirdpartbackground").style.backgroundColor = scolor; 
    document.getElementById("fourthpartbackground").style.backgroundColor = scolor;

    document.body.style.background = scolor;
});

//#########################################################################################
//Set static color as Background color
let staticcolor = document.getElementById("staticcolor");
staticcolor.addEventListener("input", function(){
    let scolor = document.getElementById("staticcolor").value; 

    chrome.storage.local.set({'staticbackground' : new backgroundcolortype(1,scolor)});
    chrome.storage.local.get(['gradientbackground'], function(result) {
        if(result.gradientbackground !== undefined){
            let gradientbackground = result.gradientbackground;
            gradientbackground.selected = 0;
            chrome.storage.local.set({'gradientbackground': gradientbackground});
        }
    });
    /*
    document.getElementById("firstpartbackground").style.opacity = 0;
    document.getElementById("secondpartbackground").style.opacity = 0;
    document.getElementById("thirdpartbackground").style.opacity = 0; 
    document.getElementById("fourthpartbackground").style.opacity = 0;
    */
    document.getElementById("firstpartbackground").style.backgroundColor = scolor;
    document.getElementById("secondpartbackground").style.backgroundColor = scolor;
    document.getElementById("thirdpartbackground").style.backgroundColor = scolor; 
    document.getElementById("fourthpartbackground").style.backgroundColor = scolor;
    document.body.style.background = scolor;

});

//Gradient Color as Background
backgroundcolorgradientdiv.addEventListener("click", function(){
    backgroundcolorgradientdiv.classList.add("selectcolorfield");
    backgroundcolordiv.classList.remove("selectcolorfield");

    chrome.storage.local.set({'gradientbackground' : new backgroundcolortype(1,
        [
            document.getElementById("firstgradientcolor").value,
            document.getElementById("secondgradientcolor").value,
            document.getElementById("thirdgradientcolor").value,
            document.getElementById("fourthgradientcolor").value,
        ])});

    chrome.storage.local.get(['staticbackground'], function(result) {
        if(result.staticbackground !== undefined){
            let staticbackground = result.staticbackground;
            staticbackground.selected = 0;
            chrome.storage.local.set({'staticbackground': staticbackground});
        }
    });
    
    /*
    document.getElementById("firstpartbackground").style.opacity = 1;
    document.getElementById("secondpartbackground").style.opacity = 1;
    document.getElementById("thirdpartbackground").style.opacity = 1; 
    document.getElementById("fourthpartbackground").style.opacity = 1;
    */

    document.getElementById("firstpartbackground").style.backgroundColor = 
        document.getElementById("firstgradientcolor").value;
    document.getElementById("secondpartbackground").style.backgroundColor = 
        document.getElementById("secondgradientcolor").value;
    document.getElementById("thirdpartbackground").style.backgroundColor = 
        document.getElementById("thirdgradientcolor").value;
    document.getElementById("fourthpartbackground").style.backgroundColor = 
        document.getElementById("fourthgradientcolor").value;
});

// Input for Gradientparts
let firstgradientcolor = document.getElementById("firstgradientcolor");
firstgradientcolor.addEventListener("input", refreshGradient);

let secondgradientcolor = document.getElementById("secondgradientcolor");
secondgradientcolor.addEventListener("input", refreshGradient);

let thirdgradientcolor = document.getElementById("thirdgradientcolor");
thirdgradientcolor.addEventListener("input", refreshGradient);

let fourthgradientcolor = document.getElementById("fourthgradientcolor");
fourthgradientcolor.addEventListener("input", refreshGradient);


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

function setSettingsbox(){

    chrome.storage.local.get(['staticbackground'], function(result) {
        if(result.staticbackground !== undefined){
            document.getElementById("staticcolor").value = result.staticbackground.color;

            if(result.staticbackground.selected === 1){
                document.getElementById("backgroundcolor").classList.add("selectcolorfield");
                /*
                document.getElementById("firstpartbackground").style.opacity = 0;
                document.getElementById("secondpartbackground").style.opacity = 0;
                document.getElementById("thirdpartbackground").style.opacity = 0; 
                document.getElementById("fourthpartbackground").style.opacity = 0;
                */
                document.getElementById("firstpartbackground").style.backgroundColor = document.getElementById("staticcolor").value;
                document.getElementById("secondpartbackground").style.backgroundColor = document.getElementById("staticcolor").value;
                document.getElementById("thirdpartbackground").style.backgroundColor = document.getElementById("staticcolor").value; 
                document.getElementById("fourthpartbackground").style.backgroundColor = document.getElementById("staticcolor").value;
                document.body.style.background = document.getElementById("staticcolor").value;
            }
        }
    });

    chrome.storage.local.get(['gradientbackground'], function(result) {
        if(result.gradientbackground !== undefined){
            document.getElementById("firstgradientcolor").value = result.gradientbackground.color[0];
            document.getElementById("secondgradientcolor").value = result.gradientbackground.color[1];
            document.getElementById("thirdgradientcolor").value = result.gradientbackground.color[2];
            document.getElementById("fourthgradientcolor").value = result.gradientbackground.color[3];

            if(result.gradientbackground.selected === 1){
                document.getElementById("backgroundcolorgradient").classList.add("selectcolorfield");
                /*
                document.getElementById("firstpartbackground").style.opacity = 1;
                document.getElementById("secondpartbackground").style.opacity = 1;
                document.getElementById("thirdpartbackground").style.opacity = 1; 
                document.getElementById("fourthpartbackground").style.opacity = 1;
                */
                document.getElementById("firstpartbackground").style.backgroundColor = 
                    document.getElementById("firstgradientcolor").value;
                document.getElementById("secondpartbackground").style.backgroundColor = 
                    document.getElementById("secondgradientcolor").value;
                document.getElementById("thirdpartbackground").style.backgroundColor = 
                    document.getElementById("thirdgradientcolor").value;
                document.getElementById("fourthpartbackground").style.backgroundColor = 
                    document.getElementById("fourthgradientcolor").value;
            }
        }
    });

}

function refreshGradient(){
    chrome.storage.local.set({'gradientbackground' : new backgroundcolortype(1,
        [
            document.getElementById("firstgradientcolor").value,
            document.getElementById("secondgradientcolor").value,
            document.getElementById("thirdgradientcolor").value,
            document.getElementById("fourthgradientcolor").value,
        ])});
        document.getElementById("firstpartbackground").style.backgroundColor = 
            document.getElementById("firstgradientcolor").value;
        document.getElementById("secondpartbackground").style.backgroundColor = 
            document.getElementById("secondgradientcolor").value;
        document.getElementById("thirdpartbackground").style.backgroundColor = 
            document.getElementById("thirdgradientcolor").value;
        document.getElementById("fourthpartbackground").style.backgroundColor = 
            document.getElementById("fourthgradientcolor").value;     
}