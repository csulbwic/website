/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
  var $window = $(window),
    $body = $("body"),
    settings = {
      // Carousels
      carousels: {
        speed: 4,
        fadeIn: true,
        fadeDelay: 250
      }
    };

  // Breakpoints.
  breakpoints({
    wide: ["1281px", "1680px"],
    normal: ["961px", "1280px"],
    narrow: ["841px", "960px"],
    narrower: ["737px", "840px"],
    mobile: [null, "736px"]
  });

  // Play initial animations on page load.
  $window.on("load", function() {
    window.setTimeout(function() {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Dropdowns.
  $("#nav > ul").dropotron({
    mode: "fade",
    speed: 350,
    noOpenerFade: true,
    alignment: "center"
  });

  // Scrolly.
  $(".scrolly").scrolly();

  // Nav.

  // Button.
  $(
    '<div id="navButton">' +
      '<a href="#navPanel" class="toggle"></a>' +
      "</div>"
  ).appendTo($body);

  // Panel.
  $('<div id="navPanel">' + "<nav>" + $("#nav").navList() + "</nav>" + "</div>")
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      target: $body,
      visibleClass: "navPanel-visible"
    });

  // Carousels.
  $(".carousel").each(function() {
    var $t = $(this),
      $forward = $('<span class="forward"></span>'),
      $backward = $('<span class="backward"></span>'),
      $reel = $t.children(".reel"),
      $items = $reel.children("article");

    var pos = 0,
      leftLimit,
      rightLimit,
      itemWidth,
      reelWidth,
      timerId;

    // Items.
    if (settings.carousels.fadeIn) {
      $items.addClass("loading");

      $t.scrollex({
        mode: "middle",
        top: "-20vh",
        bottom: "-20vh",
        enter: function() {
          var timerId,
            limit = $items.length - Math.ceil($window.width() / itemWidth);

          timerId = window.setInterval(function() {
            var x = $items.filter(".loading"),
              xf = x.first();

            if (x.length <= limit) {
              window.clearInterval(timerId);
              $items.removeClass("loading");
              return;
            }

            xf.removeClass("loading");
          }, settings.carousels.fadeDelay);
        }
      });
    }

    // Main.
    $t._update = function() {
      pos = 0;
      rightLimit = -1 * reelWidth + $window.width();
      leftLimit = 0;
      $t._updatePos();
    };

    $t._updatePos = function() {
      $reel.css("transform", "translate(" + pos + "px, 0)");
    };

    // Forward.
    $forward
      .appendTo($t)
      .hide()
      .mouseenter(function(e) {
        timerId = window.setInterval(function() {
          pos -= settings.carousels.speed;

          if (pos <= rightLimit) {
            window.clearInterval(timerId);
            pos = rightLimit;
          }

          $t._updatePos();
        }, 10);
      })
      .mouseleave(function(e) {
        window.clearInterval(timerId);
      });

    // Backward.
    $backward
      .appendTo($t)
      .hide()
      .mouseenter(function(e) {
        timerId = window.setInterval(function() {
          pos += settings.carousels.speed;

          if (pos >= leftLimit) {
            window.clearInterval(timerId);
            pos = leftLimit;
          }

          $t._updatePos();
        }, 10);
      })
      .mouseleave(function(e) {
        window.clearInterval(timerId);
      });

    // Init.
    $window.on("load", function() {
      reelWidth = $reel[0].scrollWidth;

      if (browser.mobile) {
        $reel
          .css("overflow-y", "hidden")
          .css("overflow-x", "scroll")
          .scrollLeft(0);
        $forward.hide();
        $backward.hide();
      } else {
        $reel.css("overflow", "visible").scrollLeft(0);
        $forward.show();
        $backward.show();
      }

      $t._update();

      $window
        .on("resize", function() {
          reelWidth = $reel[0].scrollWidth;
          $t._update();
        })
        .trigger("resize");
    });
  });
})(jQuery);

var instaFeed = new Instafeed({
  get: "user",
  userId: 14521179279,
  accessToken: "14521179279.1677ed0.f8f12bb8a2514d8c9f05beffd95ded87",
  target: "instafeed",
  sortBy: "most-recent",
  limit: 4,
  resolution: "standard_resolution",
  template:
    '<a rel="fancybox-thumb" data-title-id="title-1" class="fancybox-thumb" title="{{caption}}" href="{{image}}"><img src="{{image}}" /><div id="filter">{{model.filter}}</div><div class="info"><p id="title-1" class="location"><i class="icon-location"></i>{{location}}</p><p><i class="icon-comment"></i>{{caption}}</p><br><ul id="title-2"><li class="icon-heart" >{{likes}} likes<li class="icon-chat">{{comments}} comments</ul></div></a>'
}).run();

$.fn.extend({
  matchHeight: function(data) {
    var maxHeight = 0;
    $(this).each(function() {
      maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });
    $(this).height(maxHeight);
  }
});

// Make fancybox work
$(document).ready(function() {
  $(".fancybox-thumb").fancybox({
    prevEffect: "elastic",
    nextEffect: "elastic",
    helpers: {
      title: {
        type: "outside"
      },
      thumbs: {
        width: 50,
        height: 50
      }
    }
  });
});
