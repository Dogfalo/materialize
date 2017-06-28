// Custom Easing
jQuery.extend( jQuery.easing,
{
  easeInOutMaterial: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return c/4*((t-=2)*t*t + 2) + b;
  }
});