const navbar = document.getElementById('navbar');
const dealsLink = document.getElementById('deals-link');
const navIcon = document.getElementById('nav-icon');
const navLinksMobile = document.getElementById('nav-links-mobile');

let isNavOpen = false;

// // NAVBAR TRANSFORMS ON SCROLL

// window.onscroll = () => {
//   const currentScrollPos = window.pageYOffset;
//   if (currentScrollPos > 100) {
//     navbar.style.backgroundColor = 'dodgerblue';
//     navbar.style.boxShadow = '0 10px 15px rgba(0,0,0,0.25)';
//     navbar.style.padding = '2rem';
//     dealsLink.style.border = 'none';
//     dealsLink.style.marginLeft = '0';
//   } else {
//     navbar.style.backgroundColor = 'transparent';
//     navbar.style.boxShadow = 'none';
//     navbar.style.padding = '3rem';
//     navbar.style.paddingLeft = '2rem';
//     navbar.style.paddingRight = '2rem';
//     dealsLink.style.border = '3px solid white';
//     dealsLink.style.marginLeft = '1rem';
//   }
// };

// // OPEN NAV MENU

// function disableScroll() {
//   document.body.style.overflow = 'hidden';
//   document.querySelector('html').scrollTop = window.scrollY;
// }

// function enableScroll() {
//   document.body.style.overflow = null;
// }

navIcon.addEventListener('click', () => {
  navIcon.classList.toggle('open');

  if (navIcon.className === 'open') {
    isNavOpen = true;
  } else {
    isNavOpen = false;
  }

  if (isNavOpen === true) {
    navLinksMobile.style.opacity = '1';
    navLinksMobile.style.transform = 'scaleY(1)';
  } else {
    navLinksMobile.style.opacity = '0';
    navLinksMobile.style.transform = 'scaleY(0)';
  }
});

// Smooth Scrolling
// Smooth Scrolling
// Smooth Scrolling

(function initSmoothScrolling() {
  console.log('smooth scrolling');

  const duration = 400;

  const pageUrl = location.hash ? stripHash(location.href) : location.href;

  (function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target)) return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function () {
          setFocus(e.target.hash);
        },
      });
    }
  })();

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' && n.hash.length > 0 && stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

  function jump(target, options) {
    var start = window.pageYOffset,
      opt = {
        duration: options.duration,
        offset: options.offset || 0,
        callback: options.callback,
        easing: options.easing || easeInOutQuad,
      },
      distance =
        typeof target === 'string' ? opt.offset + document.querySelector(target).getBoundingClientRect().top : target,
      duration = typeof opt.duration === 'function' ? opt.duration(distance) : opt.duration,
      timeStart,
      timeElapsed;

    requestAnimationFrame(function (time) {
      timeStart = time;
      loop(time);
    });

    function loop(time) {
      timeElapsed = time - timeStart;

      window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

      if (timeElapsed < duration) requestAnimationFrame(loop);
      else end();
    }

    function end() {
      window.scrollTo(0, start + distance);

      if (typeof opt.callback === 'function') opt.callback();
    }

    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  }
})();
