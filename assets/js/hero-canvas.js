(function () {
  'use strict';

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    window.initParticleCanvas = function () {};
    return;
  }

  var canvas = null;
  var ctx = null;
  var width = 0;
  var height = 0;
  var raf = 0;
  var running = false;

  var mouseX = 0.5;
  var mouseY = 0.5;
  var curX = 0.5;
  var curY = 0.5;

  function resize() {
    if (!canvas) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    if (!running || !ctx) return;
    ctx.clearRect(0, 0, width, height);

    var cx = curX * width;
    var cy = curY * height;

    var r = Math.max(width, height) * 0.6;
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, 'rgba(79, 70, 229, 0.025)');
    g.addColorStop(0.4, 'rgba(79, 70, 229, 0.008)');
    g.addColorStop(1, 'rgba(79, 70, 229, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
  }

  function animate() {
    if (!running) return;
    curX += (mouseX - curX) * 0.025;
    curY += (mouseY - curY) * 0.025;
    draw();
    raf = requestAnimationFrame(animate);
  }

  function onMouseMove(e) {
    mouseX = e.clientX / width;
    mouseY = e.clientY / height;
  }

  function onResize() {
    resize();
  }

  window.initParticleCanvas = function (container) {
    if (!container) {
      canvas = document.getElementById('hero-canvas');
      if (!canvas) return;
    } else {
      canvas = typeof container === 'string' ? document.querySelector(container) : container;
      if (!canvas) return;
    }

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    running = true;
    resize();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    animate();
  };

  window.destroyParticleCanvas = function () {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    canvas = null;
    ctx = null;
  };
})();
