var el_container = document.getElementById("container");

var request = new XMLHttpRequest();

request.open('GET', '/api/get-entries');

request.onload = function(){
  if(request.readyState === 4){
    if(request.status === 200){
      var entries = JSON.parse(request.responseText);
      entries = entries.reverse();
      for(var i = 0; i < entries.length; i++){
        var entry = `
          <div id="entry">
            <div id="heading">
              <h1>` + entries[i].title + `</h1>
              <h1>` + entries[i].date + `</h1>
            </div>
            <pre>` + entries[i].content + `</pre>
          </div>
        `;

        console.log(entries[i].content);
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
