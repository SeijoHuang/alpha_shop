const form = document.querySelectorAll('.form-row-container')
const step = document.querySelectorAll('.step-item')
const nextBtn = document.querySelector('.next-btn')
const preBtn = document.querySelector('.pre-btn')
let current = 0
let prev = 0
const quantity = document.querySelector("quantity")
const input = [...document.querySelectorAll(".quantity")]
const inputContainers = [...document.querySelectorAll(".input-container")]
const itemPrice = [...document.querySelectorAll(".price")]

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
// button狀態切換
function toggleBtn(){
  switch(current) {
    case 0:
      preBtn.classList.add('d-none')
      nextBtn.classList.add('first-step-btn')
      nextBtn.innerHTML = '下一頁'
      break;
    // 當到最後一頁時 ，next btn 顯示“確認訂單”
    case form.length -1 :
      nextBtn.innerHTML = '確認訂單'
      break;  
    default :
      nextBtn.innerHTML = '下一頁'
      preBtn.classList.remove('d-none', 'first-step-btn')      
  }
}

// quantity control
// 綁上監聽器 & bind the event
// 數量增減
; (function addListener() {
  inputContainers.forEach((container) => {
    container.addEventListener("click", add)
  })
  })()
// input監聽
; (function addInputListener() {
  input.forEach((i) => i.addEventListener("change", inputChange))
  })()

// 點擊按鈕數量增減、單品金額增減
function add({ target }) {
  if (!target.matches(".input-quantity-control")) return;
  const targetInput = input.find(
    (input) => input.dataset.id === target.dataset.id)
  const targetPriceContainer = itemPrice.find(
    (price) => price.dataset.id === target.dataset.id
  )
  const targetPrice = Number(target.dataset.price)
  let value = Number(targetInput.value)
  let targetTotal = 0
  // 點擊 + 或 - 調整數量
  if (target.matches(".quantity-plus")) {
    value++
    targetInput.value = value;
  } else if (target.matches(".quantity-min")) {
    if (value <= 0) return;
    value--
    targetInput.value = value;
  }
  // target總金額更新
  targetTotal = targetPrice * value
  targetPriceContainer.innerHTML = `${targetTotal}`
  renderTotalPrice()
}

// 點擊或在input直接輸入數量時金額跟著調整
function inputChange({ target }) {
  let total = 0;
  const price = target.dataset.price;
  const quantity = Number(target.value);
  const targetTotalContainer = itemPrice.find(
    (price) => price.dataset.id === target.dataset.id
  );
  total = price * quantity;
  targetTotalContainer.innerHTML = `${total}`;
  renderTotalPrice();
}

// 總金額小計
function renderTotalPrice() {
  const totalBox = document.querySelector(".total");
  let total = 0;
  itemPrice.forEach((item) => {
    const itemPriceTotal = Number(item.textContent) || 0;
    total += itemPriceTotal;
  });
  totalBox.textContent = `$${total}`;
}

// bind the event
nextBtn.addEventListener('click', nextHandler)
preBtn.addEventListener('click', preHandler)
