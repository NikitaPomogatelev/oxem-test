const burgerMenu = () => {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger');
    const headerMenu = document.querySelector('.header-menu');
    const $overlay = document.querySelector('.overlay');
    const headerClose = document.querySelector('.header-close');

    const addClasses = () => {
        burger.classList.add('active');
        $overlay.classList.add('active');
        headerMenu.classList.add('active');
    }

    const removeClasses = () => {
        burger.classList.remove('active');
        $overlay.classList.remove('active');
        headerMenu.classList.remove('active');
    }


    burger.addEventListener('click', (e) => {
        addClasses();
        header.style.zIndex = '5';
    })


    headerMenu.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('btn-request') || target.closest('.btn-request')) {
            removeClasses();
            $overlay.classList.add('active');
            header.style.zIndex = '';
        }
        if (target.classList.contains('header-close') || target.closest('.header-close')) {
            removeClasses();
            header.style.zIndex = '';
        }
    });

    $overlay.addEventListener('click', () => {
        removeClasses();
        header.style.zIndex = '';
    });
}

export default burgerMenu;