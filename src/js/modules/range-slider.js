import accounting from 'accounting-js';
import noUiSlider from 'nouislider';




const rangeSlider = () => {
    const costSlider = document.querySelector('.calc__slider-cost');
    const paymentSlider = document.querySelector('.calc__slider-payment');
    const dateSlider = document.querySelector('.calc__slider-date');
    const inputCost = document.querySelector('.input-cost');
    const inputPayment = document.querySelector('.input-payment');
    const inputDate = document.querySelector('.input-date');
    const calcInputPercent = document.querySelector('.calc-input__percent');
    const inputPerMounth = document.querySelector('.input-per-mounth');
    const inputContract = document.querySelector('.input-contract');
    const arr = [null, null];

    noUiSlider.create(costSlider, {
        start: [1000000, 6000000],
        connect: true,
        step: 1,
        range: {
            'min': 1000000,
            'max': 6000000
        },
    });
    noUiSlider.create(paymentSlider, {
        start: [10, 60],
        connect: true,
        step: 1,
        range: {
            'min': 10,
            'max': 60
        }
    });
    noUiSlider.create(dateSlider, {
        start: [1, 60],
        connect: true,
        step: 1,
        range: {
            'min': 1,
            'max': 60
        }
    });

    const formatRubles = (number) => {
        return accounting.formatNumber(number, { 
            precision : 0,
            thousand : " ",
            decimal : " "
          });
    }
    

    



    const setRangeSlider = (rangeSlider, value) => {
        arr[1] = value;
        rangeSlider.noUiSlider.set(arr);
    }

    const calcCost = () => {
        let percent = +calcInputPercent.textContent.replace('%', '').trim();
        // Первончальный взнос в цифрах
        let calcPayment = inputCost.value * percent / 100;
        inputPayment.value = (Math.round(calcPayment));
        // Ежемесячный платеж
        let calcCostPerMounth = inputCost.value - inputPayment.value * ((percent / 100) / (1 + (percent / 100)) - inputDate.value - 1);
        inputPerMounth.value = `${Math.round(calcCostPerMounth)} ₽`;
        // Сумма договора лизинга
        let calcContract = calcPayment + inputDate.value * calcCostPerMounth;
        inputContract.value = `${Math.round(calcContract)} ₽`;

    };


    costSlider.noUiSlider.on('update', (values, handle) => {
        inputCost.value = Math.round(values[1]);
        calcCost();
    });
    paymentSlider.noUiSlider.on('update', (values) => {
        let calcPayPercent = inputPayment.value * 100 / inputCost.value;
        console.log(calcPayPercent);
        calcInputPercent.textContent = `${Math.round(values[1])}%`;
        calcCost();
    });
    dateSlider.noUiSlider.on('update', (values, handle) => {
        inputDate.value = Math.round(values[1]);
        calcCost();
    });

    inputCost.addEventListener('change', (e) => {
        setRangeSlider(costSlider, e.currentTarget.value);
        calcCost();
    });
    inputPayment.addEventListener('change', (e) => {
        let payPercent = Math.round(e.currentTarget.value * 100 / inputCost.value);
        setRangeSlider(paymentSlider, payPercent);
        calcCost();

    });
    inputDate.addEventListener('change', (e) => {
        setRangeSlider(dateSlider, e.currentTarget.value);
        calcCost();
    });
}

export default rangeSlider;