$(document).ready(function() {
    $('.main-nav__toggle').click(function() {
        $('.main-nav__menu').toggleClass('main-nav__menu--active');
        $('.main-nav__toggle').toggleClass('main-nav__toggle--active');
    });
});