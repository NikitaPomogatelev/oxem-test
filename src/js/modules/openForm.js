const openForm = () => {
    const $overlay = document.querySelector('.overlay');
    const btnRequest = document.querySelectorAll('.btn-request');
    const onlineForm = document.querySelector('.online');
    const onlineClose = document.querySelector('.online-close');


    btnRequest.forEach(btn => {
        btn.addEventListener('click', () => {
            onlineForm.classList.add('active');
            $overlay.classList.add('active');
        });
    })

    onlineClose.addEventListener('click', () => {
        onlineForm.classList.remove('active');
        $overlay.classList.remove('active');
    });
    $overlay.addEventListener('click', () => {
        onlineForm.classList.remove('active');
        $overlay.classList.remove('active');
    });
}

export default openForm;