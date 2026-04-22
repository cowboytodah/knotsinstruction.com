/* KnotInstructions.com — Diagram Player & Site JS */

(function () {
  'use strict';

  // ── Diagram Player ────────────────────────────────────────────────
  function initDiagramPlayer() {
    const player = document.querySelector('.diagram-player');
    if (!player) return;

    const steps = window.KNOT_STEPS; // defined per-page
    if (!steps || !steps.length) return;

    let current = 0;

    const svgArea   = player.querySelector('.diagram-svg-area');
    const counter   = player.querySelector('.step-counter');
    const title     = player.querySelector('.step-title');
    const text      = player.querySelector('.step-text');
    const dotsWrap  = player.querySelector('.step-dots');
    const btnPrev   = player.querySelector('.btn-prev');
    const btnNext   = player.querySelector('.btn-next');

    // Build dots
    steps.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'step-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to step ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });

    function render(idx) {
      const s = steps[idx];
      counter.textContent = 'Step ' + (idx + 1) + ' of ' + steps.length;
      title.textContent   = s.title;
      text.textContent    = s.text;

      // Swap SVG with animation
      svgArea.innerHTML = s.svg;
      // Trigger reflow for animation restart
      void svgArea.offsetWidth;

      // Dots
      dotsWrap.querySelectorAll('.step-dot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });

      btnPrev.disabled = idx === 0;
      btnNext.disabled = idx === steps.length - 1;
      btnNext.innerHTML = idx === steps.length - 1
        ? '✓ Complete'
        : 'Next <span aria-hidden="true">→</span>';
    }

    function goTo(idx) {
      current = idx;
      render(current);
    }

    btnPrev.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
    btnNext.addEventListener('click', () => { if (current < steps.length - 1) goTo(current + 1); });

    // Keyboard navigation
    player.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); if (current < steps.length - 1) goTo(current + 1); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); if (current > 0) goTo(current - 1); }
    });

    render(0);
  }

  // ── Search (home page) ────────────────────────────────────────────
  function initSearch() {
    const form  = document.querySelector('.search-bar');
    const input = document.getElementById('knot-search');
    if (!form || !input) return;

        const KNOT_INDEX = [
      { name: 'Albright Knot',                   url: 'knots/albright-knot.html' },
      { name: 'Alpine Butterfly',                url: 'knots/alpine-butterfly.html' },
      { name: 'Anchor Hitch',                    url: 'knots/anchor-hitch.html' },
      { name: 'Bimini Twist',                    url: 'knots/bimini-twist.html' },
      { name: 'Blood Knot',                      url: 'knots/blood-knot.html' },
      { name: 'Bowline',                         url: 'knots/bowline.html' },
      { name: 'Bowline on a Bight',              url: 'knots/bowline-on-bight.html' },
      { name: 'Cleat Hitch',                     url: 'knots/cleat-hitch.html' },
      { name: 'Clove Hitch',                     url: 'knots/clove-hitch.html' },
      { name: 'Constrictor Knot',                url: 'knots/constrictor-knot.html' },
      { name: 'Diagonal Lashing',                url: 'knots/diagonal-lashing.html' },
      { name: "Double Fisherman's Knot",        url: "knots/double-fisherman.html" },
      { name: 'Dropper Loop',                    url: 'knots/dropper-loop.html' },
      { name: 'Figure Eight',                    url: 'knots/figure-eight.html' },
      { name: 'Figure Eight Follow Through',     url: 'knots/figure-eight-follow-through.html' },
      { name: 'Figure Eight Loop',               url: 'knots/figure-eight-loop.html' },
      { name: 'Figure Nine Loop',                url: 'knots/figure-nine.html' },
      { name: 'Four in Hand',                    url: 'knots/four-in-hand.html' },
      { name: 'Full Windsor',                    url: 'knots/full-windsor.html' },
      { name: 'Girth Hitch',                     url: 'knots/girth-hitch.html' },
      { name: 'Half Hitch',                      url: 'knots/half-hitch.html' },
      { name: 'Half Windsor',                    url: 'knots/half-windsor.html' },
      { name: 'Improved Clinch Knot',            url: 'knots/improved-clinch-knot.html' },
      { name: 'Klemheist Knot',                  url: 'knots/klemheist.html' },
      { name: 'Loop to Loop',                    url: 'knots/loop-to-loop.html' },
      { name: 'Monkey Fist',                     url: 'knots/monkey-fist.html' },
      { name: 'Munter Hitch',                    url: 'knots/munter-hitch.html' },
      { name: 'Nail Knot',                       url: 'knots/nail-knot.html' },
      { name: 'Overhand Knot',                   url: 'knots/overhand-knot.html' },
      { name: 'Palomar Knot',                    url: 'knots/palomar-knot.html' },
      { name: 'Perfection Loop',                 url: 'knots/perfection-loop.html' },
      { name: 'Pratt Knot',                      url: 'knots/pratt-knot.html' },
      { name: 'Prusik Knot',                     url: 'knots/prusik.html' },
      { name: 'Reef Knot',                       url: 'knots/reef-knot.html' },
      { name: 'Rolling Hitch',                   url: 'knots/rolling-hitch.html' },
      { name: 'Round Turn and Two Half Hitches', url: 'knots/round-turn-two-half-hitches.html' },
      { name: 'Sheepshank',                      url: 'knots/sheepshank.html' },
      { name: 'Sheet Bend',                      url: 'knots/sheet-bend.html' },
      { name: 'Slipknot',                        url: 'knots/slipknot.html' },
      { name: 'Snell Knot',                      url: 'knots/snell-knot.html' },
      { name: 'Square Knot',                     url: 'knots/square-knot.html' },
      { name: 'Square Lashing',                  url: 'knots/square-lashing.html' },
      { name: "Surgeon's Knot", url: 'knots/surgeons-knot.html' },
      { name: "Surgeon's Loop", url: 'knots/surgeons-loop.html' },
      { name: 'Taut Line Hitch',                 url: 'knots/taut-line-hitch.html' },
      { name: 'Timber Hitch',                    url: 'knots/timber-hitch.html' },
      { name: 'Tripod Lashing',                  url: 'knots/tripod-lashing.html' },
      { name: "Trucker's Hitch", url: 'knots/trucker-hitch.html' },
      { name: 'Uni Knot',                        url: 'knots/uni-knot.html' },
      { name: 'Water Knot',                      url: 'knots/water-knot.html' },
    ];

    const list = document.getElementById('search-results');
    if (!list) return;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      list.innerHTML = '';
      if (!q) { list.hidden = true; return; }
      const matches = KNOT_INDEX.filter(k => k.name.toLowerCase().includes(q));
      if (!matches.length) { list.hidden = true; return; }
      matches.forEach(k => {
        const li = document.createElement('li');
        const a  = document.createElement('a');
        a.href = k.url; a.textContent = k.name;
        li.appendChild(a);
        list.appendChild(li);
      });
      list.hidden = false;
    });

    document.addEventListener('click', (e) => {
      if (!form.contains(e.target)) list.hidden = true;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim().toLowerCase();
      const match = KNOT_INDEX.find(k => k.name.toLowerCase().startsWith(q));
      if (match) window.location.href = match.url;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDiagramPlayer();
    initSearch();
  });
})();
