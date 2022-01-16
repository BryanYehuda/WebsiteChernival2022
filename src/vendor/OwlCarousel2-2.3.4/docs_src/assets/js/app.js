$(document).ready(() => {
  // responsive nav
  const responsiveNav = $('#toggle-nav');
  const navBar = $('.nav-bar');

  responsiveNav.on('click', (e) => {
    e.preventDefault();
    console.log(navBar);
    navBar.toggleClass('active');
  });

  // pseudo active
  if ($('#docs').length) {
    const sidenav = $('ul.side-nav').find('a');
    var url = window.location.pathname.split('/');
    var url = url[url.length - 1];

    sidenav.each((i, e) => {
      const active = $(e).attr('href');

      if (active === url) {
        $(e).parent('li').addClass('active');
        return false;
      }
    });
  }
});

hljs.configure({ tabReplace: '  ' });
hljs.initHighlightingOnLoad();
