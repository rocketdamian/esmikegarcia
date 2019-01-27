// var tumblr = require('tumblr.js');
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

var isMenuOpen = false;

// loads the Icon plugin
UIkit.use(Icons);

UIkit.util.on('.uk-navbar-toggle', 'click', function (e) {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
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

function openMenu() {
  document.body.classList.add("is-menu-open");
  addClasesToClass('nav-menu-open', 'uk-hidden');
  removeClasesToClass('nav-menu-close', 'uk-hidden');
  isMenuOpen = true;
}

function closeMenu() {
  document.body.classList.remove("is-menu-open");
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


// Authenticate via OAuth
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'x93Vj82zDt0G1vvAao7t1Xzhy3RfcSSsn0udVoo5ZIwcfDfI8i',
  consumer_secret: '5TYa4ujBc1UdWq9gbNORH21XEyyuaoPPCytUjzzan7JQNngBAR',
  token: 'jTazJbYqaDGpjC8olqWrg3MociPAPvUbeUZSd1bJwCjullWuJq',
  token_secret: 'HqSIasZwqMErA0ZXdCdNnhKD5yWCRoW9ovgwxogj8z0K09GanW'
});

client.blogPosts('esmikegarcia', {
  limit: '1'
}, function(err, resp) {
  var post = resp.posts[0];
  document.getElementById('tumblr-post-title').innerHTML =post.title;
  document.getElementById('tumblr-post-body').innerHTML =post.body;
});