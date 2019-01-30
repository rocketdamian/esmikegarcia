// var tumblr = require('tumblr.js');
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import moment from 'moment';

moment.locale('es')
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
  limit: '6'
}, function(err, resp) {
  resp.posts.forEach(function(post, index) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.body;
    var title = post.title || tempDiv.getElementsByTagName('h1')[0].innerHTML;
    var image = tempDiv.getElementsByTagName('img').length > 0? tempDiv.getElementsByTagName('img')[0].getAttribute('src') : '';
    var body =  tempDiv.getElementsByTagName('p').length > 0? tempDiv.getElementsByTagName('p') : [];
    var bodyText = '';

    for (var i = 0; i < body.length; i++) {
      bodyText += '<p>' + body[i].innerHTML + '</p>';
    }

    var link = post.post_url;
    var date = moment.unix(post.timestamp).format("MMMM YYYY");
    document.getElementById('news-title-' + index).innerHTML = title;
    document.getElementById('news-body-' + index).innerHTML = bodyText;
    document.getElementById('news-date-' + index).innerHTML = date;
    document.getElementById('news-link-' + index).setAttribute('href', link);
    document.getElementById('news-background-' + index).style.backgroundImage = 'url(' + image + ')';
  });
  
});
