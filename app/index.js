import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import moment from 'moment';

var $ = require("jquery");

moment.locale('es')
var isMenuOpen = false;

// loads the Icon plugin
UIkit.use(Icons);

setTimeout(function () {
  var pl = document.getElementById('page-loader');
  document.body.removeChild(pl);
  document.body.classList.remove("no-scroll");
  document.getElementById('site-content').classList.remove('uk-invisible');
}, 3000);

UIkit.util.on('.uk-navbar-toggle', 'click', function (e) {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});


$(document).ready(function () {
  var navBar = $('#left-nav');
  var startchange = $('#content');
  var offset = startchange.offset();
  if (startchange.length) {
    $(document).scroll(function () {
      if (navBar.offset().top >= offset.top) {
        navBar.addClass('on-content');
      } else {
        navBar.removeClass('on-content');
      }
    });
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
  document.body.classList.add("no-scroll");
  addClasesToClass('nav-menu-open', 'uk-hidden');
  removeClasesToClass('nav-menu-close', 'uk-hidden');
  isMenuOpen = true;
}

function closeMenu() {
  document.body.classList.remove("is-menu-open");
  document.body.classList.remove("no-scroll");
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
}, function (err, resp) {
  resp.posts.forEach(function (post, index) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.body;
    var title = post.title || tempDiv.getElementsByTagName('h1')[0].innerHTML;
    var image = tempDiv.getElementsByTagName('img').length > 0 ? tempDiv.getElementsByTagName('img')[0].getAttribute('src') : '';
    var body = tempDiv.getElementsByTagName('p').length > 0 ? tempDiv.getElementsByTagName('p') : [];
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

var ig = require('instagram-node').instagram();
// ig.use({ access_token: '26022854.ba4c844.9ab19fb4aa4342668c5d7301fe6f8dab' });
ig.use({
  client_id: 'e8ce2d2784bd4e478510f0ec9bOadc3b',
  client_secret: '69e3ecb0d396406a8f76f545b5fce1e9',
  access_token: '2074990290.e8ce2d2.1fa273b858d74d928eec5af57ef629c2'
});

ig.user_media_recent(
  '2074990290',
  {
    count: 6
  },
  function (err, medias, pagination, remaining, limit) {
    medias.forEach(function (media, index) {
      document.getElementById('instagram-background-' + index).style.backgroundImage = 'url(' + media.images.standard_resolution.url + ')';
      document.getElementById('instagram-url-' + index).setAttribute('href', media.link);
    });
  }
);


// ig.user('2074990290', function(err, result, remaining, limit) {});



