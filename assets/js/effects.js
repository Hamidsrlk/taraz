(function () {
  'use strict';

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, root) { root = root || document; return root.querySelector(sel); }
  function $$(sel, root) {
    root = root || document;
    return Array.prototype.slice.call(root.querySelectorAll(sel));
  }

  function initImageLoad() {
    var imgs = $$('.img-load');
    imgs.forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded');
        return;
      }
      img.addEventListener('load', function () { img.classList.add('is-loaded'); });
      img.addEventListener('error', function () { img.classList.add('is-loaded'); });
    });
  }

  function initScrollProgress() {
    var bar = $('#scrollProgress');
    if (!bar) return;
    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.transform = 'scaleX(' + (pct / 100) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function initBackToTop() {
    var btn = $('#backToTop');
    if (!btn) return;
    var ticking = false;
    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  function initHeaderAutoHide() {
    var header = $('#header');
    if (!header || reducedMotion) return;
    var lastY = window.scrollY;
    var ticking = false;
    function onScroll() {
      var y = window.scrollY;
      if (y > lastY && y > 240 && !header.classList.contains('is-hidden')) {
        header.classList.add('is-hidden');
      } else if (y < lastY && header.classList.contains('is-hidden')) {
        header.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  function toLatinDigits(s) {
    return s.replace(/[\u06f0-\u06f9\u0660-\u0669]/g, function (ch) {
      var code = ch.charCodeAt(0);
      return code >= 0x06F0 ? (code - 0x06F0).toString() : (code - 0x0660).toString();
    });
  }

  function animateCounter(el) {
    var orig = (el.textContent || '').trim();
    var match = orig.match(/^([\d\u06f0-\u06f9\u0660-\u0669.]+)([\s\S]*)$/);
    if (!match) return;
    var target = parseFloat(toLatinDigits(match[1]));
    var suffix = el.getAttribute('data-suffix') || match[2];
    var isFloat = match[1].indexOf('.') !== -1;
    if (reducedMotion || !target || !isFinite(target)) {
      return;
    }
    var duration = 1400;
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = target * eased;
      var out = isFloat ? value.toFixed(1) : Math.round(value).toString();
      el.textContent = out + suffix;
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = orig;
      }
    }
    requestAnimationFrame(frame);
  }

  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
    var observer = new MutationObserver(function () {
      var fresh = $$('[data-count]');
      fresh.forEach(function (el) {
        if (!el.dataset.counted) {
          el.dataset.counted = '1';
          io.observe(el);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function initHeroVisual() {
    var visual = $('#heroVisual');
    if (!visual || reducedMotion) return;
    var ticking = false;
    var TILT_MAX = 8;
    function tilt(e) {
      var rect = visual.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rx = ((y - cy) / cy) * -TILT_MAX;
      var ry = ((x - cx) / cx) * TILT_MAX;
      visual.style.transform = 'perspective(1000px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      ticking = false;
    }
    visual.addEventListener('mouseenter', function () {
      visual.classList.add('is-hover');
      visual.style.transition = 'transform 0.12s ease-out, box-shadow 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.7s cubic-bezier(0.16,1,0.3,1)';
    }, { passive: true });
    visual.addEventListener('mousemove', function (e) {
      if (!ticking) { requestAnimationFrame(function () { tilt(e); }); ticking = true; }
    }, { passive: true });
    visual.addEventListener('mouseleave', function () {
      visual.classList.remove('is-hover');
      visual.classList.add('is-leaving');
      visual.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      visual.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.7s cubic-bezier(0.16,1,0.3,1)';
      window.setTimeout(function () {
        visual.classList.remove('is-leaving');
        visual.style.transition = '';
        visual.style.transform = '';
      }, 850);
    }, { passive: true });
  }

  function initHeroSlides() {
    var slides = $$('.hero-slide');
    var dots = $$('.hero-dot');
    var visual = $('#heroVisual');
    if (!slides.length || !visual) return;
    var current = 0;
    var timer = null;
    var INTERVAL = 6000;
    var FA_NUM = ['\u06f0', '\u06f1', '\u06f2', '\u06f3', '\u06f4', '\u06f5', '\u06f6', '\u06f7', '\u06f8', '\u06f9'];
    function slideLabel(i) {
      var fa = document.documentElement.lang === 'fa';
      return fa
        ? '\u0627\u0633\u0644\u0627\u06cc\u062f ' + FA_NUM[i] + ' \u0627\u0632 ' + FA_NUM[slides.length]
        : 'Slide ' + (i + 1) + ' of ' + slides.length;
    }
    function goTo(i) {
      if (i === current) return;
      var prev = slides[current];
      prev.classList.add('is-out');
      prev.classList.remove('is-active');
      current = i;
      var next = slides[current];
      next.classList.remove('is-out');
      next.classList.add('is-active');
      dots.forEach(function (dot, j) {
        var on = j === current;
        dot.classList.toggle('is-active', on);
        dot.setAttribute('aria-selected', on ? 'true' : 'false');
        dot.setAttribute('aria-label', slideLabel(j));
      });
      window.setTimeout(function () { prev.classList.remove('is-out'); }, 1400);
    }
    function advance() {
      if (document.hidden) return;
      goTo((current + 1) % slides.length);
    }
    function start() {
      stop();
      if (reducedMotion) return;
      timer = window.setInterval(advance, INTERVAL);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); start(); });
    });
    visual.addEventListener('mouseenter', stop);
    visual.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });
    start();
  }

  function initBannerSlides() {
    var slides = $$('.banner-slide');
    var section = $('.banner-section');
    var progress = $('.banner-progress');
    if (!slides.length || !section) return;
    var current = 0;
    var timer = null;
    var INTERVAL = 6500;
    function restartProgress() {
      if (!progress || reducedMotion) return;
      progress.classList.remove('is-running');
      progress.classList.remove('is-paused');
      void progress.offsetWidth;
      progress.classList.add('is-running');
    }
    function goTo(i) {
      if (i === current) return;
      var prev = slides[current];
      prev.classList.add('is-out');
      prev.classList.remove('is-active');
      current = i;
      var next = slides[current];
      next.classList.remove('is-out');
      next.classList.add('is-active');
      window.setTimeout(function () { prev.classList.remove('is-out'); }, 1600);
      restartProgress();
    }
    function advance() {
      if (document.hidden) return;
      goTo((current + 1) % slides.length);
    }
    function start() {
      stop();
      if (reducedMotion) return;
      restartProgress();
      timer = window.setInterval(advance, INTERVAL);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
      if (progress) progress.classList.add('is-paused');
    }
    section.addEventListener('mouseenter', stop);
    section.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });
    start();
  }

  function initLightbox() {
    var lb = $('#lightbox');
    var triggers = $$('[data-lightbox]');
    if (!lb || !triggers.length) return;
    var img = $('.lightbox__img', lb);
    var caption = $('.lightbox__caption', lb);
    var prevFocus = null;
    function open(el) {
      var source = el.querySelector('img');
      if (!source) return;
      prevFocus = document.activeElement;
      var full = source.getAttribute('data-full') || source.getAttribute('src');
      img.src = full;
      img.alt = source.getAttribute('alt') || '';
      caption.textContent = el.getAttribute('data-caption') || '';
      lb.hidden = false;
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      $('.lightbox__close', lb).focus();
    }
    function close() {
      if (!lb.classList.contains('is-open')) return;
      lb.classList.remove('is-open');
      lb.hidden = true;
      img.removeAttribute('src');
      document.body.style.overflow = '';
      if (prevFocus) prevFocus.focus();
    }
    triggers.forEach(function (el) {
      el.addEventListener('click', function () { open(el); });
    });
    $$('[data-lightbox-close]', lb).forEach(function (el) {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && lb.classList.contains('is-open')) {
        var focusable = lb.querySelectorAll('button');
        if (focusable.length) {
          if (e.shiftKey && document.activeElement === focusable[0]) {
            e.preventDefault();
            focusable[focusable.length - 1].focus();
          } else if (!e.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
            e.preventDefault();
            focusable[0].focus();
          }
        }
      }
    });
  }

  function boot() {
    initImageLoad();
    initScrollProgress();
    initBackToTop();
    initHeaderAutoHide();
    initCounters();
    initHeroVisual();
    initHeroSlides();
    initBannerSlides();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
