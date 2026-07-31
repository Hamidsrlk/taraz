(function () {
  'use strict';

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var WAVE = [
    [0, 0], [0.10, 0], [0.17, -7], [0.24, 6], [0.31, -5],
    [0.40, 0], [0.52, -24], [0.62, 9], [0.70, -6], [0.78, 5],
    [0.86, 0], [1, 0]
  ];
  var SPIKE_T = 0.52;

  function initBrandLogo(container, opts) {
    opts = opts || {};
    if (!container || container.querySelector('.brand-svg')) return;

    var tpl = document.getElementById('brandLogoTpl');
    if (!tpl) return;
    var svg = tpl.content.firstElementChild.cloneNode(true);
    container.appendChild(svg);

    function measureWord() {
      var meas = svg.querySelector('.word-meas');
      if (!meas) return;
      try {
        var box = meas.getBBox();
        var eT = meas.getExtentOfChar(0);
        var eZ = meas.getExtentOfChar(4);
        if (eT.width > 0 && eZ.width > 0) return { box: box, T: eT, Z: eZ };
      } catch (e) {}
      // Fallback
      try {
        var b = meas.getBBox();
        return { box: b, T: { x: 8, width: 62 }, Z: { x: 288, width: 50 } };
      } catch (e2) {}
      return null;
    }

    function compute() {
      var m = measureWord();
      if (!m) return;
      var cT = m.T.x + m.T.width / 2;
      var cZ = m.Z.x + m.Z.width / 2;
      var lineY = m.box.y + m.box.height + 28;

      // Position "T" - already at x=8, just set stroke
      // Position "araz" - right after T
      var rest = svg.querySelector('.word-rest');
      if (rest) rest.setAttribute('x', (m.T.x + m.T.width - 2).toFixed(1));

      // Waveform
      var segEnd = cZ - 10;
      var d = '', nodeX = 0, nodeY = 0;
      WAVE.forEach(function (p, i) {
        var x = cT + p[0] * (segEnd - cT);
        var y = lineY + p[1];
        d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
        if (Math.abs(p[0] - SPIKE_T) < 0.001) { nodeX = x; nodeY = y; }
      });
      var tipX = cZ - 2, tipY = lineY - 9;
      d += 'L' + tipX.toFixed(2) + ' ' + tipY.toFixed(2);

      var sig = svg.querySelector('.sig');
      if (sig) sig.setAttribute('d', d.trim());

      var arrow = svg.querySelector('.arrow');
      if (arrow) arrow.setAttribute('d', 'M' + (tipX - 10).toFixed(2) + ' ' + tipY.toFixed(2) + ' L' + tipX.toFixed(2) + ' ' + tipY.toFixed(2) + ' L' + (tipX - 2).toFixed(2) + ' ' + (tipY + 9).toFixed(2));

      var nodeG = svg.querySelector('.node-pop');
      if (nodeG) {
        nodeG.querySelectorAll('circle').forEach(function (c) {
          c.setAttribute('cx', nodeX.toFixed(2));
          c.setAttribute('cy', nodeY.toFixed(2));
        });
      }

      // Fit viewBox to all visible content
      try {
        var all = svg.querySelector('.word-group');
        if (all) {
          var gB = all.getBBox();
          var y2 = lineY + 36;
          var p = 14;
          svg.setAttribute('viewBox', (gB.x - p).toFixed(1) + ' ' + (gB.y - p).toFixed(1) + ' ' + (gB.width + 2 * p).toFixed(1) + ' ' + (y2 + p - gB.y + p).toFixed(1));
        }
      } catch (e) {}

      // Pulse
      if (!reducedMotion && opts.pulse !== false) startPulse(svg);
    }

    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('700 96px "Space Grotesk"')]).then(compute).catch(compute);
      setTimeout(compute, 1600);
    } else {
      compute();
    }
  }

  function startPulse(svg) {
    if (reducedMotion) return;
    var path = svg.querySelector('.sig');
    var dot = svg.querySelector('.sig-dot');
    if (!path || !dot) return;
    var len = 0; try { len = path.getTotalLength(); } catch (e) { return; }
    var dur = 2800, t0 = performance.now();
    function loop(now) {
      var t = ((now - t0) % dur) / dur;
      try { var pt = path.getPointAtLength(t * len); dot.setAttribute('cx', pt.x.toFixed(2)); dot.setAttribute('cy', pt.y.toFixed(2)); } catch (e) {}
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  window.initBrandLogo = initBrandLogo;
})();
