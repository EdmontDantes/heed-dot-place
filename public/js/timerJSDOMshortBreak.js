//circle start
let progressBar1 = document.querySelector('.e-c-progress1');
let indicator1 = document.getElementById('e-indicator1');
let pointer1 = document.getElementById('e-pointer1');
let length1 = Math.PI * 2 * 100;

progressBar1.style.strokeDasharray = length1;

function update1(value, timePercent) {
	let offset1 = - length1 - length1 * value / (timePercent);
	progressBar1.style.strokeDashoffset = offset; 
	pointer1.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
};

//circle ends
const displayOutput1 = document.querySelector('.display-remain-time1')
const pauseBtn1 = document.getElementById('pause1');
const setterBtns1 = document.querySelectorAll('button[data-setter1]');

let intervalTimer1;
let timeLeft1;
let wholeTime1 = 5 * 60; // manage this to set the whole time 
let isPaused1 = false;
let isStarted1 = false;


update1(wholeTime1,wholeTime1); //refreshes progress bar
displayTimeLeft1(wholeTime1);

function changeWholeTime1(seconds){
  if ((wholeTime1 + seconds) > 0){
    wholeTime1 += seconds;
    update1(wholeTime1,wholeTime1);
  }
}

for (let i = 0; i < setterBtns1.length; i++) {
    setterBtns1[i].addEventListener("click", function(event) {
        let param1 = this.dataset.setter;
        switch (param1) {
            case 'minutes-plus1':
                changeWholeTime1(1 * 60);
                break;
            case 'minutes-minus1':
                changeWholeTime1(-1 * 60);
                break;
            case 'seconds-plus1':
                changeWholeTime1(1);
                break;
            case 'seconds-minus1':
                changeWholeTime1(-1);
                break;
        }
      displayTimeLeft1(wholeTime1);
    });
}

function timer1 (seconds){ //counts time, takes seconds
  let remainTime1 = Date.now() + (seconds * 1000);
  displayTimeLeft1(seconds);
  
  intervalTimer1 = setInterval(function(){
    timeLeft1 = Math.round((remainTime1 - Date.now()) / 1000);
    if(timeLeft1 < 0){
      clearInterval(intervalTimer1);
      isStarted1 = false;
      setterBtns1.forEach(function(btn){
        btn.disabled = false;
        btn.style.opacity = 1;
      });
      displayTimeLeft1(wholeTime1);
      pauseBtn1.classList.remove('pause1');
      pauseBtn1.classList.add('play1');
      return ;
    }
    displayTimeLeft(timeLeft1);
  }, 1000);
}
function pauseTimer1(event){
  if(isStarted1 === false){
    timer1(wholeTime1);
    isStarted1 = true;
    this.classList.remove('play1');
    this.classList.add('pause1');
    
    setterBtns1.forEach(function(btn){
      btn.disabled = true;
      btn.style.opacity = 0.5;
    });

  }else if(isPaused1){
    this.classList.remove('play1');
    this.classList.add('pause1');
    timer(timeLeft1);
    isPaused1 = isPaused1 ? false : true
  }else{
    this.classList.remove('pause1');
    this.classList.add('play1');
    clearInterval(intervalTimer1);
    isPaused1 = isPaused1 ? false : true ;
  }
}

function displayTimeLeft1 (timeLeft){ //displays time on the input
  let minutes1 = Math.floor(timeLeft / 60);
  let seconds1 = timeLeft % 60;
  let displayString1 = `${minutes1 < 10 ? '0' : ''}${minutes1}:${seconds1 < 10 ? '0' : ''}${seconds1}`;
  displayOutput1.textContent = displayString1;
  update1(timeLeft, wholeTime1);
}

pauseBtn1.addEventListener('click',pauseTimer1);

