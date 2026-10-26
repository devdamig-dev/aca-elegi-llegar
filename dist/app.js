(() => {
  'use strict';
  const root = document.querySelector('.aca-page');
  if (!root) return;
  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];
  const record = (event, detail = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...detail });
  };

  const menuToggle = $('.aca-menu-toggle');
  const menu = $('#aca-menu');
  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('is-open', open);
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  $$('.aca-menu a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.aca-header')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  // Una escena por ítem: rotación cada 2 segundos, con selección por hover/foco/tap.
  const risks = {
    cruces: [
      ['Vehículos que giran', 'Un auto puede cruzarse en tu trayectoria al doblar.', 'Un auto gira y cruza la trayectoria de una moto en una intersección.'],
      ['Prioridades de paso', 'Tener prioridad no garantiza que otros vehículos se detengan.', 'Escena ilustrativa de dos vehículos que se aproximan a un cruce.'],
      ['Visibilidad en las esquinas', 'Los vehículos estacionados pueden impedir que veas o te vean a tiempo.', 'Escena ilustrativa de un vehículo estacionado que oculta una esquina.']
    ],
    lluvia: [
      ['Menor adherencia', 'El pavimento mojado reduce el agarre de los neumáticos.', 'Escena ilustrativa del pavimento mojado visto desde una moto.'],
      ['Mayor distancia de frenado', 'Detener la moto puede requerir más espacio que en condiciones secas.', 'Escena ilustrativa de la distancia entre una moto y un auto sobre pavimento mojado.'],
      ['Marcas viales y superficies resbaladizas', 'La pintura vial y las superficies metálicas pueden volverse especialmente resbaladizas.', 'Escena ilustrativa de pintura vial y una tapa metálica mojadas.']
    ],
    noche: [
      ['Menor visibilidad', 'Los obstáculos y otros vehículos pueden detectarse más tarde.', 'Escena ilustrativa de una calle de noche con un obstáculo a distancia.'],
      ['Luces que encandilan', 'El brillo de otros vehículos puede dificultar momentáneamente la visión.', 'Escena ilustrativa del brillo de las luces de un auto de frente durante la noche.'],
      ['Velocidad y distancia', 'Circular demasiado rápido puede dejarte sin margen para reaccionar ante un obstáculo.', 'Escena ilustrativa de la distancia con el vehículo de adelante en una calle nocturna.']
    ],
    autos: [
      ['Puntos ciegos', 'Una moto puede quedar fuera del campo de visión de otro conductor.', 'Escena ilustrativa de una moto junto a la parte trasera lateral de un auto.'],
      ['Cambios de carril inesperados', 'Un vehículo puede desplazarse hacia tu trayectoria sin advertir tu presencia.', 'Escena ilustrativa de un auto que comienza a cambiar de carril delante de una moto.'],
      ['Distancia insuficiente', 'Circular demasiado cerca reduce el espacio disponible para reaccionar.', 'Escena ilustrativa de una moto demasiado cerca del auto de adelante.']
    ]
  };
  const riskLabels = { cruces: 'Cruces', lluvia: 'Lluvia', noche: 'De noche', autos: 'Entre autos' };
  const riskAssets = { cruces: 'cruces', lluvia: 'lluvia', noche: 'noche', autos: 'autos' };
  const tabs = $$('.aca-tab');
  const riskPanel = $('#risk-panel');
  const originalImage = $('.aca-risk-image');
  const carousel = document.createElement('div');
  carousel.className = 'aca-risk-carousel';
  carousel.id = 'risk-carousel';
  carousel.setAttribute('role', 'region');
  carousel.setAttribute('aria-roledescription', 'carrusel');
  carousel.innerHTML = '<div class="aca-risk-viewport" id="risk-scene" role="group" aria-roledescription="diapositiva"></div><p class="aca-sr-only" id="risk-status" aria-live="polite" aria-atomic="true"></p>';
  originalImage.replaceWith(carousel);
  $('#risk-scene').append(originalImage);
  originalImage.id = 'risk-photo';
  let activeRisk = 'cruces';
  let activeSlide = 0;
  let rotationTimer = null;
  let hoveredRiskItem = null;
  let focusedRiskItem = null;
  let riskVisible = true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stopRotation = () => { clearTimeout(rotationTimer); rotationTimer = null; };
  const scheduleRotation = () => {
    stopRotation();
    if (document.hidden || !riskVisible || reducedMotion.matches || hoveredRiskItem || focusedRiskItem) return;
    rotationTimer = setTimeout(() => {
      setSlide(activeSlide + 1, false);
      scheduleRotation();
    }, 2000);
  };

  const setSlide = (index, announce = true) => {
    activeSlide = (index + 3) % 3;
    const [title, , alt] = risks[activeRisk][activeSlide];
    const isOriginal = activeRisk === 'cruces' && activeSlide === 0;
    const photo = $('#risk-photo');
    const src = isOriginal ? 'assets/cruce-moto.jpg' : `assets/riesgos-${riskAssets[activeRisk]}.webp`;
    photo.alt = alt;
    if (photo.getAttribute('src') !== src) photo.src = src;
    photo.classList.toggle('aca-risk-atlas', !isOriginal);
    photo.style.setProperty('--scene', isOriginal ? 0 : activeSlide);
    photo.width = isOriginal ? 1448 : 836;
    photo.height = isOriginal ? 1086 : 1881;
    $('#risk-scene').setAttribute('aria-label', `${activeSlide + 1} de 3: ${title}`);
    carousel.setAttribute('aria-label', `Situaciones: ${riskLabels[activeRisk]}`);
    $$('.aca-risk-item').forEach((button, i) => button.setAttribute('aria-pressed', String(i === activeSlide)));
    if (announce) {
      $('#risk-status').textContent = `${riskLabels[activeRisk]}. Imagen ${activeSlide + 1} de 3: ${title}.`;
      record('aca_risk_slide', { situation: activeRisk, slide: activeSlide + 1 });
    }
  };
  const selectSlide = (index) => { setSlide(index); scheduleRotation(); };
  const setRisk = (button, focus = false, announce = true) => {
    const key = button.dataset.risk;
    if (!risks[key]) return;
    hoveredRiskItem = null;
    focusedRiskItem = null;
    activeRisk = key;
    tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab === button));
      tab.setAttribute('aria-controls', 'risk-panel risk-carousel');
      tab.tabIndex = tab === button ? 0 : -1;
    });
    riskPanel.setAttribute('aria-labelledby', button.id);
    riskPanel.replaceChildren(...risks[key].map(([title, description], index) => {
      const article = document.createElement('article');
      const control = document.createElement('button');
      control.type = 'button';
      control.className = 'aca-risk-item';
      control.setAttribute('aria-controls', 'risk-scene');
      const heading = document.createElement('span');
      heading.className = 'aca-risk-item-title';
      heading.textContent = title;
      const copy = document.createElement('span');
      copy.className = 'aca-risk-item-copy';
      copy.textContent = description;
      control.append(heading, copy);
      control.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'touch') return;
        hoveredRiskItem = control;
        selectSlide(index);
      });
      control.addEventListener('pointerleave', () => {
        if (hoveredRiskItem === control) hoveredRiskItem = null;
        scheduleRotation();
      });
      control.addEventListener('focus', () => {
        if (control.matches(':focus-visible')) {
          focusedRiskItem = control;
          selectSlide(index);
        }
      });
      control.addEventListener('blur', () => {
        if (focusedRiskItem === control) focusedRiskItem = null;
        scheduleRotation();
      });
      control.addEventListener('click', () => selectSlide(index));
      article.append(control);
      return article;
    }));
    setSlide(0, announce);
    scheduleRotation();
    if (focus) button.focus();
    if (announce) record('aca_risk_tab', { situation: key });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setRisk(tab));
    tab.addEventListener('keydown', (event) => {
      const keys = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (!(event.key in keys)) return;
      event.preventDefault();
      setRisk(tabs[keys[event.key]], true);
    });
  });
  let gesture = null;
  $('#risk-scene').addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    gesture = { x: event.clientX, y: event.clientY };
  });
  $('#risk-scene').addEventListener('pointerup', (event) => {
    if (!gesture) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) selectSlide(activeSlide + (dx < 0 ? 1 : -1));
  });
  $('#risk-scene').addEventListener('pointercancel', () => { gesture = null; });
  setRisk(tabs[0], false, false);
  document.addEventListener('visibilitychange', scheduleRotation);
  reducedMotion.addEventListener('change', scheduleRotation);
  if ('IntersectionObserver' in window) {
    const riskObserver = new IntersectionObserver(([entry]) => {
      riskVisible = entry.isIntersecting;
      scheduleRotation();
    }, { threshold: 0.1 });
    riskObserver.observe(carousel);
  }

  const helmetPoints = [
    { value: '34,6%', zone: 'Mentón', title: 'El golpe más frecuente.', message: 'Más de 1 de cada 3 impactos del estudio fue en el mentón. Un casco de tu talle y bien abrochado se queda en su lugar cuando más lo necesitás.', closing: 'Por eso, abrocharlo no es opcional.', x: 77.3, y: 74.6, glow: 132.48 },
    { value: '18,3%', zone: 'Frente', title: 'Casi 1 de cada 5 golpes.', message: 'Es la segunda zona más golpeada. Si el casco se mueve cuando sacudís la cabeza, no es de tu talle.', x: 60.8, y: 19.8, glow: 89.09 },
    { value: '12,6%', zone: 'Parte trasera', title: 'Lo que no ves también cuenta.', message: 'Un impacto puede venir de atrás o de una caída de espaldas. El casco tiene que cubrir toda la cabeza y quedar firme.', x: 18, y: 48, glow: 74.44 },
    { value: '12,1%', zone: 'Trasera baja', title: 'La nuca, casi 1 de cada 8.', message: 'Una correa floja deja el casco flojo. Ajustala hasta que quede firme debajo del mentón.', x: 22.8, y: 66, glow: 72.69 },
    { value: '10,7%', zone: 'Visera', title: 'Más de 1 de cada 10.', message: 'Cuidá la visera: si está rayada o sucia, ves menos. Si se rompe o se raja, cambiala.', x: 65.6, y: 46, glow: 69.17 },
    { value: '4%', zone: 'Base trasera', title: 'Poco frecuente, no menos importante.', message: 'Si el casco sufrió un golpe fuerte, aunque no se note el daño, hay que reemplazarlo.', x: 38.7, y: 70, glow: 51.58 },
    { value: '3,5%', zone: 'Tope frontal', title: 'Que sea homologado.', message: 'Elegí un casco que cumpla con la normativa vigente. Es el que está pensado para absorber el golpe.', x: 78, y: 30, glow: 50.41 },
    { value: '3,4%', zone: 'Trasera alta', title: 'También en recorridos cortos.', message: 'Un trayecto corto también tiene riesgo. Casco puesto y abrochado, siempre.', x: 23.6, y: 24, glow: 49.83 },
    { value: '0,8%', zone: 'Corona', title: 'Menos de 1 de cada 100.', message: 'Es la zona menos golpeada, pero el casco la cubre igual. Ninguna parte de la cabeza queda afuera.', x: 48, y: 14, glow: 44 }
  ];
  const helmetRoot = $('#helmet-hotspots');
  const hoverCard = document.createElement('div');
  hoverCard.className = 'aca-helmet-popover';
  hoverCard.id = 'helmet-popover';
  hoverCard.setAttribute('role', 'tooltip');
  hoverCard.hidden = true;
  root.append(hoverCard);
  const helmetDialog = document.createElement('dialog');
  helmetDialog.className = 'aca-helmet-dialog';
  helmetDialog.id = 'helmet-dialog';
  helmetDialog.setAttribute('aria-labelledby', 'helmet-dialog-title');
  helmetDialog.setAttribute('aria-describedby', 'helmet-dialog-description');
  helmetDialog.innerHTML = '<button class="aca-helmet-close" type="button" aria-label="Cerrar detalle del casco" autofocus>×</button><p class="aca-eyebrow" id="helmet-dialog-zone"></p><p class="aca-helmet-percentage" id="helmet-dialog-percentage"></p><h2 id="helmet-dialog-title"></h2><p id="helmet-dialog-description"></p><div class="aca-helmet-impact" id="helmet-impact" aria-hidden="true" hidden><div class="aca-helmet-impact-art"><img class="aca-helmet-shell" src="assets/casco.jpg" width="1448" height="1086" alt=""><img class="aca-helmet-fragment" src="assets/casco.jpg" width="1448" height="1086" alt=""><svg class="aca-helmet-crack" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M83 65 L78 71 L80 76 L76 81 L81 92 M80 76 L85 79 M78 71 L73 69" pathLength="1"/></svg></div></div><p class="aca-helmet-closing" id="helmet-dialog-closing" aria-live="polite" hidden></p><p class="aca-helmet-source">Estudio de 598 cascos involucrados en siniestros viales. Otte, D. (1991), SAE Technical Paper 912915. Ubicación esquemática.</p>';
  root.append(helmetDialog);
  const helmetImpact = $('#helmet-impact');
  const helmetClosing = $('#helmet-dialog-closing');
  const helmetReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let impactTimer;
  let impactPoint = null;
  const resetHelmetImpact = () => {
    clearTimeout(impactTimer);
    impactPoint = null;
    helmetImpact.classList.remove('is-playing', 'is-complete');
    helmetImpact.hidden = true;
    helmetClosing.hidden = true;
    helmetClosing.textContent = '';
    helmetDialog.classList.remove('has-impact');
  };
  const finishHelmetImpact = () => {
    if (!helmetDialog.open || !impactPoint) return;
    clearTimeout(impactTimer);
    helmetImpact.classList.remove('is-playing');
    helmetImpact.classList.add('is-complete');
    helmetClosing.textContent = impactPoint.closing;
    helmetClosing.classList.add('is-visible');
  };
  const startHelmetImpact = (point) => {
    resetHelmetImpact();
    if (!point.closing) return;
    impactPoint = point;
    helmetDialog.classList.add('has-impact');
    helmetImpact.hidden = false;
    helmetClosing.hidden = false;
    helmetClosing.classList.remove('is-visible');
    if (helmetReducedMotion.matches) {
      finishHelmetImpact();
      return;
    }
    // Restart the CSS timeline on every opening, including rapid close/reopen.
    void helmetImpact.offsetWidth;
    helmetImpact.classList.add('is-playing');
    impactTimer = setTimeout(finishHelmetImpact, 1900);
  };
  helmetImpact.addEventListener('animationend', (event) => {
    if (event.animationName === 'aca-helmet-break') finishHelmetImpact();
  });
  helmetReducedMotion.addEventListener('change', (event) => {
    if (event.matches) finishHelmetImpact();
  });
  let hoverTimer;
  let hoverButton = null;
  let modalButton = null;
  let suppressHover = false;
  let dismissedHoverButton = null;
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const hideHover = () => {
    clearTimeout(hoverTimer);
    hoverCard.hidden = true;
    hoverButton?.removeAttribute('aria-describedby');
    hoverButton = null;
  };
  const scheduleHide = () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(hideHover, 180); };
  const showHover = (point, button) => {
    if (helmetDialog.open || suppressHover) return;
    hideHover();
    hoverButton = button;
    const title = document.createElement('strong');
    title.textContent = point.title;
    const context = document.createElement('span');
    context.className = 'aca-helmet-popover-context';
    context.textContent = `${point.zone} · ${point.value}`;
    const copy = document.createElement('p');
    copy.textContent = point.message;
    const hint = document.createElement('span');
    hint.textContent = 'Hacé clic para abrir el detalle.';
    hoverCard.replaceChildren(context, title, copy, hint);
    hoverCard.hidden = false;
    button.setAttribute('aria-describedby', hoverCard.id);
    const rect = button.getBoundingClientRect();
    const card = hoverCard.getBoundingClientRect();
    const left = Math.max(12, Math.min(window.innerWidth - card.width - 12, rect.left + rect.width / 2 - card.width / 2));
    const top = rect.bottom + card.height + 16 < window.innerHeight ? rect.bottom + 8 : Math.max(12, rect.top - card.height - 8);
    hoverCard.style.left = `${left}px`;
    hoverCard.style.top = `${top}px`;
  };
  hoverCard.addEventListener('pointerenter', () => clearTimeout(hoverTimer));
  hoverCard.addEventListener('pointerleave', scheduleHide);
  helmetPoints.forEach((point, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'aca-helmet-point';
    button.style.left = `${point.x}%`;
    button.style.top = `${point.y}%`;
    button.style.setProperty('--glow', `${point.glow}px`);
    button.setAttribute('aria-label', `${point.zone}: ${point.value} de los impactos. Ver detalle`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'helmet-dialog');
    button.setAttribute('aria-expanded', 'false');
    const label = document.createElement('span');
    label.textContent = point.value;
    button.append(label);
    button.addEventListener('pointerenter', (event) => {
      suppressHover = false;
      if (supportsHover.matches && event.pointerType !== 'touch') showHover(point, button);
    });
    button.addEventListener('pointerleave', scheduleHide);
    button.addEventListener('focus', () => {
      if (button !== dismissedHoverButton) suppressHover = false;
      if (button.matches(':focus-visible')) showHover(point, button);
    });
    button.addEventListener('blur', hideHover);
    button.addEventListener('click', () => {
      hideHover();
      modalButton = button;
      $('#helmet-dialog-zone').textContent = point.zone;
      $('#helmet-dialog-title').textContent = point.title;
      $('#helmet-dialog-percentage').textContent = point.value;
      $('#helmet-dialog-description').textContent = point.message;
      $$('.aca-helmet-point').forEach(item => item.setAttribute('aria-expanded', String(item === button)));
      if (!helmetDialog.open) helmetDialog.showModal();
      helmetDialog.scrollTop = 0;
      startHelmetImpact(point);
      record('aca_helmet_point', { zone: point.zone, percentage: point.value, point: index + 1 });
    });
    helmetRoot.append(button);
  });
  $('.aca-helmet-close').addEventListener('click', () => helmetDialog.close());
  helmetDialog.addEventListener('click', (event) => {
    if (event.target !== helmetDialog) return;
    const r = helmetDialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) helmetDialog.close();
  });
  helmetDialog.addEventListener('cancel', () => { suppressHover = true; dismissedHoverButton = modalButton; });
  helmetDialog.addEventListener('close', () => {
    resetHelmetImpact();
    suppressHover = true;
    dismissedHoverButton = modalButton;
    $$('.aca-helmet-point').forEach(item => item.setAttribute('aria-expanded', 'false'));
    modalButton?.focus({ preventScroll: true });
    hideHover();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { suppressHover = true; dismissedHoverButton = hoverButton || modalButton; hideHover(); }
  });
  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.aca-helmet-point, .aca-helmet-popover')) hideHover();
  });
  window.addEventListener('scroll', hideHover, { passive: true });
  window.addEventListener('resize', hideHover);

  $$('a[href^="#"]').forEach((link) => link.addEventListener('click', () => {
    record('aca_navigation', { destination: link.getAttribute('href').slice(1) });
  }));
})();
