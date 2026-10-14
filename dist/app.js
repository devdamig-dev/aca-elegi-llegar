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

  // El SVG incluye el estado Cruces. Los otros estados conservan la misma estructura.
  const risks = {
    cruces: [
      ['Vehículos que giran', 'Un auto puede cruzarse en tu trayectoria al doblar.'],
      ['Prioridades de paso', 'Tener prioridad no garantiza que otros vehículos se detengan.'],
      ['Visibilidad en las esquinas', 'Los vehículos estacionados pueden impedir que veas o te vean a tiempo.']
    ],
    lluvia: [
      ['Menor adherencia', 'El agua puede reducir el agarre de los neumáticos sobre el pavimento.'],
      ['Más distancia para frenar', 'Reducí la velocidad y aumentá la distancia con el vehículo de adelante.'],
      ['Menos visibilidad', 'La lluvia y el agua que levantan otros vehículos dificultan ver el camino.']
    ],
    noche: [
      ['Ver y ser visto', 'Revisá el funcionamiento de las luces antes de circular.'],
      ['Obstáculos difíciles de anticipar', 'La falta de luz puede ocultar irregularidades del camino.'],
      ['Atención al entorno', 'Adaptá la velocidad a la visibilidad y mantené una distancia segura.']
    ],
    autos: [
      ['Puntos ciegos', 'Quien conduce un auto puede no advertir una moto junto al vehículo.'],
      ['Maniobras inesperadas', 'Un cambio de carril o una puerta que se abre puede modificar tu recorrido.'],
      ['Espacio para reaccionar', 'Conservá la distancia y anticipá los movimientos de los otros vehículos.']
    ]
  };
  const tabs = $$('.aca-tab');
  const setRisk = (button, focus = false) => {
    const key = button.dataset.risk;
    if (!risks[key]) return;
    tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab === button));
      tab.tabIndex = tab === button ? 0 : -1;
    });
    const panel = $('#risk-panel');
    panel.setAttribute('aria-labelledby', button.id);
    panel.replaceChildren(...risks[key].map(([title, description]) => {
      const article = document.createElement('article');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');
      h3.textContent = title;
      p.textContent = description;
      article.append(h3, p);
      return article;
    }));
    if (focus) button.focus();
    record('aca_risk_tab', { situation: key });
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

  const helmetPoints = [
    { value: '34,6%', x: 77.3, y: 74.6, glow: 132.48 },
    { value: '18,3%', x: 60.8, y: 19.8, glow: 89.09 },
    { value: '12,6%', x: 18, y: 48, glow: 74.44 },
    { value: '12,1%', x: 22.8, y: 66, glow: 72.69 },
    { value: '10,7%', x: 65.6, y: 46, glow: 69.17 },
    { value: '4%', x: 38.7, y: 70, glow: 51.58 },
    { value: '3,5%', x: 78, y: 30, glow: 50.41 },
    { value: '3,4%', x: 23.6, y: 24, glow: 49.83 },
    { value: '0,8%', x: 48, y: 14, glow: 44 }
  ];
  const helmetRoot = $('#helmet-hotspots');
  helmetPoints.forEach((point, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'aca-helmet-point';
    button.style.left = `${point.x}%`;
    button.style.top = `${point.y}%`;
    button.style.setProperty('--glow', `${point.glow}px`);
    button.setAttribute('aria-label', `Zona ${index + 1}: ${point.value} de los impactos del estudio`);
    button.setAttribute('aria-pressed', 'false');
    const label = document.createElement('span');
    label.textContent = point.value;
    button.append(label);
    button.addEventListener('click', () => {
      const active = button.getAttribute('aria-pressed') !== 'true';
      $$('.aca-helmet-point').forEach((item) => item.setAttribute('aria-pressed', String(active && item === button)));
      $('#helmet-caption').textContent = active
        ? `${point.value} de los impactos registrados en el estudio se ubicaron en esta zona.`
        : 'Tocá un porcentaje para ver el dato';
      record('aca_helmet_point', { zone: index + 1, percentage: point.value });
    });
    helmetRoot.append(button);
  });

  const firstPoint = {
    title: $('#blind-title').innerHTML,
    description: $('#blind-description').innerHTML,
    who: $('#blind-who').innerHTML,
    action: $('#blind-action').innerHTML
  };
  const blindPoints = [
    null,
    { title: 'Lateral trasero derecho', description: 'Un vehículo que circula a tu derecha puede quedar fuera del campo de visión de los espejos.', who: 'Motociclistas, ciclistas y vehículos que se acercan por tu derecha.', action: 'Revisá los espejos, señalizá y verificá el punto ciego antes de cambiar de carril.' },
    { title: 'Lateral delantero izquierdo', description: 'El parante del parabrisas puede ocultar parte de lo que sucede hacia el frente y a la izquierda.', who: 'Peatones, ciclistas u otros vehículos en un cruce.', action: 'Antes de girar, observá el entorno desde distintos ángulos y comprobá que el recorrido esté libre.' },
    { title: 'Lateral delantero derecho', description: 'El parante y la carrocería pueden limitar la visibilidad hacia el frente y a la derecha.', who: 'Peatones y ciclistas que se aproximan por ese lado.', action: 'Reducí la velocidad al acercarte a un cruce y verificá el entorno antes de realizar la maniobra.' },
    { title: 'Detrás del vehículo', description: 'La zona cercana a la parte trasera puede quedar fuera de la visión directa y de los espejos.', who: 'Personas, bicicletas u obstáculos ubicados detrás del auto.', action: 'Comprobá que el espacio esté despejado antes de retroceder. Usá los espejos y las ayudas disponibles sin depender solo de ellas.' }
  ];
  let activePoint = 0;
  const pointButtons = $$('.aca-blind-point');
  const setPoint = (index) => {
    if (!Number.isInteger(index) || index < 0 || index >= blindPoints.length) return;
    activePoint = index;
    pointButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    $('#blind-counter').textContent = `PUNTO ${index + 1} DE 5`;
    for (const field of ['title', 'description', 'who', 'action']) {
      const element = $(`#blind-${field}`);
      if (index === 0) element.innerHTML = firstPoint[field];
      else element.textContent = blindPoints[index][field];
    }
    record('aca_blind_point', { point: index + 1 });
  };
  pointButtons.forEach((button, index) => {
    button.addEventListener('click', () => setPoint(index));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : (index + (event.key === 'ArrowRight' ? 1 : 4)) % 5;
      setPoint(next);
      pointButtons[next].focus();
    });
  });
  $('#blind-next').addEventListener('click', () => setPoint((activePoint + 1) % blindPoints.length));

  const shareDialog = $('#share-dialog');
  const shareUrl = $('#share-url');
  const campaignUrl = () => {
    if (location.protocol === 'http:' || location.protocol === 'https:') {
      const url = new URL(location.href);
      url.hash = 'elegi-llegar';
      url.search = '';
      return url.toString();
    }
    return 'https://aca-elegi-llegar.damigomez.chatgpt.site/#elegi-llegar';
  };
  $('#share-campaign').addEventListener('click', async () => {
    const data = { title: 'ACA MOV — Elegí llegar', text: 'Hay decisiones que hacen la diferencia. Descubrí la campaña Elegí Llegar.', url: campaignUrl() };
    $('#share-status').textContent = '';
    if (navigator.share) {
      try {
        await navigator.share(data);
        record('aca_share', { method: 'native' });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    shareUrl.value = data.url;
    $('#copy-status').textContent = '';
    shareDialog.showModal();
  });
  $('.aca-dialog-close').addEventListener('click', () => shareDialog.close());
  shareDialog.addEventListener('click', (event) => {
    if (event.target !== shareDialog) return;
    const rect = shareDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) shareDialog.close();
  });
  $('#copy-url').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(shareUrl.value);
      $('#copy-status').textContent = 'Enlace copiado.';
      record('aca_share', { method: 'clipboard' });
    } catch {
      shareUrl.focus();
      shareUrl.select();
      $('#copy-status').textContent = 'Seleccioná y copiá el enlace para compartirlo.';
    }
  });

  $$('a[href^="#"]').forEach((link) => link.addEventListener('click', () => {
    record('aca_navigation', { destination: link.getAttribute('href').slice(1) });
  }));
})();
