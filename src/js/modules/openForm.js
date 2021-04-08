const openForm = () => {
    const pageContent = document.querySelector('.page-content');
    const $overlay = document.querySelector('.overlay');
    const btnRequest = document.querySelectorAll('.btn-request');
    const onlineForm = document.querySelector('.online');
    const onlineClose = document.querySelector('.online-close');

    const addActiveClasses = () => {
        onlineForm.classList.add('active');
        $overlay.classList.add('active');
        pageContent.classList.add('active');
    }
    const removeActiveClasses = () => {
        onlineForm.classList.remove('active');
        $overlay.classList.remove('active');
        pageContent.classList.remove('active');
    }

    btnRequest.forEach(btn => {
        if (!pageContent.classList.contains('active')) {
            btn.addEventListener('click', () => {
                addActiveClasses();
            });

        }
    })

    onlineClose.addEventListener('click', removeActiveClasses);
    $overlay.addEventListener('click', removeActiveClasses);
}

export default openForm;