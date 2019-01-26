import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// loads the Icon plugin
UIkit.use(Icons);


UIkit.util.on('#offcanvas-overlay', 'show', function() {
  document.getElementById('nav-menu-open').classList.add('uk-hidden');
  document.getElementById('nav-menu-close').classList.remove('uk-hidden');
});

UIkit.util.on('#offcanvas-overlay', 'hide', function () {
  document.getElementById('nav-menu-close').classList.add('uk-hidden');
  document.getElementById('nav-menu-open').classList.remove('uk-hidden');
});

UIkit.util.on('#nav-menu-close', 'click', function(e) {
  e.stopPropagation();
  e.preventDefault();
  UIkit.offcanvas('#offcanvas-overlay').hide();
});
