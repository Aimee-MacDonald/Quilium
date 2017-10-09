var el_date = document.getElementById("entry-date");

var dt = new Date();
dt = dt.toDateString().split(' ');
dt.shift();
dt = dt.join(" / ");

el_date.innerHTML = dt;
