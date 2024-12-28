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
    const action = key.dataset.action
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

//updates visuals e.g applying grey class and ac/ce button
const updateVisualState = (key,calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('selectOp'))
    //adds new custom att for checking prev key
    if (keyType === 'operator') key.classList.add('selectOp')
    if(keyType !== 'clear'){
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }
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

    const keyContent = key.textContent //get text content!!
    const previousKeyType = state.previousKeyType
    const op = state.operator
    const firstValue = state.firstValue

    const keyType = getKeyType(key) //makes it look nicer
    console.log(keyType)
    if(keyType === 'number'){
        
        return displayedNum === '0' || 
        previousKeyType === 'operator' || 
        previousKeyType === 'calculate' 
        ? keyContent 
        : displayedNum + keyContent
        
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
        && op 
        && previousKeyType !== 'operator' 
        && previousKeyType !== 'calculate' 
        ? calculate(firstValue, op, displayedNum) 
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
    const previousKeyType = calculator.dataset.previousKeyType
    
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
        ? calculator.dataset.modValue
        : displayedNum  //carry the prev second val into the thing, like 5 - **1** - **1**
       
       
    }
    calculator.dataset.previousKeyType = keyType

    

}
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        //dowhatever

        //const resultString = createResultsString()
        const key = e.target
        const displayedNum = display.textContent //gets display number before changing

        //removes grey out from previously selected keys

        //Pure
        const resultString = createResultsString(key,displayedNum,calculator.dataset)
        console.log(resultString)
        display.textContent = resultString
        updateCalculatorState(key, calculator, resultString, displayedNum)
        updateVisualState(key,calculator)
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
    if(operator === 'divide'){
        if(num1 === 0 & num2 === 0){
            //error case
            return 0;
        }
        return result = num1 / num2;
    }
       
    

   
}