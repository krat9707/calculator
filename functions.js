const upperScreen = document.querySelector('.upperScreen');
const lowerScreen = document.querySelector('.lowerScreen');
const numericbtns = document.querySelectorAll('.button.num');
const functionbtns = document.querySelectorAll('.button.func');
const cmdBtns = document.querySelectorAll('.button.cmd');

let dotOnceClicked = false;

numericbtns.forEach(button => {
    button.addEventListener('click', numericBtnSetup);
});

functionbtns.forEach(button => {
    button.addEventListener('click', functionBtnSetup);
});

cmdBtns.forEach(button => {
    button.addEventListener('click', cmdBtnSetup);
});

function numericBtnSetup()
{
    let currOutput = lowerScreen.textContent;

    if(this.textContent === '.')
    {
        if(dotOnceClicked === true)
            return;
        
        dotOnceClicked = true;
    }
    
    if(currOutput === '0' && this.textContent !== '.')
        currOutput = this.textContent;
    else
        currOutput += this.textContent;

    lowerScreen.textContent = currOutput;
}


function functionBtnSetup()
{
    // press equalBtn -> gives final ans -> display to final ans + curr pressed func btn -> clear lower Screen
    dotOnceClicked = false;
    let beforeUpperVal = upperScreen.textContent.split(' ');
    let beforeLowerVal = lowerScreen.textContent || '-1';
    let upperVal = beforeUpperVal[0] || '-1';
    let opr = beforeUpperVal[1] || this.textContent;

    let LHS = evalEquation(upperVal, beforeLowerVal, opr);

    if(this.textContent === '=')
    {
        upperScreen.textContent = '';
        lowerScreen.textContent = `${LHS}`;  
        return;
    }

    if(upperVal === '-1' || beforeLowerVal === '-1')
    {
        if(beforeLowerVal === '-1')
            upperScreen.textContent = `${upperVal} ${this.textContent} `;
        else
            upperScreen.textContent = `${beforeLowerVal} ${this.textContent} `;
        lowerScreen.textContent = '';
        return;
    }
    

    upperScreen.textContent = `${LHS} ${this.textContent} `;
    lowerScreen.textContent = '';
}

function cmdBtnSetup() {
    if(this.textContent === 'AC')
    {
        upperScreen.textContent = '';
        lowerScreen.textContent = '0';
    }
    else
    {
        let screen = lowerScreen.textContent;
        let removeLength = 1;
        
        if(screen.charAt(screen.length - 2) === '.')
        {
            removeLength++;
            dotOnceClicked = false;
        }

        if(screen.length <= 1)
           screen = '0';
        else 
            screen = screen.substring(0, screen.length-removeLength);

        lowerScreen.textContent = screen;
    }
}


function evalEquation(left, right, opr)
{
    if(left === '-1')
        return right;
    if(right === '-1')
        return left;

    const l = parseFloat(left);
    const r = parseFloat(right);
    switch (opr) {
        case '+':
            return (l + r) % 1 ? (l + r).toFixed(2) : (l + r);
            break;
        case '-':
            return (l - r) % 1 ? (l - r).toFixed(2) : (l - r);
        case 'x':
            return (l * r) % 1 ? (l * r).toFixed(2) : (l * r);
        case '÷':
            return (l / r) % 1 ? (l / r).toFixed(2) : (l / r);
        default:
            return 0;
    }
}
