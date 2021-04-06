
import Inputmask from "inputmask";



const maskValidate = () => {
    const inputs = document.querySelectorAll('input[type="tel"]');
    const onlineForm = document.querySelector('.online__form');
    const calcForm = document.querySelector('.calc__form');
    const onlineInputs = onlineForm.querySelectorAll('input');

    const im = new Inputmask('+7 (999) 999-99-99');
    im.mask(inputs);

	const postData = dataUser => fetch('./assets/resources/mail.php', {
		method: 'POST',
		body: dataUser,
	});

	// Отправка формы
	const sendForm = () => {
        const formData = new FormData(onlineForm);
		
       
        
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
			user_name: /.+/,
			phone: /.+/,
		};
		onlineForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
			let err = false;

			// Валидация полей
			onlineInputs.forEach(input => {
				
				input.value = input.value.trim();
				let pattern = patterns[input.name];

				if (!pattern.test(input.value)) {
					input.classList.add('error');
					err = true;


				} 
				else {
					sendForm();
				}
			});
			if (err) {
				e.preventDefault();
				alert('Заполните все поля')
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