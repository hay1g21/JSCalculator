//vars

const calculator = document.querySelector('#gom')
const keys = document.querySelector('.calculatorkeys')

//for calculator display
const display = document.querySelector('.outputtext')
console.log(document)
console.log(calculator)
console.log(keys)


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        //dowhatever

        const key = e.target
        const action = key.dataset.action //grabs from data- then goes to action (second part)
        const keyContent = key.textContent //gets text cointent of the button
        const displayedNum = display.textContent //gets display number before changing
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('selectOp'))
        if (!action) {
            //console.log("Number key")
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }
        //operators
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'

        ) {

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            //if a new operator is selected, do a calc, cant spam operator
            if(firstValue && operator && previousKeyType !== 'operator'){
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            //adds new custom att for checking prev key
            //adds first value based on what came before the result e.g 8-2 = 6, 1st num = 2
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator'

            console.log('operator key!')
            key.classList.add('selectOp')
        }
        if (
            action === 'decimal') {
            //console.log("decimal")
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + "."
            }else if(previousKeyType === 'operator'){
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
            
        }
        if (
            action === 'clear') {
            console.log("clear key")
            calculator.dataset.previousKeyType = 'clear'
        }
        if (
            action === 'calculate') {
            console.log("calculate key")
            const secondValue = displayedNum
            const firstValue = calculator.dataset.firstValue
            const op = calculator.dataset.operator

            display.textContent = calculate(firstValue, op, secondValue)
            calculator.dataset.previousKeyType = 'calculate'
        }
        //loop thru and remove all selected

    }

})

//function to calculate numbers
const calculate = (n1, operator, n2) => {
    let result = '' //let is scoped to current block

    //convert them to numbers first!!!
    let num1 = parseFloat(n1)
    let num2 = parseFloat(n2)
    if(operator === 'add'){
        result = num1 + num2;
    }else if(operator === 'subtract'){
        result = num1 - num2;
    }
    else if(operator === 'multiply'){
        result = num1 * num2;
    }
    else if(operator === 'divide'){
        result = num1 / num2;
    }

    return result;
}