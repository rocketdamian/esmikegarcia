import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

var isMenuOpen = false;

// loads the Icon plugin
UIkit.use(Icons);

UIkit.util.on('.nav-menu-close', 'click', function (e) {
  closeMenu();
});

UIkit.util.on('.nav-menu-open', 'click', function (e) {
  document.body.classList.add("is-menu-open");
  console.log(document.getElementsByClassName('nav-menu-open'));
  // document.getElementsByClassName('nav-menu-open').classList.add('uk-hidden');
  // document.getElementsByClassName('nav-menu-close').classList.remove('uk-hidden');
  addClasesToClass('nav-menu-open', 'uk-hidden');
  removeClasesToClass('nav-menu-close', 'uk-hidden');
  isMenuOpen = true;
});


addEvent(document, "keydown", function (evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = (evt.key == "Escape" || evt.key == "Esc");
  } else {
    isEscape = (evt.keyCode == 27);
  }
  if (isEscape && isMenuOpen) {
    closeMenu()
  }
});

function addClasesToClass(className, addClass) {
  var el = document.getElementsByClassName(className);
  // Loop the NodeList through
  for (var i = 0; i < el.length; i++) {
    el[i].classList.add(addClass);
  }
}

function removeClasesToClass(className, removeClass) {
  var el = document.getElementsByClassName(className);
  // Loop the NodeList through
  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove(removeClass);
  }
}

function closeMenu() {
  document.body.classList.remove("is-menu-open");
  // document.getElementsByClassName('nav-menu-close').classList.add('uk-hidden');
  // document.getElementsByClassName('nav-menu-open').classList.remove('uk-hidden');
  addClasesToClass('nav-menu-close', 'uk-hidden');
  removeClasesToClass('nav-menu-open', 'uk-hidden');
  isMenuOpen = false;
}

function addEvent(element, eventName, callback) {
  if (element.addEventListener) {
    element.addEventListener(eventName, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventName, callback);
  } else {
    element["on" + eventName] = callback;
  }
}