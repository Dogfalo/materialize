/*!
 * Materialize v0.100.1 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Check for jQuery.
if (typeof jQuery === 'undefined') {
  var jQuery;
  // Check if require is a defined function.
  if (typeof require === 'function') {
    jQuery = $ = require('jquery');
    // Else use the dollar sign alias.
  } else {
    jQuery = $;
  }
}
; /*
  * jQuery Easing v1.4.0 - http://gsgd.co.uk/sandbox/jquery/easing/
  * Open source under the BSD License.
  * Copyright © 2008 George McGinley Smith
  * All rights reserved.
  * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
  */

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], function ($) {
      return factory($);
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {

  // Preserve the original jQuery "swing" easing as "jswing"
  $.easing['jswing'] = $.easing['swing'];

  var pow = Math.pow,
      sqrt = Math.sqrt,
      sin = Math.sin,
      cos = Math.cos,
      PI = Math.PI,
      c1 = 1.70158,
      c2 = c1 * 1.525,
      c3 = c1 + 1,
      c4 = 2 * PI / 3,
      c5 = 2 * PI / 4.5;

  // x is the fraction of animation progress, in the range 0..1
  function bounceOut(x) {
    var n1 = 7.5625,
        d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + .75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + .9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + .984375;
    }
  }

  $.extend($.easing, {
    def: 'easeOutQuad',
    swing: function (x) {
      return $.easing[$.easing.def](x);
    },
    easeInQuad: function (x) {
      return x * x;
    },
    easeOutQuad: function (x) {
      return 1 - (1 - x) * (1 - x);
    },
    easeInOutQuad: function (x) {
      return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
    },
    easeInCubic: function (x) {
      return x * x * x;
    },
    easeOutCubic: function (x) {
      return 1 - pow(1 - x, 3);
    },
    easeInOutCubic: function (x) {
      return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    },
    easeInQuart: function (x) {
      return x * x * x * x;
    },
    easeOutQuart: function (x) {
      return 1 - pow(1 - x, 4);
    },
    easeInOutQuart: function (x) {
      return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
    },
    easeInQuint: function (x) {
      return x * x * x * x * x;
    },
    easeOutQuint: function (x) {
      return 1 - pow(1 - x, 5);
    },
    easeInOutQuint: function (x) {
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    },
    easeInSine: function (x) {
      return 1 - cos(x * PI / 2);
    },
    easeOutSine: function (x) {
      return sin(x * PI / 2);
    },
    easeInOutSine: function (x) {
      return -(cos(PI * x) - 1) / 2;
    },
    easeInExpo: function (x) {
      return x === 0 ? 0 : pow(2, 10 * x - 10);
    },
    easeOutExpo: function (x) {
      return x === 1 ? 1 : 1 - pow(2, -10 * x);
    },
    easeInOutExpo: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
    },
    easeInCirc: function (x) {
      return 1 - sqrt(1 - pow(x, 2));
    },
    easeOutCirc: function (x) {
      return sqrt(1 - pow(x - 1, 2));
    },
    easeInOutCirc: function (x) {
      return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    },
    easeInElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    },
    easeOutElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    },
    easeInOutElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
    },
    easeInBack: function (x) {
      return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: function (x) {
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    },
    easeInOutBack: function (x) {
      return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeInBounce: function (x) {
      return 1 - bounceOut(1 - x);
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function (x) {
      return x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;
    }
  });
});; // Custom Easing
jQuery.extend(jQuery.easing, {
  easeInOutMaterial: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return c / 4 * ((t -= 2) * t * t + 2) + b;
  }
});; /*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
/*! Note that this has been modified by Materialize to confirm that Velocity is not already being imported. */
jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (!function (e) {
  function t(e) {
    var t = e.length,
        a = r.type(e);return "function" === a || r.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === a || 0 === t || "number" == typeof t && t > 0 && t - 1 in e;
  }if (!e.jQuery) {
    var r = function (e, t) {
      return new r.fn.init(e, t);
    };r.isWindow = function (e) {
      return null != e && e == e.window;
    }, r.type = function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[i.call(e)] || "object" : typeof e;
    }, r.isArray = Array.isArray || function (e) {
      return "array" === r.type(e);
    }, r.isPlainObject = function (e) {
      var t;if (!e || "object" !== r.type(e) || e.nodeType || r.isWindow(e)) return !1;try {
        if (e.constructor && !o.call(e, "constructor") && !o.call(e.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (a) {
        return !1;
      }for (t in e) {}return void 0 === t || o.call(e, t);
    }, r.each = function (e, r, a) {
      var n,
          o = 0,
          i = e.length,
          s = t(e);if (a) {
        if (s) for (; i > o && (n = r.apply(e[o], a), n !== !1); o++) {} else for (o in e) {
          if (n = r.apply(e[o], a), n === !1) break;
        }
      } else if (s) for (; i > o && (n = r.call(e[o], o, e[o]), n !== !1); o++) {} else for (o in e) {
        if (n = r.call(e[o], o, e[o]), n === !1) break;
      }return e;
    }, r.data = function (e, t, n) {
      if (void 0 === n) {
        var o = e[r.expando],
            i = o && a[o];if (void 0 === t) return i;if (i && t in i) return i[t];
      } else if (void 0 !== t) {
        var o = e[r.expando] || (e[r.expando] = ++r.uuid);return a[o] = a[o] || {}, a[o][t] = n, n;
      }
    }, r.removeData = function (e, t) {
      var n = e[r.expando],
          o = n && a[n];o && r.each(t, function (e, t) {
        delete o[t];
      });
    }, r.extend = function () {
      var e,
          t,
          a,
          n,
          o,
          i,
          s = arguments[0] || {},
          l = 1,
          u = arguments.length,
          c = !1;for ("boolean" == typeof s && (c = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" !== r.type(s) && (s = {}), l === u && (s = this, l--); u > l; l++) {
        if (null != (o = arguments[l])) for (n in o) {
          e = s[n], a = o[n], s !== a && (c && a && (r.isPlainObject(a) || (t = r.isArray(a))) ? (t ? (t = !1, i = e && r.isArray(e) ? e : []) : i = e && r.isPlainObject(e) ? e : {}, s[n] = r.extend(c, i, a)) : void 0 !== a && (s[n] = a));
        }
      }return s;
    }, r.queue = function (e, a, n) {
      function o(e, r) {
        var a = r || [];return null != e && (t(Object(e)) ? !function (e, t) {
          for (var r = +t.length, a = 0, n = e.length; r > a;) {
            e[n++] = t[a++];
          }if (r !== r) for (; void 0 !== t[a];) {
            e[n++] = t[a++];
          }return e.length = n, e;
        }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a;
      }if (e) {
        a = (a || "fx") + "queue";var i = r.data(e, a);return n ? (!i || r.isArray(n) ? i = r.data(e, a, o(n)) : i.push(n), i) : i || [];
      }
    }, r.dequeue = function (e, t) {
      r.each(e.nodeType ? [e] : e, function (e, a) {
        t = t || "fx";var n = r.queue(a, t),
            o = n.shift();"inprogress" === o && (o = n.shift()), o && ("fx" === t && n.unshift("inprogress"), o.call(a, function () {
          r.dequeue(a, t);
        }));
      });
    }, r.fn = r.prototype = { init: function (e) {
        if (e.nodeType) return this[0] = e, this;throw new Error("Not a DOM node.");
      }, offset: function () {
        var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };return { top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) };
      }, position: function () {
        function e() {
          for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) {
            e = e.offsetParent;
          }return e || document;
        }var t = this[0],
            e = e.apply(t),
            a = this.offset(),
            n = /^(?:body|html)$/i.test(e.nodeName) ? { top: 0, left: 0 } : r(e).offset();return a.top -= parseFloat(t.style.marginTop) || 0, a.left -= parseFloat(t.style.marginLeft) || 0, e.style && (n.top += parseFloat(e.style.borderTopWidth) || 0, n.left += parseFloat(e.style.borderLeftWidth) || 0), { top: a.top - n.top, left: a.left - n.left };
      } };var a = {};r.expando = "velocity" + new Date().getTime(), r.uuid = 0;for (var n = {}, o = n.hasOwnProperty, i = n.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < s.length; l++) {
      n["[object " + s[l] + "]"] = s[l].toLowerCase();
    }r.fn.init.prototype = r.fn, e.Velocity = { Utilities: r };
  }
}(window), function (e) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e();
}(function () {
  return function (e, t, r, a) {
    function n(e) {
      for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
        var n = e[t];n && a.push(n);
      }return a;
    }function o(e) {
      return m.isWrapped(e) ? e = [].slice.call(e) : m.isNode(e) && (e = [e]), e;
    }function i(e) {
      var t = f.data(e, "velocity");return null === t ? a : t;
    }function s(e) {
      return function (t) {
        return Math.round(t * e) * (1 / e);
      };
    }function l(e, r, a, n) {
      function o(e, t) {
        return 1 - 3 * t + 3 * e;
      }function i(e, t) {
        return 3 * t - 6 * e;
      }function s(e) {
        return 3 * e;
      }function l(e, t, r) {
        return ((o(t, r) * e + i(t, r)) * e + s(t)) * e;
      }function u(e, t, r) {
        return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t);
      }function c(t, r) {
        for (var n = 0; m > n; ++n) {
          var o = u(r, e, a);if (0 === o) return r;var i = l(r, e, a) - t;r -= i / o;
        }return r;
      }function p() {
        for (var t = 0; b > t; ++t) {
          w[t] = l(t * x, e, a);
        }
      }function f(t, r, n) {
        var o,
            i,
            s = 0;do {
          i = r + (n - r) / 2, o = l(i, e, a) - t, o > 0 ? n = i : r = i;
        } while (Math.abs(o) > h && ++s < v);return i;
      }function d(t) {
        for (var r = 0, n = 1, o = b - 1; n != o && w[n] <= t; ++n) {
          r += x;
        }--n;var i = (t - w[n]) / (w[n + 1] - w[n]),
            s = r + i * x,
            l = u(s, e, a);return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x);
      }function g() {
        V = !0, (e != r || a != n) && p();
      }var m = 4,
          y = .001,
          h = 1e-7,
          v = 10,
          b = 11,
          x = 1 / (b - 1),
          S = "Float32Array" in t;if (4 !== arguments.length) return !1;for (var P = 0; 4 > P; ++P) {
        if ("number" != typeof arguments[P] || isNaN(arguments[P]) || !isFinite(arguments[P])) return !1;
      }e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);var w = S ? new Float32Array(b) : new Array(b),
          V = !1,
          C = function (t) {
        return V || g(), e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n);
      };C.getControlPoints = function () {
        return [{ x: e, y: r }, { x: a, y: n }];
      };var T = "generateBezier(" + [e, r, a, n] + ")";return C.toString = function () {
        return T;
      }, C;
    }function u(e, t) {
      var r = e;return m.isString(e) ? b.Easings[e] || (r = !1) : r = m.isArray(e) && 1 === e.length ? s.apply(null, e) : m.isArray(e) && 2 === e.length ? x.apply(null, e.concat([t])) : m.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, r === !1 && (r = b.Easings[b.defaults.easing] ? b.defaults.easing : v), r;
    }function c(e) {
      if (e) {
        var t = new Date().getTime(),
            r = b.State.calls.length;r > 1e4 && (b.State.calls = n(b.State.calls));for (var o = 0; r > o; o++) {
          if (b.State.calls[o]) {
            var s = b.State.calls[o],
                l = s[0],
                u = s[2],
                d = s[3],
                g = !!d,
                y = null;d || (d = b.State.calls[o][3] = t - 16);for (var h = Math.min((t - d) / u.duration, 1), v = 0, x = l.length; x > v; v++) {
              var P = l[v],
                  V = P.element;if (i(V)) {
                var C = !1;if (u.display !== a && null !== u.display && "none" !== u.display) {
                  if ("flex" === u.display) {
                    var T = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];f.each(T, function (e, t) {
                      S.setPropertyValue(V, "display", t);
                    });
                  }S.setPropertyValue(V, "display", u.display);
                }u.visibility !== a && "hidden" !== u.visibility && S.setPropertyValue(V, "visibility", u.visibility);for (var k in P) {
                  if ("element" !== k) {
                    var A,
                        F = P[k],
                        j = m.isString(F.easing) ? b.Easings[F.easing] : F.easing;if (1 === h) A = F.endValue;else {
                      var E = F.endValue - F.startValue;if (A = F.startValue + E * j(h, u, E), !g && A === F.currentValue) continue;
                    }if (F.currentValue = A, "tween" === k) y = A;else {
                      if (S.Hooks.registered[k]) {
                        var H = S.Hooks.getRoot(k),
                            N = i(V).rootPropertyValueCache[H];N && (F.rootPropertyValue = N);
                      }var L = S.setPropertyValue(V, k, F.currentValue + (0 === parseFloat(A) ? "" : F.unitType), F.rootPropertyValue, F.scrollData);S.Hooks.registered[k] && (i(V).rootPropertyValueCache[H] = S.Normalizations.registered[H] ? S.Normalizations.registered[H]("extract", null, L[1]) : L[1]), "transform" === L[0] && (C = !0);
                    }
                  }
                }u.mobileHA && i(V).transformCache.translate3d === a && (i(V).transformCache.translate3d = "(0px, 0px, 0px)", C = !0), C && S.flushTransformCache(V);
              }
            }u.display !== a && "none" !== u.display && (b.State.calls[o][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (b.State.calls[o][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], h, Math.max(0, d + u.duration - t), d, y), 1 === h && p(o);
          }
        }
      }b.State.isTicking && w(c);
    }function p(e, t) {
      if (!b.State.calls[e]) return !1;for (var r = b.State.calls[e][0], n = b.State.calls[e][1], o = b.State.calls[e][2], s = b.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
        var p = r[u].element;if (t || o.loop || ("none" === o.display && S.setPropertyValue(p, "display", o.display), "hidden" === o.visibility && S.setPropertyValue(p, "visibility", o.visibility)), o.loop !== !0 && (f.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test(f.queue(p)[1])) && i(p)) {
          i(p).isAnimating = !1, i(p).rootPropertyValueCache = {};var d = !1;f.each(S.Lists.transforms3D, function (e, t) {
            var r = /^scale/.test(t) ? 1 : 0,
                n = i(p).transformCache[t];i(p).transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (d = !0, delete i(p).transformCache[t]);
          }), o.mobileHA && (d = !0, delete i(p).transformCache.translate3d), d && S.flushTransformCache(p), S.Values.removeClass(p, "velocity-animating");
        }if (!t && o.complete && !o.loop && u === c - 1) try {
          o.complete.call(n, n);
        } catch (g) {
          setTimeout(function () {
            throw g;
          }, 1);
        }s && o.loop !== !0 && s(n), i(p) && o.loop === !0 && !t && (f.each(i(p).tweensContainer, function (e, t) {
          /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100);
        }), b(p, "reverse", { loop: !0, delay: o.delay })), o.queue !== !1 && f.dequeue(p, o.queue);
      }b.State.calls[e] = !1;for (var m = 0, y = b.State.calls.length; y > m; m++) {
        if (b.State.calls[m] !== !1) {
          l = !0;break;
        }
      }l === !1 && (b.State.isTicking = !1, delete b.State.calls, b.State.calls = []);
    }var f,
        d = function () {
      if (r.documentMode) return r.documentMode;for (var e = 7; e > 4; e--) {
        var t = r.createElement("div");if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e;
      }return a;
    }(),
        g = function () {
      var e = 0;return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
        var r,
            a = new Date().getTime();return r = Math.max(0, 16 - (a - e)), e = a + r, setTimeout(function () {
          t(a + r);
        }, r);
      };
    }(),
        m = { isString: function (e) {
        return "string" == typeof e;
      }, isArray: Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      }, isFunction: function (e) {
        return "[object Function]" === Object.prototype.toString.call(e);
      }, isNode: function (e) {
        return e && e.nodeType;
      }, isNodeList: function (e) {
        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0);
      }, isWrapped: function (e) {
        return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e));
      }, isSVG: function (e) {
        return t.SVGElement && e instanceof t.SVGElement;
      }, isEmptyObject: function (e) {
        for (var t in e) {
          return !1;
        }return !0;
      } },
        y = !1;if (e.fn && e.fn.jquery ? (f = e, y = !0) : f = t.Velocity.Utilities, 8 >= d && !y) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if (7 >= d) return void (jQuery.fn.velocity = jQuery.fn.animate);var h = 400,
        v = "swing",
        b = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: t.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: r.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: !1, calls: [] }, CSS: {}, Utilities: f, Redirects: {}, Easings: {}, Promise: t.Promise, defaults: { queue: "", duration: h, easing: v, begin: a, complete: a, progress: a, display: a, visibility: a, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0 }, init: function (e) {
        f.data(e, "velocity", { isSVG: m.isSVG(e), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} });
      }, hook: null, mock: !1, version: { major: 1, minor: 2, patch: 2 }, debug: !1 };t.pageYOffset !== a ? (b.State.scrollAnchor = t, b.State.scrollPropertyLeft = "pageXOffset", b.State.scrollPropertyTop = "pageYOffset") : (b.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, b.State.scrollPropertyLeft = "scrollLeft", b.State.scrollPropertyTop = "scrollTop");var x = function () {
      function e(e) {
        return -e.tension * e.x - e.friction * e.v;
      }function t(t, r, a) {
        var n = { x: t.x + a.dx * r, v: t.v + a.dv * r, tension: t.tension, friction: t.friction };return { dx: n.v, dv: e(n) };
      }function r(r, a) {
        var n = { dx: r.v, dv: e(r) },
            o = t(r, .5 * a, n),
            i = t(r, .5 * a, o),
            s = t(r, a, i),
            l = 1 / 6 * (n.dx + 2 * (o.dx + i.dx) + s.dx),
            u = 1 / 6 * (n.dv + 2 * (o.dv + i.dv) + s.dv);return r.x = r.x + l * a, r.v = r.v + u * a, r;
      }return function a(e, t, n) {
        var o,
            i,
            s,
            l = { x: -1, v: 0, tension: null, friction: null },
            u = [0],
            c = 0,
            p = 1e-4,
            f = .016;for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, n = n || null, l.tension = e, l.friction = t, o = null !== n, o ? (c = a(e, t), i = c / n * f) : i = f; s = r(s || l, i), u.push(1 + s.x), c += 16, Math.abs(s.x) > p && Math.abs(s.v) > p;) {}return o ? function (e) {
          return u[e * (u.length - 1) | 0];
        } : c;
      };
    }();b.Easings = { linear: function (e) {
        return e;
      }, swing: function (e) {
        return .5 - Math.cos(e * Math.PI) / 2;
      }, spring: function (e) {
        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
      } }, f.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (e, t) {
      b.Easings[t[0]] = l.apply(null, t[1]);
    });var S = b.CSS = { RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi }, Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"] }, Hooks: { templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] }, registered: {}, register: function () {
          for (var e = 0; e < S.Lists.colors.length; e++) {
            var t = "color" === S.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";S.Hooks.templates[S.Lists.colors[e]] = ["Red Green Blue Alpha", t];
          }var r, a, n;if (d) for (r in S.Hooks.templates) {
            a = S.Hooks.templates[r], n = a[0].split(" ");var o = a[1].match(S.RegEx.valueSplit);"Color" === n[0] && (n.push(n.shift()), o.push(o.shift()), S.Hooks.templates[r] = [n.join(" "), o.join(" ")]);
          }for (r in S.Hooks.templates) {
            a = S.Hooks.templates[r], n = a[0].split(" ");for (var e in n) {
              var i = r + n[e],
                  s = e;S.Hooks.registered[i] = [r, s];
            }
          }
        }, getRoot: function (e) {
          var t = S.Hooks.registered[e];return t ? t[0] : e;
        }, cleanRootPropertyValue: function (e, t) {
          return S.RegEx.valueUnwrap.test(t) && (t = t.match(S.RegEx.valueUnwrap)[1]), S.Values.isCSSNullValue(t) && (t = S.Hooks.templates[e][1]), t;
        }, extractValue: function (e, t) {
          var r = S.Hooks.registered[e];if (r) {
            var a = r[0],
                n = r[1];return t = S.Hooks.cleanRootPropertyValue(a, t), t.toString().match(S.RegEx.valueSplit)[n];
          }return t;
        }, injectValue: function (e, t, r) {
          var a = S.Hooks.registered[e];if (a) {
            var n,
                o,
                i = a[0],
                s = a[1];return r = S.Hooks.cleanRootPropertyValue(i, r), n = r.toString().match(S.RegEx.valueSplit), n[s] = t, o = n.join(" ");
          }return r;
        } }, Normalizations: { registered: { clip: function (e, t, r) {
            switch (e) {case "name":
                return "clip";case "extract":
                var a;return S.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(S.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;case "inject":
                return "rect(" + r + ")";}
          }, blur: function (e, t, r) {
            switch (e) {case "name":
                return b.State.isFirefox ? "filter" : "-webkit-filter";case "extract":
                var a = parseFloat(r);if (!a && 0 !== a) {
                  var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a = n ? n[1] : 0;
                }return a;case "inject":
                return parseFloat(r) ? "blur(" + r + ")" : "none";}
          }, opacity: function (e, t, r) {
            if (8 >= d) switch (e) {case "name":
                return "filter";case "extract":
                var a = r.toString().match(/alpha\(opacity=(.*)\)/i);return r = a ? a[1] / 100 : 1;case "inject":
                return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")";} else switch (e) {case "name":
                return "opacity";case "extract":
                return r;case "inject":
                return r;}
          } }, register: function () {
          9 >= d || b.State.isGingerbread || (S.Lists.transformsBase = S.Lists.transformsBase.concat(S.Lists.transforms3D));for (var e = 0; e < S.Lists.transformsBase.length; e++) {
            !function () {
              var t = S.Lists.transformsBase[e];S.Normalizations.registered[t] = function (e, r, n) {
                switch (e) {case "name":
                    return "transform";case "extract":
                    return i(r) === a || i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");case "inject":
                    var o = !1;switch (t.substr(0, t.length - 1)) {case "translate":
                        o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case "scal":case "scale":
                        b.State.isAndroid && i(r).transformCache[t] === a && 1 > n && (n = 1), o = !/(\d)$/i.test(n);break;case "skew":
                        o = !/(deg|\d)$/i.test(n);break;case "rotate":
                        o = !/(deg|\d)$/i.test(n);}return o || (i(r).transformCache[t] = "(" + n + ")"), i(r).transformCache[t];}
              };
            }();
          }for (var e = 0; e < S.Lists.colors.length; e++) {
            !function () {
              var t = S.Lists.colors[e];S.Normalizations.registered[t] = function (e, r, n) {
                switch (e) {case "name":
                    return t;case "extract":
                    var o;if (S.RegEx.wrappedValueAlreadyExtracted.test(n)) o = n;else {
                      var i,
                          s = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };/^[A-z]+$/i.test(n) ? i = s[n] !== a ? s[n] : s.black : S.RegEx.isHex.test(n) ? i = "rgb(" + S.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (i = s.black), o = (i || n).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                    }return 8 >= d || 3 !== o.split(" ").length || (o += " 1"), o;case "inject":
                    return 8 >= d ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";}
              };
            }();
          }
        } }, Names: { camelCase: function (e) {
          return e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase();
          });
        }, SVGAttribute: function (e) {
          var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return (d || b.State.isAndroid && !b.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e);
        }, prefixCheck: function (e) {
          if (b.State.prefixMatches[e]) return [b.State.prefixMatches[e], !0];for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
            var n;if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
              return e.toUpperCase();
            }), m.isString(b.State.prefixElement.style[n])) return b.State.prefixMatches[e] = n, [n, !0];
          }return [e, !1];
        } }, Values: { hexToRgb: function (e) {
          var t,
              r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e = e.replace(r, function (e, t, r, a) {
            return t + t + r + r + a + a;
          }), t = a.exec(e), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0];
        }, isCSSNullValue: function (e) {
          return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e);
        }, getUnitType: function (e) {
          return (/^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
          );
        }, getDisplayType: function (e) {
          var t = e && e.tagName.toString().toLowerCase();return (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
          );
        }, addClass: function (e, t) {
          e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t;
        }, removeClass: function (e, t) {
          e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ");
        } }, getPropertyValue: function (e, r, n, o) {
        function s(e, r) {
          function n() {
            u && S.setPropertyValue(e, "display", "none");
          }var l = 0;if (8 >= d) l = f.css(e, r);else {
            var u = !1;if (/^(width|height)$/.test(r) && 0 === S.getPropertyValue(e, "display") && (u = !0, S.setPropertyValue(e, "display", S.Values.getDisplayType(e))), !o) {
              if ("height" === r && "border-box" !== S.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var c = e.offsetHeight - (parseFloat(S.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingBottom")) || 0);return n(), c;
              }if ("width" === r && "border-box" !== S.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var p = e.offsetWidth - (parseFloat(S.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingRight")) || 0);return n(), p;
              }
            }var g;g = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), l = 9 === d && "filter" === r ? g.getPropertyValue(r) : g[r], ("" === l || null === l) && (l = e.style[r]), n();
          }if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
            var m = s(e, "position");("fixed" === m || "absolute" === m && /top|left/i.test(r)) && (l = f(e).position()[r] + "px");
          }return l;
        }var l;if (S.Hooks.registered[r]) {
          var u = r,
              c = S.Hooks.getRoot(u);n === a && (n = S.getPropertyValue(e, S.Names.prefixCheck(c)[0])), S.Normalizations.registered[c] && (n = S.Normalizations.registered[c]("extract", e, n)), l = S.Hooks.extractValue(u, n);
        } else if (S.Normalizations.registered[r]) {
          var p, g;p = S.Normalizations.registered[r]("name", e), "transform" !== p && (g = s(e, S.Names.prefixCheck(p)[0]), S.Values.isCSSNullValue(g) && S.Hooks.templates[r] && (g = S.Hooks.templates[r][1])), l = S.Normalizations.registered[r]("extract", e, g);
        }if (!/^[\d-]/.test(l)) if (i(e) && i(e).isSVG && S.Names.SVGAttribute(r)) {
          if (/^(height|width)$/i.test(r)) try {
            l = e.getBBox()[r];
          } catch (m) {
            l = 0;
          } else l = e.getAttribute(r);
        } else l = s(e, S.Names.prefixCheck(r)[0]);return S.Values.isCSSNullValue(l) && (l = 0), b.debug >= 2 && console.log("Get " + r + ": " + l), l;
      }, setPropertyValue: function (e, r, a, n, o) {
        var s = r;if ("scroll" === r) o.container ? o.container["scroll" + o.direction] = a : "Left" === o.direction ? t.scrollTo(a, o.alternateValue) : t.scrollTo(o.alternateValue, a);else if (S.Normalizations.registered[r] && "transform" === S.Normalizations.registered[r]("name", e)) S.Normalizations.registered[r]("inject", e, a), s = "transform", a = i(e).transformCache[r];else {
          if (S.Hooks.registered[r]) {
            var l = r,
                u = S.Hooks.getRoot(r);n = n || S.getPropertyValue(e, u), a = S.Hooks.injectValue(l, a, n), r = u;
          }if (S.Normalizations.registered[r] && (a = S.Normalizations.registered[r]("inject", e, a), r = S.Normalizations.registered[r]("name", e)), s = S.Names.prefixCheck(r)[0], 8 >= d) try {
            e.style[s] = a;
          } catch (c) {
            b.debug && console.log("Browser does not support [" + a + "] for [" + s + "]");
          } else i(e) && i(e).isSVG && S.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;b.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a);
        }return [s, a];
      }, flushTransformCache: function (e) {
        function t(t) {
          return parseFloat(S.getPropertyValue(e, t));
        }var r = "";if ((d || b.State.isAndroid && !b.State.isChrome) && i(e).isSVG) {
          var a = { translate: [t("translateX"), t("translateY")], skewX: [t("skewX")], skewY: [t("skewY")], scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")], rotate: [t("rotateZ"), 0, 0] };f.each(i(e).transformCache, function (e) {
            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e]);
          });
        } else {
          var n, o;f.each(i(e).transformCache, function (t) {
            return n = i(e).transformCache[t], "transformPerspective" === t ? (o = n, !0) : (9 === d && "rotateZ" === t && (t = "rotate"), void (r += t + n + " "));
          }), o && (r = "perspective" + o + " " + r);
        }S.setPropertyValue(e, "transform", r);
      } };S.Hooks.register(), S.Normalizations.register(), b.hook = function (e, t, r) {
      var n = a;return e = o(e), f.each(e, function (e, o) {
        if (i(o) === a && b.init(o), r === a) n === a && (n = b.CSS.getPropertyValue(o, t));else {
          var s = b.CSS.setPropertyValue(o, t, r);"transform" === s[0] && b.CSS.flushTransformCache(o), n = s;
        }
      }), n;
    };var P = function () {
      function e() {
        return s ? k.promise || null : l;
      }function n() {
        function e(e) {
          function p(e, t) {
            var r = a,
                n = a,
                i = a;return m.isArray(e) ? (r = e[0], !m.isArray(e[1]) && /^[\d-]/.test(e[1]) || m.isFunction(e[1]) || S.RegEx.isHex.test(e[1]) ? i = e[1] : (m.isString(e[1]) && !S.RegEx.isHex.test(e[1]) || m.isArray(e[1])) && (n = t ? e[1] : u(e[1], s.duration), e[2] !== a && (i = e[2]))) : r = e, t || (n = n || s.easing), m.isFunction(r) && (r = r.call(o, V, w)), m.isFunction(i) && (i = i.call(o, V, w)), [r || 0, n, i];
          }function d(e, t) {
            var r, a;return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
              return r = e, "";
            }), r || (r = S.Values.getUnitType(e)), [a, r];
          }function h() {
            var e = { myParent: o.parentNode || r.body, position: S.getPropertyValue(o, "position"), fontSize: S.getPropertyValue(o, "fontSize") },
                a = e.position === L.lastPosition && e.myParent === L.lastParent,
                n = e.fontSize === L.lastFontSize;L.lastParent = e.myParent, L.lastPosition = e.position, L.lastFontSize = e.fontSize;var s = 100,
                l = {};if (n && a) l.emToPx = L.lastEmToPx, l.percentToPxWidth = L.lastPercentToPxWidth, l.percentToPxHeight = L.lastPercentToPxHeight;else {
              var u = i(o).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");b.init(u), e.myParent.appendChild(u), f.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                b.CSS.setPropertyValue(u, t, "hidden");
              }), b.CSS.setPropertyValue(u, "position", e.position), b.CSS.setPropertyValue(u, "fontSize", e.fontSize), b.CSS.setPropertyValue(u, "boxSizing", "content-box"), f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                b.CSS.setPropertyValue(u, t, s + "%");
              }), b.CSS.setPropertyValue(u, "paddingLeft", s + "em"), l.percentToPxWidth = L.lastPercentToPxWidth = (parseFloat(S.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = L.lastPercentToPxHeight = (parseFloat(S.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = L.lastEmToPx = (parseFloat(S.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u);
            }return null === L.remToPx && (L.remToPx = parseFloat(S.getPropertyValue(r.body, "fontSize")) || 16), null === L.vwToPx && (L.vwToPx = parseFloat(t.innerWidth) / 100, L.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = L.remToPx, l.vwToPx = L.vwToPx, l.vhToPx = L.vhToPx, b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), o), l;
          }if (s.begin && 0 === V) try {
            s.begin.call(g, g);
          } catch (x) {
            setTimeout(function () {
              throw x;
            }, 1);
          }if ("scroll" === A) {
            var P,
                C,
                T,
                F = /^x$/i.test(s.axis) ? "Left" : "Top",
                j = parseFloat(s.offset) || 0;s.container ? m.isWrapped(s.container) || m.isNode(s.container) ? (s.container = s.container[0] || s.container, P = s.container["scroll" + F], T = P + f(o).position()[F.toLowerCase()] + j) : s.container = null : (P = b.State.scrollAnchor[b.State["scrollProperty" + F]], C = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === F ? "Top" : "Left")]], T = f(o).offset()[F.toLowerCase()] + j), l = { scroll: { rootPropertyValue: !1, startValue: P, currentValue: P, endValue: T, unitType: "", easing: s.easing, scrollData: { container: s.container, direction: F, alternateValue: C } }, element: o }, b.debug && console.log("tweensContainer (scroll): ", l.scroll, o);
          } else if ("reverse" === A) {
            if (!i(o).tweensContainer) return void f.dequeue(o, s.queue);"none" === i(o).opts.display && (i(o).opts.display = "auto"), "hidden" === i(o).opts.visibility && (i(o).opts.visibility = "visible"), i(o).opts.loop = !1, i(o).opts.begin = null, i(o).opts.complete = null, v.easing || delete s.easing, v.duration || delete s.duration, s = f.extend({}, i(o).opts, s);var E = f.extend(!0, {}, i(o).tweensContainer);for (var H in E) {
              if ("element" !== H) {
                var N = E[H].startValue;E[H].startValue = E[H].currentValue = E[H].endValue, E[H].endValue = N, m.isEmptyObject(v) || (E[H].easing = s.easing), b.debug && console.log("reverse tweensContainer (" + H + "): " + JSON.stringify(E[H]), o);
              }
            }l = E;
          } else if ("start" === A) {
            var E;i(o).tweensContainer && i(o).isAnimating === !0 && (E = i(o).tweensContainer), f.each(y, function (e, t) {
              if (RegExp("^" + S.Lists.colors.join("$|^") + "$").test(e)) {
                var r = p(t, !0),
                    n = r[0],
                    o = r[1],
                    i = r[2];if (S.RegEx.isHex.test(n)) {
                  for (var s = ["Red", "Green", "Blue"], l = S.Values.hexToRgb(n), u = i ? S.Values.hexToRgb(i) : a, c = 0; c < s.length; c++) {
                    var f = [l[c]];o && f.push(o), u !== a && f.push(u[c]), y[e + s[c]] = f;
                  }delete y[e];
                }
              }
            });for (var z in y) {
              var O = p(y[z]),
                  q = O[0],
                  $ = O[1],
                  M = O[2];z = S.Names.camelCase(z);var I = S.Hooks.getRoot(z),
                  B = !1;if (i(o).isSVG || "tween" === I || S.Names.prefixCheck(I)[1] !== !1 || S.Normalizations.registered[I] !== a) {
                (s.display !== a && null !== s.display && "none" !== s.display || s.visibility !== a && "hidden" !== s.visibility) && /opacity|filter/.test(z) && !M && 0 !== q && (M = 0), s._cacheValues && E && E[z] ? (M === a && (M = E[z].endValue + E[z].unitType), B = i(o).rootPropertyValueCache[I]) : S.Hooks.registered[z] ? M === a ? (B = S.getPropertyValue(o, I), M = S.getPropertyValue(o, z, B)) : B = S.Hooks.templates[I][1] : M === a && (M = S.getPropertyValue(o, z));var W,
                    G,
                    Y,
                    D = !1;if (W = d(z, M), M = W[0], Y = W[1], W = d(z, q), q = W[0].replace(/^([+-\/*])=/, function (e, t) {
                  return D = t, "";
                }), G = W[1], M = parseFloat(M) || 0, q = parseFloat(q) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(z) ? (q /= 100, G = "em") : /^scale/.test(z) ? (q /= 100, G = "") : /(Red|Green|Blue)$/i.test(z) && (q = q / 100 * 255, G = "")), /[\/*]/.test(D)) G = Y;else if (Y !== G && 0 !== M) if (0 === q) G = Y;else {
                  n = n || h();var Q = /margin|padding|left|right|width|text|word|letter/i.test(z) || /X$/.test(z) || "x" === z ? "x" : "y";switch (Y) {case "%":
                      M *= "x" === Q ? n.percentToPxWidth : n.percentToPxHeight;break;case "px":
                      break;default:
                      M *= n[Y + "ToPx"];}switch (G) {case "%":
                      M *= 1 / ("x" === Q ? n.percentToPxWidth : n.percentToPxHeight);break;case "px":
                      break;default:
                      M *= 1 / n[G + "ToPx"];}
                }switch (D) {case "+":
                    q = M + q;break;case "-":
                    q = M - q;break;case "*":
                    q = M * q;break;case "/":
                    q = M / q;}l[z] = { rootPropertyValue: B, startValue: M, currentValue: M, endValue: q, unitType: G, easing: $ }, b.debug && console.log("tweensContainer (" + z + "): " + JSON.stringify(l[z]), o);
              } else b.debug && console.log("Skipping [" + I + "] due to a lack of browser support.");
            }l.element = o;
          }l.element && (S.Values.addClass(o, "velocity-animating"), R.push(l), "" === s.queue && (i(o).tweensContainer = l, i(o).opts = s), i(o).isAnimating = !0, V === w - 1 ? (b.State.calls.push([R, g, s, null, k.resolver]), b.State.isTicking === !1 && (b.State.isTicking = !0, c())) : V++);
        }var n,
            o = this,
            s = f.extend({}, b.defaults, v),
            l = {};switch (i(o) === a && b.init(o), parseFloat(s.delay) && s.queue !== !1 && f.queue(o, s.queue, function (e) {
          b.velocityQueueEntryFlag = !0, i(o).delayTimer = { setTimeout: setTimeout(e, parseFloat(s.delay)), next: e };
        }), s.duration.toString().toLowerCase()) {case "fast":
            s.duration = 200;break;case "normal":
            s.duration = h;break;case "slow":
            s.duration = 600;break;default:
            s.duration = parseFloat(s.duration) || 1;}b.mock !== !1 && (b.mock === !0 ? s.duration = s.delay = 1 : (s.duration *= parseFloat(b.mock) || 1, s.delay *= parseFloat(b.mock) || 1)), s.easing = u(s.easing, s.duration), s.begin && !m.isFunction(s.begin) && (s.begin = null), s.progress && !m.isFunction(s.progress) && (s.progress = null), s.complete && !m.isFunction(s.complete) && (s.complete = null), s.display !== a && null !== s.display && (s.display = s.display.toString().toLowerCase(), "auto" === s.display && (s.display = b.CSS.Values.getDisplayType(o))), s.visibility !== a && null !== s.visibility && (s.visibility = s.visibility.toString().toLowerCase()), s.mobileHA = s.mobileHA && b.State.isMobile && !b.State.isGingerbread, s.queue === !1 ? s.delay ? setTimeout(e, s.delay) : e() : f.queue(o, s.queue, function (t, r) {
          return r === !0 ? (k.promise && k.resolver(g), !0) : (b.velocityQueueEntryFlag = !0, void e(t));
        }), "" !== s.queue && "fx" !== s.queue || "inprogress" === f.queue(o)[0] || f.dequeue(o);
      }var s,
          l,
          d,
          g,
          y,
          v,
          x = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || m.isString(arguments[0].properties));if (m.isWrapped(this) ? (s = !1, d = 0, g = this, l = this) : (s = !0, d = 1, g = x ? arguments[0].elements || arguments[0].e : arguments[0]), g = o(g)) {
        x ? (y = arguments[0].properties || arguments[0].p, v = arguments[0].options || arguments[0].o) : (y = arguments[d], v = arguments[d + 1]);var w = g.length,
            V = 0;if (!/^(stop|finish)$/i.test(y) && !f.isPlainObject(v)) {
          var C = d + 1;v = {};for (var T = C; T < arguments.length; T++) {
            m.isArray(arguments[T]) || !/^(fast|normal|slow)$/i.test(arguments[T]) && !/^\d/.test(arguments[T]) ? m.isString(arguments[T]) || m.isArray(arguments[T]) ? v.easing = arguments[T] : m.isFunction(arguments[T]) && (v.complete = arguments[T]) : v.duration = arguments[T];
          }
        }var k = { promise: null, resolver: null, rejecter: null };s && b.Promise && (k.promise = new b.Promise(function (e, t) {
          k.resolver = e, k.rejecter = t;
        }));var A;switch (y) {case "scroll":
            A = "scroll";break;case "reverse":
            A = "reverse";break;case "finish":case "stop":
            f.each(g, function (e, t) {
              i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout), i(t).delayTimer.next && i(t).delayTimer.next(), delete i(t).delayTimer);
            });var F = [];return f.each(b.State.calls, function (e, t) {
              t && f.each(t[1], function (r, n) {
                var o = v === a ? "" : v;return o === !0 || t[2].queue === o || v === a && t[2].queue === !1 ? void f.each(g, function (r, a) {
                  a === n && ((v === !0 || m.isString(v)) && (f.each(f.queue(a, m.isString(v) ? v : ""), function (e, t) {
                    m.isFunction(t) && t(null, !0);
                  }), f.queue(a, m.isString(v) ? v : "", [])), "stop" === y ? (i(a) && i(a).tweensContainer && o !== !1 && f.each(i(a).tweensContainer, function (e, t) {
                    t.endValue = t.currentValue;
                  }), F.push(e)) : "finish" === y && (t[2].duration = 1));
                }) : !0;
              });
            }), "stop" === y && (f.each(F, function (e, t) {
              p(t, !0);
            }), k.promise && k.resolver(g)), e();default:
            if (!f.isPlainObject(y) || m.isEmptyObject(y)) {
              if (m.isString(y) && b.Redirects[y]) {
                var j = f.extend({}, v),
                    E = j.duration,
                    H = j.delay || 0;return j.backwards === !0 && (g = f.extend(!0, [], g).reverse()), f.each(g, function (e, t) {
                  parseFloat(j.stagger) ? j.delay = H + parseFloat(j.stagger) * e : m.isFunction(j.stagger) && (j.delay = H + j.stagger.call(t, e, w)), j.drag && (j.duration = parseFloat(E) || (/^(callout|transition)/.test(y) ? 1e3 : h), j.duration = Math.max(j.duration * (j.backwards ? 1 - e / w : (e + 1) / w), .75 * j.duration, 200)), b.Redirects[y].call(t, t, j || {}, e, w, g, k.promise ? k : a);
                }), e();
              }var N = "Velocity: First argument (" + y + ") was not a property map, a known action, or a registered redirect. Aborting.";return k.promise ? k.rejecter(new Error(N)) : console.log(N), e();
            }A = "start";}var L = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
            R = [];f.each(g, function (e, t) {
          m.isNode(t) && n.call(t);
        });var z,
            j = f.extend({}, b.defaults, v);if (j.loop = parseInt(j.loop), z = 2 * j.loop - 1, j.loop) for (var O = 0; z > O; O++) {
          var q = { delay: j.delay, progress: j.progress };O === z - 1 && (q.display = j.display, q.visibility = j.visibility, q.complete = j.complete), P(g, "reverse", q);
        }return e();
      }
    };b = f.extend(P, b), b.animate = P;var w = t.requestAnimationFrame || g;return b.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function () {
      r.hidden ? (w = function (e) {
        return setTimeout(function () {
          e(!0);
        }, 16);
      }, c()) : w = t.requestAnimationFrame || g;
    }), e.Velocity = b, e !== t && (e.fn.velocity = P, e.fn.velocity.defaults = b.defaults), f.each(["Down", "Up"], function (e, t) {
      b.Redirects["slide" + t] = function (e, r, n, o, i, s) {
        var l = f.extend({}, r),
            u = l.begin,
            c = l.complete,
            p = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
            d = {};l.display === a && (l.display = "Down" === t ? "inline" === b.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function () {
          u && u.call(i, i);for (var r in p) {
            d[r] = e.style[r];var a = b.CSS.getPropertyValue(e, r);p[r] = "Down" === t ? [a, 0] : [0, a];
          }d.overflow = e.style.overflow, e.style.overflow = "hidden";
        }, l.complete = function () {
          for (var t in d) {
            e.style[t] = d[t];
          }c && c.call(i, i), s && s.resolver(i);
        }, b(e, p, l);
      };
    }), f.each(["In", "Out"], function (e, t) {
      b.Redirects["fade" + t] = function (e, r, n, o, i, s) {
        var l = f.extend({}, r),
            u = { opacity: "In" === t ? 1 : 0 },
            c = l.complete;l.complete = n !== o - 1 ? l.begin = null : function () {
          c && c.call(i, i), s && s.resolver(i);
        }, l.display === a && (l.display = "In" === t ? "auto" : "none"), b(this, u, l);
      };
    }), b;
  }(window.jQuery || window.Zepto || window, window, document);
}));
;!function (a, b, c, d) {
  "use strict";
  function k(a, b, c) {
    return setTimeout(q(a, c), b);
  }function l(a, b, c) {
    return Array.isArray(a) ? (m(a, c[b], c), !0) : !1;
  }function m(a, b, c) {
    var e;if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) {
      b.call(c, a[e], e, a), e++;
    } else for (e in a) {
      a.hasOwnProperty(e) && b.call(c, a[e], e, a);
    }
  }function n(a, b, c) {
    for (var e = Object.keys(b), f = 0; f < e.length;) {
      (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
    }return a;
  }function o(a, b) {
    return n(a, b, !0);
  }function p(a, b, c) {
    var e,
        d = b.prototype;e = a.prototype = Object.create(d), e.constructor = a, e._super = d, c && n(e, c);
  }function q(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }function r(a, b) {
    return typeof a == g ? a.apply(b ? b[0] || d : d, b) : a;
  }function s(a, b) {
    return a === d ? b : a;
  }function t(a, b, c) {
    m(x(b), function (b) {
      a.addEventListener(b, c, !1);
    });
  }function u(a, b, c) {
    m(x(b), function (b) {
      a.removeEventListener(b, c, !1);
    });
  }function v(a, b) {
    for (; a;) {
      if (a == b) return !0;a = a.parentNode;
    }return !1;
  }function w(a, b) {
    return a.indexOf(b) > -1;
  }function x(a) {
    return a.trim().split(/\s+/g);
  }function y(a, b, c) {
    if (a.indexOf && !c) return a.indexOf(b);for (var d = 0; d < a.length;) {
      if (c && a[d][c] == b || !c && a[d] === b) return d;d++;
    }return -1;
  }function z(a) {
    return Array.prototype.slice.call(a, 0);
  }function A(a, b, c) {
    for (var d = [], e = [], f = 0; f < a.length;) {
      var g = b ? a[f][b] : a[f];y(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
    }return c && (d = b ? d.sort(function (a, c) {
      return a[b] > c[b];
    }) : d.sort()), d;
  }function B(a, b) {
    for (var c, f, g = b[0].toUpperCase() + b.slice(1), h = 0; h < e.length;) {
      if (c = e[h], f = c ? c + g : b, f in a) return f;h++;
    }return d;
  }function D() {
    return C++;
  }function E(a) {
    var b = a.ownerDocument;return b.defaultView || b.parentWindow;
  }function ab(a, b) {
    var c = this;this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
      r(a.options.enable, [a]) && c.handler(b);
    }, this.init();
  }function bb(a) {
    var b,
        c = a.options.inputClass;return b = c ? c : H ? wb : I ? Eb : G ? Gb : rb, new b(a, cb);
  }function cb(a, b, c) {
    var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & O && 0 === d - e,
        g = b & (Q | R) && 0 === d - e;c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, db(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
  }function db(a, b) {
    var c = a.session,
        d = b.pointers,
        e = d.length;c.firstInput || (c.firstInput = gb(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = gb(b) : 1 === e && (c.firstMultiple = !1);var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center : f.center,
        i = b.center = hb(d);b.timeStamp = j(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = lb(h, i), b.distance = kb(h, i), eb(c, b), b.offsetDirection = jb(b.deltaX, b.deltaY), b.scale = g ? nb(g.pointers, d) : 1, b.rotation = g ? mb(g.pointers, d) : 0, fb(c, b);var k = a.element;v(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
  }function eb(a, b) {
    var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};(b.eventType === O || f.eventType === Q) && (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
  }function fb(a, b) {
    var f,
        g,
        h,
        j,
        c = a.lastInterval || b,
        e = b.timeStamp - c.timeStamp;if (b.eventType != R && (e > N || c.velocity === d)) {
      var k = c.deltaX - b.deltaX,
          l = c.deltaY - b.deltaY,
          m = ib(e, k, l);g = m.x, h = m.y, f = i(m.x) > i(m.y) ? m.x : m.y, j = jb(k, l), a.lastInterval = b;
    } else f = c.velocity, g = c.velocityX, h = c.velocityY, j = c.direction;b.velocity = f, b.velocityX = g, b.velocityY = h, b.direction = j;
  }function gb(a) {
    for (var b = [], c = 0; c < a.pointers.length;) {
      b[c] = { clientX: h(a.pointers[c].clientX), clientY: h(a.pointers[c].clientY) }, c++;
    }return { timeStamp: j(), pointers: b, center: hb(b), deltaX: a.deltaX, deltaY: a.deltaY };
  }function hb(a) {
    var b = a.length;if (1 === b) return { x: h(a[0].clientX), y: h(a[0].clientY) };for (var c = 0, d = 0, e = 0; b > e;) {
      c += a[e].clientX, d += a[e].clientY, e++;
    }return { x: h(c / b), y: h(d / b) };
  }function ib(a, b, c) {
    return { x: b / a || 0, y: c / a || 0 };
  }function jb(a, b) {
    return a === b ? S : i(a) >= i(b) ? a > 0 ? T : U : b > 0 ? V : W;
  }function kb(a, b, c) {
    c || (c = $);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return Math.sqrt(d * d + e * e);
  }function lb(a, b, c) {
    c || (c = $);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return 180 * Math.atan2(e, d) / Math.PI;
  }function mb(a, b) {
    return lb(b[1], b[0], _) - lb(a[1], a[0], _);
  }function nb(a, b) {
    return kb(b[0], b[1], _) / kb(a[0], a[1], _);
  }function rb() {
    this.evEl = pb, this.evWin = qb, this.allow = !0, this.pressed = !1, ab.apply(this, arguments);
  }function wb() {
    this.evEl = ub, this.evWin = vb, ab.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }function Ab() {
    this.evTarget = yb, this.evWin = zb, this.started = !1, ab.apply(this, arguments);
  }function Bb(a, b) {
    var c = z(a.touches),
        d = z(a.changedTouches);return b & (Q | R) && (c = A(c.concat(d), "identifier", !0)), [c, d];
  }function Eb() {
    this.evTarget = Db, this.targetIds = {}, ab.apply(this, arguments);
  }function Fb(a, b) {
    var c = z(a.touches),
        d = this.targetIds;if (b & (O | P) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];var e,
        f,
        g = z(a.changedTouches),
        h = [],
        i = this.target;if (f = c.filter(function (a) {
      return v(a.target, i);
    }), b === O) for (e = 0; e < f.length;) {
      d[f[e].identifier] = !0, e++;
    }for (e = 0; e < g.length;) {
      d[g[e].identifier] && h.push(g[e]), b & (Q | R) && delete d[g[e].identifier], e++;
    }return h.length ? [A(f.concat(h), "identifier", !0), h] : void 0;
  }function Gb() {
    ab.apply(this, arguments);var a = q(this.handler, this);this.touch = new Eb(this.manager, a), this.mouse = new rb(this.manager, a);
  }function Pb(a, b) {
    this.manager = a, this.set(b);
  }function Qb(a) {
    if (w(a, Mb)) return Mb;var b = w(a, Nb),
        c = w(a, Ob);return b && c ? Nb + " " + Ob : b || c ? b ? Nb : Ob : w(a, Lb) ? Lb : Kb;
  }function Yb(a) {
    this.id = D(), this.manager = null, this.options = o(a || {}, this.defaults), this.options.enable = s(this.options.enable, !0), this.state = Rb, this.simultaneous = {}, this.requireFail = [];
  }function Zb(a) {
    return a & Wb ? "cancel" : a & Ub ? "end" : a & Tb ? "move" : a & Sb ? "start" : "";
  }function $b(a) {
    return a == W ? "down" : a == V ? "up" : a == T ? "left" : a == U ? "right" : "";
  }function _b(a, b) {
    var c = b.manager;return c ? c.get(a) : a;
  }function ac() {
    Yb.apply(this, arguments);
  }function bc() {
    ac.apply(this, arguments), this.pX = null, this.pY = null;
  }function cc() {
    ac.apply(this, arguments);
  }function dc() {
    Yb.apply(this, arguments), this._timer = null, this._input = null;
  }function ec() {
    ac.apply(this, arguments);
  }function fc() {
    ac.apply(this, arguments);
  }function gc() {
    Yb.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
  }function hc(a, b) {
    return b = b || {}, b.recognizers = s(b.recognizers, hc.defaults.preset), new kc(a, b);
  }function kc(a, b) {
    b = b || {}, this.options = o(b, hc.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = bb(this), this.touchAction = new Pb(this, this.options.touchAction), lc(this, !0), m(b.recognizers, function (a) {
      var b = this.add(new a[0](a[1]));a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
    }, this);
  }function lc(a, b) {
    var c = a.element;m(a.options.cssProps, function (a, d) {
      c.style[B(c.style, d)] = b ? a : "";
    });
  }function mc(a, c) {
    var d = b.createEvent("Event");d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
  }var e = ["", "webkit", "moz", "MS", "ms", "o"],
      f = b.createElement("div"),
      g = "function",
      h = Math.round,
      i = Math.abs,
      j = Date.now,
      C = 1,
      F = /mobile|tablet|ip(ad|hone|od)|android/i,
      G = "ontouchstart" in a,
      H = B(a, "PointerEvent") !== d,
      I = G && F.test(navigator.userAgent),
      J = "touch",
      K = "pen",
      L = "mouse",
      M = "kinect",
      N = 25,
      O = 1,
      P = 2,
      Q = 4,
      R = 8,
      S = 1,
      T = 2,
      U = 4,
      V = 8,
      W = 16,
      X = T | U,
      Y = V | W,
      Z = X | Y,
      $ = ["x", "y"],
      _ = ["clientX", "clientY"];ab.prototype = { handler: function () {}, init: function () {
      this.evEl && t(this.element, this.evEl, this.domHandler), this.evTarget && t(this.target, this.evTarget, this.domHandler), this.evWin && t(E(this.element), this.evWin, this.domHandler);
    }, destroy: function () {
      this.evEl && u(this.element, this.evEl, this.domHandler), this.evTarget && u(this.target, this.evTarget, this.domHandler), this.evWin && u(E(this.element), this.evWin, this.domHandler);
    } };var ob = { mousedown: O, mousemove: P, mouseup: Q },
      pb = "mousedown",
      qb = "mousemove mouseup";p(rb, ab, { handler: function (a) {
      var b = ob[a.type];b & O && 0 === a.button && (this.pressed = !0), b & P && 1 !== a.which && (b = Q), this.pressed && this.allow && (b & Q && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: L, srcEvent: a }));
    } });var sb = { pointerdown: O, pointermove: P, pointerup: Q, pointercancel: R, pointerout: R },
      tb = { 2: J, 3: K, 4: L, 5: M },
      ub = "pointerdown",
      vb = "pointermove pointerup pointercancel";a.MSPointerEvent && (ub = "MSPointerDown", vb = "MSPointerMove MSPointerUp MSPointerCancel"), p(wb, ab, { handler: function (a) {
      var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace("ms", ""),
          e = sb[d],
          f = tb[a.pointerType] || a.pointerType,
          g = f == J,
          h = y(b, a.pointerId, "pointerId");e & O && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Q | R) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
    } });var xb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R },
      yb = "touchstart",
      zb = "touchstart touchmove touchend touchcancel";p(Ab, ab, { handler: function (a) {
      var b = xb[a.type];if (b === O && (this.started = !0), this.started) {
        var c = Bb.call(this, a, b);b & (Q | R) && 0 === c[0].length - c[1].length && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: J, srcEvent: a });
      }
    } });var Cb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R },
      Db = "touchstart touchmove touchend touchcancel";p(Eb, ab, { handler: function (a) {
      var b = Cb[a.type],
          c = Fb.call(this, a, b);c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: J, srcEvent: a });
    } }), p(Gb, ab, { handler: function (a, b, c) {
      var d = c.pointerType == J,
          e = c.pointerType == L;if (d) this.mouse.allow = !1;else if (e && !this.mouse.allow) return;b & (Q | R) && (this.mouse.allow = !0), this.callback(a, b, c);
    }, destroy: function () {
      this.touch.destroy(), this.mouse.destroy();
    } });var Hb = B(f.style, "touchAction"),
      Ib = Hb !== d,
      Jb = "compute",
      Kb = "auto",
      Lb = "manipulation",
      Mb = "none",
      Nb = "pan-x",
      Ob = "pan-y";Pb.prototype = { set: function (a) {
      a == Jb && (a = this.compute()), Ib && (this.manager.element.style[Hb] = a), this.actions = a.toLowerCase().trim();
    }, update: function () {
      this.set(this.manager.options.touchAction);
    }, compute: function () {
      var a = [];return m(this.manager.recognizers, function (b) {
        r(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
      }), Qb(a.join(" "));
    }, preventDefaults: function (a) {
      if (!Ib) {
        var b = a.srcEvent,
            c = a.offsetDirection;if (this.manager.session.prevented) return b.preventDefault(), void 0;var d = this.actions,
            e = w(d, Mb),
            f = w(d, Ob),
            g = w(d, Nb);return e || f && c & X || g && c & Y ? this.preventSrc(b) : void 0;
      }
    }, preventSrc: function (a) {
      this.manager.session.prevented = !0, a.preventDefault();
    } };var Rb = 1,
      Sb = 2,
      Tb = 4,
      Ub = 8,
      Vb = Ub,
      Wb = 16,
      Xb = 32;Yb.prototype = { defaults: {}, set: function (a) {
      return n(this.options, a), this.manager && this.manager.touchAction.update(), this;
    }, recognizeWith: function (a) {
      if (l(a, "recognizeWith", this)) return this;var b = this.simultaneous;return a = _b(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
    }, dropRecognizeWith: function (a) {
      return l(a, "dropRecognizeWith", this) ? this : (a = _b(a, this), delete this.simultaneous[a.id], this);
    }, requireFailure: function (a) {
      if (l(a, "requireFailure", this)) return this;var b = this.requireFail;return a = _b(a, this), -1 === y(b, a) && (b.push(a), a.requireFailure(this)), this;
    }, dropRequireFailure: function (a) {
      if (l(a, "dropRequireFailure", this)) return this;a = _b(a, this);var b = y(this.requireFail, a);return b > -1 && this.requireFail.splice(b, 1), this;
    }, hasRequireFailures: function () {
      return this.requireFail.length > 0;
    }, canRecognizeWith: function (a) {
      return !!this.simultaneous[a.id];
    }, emit: function (a) {
      function d(d) {
        b.manager.emit(b.options.event + (d ? Zb(c) : ""), a);
      }var b = this,
          c = this.state;Ub > c && d(!0), d(), c >= Ub && d(!0);
    }, tryEmit: function (a) {
      return this.canEmit() ? this.emit(a) : (this.state = Xb, void 0);
    }, canEmit: function () {
      for (var a = 0; a < this.requireFail.length;) {
        if (!(this.requireFail[a].state & (Xb | Rb))) return !1;a++;
      }return !0;
    }, recognize: function (a) {
      var b = n({}, a);return r(this.options.enable, [this, b]) ? (this.state & (Vb | Wb | Xb) && (this.state = Rb), this.state = this.process(b), this.state & (Sb | Tb | Ub | Wb) && this.tryEmit(b), void 0) : (this.reset(), this.state = Xb, void 0);
    }, process: function () {}, getTouchAction: function () {}, reset: function () {} }, p(ac, Yb, { defaults: { pointers: 1 }, attrTest: function (a) {
      var b = this.options.pointers;return 0 === b || a.pointers.length === b;
    }, process: function (a) {
      var b = this.state,
          c = a.eventType,
          d = b & (Sb | Tb),
          e = this.attrTest(a);return d && (c & R || !e) ? b | Wb : d || e ? c & Q ? b | Ub : b & Sb ? b | Tb : Sb : Xb;
    } }), p(bc, ac, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Z }, getTouchAction: function () {
      var a = this.options.direction,
          b = [];return a & X && b.push(Ob), a & Y && b.push(Nb), b;
    }, directionTest: function (a) {
      var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;return e & b.direction || (b.direction & X ? (e = 0 === f ? S : 0 > f ? T : U, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? S : 0 > g ? V : W, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
    }, attrTest: function (a) {
      return ac.prototype.attrTest.call(this, a) && (this.state & Sb || !(this.state & Sb) && this.directionTest(a));
    }, emit: function (a) {
      this.pX = a.deltaX, this.pY = a.deltaY;var b = $b(a.direction);b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a);
    } }), p(cc, ac, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function () {
      return [Mb];
    }, attrTest: function (a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & Sb);
    }, emit: function (a) {
      if (this._super.emit.call(this, a), 1 !== a.scale) {
        var b = a.scale < 1 ? "in" : "out";this.manager.emit(this.options.event + b, a);
      }
    } }), p(dc, Yb, { defaults: { event: "press", pointers: 1, time: 500, threshold: 5 }, getTouchAction: function () {
      return [Kb];
    }, process: function (a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          e = a.deltaTime > b.time;if (this._input = a, !d || !c || a.eventType & (Q | R) && !e) this.reset();else if (a.eventType & O) this.reset(), this._timer = k(function () {
        this.state = Vb, this.tryEmit();
      }, b.time, this);else if (a.eventType & Q) return Vb;return Xb;
    }, reset: function () {
      clearTimeout(this._timer);
    }, emit: function (a) {
      this.state === Vb && (a && a.eventType & Q ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = j(), this.manager.emit(this.options.event, this._input)));
    } }), p(ec, ac, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function () {
      return [Mb];
    }, attrTest: function (a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & Sb);
    } }), p(fc, ac, { defaults: { event: "swipe", threshold: 10, velocity: .65, direction: X | Y, pointers: 1 }, getTouchAction: function () {
      return bc.prototype.getTouchAction.call(this);
    }, attrTest: function (a) {
      var c,
          b = this.options.direction;return b & (X | Y) ? c = a.velocity : b & X ? c = a.velocityX : b & Y && (c = a.velocityY), this._super.attrTest.call(this, a) && b & a.direction && a.distance > this.options.threshold && i(c) > this.options.velocity && a.eventType & Q;
    }, emit: function (a) {
      var b = $b(a.direction);b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
    } }), p(gc, Yb, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 2, posThreshold: 10 }, getTouchAction: function () {
      return [Lb];
    }, process: function (a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          e = a.deltaTime < b.time;if (this.reset(), a.eventType & O && 0 === this.count) return this.failTimeout();if (d && e && c) {
        if (a.eventType != Q) return this.failTimeout();var f = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            g = !this.pCenter || kb(this.pCenter, a.center) < b.posThreshold;this.pTime = a.timeStamp, this.pCenter = a.center, g && f ? this.count += 1 : this.count = 1, this._input = a;var h = this.count % b.taps;if (0 === h) return this.hasRequireFailures() ? (this._timer = k(function () {
          this.state = Vb, this.tryEmit();
        }, b.interval, this), Sb) : Vb;
      }return Xb;
    }, failTimeout: function () {
      return this._timer = k(function () {
        this.state = Xb;
      }, this.options.interval, this), Xb;
    }, reset: function () {
      clearTimeout(this._timer);
    }, emit: function () {
      this.state == Vb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
    } }), hc.VERSION = "2.0.4", hc.defaults = { domEvents: !1, touchAction: Jb, enable: !0, inputTarget: null, inputClass: null, preset: [[ec, { enable: !1 }], [cc, { enable: !1 }, ["rotate"]], [fc, { direction: X }], [bc, { direction: X }, ["swipe"]], [gc], [gc, { event: "doubletap", taps: 2 }, ["tap"]], [dc]], cssProps: { userSelect: "default", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };var ic = 1,
      jc = 2;kc.prototype = { set: function (a) {
      return n(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
    }, stop: function (a) {
      this.session.stopped = a ? jc : ic;
    }, recognize: function (a) {
      var b = this.session;if (!b.stopped) {
        this.touchAction.preventDefaults(a);var c,
            d = this.recognizers,
            e = b.curRecognizer;(!e || e && e.state & Vb) && (e = b.curRecognizer = null);for (var f = 0; f < d.length;) {
          c = d[f], b.stopped === jc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (Sb | Tb | Ub) && (e = b.curRecognizer = c), f++;
        }
      }
    }, get: function (a) {
      if (a instanceof Yb) return a;for (var b = this.recognizers, c = 0; c < b.length; c++) {
        if (b[c].options.event == a) return b[c];
      }return null;
    }, add: function (a) {
      if (l(a, "add", this)) return this;var b = this.get(a.options.event);return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
    }, remove: function (a) {
      if (l(a, "remove", this)) return this;var b = this.recognizers;return a = this.get(a), b.splice(y(b, a), 1), this.touchAction.update(), this;
    }, on: function (a, b) {
      var c = this.handlers;return m(x(a), function (a) {
        c[a] = c[a] || [], c[a].push(b);
      }), this;
    }, off: function (a, b) {
      var c = this.handlers;return m(x(a), function (a) {
        b ? c[a].splice(y(c[a], b), 1) : delete c[a];
      }), this;
    }, emit: function (a, b) {
      this.options.domEvents && mc(a, b);var c = this.handlers[a] && this.handlers[a].slice();if (c && c.length) {
        b.type = a, b.preventDefault = function () {
          b.srcEvent.preventDefault();
        };for (var d = 0; d < c.length;) {
          c[d](b), d++;
        }
      }
    }, destroy: function () {
      this.element && lc(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
    } }, n(hc, { INPUT_START: O, INPUT_MOVE: P, INPUT_END: Q, INPUT_CANCEL: R, STATE_POSSIBLE: Rb, STATE_BEGAN: Sb, STATE_CHANGED: Tb, STATE_ENDED: Ub, STATE_RECOGNIZED: Vb, STATE_CANCELLED: Wb, STATE_FAILED: Xb, DIRECTION_NONE: S, DIRECTION_LEFT: T, DIRECTION_RIGHT: U, DIRECTION_UP: V, DIRECTION_DOWN: W, DIRECTION_HORIZONTAL: X, DIRECTION_VERTICAL: Y, DIRECTION_ALL: Z, Manager: kc, Input: ab, TouchAction: Pb, TouchInput: Eb, MouseInput: rb, PointerEventInput: wb, TouchMouseInput: Gb, SingleTouchInput: Ab, Recognizer: Yb, AttrRecognizer: ac, Tap: gc, Pan: bc, Swipe: fc, Pinch: cc, Rotate: ec, Press: dc, on: t, off: u, each: m, merge: o, extend: n, inherit: p, bindFn: q, prefixed: B }), typeof define == g && define.amd ? define(function () {
    return hc;
  }) : "undefined" != typeof module && module.exports ? module.exports = hc : a[c] = hc;
}(window, document, "Hammer");;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'hammerjs'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'), require('hammerjs'));
  } else {
    factory(jQuery, Hammer);
  }
})(function ($, Hammer) {
  function hammerify(el, options) {
    var $el = $(el);
    if (!$el.data("hammer")) {
      $el.data("hammer", new Hammer($el[0], options));
    }
  }

  $.fn.hammer = function (options) {
    return this.each(function () {
      hammerify(this, options);
    });
  };

  // extend the emit method to also trigger jQuery events
  Hammer.Manager.prototype.emit = function (originalEmit) {
    return function (type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data
      });
    };
  }(Hammer.Manager.prototype.emit);
});
; // Required for Meteor package, the use of window prevents export by Meteor
(function (window) {
  if (window.Package) {
    Materialize = {};
  } else {
    window.Materialize = {};
  }
})(window);

/*
 * raf.js
 * https://github.com/ngryman/raf.js
 *
 * original requestAnimationFrame polyfill by Erik Möller
 * inspired from paul_irish gist and post
 *
 * Copyright (c) 2013 ngryman
 * Licensed under the MIT license.
 */
(function (window) {
  var lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      i = vendors.length;

  // try to un-prefix existing raf
  while (--i >= 0 && !requestAnimationFrame) {
    requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[i] + 'CancelRequestAnimationFrame'];
  }

  // polyfill with setTimeout fallback
  // heavily inspired from @darius gist mod: https://gist.github.com/paulirish/1579671#comment-837945
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function (callback) {
      var now = +Date.now(),
          nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };

    cancelAnimationFrame = clearTimeout;
  }

  // export to window
  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;
})(window);

/**
 * Generate approximated selector string for a jQuery object
 * @param {jQuery} obj  jQuery object to be parsed
 * @returns {string}
 */
Materialize.objectSelectorString = function (obj) {
  var tagStr = obj.prop('tagName') || '';
  var idStr = obj.attr('id') || '';
  var classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g, '');
};

// Unique Random ID
Materialize.guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
}();

/**
 * Escapes hash from special characters
 * @param {string} hash  String returned from this.hash
 * @returns {string}
 */
Materialize.escapeHash = function (hash) {
  return hash.replace(/(:|\.|\[|\]|,|=)/g, "\\$1");
};

Materialize.elementOrParentIsFixed = function (element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($(this).css("position") === "fixed") {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};

/**
 * Get time in ms
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @type {function}
 * @return {number}
 */
var getTime = Date.now || function () {
  return new Date().getTime();
};

/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @param {function} func
 * @param {number} wait
 * @param {Object=} options
 * @returns {Function}
 */
Materialize.throttle = function (func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// Velocity has conflicts when loaded with jQuery, this will check for it
// First, check if in noConflict mode
var Vel;
if (jQuery) {
  Vel = jQuery.Velocity;
} else if ($) {
  Vel = $.Velocity;
} else {
  Vel = Velocity;
}
;(function ($) {
  $.fn.collapsible = function (options, methodParam) {
    var defaults = {
      accordion: undefined,
      onOpen: undefined,
      onClose: undefined
    };

    var methodName = options;
    options = $.extend(defaults, options);

    return this.each(function () {

      var $this = $(this);

      var $panel_headers = $(this).find('> li > .collapsible-header');

      var collapsible_type = $this.data("collapsible");

      /****************
      Helper Functions
      ****************/

      // Accordion Open
      function accordionOpen(object) {
        $panel_headers = $this.find('> li > .collapsible-header');
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')) {
          object.siblings('.collapsible-body').stop(true, false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function () {
              $(this).css('height', '');
            } });
        } else {
          object.siblings('.collapsible-body').stop(true, false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function () {
              $(this).css('height', '');
            } });
        }

        $panel_headers.not(object).removeClass('active').parent().removeClass('active');

        // Close previously open accordion elements.
        $panel_headers.not(object).parent().children('.collapsible-body').stop(true, false).each(function () {
          if ($(this).is(':visible')) {
            $(this).slideUp({
              duration: 350,
              easing: "easeOutQuart",
              queue: false,
              complete: function () {
                $(this).css('height', '');
                execCallbacks($(this).siblings('.collapsible-header'));
              }
            });
          }
        });
      }

      // Expandable Open
      function expandableOpen(object) {
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')) {
          object.siblings('.collapsible-body').stop(true, false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function () {
              $(this).css('height', '');
            } });
        } else {
          object.siblings('.collapsible-body').stop(true, false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function () {
              $(this).css('height', '');
            } });
        }
      }

      // Open collapsible. object: .collapsible-header
      function collapsibleOpen(object, noToggle) {
        if (!noToggle) {
          object.toggleClass('active');
        }

        if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) {
          // Handle Accordion
          accordionOpen(object);
        } else {
          // Handle Expandables
          expandableOpen(object);
        }

        execCallbacks(object);
      }

      // Handle callbacks
      function execCallbacks(object) {
        if (object.hasClass('active')) {
          if (typeof options.onOpen === "function") {
            options.onOpen.call(this, object.parent());
          }
        } else {
          if (typeof options.onClose === "function") {
            options.onClose.call(this, object.parent());
          }
        }
      }

      /**
       * Check if object is children of panel header
       * @param  {Object}  object Jquery object
       * @return {Boolean} true if it is children
       */
      function isChildrenOfPanelHeader(object) {

        var panelHeader = getPanelHeader(object);

        return panelHeader.length > 0;
      }

      /**
       * Get panel header from a children element
       * @param  {Object} object Jquery object
       * @return {Object} panel header object
       */
      function getPanelHeader(object) {

        return object.closest('li > .collapsible-header');
      }

      // Turn off any existing event handlers
      function removeEventHandlers() {
        $this.off('click.collapse', '> li > .collapsible-header');
      }

      /*****  End Helper Functions  *****/

      // Methods
      if (methodName === 'destroy') {
        removeEventHandlers();
        return;
      } else if (methodParam >= 0 && methodParam < $panel_headers.length) {
        var $curr_header = $panel_headers.eq(methodParam);
        if ($curr_header.length && (methodName === 'open' || methodName === 'close' && $curr_header.hasClass('active'))) {
          collapsibleOpen($curr_header);
        }
        return;
      }

      removeEventHandlers();

      // Add click handler to only direct collapsible header children
      $this.on('click.collapse', '> li > .collapsible-header', function (e) {
        var element = $(e.target);

        if (isChildrenOfPanelHeader(element)) {
          element = getPanelHeader(element);
        }

        collapsibleOpen(element);
      });

      // Open first active
      if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) {
        // Handle Accordion
        collapsibleOpen($panel_headers.filter('.active').first(), true);
      } else {
        // Handle Expandables
        $panel_headers.filter('.active').each(function () {
          collapsibleOpen($(this), true);
        });
      }
    });
  };

  $(document).ready(function () {
    $('.collapsible').collapsible();
  });
})(jQuery);;(function ($) {

  // Add posibility to scroll to selected option
  // usefull for select for example
  $.fn.scrollTo = function (elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };

  $.fn.dropdown = function (options) {
    var defaults = {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Constrains width of dropdown to the activator
      hover: false,
      gutter: 0, // Spacing from edge
      belowOrigin: false,
      alignment: 'left',
      stopPropagation: false
    };

    // Open dropdown.
    if (options === "open") {
      this.each(function () {
        $(this).trigger('open');
      });
      return false;
    }

    // Close dropdown.
    if (options === "close") {
      this.each(function () {
        $(this).trigger('close');
      });
      return false;
    }

    this.each(function () {
      var origin = $(this);
      var curr_options = $.extend({}, defaults, options);
      var isFocused = false;

      // Dropdown menu
      var activates = $("#" + origin.attr('data-activates'));

      function updateOptions() {
        if (origin.data('induration') !== undefined) curr_options.inDuration = origin.data('induration');
        if (origin.data('outduration') !== undefined) curr_options.outDuration = origin.data('outduration');
        if (origin.data('constrainwidth') !== undefined) curr_options.constrainWidth = origin.data('constrainwidth');
        if (origin.data('hover') !== undefined) curr_options.hover = origin.data('hover');
        if (origin.data('gutter') !== undefined) curr_options.gutter = origin.data('gutter');
        if (origin.data('beloworigin') !== undefined) curr_options.belowOrigin = origin.data('beloworigin');
        if (origin.data('alignment') !== undefined) curr_options.alignment = origin.data('alignment');
        if (origin.data('stoppropagation') !== undefined) curr_options.stopPropagation = origin.data('stoppropagation');
      }

      updateOptions();

      // Attach dropdown to its activator
      origin.after(activates);

      /*
        Helper function to position and resize dropdown.
        Used in hover and click handler.
      */
      function placeDropdown(eventType) {
        // Check for simultaneous focus and click events.
        if (eventType === 'focus') {
          isFocused = true;
        }

        // Check html data attributes
        updateOptions();

        // Set Dropdown state
        activates.addClass('active');
        origin.addClass('active');

        var originWidth = origin[0].getBoundingClientRect().width;

        // Constrain width
        if (curr_options.constrainWidth === true) {
          activates.css('width', originWidth);
        } else {
          activates.css('white-space', 'nowrap');
        }

        // Offscreen detection
        var windowHeight = window.innerHeight;
        var originHeight = origin.innerHeight();
        var offsetLeft = origin.offset().left;
        var offsetTop = origin.offset().top - $(window).scrollTop();
        var currAlignment = curr_options.alignment;
        var gutterSpacing = 0;
        var leftPosition = 0;

        // Below Origin
        var verticalOffset = 0;
        if (curr_options.belowOrigin === true) {
          verticalOffset = originHeight;
        }

        // Check for scrolling positioned container.
        var scrollYOffset = 0;
        var scrollXOffset = 0;
        var wrapper = origin.parent();
        if (!wrapper.is('body')) {
          if (wrapper[0].scrollHeight > wrapper[0].clientHeight) {
            scrollYOffset = wrapper[0].scrollTop;
          }
          if (wrapper[0].scrollWidth > wrapper[0].clientWidth) {
            scrollXOffset = wrapper[0].scrollLeft;
          }
        }

        if (offsetLeft + activates.innerWidth() > $(window).width()) {
          // Dropdown goes past screen on right, force right alignment
          currAlignment = 'right';
        } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
          // Dropdown goes past screen on left, force left alignment
          currAlignment = 'left';
        }
        // Vertical bottom offscreen detection
        if (offsetTop + activates.innerHeight() > windowHeight) {
          // If going upwards still goes offscreen, just crop height of dropdown.
          if (offsetTop + originHeight - activates.innerHeight() < 0) {
            var adjustedHeight = windowHeight - offsetTop - verticalOffset;
            activates.css('max-height', adjustedHeight);
          } else {
            // Flow upwards.
            if (!verticalOffset) {
              verticalOffset += originHeight;
            }
            verticalOffset -= activates.innerHeight();
          }
        }

        // Handle edge alignment
        if (currAlignment === 'left') {
          gutterSpacing = curr_options.gutter;
          leftPosition = origin.position().left + gutterSpacing;
        } else if (currAlignment === 'right') {
          // Material icons fix
          activates.stop(true, true).css({
            opacity: 0,
            left: 0
          });

          var offsetRight = origin.position().left + originWidth - activates.width();
          gutterSpacing = -curr_options.gutter;
          leftPosition = offsetRight + gutterSpacing;
        }

        // Position dropdown
        activates.css({
          position: 'absolute',
          top: origin.position().top + verticalOffset + scrollYOffset,
          left: leftPosition + scrollXOffset
        });

        // Show dropdown
        activates.slideDown({
          queue: false,
          duration: curr_options.inDuration,
          easing: 'easeOutCubic',
          complete: function () {
            $(this).css('height', '');
          }
        }).animate({ opacity: 1 }, { queue: false, duration: curr_options.inDuration, easing: 'easeOutSine' });

        // Add click close handler to document
        setTimeout(function () {
          $(document).on('click.' + activates.attr('id'), function (e) {
            hideDropdown();
            $(document).off('click.' + activates.attr('id'));
          });
        }, 0);
      }

      function hideDropdown() {
        // Check for simultaneous focus and click events.
        isFocused = false;
        activates.fadeOut(curr_options.outDuration);
        activates.removeClass('active');
        origin.removeClass('active');
        $(document).off('click.' + activates.attr('id'));
        setTimeout(function () {
          activates.css('max-height', '');
        }, curr_options.outDuration);
      }

      // Hover
      if (curr_options.hover) {
        var open = false;
        origin.off('click.' + origin.attr('id'));
        // Hover handler to show dropdown
        origin.on('mouseenter', function (e) {
          // Mouse over
          if (open === false) {
            placeDropdown();
            open = true;
          }
        });
        origin.on('mouseleave', function (e) {
          // If hover on origin then to something other than dropdown content, then close
          var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
          if (!$(toEl).closest('.dropdown-content').is(activates)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        activates.on('mouseleave', function (e) {
          // Mouse out
          var toEl = e.toElement || e.relatedTarget;
          if (!$(toEl).closest('.dropdown-button').is(origin)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        // Click
      } else {
        // Click handler to show dropdown
        origin.off('click.' + origin.attr('id'));
        origin.on('click.' + origin.attr('id'), function (e) {
          if (!isFocused) {
            if (origin[0] == e.currentTarget && !origin.hasClass('active') && $(e.target).closest('.dropdown-content').length === 0) {
              e.preventDefault(); // Prevents button click from moving window
              if (curr_options.stopPropagation) {
                e.stopPropagation();
              }
              placeDropdown('click');
            }
            // If origin is clicked and menu is open, close menu
            else if (origin.hasClass('active')) {
                hideDropdown();
                $(document).off('click.' + activates.attr('id'));
              }
          }
        });
      } // End else

      // Listen to open and close event - useful for select component
      origin.on('open', function (e, eventType) {
        placeDropdown(eventType);
      });
      origin.on('close', hideDropdown);
    });
  }; // End dropdown plugin

  $(document).ready(function () {
    $('.dropdown-button').dropdown();
  });
})(jQuery);
;(function ($) {
  'use strict';

  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    ready: undefined,
    complete: undefined,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };

  /**
   * @class
   *
   */

  var Modal = function () {
    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    function Modal($el, options) {
      _classCallCheck(this, Modal);

      // If exists, destroy and reinitialize
      if (!!$el[0].M_Modal) {
        $el[0].M_Modal.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} ready - Callback function called when modal is finished entering
       * @prop {Function} complete - Callback function called when modal is finished exiting
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       * @prop {String} [startingTop='4%'] - startingTop
       * @prop {String} [endingTop='10%'] - endingTop
       */
      this.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      this.isOpen = false;

      this.$el[0].M_Modal = this;
      this.id = $el.attr('id');
      this.openingTrigger = undefined;
      this.$overlay = $('<div class="modal-overlay"></div>');

      Modal._increment++;
      Modal._count++;
      this.$overlay[0].style.zIndex = 1000 + Modal._increment * 2;
      this.$el[0].style.zIndex = 1000 + Modal._increment * 2 + 1;
      this.setupEventHandlers();
    }

    _createClass(Modal, [{
      key: 'getInstance',


      /**
       * Get Instance
       */
      value: function getInstance() {
        return this;
      }

      /**
       * Teardown component
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.removeEventHandlers();
        this.$el[0].removeAttribute('style');
        if (!!this.$overlay[0].parentNode) {
          this.$overlay[0].parentNode.removeChild(this.$overlay[0]);
        }
        this.$el[0].M_Modal = undefined;
        Modal._count--;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: 'setupEventHandlers',
      value: function setupEventHandlers() {
        this.handleOverlayClickBound = this.handleOverlayClick.bind(this);
        this.handleModalCloseClickBound = this.handleModalCloseClick.bind(this);

        if (Modal._count === 1) {
          document.addEventListener('click', this.handleTriggerClick);
        }
        this.$overlay[0].addEventListener('click', this.handleOverlayClickBound);
        this.$el[0].addEventListener('click', this.handleModalCloseClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: 'removeEventHandlers',
      value: function removeEventHandlers() {
        if (Modal._count === 0) {
          document.removeEventListener('click', this.handleTriggerClick);
        }
        this.$overlay[0].removeEventListener('click', this.handleOverlayClickBound);
        this.$el[0].removeEventListener('click', this.handleModalCloseClickBound);
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: 'handleTriggerClick',
      value: function handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.modal-trigger');
        if (e.target && $trigger.length) {
          var modalId = $trigger[0].getAttribute('href');
          if (modalId) {
            modalId = modalId.slice(1);
          } else {
            modalId = $trigger[0].getAttribute('data-target');
          }
          var modalInstance = document.getElementById(modalId).M_Modal;
          if (modalInstance) {
            modalInstance.open($trigger);
          }
          e.preventDefault();
        }
      }

      /**
       * Handle Overlay Click
       */

    }, {
      key: 'handleOverlayClick',
      value: function handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Handle Modal Close Click
       * @param {Event} e
       */

    }, {
      key: 'handleModalCloseClick',
      value: function handleModalCloseClick(e) {
        var $closeTrigger = $(e.target).closest('.modal-close');
        if (e.target && $closeTrigger.length) {
          this.close();
        }
      }

      /**
       * Handle Keydown
       * @param {Event} e
       */

    }, {
      key: 'handleKeydown',
      value: function handleKeydown(e) {
        // ESC key
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Animate in modal
       */

    }, {
      key: 'animateIn',
      value: function animateIn() {
        var _this = this;

        // Set initial styles
        $.extend(this.$el[0].style, {
          display: 'block',
          opacity: 0
        });
        $.extend(this.$overlay[0].style, {
          display: 'block',
          opacity: 0
        });

        // Animate overlay
        Vel(this.$overlay[0], { opacity: this.options.opacity }, { duration: this.options.inDuration, queue: false, ease: 'easeOutCubic' });

        // Define modal animation options
        var enterVelocityOptions = {
          duration: this.options.inDuration,
          queue: false,
          ease: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            if (typeof _this.options.ready === 'function') {
              _this.options.ready.call(_this, _this.$el, _this.openingTrigger);
            }
          }
        };

        // Bottom sheet animation
        if (this.$el[0].classList.contains('bottom-sheet')) {
          Vel(this.$el[0], { bottom: 0, opacity: 1 }, enterVelocityOptions);

          // Normal modal animation
        } else {
          Vel.hook(this.$el[0], 'scaleX', 0.7);
          this.$el[0].style.top = this.options.startingTop;
          Vel(this.$el[0], { top: this.options.endingTop, opacity: 1, scaleX: 1 }, enterVelocityOptions);
        }
      }

      /**
       * Animate out modal
       */

    }, {
      key: 'animateOut',
      value: function animateOut() {
        var _this2 = this;

        // Animate overlay
        Vel(this.$overlay[0], { opacity: 0 }, { duration: this.options.outDuration, queue: false, ease: 'easeOutQuart' });

        // Define modal animation options
        var exitVelocityOptions = {
          duration: this.options.outDuration,
          queue: false,
          ease: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            _this2.$el[0].style.display = 'none';
            // Call complete callback
            if (typeof _this2.options.complete === 'function') {
              _this2.options.complete.call(_this2, _this2.$el);
            }
            _this2.$overlay[0].remove();
          }
        };

        // Bottom sheet animation
        if (this.$el[0].classList.contains('bottom-sheet')) {
          Vel(this.$el[0], { bottom: '-100%', opacity: 0 }, exitVelocityOptions);

          // Normal modal animation
        } else {
          Vel(this.$el[0], { top: this.options.startingTop, opacity: 0, scaleX: 0.7 }, exitVelocityOptions);
        }
      }

      /**
       * Open Modal
       * @param {jQuery} [$trigger]
       */

    }, {
      key: 'open',
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        var body = document.body;
        body.style.overflow = 'hidden';
        this.$el[0].classList.add('open');
        body.appendChild(this.$overlay[0]);

        // Set opening trigger, undefined indicates modal was opened by javascript
        this.openingTrigger = !!$trigger ? $trigger : undefined;

        if (this.options.dismissible) {
          this.handleKeydownBound = this.handleKeydown.bind(this);
          document.addEventListener('keydown', this.handleKeydownBound);
        }

        this.animateIn();

        return this;
      }

      /**
       * Close Modal
       */

    }, {
      key: 'close',
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this.$el[0].classList.remove('open');
        document.body.style.overflow = null;

        if (this.options.dismissible) {
          document.removeEventListener('keydown', this.handleKeydownBound);
        }

        this.animateOut();

        return this;
      }
    }], [{
      key: 'init',
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Modal($(this), options));
        });
        return arr;
      }
    }, {
      key: 'defaults',
      get: function () {
        return _defaults;
      }
    }]);

    return Modal;
  }();

  /**
   * @static
   * @memberof Modal
   */


  Modal._increment = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  window.Materialize.Modal = Modal;

  $.fn.modal = function (methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Modal.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0, 3) === 'get') {
        return this.first()[0].M_Modal[methodOrOptions]();

        // Void methods
      } else {
        return this.each(function () {
          this.M_Modal[methodOrOptions]();
        });
      }

      // Initialize plugin if options or no argument is passed in
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      Modal.init(this, arguments[0]);
      return this;

      // Return error if an unrecognized  method name is passed in
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.modal');
    }
  };
})(jQuery);
;(function ($) {

  $.fn.materialbox = function () {

    return this.each(function () {

      if ($(this).hasClass('initialized')) {
        return;
      }

      $(this).addClass('initialized');

      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 275;
      var outDuration = 200;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');
      var originalWidth = 0;
      var originalHeight = 0;
      var ancestorsChanged;
      var ancestor;
      var originInlineStyles = origin.attr('style');
      origin.wrap(placeholder);

      // Start click handler
      origin.on('click', function () {
        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.width();
        var originalHeight = origin.height();

        // If already modal, return to original
        if (doneAnimating === false) {
          returnToOriginal();
          return false;
        } else if (overlayActive && doneAnimating === true) {
          returnToOriginal();
          return false;
        }

        // Set states
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;

        // Set positioning for placeholder
        placeholder.css({
          width: placeholder[0].getBoundingClientRect().width,
          height: placeholder[0].getBoundingClientRect().height,
          position: 'relative',
          top: 0,
          left: 0
        });

        // Find ancestor with overflow: hidden; and remove it
        ancestorsChanged = undefined;
        ancestor = placeholder[0].parentNode;
        var count = 0;
        while (ancestor !== null && !$(ancestor).is(document)) {
          var curr = $(ancestor);
          if (curr.css('overflow') !== 'visible') {
            curr.css('overflow', 'visible');
            if (ancestorsChanged === undefined) {
              ancestorsChanged = curr;
            } else {
              ancestorsChanged = ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }

        // Set css on origin
        origin.css({
          position: 'absolute',
          'z-index': 1000,
          'will-change': 'left, top, width, height'
        }).data('width', originalWidth).data('height', originalHeight);

        // Add overlay
        var overlay = $('<div id="materialbox-overlay"></div>').css({
          opacity: 0
        }).click(function () {
          if (doneAnimating === true) returnToOriginal();
        });

        // Put before in origin image to preserve z-index layering.
        origin.before(overlay);

        // Set dimensions if needed
        var overlayOffset = overlay[0].getBoundingClientRect();
        overlay.css({
          width: windowWidth,
          height: windowHeight,
          left: -1 * overlayOffset.left,
          top: -1 * overlayOffset.top
        });

        // Animate Overlay
        overlay.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' });

        // Add and animate caption if it exists
        if (origin.data('caption') !== "") {
          var $photo_caption = $('<div class="materialbox-caption"></div>');
          $photo_caption.text(origin.data('caption'));
          $('body').append($photo_caption);
          $photo_caption.css({ "display": "inline" });
          $photo_caption.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' });
        }

        // Resize Image
        var ratio = 0;
        var widthPercent = originalWidth / windowWidth;
        var heightPercent = originalHeight / windowHeight;
        var newWidth = 0;
        var newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = originalHeight / originalWidth;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        } else {
          ratio = originalWidth / originalHeight;
          newWidth = windowHeight * 0.9 * ratio;
          newHeight = windowHeight * 0.9;
        }

        // Animate image + set z-index
        if (origin.hasClass('responsive-img')) {
          origin.velocity({ 'max-width': newWidth, 'width': originalWidth }, { duration: 0, queue: false,
            complete: function () {
              origin.css({ left: 0, top: 0 }).velocity({
                height: newHeight,
                width: newWidth,
                left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
                top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
              }, {
                duration: inDuration,
                queue: false,
                easing: 'easeOutQuad',
                complete: function () {
                  doneAnimating = true;
                }
              });
            } // End Complete
          }); // End Velocity
        } else {
          origin.css('left', 0).css('top', 0).velocity({
            height: newHeight,
            width: newWidth,
            left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
            top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
          }, {
            duration: inDuration,
            queue: false,
            easing: 'easeOutQuad',
            complete: function () {
              doneAnimating = true;
            }
          }); // End Velocity
        }

        // Handle Exit triggers
        $(window).on('scroll.materialbox', function () {
          if (overlayActive) {
            returnToOriginal();
          }
        });

        $(window).on('resize.materialbox', function () {
          if (overlayActive) {
            returnToOriginal();
          }
        });

        $(document).on('keyup.materialbox', function (e) {
          // ESC key
          if (e.keyCode === 27 && doneAnimating === true && overlayActive) {
            returnToOriginal();
          }
        });
      }); // End click handler


      // This function returns the modaled image to the original spot
      function returnToOriginal() {

        doneAnimating = false;

        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.data('width');
        var originalHeight = origin.data('height');

        origin.velocity("stop", true);
        $('#materialbox-overlay').velocity("stop", true);
        $('.materialbox-caption').velocity("stop", true);

        // disable exit handlers
        $(window).off('scroll.materialbox');
        $(document).off('keyup.materialbox');
        $(window).off('resize.materialbox');

        $('#materialbox-overlay').velocity({ opacity: 0 }, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false, easing: 'easeOutQuad',
          complete: function () {
            // Remove Overlay
            overlayActive = false;
            $(this).remove();
          }
        });

        // Resize Image
        origin.velocity({
          width: originalWidth,
          height: originalHeight,
          left: 0,
          top: 0
        }, {
          duration: outDuration,
          queue: false, easing: 'easeOutQuad',
          complete: function () {
            placeholder.css({
              height: '',
              width: '',
              position: '',
              top: '',
              left: ''
            });

            origin.removeAttr('style');
            origin.attr('style', originInlineStyles);

            // Remove class
            origin.removeClass('active');
            doneAnimating = true;

            // Remove overflow overrides on ancestors
            if (ancestorsChanged) {
              ancestorsChanged.css('overflow', '');
            }
          }
        });

        // Remove Caption + reset css settings on image
        $('.materialbox-caption').velocity({ opacity: 0 }, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false, easing: 'easeOutQuad',
          complete: function () {
            $(this).remove();
          }
        });
      }
    });
  };

  $(document).ready(function () {
    $('.materialboxed').materialbox();
  });
})(jQuery);
;(function ($) {

  $.fn.parallax = function () {
    var window_width = $(window).width();
    // Parallax Scripts
    return this.each(function (i) {
      var $this = $(this);
      $this.addClass('parallax');

      function updateParallax(initial) {
        var container_height;
        if (window_width < 601) {
          container_height = $this.height() > 0 ? $this.height() : $this.children("img").height();
        } else {
          container_height = $this.height() > 0 ? $this.height() : 500;
        }
        var $img = $this.children("img").first();
        var img_height = $img.height();
        var parallax_dist = img_height - container_height;
        var bottom = $this.offset().top + container_height;
        var top = $this.offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
        var parallax = Math.round(parallax_dist * percentScrolled);

        if (initial) {
          $img.css('display', 'block');
        }
        if (bottom > scrollTop && top < scrollTop + windowHeight) {
          $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
        }
      }

      // Wait for image load
      $this.children("img").one("load", function () {
        updateParallax(true);
      }).each(function () {
        if (this.complete) $(this).trigger("load");
      });

      $(window).scroll(function () {
        window_width = $(window).width();
        updateParallax(false);
      });

      $(window).resize(function () {
        window_width = $(window).width();
        updateParallax(false);
      });
    });
  };
})(jQuery);
;(function ($) {

  var methods = {
    init: function (options) {
      var defaults = {
        onShow: null,
        swipeable: false,
        responsiveThreshold: Infinity // breakpoint for swipeable
      };
      options = $.extend(defaults, options);
      var namespace = Materialize.objectSelectorString($(this));

      return this.each(function (i) {

        var uniqueNamespace = namespace + i;

        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $this = $(this),
            window_width = $(window).width();

        var $active,
            $content,
            $links = $this.find('li.tab a'),
            $tabs_width = $this.width(),
            $tabs_content = $(),
            $tabs_wrapper,
            $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length,
            $indicator,
            index = prev_index = 0,
            clicked = false,
            clickedTimeout,
            transition = 300;

        // Finds right attribute for indicator based on active tab.
        // el: jQuery Object
        var calcRightPos = function (el) {
          return Math.ceil($tabs_width - el.position().left - el[0].getBoundingClientRect().width - $this.scrollLeft());
        };

        // Finds left attribute for indicator based on active tab.
        // el: jQuery Object
        var calcLeftPos = function (el) {
          return Math.floor(el.position().left + $this.scrollLeft());
        };

        // Animates Indicator to active tab.
        // prev_index: Number
        var animateIndicator = function (prev_index) {
          if (index - prev_index >= 0) {
            $indicator.velocity({ "right": calcRightPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad' });
            $indicator.velocity({ "left": calcLeftPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad', delay: 90 });
          } else {
            $indicator.velocity({ "left": calcLeftPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad' });
            $indicator.velocity({ "right": calcRightPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad', delay: 90 });
          }
        };

        // Change swipeable according to responsive threshold
        if (options.swipeable) {
          if (window_width > options.responsiveThreshold) {
            options.swipeable = false;
          }
        }

        // If the location.hash matches one of the links, use that as the active tab.
        $active = $($links.filter('[href="' + location.hash + '"]'));

        // If no match is found, use the first link or any with class 'active' as the initial active tab.
        if ($active.length === 0) {
          $active = $(this).find('li.tab a.active').first();
        }
        if ($active.length === 0) {
          $active = $(this).find('li.tab a').first();
        }

        $active.addClass('active');
        index = $links.index($active);
        if (index < 0) {
          index = 0;
        }

        if ($active[0] !== undefined) {
          $content = $($active[0].hash);
          $content.addClass('active');
        }

        // append indicator then set indicator width to tab width
        if (!$this.find('.indicator').length) {
          $this.append('<li class="indicator"></li>');
        }
        $indicator = $this.find('.indicator');

        // we make sure that the indicator is at the end of the tabs
        $this.append($indicator);

        if ($this.is(":visible")) {
          // $indicator.css({"right": $tabs_width - ((index + 1) * $tab_width)});
          // $indicator.css({"left": index * $tab_width});
          setTimeout(function () {
            $indicator.css({ "right": calcRightPos($active) });
            $indicator.css({ "left": calcLeftPos($active) });
          }, 0);
        }
        $(window).off('resize.tabs-' + uniqueNamespace).on('resize.tabs-' + uniqueNamespace, function () {
          $tabs_width = $this.width();
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
          if (index < 0) {
            index = 0;
          }
          if ($tab_width !== 0 && $tabs_width !== 0) {
            $indicator.css({ "right": calcRightPos($active) });
            $indicator.css({ "left": calcLeftPos($active) });
          }
        });

        // Initialize Tabs Content.
        if (options.swipeable) {
          // TODO: Duplicate calls with swipeable? handle multiple div wrapping.
          $links.each(function () {
            var $curr_content = $(Materialize.escapeHash(this.hash));
            $curr_content.addClass('carousel-item');
            $tabs_content = $tabs_content.add($curr_content);
          });
          $tabs_wrapper = $tabs_content.wrapAll('<div class="tabs-content carousel"></div>');
          $tabs_content.css('display', '');
          $('.tabs-content.carousel').carousel({
            fullWidth: true,
            noWrap: true,
            onCycleTo: function (item) {
              if (!clicked) {
                var prev_index = index;
                index = $tabs_wrapper.index(item);
                $active.removeClass('active');
                $active = $links.eq(index);
                $active.addClass('active');
                animateIndicator(prev_index);
                if (typeof options.onShow === "function") {
                  options.onShow.call($this[0], $content);
                }
              }
            }
          });
        } else {
          // Hide the remaining content
          $links.not($active).each(function () {
            $(Materialize.escapeHash(this.hash)).hide();
          });
        }

        // Bind the click event handler
        $this.off('click.tabs').on('click.tabs', 'a', function (e) {
          if ($(this).parent().hasClass('disabled')) {
            e.preventDefault();
            return;
          }

          // Act as regular link if target attribute is specified.
          if (!!$(this).attr("target")) {
            return;
          }

          clicked = true;
          $tabs_width = $this.width();
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;

          // Make the old tab inactive.
          $active.removeClass('active');
          var $oldContent = $content;

          // Update the variables with the new link and content
          $active = $(this);
          $content = $(Materialize.escapeHash(this.hash));
          $links = $this.find('li.tab a');
          var activeRect = $active.position();

          // Make the tab active.
          $active.addClass('active');
          prev_index = index;
          index = $links.index($(this));
          if (index < 0) {
            index = 0;
          }
          // Change url to current tab
          // window.location.hash = $active.attr('href');

          // Swap content
          if (options.swipeable) {
            if ($tabs_content.length) {
              $tabs_content.carousel('set', index, function () {
                if (typeof options.onShow === "function") {
                  options.onShow.call($this[0], $content);
                }
              });
            }
          } else {
            if ($content !== undefined) {
              $content.show();
              $content.addClass('active');
              if (typeof options.onShow === "function") {
                options.onShow.call(this, $content);
              }
            }

            if ($oldContent !== undefined && !$oldContent.is($content)) {
              $oldContent.hide();
              $oldContent.removeClass('active');
            }
          }

          // Reset clicked state
          clickedTimeout = setTimeout(function () {
            clicked = false;
          }, transition);

          // Update indicator
          animateIndicator(prev_index);

          // Prevent the anchor's default click action
          e.preventDefault();
        });
      });
    },
    select_tab: function (id) {
      this.find('a[href="#' + id + '"]').trigger('click');
    }
  };

  $.fn.tabs = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tabs');
    }
  };

  $(document).ready(function () {
    $('ul.tabs').tabs();
  });
})(jQuery);
;(function ($) {
  $.fn.tooltip = function (options) {
    var timeout = null,
        margin = 5;

    // Defaults
    var defaults = {
      delay: 350,
      tooltip: '',
      position: 'bottom',
      html: false
    };

    // Remove tooltip from the activator
    if (options === "remove") {
      this.each(function () {
        $('#' + $(this).attr('data-tooltip-id')).remove();
        $(this).removeAttr('data-tooltip-id');
        $(this).off('mouseenter.tooltip mouseleave.tooltip');
      });
      return false;
    }

    options = $.extend(defaults, options);

    return this.each(function () {
      var tooltipId = Materialize.guid();
      var origin = $(this);

      // Destroy old tooltip
      if (origin.attr('data-tooltip-id')) {
        $('#' + origin.attr('data-tooltip-id')).remove();
      }

      origin.attr('data-tooltip-id', tooltipId);

      // Get attributes.
      var allowHtml, tooltipDelay, tooltipPosition, tooltipText, tooltipEl, backdrop;
      var setAttributes = function () {
        allowHtml = origin.attr('data-html') ? origin.attr('data-html') === 'true' : options.html;
        tooltipDelay = origin.attr('data-delay');
        tooltipDelay = tooltipDelay === undefined || tooltipDelay === '' ? options.delay : tooltipDelay;
        tooltipPosition = origin.attr('data-position');
        tooltipPosition = tooltipPosition === undefined || tooltipPosition === '' ? options.position : tooltipPosition;
        tooltipText = origin.attr('data-tooltip');
        tooltipText = tooltipText === undefined || tooltipText === '' ? options.tooltip : tooltipText;
      };
      setAttributes();

      var renderTooltipEl = function () {
        var tooltip = $('<div class="material-tooltip"></div>');

        // Create Text span
        if (allowHtml) {
          tooltipText = $('<span></span>').html(tooltipText);
        } else {
          tooltipText = $('<span></span>').text(tooltipText);
        }

        // Create tooltip
        tooltip.append(tooltipText).appendTo($('body')).attr('id', tooltipId);

        // Create backdrop
        backdrop = $('<div class="backdrop"></div>');
        backdrop.appendTo(tooltip);
        return tooltip;
      };
      tooltipEl = renderTooltipEl();

      // Destroy previously binded events
      origin.off('mouseenter.tooltip mouseleave.tooltip');
      // Mouse In
      var started = false,
          timeoutRef;
      origin.on({ 'mouseenter.tooltip': function (e) {
          var showTooltip = function () {
            setAttributes();
            started = true;
            tooltipEl.velocity('stop');
            backdrop.velocity('stop');
            tooltipEl.css({ visibility: 'visible', left: '0px', top: '0px' });

            // Tooltip positioning
            var originWidth = origin.outerWidth();
            var originHeight = origin.outerHeight();
            var tooltipHeight = tooltipEl.outerHeight();
            var tooltipWidth = tooltipEl.outerWidth();
            var tooltipVerticalMovement = '0px';
            var tooltipHorizontalMovement = '0px';
            var backdropOffsetWidth = backdrop[0].offsetWidth;
            var backdropOffsetHeight = backdrop[0].offsetHeight;
            var scaleXFactor = 8;
            var scaleYFactor = 8;
            var scaleFactor = 0;
            var targetTop, targetLeft, newCoordinates;

            if (tooltipPosition === "top") {
              // Top Position
              targetTop = origin.offset().top - tooltipHeight - margin;
              targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipVerticalMovement = '-10px';
              backdrop.css({
                bottom: 0,
                left: 0,
                borderRadius: '14px 14px 0 0',
                transformOrigin: '50% 100%',
                marginTop: tooltipHeight,
                marginLeft: tooltipWidth / 2 - backdropOffsetWidth / 2
              });
            }
            // Left Position
            else if (tooltipPosition === "left") {
                targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
                targetLeft = origin.offset().left - tooltipWidth - margin;
                newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

                tooltipHorizontalMovement = '-10px';
                backdrop.css({
                  top: '-7px',
                  right: 0,
                  width: '14px',
                  height: '14px',
                  borderRadius: '14px 0 0 14px',
                  transformOrigin: '95% 50%',
                  marginTop: tooltipHeight / 2,
                  marginLeft: tooltipWidth
                });
              }
              // Right Position
              else if (tooltipPosition === "right") {
                  targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
                  targetLeft = origin.offset().left + originWidth + margin;
                  newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

                  tooltipHorizontalMovement = '+10px';
                  backdrop.css({
                    top: '-7px',
                    left: 0,
                    width: '14px',
                    height: '14px',
                    borderRadius: '0 14px 14px 0',
                    transformOrigin: '5% 50%',
                    marginTop: tooltipHeight / 2,
                    marginLeft: '0px'
                  });
                } else {
                  // Bottom Position
                  targetTop = origin.offset().top + origin.outerHeight() + margin;
                  targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
                  newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                  tooltipVerticalMovement = '+10px';
                  backdrop.css({
                    top: 0,
                    left: 0,
                    marginLeft: tooltipWidth / 2 - backdropOffsetWidth / 2
                  });
                }

            // Set tooptip css placement
            tooltipEl.css({
              top: newCoordinates.y,
              left: newCoordinates.x
            });

            // Calculate Scale to fill
            scaleXFactor = Math.SQRT2 * tooltipWidth / parseInt(backdropOffsetWidth);
            scaleYFactor = Math.SQRT2 * tooltipHeight / parseInt(backdropOffsetHeight);
            scaleFactor = Math.max(scaleXFactor, scaleYFactor);

            tooltipEl.velocity({ translateY: tooltipVerticalMovement, translateX: tooltipHorizontalMovement }, { duration: 350, queue: false }).velocity({ opacity: 1 }, { duration: 300, delay: 50, queue: false });
            backdrop.css({ visibility: 'visible' }).velocity({ opacity: 1 }, { duration: 55, delay: 0, queue: false }).velocity({ scaleX: scaleFactor, scaleY: scaleFactor }, { duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad' });
          };

          timeoutRef = setTimeout(showTooltip, tooltipDelay); // End Interval

          // Mouse Out
        },
        'mouseleave.tooltip': function () {
          // Reset State
          started = false;
          clearTimeout(timeoutRef);

          // Animate back
          setTimeout(function () {
            if (started !== true) {
              tooltipEl.velocity({
                opacity: 0, translateY: 0, translateX: 0 }, { duration: 225, queue: false });
              backdrop.velocity({ opacity: 0, scaleX: 1, scaleY: 1 }, {
                duration: 225,
                queue: false,
                complete: function () {
                  backdrop.css({ visibility: 'hidden' });
                  tooltipEl.css({ visibility: 'hidden' });
                  started = false;
                }
              });
            }
          }, 225);
        }
      });
    });
  };

  var repositionWithinScreen = function (x, y, width, height) {
    var newX = x;
    var newY = y;

    if (newX < 0) {
      newX = 4;
    } else if (newX + width > window.innerWidth) {
      newX -= newX + width - window.innerWidth;
    }

    if (newY < 0) {
      newY = 4;
    } else if (newY + height > window.innerHeight + $(window).scrollTop) {
      newY -= newY + height - window.innerHeight;
    }

    return { x: newX, y: newY };
  };

  $(document).ready(function () {
    $('.tooltipped').tooltip();
  });
})(jQuery);
; /*!
  * Waves v0.6.4
  * http://fian.my.id/Waves
  *
  * Copyright 2014 Alfiana E. Sibuea and other contributors
  * Released under the MIT license
  * https://github.com/fians/Waves/blob/master/LICENSE
  */

;(function (window) {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
    var docElem,
        win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }

    return style;
  }

  var Effect = {

    // Effect delay
    duration: 750,

    show: function (e, element) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      var el = element || this;

      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple';
      el.appendChild(ripple);

      // Get click coordinate and element witdh
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';

      // Support for touch devices
      if ('touches' in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);

      // Set ripple position
      var rippleStyle = {
        'top': relativeY + 'px',
        'left': relativeX + 'px'
      };

      ripple.className = ripple.className + ' waves-notransition';
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.className = ripple.className.replace('waves-notransition', '');

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale;
      rippleStyle['-moz-transform'] = scale;
      rippleStyle['-ms-transform'] = scale;
      rippleStyle['-o-transform'] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = '1';

      rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['transition-duration'] = Effect.duration + 'ms';

      rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

      ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e) {
      TouchHandler.touchup(e);

      var el = this;
      var width = el.clientWidth * 1.4;

      // Get first ripple
      var ripple = null;
      var ripples = el.getElementsByClassName('waves-ripple');
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }

      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');

      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;

      if (delay < 0) {
        delay = 0;
      }

      // Fade out ripple after delay
      setTimeout(function () {
        var style = {
          'top': relativeY + 'px',
          'left': relativeX + 'px',
          'opacity': '0',

          // Duration
          '-webkit-transition-duration': Effect.duration + 'ms',
          '-moz-transition-duration': Effect.duration + 'ms',
          '-o-transition-duration': Effect.duration + 'ms',
          'transition-duration': Effect.duration + 'ms',
          '-webkit-transform': scale,
          '-moz-transform': scale,
          '-ms-transform': scale,
          '-o-transform': scale,
          'transform': scale
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },

    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];

        if (el.tagName.toLowerCase() === 'input') {
          var parent = el.parentNode;

          // If input already have parent just pass through
          if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
            continue;
          }

          // Put element class and style to the specified parent
          var wrapper = document.createElement('i');
          wrapper.className = el.className + ' waves-input-wrapper';

          var elementStyle = el.getAttribute('style');

          if (!elementStyle) {
            elementStyle = '';
          }

          wrapper.setAttribute('style', elementStyle);

          el.className = 'waves-button-input';
          el.removeAttribute('style');

          // Put element as child
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };

  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
      var allow = true;

      if (e.type === 'touchstart') {
        TouchHandler.touches += 1; //push
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1; //pop after 500ms
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };

  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
      Effect.show(e, element);

      if ('ontouchstart' in window) {
        element.addEventListener('touchend', Effect.hide, false);
        element.addEventListener('touchcancel', Effect.hide, false);
      }

      element.addEventListener('mouseup', Effect.hide, false);
      element.addEventListener('mouseleave', Effect.hide, false);
      element.addEventListener('dragend', Effect.hide, false);
    }
  }

  Waves.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));

    if ('ontouchstart' in window) {
      document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
  };

  /**
   * Attach Waves to an input element (or any element which doesn't
   * bubble mouseup/mousedown events).
   *   Intended to be used with dynamically loaded forms/inputs, or
   * where the user doesn't want a delegated click handler.
   */
  Waves.attach = function (element) {
    //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }

    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
  };

  window.Waves = Waves;

  document.addEventListener('DOMContentLoaded', function () {
    Waves.displayEffect();
  }, false);
})(window);
;(function ($) {
  'use strict';

  var _defaults = {
    displayLength: Infinity,
    inDuration: 300,
    outDuration: 375,
    className: undefined,
    completeCallback: undefined,
    activationPercent: 0.8
  };

  var Toast = function () {
    function Toast(message, displayLength, className, completeCallback) {
      _classCallCheck(this, Toast);

      if (!message) {
        return;
      }

      /**
       * Options for the toast
       * @member Toast#options
       */
      this.options = {
        displayLength: displayLength,
        className: className,
        completeCallback: completeCallback
      };

      this.options = $.extend({}, Toast.defaults, this.options);
      this.message = message;

      /**
       * Describes current pan state toast
       * @type {Boolean}
       */
      this.panning = false;

      /**
       * Time remaining until toast is removed
       */
      this.timeRemaining = this.options.displayLength;

      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }

      // Create new toast
      Toast._toasts.push(this);
      var toastElement = this.createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this._animateIn();
      this.setTimer();
    }

    _createClass(Toast, [{
      key: 'createToast',


      /**
       * Create toast and append it to toast container
       */
      value: function createToast() {
        var toast = document.createElement('div');
        toast.classList.add('toast');

        // Add custom classes onto toast
        if (this.options.className) {
          var classes = this.options.className.split(' ');
          var i = void 0,
              count = void 0;
          for (i = 0, count = classes.length; i < count; i++) {
            toast.classList.add(classes[i]);
          }
        }

        // Set content
        if (typeof HTMLElement === 'object' ? this.message instanceof HTMLElement : this.message && typeof this.message === 'object' && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === 'string') {
          toast.appendChild(this.message);

          // Check if it is jQuery object
        } else if (this.message instanceof jQuery) {
          $(toast).append(this.message);

          // Insert as text;
        } else {
          toast.innerHTML = this.message;
        }

        // Append toasft
        Toast._container.appendChild(toast);
        return toast;
      }

      /**
       * Animate in toast
       */

    }, {
      key: '_animateIn',
      value: function _animateIn() {
        // Animate toast in
        Vel(this.el, { top: 0, opacity: 1 }, {
          duration: 300,
          easing: 'easeOutCubic',
          queue: false
        });
      }

      /**
       * Create setInterval which automatically removes toast when timeRemaining >= 0
       * has been reached
       */

    }, {
      key: 'setTimer',
      value: function setTimer() {
        var _this3 = this;

        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function () {
            // If toast is not being dragged, decrease its time remaining
            if (!_this3.panning) {
              _this3.timeRemaining -= 20;
            }

            // Animate toast out
            if (_this3.timeRemaining <= 0) {
              _this3.remove();
            }
          }, 20);
        }
      }

      /**
       * Dismiss toast with animation
       */

    }, {
      key: 'remove',
      value: function remove() {
        var _this4 = this;

        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;

        if (this.wasSwiped) {
          this.el.style.transition = 'transform .05s, opacity .05s';
          this.el.style.transform = 'translateX(' + activationDistance + 'px)';
          this.el.style.opacity = 0;
        }

        Vel(this.el, { opacity: 0, marginTop: '-40px' }, {
          duration: this.options.outDuration,
          easing: 'easeOutExpo',
          queue: false,
          complete: function () {
            // Call the optional callback
            if (typeof _this4.options.completeCallback === 'function') {
              _this4.options.completeCallback();
            }
            // Remove toast from DOM
            _this4.el.parentNode.removeChild(_this4.el);
            Toast._toasts.splice(Toast._toasts.indexOf(_this4), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        });
      }
    }], [{
      key: '_createContainer',


      /**
       * Append toast container and add event handlers
       */
      value: function _createContainer() {
        var container = document.createElement('div');
        container.setAttribute('id', 'toast-container');

        // Add event handler
        container.addEventListener('touchstart', Toast._onDragStart);
        container.addEventListener('touchmove', Toast._onDragMove);
        container.addEventListener('touchend', Toast._onDragEnd);

        container.addEventListener('mousedown', Toast._onDragStart);
        document.addEventListener('mousemove', Toast._onDragMove);
        document.addEventListener('mouseup', Toast._onDragEnd);

        document.body.appendChild(container);
        Toast._container = container;
      }

      /**
       * Remove toast container and event handlers
       */

    }, {
      key: '_removeContainer',
      value: function _removeContainer() {
        // Add event handler
        document.removeEventListener('mousemove', Toast._onDragMove);
        document.removeEventListener('mouseup', Toast._onDragEnd);

        Toast._container.parentNode.removeChild(Toast._container);
        Toast._container = null;
      }

      /**
       * Begin drag handler
       * @param {Event} e
       */

    }, {
      key: '_onDragStart',
      value: function _onDragStart(e) {
        if (e.target && $(e.target).closest('.toast').length) {
          var $toast = $(e.target).closest('.toast');
          var toast = $toast[0].M_Toast;
          toast.panning = true;
          Toast._draggedToast = toast;
          toast.el.classList.add('panning');
          toast.el.style.transition = null;
          toast.startingXPos = Toast._xPos(e);
          toast.time = Date.now();
          toast.xPos = Toast._xPos(e);
        }
      }

      /**
       * Drag move handler
       * @param {Event} e
       */

    }, {
      key: '_onDragMove',
      value: function _onDragMove(e) {
        if (!!Toast._draggedToast) {
          e.preventDefault();
          var toast = Toast._draggedToast;
          toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
          toast.xPos = Toast._xPos(e);
          toast.velocityX = toast.deltaX / (Date.now() - toast.time);
          toast.time = Date.now();

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          toast.el.style.transform = 'translateX(' + totalDeltaX + 'px)';
          toast.el.style.opacity = 1 - Math.abs(totalDeltaX / activationDistance);
        }
      }

      /**
       * End drag handler
       * @param {Event} e
       */

    }, {
      key: '_onDragEnd',
      value: function _onDragEnd(e) {
        if (!!Toast._draggedToast) {
          var toast = Toast._draggedToast;
          toast.panning = false;
          toast.el.classList.remove('panning');

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;

          // Remove toast
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.remove();

            // Animate toast back to original position
          } else {
            toast.el.style.transition = 'transform .2s, opacity .2s';
            toast.el.style.transform = null;
            toast.el.style.opacity = null;
          }
          Toast._draggedToast = null;
        }
      }

      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       */

    }, {
      key: '_xPos',
      value: function _xPos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        // mouse event
        return e.clientX;
      }

      /**
       * Remove all toasts
       */

    }, {
      key: 'removeAll',
      value: function removeAll() {
        for (var toastIndex in Toast._toasts) {
          Toast._toasts[toastIndex].remove();
        }
      }
    }, {
      key: 'defaults',
      get: function () {
        return _defaults;
      }
    }]);

    return Toast;
  }();

  /**
   * @static
   * @memberof Toast
   * @type {Array.<Toast>}
   */


  Toast._toasts = [];

  /**
   * @static
   * @memberof Toast
   */
  Toast._container = null;

  /**
   * @static
   * @memberof Toast
   * @type {Toast}
   */
  Toast._draggedToast = null;

  window.Materialize.Toast = Toast;
  window.Materialize.toast = function (message, displayLength, className, completeCallback) {
    return new Toast(message, displayLength, className, completeCallback);
  };
})(jQuery);
;(function ($) {

  var methods = {
    init: function (options) {
      var defaults = {
        menuWidth: 300,
        edge: 'left',
        closeOnClick: false,
        draggable: true,
        onOpen: null,
        onClose: null
      };
      options = $.extend(defaults, options);

      $(this).each(function () {
        var $this = $(this);
        var menuId = $this.attr('data-activates');
        var menu = $("#" + menuId);

        // Set to width
        if (options.menuWidth != 300) {
          menu.css('width', options.menuWidth);
        }

        // Add Touch Area
        var $dragTarget = $('.drag-target[data-sidenav="' + menuId + '"]');
        if (options.draggable) {
          // Regenerate dragTarget
          if ($dragTarget.length) {
            $dragTarget.remove();
          }

          $dragTarget = $('<div class="drag-target"></div>').attr('data-sidenav', menuId);
          $('body').append($dragTarget);
        } else {
          $dragTarget = $();
        }

        if (options.edge == 'left') {
          menu.css('transform', 'translateX(-100%)');
          $dragTarget.css({ 'left': 0 }); // Add Touch Area
        } else {
          menu.addClass('right-aligned') // Change text-alignment to right
          .css('transform', 'translateX(100%)');
          $dragTarget.css({ 'right': 0 }); // Add Touch Area
        }

        // If fixed sidenav, bring menu out
        if (menu.hasClass('fixed')) {
          if (window.innerWidth > 992) {
            menu.css('transform', 'translateX(0)');
          }
        }

        // Window resize to reset on large screens fixed
        if (menu.hasClass('fixed')) {
          $(window).resize(function () {
            if (window.innerWidth > 992) {
              // Close menu if window is resized bigger than 992 and user has fixed sidenav
              if ($('#sidenav-overlay').length !== 0 && menuOut) {
                removeMenu(true);
              } else {
                // menu.removeAttr('style');
                menu.css('transform', 'translateX(0%)');
                // menu.css('width', options.menuWidth);
              }
            } else if (menuOut === false) {
              if (options.edge === 'left') {
                menu.css('transform', 'translateX(-100%)');
              } else {
                menu.css('transform', 'translateX(100%)');
              }
            }
          });
        }

        // if closeOnClick, then add close event for all a tags in side sideNav
        if (options.closeOnClick === true) {
          menu.on("click.itemclick", "a:not(.collapsible-header)", function () {
            if (!(window.innerWidth > 992 && menu.hasClass('fixed'))) {
              removeMenu();
            }
          });
        }

        var removeMenu = function (restoreNav) {
          panning = false;
          menuOut = false;
          // Reenable scrolling
          $('body').css({
            overflow: '',
            width: ''
          });

          $('#sidenav-overlay').velocity({ opacity: 0 }, { duration: 200,
            queue: false, easing: 'easeOutQuad',
            complete: function () {
              $(this).remove();
            } });
          if (options.edge === 'left') {
            // Reset phantom div
            $dragTarget.css({ width: '', right: '', left: '0' });
            menu.velocity({ 'translateX': '-100%' }, { duration: 200,
              queue: false,
              easing: 'easeOutCubic',
              complete: function () {
                if (restoreNav === true) {
                  // Restore Fixed sidenav
                  menu.removeAttr('style');
                  menu.css('width', options.menuWidth);
                }
              }

            });
          } else {
            // Reset phantom div
            $dragTarget.css({ width: '', right: '0', left: '' });
            menu.velocity({ 'translateX': '100%' }, { duration: 200,
              queue: false,
              easing: 'easeOutCubic',
              complete: function () {
                if (restoreNav === true) {
                  // Restore Fixed sidenav
                  menu.removeAttr('style');
                  menu.css('width', options.menuWidth);
                }
              }
            });
          }

          // Callback
          if (typeof options.onClose === 'function') {
            options.onClose.call(this, menu);
          }
        };

        // Touch Event
        var panning = false;
        var menuOut = false;

        if (options.draggable) {
          $dragTarget.on('click', function () {
            if (menuOut) {
              removeMenu();
            }
          });

          $dragTarget.hammer({
            prevent_default: false
          }).on('pan', function (e) {

            if (e.gesture.pointerType == "touch") {

              var direction = e.gesture.direction;
              var x = e.gesture.center.x;
              var y = e.gesture.center.y;
              var velocityX = e.gesture.velocityX;

              // Vertical scroll bugfix
              if (x === 0 && y === 0) {
                return;
              }

              // Disable Scrolling
              var $body = $('body');
              var $overlay = $('#sidenav-overlay');
              var oldWidth = $body.innerWidth();
              $body.css('overflow', 'hidden');
              $body.width(oldWidth);

              // If overlay does not exist, create one and if it is clicked, close menu
              if ($overlay.length === 0) {
                $overlay = $('<div id="sidenav-overlay"></div>');
                $overlay.css('opacity', 0).click(function () {
                  removeMenu();
                });

                // Run 'onOpen' when sidenav is opened via touch/swipe if applicable
                if (typeof options.onOpen === 'function') {
                  options.onOpen.call(this, menu);
                }

                $('body').append($overlay);
              }

              // Keep within boundaries
              if (options.edge === 'left') {
                if (x > options.menuWidth) {
                  x = options.menuWidth;
                } else if (x < 0) {
                  x = 0;
                }
              }

              if (options.edge === 'left') {
                // Left Direction
                if (x < options.menuWidth / 2) {
                  menuOut = false;
                }
                // Right Direction
                else if (x >= options.menuWidth / 2) {
                    menuOut = true;
                  }
                menu.css('transform', 'translateX(' + (x - options.menuWidth) + 'px)');
              } else {
                // Left Direction
                if (x < window.innerWidth - options.menuWidth / 2) {
                  menuOut = true;
                }
                // Right Direction
                else if (x >= window.innerWidth - options.menuWidth / 2) {
                    menuOut = false;
                  }
                var rightPos = x - options.menuWidth / 2;
                if (rightPos < 0) {
                  rightPos = 0;
                }

                menu.css('transform', 'translateX(' + rightPos + 'px)');
              }

              // Percentage overlay
              var overlayPerc;
              if (options.edge === 'left') {
                overlayPerc = x / options.menuWidth;
                $overlay.velocity({ opacity: overlayPerc }, { duration: 10, queue: false, easing: 'easeOutQuad' });
              } else {
                overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
                $overlay.velocity({ opacity: overlayPerc }, { duration: 10, queue: false, easing: 'easeOutQuad' });
              }
            }
          }).on('panend', function (e) {

            if (e.gesture.pointerType == "touch") {
              var $overlay = $('#sidenav-overlay');
              var velocityX = e.gesture.velocityX;
              var x = e.gesture.center.x;
              var leftPos = x - options.menuWidth;
              var rightPos = x - options.menuWidth / 2;
              if (leftPos > 0) {
                leftPos = 0;
              }
              if (rightPos < 0) {
                rightPos = 0;
              }
              panning = false;

              if (options.edge === 'left') {
                // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
                if (menuOut && velocityX <= 0.3 || velocityX < -0.5) {
                  // Return menu to open
                  if (leftPos !== 0) {
                    menu.velocity({ 'translateX': [0, leftPos] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                  }

                  $overlay.velocity({ opacity: 1 }, { duration: 50, queue: false, easing: 'easeOutQuad' });
                  $dragTarget.css({ width: '50%', right: 0, left: '' });
                  menuOut = true;
                } else if (!menuOut || velocityX > 0.3) {
                  // Enable Scrolling
                  $('body').css({
                    overflow: '',
                    width: ''
                  });
                  // Slide menu closed
                  menu.velocity({ 'translateX': [-1 * options.menuWidth - 10, leftPos] }, { duration: 200, queue: false, easing: 'easeOutQuad' });
                  $overlay.velocity({ opacity: 0 }, { duration: 200, queue: false, easing: 'easeOutQuad',
                    complete: function () {
                      // Run 'onClose' when sidenav is closed via touch/swipe if applicable
                      if (typeof options.onClose === 'function') {
                        options.onClose.call(this, menu);
                      }

                      $(this).remove();
                    } });
                  $dragTarget.css({ width: '10px', right: '', left: 0 });
                }
              } else {
                if (menuOut && velocityX >= -0.3 || velocityX > 0.5) {
                  // Return menu to open
                  if (rightPos !== 0) {
                    menu.velocity({ 'translateX': [0, rightPos] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                  }

                  $overlay.velocity({ opacity: 1 }, { duration: 50, queue: false, easing: 'easeOutQuad' });
                  $dragTarget.css({ width: '50%', right: '', left: 0 });
                  menuOut = true;
                } else if (!menuOut || velocityX < -0.3) {
                  // Enable Scrolling
                  $('body').css({
                    overflow: '',
                    width: ''
                  });

                  // Slide menu closed
                  menu.velocity({ 'translateX': [options.menuWidth + 10, rightPos] }, { duration: 200, queue: false, easing: 'easeOutQuad' });
                  $overlay.velocity({ opacity: 0 }, { duration: 200, queue: false, easing: 'easeOutQuad',
                    complete: function () {
                      // Run 'onClose' when sidenav is closed via touch/swipe if applicable
                      if (typeof options.onClose === 'function') {
                        options.onClose.call(this, menu);
                      }

                      $(this).remove();
                    } });
                  $dragTarget.css({ width: '10px', right: 0, left: '' });
                }
              }
            }
          });
        }

        $this.off('click.sidenav').on('click.sidenav', function () {
          if (menuOut === true) {
            menuOut = false;
            panning = false;
            removeMenu();
          } else {

            // Disable Scrolling
            var $body = $('body');
            var $overlay = $('<div id="sidenav-overlay"></div>');
            var oldWidth = $body.innerWidth();
            $body.css('overflow', 'hidden');
            $body.width(oldWidth);

            // Push current drag target on top of DOM tree
            $('body').append($dragTarget);

            if (options.edge === 'left') {
              $dragTarget.css({ width: '50%', right: 0, left: '' });
              menu.velocity({ 'translateX': [0, -1 * options.menuWidth] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            } else {
              $dragTarget.css({ width: '50%', right: '', left: 0 });
              menu.velocity({ 'translateX': [0, options.menuWidth] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }

            // Overlay close on click
            $overlay.css('opacity', 0).click(function () {
              menuOut = false;
              panning = false;
              removeMenu();
              $overlay.velocity({ opacity: 0 }, { duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  $(this).remove();
                }
              });
            });

            // Append body
            $('body').append($overlay);
            $overlay.velocity({ opacity: 1 }, { duration: 300, queue: false, easing: 'easeOutQuad',
              complete: function () {
                menuOut = true;
                panning = false;
              }
            });

            // Callback
            if (typeof options.onOpen === 'function') {
              options.onOpen.call(this, menu);
            }
          }

          return false;
        });
      });
    },
    destroy: function () {
      var $overlay = $('#sidenav-overlay');
      var $dragTarget = $('.drag-target[data-sidenav="' + $(this).attr('data-activates') + '"]');
      $overlay.trigger('click');
      $dragTarget.remove();
      $(this).off('click');
      $overlay.remove();
    },
    show: function () {
      this.trigger('click');
    },
    hide: function () {
      $('#sidenav-overlay').trigger('click');
    }
  };

  $.fn.sideNav = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.sideNav');
    }
  }; // Plugin end
})(jQuery);
; /**
  * Extend jquery with a scrollspy plugin.
  * This watches the window scroll and fires events when elements are scrolled into viewport.
  *
  * throttle() and getTime() taken from Underscore.js
  * https://github.com/jashkenas/underscore
  *
  * @author Copyright 2013 John Smart
  * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
  * @see https://github.com/thesmart
  * @version 0.1.2
  */
(function ($) {

  var jWindow = $(window);
  var elements = [];
  var elementsInView = [];
  var isSpying = false;
  var ticks = 0;
  var unique_id = 1;
  var offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0

    /**
     * Find elements that are within the boundary
     * @param {number} top
     * @param {number} right
     * @param {number} bottom
     * @param {number} left
     * @return {jQuery}		A collection of elements
     */
  };function findElements(top, right, bottom, left) {
    var hits = $();
    $.each(elements, function (i, element) {
      if (element.height() > 0) {
        var elTop = element.offset().top,
            elLeft = element.offset().left,
            elRight = elLeft + element.width(),
            elBottom = elTop + element.height();

        var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < top);

        if (isIntersect) {
          hits.push(element);
        }
      }
    });

    return hits;
  }

  /**
   * Called when the user scrolls the window
   */
  function onScroll(scrollOffset) {
    // unique tick id
    ++ticks;

    // viewport rectangle
    var top = jWindow.scrollTop(),
        left = jWindow.scrollLeft(),
        right = left + jWindow.width(),
        bottom = top + jWindow.height();

    // determine which elements are in view
    var intersections = findElements(top + offset.top + scrollOffset || 200, right + offset.right, bottom + offset.bottom, left + offset.left);
    $.each(intersections, function (i, element) {

      var lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick != 'number') {
        // entered into view
        element.triggerHandler('scrollSpy:enter');
      }

      // update tick id
      element.data('scrollSpy:ticks', ticks);
    });

    // determine which elements are no longer in view
    $.each(elementsInView, function (i, element) {
      var lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick == 'number' && lastTick !== ticks) {
        // exited from view
        element.triggerHandler('scrollSpy:exit');
        element.data('scrollSpy:ticks', null);
      }
    });

    // remember elements in view for next tick
    elementsInView = intersections;
  }

  /**
   * Called when window is resized
  */
  function onWinSize() {
    jWindow.trigger('scrollSpy:winSize');
  }

  /**
   * Enables ScrollSpy using a selector
   * @param {jQuery|string} selector  The elements collection, or a selector
   * @param {Object=} options	Optional.
         throttle : number -> scrollspy throttling. Default: 100 ms
         offsetTop : number -> offset from top. Default: 0
         offsetRight : number -> offset from right. Default: 0
         offsetBottom : number -> offset from bottom. Default: 0
         offsetLeft : number -> offset from left. Default: 0
  			activeClass : string -> Class name to be added to the active link. Default: active
   * @returns {jQuery}
   */
  $.scrollSpy = function (selector, options) {
    var defaults = {
      throttle: 100,
      scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
      activeClass: 'active',
      getActiveElement: function (id) {
        return 'a[href="#' + id + '"]';
      }
    };
    options = $.extend(defaults, options);

    var visible = [];
    selector = $(selector);
    selector.each(function (i, element) {
      elements.push($(element));
      $(element).data("scrollSpy:id", i);
      // Smooth scroll to section
      $('a[href="#' + $(element).attr('id') + '"]').click(function (e) {
        e.preventDefault();
        var offset = $(Materialize.escapeHash(this.hash)).offset().top + 1;
        $('html, body').animate({ scrollTop: offset - options.scrollOffset }, { duration: 400, queue: false, easing: 'easeOutCubic' });
      });
    });

    offset.top = options.offsetTop || 0;
    offset.right = options.offsetRight || 0;
    offset.bottom = options.offsetBottom || 0;
    offset.left = options.offsetLeft || 0;

    var throttledScroll = Materialize.throttle(function () {
      onScroll(options.scrollOffset);
    }, options.throttle || 100);
    var readyScroll = function () {
      $(document).ready(throttledScroll);
    };

    if (!isSpying) {
      jWindow.on('scroll', readyScroll);
      jWindow.on('resize', readyScroll);
      isSpying = true;
    }

    // perform a scan once, after current execution context, and after dom is ready
    setTimeout(readyScroll, 0);

    selector.on('scrollSpy:enter', function () {
      visible = $.grep(visible, function (value) {
        return value.height() != 0;
      });

      var $this = $(this);

      if (visible[0]) {
        $(options.getActiveElement(visible[0].attr('id'))).removeClass(options.activeClass);
        if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
          visible.unshift($(this));
        } else {
          visible.push($(this));
        }
      } else {
        visible.push($(this));
      }

      $(options.getActiveElement(visible[0].attr('id'))).addClass(options.activeClass);
    });
    selector.on('scrollSpy:exit', function () {
      visible = $.grep(visible, function (value) {
        return value.height() != 0;
      });

      if (visible[0]) {
        $(options.getActiveElement(visible[0].attr('id'))).removeClass(options.activeClass);
        var $this = $(this);
        visible = $.grep(visible, function (value) {
          return value.attr('id') != $this.attr('id');
        });
        if (visible[0]) {
          // Check if empty
          $(options.getActiveElement(visible[0].attr('id'))).addClass(options.activeClass);
        }
      }
    });

    return selector;
  };

  /**
   * Listen for window resize events
   * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
   * @returns {jQuery}		$(window)
   */
  $.winSizeSpy = function (options) {
    $.winSizeSpy = function () {
      return jWindow;
    }; // lock from multiple calls
    options = options || {
      throttle: 100
    };
    return jWindow.on('resize', Materialize.throttle(onWinSize, options.throttle || 100));
  };

  /**
   * Enables ScrollSpy on a collection of elements
   * e.g. $('.scrollSpy').scrollSpy()
   * @param {Object=} options	Optional.
  										throttle : number -> scrollspy throttling. Default: 100 ms
  										offsetTop : number -> offset from top. Default: 0
  										offsetRight : number -> offset from right. Default: 0
  										offsetBottom : number -> offset from bottom. Default: 0
  										offsetLeft : number -> offset from left. Default: 0
   * @returns {jQuery}
   */
  $.fn.scrollSpy = function (options) {
    return $.scrollSpy($(this), options);
  };
})(jQuery);
;(function ($) {
  $(document).ready(function () {

    // Function to update labels of text fields
    Materialize.updateTextFields = function () {
      var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
      $(input_selector).each(function (index, element) {
        var $this = $(this);
        if ($(element).val().length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== undefined) {
          $this.siblings('label').addClass('active');
        } else if ($(element)[0].validity) {
          $this.siblings('label').toggleClass('active', $(element)[0].validity.badInput === true);
        } else {
          $this.siblings('label').removeClass('active');
        }
      });
    };

    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if ($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
        $(this).siblings('label').addClass('active');
      }
      validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function () {
      Materialize.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function (e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function () {
          if ($(this).attr('value') === '') {
            $(this).siblings('label').removeClass('active');
          }
        });

        // Reset select
        formReset.find('select.initialized').each(function () {
          var reset_text = formReset.find('option[selected]').text();
          formReset.siblings('input.select-dropdown').val(reset_text);
        });
      }
    });

    // Add active when element has focus
    $(document).on('focus', input_selector, function () {
      $(this).siblings('label, .prefix').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      var $inputElement = $(this);
      var selector = ".prefix";

      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
        selector += ", label";
      }

      $inputElement.siblings(selector).removeClass('active');

      validate_field($inputElement);
    });

    window.validate_field = function (object) {
      var hasLength = object.attr('data-length') !== undefined;
      var lenAttr = parseInt(object.attr('data-length'));
      var len = object.val().length;

      if (object.val().length === 0 && object[0].validity.badInput === false && !object.is(':required')) {
        if (object.hasClass('validate')) {
          object.removeClass('valid');
          object.removeClass('invalid');
        }
      } else {
        if (object.hasClass('validate')) {
          // Check for character counter attributes
          if (object.is(':valid') && hasLength && len <= lenAttr || object.is(':valid') && !hasLength) {
            object.removeClass('invalid');
            object.addClass('valid');
          } else {
            object.removeClass('valid');
            object.addClass('invalid');
          }
        }
      }
    };

    // Radio and Checkbox focus class
    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup.radio', radio_checkbox, function (e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === 9) {
        $(this).addClass('tabbed');
        var $this = $(this);
        $this.one('blur', function (e) {

          $(this).removeClass('tabbed');
        });
        return;
      }
    });

    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }
    var text_area_selector = '.materialize-textarea';

    function textareaAutoResize($textarea) {
      // Set font properties of hiddenDiv

      var fontFamily = $textarea.css('font-family');
      var fontSize = $textarea.css('font-size');
      var lineHeight = $textarea.css('line-height');
      var padding = $textarea.css('padding');

      if (fontSize) {
        hiddenDiv.css('font-size', fontSize);
      }
      if (fontFamily) {
        hiddenDiv.css('font-family', fontFamily);
      }
      if (lineHeight) {
        hiddenDiv.css('line-height', lineHeight);
      }
      if (padding) {
        hiddenDiv.css('padding', padding);
      }

      // Set original-height, if none
      if (!$textarea.data('original-height')) {
        $textarea.data('original-height', $textarea.height());
      }

      if ($textarea.attr('wrap') === 'off') {
        hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
      }

      hiddenDiv.text($textarea.val() + '\n');
      var content = hiddenDiv.html().replace(/\n/g, '<br>');
      hiddenDiv.html(content);

      // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      if ($textarea.is(':visible')) {
        hiddenDiv.css('width', $textarea.width());
      } else {
        hiddenDiv.css('width', $(window).width() / 2);
      }

      /**
       * Resize if the new height is greater than the
       * original height of the textarea
       */
      if ($textarea.data('original-height') <= hiddenDiv.height()) {
        $textarea.css('height', hiddenDiv.height());
      } else if ($textarea.val().length < $textarea.data('previous-length')) {
        /**
         * In case the new height is less than original height, it
         * means the textarea has less text than before
         * So we set the height to the original one
         */
        $textarea.css('height', $textarea.data('original-height'));
      }
      $textarea.data('previous-length', $textarea.val().length);
    }

    $(text_area_selector).each(function () {
      var $textarea = $(this);
      /**
       * Instead of resizing textarea on document load,
       * store the original height and the original length
       */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', $textarea.val().length);
    });

    $('body').on('keyup keydown autoresize', text_area_selector, function () {
      textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      var file_field = $(this).closest('.file-field');
      var path_input = file_field.find('input.file-path');
      var files = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input.val(file_names.join(", "));
      path_input.trigger('change');
    });

    /****************
    *  Range Input  *
    ****************/

    var range_type = 'input[type=range]';
    var range_mousedown = false;
    var left;

    $(range_type).each(function () {
      var thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).after(thumb);
    });

    var showRangeBubble = function (thumb) {
      var paddingLeft = parseInt(thumb.parent().css('padding-left'));
      var marginLeft = -7 + paddingLeft + 'px';
      thumb.velocity({ height: "30px", width: "30px", top: "-30px", marginLeft: marginLeft }, { duration: 300, easing: 'easeOutExpo' });
    };

    var calcRangeOffset = function (range) {
      var width = range.width() - 15;
      var max = parseFloat(range.attr('max'));
      var min = parseFloat(range.attr('min'));
      var percent = (parseFloat(range.val()) - min) / (max - min);
      return percent * width;
    };

    var range_wrapper = '.range-field';
    $(document).on('change', range_type, function (e) {
      var thumb = $(this).siblings('.thumb');
      thumb.find('.value').html($(this).val());

      if (!thumb.hasClass('active')) {
        showRangeBubble(thumb);
      }

      var offsetLeft = calcRangeOffset($(this));
      thumb.addClass('active').css('left', offsetLeft);
    });

    $(document).on('mousedown touchstart', range_type, function (e) {
      var thumb = $(this).siblings('.thumb');

      // If thumb indicator does not exist yet, create it
      if (thumb.length <= 0) {
        thumb = $('<span class="thumb"><span class="value"></span></span>');
        $(this).after(thumb);
      }

      // Set indicator value
      thumb.find('.value').html($(this).val());

      range_mousedown = true;
      $(this).addClass('active');

      if (!thumb.hasClass('active')) {
        showRangeBubble(thumb);
      }

      if (e.type !== 'input') {
        var offsetLeft = calcRangeOffset($(this));
        thumb.addClass('active').css('left', offsetLeft);
      }
    });

    $(document).on('mouseup touchend', range_wrapper, function () {
      range_mousedown = false;
      $(this).removeClass('active');
    });

    $(document).on('input mousemove touchmove', range_wrapper, function (e) {
      var thumb = $(this).children('.thumb');
      var left;
      var input = $(this).find(range_type);

      if (range_mousedown) {
        if (!thumb.hasClass('active')) {
          showRangeBubble(thumb);
        }

        var offsetLeft = calcRangeOffset(input);
        thumb.addClass('active').css('left', offsetLeft);
        thumb.find('.value').html(thumb.siblings(range_type).val());
      }
    });

    $(document).on('mouseout touchleave', range_wrapper, function () {
      if (!range_mousedown) {

        var thumb = $(this).children('.thumb');
        var paddingLeft = parseInt($(this).css('padding-left'));
        var marginLeft = 7 + paddingLeft + 'px';

        if (thumb.hasClass('active')) {
          thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: marginLeft }, { duration: 100 });
        }
        thumb.removeClass('active');
      }
    });

    /**************************
     * Auto complete plugin  *
     *************************/
    $.fn.autocomplete = function (options) {
      // Defaults
      var defaults = {
        data: {},
        limit: Infinity,
        onAutocomplete: null,
        minLength: 1
      };

      options = $.extend(defaults, options);

      return this.each(function () {
        var $input = $(this);
        var data = options.data,
            count = 0,
            activeIndex = -1,
            oldVal,
            $inputDiv = $input.closest('.input-field'); // Div to append on

        // Check if data isn't empty
        if (!$.isEmptyObject(data)) {
          var $autocomplete = $('<ul class="autocomplete-content dropdown-content"></ul>');
          var $oldAutocomplete;

          // Append autocomplete element.
          // Prevent double structure init.
          if ($inputDiv.length) {
            $oldAutocomplete = $inputDiv.children('.autocomplete-content.dropdown-content').first();
            if (!$oldAutocomplete.length) {
              $inputDiv.append($autocomplete); // Set ul in body
            }
          } else {
            $oldAutocomplete = $input.next('.autocomplete-content.dropdown-content');
            if (!$oldAutocomplete.length) {
              $input.after($autocomplete);
            }
          }
          if ($oldAutocomplete.length) {
            $autocomplete = $oldAutocomplete;
          }

          // Highlight partial match.
          var highlight = function (string, $el) {
            var img = $el.find('img');
            var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
                matchEnd = matchStart + string.length - 1,
                beforeMatch = $el.text().slice(0, matchStart),
                matchText = $el.text().slice(matchStart, matchEnd + 1),
                afterMatch = $el.text().slice(matchEnd + 1);
            $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
            if (img.length) {
              $el.prepend(img);
            }
          };

          // Reset current element position
          var resetCurrentElement = function () {
            activeIndex = -1;
            $autocomplete.find('.active').removeClass('active');
          };

          // Remove autocomplete elements
          var removeAutocomplete = function () {
            $autocomplete.empty();
            resetCurrentElement();
            oldVal = undefined;
          };

          $input.off('blur.autocomplete').on('blur.autocomplete', function () {
            removeAutocomplete();
          });

          // Perform search
          $input.off('keyup.autocomplete focus.autocomplete').on('keyup.autocomplete focus.autocomplete', function (e) {
            // Reset count.
            count = 0;
            var val = $input.val().toLowerCase();

            // Don't capture enter or arrow key usage.
            if (e.which === 13 || e.which === 38 || e.which === 40) {
              return;
            }

            // Check if the input isn't empty
            if (oldVal !== val) {
              removeAutocomplete();

              if (val.length >= options.minLength) {
                for (var key in data) {
                  if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
                    // Break if past limit
                    if (count >= options.limit) {
                      break;
                    }

                    var autocompleteOption = $('<li></li>');
                    if (!!data[key]) {
                      autocompleteOption.append('<img src="' + data[key] + '" class="right circle"><span>' + key + '</span>');
                    } else {
                      autocompleteOption.append('<span>' + key + '</span>');
                    }

                    $autocomplete.append(autocompleteOption);
                    highlight(val, autocompleteOption);
                    count++;
                  }
                }
              }
            }

            // Update oldVal
            oldVal = val;
          });

          $input.off('keydown.autocomplete').on('keydown.autocomplete', function (e) {
            // Arrow keys and enter key usage
            var keyCode = e.which,
                liElement,
                numItems = $autocomplete.children('li').length,
                $active = $autocomplete.children('.active').first();

            // select element on Enter
            if (keyCode === 13 && activeIndex >= 0) {
              liElement = $autocomplete.children('li').eq(activeIndex);
              if (liElement.length) {
                liElement.trigger('mousedown.autocomplete');
                e.preventDefault();
              }
              return;
            }

            // Capture up and down key
            if (keyCode === 38 || keyCode === 40) {
              e.preventDefault();

              if (keyCode === 38 && activeIndex > 0) {
                activeIndex--;
              }

              if (keyCode === 40 && activeIndex < numItems - 1) {
                activeIndex++;
              }

              $active.removeClass('active');
              if (activeIndex >= 0) {
                $autocomplete.children('li').eq(activeIndex).addClass('active');
              }
            }
          });

          // Set input value
          $autocomplete.off('mousedown.autocomplete touchstart.autocomplete').on('mousedown.autocomplete touchstart.autocomplete', 'li', function () {
            var text = $(this).text().trim();
            $input.val(text);
            $input.trigger('change');
            removeAutocomplete();

            // Handle onAutocomplete callback.
            if (typeof options.onAutocomplete === "function") {
              options.onAutocomplete.call(this, text);
            }
          });

          // Empty data
        } else {
          $input.off('keyup.autocomplete focus.autocomplete');
        }
      });
    };
  }); // End of $(document).ready

  /*******************
   *  Select Plugin  *
   ******************/
  $.fn.material_select = function (callback) {
    $(this).each(function () {
      var $select = $(this);

      if ($select.hasClass('browser-default')) {
        return; // Continue to next (return false breaks out of entire loop)
      }

      var multiple = $select.attr('multiple') ? true : false,
          lastID = $select.attr('data-select-id'); // Tear down structure if Select needs to be rebuilt

      if (lastID) {
        $select.parent().find('span.caret').remove();
        $select.parent().find('input').remove();

        $select.unwrap();
        $('ul#select-options-' + lastID).remove();
      }

      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
      if (callback === 'destroy') {
        $select.removeAttr('data-select-id').removeClass('initialized');
        $(window).off('click.select');
        return;
      }

      var uniqueID = Materialize.guid();
      $select.attr('data-select-id', uniqueID);
      var wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      if ($select.is(':disabled')) wrapper.addClass('disabled');
      var options = $('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
          selectChildren = $select.children('option, optgroup'),
          valuesSelected = [],
          optionsHover = false;

      var label = $select.find('option:selected').html() || $select.find('option:first').html() || "";

      // Function that renders and appends the option taking into
      // account type and possible image icon.
      var appendOptionWithIcon = function (select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.is(':disabled') ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
        var multipleCheckbox = multiple ? '<input type="checkbox"' + disabledClass + '/><label></label>' : '';

        // add icons
        var icon_url = option.data('icon');
        var classes = option.attr('class');
        if (!!icon_url) {
          var classString = '';
          if (!!classes) classString = ' class="' + classes + '"';

          // Check for multiple type.
          options.append($('<li class="' + disabledClass + optgroupClass + '"><img alt="" src="' + icon_url + '"' + classString + '><span>' + multipleCheckbox + option.html() + '</span></li>'));
          return true;
        }

        // Check for multiple type.
        options.append($('<li class="' + disabledClass + optgroupClass + '"><span>' + multipleCheckbox + option.html() + '</span></li>'));
      };

      /* Create dropdown structure. */
      if (selectChildren.length) {
        selectChildren.each(function () {
          if ($(this).is('option')) {
            // Direct descendant option.
            if (multiple) {
              appendOptionWithIcon($select, $(this), 'multiple');
            } else {
              appendOptionWithIcon($select, $(this));
            }
          } else if ($(this).is('optgroup')) {
            // Optgroup.
            var selectOptions = $(this).children('option');
            options.append($('<li class="optgroup"><span>' + $(this).attr('label') + '</span></li>'));

            selectOptions.each(function () {
              appendOptionWithIcon($select, $(this), 'optgroup-option');
            });
          }
        });
      }

      options.find('li:not(.optgroup)').each(function (i) {
        $(this).click(function (e) {
          // Check if option element is disabled
          if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
            var selected = true;

            if (multiple) {
              $('input[type="checkbox"]', this).prop('checked', function (i, v) {
                return !v;
              });
              selected = toggleEntryFromArray(valuesSelected, i, $select);
              $newSelect.trigger('focus');
            } else {
              options.find('li').removeClass('active');
              $(this).toggleClass('active');
              $newSelect.val($(this).text());
            }

            activateOption(options, $(this));
            $select.find('option').eq(i).prop('selected', selected);
            // Trigger onchange() event
            $select.trigger('change');
            if (typeof callback !== 'undefined') callback();
          }

          e.stopPropagation();
        });
      });

      // Wrap Elements
      $select.wrap(wrapper);
      // Add Select Display Element
      var dropdownIcon = $('<span class="caret">&#9660;</span>');

      // escape double quotes
      var sanitizedLabelHtml = label.replace(/"/g, '&quot;');

      var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + ($select.is(':disabled') ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);

      $newSelect.after(options);
      // Check if section element is disabled
      if (!$select.is(':disabled')) {
        $newSelect.dropdown({ 'hover': false });
      }

      // Copy tabindex
      if ($select.attr('tabindex')) {
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      }

      $select.addClass('initialized');

      $newSelect.on({
        'focus': function () {
          if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
            $('input.select-dropdown').trigger('close');
            $(window).off('click.select');
          }
          if (!options.is(':visible')) {
            $(this).trigger('open', ['focus']);
            var label = $(this).val();
            if (multiple && label.indexOf(',') >= 0) {
              label = label.split(',')[0];
            }

            var selectedOption = options.find('li').filter(function () {
              return $(this).text().toLowerCase() === label.toLowerCase();
            })[0];
            activateOption(options, selectedOption, true);

            $(window).off('click.select').on('click.select', function () {
              multiple && (optionsHover || $newSelect.trigger('close'));
              $(window).off('click.select');
            });
          }
        },
        'click': function (e) {
          e.stopPropagation();
        }
      });

      $newSelect.on('blur', function () {
        if (!multiple) {
          $(this).trigger('close');
          $(window).off('click.select');
        }
        options.find('li.selected').removeClass('selected');
      });

      options.hover(function () {
        optionsHover = true;
      }, function () {
        optionsHover = false;
      });

      // Add initial multiple selections.
      if (multiple) {
        $select.find("option:selected:not(:disabled)").each(function () {
          var index = $(this).index();

          toggleEntryFromArray(valuesSelected, index, $select);
          options.find("li").eq(index).find(":checkbox").prop("checked", true);
        });
      }

      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       * @param {Boolean} firstActivation  If on first activation of select
       */
      var activateOption = function (collection, newOption, firstActivation) {
        if (newOption) {
          collection.find('li.selected').removeClass('selected');
          var option = $(newOption);
          option.addClass('selected');
          if (!multiple || !!firstActivation) {
            options.scrollTo(option);
          }
        }
      };

      // Allow user to search by typing
      // this array is cleared after 1 second
      var filterQuery = [],
          onKeyDown = function (e) {
        // TAB - switch to another input
        if (e.which == 9) {
          $newSelect.trigger('close');
          return;
        }

        // ARROW DOWN WHEN SELECT IS CLOSED - open select options
        if (e.which == 40 && !options.is(':visible')) {
          $newSelect.trigger('open');
          return;
        }

        // ENTER WHEN SELECT IS CLOSED - submit form
        if (e.which == 13 && !options.is(':visible')) {
          return;
        }

        e.preventDefault();

        // CASE WHEN USER TYPE LETTERS
        var letter = String.fromCharCode(e.which).toLowerCase(),
            nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          filterQuery.push(letter);

          var string = filterQuery.join(''),
              newOption = options.find('li').filter(function () {
            return $(this).text().toLowerCase().indexOf(string) === 0;
          })[0];

          if (newOption) {
            activateOption(options, newOption);
          }
        }

        // ENTER - select option and close when select options are opened
        if (e.which == 13) {
          var activeOption = options.find('li.selected:not(.disabled)')[0];
          if (activeOption) {
            $(activeOption).trigger('click');
            if (!multiple) {
              $newSelect.trigger('close');
            }
          }
        }

        // ARROW DOWN - move to next not disabled option
        if (e.which == 40) {
          if (options.find('li.selected').length) {
            newOption = options.find('li.selected').next('li:not(.disabled)')[0];
          } else {
            newOption = options.find('li:not(.disabled)')[0];
          }
          activateOption(options, newOption);
        }

        // ESC - close options
        if (e.which == 27) {
          $newSelect.trigger('close');
        }

        // ARROW UP - move to previous not disabled option
        if (e.which == 38) {
          newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
          if (newOption) activateOption(options, newOption);
        }

        // Automaticaly clean filter query so user can search again by starting letters
        setTimeout(function () {
          filterQuery = [];
        }, 1000);
      };

      $newSelect.on('keydown', onKeyDown);
    });

    function toggleEntryFromArray(entriesArray, entryIndex, select) {
      var index = entriesArray.indexOf(entryIndex),
          notAdded = index === -1;

      if (notAdded) {
        entriesArray.push(entryIndex);
      } else {
        entriesArray.splice(index, 1);
      }

      select.siblings('ul.dropdown-content').find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

      // use notAdded instead of true (to detect if the option is selected or not)
      select.find('option').eq(entryIndex).prop('selected', notAdded);
      setValueToInput(entriesArray, select);

      return notAdded;
    }

    function setValueToInput(entriesArray, select) {
      var value = '';

      for (var i = 0, count = entriesArray.length; i < count; i++) {
        var text = select.find('option').eq(entriesArray[i]).text();

        i === 0 ? value += text : value += ', ' + text;
      }

      if (value === '') {
        value = select.find('option:disabled').eq(0).text();
      }

      select.siblings('input.select-dropdown').val(value);
    }
  };
})(jQuery);
;(function ($) {

  var methods = {

    init: function (options) {
      var defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000
      };
      options = $.extend(defaults, options);

      return this.each(function () {

        // For each slider, we want to keep track of
        // which slide is active and its associated content
        var $this = $(this);
        var $slider = $this.find('ul.slides').first();
        var $slides = $slider.find('> li');
        var $active_index = $slider.find('.active').index();
        var $active, $indicators, $interval;
        if ($active_index != -1) {
          $active = $slides.eq($active_index);
        }

        // Transitions the caption depending on alignment
        function captionTransition(caption, duration) {
          if (caption.hasClass("center-align")) {
            caption.velocity({ opacity: 0, translateY: -100 }, { duration: duration, queue: false });
          } else if (caption.hasClass("right-align")) {
            caption.velocity({ opacity: 0, translateX: 100 }, { duration: duration, queue: false });
          } else if (caption.hasClass("left-align")) {
            caption.velocity({ opacity: 0, translateX: -100 }, { duration: duration, queue: false });
          }
        }

        // This function will transition the slide to any index of the next slide
        function moveToSlide(index) {
          // Wrap around indices.
          if (index >= $slides.length) index = 0;else if (index < 0) index = $slides.length - 1;

          $active_index = $slider.find('.active').index();

          // Only do if index changes
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find('.caption');

            $active.removeClass('active');
            $active.velocity({ opacity: 0 }, { duration: options.transition, queue: false, easing: 'easeOutQuad',
              complete: function () {
                $slides.not('.active').velocity({ opacity: 0, translateX: 0, translateY: 0 }, { duration: 0, queue: false });
              } });
            captionTransition($caption, options.transition);

            // Update indicators
            if (options.indicators) {
              $indicators.eq($active_index).removeClass('active');
            }

            $slides.eq(index).velocity({ opacity: 1 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });
            $slides.eq(index).find('.caption').velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad' });
            $slides.eq(index).addClass('active');

            // Update indicators
            if (options.indicators) {
              $indicators.eq(index).addClass('active');
            }
          }
        }

        // Set height of slider
        // If fullscreen, do nothing
        if (!$this.hasClass('fullscreen')) {
          if (options.indicators) {
            // Add height if indicators are present
            $this.height(options.height + 40);
          } else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }

        // Set initial positions of captions
        $slides.find('.caption').each(function () {
          captionTransition($(this), 0);
        });

        // Move img src into background-image
        $slides.find('img').each(function () {
          var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          if ($(this).attr('src') !== placeholderBase64) {
            $(this).css('background-image', 'url("' + $(this).attr('src') + '")');
            $(this).attr('src', placeholderBase64);
          }
        });

        // dynamically add indicators
        if (options.indicators) {
          $indicators = $('<ul class="indicators"></ul>');
          $slides.each(function (index) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Handle clicks on indicators
            $indicator.click(function () {
              var $parent = $slider.parent();
              var curr_index = $parent.find($(this)).index();
              moveToSlide(curr_index);

              // reset interval
              clearInterval($interval);
              $interval = setInterval(function () {
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                else $active_index += 1;

                moveToSlide($active_index);
              }, options.transition + options.interval);
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find('ul.indicators').find('li.indicator-item');
        }

        if ($active) {
          $active.show();
        } else {
          $slides.first().addClass('active').velocity({ opacity: 1 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });

          $active_index = 0;
          $active = $slides.eq($active_index);

          // Update indicators
          if (options.indicators) {
            $indicators.eq($active_index).addClass('active');
          }
        }

        // Adjust height to current slide
        $active.find('img').each(function () {
          $active.find('.caption').velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });
        });

        // auto scroll
        $interval = setInterval(function () {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        }, options.transition + options.interval);

        // HammerJS, Swipe navigation

        // Touch Event
        var panning = false;
        var swipeLeft = false;
        var swipeRight = false;

        $this.hammer({
          prevent_default: false
        }).on('pan', function (e) {
          if (e.gesture.pointerType === "touch") {

            // reset interval
            clearInterval($interval);

            var direction = e.gesture.direction;
            var x = e.gesture.deltaX;
            var velocityX = e.gesture.velocityX;
            var velocityY = e.gesture.velocityY;

            $curr_slide = $slider.find('.active');
            if (Math.abs(velocityX) > Math.abs(velocityY)) {
              $curr_slide.velocity({ translateX: x
              }, { duration: 50, queue: false, easing: 'easeOutQuad' });
            }

            // Swipe Left
            if (direction === 4 && (x > $this.innerWidth() / 2 || velocityX < -0.65)) {
              swipeRight = true;
            }
            // Swipe Right
            else if (direction === 2 && (x < -1 * $this.innerWidth() / 2 || velocityX > 0.65)) {
                swipeLeft = true;
              }

            // Make Slide Behind active slide visible
            var next_slide;
            if (swipeLeft) {
              next_slide = $curr_slide.next();
              if (next_slide.length === 0) {
                next_slide = $slides.first();
              }
              next_slide.velocity({ opacity: 1
              }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }
            if (swipeRight) {
              next_slide = $curr_slide.prev();
              if (next_slide.length === 0) {
                next_slide = $slides.last();
              }
              next_slide.velocity({ opacity: 1
              }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }
          }
        }).on('panend', function (e) {
          if (e.gesture.pointerType === "touch") {

            $curr_slide = $slider.find('.active');
            panning = false;
            curr_index = $slider.find('.active').index();

            if (!swipeRight && !swipeLeft || $slides.length <= 1) {
              // Return to original spot
              $curr_slide.velocity({ translateX: 0
              }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            } else if (swipeLeft) {
              moveToSlide(curr_index + 1);
              $curr_slide.velocity({ translateX: -1 * $this.innerWidth() }, { duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: false });
                } });
            } else if (swipeRight) {
              moveToSlide(curr_index - 1);
              $curr_slide.velocity({ translateX: $this.innerWidth() }, { duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: false });
                } });
            }
            swipeLeft = false;
            swipeRight = false;

            // Restart interval
            clearInterval($interval);
            $interval = setInterval(function () {
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;

              moveToSlide($active_index);
            }, options.transition + options.interval);
          }
        });

        $this.on('sliderPause', function () {
          clearInterval($interval);
        });

        $this.on('sliderStart', function () {
          clearInterval($interval);
          $interval = setInterval(function () {
            $active_index = $slider.find('.active').index();
            if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
            else $active_index += 1;

            moveToSlide($active_index);
          }, options.transition + options.interval);
        });

        $this.on('sliderNext', function () {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        });

        $this.on('sliderPrev', function () {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index - 1);
        });
      });
    },
    pause: function () {
      $(this).trigger('sliderPause');
    },
    start: function () {
      $(this).trigger('sliderStart');
    },
    next: function () {
      $(this).trigger('sliderNext');
    },
    prev: function () {
      $(this).trigger('sliderPrev');
    }
  };

  $.fn.slider = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
    }
  }; // Plugin end
})(jQuery);
;(function ($) {
  $(document).ready(function () {

    $(document).on('click.card', '.card', function (e) {
      if ($(this).find('> .card-reveal').length) {
        var $card = $(e.target).closest('.card');
        if ($card.data('initialOverflow') === undefined) {
          $card.data('initialOverflow', $card.css('overflow') === undefined ? '' : $card.css('overflow'));
        }
        if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
          // Make Reveal animate down and display none
          $(this).find('.card-reveal').velocity({ translateY: 0 }, {
            duration: 225,
            queue: false,
            easing: 'easeInOutQuad',
            complete: function () {
              $(this).css({ display: 'none' });
              $card.css('overflow', $card.data('initialOverflow'));
            }
          });
        } else if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i'))) {
          $card.css('overflow', 'hidden');
          $(this).find('.card-reveal').css({ display: 'block' }).velocity("stop", false).velocity({ translateY: '-100%' }, { duration: 300, queue: false, easing: 'easeInOutQuad' });
        }
      }
    });
  });
})(jQuery);
;(function ($) {
  var materialChipsDefaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {}
  };

  $(document).ready(function () {
    // Handle removal of static chips.
    $(document).on('click', '.chip .close', function (e) {
      var $chips = $(this).closest('.chips');
      if ($chips.attr('data-initialized')) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });

  $.fn.material_chip = function (options) {
    var self = this;
    this.$el = $(this);
    this.$document = $(document);
    this.SELS = {
      CHIPS: '.chips',
      CHIP: '.chip',
      INPUT: 'input',
      DELETE: '.material-icons',
      SELECTED_CHIP: '.selected'
    };

    if ('data' === options) {
      return this.$el.data('chips');
    }

    var curr_options = $.extend({}, materialChipsDefaults, options);
    self.hasAutocomplete = !$.isEmptyObject(curr_options.autocompleteOptions.data);

    // Initialize
    this.init = function () {
      var i = 0;
      var chips;
      self.$el.each(function () {
        var $chips = $(this);
        var chipId = Materialize.guid();
        self.chipId = chipId;

        if (!curr_options.data || !(curr_options.data instanceof Array)) {
          curr_options.data = [];
        }
        $chips.data('chips', curr_options.data);
        $chips.attr('data-index', i);
        $chips.attr('data-initialized', true);

        if (!$chips.hasClass(self.SELS.CHIPS)) {
          $chips.addClass('chips');
        }

        self.chips($chips, chipId);
        i++;
      });
    };

    this.handleEvents = function () {
      var SELS = self.SELS;

      self.$document.off('click.chips-focus', SELS.CHIPS).on('click.chips-focus', SELS.CHIPS, function (e) {
        $(e.target).find(SELS.INPUT).focus();
      });

      self.$document.off('click.chips-select', SELS.CHIP).on('click.chips-select', SELS.CHIP, function (e) {
        var $chip = $(e.target);
        if ($chip.length) {
          var wasSelected = $chip.hasClass('selected');
          var $chips = $chip.closest(SELS.CHIPS);
          $(SELS.CHIP).removeClass('selected');

          if (!wasSelected) {
            self.selectChip($chip.index(), $chips);
          }
        }
      });

      self.$document.off('keydown.chips').on('keydown.chips', function (e) {
        if ($(e.target).is('input, textarea')) {
          return;
        }

        // delete
        var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
        var $chips = $chip.closest(SELS.CHIPS);
        var length = $chip.siblings(SELS.CHIP).length;
        var index;

        if (!$chip.length) {
          return;
        }

        if (e.which === 8 || e.which === 46) {
          e.preventDefault();

          index = $chip.index();
          self.deleteChip(index, $chips);

          var selectIndex = null;
          if (index + 1 < length) {
            selectIndex = index;
          } else if (index === length || index + 1 === length) {
            selectIndex = length - 1;
          }

          if (selectIndex < 0) selectIndex = null;

          if (null !== selectIndex) {
            self.selectChip(selectIndex, $chips);
          }
          if (!length) $chips.find('input').focus();

          // left
        } else if (e.which === 37) {
          index = $chip.index() - 1;
          if (index < 0) {
            return;
          }
          $(SELS.CHIP).removeClass('selected');
          self.selectChip(index, $chips);

          // right
        } else if (e.which === 39) {
          index = $chip.index() + 1;
          $(SELS.CHIP).removeClass('selected');
          if (index > length) {
            $chips.find('input').focus();
            return;
          }
          self.selectChip(index, $chips);
        }
      });

      self.$document.off('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
        var $currChips = $(e.target).closest(SELS.CHIPS);
        $currChips.addClass('focus');
        $currChips.siblings('label, .prefix').addClass('active');
        $(SELS.CHIP).removeClass('selected');
      });

      self.$document.off('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
        var $currChips = $(e.target).closest(SELS.CHIPS);
        $currChips.removeClass('focus');

        // Remove active if empty
        if ($currChips.data('chips') === undefined || !$currChips.data('chips').length) {
          $currChips.siblings('label').removeClass('active');
        }
        $currChips.siblings('.prefix').removeClass('active');
      });

      self.$document.off('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT).on('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
        var $target = $(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var chipsLength = $chips.children(SELS.CHIP).length;

        // enter
        if (13 === e.which) {
          // Override enter if autocompleting.
          if (self.hasAutocomplete && $chips.find('.autocomplete-content.dropdown-content').length && $chips.find('.autocomplete-content.dropdown-content').children().length) {
            return;
          }

          e.preventDefault();
          self.addChip({ tag: $target.val() }, $chips);
          $target.val('');
          return;
        }

        // delete or left
        if ((8 === e.keyCode || 37 === e.keyCode) && '' === $target.val() && chipsLength) {
          e.preventDefault();
          self.selectChip(chipsLength - 1, $chips);
          $target.blur();
          return;
        }
      });

      // Click on delete icon in chip.
      self.$document.off('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE).on('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE, function (e) {
        var $target = $(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var $chip = $target.closest(SELS.CHIP);
        e.stopPropagation();
        self.deleteChip($chip.index(), $chips);
        $chips.find('input').focus();
      });
    };

    this.chips = function ($chips, chipId) {
      $chips.empty();
      $chips.data('chips').forEach(function (elem) {
        $chips.append(self.renderChip(elem));
      });
      $chips.append($('<input id="' + chipId + '" class="input" placeholder="">'));
      self.setPlaceholder($chips);

      // Set for attribute for label
      var label = $chips.next('label');
      if (label.length) {
        label.attr('for', chipId);

        if ($chips.data('chips') !== undefined && $chips.data('chips').length) {
          label.addClass('active');
        }
      }

      // Setup autocomplete if needed.
      var input = $('#' + chipId);
      if (self.hasAutocomplete) {
        curr_options.autocompleteOptions.onAutocomplete = function (val) {
          self.addChip({ tag: val }, $chips);
          input.val('');
          input.focus();
        };
        input.autocomplete(curr_options.autocompleteOptions);
      }
    };

    /**
     * Render chip jQuery element.
     * @param {Object} elem
     * @return {jQuery}
     */
    this.renderChip = function (elem) {
      if (!elem.tag) return;

      var $renderedChip = $('<div class="chip"></div>');
      $renderedChip.text(elem.tag);
      if (elem.image) {
        $renderedChip.prepend($('<img />').attr('src', elem.image));
      }
      $renderedChip.append($('<i class="material-icons close">close</i>'));
      return $renderedChip;
    };

    this.setPlaceholder = function ($chips) {
      if ($chips.data('chips') !== undefined && !$chips.data('chips').length && curr_options.placeholder) {
        $chips.find('input').prop('placeholder', curr_options.placeholder);
      } else if (($chips.data('chips') === undefined || !!$chips.data('chips').length) && curr_options.secondaryPlaceholder) {
        $chips.find('input').prop('placeholder', curr_options.secondaryPlaceholder);
      }
    };

    this.isValid = function ($chips, elem) {
      var chips = $chips.data('chips');
      var exists = false;
      for (var i = 0; i < chips.length; i++) {
        if (chips[i].tag === elem.tag) {
          exists = true;
          return;
        }
      }
      return '' !== elem.tag && !exists;
    };

    this.addChip = function (elem, $chips) {
      if (!self.isValid($chips, elem)) {
        return;
      }
      var $renderedChip = self.renderChip(elem);
      var newData = [];
      var oldData = $chips.data('chips');
      for (var i = 0; i < oldData.length; i++) {
        newData.push(oldData[i]);
      }
      newData.push(elem);

      $chips.data('chips', newData);
      $renderedChip.insertBefore($chips.find('input'));
      $chips.trigger('chip.add', elem);
      self.setPlaceholder($chips);
    };

    this.deleteChip = function (chipIndex, $chips) {
      var chip = $chips.data('chips')[chipIndex];
      $chips.find('.chip').eq(chipIndex).remove();

      var newData = [];
      var oldData = $chips.data('chips');
      for (var i = 0; i < oldData.length; i++) {
        if (i !== chipIndex) {
          newData.push(oldData[i]);
        }
      }

      $chips.data('chips', newData);
      $chips.trigger('chip.delete', chip);
      self.setPlaceholder($chips);
    };

    this.selectChip = function (chipIndex, $chips) {
      var $chip = $chips.find('.chip').eq(chipIndex);
      if ($chip && false === $chip.hasClass('selected')) {
        $chip.addClass('selected');
        $chips.trigger('chip.select', $chips.data('chips')[chipIndex]);
      }
    };

    this.getChipsElement = function (index, $chips) {
      return $chips.eq(index);
    };

    // init
    this.init();

    this.handleEvents();
  };
})(jQuery);
;(function ($) {
  $.fn.pushpin = function (options) {
    // Defaults
    var defaults = {
      top: 0,
      bottom: Infinity,
      offset: 0
    };

    // Remove pushpin event and classes
    if (options === "remove") {
      this.each(function () {
        if (id = $(this).data('pushpin-id')) {
          $(window).off('scroll.' + id);
          $(this).removeData('pushpin-id').removeClass('pin-top pinned pin-bottom').removeAttr('style');
        }
      });
      return false;
    }

    options = $.extend(defaults, options);

    $index = 0;
    return this.each(function () {
      var $uniqueId = Materialize.guid(),
          $this = $(this),
          $original_offset = $(this).offset().top;

      function removePinClasses(object) {
        object.removeClass('pin-top');
        object.removeClass('pinned');
        object.removeClass('pin-bottom');
      }

      function updateElements(objects, scrolled) {
        objects.each(function () {
          // Add position fixed (because its between top and bottom)
          if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {
            removePinClasses($(this));
            $(this).css('top', options.offset);
            $(this).addClass('pinned');
          }

          // Add pin-top (when scrolled position is above top)
          if (scrolled < options.top && !$(this).hasClass('pin-top')) {
            removePinClasses($(this));
            $(this).css('top', 0);
            $(this).addClass('pin-top');
          }

          // Add pin-bottom (when scrolled position is below bottom)
          if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
            removePinClasses($(this));
            $(this).addClass('pin-bottom');
            $(this).css('top', options.bottom - $original_offset);
          }
        });
      }

      $(this).data('pushpin-id', $uniqueId);
      updateElements($this, $(window).scrollTop());
      $(window).on('scroll.' + $uniqueId, function () {
        var $scrolled = $(window).scrollTop() + options.offset;
        updateElements($this, $scrolled);
      });
    });
  };
})(jQuery);;(function ($) {
  $(document).ready(function () {

    // jQuery reverse
    $.fn.reverse = [].reverse;

    // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
    $(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle):not(.toolbar)', function (e) {
      var $this = $(this);
      openFABMenu($this);
    });
    $(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle):not(.toolbar)', function (e) {
      var $this = $(this);
      closeFABMenu($this);
    });

    // Toggle-on-click behaviour.
    $(document).on('click.fabClickToggle', '.fixed-action-btn.click-to-toggle > a', function (e) {
      var $this = $(this);
      var $menu = $this.parent();
      if ($menu.hasClass('active')) {
        closeFABMenu($menu);
      } else {
        openFABMenu($menu);
      }
    });

    // Toolbar transition behaviour.
    $(document).on('click.fabToolbar', '.fixed-action-btn.toolbar > a', function (e) {
      var $this = $(this);
      var $menu = $this.parent();
      FABtoToolbar($menu);
    });
  });

  $.fn.extend({
    openFAB: function () {
      openFABMenu($(this));
    },
    closeFAB: function () {
      closeFABMenu($(this));
    },
    openToolbar: function () {
      FABtoToolbar($(this));
    },
    closeToolbar: function () {
      toolbarToFAB($(this));
    }
  });

  var openFABMenu = function (btn) {
    var $this = btn;
    if ($this.hasClass('active') === false) {

      // Get direction option
      var horizontal = $this.hasClass('horizontal');
      var offsetY, offsetX;

      if (horizontal === true) {
        offsetX = 40;
      } else {
        offsetY = 40;
      }

      $this.addClass('active');
      $this.find('ul .btn-floating').velocity({ scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px' }, { duration: 0 });

      var time = 0;
      $this.find('ul .btn-floating').reverse().each(function () {
        $(this).velocity({ opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0' }, { duration: 80, delay: time });
        time += 40;
      });
    }
  };

  var closeFABMenu = function (btn) {
    var $this = btn;
    // Get direction option
    var horizontal = $this.hasClass('horizontal');
    var offsetY, offsetX;

    if (horizontal === true) {
      offsetX = 40;
    } else {
      offsetY = 40;
    }

    $this.removeClass('active');
    var time = 0;
    $this.find('ul .btn-floating').velocity("stop", true);
    $this.find('ul .btn-floating').velocity({ opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px' }, { duration: 80 });
  };

  /**
   * Transform FAB into toolbar
   * @param  {Object}  object jQuery object
   */
  var FABtoToolbar = function (btn) {
    if (btn.attr('data-open') === "true") {
      return;
    }

    var offsetX, offsetY, scaleFactor;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var btnRect = btn[0].getBoundingClientRect();
    var anchor = btn.find('> a').first();
    var menu = btn.find('> ul').first();
    var backdrop = $('<div class="fab-backdrop"></div>');
    var fabColor = anchor.css('background-color');
    anchor.append(backdrop);

    offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
    offsetY = windowHeight - btnRect.bottom;
    scaleFactor = windowWidth / backdrop.width();
    btn.attr('data-origin-bottom', btnRect.bottom);
    btn.attr('data-origin-left', btnRect.left);
    btn.attr('data-origin-width', btnRect.width);

    // Set initial state
    btn.addClass('active');
    btn.attr('data-open', true);
    btn.css({
      'text-align': 'center',
      width: '100%',
      bottom: 0,
      left: 0,
      transform: 'translateX(' + offsetX + 'px)',
      transition: 'none'
    });
    anchor.css({
      transform: 'translateY(' + -offsetY + 'px)',
      transition: 'none'
    });
    backdrop.css({
      'background-color': fabColor
    });

    setTimeout(function () {
      btn.css({
        transform: '',
        transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
      });
      anchor.css({
        overflow: 'visible',
        transform: '',
        transition: 'transform .2s'
      });

      setTimeout(function () {
        btn.css({
          overflow: 'hidden',
          'background-color': fabColor
        });
        backdrop.css({
          transform: 'scale(' + scaleFactor + ')',
          transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
        });
        menu.find('> li > a').css({
          opacity: 1
        });

        // Scroll to close.
        $(window).on('scroll.fabToolbarClose', function () {
          toolbarToFAB(btn);
          $(window).off('scroll.fabToolbarClose');
          $(document).off('click.fabToolbarClose');
        });

        $(document).on('click.fabToolbarClose', function (e) {
          if (!$(e.target).closest(menu).length) {
            toolbarToFAB(btn);
            $(window).off('scroll.fabToolbarClose');
            $(document).off('click.fabToolbarClose');
          }
        });
      }, 100);
    }, 0);
  };

  /**
   * Transform toolbar back into FAB
   * @param  {Object}  object jQuery object
   */
  var toolbarToFAB = function (btn) {
    if (btn.attr('data-open') !== "true") {
      return;
    }

    var offsetX, offsetY, scaleFactor;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var btnWidth = btn.attr('data-origin-width');
    var btnBottom = btn.attr('data-origin-bottom');
    var btnLeft = btn.attr('data-origin-left');
    var anchor = btn.find('> .btn-floating').first();
    var menu = btn.find('> ul').first();
    var backdrop = btn.find('.fab-backdrop');
    var fabColor = anchor.css('background-color');

    offsetX = btnLeft - windowWidth / 2 + btnWidth / 2;
    offsetY = windowHeight - btnBottom;
    scaleFactor = windowWidth / backdrop.width();

    // Hide backdrop
    btn.removeClass('active');
    btn.attr('data-open', false);
    btn.css({
      'background-color': 'transparent',
      transition: 'none'
    });
    anchor.css({
      transition: 'none'
    });
    backdrop.css({
      transform: 'scale(0)',
      'background-color': fabColor
    });
    menu.find('> li > a').css({
      opacity: ''
    });

    setTimeout(function () {
      backdrop.remove();

      // Set initial state.
      btn.css({
        'text-align': '',
        width: '',
        bottom: '',
        left: '',
        overflow: '',
        'background-color': '',
        transform: 'translate3d(' + -offsetX + 'px,0,0)'
      });
      anchor.css({
        overflow: '',
        transform: 'translate3d(0,' + offsetY + 'px,0)'
      });

      setTimeout(function () {
        btn.css({
          transform: 'translate3d(0,0,0)',
          transition: 'transform .2s'
        });
        anchor.css({
          transform: 'translate3d(0,0,0)',
          transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
        });
      }, 20);
    }, 200);
  };
})(jQuery);
;(function ($) {
  // Image transition function
  Materialize.fadeInImage = function (selectorOrEl) {
    var element;
    if (typeof selectorOrEl === 'string') {
      element = $(selectorOrEl);
    } else if (typeof selectorOrEl === 'object') {
      element = selectorOrEl;
    } else {
      return;
    }
    element.css({ opacity: 0 });
    $(element).velocity({ opacity: 1 }, {
      duration: 650,
      queue: false,
      easing: 'easeOutSine'
    });
    $(element).velocity({ opacity: 1 }, {
      duration: 1300,
      queue: false,
      easing: 'swing',
      step: function (now, fx) {
        fx.start = 100;
        var grayscale_setting = now / 100;
        var brightness_setting = 150 - (100 - now) / 1.75;

        if (brightness_setting < 100) {
          brightness_setting = 100;
        }
        if (now >= 0) {
          $(this).css({
            "-webkit-filter": "grayscale(" + grayscale_setting + ")" + "brightness(" + brightness_setting + "%)",
            "filter": "grayscale(" + grayscale_setting + ")" + "brightness(" + brightness_setting + "%)"
          });
        }
      }
    });
  };

  // Horizontal staggered list
  Materialize.showStaggeredList = function (selectorOrEl) {
    var element;
    if (typeof selectorOrEl === 'string') {
      element = $(selectorOrEl);
    } else if (typeof selectorOrEl === 'object') {
      element = selectorOrEl;
    } else {
      return;
    }
    var time = 0;
    element.find('li').velocity({ translateX: "-100px" }, { duration: 0 });

    element.find('li').each(function () {
      $(this).velocity({ opacity: "1", translateX: "0" }, { duration: 800, delay: time, easing: [60, 10] });
      time += 120;
    });
  };

  $(document).ready(function () {
    // Hardcoded .staggered-list scrollFire
    // var staggeredListOptions = [];
    // $('ul.staggered-list').each(function (i) {

    //   var label = 'scrollFire-' + i;
    //   $(this).addClass(label);
    //   staggeredListOptions.push(
    //     {selector: 'ul.staggered-list.' + label,
    //      offset: 200,
    //      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
    // });
    // scrollFire(staggeredListOptions);

    // HammerJS, Swipe navigation

    // Touch Event
    var swipeLeft = false;
    var swipeRight = false;

    // Dismissible Collections
    $('.dismissable').each(function () {
      $(this).hammer({
        prevent_default: false
      }).on('pan', function (e) {
        if (e.gesture.pointerType === "touch") {
          var $this = $(this);
          var direction = e.gesture.direction;
          var x = e.gesture.deltaX;
          var velocityX = e.gesture.velocityX;

          $this.velocity({ translateX: x
          }, { duration: 50, queue: false, easing: 'easeOutQuad' });

          // Swipe Left
          if (direction === 4 && (x > $this.innerWidth() / 2 || velocityX < -0.75)) {
            swipeLeft = true;
          }

          // Swipe Right
          if (direction === 2 && (x < -1 * $this.innerWidth() / 2 || velocityX > 0.75)) {
            swipeRight = true;
          }
        }
      }).on('panend', function (e) {
        // Reset if collection is moved back into original position
        if (Math.abs(e.gesture.deltaX) < $(this).innerWidth() / 2) {
          swipeRight = false;
          swipeLeft = false;
        }

        if (e.gesture.pointerType === "touch") {
          var $this = $(this);
          if (swipeLeft || swipeRight) {
            var fullWidth;
            if (swipeLeft) {
              fullWidth = $this.innerWidth();
            } else {
              fullWidth = -1 * $this.innerWidth();
            }

            $this.velocity({ translateX: fullWidth
            }, { duration: 100, queue: false, easing: 'easeOutQuad', complete: function () {
                $this.css('border', 'none');
                $this.velocity({ height: 0, padding: 0
                }, { duration: 200, queue: false, easing: 'easeOutQuad', complete: function () {
                    $this.remove();
                  }
                });
              }
            });
          } else {
            $this.velocity({ translateX: 0
            }, { duration: 100, queue: false, easing: 'easeOutQuad' });
          }
          swipeLeft = false;
          swipeRight = false;
        }
      });
    });

    // time = 0
    // // Vertical Staggered list
    // $('ul.staggered-list.vertical li').velocity(
    //     { translateY: "100px"},
    //     { duration: 0 });

    // $('ul.staggered-list.vertical li').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", translateY: "0"},
    //     { duration: 800, delay: time, easing: [60, 25] });
    //   time += 120;
    // });

    // // Fade in and Scale
    // $('.fade-in.scale').velocity(
    //     { scaleX: .4, scaleY: .4, translateX: -600},
    //     { duration: 0});
    // $('.fade-in').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
    //     { duration: 800, easing: [60, 10] });
    // });
  });
})(jQuery);
;(function ($) {

  var scrollFireEventsHandled = false;

  // Input: Array of JSON objects {selector, offset, callback}
  Materialize.scrollFire = function (options) {
    var onScroll = function () {
      var windowScroll = window.pageYOffset + window.innerHeight;

      for (var i = 0; i < options.length; i++) {
        // Get options from each line
        var value = options[i];
        var selector = value.selector,
            offset = value.offset,
            callback = value.callback;

        var currentElement = document.querySelector(selector);
        if (currentElement !== null) {
          var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

          if (windowScroll > elementOffset + offset) {
            if (value.done !== true) {
              if (typeof callback === 'function') {
                callback.call(this, currentElement);
              } else if (typeof callback === 'string') {
                var callbackFunc = new Function(callback);
                callbackFunc(currentElement);
              }
              value.done = true;
            }
          }
        }
      }
    };

    var throttledScroll = Materialize.throttle(function () {
      onScroll();
    }, options.throttle || 100);

    if (!scrollFireEventsHandled) {
      window.addEventListener("scroll", throttledScroll);
      window.addEventListener("resize", throttledScroll);
      scrollFireEventsHandled = true;
    }

    // perform a scan once, after current execution context, and after dom is ready
    setTimeout(throttledScroll, 0);
  };
})(jQuery);
; /*!
  * pickadate.js v3.5.0, 2014/04/13
  * By Amsul, http://amsul.ca
  * Hosted on http://amsul.github.io/pickadate.js
  * Licensed under MIT
  */

(function (factory) {

  Materialize.Picker = factory(jQuery);
})(function ($) {

  var $window = $(window);
  var $document = $(document);
  var $html = $(document.documentElement);

  /**
   * The picker constructor that creates a blank picker.
   */
  function PickerConstructor(ELEMENT, NAME, COMPONENT, OPTIONS) {

    // If there’s no element, return the picker constructor.
    if (!ELEMENT) return PickerConstructor;

    var IS_DEFAULT_THEME = false,


    // The state of the picker.
    STATE = {
      id: ELEMENT.id || 'P' + Math.abs(~~(Math.random() * new Date()))
    },


    // Merge the defaults and options passed.
    SETTINGS = COMPONENT ? $.extend(true, {}, COMPONENT.defaults, OPTIONS) : OPTIONS || {},


    // Merge the default classes with the settings classes.
    CLASSES = $.extend({}, PickerConstructor.klasses(), SETTINGS.klass),


    // The element node wrapper into a jQuery object.
    $ELEMENT = $(ELEMENT),


    // Pseudo picker constructor.
    PickerInstance = function () {
      return this.start();
    },


    // The picker prototype.
    P = PickerInstance.prototype = {

      constructor: PickerInstance,

      $node: $ELEMENT,

      /**
       * Initialize everything
       */
      start: function () {

        // If it’s already started, do nothing.
        if (STATE && STATE.start) return P;

        // Update the picker states.
        STATE.methods = {};
        STATE.start = true;
        STATE.open = false;
        STATE.type = ELEMENT.type;

        // Confirm focus state, convert into text input to remove UA stylings,
        // and set as readonly to prevent keyboard popup.
        ELEMENT.autofocus = ELEMENT == getActiveElement();
        ELEMENT.readOnly = !SETTINGS.editable;
        ELEMENT.id = ELEMENT.id || STATE.id;
        if (ELEMENT.type != 'text') {
          ELEMENT.type = 'text';
        }

        // Create a new picker component with the settings.
        P.component = new COMPONENT(P, SETTINGS);

        // Create the picker root with a holder and then prepare it.
        P.$root = $(PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"'));
        prepareElementRoot();

        // If there’s a format for the hidden input element, create the element.
        if (SETTINGS.formatSubmit) {
          prepareElementHidden();
        }

        // Prepare the input element.
        prepareElement();

        // Insert the root as specified in the settings.
        if (SETTINGS.container) $(SETTINGS.container).append(P.$root);else $ELEMENT.before(P.$root);

        // Bind the default component and settings events.
        P.on({
          start: P.component.onStart,
          render: P.component.onRender,
          stop: P.component.onStop,
          open: P.component.onOpen,
          close: P.component.onClose,
          set: P.component.onSet
        }).on({
          start: SETTINGS.onStart,
          render: SETTINGS.onRender,
          stop: SETTINGS.onStop,
          open: SETTINGS.onOpen,
          close: SETTINGS.onClose,
          set: SETTINGS.onSet
        });

        // Once we’re all set, check the theme in use.
        IS_DEFAULT_THEME = isUsingDefaultTheme(P.$root.children()[0]);

        // If the element has autofocus, open the picker.
        if (ELEMENT.autofocus) {
          P.open();
        }

        // Trigger queued the “start” and “render” events.
        return P.trigger('start').trigger('render');
      }, //start


      /**
       * Render a new picker
       */
      render: function (entireComponent) {

        // Insert a new component holder in the root or box.
        if (entireComponent) P.$root.html(createWrappedComponent());else P.$root.find('.' + CLASSES.box).html(P.component.nodes(STATE.open));

        // Trigger the queued “render” events.
        return P.trigger('render');
      }, //render


      /**
       * Destroy everything
       */
      stop: function () {

        // If it’s already stopped, do nothing.
        if (!STATE.start) return P;

        // Then close the picker.
        P.close();

        // Remove the hidden field.
        if (P._hidden) {
          P._hidden.parentNode.removeChild(P._hidden);
        }

        // Remove the root.
        P.$root.remove();

        // Remove the input class, remove the stored data, and unbind
        // the events (after a tick for IE - see `P.close`).
        $ELEMENT.removeClass(CLASSES.input).removeData(NAME);
        setTimeout(function () {
          $ELEMENT.off('.' + STATE.id);
        }, 0);

        // Restore the element state
        ELEMENT.type = STATE.type;
        ELEMENT.readOnly = false;

        // Trigger the queued “stop” events.
        P.trigger('stop');

        // Reset the picker states.
        STATE.methods = {};
        STATE.start = false;

        return P;
      }, //stop


      /**
       * Open up the picker
       */
      open: function (dontGiveFocus) {

        // If it’s already open, do nothing.
        if (STATE.open) return P;

        // Add the “active” class.
        $ELEMENT.addClass(CLASSES.active);
        aria(ELEMENT, 'expanded', true);

        // * A Firefox bug, when `html` has `overflow:hidden`, results in
        //   killing transitions :(. So add the “opened” state on the next tick.
        //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
        setTimeout(function () {

          // Add the “opened” class to the picker root.
          P.$root.addClass(CLASSES.opened);
          aria(P.$root[0], 'hidden', false);
        }, 0);

        // If we have to give focus, bind the element and doc events.
        if (dontGiveFocus !== false) {

          // Set it as open.
          STATE.open = true;

          // Prevent the page from scrolling.
          if (IS_DEFAULT_THEME) {
            $html.css('overflow', 'hidden').css('padding-right', '+=' + getScrollbarWidth());
          }

          // Pass focus to the root element’s jQuery object.
          // * Workaround for iOS8 to bring the picker’s root into view.
          P.$root.eq(0).focus();

          // Bind the document events.
          $document.on('click.' + STATE.id + ' focusin.' + STATE.id, function (event) {

            var target = event.target;

            // If the target of the event is not the element, close the picker picker.
            // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
            //   Also, for Firefox, a click on an `option` element bubbles up directly
            //   to the doc. So make sure the target wasn't the doc.
            // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
            //   which causes the picker to unexpectedly close when right-clicking it. So make
            //   sure the event wasn’t a right-click.
            if (target != ELEMENT && target != document && event.which != 3) {

              // If the target was the holder that covers the screen,
              // keep the element focused to maintain tabindex.
              P.close(target === P.$root.children()[0]);
            }
          }).on('keydown.' + STATE.id, function (event) {

            var
            // Get the keycode.
            keycode = event.keyCode,


            // Translate that to a selection change.
            keycodeToMove = P.component.key[keycode],


            // Grab the target.
            target = event.target;

            // On escape, close the picker and give focus.
            if (keycode == 27) {
              P.close(true);
            }

            // Check if there is a key movement or “enter” keypress on the element.
            else if (target == P.$root[0] && (keycodeToMove || keycode == 13)) {

                // Prevent the default action to stop page movement.
                event.preventDefault();

                // Trigger the key movement action.
                if (keycodeToMove) {
                  PickerConstructor._.trigger(P.component.key.go, P, [PickerConstructor._.trigger(keycodeToMove)]);
                }

                // On “enter”, if the highlighted item isn’t disabled, set the value and close.
                else if (!P.$root.find('.' + CLASSES.highlighted).hasClass(CLASSES.disabled)) {
                    P.set('select', P.component.item.highlight);
                    if (SETTINGS.closeOnSelect) {
                      P.close(true);
                    }
                  }
              }

              // If the target is within the root and “enter” is pressed,
              // prevent the default action and trigger a click on the target instead.
              else if ($.contains(P.$root[0], target) && keycode == 13) {
                  event.preventDefault();
                  target.click();
                }
          });
        }

        // Trigger the queued “open” events.
        return P.trigger('open');
      }, //open


      /**
       * Close the picker
       */
      close: function (giveFocus) {

        // If we need to give focus, do it before changing states.
        if (giveFocus) {
          // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
          // The focus is triggered *after* the close has completed - causing it
          // to open again. So unbind and rebind the event at the next tick.
          P.$root.off('focus.toOpen').eq(0).focus();
          setTimeout(function () {
            P.$root.on('focus.toOpen', handleFocusToOpenEvent);
          }, 0);
        }

        // Remove the “active” class.
        $ELEMENT.removeClass(CLASSES.active);
        aria(ELEMENT, 'expanded', false);

        // * A Firefox bug, when `html` has `overflow:hidden`, results in
        //   killing transitions :(. So remove the “opened” state on the next tick.
        //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
        setTimeout(function () {

          // Remove the “opened” and “focused” class from the picker root.
          P.$root.removeClass(CLASSES.opened + ' ' + CLASSES.focused);
          aria(P.$root[0], 'hidden', true);
        }, 0);

        // If it’s already closed, do nothing more.
        if (!STATE.open) return P;

        // Set it as closed.
        STATE.open = false;

        // Allow the page to scroll.
        if (IS_DEFAULT_THEME) {
          $html.css('overflow', '').css('padding-right', '-=' + getScrollbarWidth());
        }

        // Unbind the document events.
        $document.off('.' + STATE.id);

        // Trigger the queued “close” events.
        return P.trigger('close');
      }, //close


      /**
       * Clear the values
       */
      clear: function (options) {
        return P.set('clear', null, options);
      }, //clear


      /**
       * Set something
       */
      set: function (thing, value, options) {

        var thingItem,
            thingValue,
            thingIsObject = $.isPlainObject(thing),
            thingObject = thingIsObject ? thing : {};

        // Make sure we have usable options.
        options = thingIsObject && $.isPlainObject(value) ? value : options || {};

        if (thing) {

          // If the thing isn’t an object, make it one.
          if (!thingIsObject) {
            thingObject[thing] = value;
          }

          // Go through the things of items to set.
          for (thingItem in thingObject) {

            // Grab the value of the thing.
            thingValue = thingObject[thingItem];

            // First, if the item exists and there’s a value, set it.
            if (thingItem in P.component.item) {
              if (thingValue === undefined) thingValue = null;
              P.component.set(thingItem, thingValue, options);
            }

            // Then, check to update the element value and broadcast a change.
            if (thingItem == 'select' || thingItem == 'clear') {
              $ELEMENT.val(thingItem == 'clear' ? '' : P.get(thingItem, SETTINGS.format)).trigger('change');
            }
          }

          // Render a new picker.
          P.render();
        }

        // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
        return options.muted ? P : P.trigger('set', thingObject);
      }, //set


      /**
       * Get something
       */
      get: function (thing, format) {

        // Make sure there’s something to get.
        thing = thing || 'value';

        // If a picker state exists, return that.
        if (STATE[thing] != null) {
          return STATE[thing];
        }

        // Return the submission value, if that.
        if (thing == 'valueSubmit') {
          if (P._hidden) {
            return P._hidden.value;
          }
          thing = 'value';
        }

        // Return the value, if that.
        if (thing == 'value') {
          return ELEMENT.value;
        }

        // Check if a component item exists, return that.
        if (thing in P.component.item) {
          if (typeof format == 'string') {
            var thingValue = P.component.get(thing);
            return thingValue ? PickerConstructor._.trigger(P.component.formats.toString, P.component, [format, thingValue]) : '';
          }
          return P.component.get(thing);
        }
      }, //get


      /**
       * Bind events on the things.
       */
      on: function (thing, method, internal) {

        var thingName,
            thingMethod,
            thingIsObject = $.isPlainObject(thing),
            thingObject = thingIsObject ? thing : {};

        if (thing) {

          // If the thing isn’t an object, make it one.
          if (!thingIsObject) {
            thingObject[thing] = method;
          }

          // Go through the things to bind to.
          for (thingName in thingObject) {

            // Grab the method of the thing.
            thingMethod = thingObject[thingName];

            // If it was an internal binding, prefix it.
            if (internal) {
              thingName = '_' + thingName;
            }

            // Make sure the thing methods collection exists.
            STATE.methods[thingName] = STATE.methods[thingName] || [];

            // Add the method to the relative method collection.
            STATE.methods[thingName].push(thingMethod);
          }
        }

        return P;
      }, //on


      /**
       * Unbind events on the things.
       */
      off: function () {
        var i,
            thingName,
            names = arguments;
        for (i = 0, namesCount = names.length; i < namesCount; i += 1) {
          thingName = names[i];
          if (thingName in STATE.methods) {
            delete STATE.methods[thingName];
          }
        }
        return P;
      },

      /**
       * Fire off method events.
       */
      trigger: function (name, data) {
        var _trigger = function (name) {
          var methodList = STATE.methods[name];
          if (methodList) {
            methodList.map(function (method) {
              PickerConstructor._.trigger(method, P, [data]);
            });
          }
        };
        _trigger('_' + name);
        _trigger(name);
        return P;
      } //trigger
      //PickerInstance.prototype


      /**
       * Wrap the picker holder components together.
       */
    };function createWrappedComponent() {

      // Create a picker wrapper holder
      return PickerConstructor._.node('div',

      // Create a picker wrapper node
      PickerConstructor._.node('div',

      // Create a picker frame
      PickerConstructor._.node('div',

      // Create a picker box node
      PickerConstructor._.node('div',

      // Create the components nodes.
      P.component.nodes(STATE.open),

      // The picker box class
      CLASSES.box),

      // Picker wrap class
      CLASSES.wrap),

      // Picker frame class
      CLASSES.frame),

      // Picker holder class
      CLASSES.holder); //endreturn
    } //createWrappedComponent


    /**
     * Prepare the input element with all bindings.
     */
    function prepareElement() {

      $ELEMENT.

      // Store the picker data by component name.
      data(NAME, P).

      // Add the “input” class name.
      addClass(CLASSES.input).

      // Remove the tabindex.
      attr('tabindex', -1).

      // If there’s a `data-value`, update the value of the element.
      val($ELEMENT.data('value') ? P.get('select', SETTINGS.format) : ELEMENT.value);

      // Only bind keydown events if the element isn’t editable.
      if (!SETTINGS.editable) {

        $ELEMENT.

        // On focus/click, focus onto the root to open it up.
        on('focus.' + STATE.id + ' click.' + STATE.id, function (event) {
          event.preventDefault();
          P.$root.eq(0).focus();
        }).

        // Handle keyboard event based on the picker being opened or not.
        on('keydown.' + STATE.id, handleKeydownEvent);
      }

      // Update the aria attributes.
      aria(ELEMENT, {
        haspopup: true,
        expanded: false,
        readonly: false,
        owns: ELEMENT.id + '_root'
      });
    }

    /**
     * Prepare the root picker element with all bindings.
     */
    function prepareElementRoot() {

      P.$root.on({

        // For iOS8.
        keydown: handleKeydownEvent,

        // When something within the root is focused, stop from bubbling
        // to the doc and remove the “focused” state from the root.
        focusin: function (event) {
          P.$root.removeClass(CLASSES.focused);
          event.stopPropagation();
        },

        // When something within the root holder is clicked, stop it
        // from bubbling to the doc.
        'mousedown click': function (event) {

          var target = event.target;

          // Make sure the target isn’t the root holder so it can bubble up.
          if (target != P.$root.children()[0]) {

            event.stopPropagation();

            // * For mousedown events, cancel the default action in order to
            //   prevent cases where focus is shifted onto external elements
            //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
            //   Also, for Firefox, don’t prevent action on the `option` element.
            if (event.type == 'mousedown' && !$(target).is('input, select, textarea, button, option')) {

              event.preventDefault();

              // Re-focus onto the root so that users can click away
              // from elements focused within the picker.
              P.$root.eq(0).focus();
            }
          }
        }
      }).

      // Add/remove the “target” class on focus and blur.
      on({
        focus: function () {
          $ELEMENT.addClass(CLASSES.target);
        },
        blur: function () {
          $ELEMENT.removeClass(CLASSES.target);
        }
      }).

      // Open the picker and adjust the root “focused” state
      on('focus.toOpen', handleFocusToOpenEvent).

      // If there’s a click on an actionable element, carry out the actions.
      on('click', '[data-pick], [data-nav], [data-clear], [data-close]', function () {

        var $target = $(this),
            targetData = $target.data(),
            targetDisabled = $target.hasClass(CLASSES.navDisabled) || $target.hasClass(CLASSES.disabled),


        // * For IE, non-focusable elements can be active elements as well
        //   (http://stackoverflow.com/a/2684561).
        activeElement = getActiveElement();
        activeElement = activeElement && (activeElement.type || activeElement.href);

        // If it’s disabled or nothing inside is actively focused, re-focus the element.
        if (targetDisabled || activeElement && !$.contains(P.$root[0], activeElement)) {
          P.$root.eq(0).focus();
        }

        // If something is superficially changed, update the `highlight` based on the `nav`.
        if (!targetDisabled && targetData.nav) {
          P.set('highlight', P.component.item.highlight, { nav: targetData.nav });
        }

        // If something is picked, set `select` then close with focus.
        else if (!targetDisabled && 'pick' in targetData) {
            P.set('select', targetData.pick);
            if (SETTINGS.closeOnSelect) {
              P.close(true);
            }
          }

          // If a “clear” button is pressed, empty the values and close with focus.
          else if (targetData.clear) {
              P.clear();
              if (SETTINGS.closeOnSelect) {
                P.close(true);
              }
            } else if (targetData.close) {
              P.close(true);
            }
      }); //P.$root

      aria(P.$root[0], 'hidden', true);
    }

    /**
     * Prepare the hidden input element along with all bindings.
     */
    function prepareElementHidden() {

      var name;

      if (SETTINGS.hiddenName === true) {
        name = ELEMENT.name;
        ELEMENT.name = '';
      } else {
        name = [typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '', typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'];
        name = name[0] + ELEMENT.name + name[1];
      }

      P._hidden = $('<input ' + 'type=hidden ' +

      // Create the name using the original input’s with a prefix and suffix.
      'name="' + name + '"' + (

      // If the element has a value, set the hidden value as well.
      $ELEMENT.data('value') || ELEMENT.value ? ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' : '') + '>')[0];

      $ELEMENT.

      // If the value changes, update the hidden input with the correct format.
      on('change.' + STATE.id, function () {
        P._hidden.value = ELEMENT.value ? P.get('select', SETTINGS.formatSubmit) : '';
      });

      // Insert the hidden input as specified in the settings.
      if (SETTINGS.container) $(SETTINGS.container).append(P._hidden);else $ELEMENT.before(P._hidden);
    }

    // For iOS8.
    function handleKeydownEvent(event) {

      var keycode = event.keyCode,


      // Check if one of the delete keys was pressed.
      isKeycodeDelete = /^(8|46)$/.test(keycode);

      // For some reason IE clears the input value on “escape”.
      if (keycode == 27) {
        P.close();
        return false;
      }

      // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
      if (keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode]) {

        // Prevent it from moving the page and bubbling to doc.
        event.preventDefault();
        event.stopPropagation();

        // If `delete` was pressed, clear the values and close the picker.
        // Otherwise open the picker.
        if (isKeycodeDelete) {
          P.clear().close();
        } else {
          P.open();
        }
      }
    }

    // Separated for IE
    function handleFocusToOpenEvent(event) {

      // Stop the event from propagating to the doc.
      event.stopPropagation();

      // If it’s a focus event, add the “focused” class to the root.
      if (event.type == 'focus') {
        P.$root.addClass(CLASSES.focused);
      }

      // And then finally open the picker.
      P.open();
    }

    // Return a new picker instance.
    return new PickerInstance();
  } //PickerConstructor


  /**
   * The default classes and prefix to use for the HTML classes.
   */
  PickerConstructor.klasses = function (prefix) {
    prefix = prefix || 'picker';
    return {

      picker: prefix,
      opened: prefix + '--opened',
      focused: prefix + '--focused',

      input: prefix + '__input',
      active: prefix + '__input--active',
      target: prefix + '__input--target',

      holder: prefix + '__holder',

      frame: prefix + '__frame',
      wrap: prefix + '__wrap',

      box: prefix + '__box'
    };
  }; //PickerConstructor.klasses


  /**
   * Check if the default theme is being used.
   */
  function isUsingDefaultTheme(element) {

    var theme,
        prop = 'position';

    // For IE.
    if (element.currentStyle) {
      theme = element.currentStyle[prop];
    }

    // For normal browsers.
    else if (window.getComputedStyle) {
        theme = getComputedStyle(element)[prop];
      }

    return theme == 'fixed';
  }

  /**
   * Get the width of the browser’s scrollbar.
   * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
   */
  function getScrollbarWidth() {

    if ($html.height() <= $window.height()) {
      return 0;
    }

    var $outer = $('<div style="visibility:hidden;width:100px" />').appendTo('body');

    // Get the width without scrollbars.
    var widthWithoutScroll = $outer[0].offsetWidth;

    // Force adding scrollbars.
    $outer.css('overflow', 'scroll');

    // Add the inner div.
    var $inner = $('<div style="width:100%" />').appendTo($outer);

    // Get the width with scrollbars.
    var widthWithScroll = $inner[0].offsetWidth;

    // Remove the divs.
    $outer.remove();

    // Return the difference between the widths.
    return widthWithoutScroll - widthWithScroll;
  }

  /**
   * PickerConstructor helper methods.
   */
  PickerConstructor._ = {

    /**
     * Create a group of nodes. Expects:
     * `
        {
            min:    {Integer},
            max:    {Integer},
            i:      {Integer},
            node:   {String},
            item:   {Function}
        }
     * `
     */
    group: function (groupObject) {

      var
      // Scope for the looped object
      loopObjectScope,


      // Create the nodes list
      nodesList = '',


      // The counter starts from the `min`
      counter = PickerConstructor._.trigger(groupObject.min, groupObject);

      // Loop from the `min` to `max`, incrementing by `i`
      for (; counter <= PickerConstructor._.trigger(groupObject.max, groupObject, [counter]); counter += groupObject.i) {

        // Trigger the `item` function within scope of the object
        loopObjectScope = PickerConstructor._.trigger(groupObject.item, groupObject, [counter]);

        // Splice the subgroup and create nodes out of the sub nodes
        nodesList += PickerConstructor._.node(groupObject.node, loopObjectScope[0], // the node
        loopObjectScope[1], // the classes
        loopObjectScope[2] // the attributes
        );
      }

      // Return the list of nodes
      return nodesList;
    }, //group


    /**
     * Create a dom node string
     */
    node: function (wrapper, item, klass, attribute) {

      // If the item is false-y, just return an empty string
      if (!item) return '';

      // If the item is an array, do a join
      item = $.isArray(item) ? item.join('') : item;

      // Check for the class
      klass = klass ? ' class="' + klass + '"' : '';

      // Check for any attributes
      attribute = attribute ? ' ' + attribute : '';

      // Return the wrapped item
      return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>';
    }, //node


    /**
     * Lead numbers below 10 with a zero.
     */
    lead: function (number) {
      return (number < 10 ? '0' : '') + number;
    },

    /**
     * Trigger a function otherwise return the value.
     */
    trigger: function (callback, scope, args) {
      return typeof callback == 'function' ? callback.apply(scope, args || []) : callback;
    },

    /**
     * If the second character is a digit, length is 2 otherwise 1.
     */
    digits: function (string) {
      return (/\d/.test(string[1]) ? 2 : 1
      );
    },

    /**
     * Tell if something is a date object.
     */
    isDate: function (value) {
      return {}.toString.call(value).indexOf('Date') > -1 && this.isInteger(value.getDate());
    },

    /**
     * Tell if something is an integer.
     */
    isInteger: function (value) {
      return {}.toString.call(value).indexOf('Number') > -1 && value % 1 === 0;
    },

    /**
     * Create ARIA attribute strings.
     */
    ariaAttr: ariaAttr //PickerConstructor._


    /**
     * Extend the picker with a component and defaults.
     */
  };PickerConstructor.extend = function (name, Component) {

    // Extend jQuery.
    $.fn[name] = function (options, action) {

      // Grab the component data.
      var componentData = this.data(name);

      // If the picker is requested, return the data object.
      if (options == 'picker') {
        return componentData;
      }

      // If the component data exists and `options` is a string, carry out the action.
      if (componentData && typeof options == 'string') {
        return PickerConstructor._.trigger(componentData[options], componentData, [action]);
      }

      // Otherwise go through each matched element and if the component
      // doesn’t exist, create a new picker using `this` element
      // and merging the defaults and options with a deep copy.
      return this.each(function () {
        var $this = $(this);
        if (!$this.data(name)) {
          new PickerConstructor(this, name, Component, options);
        }
      });
    };

    // Set the defaults.
    $.fn[name].defaults = Component.defaults;
  }; //PickerConstructor.extend


  function aria(element, attribute, value) {
    if ($.isPlainObject(attribute)) {
      for (var key in attribute) {
        ariaSet(element, key, attribute[key]);
      }
    } else {
      ariaSet(element, attribute, value);
    }
  }
  function ariaSet(element, attribute, value) {
    element.setAttribute((attribute == 'role' ? '' : 'aria-') + attribute, value);
  }
  function ariaAttr(attribute, data) {
    if (!$.isPlainObject(attribute)) {
      attribute = { attribute: data };
    }
    data = '';
    for (var key in attribute) {
      var attr = (key == 'role' ? '' : 'aria-') + key,
          attrVal = attribute[key];
      data += attrVal == null ? '' : attr + '="' + attribute[key] + '"';
    }
    return data;
  }

  // IE8 bug throws an error for activeElements within iframes.
  function getActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  // Expose the picker constructor.
  return PickerConstructor;
});
; /*!
  * Date picker for pickadate.js v3.5.0
  * http://amsul.github.io/pickadate.js/date.htm
  */

(function (factory) {
  factory(Materialize.Picker, jQuery);
})(function (Picker, $) {

  /**
   * Globals and constants
   */
  var DAYS_IN_WEEK = 7,
      WEEKS_IN_CALENDAR = 6,
      _ = Picker._;

  /**
   * The date picker constructor
   */
  function DatePicker(picker, settings) {

    var calendar = this,
        element = picker.$node[0],
        elementValue = element.value,
        elementDataValue = picker.$node.data('value'),
        valueString = elementDataValue || elementValue,
        formatString = elementDataValue ? settings.formatSubmit : settings.format,
        isRTL = function () {

      return element.currentStyle ?

      // For IE.
      element.currentStyle.direction == 'rtl' :

      // For normal browsers.
      getComputedStyle(picker.$root[0]).direction == 'rtl';
    };

    calendar.settings = settings;
    calendar.$node = picker.$node;

    // The queue of methods that will be used to build item objects.
    calendar.queue = {
      min: 'measure create',
      max: 'measure create',
      now: 'now create',
      select: 'parse create validate',
      highlight: 'parse navigate create validate',
      view: 'parse create validate viewset',
      disable: 'deactivate',
      enable: 'activate'

      // The component's item object.
    };calendar.item = {};

    calendar.item.clear = null;
    calendar.item.disable = (settings.disable || []).slice(0);
    calendar.item.enable = -function (collectionDisabled) {
      return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
    }(calendar.item.disable);

    calendar.set('min', settings.min).set('max', settings.max).set('now');

    // When there’s a value, set the `select`, which in turn
    // also sets the `highlight` and `view`.
    if (valueString) {
      calendar.set('select', valueString, { format: formatString });
    }

    // If there’s no value, default to highlighting “today”.
    else {
        calendar.set('select', null).set('highlight', calendar.item.now);
      }

    // The keycode to movement mapping.
    calendar.key = {
      40: 7, // Down
      38: -7, // Up
      39: function () {
        return isRTL() ? -1 : 1;
      }, // Right
      37: function () {
        return isRTL() ? 1 : -1;
      }, // Left
      go: function (timeChange) {
        var highlightedObject = calendar.item.highlight,
            targetDate = new Date(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange);
        calendar.set('highlight', targetDate, { interval: timeChange });
        this.render();
      }

      // Bind some picker events.
    };picker.on('render', function () {
      picker.$root.find('.' + settings.klass.selectMonth).on('change', function () {
        var value = this.value;
        if (value) {
          picker.set('highlight', [picker.get('view').year, value, picker.get('highlight').date]);
          picker.$root.find('.' + settings.klass.selectMonth).trigger('focus');
        }
      });
      picker.$root.find('.' + settings.klass.selectYear).on('change', function () {
        var value = this.value;
        if (value) {
          picker.set('highlight', [value, picker.get('view').month, picker.get('highlight').date]);
          picker.$root.find('.' + settings.klass.selectYear).trigger('focus');
        }
      });
    }, 1).on('open', function () {
      var includeToday = '';
      if (calendar.disabled(calendar.get('now'))) {
        includeToday = ':not(.' + settings.klass.buttonToday + ')';
      }
      picker.$root.find('button' + includeToday + ', select').attr('disabled', false);
    }, 1).on('close', function () {
      picker.$root.find('button, select').attr('disabled', true);
    }, 1);
  } //DatePicker


  /**
   * Set a datepicker item object.
   */
  DatePicker.prototype.set = function (type, value, options) {

    var calendar = this,
        calendarItem = calendar.item;

    // If the value is `null` just set it immediately.
    if (value === null) {
      if (type == 'clear') type = 'select';
      calendarItem[type] = value;
      return calendar;
    }

    // Otherwise go through the queue of methods, and invoke the functions.
    // Update this as the time unit, and set the final value as this item.
    // * In the case of `enable`, keep the queue but set `disable` instead.
    //   And in the case of `flip`, keep the queue but set `enable` instead.
    calendarItem[type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type] = calendar.queue[type].split(' ').map(function (method) {
      value = calendar[method](type, value, options);
      return value;
    }).pop();

    // Check if we need to cascade through more updates.
    if (type == 'select') {
      calendar.set('highlight', calendarItem.select, options);
    } else if (type == 'highlight') {
      calendar.set('view', calendarItem.highlight, options);
    } else if (type.match(/^(flip|min|max|disable|enable)$/)) {
      if (calendarItem.select && calendar.disabled(calendarItem.select)) {
        calendar.set('select', calendarItem.select, options);
      }
      if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
        calendar.set('highlight', calendarItem.highlight, options);
      }
    }

    return calendar;
  }; //DatePicker.prototype.set


  /**
   * Get a datepicker item object.
   */
  DatePicker.prototype.get = function (type) {
    return this.item[type];
  }; //DatePicker.prototype.get


  /**
   * Create a picker date object.
   */
  DatePicker.prototype.create = function (type, value, options) {

    var isInfiniteValue,
        calendar = this;

    // If there’s no value, use the type as the value.
    value = value === undefined ? type : value;

    // If it’s infinity, update the value.
    if (value == -Infinity || value == Infinity) {
      isInfiniteValue = value;
    }

    // If it’s an object, use the native date object.
    else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
        value = value.obj;
      }

      // If it’s an array, convert it into a date and make sure
      // that it’s a valid date – otherwise default to today.
      else if ($.isArray(value)) {
          value = new Date(value[0], value[1], value[2]);
          value = _.isDate(value) ? value : calendar.create().obj;
        }

        // If it’s a number or date object, make a normalized date.
        else if (_.isInteger(value) || _.isDate(value)) {
            value = calendar.normalize(new Date(value), options);
          }

          // If it’s a literal true or any other case, set it to now.
          else /*if ( value === true )*/{
              value = calendar.now(type, value, options);
            }

    // Return the compiled object.
    return {
      year: isInfiniteValue || value.getFullYear(),
      month: isInfiniteValue || value.getMonth(),
      date: isInfiniteValue || value.getDate(),
      day: isInfiniteValue || value.getDay(),
      obj: isInfiniteValue || value,
      pick: isInfiniteValue || value.getTime()
    };
  }; //DatePicker.prototype.create


  /**
   * Create a range limit object using an array, date object,
   * literal “true”, or integer relative to another time.
   */
  DatePicker.prototype.createRange = function (from, to) {

    var calendar = this,
        createDate = function (date) {
      if (date === true || $.isArray(date) || _.isDate(date)) {
        return calendar.create(date);
      }
      return date;
    };

    // Create objects if possible.
    if (!_.isInteger(from)) {
      from = createDate(from);
    }
    if (!_.isInteger(to)) {
      to = createDate(to);
    }

    // Create relative dates.
    if (_.isInteger(from) && $.isPlainObject(to)) {
      from = [to.year, to.month, to.date + from];
    } else if (_.isInteger(to) && $.isPlainObject(from)) {
      to = [from.year, from.month, from.date + to];
    }

    return {
      from: createDate(from),
      to: createDate(to)
    };
  }; //DatePicker.prototype.createRange


  /**
   * Check if a date unit falls within a date range object.
   */
  DatePicker.prototype.withinRange = function (range, dateUnit) {
    range = this.createRange(range.from, range.to);
    return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick;
  };

  /**
   * Check if two date range objects overlap.
   */
  DatePicker.prototype.overlapRanges = function (one, two) {

    var calendar = this;

    // Convert the ranges into comparable dates.
    one = calendar.createRange(one.from, one.to);
    two = calendar.createRange(two.from, two.to);

    return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) || calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to);
  };

  /**
   * Get the date today.
   */
  DatePicker.prototype.now = function (type, value, options) {
    value = new Date();
    if (options && options.rel) {
      value.setDate(value.getDate() + options.rel);
    }
    return this.normalize(value, options);
  };

  /**
   * Navigate to next/prev month.
   */
  DatePicker.prototype.navigate = function (type, value, options) {

    var targetDateObject,
        targetYear,
        targetMonth,
        targetDate,
        isTargetArray = $.isArray(value),
        isTargetObject = $.isPlainObject(value),
        viewsetObject = this.item.view; /*,
                                        safety = 100*/

    if (isTargetArray || isTargetObject) {

      if (isTargetObject) {
        targetYear = value.year;
        targetMonth = value.month;
        targetDate = value.date;
      } else {
        targetYear = +value[0];
        targetMonth = +value[1];
        targetDate = +value[2];
      }

      // If we’re navigating months but the view is in a different
      // month, navigate to the view’s year and month.
      if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
        targetYear = viewsetObject.year;
        targetMonth = viewsetObject.month;
      }

      // Figure out the expected target year and month.
      targetDateObject = new Date(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1);
      targetYear = targetDateObject.getFullYear();
      targetMonth = targetDateObject.getMonth();

      // If the month we’re going to doesn’t have enough days,
      // keep decreasing the date until we reach the month’s last date.
      while ( /*safety &&*/new Date(targetYear, targetMonth, targetDate).getMonth() !== targetMonth) {
        targetDate -= 1;
        /*safety -= 1
        if ( !safety ) {
            throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
        }*/
      }

      value = [targetYear, targetMonth, targetDate];
    }

    return value;
  }; //DatePicker.prototype.navigate


  /**
   * Normalize a date by setting the hours to midnight.
   */
  DatePicker.prototype.normalize = function (value /*, options*/) {
    value.setHours(0, 0, 0, 0);
    return value;
  };

  /**
   * Measure the range of dates.
   */
  DatePicker.prototype.measure = function (type, value /*, options*/) {

    var calendar = this;

    // If it’s anything false-y, remove the limits.
    if (!value) {
      value = type == 'min' ? -Infinity : Infinity;
    }

    // If it’s a string, parse it.
    else if (typeof value == 'string') {
        value = calendar.parse(type, value);
      }

      // If it's an integer, get a date relative to today.
      else if (_.isInteger(value)) {
          value = calendar.now(type, value, { rel: value });
        }

    return value;
  }; ///DatePicker.prototype.measure


  /**
   * Create a viewset object based on navigation.
   */
  DatePicker.prototype.viewset = function (type, dateObject /*, options*/) {
    return this.create([dateObject.year, dateObject.month, 1]);
  };

  /**
   * Validate a date as enabled and shift if needed.
   */
  DatePicker.prototype.validate = function (type, dateObject, options) {

    var calendar = this,


    // Keep a reference to the original date.
    originalDateObject = dateObject,


    // Make sure we have an interval.
    interval = options && options.interval ? options.interval : 1,


    // Check if the calendar enabled dates are inverted.
    isFlippedBase = calendar.item.enable === -1,


    // Check if we have any enabled dates after/before now.
    hasEnabledBeforeTarget,
        hasEnabledAfterTarget,


    // The min & max limits.
    minLimitObject = calendar.item.min,
        maxLimitObject = calendar.item.max,


    // Check if we’ve reached the limit during shifting.
    reachedMin,
        reachedMax,


    // Check if the calendar is inverted and at least one weekday is enabled.
    hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function (value) {

      // If there’s a date, check where it is relative to the target.
      if ($.isArray(value)) {
        var dateTime = calendar.create(value).pick;
        if (dateTime < dateObject.pick) hasEnabledBeforeTarget = true;else if (dateTime > dateObject.pick) hasEnabledAfterTarget = true;
      }

      // Return only integers for enabled weekdays.
      return _.isInteger(value);
    }).length; /*,
               safety = 100*/

    // Cases to validate for:
    // [1] Not inverted and date disabled.
    // [2] Inverted and some dates enabled.
    // [3] Not inverted and out of range.
    //
    // Cases to **not** validate for:
    // • Navigating months.
    // • Not inverted and date enabled.
    // • Inverted and all dates disabled.
    // • ..and anything else.
    if (!options || !options.nav) if (
    /* 1 */!isFlippedBase && calendar.disabled(dateObject) ||
    /* 2 */isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget) ||
    /* 3 */!isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick)) {

      // When inverted, flip the direction if there aren’t any enabled weekdays
      // and there are no enabled dates in the direction of the interval.
      if (isFlippedBase && !hasEnabledWeekdays && (!hasEnabledAfterTarget && interval > 0 || !hasEnabledBeforeTarget && interval < 0)) {
        interval *= -1;
      }

      // Keep looping until we reach an enabled date.
      while ( /*safety &&*/calendar.disabled(dateObject)) {

        /*safety -= 1
        if ( !safety ) {
            throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
        }*/

        // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
        if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
          dateObject = originalDateObject;
          interval = interval > 0 ? 1 : -1;
        }

        // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
        if (dateObject.pick <= minLimitObject.pick) {
          reachedMin = true;
          interval = 1;
          dateObject = calendar.create([minLimitObject.year, minLimitObject.month, minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)]);
        } else if (dateObject.pick >= maxLimitObject.pick) {
          reachedMax = true;
          interval = -1;
          dateObject = calendar.create([maxLimitObject.year, maxLimitObject.month, maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)]);
        }

        // If we’ve reached both limits, just break out of the loop.
        if (reachedMin && reachedMax) {
          break;
        }

        // Finally, create the shifted date using the interval and keep looping.
        dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval]);
      }
    } //endif


    // Return the date object settled on.
    return dateObject;
  }; //DatePicker.prototype.validate


  /**
   * Check if a date is disabled.
   */
  DatePicker.prototype.disabled = function (dateToVerify) {

    var calendar = this,


    // Filter through the disabled dates to check if this is one.
    isDisabledMatch = calendar.item.disable.filter(function (dateToDisable) {

      // If the date is a number, match the weekday with 0index and `firstDay` check.
      if (_.isInteger(dateToDisable)) {
        return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7;
      }

      // If it’s an array or a native JS date, create and match the exact date.
      if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
        return dateToVerify.pick === calendar.create(dateToDisable).pick;
      }

      // If it’s an object, match a date within the “from” and “to” range.
      if ($.isPlainObject(dateToDisable)) {
        return calendar.withinRange(dateToDisable, dateToVerify);
      }
    });

    // If this date matches a disabled date, confirm it’s not inverted.
    isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (dateToDisable) {
      return $.isArray(dateToDisable) && dateToDisable[3] == 'inverted' || $.isPlainObject(dateToDisable) && dateToDisable.inverted;
    }).length;

    // Check the calendar “enabled” flag and respectively flip the
    // disabled state. Then also check if it’s beyond the min/max limits.
    return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch || dateToVerify.pick < calendar.item.min.pick || dateToVerify.pick > calendar.item.max.pick;
  }; //DatePicker.prototype.disabled


  /**
   * Parse a string into a usable type.
   */
  DatePicker.prototype.parse = function (type, value, options) {

    var calendar = this,
        parsingObject = {};

    // If it’s already parsed, we’re good.
    if (!value || typeof value != 'string') {
      return value;
    }

    // We need a `.format` to parse the value with.
    if (!(options && options.format)) {
      options = options || {};
      options.format = calendar.settings.format;
    }

    // Convert the format into an array and then map through it.
    calendar.formats.toArray(options.format).map(function (label) {

      var
      // Grab the formatting label.
      formattingLabel = calendar.formats[label],


      // The format length is from the formatting label function or the
      // label length without the escaping exclamation (!) mark.
      formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, '').length;

      // If there's a format label, split the value up to the format length.
      // Then add it to the parsing object with appropriate label.
      if (formattingLabel) {
        parsingObject[label] = value.substr(0, formatLength);
      }

      // Update the value as the substring from format length to end.
      value = value.substr(formatLength);
    });

    // Compensate for month 0index.
    return [parsingObject.yyyy || parsingObject.yy, +(parsingObject.mm || parsingObject.m) - 1, parsingObject.dd || parsingObject.d];
  }; //DatePicker.prototype.parse


  /**
   * Various formats to display the object in.
   */
  DatePicker.prototype.formats = function () {

    // Return the length of the first word in a collection.
    function getWordLengthFromCollection(string, collection, dateObject) {

      // Grab the first word from the string.
      var word = string.match(/\w+/)[0];

      // If there's no month index, add it to the date object
      if (!dateObject.mm && !dateObject.m) {
        dateObject.m = collection.indexOf(word) + 1;
      }

      // Return the length of the word.
      return word.length;
    }

    // Get the length of the first word in a string.
    function getFirstWordLength(string) {
      return string.match(/\w+/)[0].length;
    }

    return {

      d: function (string, dateObject) {

        // If there's string, then get the digits length.
        // Otherwise return the selected date.
        return string ? _.digits(string) : dateObject.date;
      },
      dd: function (string, dateObject) {

        // If there's a string, then the length is always 2.
        // Otherwise return the selected date with a leading zero.
        return string ? 2 : _.lead(dateObject.date);
      },
      ddd: function (string, dateObject) {

        // If there's a string, then get the length of the first word.
        // Otherwise return the short selected weekday.
        return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day];
      },
      dddd: function (string, dateObject) {

        // If there's a string, then get the length of the first word.
        // Otherwise return the full selected weekday.
        return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day];
      },
      m: function (string, dateObject) {

        // If there's a string, then get the length of the digits
        // Otherwise return the selected month with 0index compensation.
        return string ? _.digits(string) : dateObject.month + 1;
      },
      mm: function (string, dateObject) {

        // If there's a string, then the length is always 2.
        // Otherwise return the selected month with 0index and leading zero.
        return string ? 2 : _.lead(dateObject.month + 1);
      },
      mmm: function (string, dateObject) {

        var collection = this.settings.monthsShort;

        // If there's a string, get length of the relevant month from the short
        // months collection. Otherwise return the selected month from that collection.
        return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
      },
      mmmm: function (string, dateObject) {

        var collection = this.settings.monthsFull;

        // If there's a string, get length of the relevant month from the full
        // months collection. Otherwise return the selected month from that collection.
        return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
      },
      yy: function (string, dateObject) {

        // If there's a string, then the length is always 2.
        // Otherwise return the selected year by slicing out the first 2 digits.
        return string ? 2 : ('' + dateObject.year).slice(2);
      },
      yyyy: function (string, dateObject) {

        // If there's a string, then the length is always 4.
        // Otherwise return the selected year.
        return string ? 4 : dateObject.year;
      },

      // Create an array by splitting the formatting string passed.
      toArray: function (formatString) {
        return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
      },

      // Format an object into a string using the formatting options.
      toString: function (formatString, itemObject) {
        var calendar = this;
        return calendar.formats.toArray(formatString).map(function (label) {
          return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, '');
        }).join('');
      }
    };
  }(); //DatePicker.prototype.formats


  /**
   * Check if two date units are the exact.
   */
  DatePicker.prototype.isDateExact = function (one, two) {

    var calendar = this;

    // When we’re working with weekdays, do a direct comparison.
    if (_.isInteger(one) && _.isInteger(two) || typeof one == 'boolean' && typeof two == 'boolean') {
      return one === two;
    }

    // When we’re working with date representations, compare the “pick” value.
    if ((_.isDate(one) || $.isArray(one)) && (_.isDate(two) || $.isArray(two))) {
      return calendar.create(one).pick === calendar.create(two).pick;
    }

    // When we’re working with range objects, compare the “from” and “to”.
    if ($.isPlainObject(one) && $.isPlainObject(two)) {
      return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to);
    }

    return false;
  };

  /**
   * Check if two date units overlap.
   */
  DatePicker.prototype.isDateOverlap = function (one, two) {

    var calendar = this,
        firstDay = calendar.settings.firstDay ? 1 : 0;

    // When we’re working with a weekday index, compare the days.
    if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
      one = one % 7 + firstDay;
      return one === calendar.create(two).day + 1;
    }
    if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
      two = two % 7 + firstDay;
      return two === calendar.create(one).day + 1;
    }

    // When we’re working with range objects, check if the ranges overlap.
    if ($.isPlainObject(one) && $.isPlainObject(two)) {
      return calendar.overlapRanges(one, two);
    }

    return false;
  };

  /**
   * Flip the “enabled” state.
   */
  DatePicker.prototype.flipEnable = function (val) {
    var itemObject = this.item;
    itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
  };

  /**
   * Mark a collection of dates as “disabled”.
   */
  DatePicker.prototype.deactivate = function (type, datesToDisable) {

    var calendar = this,
        disabledItems = calendar.item.disable.slice(0);

    // If we’re flipping, that’s all we need to do.
    if (datesToDisable == 'flip') {
      calendar.flipEnable();
    } else if (datesToDisable === false) {
      calendar.flipEnable(1);
      disabledItems = [];
    } else if (datesToDisable === true) {
      calendar.flipEnable(-1);
      disabledItems = [];
    }

    // Otherwise go through the dates to disable.
    else {

        datesToDisable.map(function (unitToDisable) {

          var matchFound;

          // When we have disabled items, check for matches.
          // If something is matched, immediately break out.
          for (var index = 0; index < disabledItems.length; index += 1) {
            if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
              matchFound = true;
              break;
            }
          }

          // If nothing was found, add the validated unit to the collection.
          if (!matchFound) {
            if (_.isInteger(unitToDisable) || _.isDate(unitToDisable) || $.isArray(unitToDisable) || $.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to) {
              disabledItems.push(unitToDisable);
            }
          }
        });
      }

    // Return the updated collection.
    return disabledItems;
  }; //DatePicker.prototype.deactivate


  /**
   * Mark a collection of dates as “enabled”.
   */
  DatePicker.prototype.activate = function (type, datesToEnable) {

    var calendar = this,
        disabledItems = calendar.item.disable,
        disabledItemsCount = disabledItems.length;

    // If we’re flipping, that’s all we need to do.
    if (datesToEnable == 'flip') {
      calendar.flipEnable();
    } else if (datesToEnable === true) {
      calendar.flipEnable(1);
      disabledItems = [];
    } else if (datesToEnable === false) {
      calendar.flipEnable(-1);
      disabledItems = [];
    }

    // Otherwise go through the disabled dates.
    else {

        datesToEnable.map(function (unitToEnable) {

          var matchFound, disabledUnit, index, isExactRange;

          // Go through the disabled items and try to find a match.
          for (index = 0; index < disabledItemsCount; index += 1) {

            disabledUnit = disabledItems[index];

            // When an exact match is found, remove it from the collection.
            if (calendar.isDateExact(disabledUnit, unitToEnable)) {
              matchFound = disabledItems[index] = null;
              isExactRange = true;
              break;
            }

            // When an overlapped match is found, add the “inverted” state to it.
            else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
                if ($.isPlainObject(unitToEnable)) {
                  unitToEnable.inverted = true;
                  matchFound = unitToEnable;
                } else if ($.isArray(unitToEnable)) {
                  matchFound = unitToEnable;
                  if (!matchFound[3]) matchFound.push('inverted');
                } else if (_.isDate(unitToEnable)) {
                  matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted'];
                }
                break;
              }
          }

          // If a match was found, remove a previous duplicate entry.
          if (matchFound) for (index = 0; index < disabledItemsCount; index += 1) {
            if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
              disabledItems[index] = null;
              break;
            }
          }

          // In the event that we’re dealing with an exact range of dates,
          // make sure there are no “inverted” dates because of it.
          if (isExactRange) for (index = 0; index < disabledItemsCount; index += 1) {
            if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
              disabledItems[index] = null;
              break;
            }
          }

          // If something is still matched, add it into the collection.
          if (matchFound) {
            disabledItems.push(matchFound);
          }
        });
      }

    // Return the updated collection.
    return disabledItems.filter(function (val) {
      return val != null;
    });
  }; //DatePicker.prototype.activate


  /**
   * Create a string for the nodes in the picker.
   */
  DatePicker.prototype.nodes = function (isOpen) {

    var calendar = this,
        settings = calendar.settings,
        calendarItem = calendar.item,
        nowObject = calendarItem.now,
        selectedObject = calendarItem.select,
        highlightedObject = calendarItem.highlight,
        viewsetObject = calendarItem.view,
        disabledCollection = calendarItem.disable,
        minLimitObject = calendarItem.min,
        maxLimitObject = calendarItem.max,


    // Create the calendar table head using a copy of weekday labels collection.
    // * We do a copy so we don't mutate the original array.
    tableHead = function (collection, fullCollection) {

      // If the first day should be Monday, move Sunday to the end.
      if (settings.firstDay) {
        collection.push(collection.shift());
        fullCollection.push(fullCollection.shift());
      }

      // Create and return the table head group.
      return _.node('thead', _.node('tr', _.group({
        min: 0,
        max: DAYS_IN_WEEK - 1,
        i: 1,
        node: 'th',
        item: function (counter) {
          return [collection[counter], settings.klass.weekdays, 'scope=col title="' + fullCollection[counter] + '"'];
        }
      }))); //endreturn

      // Materialize modified
    }((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter).slice(0), settings.weekdaysFull.slice(0)),
        //tableHead


    // Create the nav for next/prev month.
    createMonthNav = function (next) {

      // Otherwise, return the created month tag.
      return _.node('div', ' ', settings.klass['nav' + (next ? 'Next' : 'Prev')] + (

      // If the focused month is outside the range, disabled the button.
      next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month || !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ? ' ' + settings.klass.navDisabled : ''), 'data-nav=' + (next || -1) + ' ' + _.ariaAttr({
        role: 'button',
        controls: calendar.$node[0].id + '_table'
      }) + ' ' + 'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev) + '"'); //endreturn
    },
        //createMonthNav


    // Create the month label.
    //Materialize modified
    createMonthLabel = function (override) {

      var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull;

      // Materialize modified
      if (override == "short_months") {
        monthsCollection = settings.monthsShort;
      }

      // If there are months to select, add a dropdown menu.
      if (settings.selectMonths && override == undefined) {

        return _.node('select', _.group({
          min: 0,
          max: 11,
          i: 1,
          node: 'option',
          item: function (loopedMonth) {

            return [

            // The looped month and no classes.
            monthsCollection[loopedMonth], 0,

            // Set the value and selected index.
            'value=' + loopedMonth + (viewsetObject.month == loopedMonth ? ' selected' : '') + (viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month || viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month ? ' disabled' : '')];
          }
        }), settings.klass.selectMonth + ' browser-default', (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' + 'title="' + settings.labelMonthSelect + '"');
      }

      // Materialize modified
      if (override == "short_months") if (selectedObject != null) return monthsCollection[selectedObject.month];else return monthsCollection[viewsetObject.month];

      // If there's a need for a month selector
      return _.node('div', monthsCollection[viewsetObject.month], settings.klass.month);
    },
        //createMonthLabel


    // Create the year label.
    // Materialize modified
    createYearLabel = function (override) {

      var focusedYear = viewsetObject.year,


      // If years selector is set to a literal "true", set it to 5. Otherwise
      // divide in half to get half before and half after focused year.
      numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2);

      // If there are years to select, add a dropdown menu.
      if (numberYears) {

        var minYear = minLimitObject.year,
            maxYear = maxLimitObject.year,
            lowestYear = focusedYear - numberYears,
            highestYear = focusedYear + numberYears;

        // If the min year is greater than the lowest year, increase the highest year
        // by the difference and set the lowest year to the min year.
        if (minYear > lowestYear) {
          highestYear += minYear - lowestYear;
          lowestYear = minYear;
        }

        // If the max year is less than the highest year, decrease the lowest year
        // by the lower of the two: available and needed years. Then set the
        // highest year to the max year.
        if (maxYear < highestYear) {

          var availableYears = lowestYear - minYear,
              neededYears = highestYear - maxYear;

          lowestYear -= availableYears > neededYears ? neededYears : availableYears;
          highestYear = maxYear;
        }

        if (settings.selectYears && override == undefined) {
          return _.node('select', _.group({
            min: lowestYear,
            max: highestYear,
            i: 1,
            node: 'option',
            item: function (loopedYear) {
              return [

              // The looped year and no classes.
              loopedYear, 0,

              // Set the value and selected index.
              'value=' + loopedYear + (focusedYear == loopedYear ? ' selected' : '')];
            }
          }), settings.klass.selectYear + ' browser-default', (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' + 'title="' + settings.labelYearSelect + '"');
        }
      }

      // Materialize modified
      if (override == "raw") return _.node('div', focusedYear);

      // Otherwise just return the year focused
      return _.node('div', focusedYear, settings.klass.year);
    }; //createYearLabel


    // Materialize modified
    createDayLabel = function () {
      if (selectedObject != null) return selectedObject.date;else return nowObject.date;
    };
    createWeekdayLabel = function () {
      var display_day;

      if (selectedObject != null) display_day = selectedObject.day;else display_day = nowObject.day;
      var weekday = settings.weekdaysShort[display_day];
      return weekday;
    };

    // Create and return the entire calendar.

    return _.node(
    // Date presentation View
    'div', _.node(
    // Div for Year
    'div', createYearLabel("raw"), settings.klass.year_display) + _.node('span', createWeekdayLabel() + ', ', "picker__weekday-display") + _.node(
    // Div for short Month
    'span', createMonthLabel("short_months") + ' ', settings.klass.month_display) + _.node(
    // Div for Day
    'span', createDayLabel(), settings.klass.day_display), settings.klass.date_display) +
    // Calendar container
    _.node('div', _.node('div', _.node('div', (settings.selectYears ? createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel()) + createMonthNav() + createMonthNav(1), settings.klass.header) + _.node('table', tableHead + _.node('tbody', _.group({
      min: 0,
      max: WEEKS_IN_CALENDAR - 1,
      i: 1,
      node: 'tr',
      item: function (rowCounter) {

        // If Monday is the first day and the month starts on Sunday, shift the date back a week.
        var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0;

        return [_.group({
          min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
          max: function () {
            return this.min + DAYS_IN_WEEK - 1;
          },
          i: 1,
          node: 'td',
          item: function (targetDate) {

            // Convert the time date from a relative date to a target date.
            targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)]);

            var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
                isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
                isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
                formattedDate = _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate]);

            return [_.node('div', targetDate.date, function (klasses) {

              // Add the `infocus` or `outfocus` classes based on month in view.
              klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus);

              // Add the `today` class if needed.
              if (nowObject.pick == targetDate.pick) {
                klasses.push(settings.klass.now);
              }

              // Add the `selected` class if something's selected and the time matches.
              if (isSelected) {
                klasses.push(settings.klass.selected);
              }

              // Add the `highlighted` class if something's highlighted and the time matches.
              if (isHighlighted) {
                klasses.push(settings.klass.highlighted);
              }

              // Add the `disabled` class if something's disabled and the object matches.
              if (isDisabled) {
                klasses.push(settings.klass.disabled);
              }

              return klasses.join(' ');
            }([settings.klass.day]), 'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
              role: 'gridcell',
              label: formattedDate,
              selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
              activedescendant: isHighlighted ? true : null,
              disabled: isDisabled ? true : null
            }) + ' ' + (isDisabled ? '' : 'tabindex="0"')), '', _.ariaAttr({ role: 'presentation' })]; //endreturn
          }
        })]; //endreturn
      }
    })), settings.klass.table, 'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
      role: 'grid',
      controls: calendar.$node[0].id,
      readonly: true
    })), settings.klass.calendar_container) // end calendar

    +

    // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
    _.node('div', _.node('button', settings.today, "btn-flat picker__today waves-effect", 'type=button data-pick=' + nowObject.pick + (isOpen && !calendar.disabled(nowObject) ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })) + _.node('button', settings.clear, "btn-flat picker__clear waves-effect", 'type=button data-clear=1' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })) + _.node('button', settings.close, "btn-flat picker__close waves-effect", 'type=button data-close=true ' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })), settings.klass.footer), 'picker__container__wrapper'); //endreturn
  }; //DatePicker.prototype.nodes


  /**
   * The date picker defaults.
   */
  DatePicker.defaults = function (prefix) {

    return {

      // The title label to use for the month nav buttons
      labelMonthNext: 'Next month',
      labelMonthPrev: 'Previous month',

      // The title label to use for the dropdown selectors
      labelMonthSelect: 'Select a month',
      labelYearSelect: 'Select a year',

      // Months and weekdays
      monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

      // Materialize modified
      weekdaysLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

      // Today and clear
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',

      // Picker close behavior (Prevent a change in behaviour for backwards compatibility)
      closeOnSelect: false,

      // The format to show on the `input` element
      format: 'd mmmm, yyyy',

      // Classes
      klass: {

        table: prefix + 'table',

        header: prefix + 'header',

        // Materialize Added klasses
        date_display: prefix + 'date-display',
        day_display: prefix + 'day-display',
        month_display: prefix + 'month-display',
        year_display: prefix + 'year-display',
        calendar_container: prefix + 'calendar-container',
        // end


        navPrev: prefix + 'nav--prev',
        navNext: prefix + 'nav--next',
        navDisabled: prefix + 'nav--disabled',

        month: prefix + 'month',
        year: prefix + 'year',

        selectMonth: prefix + 'select--month',
        selectYear: prefix + 'select--year',

        weekdays: prefix + 'weekday',

        day: prefix + 'day',
        disabled: prefix + 'day--disabled',
        selected: prefix + 'day--selected',
        highlighted: prefix + 'day--highlighted',
        now: prefix + 'day--today',
        infocus: prefix + 'day--infocus',
        outfocus: prefix + 'day--outfocus',

        footer: prefix + 'footer',

        buttonClear: prefix + 'button--clear',
        buttonToday: prefix + 'button--today',
        buttonClose: prefix + 'button--close'
      }
    };
  }(Picker.klasses().picker + '__');

  /**
   * Extend the picker to add the date picker.
   */
  Picker.extend('pickadate', DatePicker);
});
; /*!
  * ClockPicker v0.0.7 (http://weareoutman.github.io/clockpicker/)
  * Copyright 2014 Wang Shenwei.
  * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
  *
  * Further modified
  * Copyright 2015 Ching Yaw Hao.
  */

(function () {
  var $ = window.jQuery,
      $win = $(window),
      $doc = $(document);

  // Can I use inline svg ?
  var svgNS = 'http://www.w3.org/2000/svg',
      svgSupported = 'SVGAngle' in window && function () {
    var supported,
        el = document.createElement('div');
    el.innerHTML = '<svg/>';
    supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
    el.innerHTML = '';
    return supported;
  }();

  // Can I use transition ?
  var transitionSupported = function () {
    var style = document.createElement('div').style;
    return 'transition' in style || 'WebkitTransition' in style || 'MozTransition' in style || 'msTransition' in style || 'OTransition' in style;
  }();

  // Listen touch events in touch screen device, instead of mouse events in desktop.
  var touchSupported = 'ontouchstart' in window,
      mousedownEvent = 'mousedown' + (touchSupported ? ' touchstart' : ''),
      mousemoveEvent = 'mousemove.clockpicker' + (touchSupported ? ' touchmove.clockpicker' : ''),
      mouseupEvent = 'mouseup.clockpicker' + (touchSupported ? ' touchend.clockpicker' : '');

  // Vibrate the device if supported
  var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

  function createSvgElement(name) {
    return document.createElementNS(svgNS, name);
  }

  function leadingZero(num) {
    return (num < 10 ? '0' : '') + num;
  }

  // Get a unique id
  var idCounter = 0;
  function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }

  // Clock size
  var dialRadius = 135,
      outerRadius = 105,

  // innerRadius = 80 on 12 hour clock
  innerRadius = 80,
      tickRadius = 20,
      diameter = dialRadius * 2,
      duration = transitionSupported ? 350 : 1;

  // Popover template
  var tpl = ['<div class="clockpicker picker">', '<div class="picker__holder">', '<div class="picker__frame">', '<div class="picker__wrap">', '<div class="picker__box">', '<div class="picker__date-display">', '<div class="clockpicker-display">', '<div class="clockpicker-display-column">', '<span class="clockpicker-span-hours text-primary"></span>', ':', '<span class="clockpicker-span-minutes"></span>', '</div>', '<div class="clockpicker-display-column clockpicker-display-am-pm">', '<div class="clockpicker-span-am-pm"></div>', '</div>', '</div>', '</div>', '<div class="picker__container__wrapper">', '<div class="picker__calendar-container">', '<div class="clockpicker-plate">', '<div class="clockpicker-canvas"></div>', '<div class="clockpicker-dial clockpicker-hours"></div>', '<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>', '</div>', '<div class="clockpicker-am-pm-block">', '</div>', '</div>', '<div class="picker__footer">', '</div>', '</div>', '</div>', '</div>', '</div>', '</div>', '</div>'].join('');

  // ClockPicker
  function ClockPicker(element, options) {
    var popover = $(tpl),
        plate = popover.find('.clockpicker-plate'),
        holder = popover.find('.picker__holder'),
        hoursView = popover.find('.clockpicker-hours'),
        minutesView = popover.find('.clockpicker-minutes'),
        amPmBlock = popover.find('.clockpicker-am-pm-block'),
        isInput = element.prop('tagName') === 'INPUT',
        input = isInput ? element : element.find('input'),
        label = $("label[for=" + input.attr("id") + "]"),
        self = this;

    this.id = uniqueId('cp');
    this.element = element;
    this.holder = holder;
    this.options = options;
    this.isAppended = false;
    this.isShown = false;
    this.currentView = 'hours';
    this.isInput = isInput;
    this.input = input;
    this.label = label;
    this.popover = popover;
    this.plate = plate;
    this.hoursView = hoursView;
    this.minutesView = minutesView;
    this.amPmBlock = amPmBlock;
    this.spanHours = popover.find('.clockpicker-span-hours');
    this.spanMinutes = popover.find('.clockpicker-span-minutes');
    this.spanAmPm = popover.find('.clockpicker-span-am-pm');
    this.footer = popover.find('.picker__footer');
    this.amOrPm = "PM";

    // Setup for for 12 hour clock if option is selected
    if (options.twelvehour) {
      if (!options.ampmclickable) {
        this.spanAmPm.empty();
        $('<div id="click-am">AM</div>').appendTo(this.spanAmPm);
        $('<div id="click-pm">PM</div>').appendTo(this.spanAmPm);
      } else {
        this.spanAmPm.empty();
        $('<div id="click-am">AM</div>').on("click", function () {
          self.spanAmPm.children('#click-am').addClass("text-primary");
          self.spanAmPm.children('#click-pm').removeClass("text-primary");
          self.amOrPm = "AM";
        }).appendTo(this.spanAmPm);
        $('<div id="click-pm">PM</div>').on("click", function () {
          self.spanAmPm.children('#click-pm').addClass("text-primary");
          self.spanAmPm.children('#click-am').removeClass("text-primary");
          self.amOrPm = 'PM';
        }).appendTo(this.spanAmPm);
      }
    }

    // Add buttons to footer
    $('<button type="button" class="btn-flat picker__clear" tabindex="' + (options.twelvehour ? '3' : '1') + '">' + options.cleartext + '</button>').click($.proxy(this.clear, this)).appendTo(this.footer);
    $('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour ? '3' : '1') + '">' + options.canceltext + '</button>').click($.proxy(this.hide, this)).appendTo(this.footer);
    $('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour ? '3' : '1') + '">' + options.donetext + '</button>').click($.proxy(this.done, this)).appendTo(this.footer);

    this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
    this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));

    // Show or toggle
    input.on('focus.clockpicker click.clockpicker', $.proxy(this.show, this));

    // Build ticks
    var tickTpl = $('<div class="clockpicker-tick"></div>'),
        i,
        tick,
        radian,
        radius;

    // Hours view
    if (options.twelvehour) {
      for (i = 1; i < 13; i += 1) {
        tick = tickTpl.clone();
        radian = i / 6 * Math.PI;
        radius = outerRadius;
        tick.css({
          left: dialRadius + Math.sin(radian) * radius - tickRadius,
          top: dialRadius - Math.cos(radian) * radius - tickRadius
        });
        tick.html(i === 0 ? '00' : i);
        hoursView.append(tick);
        tick.on(mousedownEvent, mousedown);
      }
    } else {
      for (i = 0; i < 24; i += 1) {
        tick = tickTpl.clone();
        radian = i / 6 * Math.PI;
        var inner = i > 0 && i < 13;
        radius = inner ? innerRadius : outerRadius;
        tick.css({
          left: dialRadius + Math.sin(radian) * radius - tickRadius,
          top: dialRadius - Math.cos(radian) * radius - tickRadius
        });
        tick.html(i === 0 ? '00' : i);
        hoursView.append(tick);
        tick.on(mousedownEvent, mousedown);
      }
    }

    // Minutes view
    for (i = 0; i < 60; i += 5) {
      tick = tickTpl.clone();
      radian = i / 30 * Math.PI;
      tick.css({
        left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
        top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
      });
      tick.html(leadingZero(i));
      minutesView.append(tick);
      tick.on(mousedownEvent, mousedown);
    }

    // Clicking on minutes view space
    plate.on(mousedownEvent, function (e) {
      if ($(e.target).closest('.clockpicker-tick').length === 0) {
        mousedown(e, true);
      }
    });

    // Mousedown or touchstart
    function mousedown(e, space) {
      var offset = plate.offset(),
          isTouch = /^touch/.test(e.type),
          x0 = offset.left + dialRadius,
          y0 = offset.top + dialRadius,
          dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
          dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
          z = Math.sqrt(dx * dx + dy * dy),
          moved = false;

      // When clicking on minutes view space, check the mouse position
      if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
        return;
      }
      e.preventDefault();

      // Set cursor style of body after 200ms
      var movingTimer = setTimeout(function () {
        self.popover.addClass('clockpicker-moving');
      }, 200);

      // Clock
      self.setHand(dx, dy, !space, true);

      // Mousemove on document
      $doc.off(mousemoveEvent).on(mousemoveEvent, function (e) {
        e.preventDefault();
        var isTouch = /^touch/.test(e.type),
            x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
            y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
        if (!moved && x === dx && y === dy) {
          // Clicking in chrome on windows will trigger a mousemove event
          return;
        }
        moved = true;
        self.setHand(x, y, false, true);
      });

      // Mouseup on document
      $doc.off(mouseupEvent).on(mouseupEvent, function (e) {
        $doc.off(mouseupEvent);
        e.preventDefault();
        var isTouch = /^touch/.test(e.type),
            x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
            y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
        if ((space || moved) && x === dx && y === dy) {
          self.setHand(x, y);
        }

        if (self.currentView === 'hours') {
          self.toggleView('minutes', duration / 2);
        } else if (options.autoclose) {
          self.minutesView.addClass('clockpicker-dial-out');
          setTimeout(function () {
            self.done();
          }, duration / 2);
        }
        plate.prepend(canvas);

        // Reset cursor style of body
        clearTimeout(movingTimer);
        self.popover.removeClass('clockpicker-moving');

        // Unbind mousemove event
        $doc.off(mousemoveEvent);
      });
    }

    if (svgSupported) {
      // Draw clock hands and others
      var canvas = popover.find('.clockpicker-canvas'),
          svg = createSvgElement('svg');
      svg.setAttribute('class', 'clockpicker-svg');
      svg.setAttribute('width', diameter);
      svg.setAttribute('height', diameter);
      var g = createSvgElement('g');
      g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
      var bearing = createSvgElement('circle');
      bearing.setAttribute('class', 'clockpicker-canvas-bearing');
      bearing.setAttribute('cx', 0);
      bearing.setAttribute('cy', 0);
      bearing.setAttribute('r', 4);
      var hand = createSvgElement('line');
      hand.setAttribute('x1', 0);
      hand.setAttribute('y1', 0);
      var bg = createSvgElement('circle');
      bg.setAttribute('class', 'clockpicker-canvas-bg');
      bg.setAttribute('r', tickRadius);
      g.appendChild(hand);
      g.appendChild(bg);
      g.appendChild(bearing);
      svg.appendChild(g);
      canvas.append(svg);

      this.hand = hand;
      this.bg = bg;
      this.bearing = bearing;
      this.g = g;
      this.canvas = canvas;
    }

    raiseCallback(this.options.init);
  }

  function raiseCallback(callbackFunction) {
    if (callbackFunction && typeof callbackFunction === "function") callbackFunction();
  }

  // Default options
  ClockPicker.DEFAULTS = {
    'default': '', // default time, 'now' or '13:14' e.g.
    fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
    donetext: 'Ok', // done button text
    cleartext: 'Clear',
    canceltext: 'Cancel',
    autoclose: false, // auto close when minute is selected
    ampmclickable: true, // set am/pm button on itself
    darktheme: false, // set to dark theme
    twelvehour: true, // change to 12 hour AM/PM clock from 24 hour
    vibrate: true // vibrate the device when dragging clock hand
  };

  // Show or hide popover
  ClockPicker.prototype.toggle = function () {
    this[this.isShown ? 'hide' : 'show']();
  };

  // Set popover position
  ClockPicker.prototype.locate = function () {
    var element = this.element,
        popover = this.popover,
        offset = element.offset(),
        width = element.outerWidth(),
        height = element.outerHeight(),
        align = this.options.align,
        self = this;

    popover.show();
  };

  // Show popover
  ClockPicker.prototype.show = function (e) {
    // Not show again
    if (this.isShown) {
      return;
    }
    raiseCallback(this.options.beforeShow);
    $(':input').each(function () {
      $(this).attr('tabindex', -1);
    });
    var self = this;
    // Initialize
    this.input.blur();
    this.popover.addClass('picker--opened');
    this.input.addClass('picker__input picker__input--active');
    $(document.body).css('overflow', 'hidden');
    // Get the time
    var value = ((this.input.prop('value') || this.options['default'] || '') + '').split(':');
    if (this.options.twelvehour && !(typeof value[1] === 'undefined')) {
      if (value[1].indexOf("AM") > 0) {
        this.amOrPm = 'AM';
      } else {
        this.amOrPm = 'PM';
      }
      value[1] = value[1].replace("AM", "").replace("PM", "");
    }
    if (value[0] === 'now') {
      var now = new Date(+new Date() + this.options.fromnow);
      value = [now.getHours(), now.getMinutes()];
      if (this.options.twelvehour) {
        this.amOrPm = value[0] >= 12 && value[0] < 24 ? 'PM' : 'AM';
      }
    }
    this.hours = +value[0] || 0;
    this.minutes = +value[1] || 0;
    this.spanHours.html(this.hours);
    this.spanMinutes.html(leadingZero(this.minutes));
    if (!this.isAppended) {
      // Append popover to body
      this.popover.insertAfter(this.input);
      if (this.options.twelvehour) {
        if (this.amOrPm === 'PM') {
          this.spanAmPm.children('#click-pm').addClass("text-primary");
          this.spanAmPm.children('#click-am').removeClass("text-primary");
        } else {
          this.spanAmPm.children('#click-am').addClass("text-primary");
          this.spanAmPm.children('#click-pm').removeClass("text-primary");
        }
      }
      // Reset position when resize
      $win.on('resize.clockpicker' + this.id, function () {
        if (self.isShown) {
          self.locate();
        }
      });
      this.isAppended = true;
    }
    // Toggle to hours view
    this.toggleView('hours');
    // Set position
    this.locate();
    this.isShown = true;
    // Hide when clicking or tabbing on any element except the clock and input
    $doc.on('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id, function (e) {
      var target = $(e.target);
      if (target.closest(self.popover.find('.picker__wrap')).length === 0 && target.closest(self.input).length === 0) {
        self.hide();
      }
    });
    // Hide when ESC is pressed
    $doc.on('keyup.clockpicker.' + this.id, function (e) {
      if (e.keyCode === 27) {
        self.hide();
      }
    });
    raiseCallback(this.options.afterShow);
  };
  // Hide popover
  ClockPicker.prototype.hide = function () {
    raiseCallback(this.options.beforeHide);
    this.input.removeClass('picker__input picker__input--active');
    this.popover.removeClass('picker--opened');
    $(document.body).css('overflow', 'visible');
    this.isShown = false;
    $(':input').each(function (index) {
      $(this).attr('tabindex', index + 1);
    });
    // Unbinding events on document
    $doc.off('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id);
    $doc.off('keyup.clockpicker.' + this.id);
    this.popover.hide();
    raiseCallback(this.options.afterHide);
  };
  // Toggle to hours or minutes view
  ClockPicker.prototype.toggleView = function (view, delay) {
    var raiseAfterHourSelect = false;
    if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
      raiseCallback(this.options.beforeHourSelect);
      raiseAfterHourSelect = true;
    }
    var isHours = view === 'hours',
        nextView = isHours ? this.hoursView : this.minutesView,
        hideView = isHours ? this.minutesView : this.hoursView;
    this.currentView = view;

    this.spanHours.toggleClass('text-primary', isHours);
    this.spanMinutes.toggleClass('text-primary', !isHours);

    // Let's make transitions
    hideView.addClass('clockpicker-dial-out');
    nextView.css('visibility', 'visible').removeClass('clockpicker-dial-out');

    // Reset clock hand
    this.resetClock(delay);

    // After transitions ended
    clearTimeout(this.toggleViewTimer);
    this.toggleViewTimer = setTimeout(function () {
      hideView.css('visibility', 'hidden');
    }, duration);

    if (raiseAfterHourSelect) {
      raiseCallback(this.options.afterHourSelect);
    }
  };

  // Reset clock hand
  ClockPicker.prototype.resetClock = function (delay) {
    var view = this.currentView,
        value = this[view],
        isHours = view === 'hours',
        unit = Math.PI / (isHours ? 6 : 30),
        radian = value * unit,
        radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
        x = Math.sin(radian) * radius,
        y = -Math.cos(radian) * radius,
        self = this;

    if (svgSupported && delay) {
      self.canvas.addClass('clockpicker-canvas-out');
      setTimeout(function () {
        self.canvas.removeClass('clockpicker-canvas-out');
        self.setHand(x, y);
      }, delay);
    } else this.setHand(x, y);
  };

  // Set clock hand to (x, y)
  ClockPicker.prototype.setHand = function (x, y, roundBy5, dragging) {
    var radian = Math.atan2(x, -y),
        isHours = this.currentView === 'hours',
        unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
        z = Math.sqrt(x * x + y * y),
        options = this.options,
        inner = isHours && z < (outerRadius + innerRadius) / 2,
        radius = inner ? innerRadius : outerRadius,
        value;

    if (options.twelvehour) {
      radius = outerRadius;
    }

    // Radian should in range [0, 2PI]
    if (radian < 0) {
      radian = Math.PI * 2 + radian;
    }

    // Get the round value
    value = Math.round(radian / unit);

    // Get the round radian
    radian = value * unit;

    // Correct the hours or minutes
    if (options.twelvehour) {
      if (isHours) {
        if (value === 0) value = 12;
      } else {
        if (roundBy5) value *= 5;
        if (value === 60) value = 0;
      }
    } else {
      if (isHours) {
        if (value === 12) value = 0;
        value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
      } else {
        if (roundBy5) value *= 5;
        if (value === 60) value = 0;
      }
    }

    // Once hours or minutes changed, vibrate the device
    if (this[this.currentView] !== value) {
      if (vibrate && this.options.vibrate) {
        // Do not vibrate too frequently
        if (!this.vibrateTimer) {
          navigator[vibrate](10);
          this.vibrateTimer = setTimeout($.proxy(function () {
            this.vibrateTimer = null;
          }, this), 100);
        }
      }
    }

    this[this.currentView] = value;
    if (isHours) {
      this['spanHours'].html(value);
    } else {
      this['spanMinutes'].html(leadingZero(value));
    }

    // If svg is not supported, just add an active class to the tick
    if (!svgSupported) {
      this[isHours ? 'hoursView' : 'minutesView'].find('.clockpicker-tick').each(function () {
        var tick = $(this);
        tick.toggleClass('active', value === +tick.html());
      });
      return;
    }

    // Set clock hand and others' position
    var cx1 = Math.sin(radian) * (radius - tickRadius),
        cy1 = -Math.cos(radian) * (radius - tickRadius),
        cx2 = Math.sin(radian) * radius,
        cy2 = -Math.cos(radian) * radius;
    this.hand.setAttribute('x2', cx1);
    this.hand.setAttribute('y2', cy1);
    this.bg.setAttribute('cx', cx2);
    this.bg.setAttribute('cy', cy2);
  };

  // Hours and minutes are selected
  ClockPicker.prototype.done = function () {
    raiseCallback(this.options.beforeDone);
    this.hide();
    this.label.addClass('active');

    var last = this.input.prop('value'),
        value = leadingZero(this.hours) + ':' + leadingZero(this.minutes);
    if (this.options.twelvehour) {
      value = value + this.amOrPm;
    }

    this.input.prop('value', value);
    if (value !== last) {
      this.input.triggerHandler('change');
      if (!this.isInput) {
        this.element.trigger('change');
      }
    }

    if (this.options.autoclose) this.input.trigger('blur');

    raiseCallback(this.options.afterDone);
  };

  // Clear input field
  ClockPicker.prototype.clear = function () {
    this.hide();
    this.label.removeClass('active');

    var last = this.input.prop('value'),
        value = '';

    this.input.prop('value', value);
    if (value !== last) {
      this.input.triggerHandler('change');
      if (!this.isInput) {
        this.element.trigger('change');
      }
    }

    if (this.options.autoclose) {
      this.input.trigger('blur');
    }
  };

  // Remove clockpicker from input
  ClockPicker.prototype.remove = function () {
    this.element.removeData('clockpicker');
    this.input.off('focus.clockpicker click.clockpicker');
    if (this.isShown) {
      this.hide();
    }
    if (this.isAppended) {
      $win.off('resize.clockpicker' + this.id);
      this.popover.remove();
    }
  };

  // Extends $.fn.clockpicker
  $.fn.pickatime = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var $this = $(this),
          data = $this.data('clockpicker');
      if (!data) {
        var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
        $this.data('clockpicker', new ClockPicker($this, options));
      } else {
        // Manual operatsions. show, hide, remove, e.g.
        if (typeof data[option] === 'function') {
          data[option].apply(data, args);
        }
      }
    });
  };
})();
;(function ($) {

  $.fn.characterCounter = function () {
    return this.each(function () {
      var $input = $(this);
      var $counterElement = $input.parent().find('span[class="character-counter"]');

      // character counter has already been added appended to the parent container
      if ($counterElement.length) {
        return;
      }

      var itHasLengthAttribute = $input.attr('data-length') !== undefined;

      if (itHasLengthAttribute) {
        $input.on('input', updateCounter);
        $input.on('focus', updateCounter);
        $input.on('blur', removeCounterElement);

        addCounterElement($input);
      }
    });
  };

  function updateCounter() {
    var maxLength = +$(this).attr('data-length'),
        actualLength = +$(this).val().length,
        isValidLength = actualLength <= maxLength;

    $(this).parent().find('span[class="character-counter"]').html(actualLength + '/' + maxLength);

    addInputStyle(isValidLength, $(this));
  }

  function addCounterElement($input) {
    var $counterElement = $input.parent().find('span[class="character-counter"]');

    if ($counterElement.length) {
      return;
    }

    $counterElement = $('<span/>').addClass('character-counter').css('float', 'right').css('font-size', '12px').css('height', 1);

    $input.parent().append($counterElement);
  }

  function removeCounterElement() {
    $(this).parent().find('span[class="character-counter"]').html('');
  }

  function addInputStyle(isValidLength, $input) {
    var inputHasInvalidClass = $input.hasClass('invalid');
    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass('invalid');
    } else if (!isValidLength && !inputHasInvalidClass) {
      $input.removeClass('valid');
      $input.addClass('invalid');
    }
  }

  $(document).ready(function () {
    $('input, textarea').characterCounter();
  });
})(jQuery);
;(function ($) {

  var methods = {

    init: function (options) {
      var defaults = {
        duration: 200, // ms
        dist: -100, // zoom scale TODO: make this more intuitive as an option
        shift: 0, // spacing for center image
        padding: 0, // Padding between non center items
        fullWidth: false, // Change to full width styles
        indicators: false, // Toggle indicators
        noWrap: false, // Don't wrap around and cycle through items.
        onCycleTo: null // Callback for when a new slide is cycled to.
      };
      options = $.extend(defaults, options);
      var namespace = Materialize.objectSelectorString($(this));

      return this.each(function (i) {

        var images, item_width, item_height, offset, center, pressed, dim, count, reference, referenceY, amplitude, target, velocity, scrolling, xform, frame, timestamp, ticker, dragged, vertical_dragged;
        var $indicators = $('<ul class="indicators"></ul>');
        var scrollingTimeout = null;
        var oneTimeCallback = null;

        // Initialize
        var view = $(this);
        var hasMultipleSlides = view.find('.carousel-item').length > 1;
        var showIndicators = (view.attr('data-indicators') || options.indicators) && hasMultipleSlides;
        var noWrap = view.attr('data-no-wrap') || options.noWrap || !hasMultipleSlides;
        var uniqueNamespace = view.attr('data-namespace') || namespace + i;
        view.attr('data-namespace', uniqueNamespace);

        // Options
        var setCarouselHeight = function (imageOnly) {
          var firstSlide = view.find('.carousel-item.active').length ? view.find('.carousel-item.active').first() : view.find('.carousel-item').first();
          var firstImage = firstSlide.find('img').first();
          if (firstImage.length) {
            if (firstImage[0].complete) {
              // If image won't trigger the load event
              var imageHeight = firstImage.height();
              if (imageHeight > 0) {
                view.css('height', firstImage.height());
              } else {
                // If image still has no height, use the natural dimensions to calculate
                var naturalWidth = firstImage[0].naturalWidth;
                var naturalHeight = firstImage[0].naturalHeight;
                var adjustedHeight = view.width() / naturalWidth * naturalHeight;
                view.css('height', adjustedHeight);
              }
            } else {
              // Get height when image is loaded normally
              firstImage.on('load', function () {
                view.css('height', $(this).height());
              });
            }
          } else if (!imageOnly) {
            var slideHeight = firstSlide.height();
            view.css('height', slideHeight);
          }
        };

        if (options.fullWidth) {
          options.dist = 0;
          setCarouselHeight();

          // Offset fixed items when indicators.
          if (showIndicators) {
            view.find('.carousel-fixed-item').addClass('with-indicators');
          }
        }

        // Don't double initialize.
        if (view.hasClass('initialized')) {
          // Recalculate variables
          $(window).trigger('resize');

          // Redraw carousel.
          view.trigger('carouselNext', [0.000001]);
          return true;
        }

        view.addClass('initialized');
        pressed = false;
        offset = target = 0;
        images = [];
        item_width = view.find('.carousel-item').first().innerWidth();
        item_height = view.find('.carousel-item').first().innerHeight();
        dim = item_width * 2 + options.padding;

        view.find('.carousel-item').each(function (i) {
          images.push($(this)[0]);
          if (showIndicators) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Add active to first by default.
            if (i === 0) {
              $indicator.addClass('active');
            }

            // Handle clicks on indicators.
            $indicator.click(function (e) {
              e.stopPropagation();

              var index = $(this).index();
              cycleTo(index);
            });
            $indicators.append($indicator);
          }
        });

        if (showIndicators) {
          view.append($indicators);
        }
        count = images.length;

        function setupEvents() {
          if (typeof window.ontouchstart !== 'undefined') {
            view.on('touchstart.carousel', tap);
            view.on('touchmove.carousel', drag);
            view.on('touchend.carousel', release);
          }
          view.on('mousedown.carousel', tap);
          view.on('mousemove.carousel', drag);
          view.on('mouseup.carousel', release);
          view.on('mouseleave.carousel', release);
          view.on('click.carousel', click);
        }

        function xpos(e) {
          // touch event
          if (e.targetTouches && e.targetTouches.length >= 1) {
            return e.targetTouches[0].clientX;
          }

          // mouse event
          return e.clientX;
        }

        function ypos(e) {
          // touch event
          if (e.targetTouches && e.targetTouches.length >= 1) {
            return e.targetTouches[0].clientY;
          }

          // mouse event
          return e.clientY;
        }

        function wrap(x) {
          return x >= count ? x % count : x < 0 ? wrap(count + x % count) : x;
        }

        function scroll(x) {
          // Track scrolling state
          scrolling = true;
          if (!view.hasClass('scrolling')) {
            view.addClass('scrolling');
          }
          if (scrollingTimeout != null) {
            window.clearTimeout(scrollingTimeout);
          }
          scrollingTimeout = window.setTimeout(function () {
            scrolling = false;
            view.removeClass('scrolling');
          }, options.duration);

          // Start actual scroll
          var i, half, delta, dir, tween, el, alignment, xTranslation;
          var lastCenter = center;

          offset = typeof x === 'number' ? x : offset;
          center = Math.floor((offset + dim / 2) / dim);
          delta = offset - center * dim;
          dir = delta < 0 ? 1 : -1;
          tween = -dir * delta * 2 / dim;
          half = count >> 1;

          if (!options.fullWidth) {
            alignment = 'translateX(' + (view[0].clientWidth - item_width) / 2 + 'px) ';
            alignment += 'translateY(' + (view[0].clientHeight - item_height) / 2 + 'px)';
          } else {
            alignment = 'translateX(0)';
          }

          // Set indicator active
          if (showIndicators) {
            var diff = center % count;
            var activeIndicator = $indicators.find('.indicator-item.active');
            if (activeIndicator.index() !== diff) {
              activeIndicator.removeClass('active');
              $indicators.find('.indicator-item').eq(diff).addClass('active');
            }
          }

          // center
          // Don't show wrapped items.
          if (!noWrap || center >= 0 && center < count) {
            el = images[wrap(center)];

            // Add active class to center item.
            if (!$(el).hasClass('active')) {
              view.find('.carousel-item').removeClass('active');
              $(el).addClass('active');
            }
            el.style[xform] = alignment + ' translateX(' + -delta / 2 + 'px)' + ' translateX(' + dir * options.shift * tween * i + 'px)' + ' translateZ(' + options.dist * tween + 'px)';
            el.style.zIndex = 0;
            if (options.fullWidth) {
              tweenedOpacity = 1;
            } else {
              tweenedOpacity = 1 - 0.2 * tween;
            }
            el.style.opacity = tweenedOpacity;
            el.style.display = 'block';
          }

          for (i = 1; i <= half; ++i) {
            // right side
            if (options.fullWidth) {
              zTranslation = options.dist;
              tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
            } else {
              zTranslation = options.dist * (i * 2 + tween * dir);
              tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
            }
            // Don't show wrapped items.
            if (!noWrap || center + i < count) {
              el = images[wrap(center + i)];
              el.style[xform] = alignment + ' translateX(' + (options.shift + (dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
              el.style.zIndex = -i;
              el.style.opacity = tweenedOpacity;
              el.style.display = 'block';
            }

            // left side
            if (options.fullWidth) {
              zTranslation = options.dist;
              tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
            } else {
              zTranslation = options.dist * (i * 2 - tween * dir);
              tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
            }
            // Don't show wrapped items.
            if (!noWrap || center - i >= 0) {
              el = images[wrap(center - i)];
              el.style[xform] = alignment + ' translateX(' + (-options.shift + (-dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
              el.style.zIndex = -i;
              el.style.opacity = tweenedOpacity;
              el.style.display = 'block';
            }
          }

          // center
          // Don't show wrapped items.
          if (!noWrap || center >= 0 && center < count) {
            el = images[wrap(center)];
            el.style[xform] = alignment + ' translateX(' + -delta / 2 + 'px)' + ' translateX(' + dir * options.shift * tween + 'px)' + ' translateZ(' + options.dist * tween + 'px)';
            el.style.zIndex = 0;
            if (options.fullWidth) {
              tweenedOpacity = 1;
            } else {
              tweenedOpacity = 1 - 0.2 * tween;
            }
            el.style.opacity = tweenedOpacity;
            el.style.display = 'block';
          }

          // onCycleTo callback
          if (lastCenter !== center && typeof options.onCycleTo === "function") {
            var $curr_item = view.find('.carousel-item').eq(wrap(center));
            options.onCycleTo.call(this, $curr_item, dragged);
          }

          // One time callback
          if (typeof oneTimeCallback === "function") {
            oneTimeCallback.call(this, $curr_item, dragged);
            oneTimeCallback = null;
          }
        }

        function track() {
          var now, elapsed, delta, v;

          now = Date.now();
          elapsed = now - timestamp;
          timestamp = now;
          delta = offset - frame;
          frame = offset;

          v = 1000 * delta / (1 + elapsed);
          velocity = 0.8 * v + 0.2 * velocity;
        }

        function autoScroll() {
          var elapsed, delta;

          if (amplitude) {
            elapsed = Date.now() - timestamp;
            delta = amplitude * Math.exp(-elapsed / options.duration);
            if (delta > 2 || delta < -2) {
              scroll(target - delta);
              requestAnimationFrame(autoScroll);
            } else {
              scroll(target);
            }
          }
        }

        function click(e) {
          // Disable clicks if carousel was dragged.
          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else if (!options.fullWidth) {
            var clickedIndex = $(e.target).closest('.carousel-item').index();
            var diff = wrap(center) - clickedIndex;

            // Disable clicks if carousel was shifted by click
            if (diff !== 0) {
              e.preventDefault();
              e.stopPropagation();
            }
            cycleTo(clickedIndex);
          }
        }

        function cycleTo(n) {
          var diff = center % count - n;

          // Account for wraparound.
          if (!noWrap) {
            if (diff < 0) {
              if (Math.abs(diff + count) < Math.abs(diff)) {
                diff += count;
              }
            } else if (diff > 0) {
              if (Math.abs(diff - count) < diff) {
                diff -= count;
              }
            }
          }

          // Call prev or next accordingly.
          if (diff < 0) {
            view.trigger('carouselNext', [Math.abs(diff)]);
          } else if (diff > 0) {
            view.trigger('carouselPrev', [diff]);
          }
        }

        function tap(e) {
          // Fixes firefox draggable image bug
          if (e.type === 'mousedown' && $(e.target).is('img')) {
            e.preventDefault();
          }
          pressed = true;
          dragged = false;
          vertical_dragged = false;
          reference = xpos(e);
          referenceY = ypos(e);

          velocity = amplitude = 0;
          frame = offset;
          timestamp = Date.now();
          clearInterval(ticker);
          ticker = setInterval(track, 100);
        }

        function drag(e) {
          var x, delta, deltaY;
          if (pressed) {
            x = xpos(e);
            y = ypos(e);
            delta = reference - x;
            deltaY = Math.abs(referenceY - y);
            if (deltaY < 30 && !vertical_dragged) {
              // If vertical scrolling don't allow dragging.
              if (delta > 2 || delta < -2) {
                dragged = true;
                reference = x;
                scroll(offset + delta);
              }
            } else if (dragged) {
              // If dragging don't allow vertical scroll.
              e.preventDefault();
              e.stopPropagation();
              return false;
            } else {
              // Vertical scrolling.
              vertical_dragged = true;
            }
          }

          if (dragged) {
            // If dragging don't allow vertical scroll.
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }

        function release(e) {
          if (pressed) {
            pressed = false;
          } else {
            return;
          }

          clearInterval(ticker);
          target = offset;
          if (velocity > 10 || velocity < -10) {
            amplitude = 0.9 * velocity;
            target = offset + amplitude;
          }
          target = Math.round(target / dim) * dim;

          // No wrap of items.
          if (noWrap) {
            if (target >= dim * (count - 1)) {
              target = dim * (count - 1);
            } else if (target < 0) {
              target = 0;
            }
          }
          amplitude = target - offset;
          timestamp = Date.now();
          requestAnimationFrame(autoScroll);

          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
          }
          return false;
        }

        xform = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
          var e = prefix + 'Transform';
          if (typeof document.body.style[e] !== 'undefined') {
            xform = e;
            return false;
          }
          return true;
        });

        var throttledResize = Materialize.throttle(function () {
          if (options.fullWidth) {
            item_width = view.find('.carousel-item').first().innerWidth();
            var imageHeight = view.find('.carousel-item.active').height();
            dim = item_width * 2 + options.padding;
            offset = center * 2 * item_width;
            target = offset;
            setCarouselHeight(true);
          } else {
            scroll();
          }
        }, 200);
        $(window).off('resize.carousel-' + uniqueNamespace).on('resize.carousel-' + uniqueNamespace, throttledResize);

        setupEvents();
        scroll(offset);

        $(this).on('carouselNext', function (e, n, callback) {
          if (n === undefined) {
            n = 1;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }

          target = dim * Math.round(offset / dim) + dim * n;
          if (offset !== target) {
            amplitude = target - offset;
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
          }
        });

        $(this).on('carouselPrev', function (e, n, callback) {
          if (n === undefined) {
            n = 1;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }

          target = dim * Math.round(offset / dim) - dim * n;
          if (offset !== target) {
            amplitude = target - offset;
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
          }
        });

        $(this).on('carouselSet', function (e, n, callback) {
          if (n === undefined) {
            n = 0;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }

          cycleTo(n);
        });
      });
    },
    next: function (n, callback) {
      $(this).trigger('carouselNext', [n, callback]);
    },
    prev: function (n, callback) {
      $(this).trigger('carouselPrev', [n, callback]);
    },
    set: function (n, callback) {
      $(this).trigger('carouselSet', [n, callback]);
    },
    destroy: function () {
      var uniqueNamespace = $(this).attr('data-namespace');
      $(this).removeAttr('data-namespace');
      $(this).removeClass('initialized');
      $(this).find('.indicators').remove();

      // Remove event handlers
      $(this).off('carouselNext carouselPrev carouselSet');
      $(window).off('resize.carousel-' + uniqueNamespace);
      if (typeof window.ontouchstart !== 'undefined') {
        $(this).off('touchstart.carousel touchmove.carousel touchend.carousel');
      }
      $(this).off('mousedown.carousel mousemove.carousel mouseup.carousel mouseleave.carousel click.carousel');
    }
  };

  $.fn.carousel = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.carousel');
    }
  }; // Plugin end
})(jQuery);
;(function ($) {

  var methods = {
    init: function (options) {
      return this.each(function () {
        var origin = $('#' + $(this).attr('data-activates'));
        var screen = $('body');

        // Creating tap target
        var tapTargetEl = $(this);
        var tapTargetWrapper = tapTargetEl.parent('.tap-target-wrapper');
        var tapTargetWave = tapTargetWrapper.find('.tap-target-wave');
        var tapTargetOriginEl = tapTargetWrapper.find('.tap-target-origin');
        var tapTargetContentEl = tapTargetEl.find('.tap-target-content');

        // Creating wrapper
        if (!tapTargetWrapper.length) {
          tapTargetWrapper = tapTargetEl.wrap($('<div class="tap-target-wrapper"></div>')).parent();
        }

        // Creating content
        if (!tapTargetContentEl.length) {
          tapTargetContentEl = $('<div class="tap-target-content"></div>');
          tapTargetEl.append(tapTargetContentEl);
        }

        // Creating foreground wave
        if (!tapTargetWave.length) {
          tapTargetWave = $('<div class="tap-target-wave"></div>');

          // Creating origin
          if (!tapTargetOriginEl.length) {
            tapTargetOriginEl = origin.clone(true, true);
            tapTargetOriginEl.addClass('tap-target-origin');
            tapTargetOriginEl.removeAttr('id');
            tapTargetOriginEl.removeAttr('style');
            tapTargetWave.append(tapTargetOriginEl);
          }

          tapTargetWrapper.append(tapTargetWave);
        }

        // Open
        var openTapTarget = function () {
          if (tapTargetWrapper.is('.open')) {
            return;
          }

          // Adding open class
          tapTargetWrapper.addClass('open');

          setTimeout(function () {
            tapTargetOriginEl.off('click.tapTarget').on('click.tapTarget', function (e) {
              closeTapTarget();
              tapTargetOriginEl.off('click.tapTarget');
            });

            $(document).off('click.tapTarget').on('click.tapTarget', function (e) {
              closeTapTarget();
              $(document).off('click.tapTarget');
            });

            var throttledCalc = Materialize.throttle(function () {
              calculateTapTarget();
            }, 200);
            $(window).off('resize.tapTarget').on('resize.tapTarget', throttledCalc);
          }, 0);
        };

        // Close
        var closeTapTarget = function () {
          if (!tapTargetWrapper.is('.open')) {
            return;
          }

          tapTargetWrapper.removeClass('open');
          tapTargetOriginEl.off('click.tapTarget');
          $(document).off('click.tapTarget');
          $(window).off('resize.tapTarget');
        };

        // Pre calculate
        var calculateTapTarget = function () {
          // Element or parent is fixed position?
          var isFixed = origin.css('position') === 'fixed';
          if (!isFixed) {
            var parents = origin.parents();
            for (var i = 0; i < parents.length; i++) {
              isFixed = $(parents[i]).css('position') == 'fixed';
              if (isFixed) {
                break;
              }
            }
          }

          // Calculating origin
          var originWidth = origin.outerWidth();
          var originHeight = origin.outerHeight();
          var originTop = isFixed ? origin.offset().top - $(document).scrollTop() : origin.offset().top;
          var originLeft = isFixed ? origin.offset().left - $(document).scrollLeft() : origin.offset().left;

          // Calculating screen
          var windowWidth = $(window).width();
          var windowHeight = $(window).height();
          var centerX = windowWidth / 2;
          var centerY = windowHeight / 2;
          var isLeft = originLeft <= centerX;
          var isRight = originLeft > centerX;
          var isTop = originTop <= centerY;
          var isBottom = originTop > centerY;
          var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;
          var isCenterY = originTop >= windowHeight * 0.25 && originTop <= windowHeight * 0.75;

          // Calculating tap target
          var tapTargetWidth = tapTargetEl.outerWidth();
          var tapTargetHeight = tapTargetEl.outerHeight();
          var tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
          var tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
          var tapTargetPosition = isFixed ? 'fixed' : 'absolute';

          // Calculating content
          var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
          var tapTargetTextHeight = tapTargetHeight / 2;
          var tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
          var tapTargetTextBottom = 0;
          var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
          var tapTargetTextRight = 0;
          var tapTargetTextPadding = originWidth;
          var tapTargetTextAlign = isBottom ? 'bottom' : 'top';

          // Calculating wave
          var tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
          var tapTargetWaveHeight = tapTargetWaveWidth;
          var tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
          var tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;

          // Setting tap target
          var tapTargetWrapperCssObj = {};
          tapTargetWrapperCssObj.top = isTop ? tapTargetTop : '';
          tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth : '';
          tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight : '';
          tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft : '';
          tapTargetWrapperCssObj.position = tapTargetPosition;
          tapTargetWrapper.css(tapTargetWrapperCssObj);

          // Setting content
          tapTargetContentEl.css({
            width: tapTargetTextWidth,
            height: tapTargetTextHeight,
            top: tapTargetTextTop,
            right: tapTargetTextRight,
            bottom: tapTargetTextBottom,
            left: tapTargetTextLeft,
            padding: tapTargetTextPadding,
            verticalAlign: tapTargetTextAlign
          });

          // Setting wave
          tapTargetWave.css({
            top: tapTargetWaveTop,
            left: tapTargetWaveLeft,
            width: tapTargetWaveWidth,
            height: tapTargetWaveHeight
          });
        };

        if (options == 'open') {
          calculateTapTarget();
          openTapTarget();
        }

        if (options == 'close') closeTapTarget();
      });
    },
    open: function () {},
    close: function () {}
  };

  $.fn.tapTarget = function (methodOrOptions) {
    if (methods[methodOrOptions] || typeof methodOrOptions === 'object') return methods.init.apply(this, arguments);

    $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tap-target');
  };
})(jQuery);
