var asOffset = 50,
  _width,
  _cwidth,
  _tgc,
  _mainc,
  tgccounter = 0;
window.headerSizes = { a: 56, b: 80, c: 126 };
function _TPGC(n) {
  return document.getElementsByClassName(n)[0];
}
function _TPGI(n) {
  return document.getElementById(n);
}
function alignFullHandler(double) {
  if (tgccounter > 20) return;
  _mainc = document.getElementById('main');
  if (_tgc === undefined || _mainc == undefined || _mainc === null) {
    _tgc = document.getElementsByClassName('tg-container');
    if (_tgc === undefined || _tgc.length === 0 || _mainc === undefined || _mainc === null) {
      tgccounter++;
      _tgc = undefined;
      setTimeout(alignFullHandler, 29);
      return;
    }
  }
  _width = _mainc.offsetWidth;
  _cwidth =
    _tgc[0] !== undefined && _tgc[0].offsetWidth !== undefined && _tgc[0].offsetWidth !== NaN ? _tgc[0].offsetWidth : 0;
  var result = _cwidth === 0 ? 0 : 0 - (_width - _cwidth) / 2;
  result = result === 0 ? -30 : result;
  document.querySelectorAll('.alignfull').forEach(function (af) {
    af.style.width = _width + 'px';
    af.style.marginLeft = result + 'px';
  });
  clearTimeout(window.afhTimer);
  if (double != 2 && double != 3 && double != 5 && double != 6)
    setTimeout(function () {
      alignFullHandler(2);
    }, 100);
  if (double == 2)
    setTimeout(function () {
      alignFullHandler(3);
    }, 500);
  if (double == 5)
    window.afhTimer = setTimeout(function () {
      alignFullHandler(6);
    }, 100);
}
alignFullHandler();
function openNewsletterSlider(newsletterSlider = 'newsletter-signup-general') {
  window.RS_REMOVABLE_MODALS = window.RS_REMOVABLE_MODALS === undefined ? [] : window.RS_REMOVABLE_MODALS;
  if (jQuery.inArray(newsletterSlider, window.RS_REMOVABLE_MODALS) == -1)
    window.RS_REMOVABLE_MODALS.push(newsletterSlider);
  if (window.removedNewsletters !== undefined && window.removedNewsletters[newsletterSlider] !== undefined)
    jQuery('body').append(window.removedNewsletters[newsletterSlider]);
  jQuery.fn.revolution.openModalAPI(
    newsletterSlider,
    undefined,
    'https://' + location.hostname + '/wp-admin/admin-ajax.php'
  );
}
(function ($) {
  $(document).ready(function () {
    jQuery('li.openNewsletter a, a.openNewsletter').click(function () {
      openNewsletterSlider();
    });
    function checkLocations() {
      if (
        jQuery.fn.revolution == undefined ||
        jQuery.fn.revolution.openModalAPI == undefined ||
        window.RS_MODULES === undefined ||
        window.RS_MODULES.minimal === !1
      ) {
        window.requestAnimationFrame(checkLocations);
        return;
      } else {
        if (window.location.search === '?plugin-newsletter') openNewsletterSlider('newsletter-signup-plugin');
        else openNewsletterSlider('newsletter-signup-general');
      }
    }
    if (window.location.search === '?plugin-newsletter' || window.location.search === '?newsletter') checkLocations();
    jQuery(document).on('click', '#rs-templateclose', function () {
      punchgs.TweenLite.to(['#masthead'], 0.0, { overflow: 'hidden', height: 0, ease: punchgs.Power3.easeInOut });
      punchgs.TweenLite.to(['#content'], 0.0, {
        overflow: 'hidden',
        marginTop: 0,
        ease: punchgs.Power3.easeInOut,
        onComplete: function () {
          //   jQuery('#masthead').remove();
          punchgs.TweenLite.to(jQuery('.rs-pos-fixed').closest('rs-fullwidth-wrap'), 0.0, { top: 0 });
        },
      });
      punchgs.TweenLite.to(['.th-fixed rs-loop-wrap', '.respect-fixedstatic rs-static-layers rs-loop-wrap'], 0.0, {
        y: 0,
        ease: punchgs.Power3.easeInOut,
        onUpdate: function () {
          jQuery('.rs-respect-topbar').revredraw();
        },
      });
    });
    jQuery(document).on('click', '#tp-infobox-closer, #tp-infobox-btn-closer, #tp-infobox-btn-closer2', function () {
      if (typeof tpGS == 'undefined') return;
      punchgs.TweenLite.to(['#tp-infoboxwrapper'], 0.5, {
        opacity: 0,
        ease: punchgs.Power3.easeInOut,
        onComplete: function () {
          jQuery('#tp-infoboxwrapper').remove();
        },
      });
    });
    jQuery('.custom-logo-link').attr('href', 'https://www.sliderrevolution.com');
    if (self !== top) jQuery('#cookie-law-info-bar').remove();
    var TPHEADERBG = _TPGC('tp-headerbg'),
      MAIN = _TPGI('main'),
      scroll = 0,
      ticketbox,
      ticketboxdisabled,
      shadowadded,
      topheadercollapsed,
      istemplate = $('body').hasClass('single-templates'),
      inMobileView = $('.tg-mobile-toggle').is(':visible');
    updateHeights();
    checkURLHash();
    function checkMainAndTPHeader() {
      if (typeof tpGS == 'undefined') {
        window.requestAnimationFrame(checkMainAndTPHeader);
        return;
      }
      if (MAIN !== undefined) tpGS.gsap.set(MAIN, { opacity: 1 });
      if (TPHEADERBG !== undefined) tpGS.gsap.set(TPHEADERBG, { opacity: 1 });
    }
    checkMainAndTPHeader();
    window.animateHeaderBars = function () {
      if (istemplate !== !0) {
        if (typeof tpGS == 'undefined') {
          window.requestAnimationFrame(window.animateHeaderBars);
          return;
        }
        if (inMobileView) {
          punchgs.TweenLite.to(['#masthead'], 0.5, { y: 0 });
          if (TPHEADERBG !== undefined) punchgs.TweenLite.to(TPHEADERBG, 0.5, { y: window.headerSizes.a, force3D: !1 });
        } else {
          if (scroll >= 300 && topheadercollapsed !== !0) {
            punchgs.TweenLite.to(['#masthead'], 0.5, { y: -46 });
            if (TPHEADERBG !== undefined)
              punchgs.TweenLite.to(TPHEADERBG, 0.8, { y: window.headerSizes.b, force3D: !1 });
            topheadercollapsed = !0;
          } else if (scroll < 300 && topheadercollapsed !== !1) {
            punchgs.TweenLite.to(['#masthead'], 0.5, { y: 0 });
            if (TPHEADERBG !== undefined)
              punchgs.TweenLite.to(TPHEADERBG, 0.8, { y: window.headerSizes.c, force3D: !1 });
            topheadercollapsed = !1;
          }
        }
      }
    };
    window.animateHeaderBars();
    $(window).resize(function () {
      inMobileView = $('.tg-mobile-toggle').is(':visible');
      updateHeights();
      window.requestAnimationFrame(function () {
        alignFullHandler(5);
      });
      window.animateHeaderBars();
    });
    $(window).scroll(function () {
      scroll = $(window).scrollTop();
      window.animateHeaderBars();
      if (scroll >= 50) {
        if (shadowadded !== !0) {
          $('.tg-site-header-bottom').addClass('tp-menushadow');
          shadowadded = !0;
        }
      } else {
        if (shadowadded !== !1) {
          $('.tg-site-header-bottom').removeClass('tp-menushadow');
          shadowadded = !1;
        }
      }
      if (scroll >= 1000 && ticketboxdisabled !== !0) {
        if (ticketbox !== !0) {
          $('#rs-ticketmodal').addClass('rs-ticketshow');
          ticketbox = !0;
        }
      } else {
        if (ticketbox !== !1) {
          $('#rs-ticketmodal').removeClass('rs-ticketshow');
          ticketbox = !1;
        }
      }
    });
    jQuery('.rs-extendwithstroke').each(function () {
      var del = 100,
        el = jQuery(this);
      if (this.dataset.delay !== undefined) del = parseInt(this.dataset.delay);
      setTimeout(function () {
        el.append(
          '<svg class="rs-stroke" viewBox="0 0 154 13" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M2 2c49.7 2.6 100 3.1 150 1.7-46.5 2-93 4.4-139.2 7.3 45.2-1.5 90.6-1.8 135.8-.6" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path></svg>'
        );
        el[0].style.position = 'relative';
        el[0].style.display = 'inline-block';
      }, del);
    });
    jQuery('.rs-gootator').each(function () {
      var goo_del = 10,
        goo = jQuery(this);
      if (this.dataset.delay !== undefined) goo_del = parseInt(this.dataset.delay);
      setTimeout(function () {
        goo.append(
          '<svg viewBox="0 -200 1500 400" width="100%" height="100%" preserveAspectRatio="xMidYMin slice" class="tp-nicetext" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><defs><linearGradient id="redgoo" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse" ><stop stop-color="#f7345e" offset="0%"/><stop stop-color="#82009f" offset="100%"/></linearGradient><filter id="warp"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -5" result="warp"></feColorMatrix><feComposite in="SourceGraphic" in2="warp" operator="atop"></feComposite></filter></defs><g filter="url(#warp)"><text x="0" y="60" fill="url(#redgoo)">Beautiful</text><text x="0" y="60" fill="url(#redgoo)">Engaging</text><text x="0" y="60" fill="url(#redgoo)">Polished</text><text x="0" y="60" fill="url(#redgoo)">Intuitive</text></g></svg>'
        );
        goo[0].style.position = 'relative';
        goo[0].style.display = 'inline-block';
      }, goo_del);
    });
    $('.rs-chat').click(function (e) {
      window.tidioChatApi.open();
    });
    $('#rs-closemodal').on('click', function (e) {
      $('#rs-ticketmodal, #rs-dashmodal').removeClass('rs-ticketshow');
      ticketbox = !1;
      ticketboxdisabled = !0;
    });
    $("a[href^='#']").on('click', function (e) {
      e.preventDefault();
      if (
        this !== undefined &&
        this.target !== undefined &&
        this.target.hasClass !== undefined &&
        this.target.hasClass('tp-rs-menulink')
      )
        return;
      var e = $(this.hash);
      if (e !== undefined && e.length > 0) scrollTo(e[0].offsetTop);
    });
    function checkURLHash() {
      var hash = window.location.hash.substr(1);
      if (hash !== undefined && hash.length > 0) {
        var e = _TPGI(hash);
        if (e !== undefined && e !== null) scrollTo(e.offsetTop);
      }
    }
    function updateHeights() {
      if (typeof tpGS == 'undefined') {
        window.requestAnimationFrame(updateHeights);
        return;
      }
      if (TPHEADERBG !== undefined) tpGS.gsap.set(TPHEADERBG, { y: 126, force3D: !1 });
    }
    function scrollTo(pos, speed) {
      speed = speed === undefined ? 0.4 : speed;
      tpGS.gsap.to(window, speed, { scrollTo: pos > asOffset ? pos - asOffset : pos, ease: 'power2.inOut' });
    }
  });
})(jQuery);
('use strict');
!(function (e, t) {
  'function' == typeof define && define.amd
    ? define(t)
    : 'object' == typeof exports
    ? (module.exports = t())
    : (e.ResizeSensor = t());
})('undefined' != typeof window ? window : this, function () {
  if ('undefined' == typeof window) return null;
  var e =
      'undefined' != typeof window && window.Math == Math
        ? window
        : 'undefined' != typeof self && self.Math == Math
        ? self
        : Function('return this')(),
    t =
      e.requestAnimationFrame ||
      e.mozRequestAnimationFrame ||
      e.webkitRequestAnimationFrame ||
      function (t) {
        return e.setTimeout(t, 20);
      },
    n =
      e.cancelAnimationFrame ||
      e.mozCancelAnimationFrame ||
      e.webkitCancelAnimationFrame ||
      function (t) {
        e.clearTimeout(t);
      };
  function i(e, t) {
    var n = Object.prototype.toString.call(e),
      i =
        '[object Array]' === n ||
        '[object NodeList]' === n ||
        '[object HTMLCollection]' === n ||
        '[object Object]' === n ||
        ('undefined' != typeof jQuery && e instanceof jQuery) ||
        ('undefined' != typeof Elements && e instanceof Elements),
      o = 0,
      r = e.length;
    if (i) for (; o < r; o++) t(e[o]);
    else t(e);
  }
  function o(e) {
    if (!e.getBoundingClientRect) return { width: e.offsetWidth, height: e.offsetHeight };
    var t = e.getBoundingClientRect();
    return { width: Math.round(t.width), height: Math.round(t.height) };
  }
  function r(e, t) {
    Object.keys(t).forEach(function (n) {
      e.style[n] = t[n];
    });
  }
  var s = function (e, d) {
    var a = 0;
    function c() {
      var e,
        t,
        n = [];
      (this.add = function (e) {
        n.push(e);
      }),
        (this.call = function (i) {
          for (e = 0, t = n.length; e < t; e++) n[e].call(this, i);
        }),
        (this.remove = function (i) {
          var o = [];
          for (e = 0, t = n.length; e < t; e++) n[e] !== i && o.push(n[e]);
          n = o;
        }),
        (this.length = function () {
          return n.length;
        });
    }
    function f(e, n) {
      if (e)
        if (e.resizedAttached) e.resizedAttached.add(n);
        else {
          (e.resizedAttached = new c()),
            e.resizedAttached.add(n),
            (e.resizeSensor = document.createElement('div')),
            (e.resizeSensor.dir = 'ltr'),
            (e.resizeSensor.className = 'resize-sensor');
          var i = {
              pointerEvents: 'none',
              position: 'absolute',
              left: '0px',
              top: '0px',
              right: '0px',
              bottom: '0px',
              overflow: 'hidden',
              zIndex: '-1',
              visibility: 'hidden',
              maxWidth: '100%',
            },
            s = { position: 'absolute', left: '0px', top: '0px', transition: '0s' };
          r(e.resizeSensor, i);
          var d = document.createElement('div');
          (d.className = 'resize-sensor-expand'), r(d, i);
          var f = document.createElement('div');
          r(f, s), d.appendChild(f);
          var h = document.createElement('div');
          (h.className = 'resize-sensor-shrink'), r(h, i);
          var l = document.createElement('div');
          r(l, s),
            r(l, { width: '200%', height: '200%' }),
            h.appendChild(l),
            e.resizeSensor.appendChild(d),
            e.resizeSensor.appendChild(h),
            e.appendChild(e.resizeSensor);
          var u = window.getComputedStyle(e),
            p = u ? u.getPropertyValue('position') : null;
          'absolute' !== p && 'relative' !== p && 'fixed' !== p && 'sticky' !== p && (e.style.position = 'relative');
          var m = !1,
            v = 0,
            z = o(e),
            w = 0,
            g = 0,
            y = !0;
          a = 0;
          var S = function () {
            if (y) {
              if (0 === e.offsetWidth && 0 === e.offsetHeight)
                return void (
                  a ||
                  (a = t(function () {
                    (a = 0), S();
                  }))
                );
              y = !1;
            }
            var n, i;
            (n = e.offsetWidth),
              (i = e.offsetHeight),
              (f.style.width = n + 10 + 'px'),
              (f.style.height = i + 10 + 'px'),
              (d.scrollLeft = n + 10),
              (d.scrollTop = i + 10),
              (h.scrollLeft = n + 10),
              (h.scrollTop = i + 10);
          };
          e.resizeSensor.resetSensor = S;
          var b = function () {
              (v = 0), m && ((w = z.width), (g = z.height), e.resizedAttached && e.resizedAttached.call(z));
            },
            A = function () {
              (z = o(e)), (m = z.width !== w || z.height !== g) && !v && (v = t(b)), S();
            },
            x = function (e, t, n) {
              e.attachEvent ? e.attachEvent('on' + t, n) : e.addEventListener(t, n);
            };
          x(d, 'scroll', A),
            x(h, 'scroll', A),
            (a = t(function () {
              (a = 0), S();
            }));
        }
    }
    i(e, function (e) {
      f(e, d);
    }),
      (this.detach = function (t) {
        a && (n(a), (a = 0)), s.detach(e, t);
      }),
      (this.reset = function () {
        e.resizeSensor.resetSensor && e.resizeSensor.resetSensor();
      });
  };
  if (
    ((s.reset = function (e) {
      i(e, function (t) {
        e.resizeSensor.resetSensor && t.resizeSensor.resetSensor();
      });
    }),
    (s.detach = function (e, t) {
      i(e, function (e) {
        e &&
          ((e.resizedAttached && 'function' == typeof t && (e.resizedAttached.remove(t), e.resizedAttached.length())) ||
            (e.resizeSensor &&
              (e.contains(e.resizeSensor) && e.removeChild(e.resizeSensor),
              delete e.resizeSensor,
              delete e.resizedAttached)));
      });
    }),
    'undefined' != typeof MutationObserver)
  ) {
    var d = new MutationObserver(function (e) {
      for (var t in e)
        if (e.hasOwnProperty(t))
          for (var n = e[t].addedNodes, i = 0; i < n.length; i++) n[i].resizeSensor && s.reset(n[i]);
    });
    document.addEventListener('DOMContentLoaded', function (e) {
      d.observe(document.body, { childList: !0, subtree: !0 });
    });
  }
  return s;
});

/**
 * sticky-sidebar - A JavaScript plugin for making smart and high performance.
 * @version v3.3.1
 * @link https://github.com/abouolia/sticky-sidebar
 * @author Ahmed Bouhuolia
 * @license The MIT License (MIT)
 **/
