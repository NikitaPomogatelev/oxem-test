import JustValidate from '../just-validate';
import Inputmask from "inputmask";

const maskValidate = () => {
    const inputs = document.querySelectorAll('input[type="tel"]');
    const im = new Inputmask('+7 (999) 999-99-99');
    im.mask(inputs);

let validateForms = function(selector, rules, successModal, yaGoal) {
	new window.JustValidate(selector, {
		rules: rules,
		submitHandler: function(form) {
			let formData = new FormData(form);
            console.log(form);

		}
	});
}

validateForms('.online__form', { 
    name: { 
        required: true
    }, 
    phone: { 
        required: true 
    },

});
}

export default maskValidate;


