let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
let dateInfo = document.querySelector("#dateInfo");
let btnShowHoliday = document.querySelector("#btnShowHoliday");
let dates = []
$(document).ready(function(){
  showCalendar(currentMonth, currentYear);
})
$("#btnShowHoliday").on("click",function(){
     showHolidays(currentMonth + 1, currentYear);
     console.log((currentMonth + 1)+"/"+(currentYear));
   })

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);

}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}
function showCalendar(month, year) {
  /**/
    if (document.querySelectorAll(".cell").length > 0) {
      document.querySelectorAll(".cell").forEach((_) => {
        _.remove();
        console.log(`success deleted ${_}`);
      })
    }
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar
    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    /* previous date */
    let date = 1;
    month > 0 ? monthPrevious = month - 1 : monthPrevious = 11;
    let datePrevious = 32 - new Date(year, monthPrevious, 32).getDate();
    let dateFinalPrevious = datePrevious;
    datePrevious -= firstDay;
    
    
    /* next date */
    month <= 11 ? monthNext = month + 1 : monthNext = 0;
    let dateNext = 0;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                cell.classList.add("cell-date-previous");
                cell.addEventListener("click", function(){
                  previous();
                })
                datePrevious++;
                let cellText = document.createTextNode(datePrevious);
                cell.appendChild(cellText);
                row.appendChild(cell);
                
            }
            else if (date > daysInMonth) {
              
                let cell = document.createElement("td");
                cell.classList.add("cell-date-next");
                cell.addEventListener("click", function(){
                  next();
                })
                dateNext++;
                let cellText = document.createTextNode(dateNext);
                cell.appendChild(cellText);
                row.appendChild(cell);
               date++;
            }
             else {
                let cell = document.createElement("td");
                cell.setAttribute("date",`${date} ${months[parseInt(month)]} ${year}`)
                cell.classList.add("cell")
                let cellText = document.createTextNode(date);
                console.log(date, month, year);
                if (parseInt(date) === today.getDate() && parseInt(year) === today.getFullYear() && parseInt(month) - 1 === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                month.toString().length == 1 ? month = "0"+(month + 1) : null;
               
                let timeDateKalender = `${year}-${month}-${date}`;
                dates.push(timeDateKalender)
                
                
                
                /*
                events.forEach((ev) => {
                  console.log(ev)
                })*/
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}

function getEvent(m, y) {
  let url = ``
  let res = [];
  
  setTimeout(() => {
    return res;
  },3000)
}

function showHolidays(m, y){
 let url = `https://api-harilibur.vercel.app/api?month=${m}&year=${y}`;
 //console.log(url)
  $.getJSON(url, function(data) {
    for (let j = 0; j < data.length; j++) {
      let dt = data[j];
      //console.log(data);
      let hdate = dt.holiday_date;
      let hname = dt.holiday_name;
      //console.log(hname)
      dates.forEach((date, i) => {
        if (date == hdate) {
          console.log(hname);
          console.log(document.querySelectorAll(".cell"));
          document.querySelectorAll(".cell")[i].classList.add("holiday");
          document.querySelectorAll(".cell")[i].addEventListener("click",function(){
            dateInfo.innerHTML=hname;
          })
          //console.log(document.querySelectorAll(".cell")[i]);
        }
      })
    }
  });
}