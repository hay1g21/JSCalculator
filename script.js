//vars

const calculator = document.querySelector('#gom')
const keys = document.querySelector('.calculatorkeys')

//for calculator display
const display = document.querySelector('.outputtext')
console.log(document)
console.log(calculator)
console.log(keys)

//add limit to numbers in display so it remains nice



const getKeyType = (key) => {
    const action = key.action
    if(!action) return 'number'
    if(
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator'
    //everything else returned as is
    return action
}
//pure function - doesnt change state but creates what needs to be on display
//key - gets action and keycontent
//state - from calc.dataset, gets firstval, modval, prevkey type, operator
//displayed num on its own
const createResultsString = (key, displayedNum, state) =>{
    /*
    vars requires: (keep track of this for refactoring)
    1. keycontent
    2. displayed num
    3. prev key type
    4. action
    5. calculator.dataset.first value
    6. calculator.datsaset.operator
    7.calculator.dataset.modvalue
    */

    const keyContent = key.keyContent
    const previousKeyType = state.previousKeyType
    const action = key.action
    const modvalue = state.modValue
    const operator = state.operator
    const firstValue = state.firstValue

    const keyType = getKeyType(key) //makes it look nicer

    if(keyType === 'number'){
        return displayedNum === '0' 
        || previousKeyType === 'operator' 
        || previousKeyType === 'calculate' ? keyContent : displayedNum + keyContent
    }

    if (keyType === 'decimal') {
        //console.log("decimal")
        if(!displayedNum.includes('.')){
            return displayedNum + "."
        }
        if(previousKeyType === 'operator' || previousKeyType === 'calculate'){
            return textContent = '0.'
        }
        //if all checks fail
        return displayedNum;
    }
    //operators
    if (keyType === 'operator') {
        //if a new operator is selected, do a calc, cant spam operator
        return firstValue 
        && operator 
        && previousKeyType !== 'operator' 
        && previousKeyType !== 'calculate' 
        ? calculate(firstValue, operator, displayedNum) 
        : displayedNum
    }

    if (keyType === 'clear') return 0;

    if (keyType === 'calculate') {
        return firstValue 
        ?   previousKeyType === 'calculate'
            ? calculate(displayedNum, op, calculator.dataset.modValue) //redoes saem calculation  
            : calculate(firstValue, op, displayedNum) //does regular calc
        :displayedNum; //need code for failed path
         
    }
    
    //updates visuals e.g applying grey class and ac/ce button
    const updateVisualState = (key) => {
        const keyType = getKeyType(key)
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('selectOp'))
        //adds new custom att for checking prev key
        if (keyType === 'operator') key.classList.add('selectOp')
        if(keyType !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
    }
    //updates state of calc and also the displayed text
    const updateCalculatorState = (key, calculator, calcValue, displayedNum) =>{
        /*
        vars needed:
        1. key
        2. displayednum
        3. calcvalue
        4. calculator
        5.modValue
        */
        const keyType = getKeyType(key)
         //removes grey out from previously selected keys
        
        if(keyType === 'number'){
           

        }
    
        if (keyType === 'decimal') {
           

        }
        //operators
        if (keyType === 'operator') {
            
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator

            //if a new operator is selected, do a calc, cant spam operator
            calculator.dataset.firstValue = firstValue 
            && operator 
            && previousKeyType 
            !== 'operator' && 
            previousKeyType !== 'calculate'
            ? calcValue 
            : displayedNum
            
            
            calculator.dataset.operator = key.dataset.action
        }
        if (keyType === 'clear') {
            
            if(key.textContent ==='AC'){
                calculator.dataset.firstValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
                calculator.dataset.modValue = ''
            }else{
                key.textContent = 'AC'
            }
            calculator.dataset.previousKeyType = 'clear'
        }
        if (keyType === 'calculate') {
            let firstValue = calculator.dataset.firstValue
           
            
            
            if(firstValue){
                if(previousKeyType === 'calculate'){
                    secondValue = calculator.dataset.modValue
                }
            }
            calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
            ? modValue
            : displayedNum  //carry the prev second val into the thing, like 5 - **1** - **1**
           
           
        }

        calculator.dataset.previousKeyType = keyType

    }
   
}
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        //dowhatever

        //const resultString = createResultsString()
        const key = e.target
        const action = key.dataset.action //grabs from data- then goes to action (second part)
        const keyContent = key.textContent //gets text cointent of the button
        const displayedNum = display.textContent //gets display number before changing
        const previousKeyType = calculator.dataset.previousKeyType

        //removes grey out from previously selected keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('selectOp'))
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
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
            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'){
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                //set first val to what came before
                calculator.dataset.firstValue = calcValue
                
            }else{
                //no calcs, put the displayed num as the first value
                //adds first value based on what came before the result e.g 8-2 = 6, 1st num = 2
                calculator.dataset.firstValue = displayedNum
            }
            //adds new custom att for checking prev key
            key.classList.add('selectOp')
            
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator'

            console.log('operator key!')
          
        }
        if (
            action === 'decimal') {
            //console.log("decimal")
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + "."
            }else if(previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
            
        }
        if (action === 'clear') {
            console.log("clear key")
            if(key.textContent ==='AC'){
                calculator.dataset.firstValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
                calculator.dataset.modValue = ''
            }else{
                key.textContent = 'AC'
            }
           
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }
        if (
            action === 'calculate') {
            console.log("calculate key")
            let firstValue = calculator.dataset.firstValue
            const op = calculator.dataset.operator
            var secondValue = displayedNum
            
            
            if(firstValue){
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, op, secondValue)
            }

            
            //update
            //carry the prev second val into the thing, like 5 - **1** - **1**
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
        if(
            action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }

    }

})

//function to calculate numbers
const calculate = (n1, operator, n2) => {
    let result = '' //let is scoped to current block

    //convert them to numbers first!!!
    let num1 = parseFloat(n1)
    let num2 = parseFloat(n2)
    if(operator === 'add') return num1 + num2;
    if(operator === 'subtract')return num1 - num2;
    if(operator === 'multiply')return num1 * num2;
    if(operator === 'divide')return result = num1 / num2;
       
    

   
}