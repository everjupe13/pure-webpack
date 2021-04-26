window.addEventListener('load', ()=> {

    // Smooth scroll link beacon
    const links = document.querySelectorAll('a[href*="#"].smooth-scroll-link');

    links.forEach((link) => {

        link.addEventListener('click', (e) => {
            
            e.preventDefault();
            let id = link.getAttribute('href').substr(1);

            document.getElementById(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });

    });

});