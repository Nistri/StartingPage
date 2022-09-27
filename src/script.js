//Variablen / Class
class shortcut{
    constructor(link, name){
        this.link = link;
        this.name = name;
    }
}


setShortcutboxes();
//Test 
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


//Add Enter and Escape Keys to some  
document.getElementById("inputsearch").addEventListener("keypress", touchHandler);
document.getElementById("shortcutboxinput").addEventListener("keyup",touchHandler);
document.getElementById("shortcutboxchange").addEventListener("keyup",touchHandler);

function touchHandler(event){
    //console.log(event.path);
    if(event.path[0].id === "inputsearch"){
        if (event.key === "Enter") {
            search();
        }
    }
    else if(event.path[0].id === "name" || event.path[0].id === "link"){
        if (event.key === "Enter") {
            let name = document.getElementById("name").value;
            let link = document.getElementById("link").value;
            if(name.trim().length !== 0 && link.trim().length !== 0){
                createShortcutbox();
            }
        }
        if(event.key === "Escape"){
            closeInput();
        }
    }
    else if(event.path[0].id === "namechange" || event.path[0].id === "linkchange"){
        if(event.key === "Escape"){
            cancelchangeshortcutboxes();
        }
        
    }
}

//SearchButtonFunction
document.getElementById("searchbutton").addEventListener("click",search);
function search(){
    if(inputsearch.value != ""){
        //let search = document.getElementById("inputsearch").value;
        let url ='https://www.google.com/search?q=' + inputsearch.value;    
        window.open(url,'_self');
        input.value = "";
    }
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
    let shortcutboxinput = document.getElementById("shortcutboxinput");
    shortcutboxinput.style.visibility = "visible";
}

document.getElementById("createinput").addEventListener("click", createShortcutbox);
function createShortcutbox(){
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
    document.getElementById("name").value = "";
    document.getElementById("link").value = "";
    document.getElementById("shortcutboxinput").style.visibility = "hidden";
}


//#########################################################################################
// Modify Shortcutbox
function changeShortcutboxesOpen(event){
    var p = 0;
    if(event.path.length === 10)
        p = 2;
    else if(event.path.length === 9)
        p = 1;

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
        //Reload Window
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
    let shortcutboxchange = document.getElementById("shortcutboxchange").style.visibility = "hidden";
}


//Addtile function
function addTile(url, name){
    let shortcutbox = document.createElement("center");
        let penbutton = document.createElement("button");
            let pen = document.createElement("i");
        let shortcutlinkwrapper = document.createElement("div");
            let shortcutlink = document.createElement("a");
                let shortcuticon = document.createElement("div");
        let shortcutunder = document.createElement("div");

    shortcutbox.className = "shortcutbox";
    shortcutbox.draggable = true;
    shortcutbox.ondragstart = dragStart;
    shortcutbox.ondrop = drop;
    shortcutbox.ondragover = dragover;
    shortcutbox.id = url;

    shortcutlinkwrapper.className = "shortcutlinkwrapper";

    penbutton.className = "penbutton";
    penbutton.addEventListener("click", changeShortcutboxesOpen);

    pen.className = "fa-solid fa-pen pen";

    shortcutlink.className = "shortcutlink";
    shortcutlink.href = "https://" + url;
    
    shortcuticon.className = "shortcuticon";
    shortcuticon.style.backgroundImage = "url(https://s2.googleusercontent.com/s2/favicons??sz=128&domain="+url+")";
    

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


//Nochmal nachgucken Koord vergleichen
function dragStart(ev){
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "copy";
}

function drop(ev){
    console.log(ev.dataTransfer);
    ev.preventDefault();
    var draggableId = ev.dataTransfer.getData("text");
    var droppable = ev.currentTarget;
    var draggable = document.getElementById(draggableId);
    var droppableArea = window.getComputedStyle(droppable).gridArea;
    var draggableArea = window.getComputedStyle(draggable).gridArea;
    draggable.style.gridArea = droppableArea;
    droppable.style.gridArea = draggableArea;
}

function dragover(ev){
    ev.preventDefault();
}
