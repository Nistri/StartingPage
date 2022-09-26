//Function for Enterpress 
let input = document.getElementById("inputsearch");

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchbutton").click();
    }
});

//SearchButtonFunction
document.getElementById("searchbutton").addEventListener("click",search);
function search(){
//let search = document.getElementById("inputsearch").value;
    let url ='https://www.google.com/search?q=' + input.value;
    window.open(url,'_self');
}




//AddTile
var element;
document.getElementById("popularatb").addEventListener("click", AddTileButton);
function AddTileButton(event){
    element = event.path[2];
    document.getElementById("formcontainer").style.display = 'block';  
    //console.log(element.children[1]);
}


document.getElementById("btnaddtile").addEventListener("click", function(){
    element.children[1].appendChild(addTile(document.getElementById("url").value,document.getElementById("name").value));
    document.getElementById("formcontainer").style.display = 'none';
    closeInputTile();
});

document.getElementById("btncancel").addEventListener("click", closeInputTile); 
function closeInputTile(){
    document.getElementById("formcontainer").style.display = 'none';
    document.getElementById("url").value = "";
    document.getElementById("name").value = "";
}




//ChangeButtonFunction
document.getElementById("changebutton").addEventListener("click",change);
function change(){
    let divbox = document.createElement("div");
    divbox.className = "shortcutbox";
    let divhead = document.createElement("div");
    divhead.className = "shortcutheading";
    let head = document.createElement("h3");
    head.innerText = "Neue Box";
    head.className = "heading";
    let change = document.createElement("button");
    change.innerText = "Change";
    change.class="AddTileButton";
    let shortcutbox = document.createElement("div");
    shortcutbox.className = "shortcutboxlinks";

    divhead.appendChild(head);
    divhead.appendChild(change);
    divbox.appendChild(divhead);
    divbox.appendChild(shortcutbox);

    document.getElementById("shortcutboxcollectioncontainer").appendChild(di)
}






//Change State from hidden to not
/*
let box = document.getElementsByClassName("shortcutbox");
document.getElementById("popular").addEventListener('mouseover', ShowChangeCustom);

function ShowChangeCustom(event){

    for(let i=0;i <event.path.length;i++){
        if(event.path[i].className === "shortcutbox"){
            console.log(event.path[i].id);
        }
        //console.log(event.path[i].className);
    }

}
*/





//AddAllPopularWebsites
let populartile = document.querySelector(".shortcutboxlinks");
populartile.appendChild(addTile("www.youtube.com/","Youtube"));
populartile.appendChild(addTile("blog.fefe.de/","Fefe"));
populartile.appendChild(addTile("www.amazon.de/","Amazon"));
populartile.appendChild(addTile("www.heise.de/","Heise"));
populartile.appendChild(addTile("www.chess.com/","Chess"));
populartile.appendChild(addTile("www.ebay.com/","Ebay"));
populartile.appendChild(addTile("www.4chan.org/","4Chan"));
populartile.appendChild(addTile("streamkiste.tv/","Streamkiste"));


/*
populartile.appendChild(addTile("https://www.heise.de/","b"));
populartile.appendChild(addTile("https://www.chess.com/","c"));
populartile.appendChild(addTile("https://www.chess.com/","d"));
populartile.appendChild(addTile("https://www.chess.com/","e"));
populartile.appendChild(addTile("https://www.chess.com/","f"));
populartile.appendChild(addTile("https://www.chess.com/","g"));
populartile.appendChild(addTile("https://www.chess.com/","h"));
populartile.appendChild(addTile("https://www.chess.com/","e"));
populartile.appendChild(addTile("https://www.chess.com/","f"));
populartile.appendChild(addTile("https://www.chess.com/","g"));
populartile.appendChild(addTile("https://www.chess.com/","h"));
*/

//Addtile function
function addTile(url, name){
    let box = document.createElement("a");
    let shortcutunder = document.createElement("div");
    let shortcut = document.createElement("div");
    
    box.className = "shortcutwrapper";
    box.href = "https://" + url;

    shortcut.style.backgroundImage = "url(https://s2.googleusercontent.com/s2/favicons?domain="+url+")";
    shortcut.className = "shortcutbotton";
    
    shortcutunder.innerText = name;
    shortcutunder.className = "shortcutundertext";
    
    box.appendChild(shortcut);
    box.appendChild(shortcutunder);
    return box;
    
    /*
    shortcut.style.backgroundImage = "url(https://favicons.githubusercontent.com/www.google.com)";
    let tale = document.createElement("form");    
    tale.action = link;
    tale.style = "display: inline";
    let btn = document.createElement("Button");
    btn.className = "shortcut";
    btn.innerText = name;
    tale.appendChild(btn);
    return tale;
    */
}