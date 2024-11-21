// const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; // Old url
const myApiKey = "47d70a73d2e3568d0928c2b9";
const baseUrl = `https://v6.exchangerate-api.com/v6/${myApiKey}/latest/`;
const dropdowns = document.querySelectorAll(".dropdown select");
const exchangeBtn = document.querySelector("#exchangeBtn");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const newAmountPara = document.querySelector(".msg #newAmount");
const excRatePara = document.querySelector(".msg #exchangeRate");
const datePara = document.querySelector(".msg #date");
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date().toLocaleDateString('en-US', options);


for(let select of dropdowns){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "BDT"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code === "USD"){
            newOption.selected = "selected";
        }
        select.append(newOption);
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

const updateFlag = (element) => {
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

exchangeBtn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 0){
        console.log("Invalid input");
    } 
    const url = `${baseUrl}${fromCur.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let exchangeRate = data.conversion_rates[toCur.value];
    let newAmount = amountVal * exchangeRate;
    newAmountPara.innerText = `${amountVal}  ${fromCur.value} = ${newAmount}  ${toCur.value}`;
    excRatePara.innerText = `Exchange Rate : 1  ${fromCur.value} = ${exchangeRate}  ${toCur.value}`;
    datePara.innerText = `Date : ${today}`;
});