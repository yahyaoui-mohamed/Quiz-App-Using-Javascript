let app = document.getElementById("app");
let count = 0;
let x = fetch('./questions/questions.json').then(res => res.json()).then(res => {
  render(res, count);
});

function startCounter(res, count) {
  let time = +document.querySelector(".timer").innerText.substr(3);
  let interval = setInterval(function () {
    if (time === 0) {
      clearInterval(interval);
      render(res, ++count);
      return;
    }
    if (time <= 10) {
      document.querySelector(".timer").innerText = "00:" + "0" + --time;
      document.querySelector(".timer").style.color = "red";
    }
    else {
      document.querySelector(".timer").innerText = "00:" + --time;
    }
  }, 1000);
  let next = document.querySelector(".next");
  next.onclick = function () {
    render(res, ++count);
  }
}

function render(res, count) {
  let structure =
    `
  <div class="title">
  <span class="question-number">#${res[count].id}</span>
  <h1>${res[count].title}</h1>
</div>
<div class="questions">
  <div class="question-group">
    <input type="radio" id="question1" name="q1">
    <label for="question1">${res[count].answer_1}</label>
  </div>
  <div class="question-group">
    <input type="radio" id="question2"name="q1">
    <label for="question2">${res[count].answer_2}</label>
  </div>
  <div class="question-group">
    <input type="radio" id="question3"name="q1">
    <label for="question3">${res[count].answer_3}</label>
  </div>
  <div class="question-group">
    <input type="radio" id="question4"name="q1">
    <label for="question4">${res[count].answer_4}</label>
  </div>
</div>
<div class="submit">
  <button class="next">Next</button>
</div>
<div class="question-progress">
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <span class="timer">00:15</span>
</div>
`
  app.innerHTML = structure;
  let progress = document.querySelectorAll(" ul li");
  console.log(progress);
  for (let i = 0; i <= count; ++i) {
    progress[i].classList.add("finished");
  }
  startCounter(res, count);
}