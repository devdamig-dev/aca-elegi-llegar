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

  // Contenido aprobado por ACA. Una escena por cada ítem, sin reproducción automática.
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
  carousel.innerHTML = '<div class="aca-risk-viewport" id="risk-scene" role="group" aria-roledescription="diapositiva"></div><div class="aca-carousel-controls"><button type="button" class="aca-carousel-arrow" id="risk-prev" aria-label="Imagen anterior">←</button><div class="aca-carousel-dots" role="group" aria-label="Elegir imagen"></div><span class="aca-carousel-counter" id="risk-counter">1 / 3</span><button type="button" class="aca-carousel-arrow" id="risk-next" aria-label="Imagen siguiente">→</button></div><p class="aca-sr-only" id="risk-status" aria-live="polite" aria-atomic="true"></p>';
  originalImage.replaceWith(carousel);
  $('#risk-scene').append(originalImage);
  originalImage.id = 'risk-photo';
  const dotsRoot = $('.aca-carousel-dots');
  let activeRisk = 'cruces';
  let activeSlide = 0;

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
    $('#risk-counter').textContent = `${activeSlide + 1} / 3`;
    $$('.aca-risk-item').forEach((button, i) => button.setAttribute('aria-pressed', String(i === activeSlide)));
    $$('.aca-carousel-dot').forEach((button, i) => button.setAttribute('aria-pressed', String(i === activeSlide)));
    if (announce) {
      $('#risk-status').textContent = `${riskLabels[activeRisk]}. Imagen ${activeSlide + 1} de 3: ${title}.`;
      record('aca_risk_slide', { situation: activeRisk, slide: activeSlide + 1 });
    }
  };
  const setRisk = (button, focus = false, announce = true) => {
    const key = button.dataset.risk;
    if (!risks[key]) return;
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
      control.addEventListener('click', () => setSlide(index));
      article.append(control);
      return article;
    }));
    dotsRoot.replaceChildren(...risks[key].map(([title], index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'aca-carousel-dot';
      dot.setAttribute('aria-label', `Ver imagen ${index + 1}: ${title}`);
      dot.setAttribute('aria-controls', 'risk-scene');
      dot.addEventListener('click', () => setSlide(index));
      return dot;
    }));
    setSlide(0, announce);
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
  $('#risk-prev').addEventListener('click', () => setSlide(activeSlide - 1));
  $('#risk-next').addEventListener('click', () => setSlide(activeSlide + 1));
  carousel.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    setSlide(event.key === 'Home' ? 0 : event.key === 'End' ? 2 : activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
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
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) setSlide(activeSlide + (dx < 0 ? 1 : -1));
  });
  $('#risk-scene').addEventListener('pointercancel', () => { gesture = null; });
  setRisk(tabs[0], false, false);

  const helmetPoints = [
    { value: '34,6%', zone: 'Mentón', detail: 'Corresponde a la zona de la mentonera, en la parte delantera inferior del casco. Es la zona con mayor proporción de impactos en este estudio.', x: 77.3, y: 74.6, glow: 132.48 },
    { value: '18,3%', zone: 'Frente', detail: 'Los impactos de esta zona se ubican en el frente del casco, por encima de la abertura de la visera.', x: 60.8, y: 19.8, glow: 89.09 },
    { value: '12,6%', zone: 'Parte trasera', detail: 'Esta zona corresponde a la parte posterior del casco, a media altura.', x: 18, y: 48, glow: 74.44 },
    { value: '12,1%', zone: 'Trasera baja', detail: 'Los impactos de esta zona se ubican en la parte posterior baja del casco.', x: 22.8, y: 66, glow: 72.69 },
    { value: '10,7%', zone: 'Visera', detail: 'Esta zona corresponde al área frontal de la visera y su abertura.', x: 65.6, y: 46, glow: 69.17 },
    { value: '4%', zone: 'Base trasera', detail: 'Corresponde al borde inferior de la parte posterior del casco.', x: 38.7, y: 70, glow: 51.58 },
    { value: '3,5%', zone: 'Tope frontal', detail: 'Esta zona se ubica en el borde superior delantero, sobre la visera.', x: 78, y: 30, glow: 50.41 },
    { value: '3,4%', zone: 'Trasera alta', detail: 'Los impactos de esta zona se ubican en la parte posterior superior del casco.', x: 23.6, y: 24, glow: 49.83 },
    { value: '0,8%', zone: 'Corona', detail: 'La corona es la parte más alta del casco. Este dato corresponde a los impactos registrados en esa zona.', x: 48, y: 14, glow: 44 }
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
  helmetDialog.innerHTML = '<button class="aca-helmet-close" type="button" aria-label="Cerrar detalle del casco" autofocus>×</button><p class="aca-eyebrow">ZONA DE IMPACTO</p><h2 id="helmet-dialog-title"></h2><p class="aca-helmet-percentage" id="helmet-dialog-percentage"></p><p id="helmet-dialog-description"></p><p class="aca-helmet-detail" id="helmet-dialog-detail"></p><p class="aca-helmet-source">Estudio de 598 cascos involucrados en siniestros viales. Otte, D. (1991), SAE Technical Paper 912915. Ubicación esquemática.</p>';
  root.append(helmetDialog);
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
    title.textContent = `${point.value} · ${point.zone}`;
    const copy = document.createElement('p');
    copy.textContent = `${point.value} de los impactos registrados en el estudio se ubicaron en esta zona. ${point.detail}`;
    const hint = document.createElement('span');
    hint.textContent = 'Hacé clic para abrir el detalle.';
    hoverCard.replaceChildren(title, copy, hint);
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
      $('#helmet-dialog-title').textContent = point.zone;
      $('#helmet-dialog-percentage').textContent = point.value;
      $('#helmet-dialog-description').textContent = `${point.value} de los impactos registrados en el estudio se ubicaron en esta zona.`;
      $('#helmet-dialog-detail').textContent = point.detail;
      $$('.aca-helmet-point').forEach(item => item.setAttribute('aria-expanded', String(item === button)));
      if (!helmetDialog.open) helmetDialog.showModal();
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
