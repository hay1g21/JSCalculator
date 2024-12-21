//vars

const calculator = document.querySelector('#gom')
const keys = document.querySelector('.calculatorkeys')

//for calculator display
const display = document.querySelector('.outputtext')
console.log(document)
console.log(calculator)
console.log(keys)

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        //dowhatever
        
        const key = e.target
        const action = key.dataset.action //grabs from data- then goes to action (second part)
        const keyContent = key.textContent //gets text cointent of the button
        const displayedNum = display.textContent
    

        if(!action){
            //console.log("Number key")
            if(displayedNum === '0'){
                display.textContent = keyContent
            }else{
                display.textContent = displayedNum + keyContent
            }
        }
        if(
            action=== 'add' ||
            action=== 'subtract' ||
            action=== 'multiply' ||
            action=== 'divide'
           
        ){
            console.log('operator key!')
            key.classList.add('is-depressed')
        }
        if(
            action === 'decimal'){
                //console.log("decimal")
                display.textContent = displayedNum + "."
            }
        if(
            action === 'clear'){
                console.log("clear key")
            }
        if(
            action === 'calculate'){
                console.log("calculate key")
            }
    }

})