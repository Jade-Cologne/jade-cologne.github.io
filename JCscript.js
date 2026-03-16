(function () {
    var header = document.querySelector('header');
    var headerH = 0;

    function updateHeaderHeight() {
        if (!header) return;
        headerH = header.offsetHeight;
        document.documentElement.style.setProperty('--header-h', headerH + 'px');
    }

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    document.querySelectorAll('.page-sticky-header').forEach(function (stickyEl) {
        var sentinel = document.createElement('div');
        sentinel.setAttribute('aria-hidden', 'true');
        stickyEl.insertAdjacentElement('beforebegin', sentinel);

        var observer = new IntersectionObserver(
            function (entries) {
                var entry = entries[0];
                var stuck = !entry.isIntersecting && entry.boundingClientRect.top < headerH;
                stickyEl.classList.toggle('is-stuck', stuck);
            },
            { rootMargin: '-' + Math.round(headerH) + 'px 0px 0px 0px' }
        );

        observer.observe(sentinel);
    });
})();
