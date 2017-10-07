
var el_container = document.getElementById("entries");

var request = new XMLHttpRequest();

request.open('GET', '/api/get-entries');

request.onload = function(){
  if(request.readyState === 4){
    if(request.status === 200){
      var entries = JSON.parse(request.responseText);
      entries = entries.reverse();
      for(var i = 0; i < entries.length; i++){
        var dt = new Date(parseInt(entries[i].date));
        dt = dt.toDateString().split(' ');
        dt.shift();
        dt = dt.join(" / ");
        var entry = `
          <div id="entry">
            <div id="heading">
              <p>` + entries[i].title + `</p>
              <p>` + dt + `</p>
            </div>
            <pre>` + entries[i].content + `</pre>
          </div>
        `;

        el_container.innerHTML += entry;
      }
    } else {
      console.log("Error: " + request.status);
    }
  }
};

request.onerror = function(){
  console.log("Something went Wrong");
}

request.send(null);
