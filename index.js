const currentTime = document.querySelector("h1"), content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"), setAlarmBtn = document.getElementById("setBtn"), container = document.querySelector(".container"), deleteBtn = document.getElementById("alarmListBtn");


const tasks = [];

//function to create alarm list
function createNode(){
    tasks.forEach((time,index)=>{
        const div = document.createElement("div");
        div.setAttribute("class","alarmList");
        const innerDiv = document.createElement("div");
        innerDiv.setAttribute('id','alarmListTime');
        innerDiv.innerText = `${time}`;
        const innerBtn = document.createElement("button");
        innerBtn.setAttribute('id','alarmListBtn');
        innerBtn.innerText = "Delete";
        innerBtn.addEventListener("click",()=>{
            removeNode();
            tasks.splice(index,1);
            createNode();
        })
        div.append(innerDiv);
        div.append(innerBtn);
        container.append(div);
    })
}

//function to remove an alarm from the alarm list
function removeNode(){
    tasks.forEach(()=>{
        const div = document.querySelector(".alarmList");
        div.remove();
    })
}

//Displaying all the option to select time from
for(let i=12;i>0;i--){
    //adding 0 before a digit if it is single digit
    i=i<10 ? "0"+i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59;i>=0;i--){
    i=i<10 ? "0"+i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=2;i>0;i--){
    let ampm = i==1 ? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}



//function to display time in the clock
setInterval(()=>{
    let date=new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";

    if(h>12){
        h = h-12;
        ampm = "PM";
    }

    h = h==0? h=12:h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    tasks.forEach((value,index)=>{
        if( value == `${h}:${m}:${s} ${ampm}`){
            alert("time");
            removeNode();
            tasks.splice(index,1);
            createNode();
        }
    });
},1000);


//function to set alarm 
function setAlarm(){

    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;

    console.log(time);

    if(time.includes("Hours") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("Please, select a valid time to set Alarm!");
    }

    removeNode();
    tasks.push(time);
    createNode();
}

setAlarmBtn.addEventListener("click", setAlarm);


