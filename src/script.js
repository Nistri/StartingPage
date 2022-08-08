//let ele = document.getElementById("search1").onclick = function() {search()};
document.getElementById("searchbutton").addEventListener("click",search);

function search(){
    let search = document.getElementById("inputsearch").value;
    let url ='http://www.google.com/search?q=' + search;
    window.open(url,'_self');
}

