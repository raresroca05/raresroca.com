(function () {
  var root = document.documentElement;
  var nav = document.querySelector('.nav');
  var links = document.getElementById('nav-links');
  var menuBtn = document.querySelector('.menu-toggle');
  var themeBtn = document.querySelector('.theme-toggle');
  var themeMeta = document.querySelectorAll('meta[name="theme-color"]');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function paintMeta() {
    var color = currentTheme() === 'dark' ? '#0e1116' : '#f6f4ef';
    themeMeta.forEach(function (m) { m.setAttribute('content', color); });
  }

  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    paintMeta();
  });
  if (root.getAttribute('data-theme')) paintMeta();

  function closeMenu() {
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }

  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var chart = document.querySelector('.telemetry');
  if (chart) {
    if ('IntersectionObserver' in window) {
      var chartIo = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          chart.classList.add('play');
          chartIo.disconnect();
        }
      }, { threshold: 0.35 });
      chartIo.observe(chart);
    } else {
      chart.classList.add('play');
    }
  }

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  var sections = ['story', 'work', 'portfolio', 'contact'].map(function (id) {
    return document.getElementById(id);
  });
  var navAnchors = links.querySelectorAll('a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  var copyBtn = document.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy');
      var label = copyBtn.querySelector('span');
      function done() {
        copyBtn.classList.add('copied');
        label.textContent = 'Copied';
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          label.textContent = 'Copy email';
        }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          window.location.href = 'mailto:' + text;
        });
      } else {
        window.location.href = 'mailto:' + text;
      }
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
