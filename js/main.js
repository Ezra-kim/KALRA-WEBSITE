(function () {
  'use strict';

  // Footer year
  document.getElementById('year').textContent = 2012;
  // Mobile menu
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });

  // Research tabs (click + arrow keys)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab); });
    tab.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); select(n); }
    });
  });

  // Centre filter
  var filter = document.getElementById('centreFilter');
  var items = document.querySelectorAll('#centreList li');
  var empty = document.getElementById('centreEmpty');
  filter.addEventListener('input', function () {
    var q = filter.value.trim().toLowerCase(), shown = 0;
    items.forEach(function (li) {
      var hit = !q || (li.dataset.k + ' ' + li.textContent).toLowerCase().indexOf(q) > -1;
      li.hidden = !hit; if (hit) shown++;
    });
    empty.hidden = shown > 0;
  });

  // ====================== CONTACT FORM  ======================
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var rules = {
    name: function (v) { return v.trim() ? '' : 'Enter your full name.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address, such as name@example.com.'; },
    topic: function (v) { return v ? '' : 'Choose a topic.'; },
    message: function (v) { return v.trim().length >= 10 ? '' : 'Write at least 10 characters so we can help.'; }
  };
  function check(field) {
    var msg = rules[field.name](field.value);
    form.querySelector('.err[data-for="' + field.name + '"]').textContent = msg;
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  Object.keys(rules).forEach(function (n) {
    form.elements[n].addEventListener('blur', function () { check(this); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Run validation
    var bad = Object.keys(rules).filter(function (n) { return !check(form.elements[n]); });
    if (bad.length) {
      status.textContent = '';
      form.elements[bad[0]].focus();
      return;
    }

    // Validation passed → send to PHP
    status.textContent = 'Sending...';
    status.style.color = '';

    var formData = new FormData(form);

    fetch('submit.php', {
      method: 'POST',
      body: formData
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (result) {
      if (result.includes('successfully')) {
        status.textContent = 'Message has been delivered successfully.';
        status.style.color = 'green';
        form.reset();

        // Clear error messages
        form.querySelectorAll('.err').forEach(function (el) {
          el.textContent = '';
        });
      } else {
        status.textContent = 'Sorry, something went wrong. Please try again.';
        status.style.color = 'red';
      }
    })
    .catch(function () {
      status.textContent = 'Network error. Please try again later.';
      status.style.color = 'red';
    });
  });
  // ====================== END OF CONTACT FORM ======================

})();