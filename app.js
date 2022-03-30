const form = document.querySelectorAll('.form-row-container')
console.log(form)
const step = document.querySelectorAll('.step-item')
console.log(step)
const nextBtn = document.querySelector('.next-btn')
const preBtn = document.querySelector('.pre-btn')
let current = 0
let prev = 0
const quantity = document.querySelector("quantity");
const input = [...document.querySelectorAll(".quantity")];
const inputContainers = [...document.querySelectorAll(".input-container")];

// click next button
function nextHandler(){
  if(current === form.length - 1) return
  prev = current 
  current++
  toggleBtn()
    // 隱藏前一頁 form[current] add d-none
  form[prev].classList.add('d-none')
    // step[current] add checked  
  step[prev].classList.add('checked')
    // current + 1 前進一頁     
  step[current].classList.add('step-active')
    // 顯示當前頁 form[current] remove d-none
  form[current].classList.remove('d-none')
    // step[current] add .active 
  step[current].classList.add('active')
  } 
// click prev button
function preHandler(){
  if (current < 0) return
// 隱藏當前頁 
  form[current].classList.add('d-none')
// 當前step取消打勾和反黑 
  step[current].classList.remove('checked', 'step-active')
//回前一頁 current - 1 
  current--
  toggleBtn()
// 顯示前一頁
  form[current].classList.remove('d-none')
// step進度取消打勾 
  step[current].classList.remove('checked')
}
// button切換
function toggleBtn(){
  switch(current) {
    // 當到最後一頁時 ，next btn 顯示“確認訂單” 
    case 0:
      preBtn.classList.add('d-none')
      nextBtn.classList.add('first-step-btn')
      nextBtn.innerHTML = '下一頁'
      break;
    case form.length -1 :
      nextBtn.innerHTML = '確認訂單'
      break;  
    default :
      nextBtn.innerHTML = '下一頁'
      preBtn.classList.remove('d-none', 'first-step-btn')      
  }
}

// quantity control
; (function addListener() {
  inputContainers.forEach((container) => {
    container.addEventListener("click", add);
  });
})()

function add({ target }) {
  if (!target.matches(".input-quantity-control")) return;
  const targetInput = input.find((input) => input.dataset.id === target.dataset.id);
  let value = Number(targetInput.value);
  if (target.matches(".quantity-plus")) {
    targetInput.value = value + 1;
  } else if (target.matches(".quantity-min")) {
    if (value <= 0) return;
    targetInput.value = value - 1;
  }
}


// bind the event
nextBtn.addEventListener('click', nextHandler)
preBtn.addEventListener('click', preHandler)