const navbar = document.getElementById('navbar');
const dealsLink = document.getElementById('deals-link');
const navIcon = document.getElementById('nav-icon');
const navLinksMobile = document.getElementById('nav-links-mobile');

let isNavOpen = false;

// NAVBAR TRANSFORMS ON SCROLL

window.onscroll = () => {
  const currentScrollPos = window.pageYOffset;
  if (currentScrollPos > 100) {
    navbar.style.backgroundColor = 'dodgerblue';
    navbar.style.boxShadow = '0 10px 15px rgba(0,0,0,0.25)';
    navbar.style.padding = '2rem';
    dealsLink.style.border = 'none';
    dealsLink.style.marginLeft = '0';
  } else {
    navbar.style.backgroundColor = 'transparent';
    navbar.style.boxShadow = 'none';
    navbar.style.padding = '3rem';
    navbar.style.paddingLeft = '2rem';
    navbar.style.paddingRight = '2rem';
    dealsLink.style.border = '3px solid white';
    dealsLink.style.marginLeft = '1rem';
  }
};

// OPEN NAV MENU

function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.querySelector('html').scrollTop = window.scrollY;
}

function enableScroll() {
  document.body.style.overflow = null;
}

navIcon.addEventListener('click', () => {
  navIcon.classList.toggle('open');

  if (navIcon.className === 'open') {
    isNavOpen = true;
    disableScroll();
  } else {
    isNavOpen = false;
    enableScroll();
  }

  if (isNavOpen === true) {
    navLinksMobile.style.opacity = '1';
    navLinksMobile.style.transform = 'scaleY(1)';

    if (window.pageYOffset < 100) {
      navbar.style.backgroundColor = 'dodgerblue';
    }
  } else {
    navLinksMobile.style.opacity = '0';
    navLinksMobile.style.transform = 'scaleY(0)';

    if (window.pageYOffset < 100) {
      navbar.style.backgroundColor = 'transparent';
    }
  }
});
