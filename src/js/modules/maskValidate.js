
import Inputmask from "inputmask";



const maskValidate = () => {
    const inputs = document.querySelectorAll('input[type="tel"]');
    const onlineForm = document.querySelector('.online__form');
    const calcForm = document.querySelector('.calc__form');
    const calcInputs = calcForm.querySelectorAll('.calc-input');
    const onlineInputs = onlineForm.querySelectorAll('input');
	const calcArray = [];

    const im = new Inputmask('+7 (999) 999-99-99');
    im.mask(inputs);

	const postData = dataUser => fetch('./assets/resources/mail.php', {
		method: 'POST',
		body: dataUser,
	});

	const updateCalcArray = () => {
		calcInputs.forEach(input => {
			calcArray.push(input.name + ': ' + input.value);	
		})
	}

	// Отправка формы
	const sendForm = (form) => {
        const formData = new FormData(form);
		updateCalcArray();
		formData.append('Калькулятор', JSON.stringify(calcArray));

		postData(formData)
			.then(res => {
				if (!res.ok) {
					throw new Error(`Возникла ошибка по адресу: ${res.url} Статус ошибки: ${res.status}`);
				}
				alert('Данные успешно отправлены, с вами свяжутся в ближайшее время');
				
			})
			.catch(err => {
				alert('К сожалению произошла ошибка, повторите попытку похже');
			})
			.finally(() => {
				onlineForm.reset();
			});

	}

	
	// Валидация и отправка формы
	const sendValidForm = () => {
        
		// Карта валидации
		let patterns = {
			notEmpty: /.+/,
		};
		onlineForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
			let err = false;
			
			// Валидация полей
			
			onlineInputs.forEach(input => {
				
				input.value = input.value.trim();
				let pattern = patterns[input.dataset.valid];
				if (!pattern.test(input.value)) {
					input.classList.add('error');
					err = true;
					msg = 'Заполните поля!'
					let cont = document.querySelectorAll('.online-error').forEach(el => {
						el.append(msg[i]);
					})

				} 
				
			});
			if (err) {
				e.preventDefault();
				alert('Заполните все поля')
			}
			else {
				sendForm(onlineForm);					
			}

		});
		onlineForm.addEventListener('focusin', (e) => {
			let target = e.target;
			if(target.classList.contains('online__input')) {
				target.classList.remove('error');
			}

		});


	}

	sendValidForm();

	
}

export default maskValidate;