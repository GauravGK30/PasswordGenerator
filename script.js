
const resultEle = document.querySelector(".result");
const lengthEle = document.getElementById("length");
const uppercaseEle = document.getElementById("uppercase");
const lowercaseEle = document.getElementById("lowercase");
const numberEle = document.getElementById("number");
const symbolEle = document.getElementById("symbol");
const generateEle = document.getElementById("generate");
const clipboardEle = document.getElementById("clipboard");

const randomFunc ={
    lower : getRandomLowercase,
    upper : getRandomUppercase,
    number : getRandomNumbers,
    symbol :getRandomSymbols,
}


generateEle.addEventListener('click',()=>{
    const length = +lengthEle.value;
    const hasLower  = lowercaseEle.checked;
    const hasUpper  = uppercaseEle.checked;
    const hasNumber  = numberEle.checked;
    const hasSymbol  = symbolEle.checked;
    resultEle.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
})

clipboardEle.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEle.innerText;

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard!");
});


function generatePassword(lower,upper,number,symbol,length){
    let generatePassword = ''
    let typeCount = lower + upper +number+symbol 
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

        
    if(typeCount===0){
        return '';
    }
    for(let i=0;i<length;i+=typeCount){
        typesArr.forEach((type)=>{
            const keyFromRandomFun = Object.keys(type)[0]
            generatePassword += randomFunc[keyFromRandomFun]()
        })
    }
    const finalPassword = generatePassword.slice(0,length)
    return finalPassword;
}


function getRandomLowercase(){
    //lowercase letter 97 to 122 char code
    return String.fromCharCode(Math.floor(Math.random()*26)+97)
    
}

function getRandomUppercase(){
    //uppercase letter 65 to 90 char code
    return String.fromCharCode(Math.floor(Math.random()*26)+65)
    
    
}
function getRandomNumbers(){
    //uppercase letter 48 to 57 char code
    return String.fromCharCode(Math.floor(Math.random()*10)+48)
   
}

function getRandomSymbols(){
    const symbols = "!@#$%^&*(){}[]=<>/.,";
    return symbols[Math.floor(Math.random()*symbols.length)]
}
