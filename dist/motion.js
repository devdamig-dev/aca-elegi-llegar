(() => {
  'use strict';
  const root = document.querySelector('.aca-page');
  if (!root || root.dataset.acaMotionReady) return;
  root.dataset.acaMotionReady = 'true';
  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const compact = window.matchMedia('(max-width: 767.98px)');
  const canObserve = typeof IntersectionObserver === 'function';
  const canAnimate = typeof Element.prototype.animate === 'function';
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const easeOut = (progress) => 1 - Math.pow(1 - progress, 3);
  const animations = new Map();
  const counters = new Map();
  const seen = new WeakSet();
  const pending = new Set();
  const counterSelector = '.aca-stat-number, .aca-stat>strong, .aca-helmet-stats>article>strong';
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let scrollDirty = true;
  let heroVisible = false;
  let campaignVisible = false;
  let heroScroll = 0;
  let campaignProgress = 0.5;
  const hero = $('.aca-hero');
  const campaign = $('.aca-campaign');
  const header = $('.aca-header');
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const layers = [
    ['.aca-hero-photo', 3, 0.3],
    ['.aca-hero-small', -4, 0.55]
  ].map(([selector, depth, phase]) => ({ element: $(selector), depth, phase })).filter((layer) => layer.element);
  const nav = $$('.aca-menu>a').map((link) => ({ link, section: $(link.getAttribute('href')) })).filter((item) => item.section);
  const sections = $$('main>section[id]');

  const schedule = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
  };
  const resetLayers = () => {
    layers.forEach(({ element }) => {
      element.style.removeProperty('--aca-motion-x');
      element.style.removeProperty('--aca-motion-y');
    });
    campaign?.style.removeProperty('--aca-motion-campaign-y');
    campaign?.style.removeProperty('--aca-motion-road-y');
  };
  const readScroll = () => {
    scrollDirty = false;
    const viewport = document.documentElement.clientHeight || window.innerHeight;
    const scrollRange = document.documentElement.scrollHeight - viewport;
    const progress = scrollRange > 0 ? clamp(window.scrollY / scrollRange, 0, 1) : 0;
    root.style.setProperty('--aca-motion-progress', progress.toFixed(4));
    root.classList.toggle('aca-motion-scrolled', window.scrollY > 16);
    let currentSection = sections[0];
    const navLine = (header?.offsetHeight || 68) + 90;
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= navLine) currentSection = section; });
    nav.forEach(({ link, section }) => {
      if (section === currentSection) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (heroVisible && hero) heroScroll = clamp(-hero.getBoundingClientRect().top / Math.max(hero.offsetHeight, 1), 0, 1);
    if (campaignVisible && campaign) {
      const bounds = campaign.getBoundingClientRect();
      campaignProgress = clamp((viewport - bounds.top) / (viewport + bounds.height), 0, 1);
    }
  };

  const finishCounter = (state) => {
    if (state.complete) return;
    state.element.textContent = state.original;
    state.element.classList.remove('aca-motion-counting');
    state.element.dataset.acaCounted = 'true';
    state.complete = true;
    counterObserver?.unobserve(state.element);
  };
  const formatCounter = (state, progress) => {
    const value = state.target * easeOut(progress);
    let number = value.toFixed(state.precision);
    if (state.grouped) number = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    else if (state.separator === ',') number = number.replace('.', ',');
    return number + state.suffix;
  };
  const startCounter = (element) => {
    if (counters.has(element) || element.dataset.acaCounted || reduce.matches) return;
    const original = element.textContent;
    const match = original.trim().match(/^(\d[\d.,]*)(.*)$/);
    if (!match) return;
    const grouped = /^\d{1,3}(?:\.\d{3})+$/.test(match[1]);
    const decimal = grouped ? null : match[1].match(/[.,](\d+)$/);
    const target = Number(grouped ? match[1].replace(/\./g, '') : match[1].replace(',', '.'));
    if (!Number.isFinite(target)) return;
    const spoken = document.createElement('span');
    spoken.className = 'aca-motion-counter-original';
    spoken.textContent = original;
    const visual = document.createElement('span');
    visual.className = 'aca-motion-counter-value';
    visual.setAttribute('aria-hidden', 'true');
    element.dataset.acaCounterFinal = original;
    element.classList.add('aca-motion-counting');
    const state = { element, visual, original, target, grouped, precision: decimal?.[1].length || 0, separator: decimal?.[0][0] || '.', suffix: match[2], time: 0, duration: compact.matches ? 850 : 1250, visible: true, complete: false };
    visual.textContent = formatCounter(state, 0);
    element.replaceChildren(spoken, visual);
    counters.set(element, state);
    schedule();
  };

  function tick(now) {
    frame = 0;
    if (document.hidden) { lastTime = 0; return; }
    const delta = lastTime ? Math.min(now - lastTime, 48) : 16;
    lastTime = now;
    if (scrollDirty) readScroll();
    let running = false;
    if (!reduce.matches) {
      for (const state of counters.values()) {
        if (!state.visible || state.complete) continue;
        state.time += delta;
        const progress = Math.min(state.time / state.duration, 1);
        if (progress >= 1) finishCounter(state);
        else { state.visual.textContent = formatCounter(state, progress); running = true; }
      }
      if (desktop.matches && heroVisible) {
        elapsed += delta;
        pointer.x += (pointer.targetX - pointer.x) * 0.065;
        pointer.y += (pointer.targetY - pointer.y) * 0.065;
        layers.forEach(({ element, depth, phase }) => {
          const x = pointer.x * depth + Math.sin(elapsed / 2400 + phase) * 1.4;
          const y = pointer.y * depth + Math.sin(elapsed / 1900 + phase) * 2.2 - heroScroll * depth * 1.65;
          element.style.setProperty('--aca-motion-x', `${x.toFixed(2)}px`);
          element.style.setProperty('--aca-motion-y', `${y.toFixed(2)}px`);
        });
        running = true;
      }
      if (desktop.matches && campaignVisible && campaign) {
        campaign.style.setProperty('--aca-motion-campaign-y', `${((campaignProgress - 0.5) * 48).toFixed(2)}px`);
        campaign.style.setProperty('--aca-motion-road-y', `${((campaignProgress - 0.5) * 14).toFixed(2)}px`);
      }
    }
    if (running) schedule();
    else lastTime = 0;
  }

  const releasePending = (element) => {
    pending.delete(element);
    element.classList.remove('aca-reveal-pending');
  };
  const reveal = (element, immediate = false) => {
    if (seen.has(element)) return;
    seen.add(element);
    // Nunca ocultar algo que el visitante ya vio: solo entran elementos preparados fuera de pantalla.
    if (!pending.has(element) || immediate || reduce.matches || !canAnimate || document.hidden) {
      releasePending(element);
      return;
    }
    element.querySelectorAll(counterSelector).forEach(startCounter);
    const delay = Math.min(Number(element.dataset.acaMotionDelay || 0), 120);
    // transform controla la entrada; translate queda reservado al hover y a las fotos del hero.
    const baseTransform = getComputedStyle(element).transform;
    const initialTransform = `translateY(18px)${baseTransform === 'none' ? '' : ` ${baseTransform}`}`;
    try {
      const animation = element.animate([
        { opacity: 0, transform: initialTransform },
        { opacity: 1, transform: baseTransform }
      ], { duration: compact.matches ? 420 : 560, delay, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'backwards' });
      animations.set(element, animation);
      const clean = () => { if (animations.get(element) === animation) animations.delete(element); };
      if (animation.finished?.then) animation.finished.then(clean, clean);
    } catch { /* El contenido conserva siempre su estado visible si WAAPI no está disponible. */ }
    releasePending(element);
  };
  let revealObserver = null;
  let counterObserver = null;
  let ambientObserver = null;
  if (canObserve) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { reveal(target); revealObserver.unobserve(target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px 120px 0px' });
    const candidates = new Set();
    const add = (selector, delay = 0) => $$(selector).forEach((element) => { element.dataset.acaMotionDelay = String(delay); candidates.add(element); });
    $$('.aca-hero-copy>*').forEach((element, index) => { element.dataset.acaMotionDelay = String(index * 95); candidates.add(element); });
    $$('.aca-hero-photo, .aca-hero-small').forEach((element, index) => { element.dataset.acaMotionDelay = String(index * 80); candidates.add(element); });
    add('main>section:not(.aca-hero)>.aca-container>.aca-eyebrow');
    add('main>section:not(.aca-hero)>.aca-container>.aca-section-title, .aca-about-intro, .aca-finale h2', 65);
    add('main>section:not(.aca-hero)>.aca-container>.aca-section-intro, .aca-about-more, .aca-finale .aca-container>p', 130);
    add('.aca-risks-grid, .aca-helmet-figure, .aca-finale .aca-button', 100);
    ['.aca-pillar-grid', '.aca-stat-grid', '.aca-fia-grid', '.aca-helmet-stats', '.aca-advice-grid', '.aca-rule-list'].forEach((selector) => {
      $$(selector).forEach((grid) => [...grid.children].forEach((element, index) => {
        element.dataset.acaMotionDelay = String(Math.min(index, 3) * 85);
        candidates.add(element);
      }));
    });
    $$('.aca-campaign-content>*').forEach((element, index) => { element.dataset.acaMotionDelay = String(index * 110); candidates.add(element); });
    const viewport = document.documentElement.clientHeight || window.innerHeight;
    candidates.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (!reduce.matches && canAnimate && bounds.height > 0 && bounds.top >= viewport) {
        pending.add(element);
        element.classList.add('aca-reveal-pending');
        revealObserver.observe(element);
      } else {
        // Incluye recarga a mitad de página, enlaces con hash y elementos ya visibles del hero.
        seen.add(element);
      }
    });

    counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const state = counters.get(target);
        if (state) state.visible = isIntersecting;
      });
      schedule();
    }, { threshold: 0, rootMargin: '0px 0px 120px 0px' });
    $$(counterSelector).forEach((element) => {
      if ([...pending].some((container) => container.contains(element))) counterObserver.observe(element);
      else element.dataset.acaCounted = 'true';
    });

    ambientObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (target === hero) heroVisible = isIntersecting;
        if (target === campaign) campaignVisible = isIntersecting;
      });
      scrollDirty = true;
      schedule();
    }, { threshold: 0 });
    [hero, campaign].filter(Boolean).forEach((element) => ambientObserver.observe(element));
  }

  root.addEventListener('focusin', (event) => {
    pending.forEach((element) => {
      if (element.contains(event.target)) { reveal(element, true); revealObserver?.unobserve(element); }
    });
    animations.forEach((animation, element) => {
      if (element.contains(event.target)) { animation.cancel(); animations.delete(element); }
    });
  });

  // Las pestañas reemplazan los ítems; la rotación de fotos solo cambia atributos.
  const riskPanel = $('#risk-panel');
  if (riskPanel && typeof MutationObserver === 'function' && canAnimate) {
    new MutationObserver(() => {
      if (reduce.matches || document.hidden) return;
      animations.get(riskPanel)?.cancel();
      try {
        const animation = riskPanel.animate([
          { opacity: 0.35, translate: '0 8px' },
          { opacity: 1, translate: '0 0' }
        ], { duration: 280, easing: 'cubic-bezier(.2,.75,.2,1)' });
        animations.set(riskPanel, animation);
        const clean = () => { if (animations.get(riskPanel) === animation) animations.delete(riskPanel); };
        if (animation.finished?.then) animation.finished.then(clean, clean);
      } catch { /* Sin animación, el estado nuevo sigue visible y operativo. */ }
    }).observe(riskPanel, { childList: true });
  }

  hero?.addEventListener('pointermove', (event) => {
    if (!desktop.matches || reduce.matches || !heroVisible || event.pointerType !== 'mouse') return;
    const bounds = hero.getBoundingClientRect();
    pointer.targetX = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5) * 2;
    pointer.targetY = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5) * 2;
    schedule();
  }, { passive: true });
  hero?.addEventListener('pointerleave', () => { pointer.targetX = 0; pointer.targetY = 0; });
  const onScroll = () => { scrollDirty = true; schedule(); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frame); frame = 0; lastTime = 0;
      animations.forEach((animation) => { if (animation.playState === 'running') animation.pause(); });
    } else {
      if (!reduce.matches) animations.forEach((animation) => { if (animation.playState === 'paused') animation.play(); });
      scrollDirty = true; schedule();
    }
  });
  const applyPreference = () => {
    root.classList.toggle('aca-motion-enabled', !reduce.matches);
    if (reduce.matches) {
      pending.forEach((element) => { reveal(element, true); revealObserver?.unobserve(element); });
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      counters.forEach(finishCounter);
      resetLayers();
    }
    scrollDirty = true; schedule();
  };
  reduce.addEventListener('change', applyPreference);
  desktop.addEventListener('change', () => { if (!desktop.matches) resetLayers(); scrollDirty = true; schedule(); });
  // BFCache conserva la página; se detienen los ciclos al salir y se retoman al volver.
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); frame = 0; lastTime = 0; });
  window.addEventListener('pageshow', onScroll);
  applyPreference();
})();
