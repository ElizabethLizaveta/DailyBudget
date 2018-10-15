'use strict';

let buttonstart = document.getElementById('start'),
budgetValue = document.getElementsByClassName('budget-value')[0],
dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
levelValue = document.getElementsByClassName('level-value')[0],
expensesValue = document.getElementsByClassName('expenses-value')[0],
optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
incomeValue = document.getElementsByClassName('income-value')[0],
monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

expenses = document.getElementsByClassName('expenses-item'),
buttons = document.getElementsByTagName('button'),
expensesBtn = buttons[0],
optionalExpensesBtn = buttons[1],
countBtn = buttons[2],

optional = document.querySelectorAll('.optionalexpenses-item'),

income = document.querySelector('.choose-income'),
checkbox = document.querySelector('#savings'),
sumValue = document.querySelector('.choose-sum'),
percentValue = document.querySelector('.choose-percent'),

year = document.querySelector('.year-value'),
month = document.querySelector('.month-value'),
day = document.querySelector('.day-value');


let money, time;

buttonstart.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while(isNaN(money) || money == "" || money == null){
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();

    countBtn.disabled = false;
   
    if (expenses.length != 0){
        expensesBtn.disabled = false;
    }

    if (optional.length != 0){
        optionalExpensesBtn.disabled = false;
    }
});

expensesBtn.addEventListener('click', function(){
    let sum = 0;
    
    for (let i = 0; i < expenses.length; i++) {
            let a1 = expenses[i].value,
                a2 = expenses[++i].value;
    
            if ((typeof (a1)) === 'string' && a1 != null && a2 != null && a1 != '' && a2 != '' && a1.length < 50) {
                console.log("done");
                appData.expenses[a1] = a2;
                sum += +a2;
            } else {
                i--;
            }
        }
        expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function(){
        for (let i = 0; i < optional.length; i++) {
            let opt = optional[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + '';
        }
});

countBtn.addEventListener('click', function(){
    let summa =  +expensesValue.textContent;
    if (appData.budget != undefined) {
    appData.moneyPerDay = ((appData.budget - summa)/ 30).toFixed(2);
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
        levelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        levelValue.textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerDay > 2000) {
        levelValue.textContent = 'Высокий уровень достатка';
    } else {
        levelValue.textContent = 'Произошла ошибка';
    }
 } else {
    dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

income.addEventListener('input', function(){
let items = income.value;
appData.income = items.split(', ');
incomeValue.textContent = appData.income;
});

checkbox.addEventListener('click', function(){
if (appData.savings == true){
    appData.savings = false;
} else {
    appData.savings = true;
}
});

sumValue.addEventListener ('input',function(){
    if (appData.savings == true) {
        let sum = +sumValue.value,
        percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false   
};

countBtn.disabled = true;
expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
