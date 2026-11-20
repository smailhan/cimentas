/* Çimbeton Şantiye Sevkiyat Platformu — tıklanabilir mockup ortak kabuğu
 * Tasarım dili: systek-clm kabuk v2 (Inter, beyaz ince sol menü, #F4F5F7 zemin, siyah birincil buton, lavanta YZ vurgusu)
 *
 * Kullanım (her sayfada, Tailwind CDN'den hemen sonra):
 *   <script src="https://cdn.tailwindcss.com/3.4.16?plugins=forms"></script>
 *   <script src="assets/kabuk.js"></script>
 *
 * İç sayfa:   <main data-kabuk="ic" data-menu="talepler" data-baslik="..."> ... </main>
 * Dış sayfa:  <body data-kabuk="portal"> (yalnız demo akış çubuğu eklenir)
 * İkon:       <i data-ikon="sparkle" class="w-4 h-4"></i>
 * Modal:      [data-ac="id"] açar, [data-kapat] kapatır  (modal: <div id="id" data-modal class="hidden ...">)
 * Sekme:      [data-sekmeler] içinde [data-sekme="x"] düğmeleri ve [data-sekme-panel="x"] panelleri
 * Bildirim:   [data-toast="mesaj"] tıklanınca kısa bildirim gösterir; JS'ten ui.toast("...")
 */
(function () {
  // ---------- Tailwind ayarı ----------
  window.tailwind = window.tailwind || {};
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          zemin: '#F4F5F7',
          cizgi: '#E8EAEE',
          lav: { zemin: '#E0E7FF', acik: '#EEF2FF', kutu: '#C7D2FE', DEFAULT: '#4338CA', koyu: '#1E1B4B', odak: '#6366F1' },
        },
        fontFamily: { sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'] },
      },
    },
  };

  // Inter yazı tipi
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(l);
  var st = document.createElement('style');
  st.textContent =
    'body{font-feature-settings:"cv11","ss01";-webkit-font-smoothing:antialiased}' +
    '.tnum{font-variant-numeric:tabular-nums}' +
    '[data-modal]{backdrop-filter:blur(6px)}' +
    '.yz-kutu{outline:2px solid rgba(244,63,94,.95);background:rgba(244,63,94,.10);border-radius:6px}' +
    '.yz-kutu.orta{outline-color:rgba(245,158,11,.95);background:rgba(245,158,11,.10)}' +
    '.yz-kutu.bilgi{outline-color:rgba(99,102,241,.95);background:rgba(99,102,241,.10)}' +
    '@keyframes nabiz{0%,100%{opacity:1}50%{opacity:.45}}.nabiz{animation:nabiz 1.6s ease-in-out infinite}' +
    '@keyframes tara{0%{top:0}100%{top:100%}}.tarayici{animation:tara 1.8s linear infinite}';
  document.head.appendChild(st);

  // ---------- İkonlar (Lucide tarzı, 24x24, stroke) ----------
  var I = {
    sparkle: '<path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.4z"/><path d="M19 15l.8 1.9 1.9.8-1.9.8L19 20.4l-.8-1.9-1.9-.8 1.9-.8z"/>',
    grid: '<rect height="7" rx="1.5" width="7" x="3" y="3"/><rect height="7" rx="1.5" width="7" x="14" y="3"/><rect height="7" rx="1.5" width="7" x="3" y="14"/><rect height="7" rx="1.5" width="7" x="14" y="14"/>',
    list: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect height="4" rx="1" width="8" x="8" y="2"/><line x1="9" x2="15" y1="12" y2="12"/><line x1="9" x2="13" y1="16" y2="16"/>',
    plus: '<line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    x: '<line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/>',
    'x-circle': '<circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/>',
    alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    video: '<polygon points="23 7 16 12 23 17 23 7"/><rect height="14" rx="2" width="15" x="1" y="5"/>',
    image: '<rect height="18" rx="2" width="18" x="3" y="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" x2="8" y1="2" y2="18"/><line x1="16" x2="16" y1="6" y2="22"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/>',
    send: '<line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    truck: '<rect height="13" width="15" x="1" y="3"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    'chev-r': '<polyline points="9 18 15 12 9 6"/>',
    'chev-l': '<polyline points="15 18 9 12 15 6"/>',
    'chev-d': '<polyline points="6 9 12 15 18 9"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    more: '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    chart: '<rect height="18" rx="2" width="18" x="3" y="3"/><path d="M8 17V12M12 17V8M16 17v-5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    lock: '<rect height="11" rx="2" width="18" x="3" y="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    pen: '<path d="M3 21c3-1 5-3 7-6l7-7a2.1 2.1 0 0 0-3-3l-7 7c-3 2-5 4-6 7z"/><path d="M14 4l3 3"/>',
    building: '<rect height="20" rx="1" width="16" x="4" y="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    'arrow-r': '<line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    'arrow-l': '<line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="23"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    copy: '<rect height="13" rx="2" width="13" x="9" y="9"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    help: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    ruler: '<path d="M21.3 8.7L8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="M7.5 10.5l2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2"/>',
    play: '<polygon points="6 4 20 12 6 20 6 4"/>',
    pump: '<path d="M2 18h12v-4H6l-2 2v2z"/><circle cx="5" cy="19.5" r="1.5"/><circle cx="12" cy="19.5" r="1.5"/><path d="M9 14l4-8 8-3"/><path d="M21 3v5"/>',
  };
  function svg(ad, sinif) {
    return '<svg aria-hidden="true" class="' + (sinif || 'w-4 h-4') + '" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">' + (I[ad] || I.info) + '</svg>';
  }
  function ikonlariCiz(kok) {
    (kok || document).querySelectorAll('i[data-ikon]').forEach(function (el) {
      var t = document.createElement('span');
      t.innerHTML = svg(el.getAttribute('data-ikon'), (el.getAttribute('class') || 'w-4 h-4') + ' shrink-0');
      el.replaceWith(t.firstChild);
    });
  }

  // ---------- Demo akışı (EK-1 sırası) ----------
  var ADIMLAR = [
    ['talep-yeni.html', 'Yeni şantiye talebi', 'Satış temsilcisi'],
    ['portal-form02.html', 'İSG uygunluk beyanı (Form 02)', 'Şantiye yetkilisi · mobil'],
    ['portal-form03.html', 'Pompa şantiye değerlendirmesi (Form 03)', 'Pompa hizmet sağlayıcı · mobil'],
    ['pano.html', 'Tesis panosu', 'Tesis şefi'],
    ['talep-detay.html', 'YZ ön analizi ve inceleme', 'Tesis şefi'],
    ['talep-fotograflar.html', 'Fotoğraf ve video analizi', 'Tesis şefi'],
    ['talep-form01.html', 'Sevkiyat değerlendirmesi (Form 01)', 'Tesis şefi'],
    ['bolge-onay.html', 'Bölge müdürü onayı', 'Bölge müdürü · mobil'],
    ['master-data.html', 'Şantiye açılışı', 'Group Master Data'],
  ];

  var MENU = [
    ['pano', 'Pano', 'pano.html', 'grid'],
    ['talepler', 'Talepler', 'talepler.html', 'list', true],
    ['yeni', 'Yeni talep', 'talep-yeni.html', 'plus'],
    ['onaylar', 'Onaylarım', 'bolge-onay.html', 'inbox'],
    ['acilis', 'Şantiye açılışları', 'master-data.html', 'database'],
    ['raporlar', 'Raporlar', 'raporlar.html', 'chart'],
    ['ayarlar', 'Ayarlar', 'ayarlar.html', 'settings'],
  ];

  function sayfa() {
    var p = location.pathname.split('/').pop() || 'index.html';
    return decodeURIComponent(p);
  }

  function kenarMenu(aktif) {
    var ogeler = MENU.map(function (m) {
      var sec = m[0] === aktif;
      var sinif = sec ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100';
      var nokta = m[4] ? '<span class="absolute top-2 right-2 w-1.5 h-1.5 bg-[#4338CA] rounded-full ring-2 ring-white"></span>' : '';
      return '<a ' + (sec ? 'aria-current="page" ' : '') + 'aria-label="' + m[1] + '" title="' + m[1] + '" href="' + m[2] + '" class="relative w-10 h-10 rounded-xl ' + sinif + ' flex items-center justify-center transition">' + svg(m[3], 'w-5 h-5') + nokta + '</a>';
    }).join('');
    return (
      '<aside class="hidden md:block w-20 bg-white border-r border-[#E8EAEE] shrink-0 select-none">' +
      '<div class="sticky top-0 h-screen flex flex-col items-center justify-between py-5">' +
      '<div class="flex flex-col items-center gap-7">' +
      '<a href="index.html" aria-label="Tüm ekranlar" title="Tüm ekranlar" class="w-11 h-11 rounded-2xl bg-[#C7D2FE] text-[#1E1B4B] flex items-center justify-center shadow-md shadow-indigo-100 transition hover:scale-105">' + svg('pump', 'w-6 h-6') + '</a>' +
      '<nav aria-label="Ana menü" class="flex flex-col items-center gap-3">' + ogeler + '</nav></div>' +
      '<button aria-label="Destek" title="Destek" data-toast="Destek ekranı PoC kapsamında değil" class="w-9 h-9 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition" type="button">' + svg('help', 'w-5 h-5') + '</button>' +
      '</div></aside>'
    );
  }

  function baslik(metin, kisi) {
    var yuv = 'w-9 h-9 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition';
    var bas = kisi.ad.split(' ').map(function (k) { return k[0]; }).join('').slice(0, 2).toUpperCase();
    return (
      '<header class="h-16 px-4 md:px-6 lg:px-7 bg-white border-b border-[#E8EAEE] flex items-center justify-between shrink-0 sticky top-0 z-30">' +
      '<div class="flex items-center gap-3 min-w-0">' +
      '<a href="index.html" class="md:hidden w-9 h-9 rounded-xl bg-[#C7D2FE] text-[#1E1B4B] flex items-center justify-center">' + svg('pump', 'w-5 h-5') + '</a>' +
      '<h1 class="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-slate-900 truncate">' + metin + '</h1>' +
      '<span class="hidden sm:inline-flex items-center text-xs font-semibold text-[#4338CA] bg-[#E0E7FF] px-2 py-0.5 rounded-full">Çimbeton</span>' +
      '</div>' +
      '<div class="flex items-center gap-2 md:gap-4">' +
      '<div class="flex items-center gap-1">' +
      '<button aria-label="Arama" data-toast="Genel arama: talep no, şantiye, müşteri, pompacı" class="' + yuv + '" type="button">' + svg('search') + '</button>' +
      '<button aria-label="Bildirimler" data-ac="bildirim-balon" class="relative ' + yuv + '" type="button">' + svg('bell') + '<span class="absolute top-2 right-2 w-1.5 h-1.5 bg-[#4338CA] rounded-full ring-2 ring-white"></span></button>' +
      '</div>' +
      '<div class="hidden md:block h-6 w-px bg-slate-200"></div>' +
      '<div class="flex items-center gap-2.5">' +
      '<span class="w-9 h-9 rounded-full bg-[#E0E7FF] text-[#4338CA] text-xs font-semibold flex items-center justify-center">' + bas + '</span>' +
      '<span class="hidden md:block text-left leading-tight"><span class="block text-sm font-semibold text-slate-900">' + kisi.ad + '</span><span class="block text-[11px] text-slate-400">' + kisi.rol + '</span></span>' +
      '</div></div></header>' +
      // bildirim balonu
      '<div id="bildirim-balon" data-modal class="hidden fixed inset-0 z-50 bg-slate-900/20" data-kapat-zemin>' +
      '<div class="absolute right-4 top-16 w-[22rem] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-100 shadow-xl p-2">' +
      '<div class="px-3 py-2 flex items-center justify-between"><span class="text-sm font-semibold text-slate-900">Bildirimler</span><button data-kapat class="text-slate-400 hover:text-slate-700">' + svg('x') + '</button></div>' +
      bildirim('sparkle', 'lav', 'YZ ön analizi tamamlandı', 'ŞNT-2026-0418 · Yüksek risk · 2 çelişki', '2 dk', 'talep-detay.html') +
      bildirim('camera', 'slate', 'Pompacı fotoğraf yükledi', 'ŞNT-2026-0418 · 5 fotoğraf, 1 video', '14 dk', 'talep-fotograflar.html') +
      bildirim('check-circle', 'emerald', 'Bölge müdürü onayladı', 'ŞNT-2026-0409 · Menemen Lojistik Depo', '1 sa', 'master-data.html') +
      '</div></div>'
    );
  }
  function bildirim(ik, renk, b, a, z, h) {
    var r = { lav: 'bg-[#E0E7FF] text-[#4338CA]', slate: 'bg-slate-100 text-slate-600', emerald: 'bg-emerald-50 text-emerald-600' }[renk];
    return '<a href="' + h + '" class="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50"><span class="w-8 h-8 rounded-lg ' + r + ' flex items-center justify-center shrink-0">' + svg(ik) + '</span><span class="min-w-0 flex-1"><span class="block text-sm font-medium text-slate-800">' + b + '</span><span class="block text-xs text-slate-500">' + a + '</span></span><span class="text-[11px] text-slate-400">' + z + '</span></a>';
  }

  function akisCubugu() {
    var p = sayfa();
    var i = ADIMLAR.findIndex(function (a) { return a[0] === p; });
    var d = document.createElement('div');
    d.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1.5rem)]';
    var onceki = i > 0 ? ADIMLAR[i - 1][0] : null;
    var sonraki = i >= 0 && i < ADIMLAR.length - 1 ? ADIMLAR[i + 1][0] : (i < 0 ? ADIMLAR[0][0] : null);
    var orta = i >= 0
      ? '<span class="text-[11px] text-slate-400 tnum">Demo akışı ' + (i + 1) + '/' + ADIMLAR.length + '</span><span class="block text-xs font-semibold text-white truncate">' + ADIMLAR[i][1] + ' <span class="font-normal text-slate-400">· ' + ADIMLAR[i][2] + '</span></span>'
      : '<span class="text-[11px] text-slate-400">Demo akışı</span><span class="block text-xs font-semibold text-white">Akışın dışındaki ekran</span>';
    var btn = 'w-8 h-8 rounded-full flex items-center justify-center transition';
    d.innerHTML =
      '<div class="flex items-center gap-1.5 bg-slate-900/95 backdrop-blur rounded-full pl-1.5 pr-1.5 py-1.5 shadow-xl shadow-slate-900/20 ring-1 ring-white/10">' +
      (onceki ? '<a href="' + onceki + '" aria-label="Önceki adım" class="' + btn + ' text-slate-300 hover:bg-white/10">' + svg('chev-l') + '</a>' : '<span class="' + btn + ' text-slate-600">' + svg('chev-l') + '</span>') +
      '<a href="index.html" class="min-w-0 px-2 leading-tight text-center sm:text-left" title="Tüm ekranlar">' + orta + '</a>' +
      (sonraki ? '<a href="' + sonraki + '" aria-label="Sonraki adım" class="' + btn + ' bg-white text-slate-900 hover:bg-slate-200">' + svg('chev-r') + '</a>' : '<a href="index.html" aria-label="Tüm ekranlar" class="' + btn + ' bg-white text-slate-900 hover:bg-slate-200">' + svg('grid') + '</a>') +
      '</div>';
    document.body.appendChild(d);
    (document.querySelector('main[data-kabuk="ic"]') || document.body).style.paddingBottom = '6rem';
  }

  // ---------- Etkileşim ----------
  function toast(m) {
    var t = document.createElement('div');
    t.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transition-opacity duration-300';
    t.innerHTML = svg('info', 'w-4 h-4 text-[#C7D2FE]') + '<span>' + m + '</span>';
    document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; }, 2400);
    setTimeout(function () { t.remove(); }, 2800);
  }
  function ac(id) { var m = document.getElementById(id); if (m) { m.classList.remove('hidden'); ikonlariCiz(m); } }
  function kapat(el) { var m = el.closest('[data-modal]'); if (m) m.classList.add('hidden'); }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-ac]');
    if (a) { e.preventDefault(); ac(a.getAttribute('data-ac')); return; }
    var k = e.target.closest('[data-kapat]');
    if (k) { e.preventDefault(); kapat(k); return; }
    if (e.target.hasAttribute && e.target.hasAttribute('data-kapat-zemin')) { e.target.classList.add('hidden'); return; }
    var s = e.target.closest('[data-sekme]');
    if (s) {
      var kap = s.closest('[data-sekmeler]');
      var ad = s.getAttribute('data-sekme');
      kap.querySelectorAll('[data-sekme]').forEach(function (b) {
        var on = b.getAttribute('data-sekme') === ad;
        b.classList.toggle('bg-slate-900', on); b.classList.toggle('text-white', on);
        b.classList.toggle('text-slate-600', !on); b.classList.toggle('hover:bg-slate-50', !on);
        b.setAttribute('aria-selected', on);
      });
      kap.querySelectorAll('[data-sekme-panel]').forEach(function (p) { p.classList.toggle('hidden', p.getAttribute('data-sekme-panel') !== ad); });
      return;
    }
    var t = e.target.closest('[data-toast]');
    if (t) { e.preventDefault(); toast(t.getAttribute('data-toast')); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('[data-modal]').forEach(function (m) { m.classList.add('hidden'); });
  });

  window.ui = { toast: toast, ac: ac, svg: svg, ikonlariCiz: ikonlariCiz };

  // ---------- Kabuğu kur ----------
  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('bg-[#F4F5F7]', 'text-slate-800', 'font-sans', 'antialiased', 'min-h-screen');
    var main = document.querySelector('main[data-kabuk="ic"]');
    if (main) {
      var kisi = {
        ad: main.getAttribute('data-kisi') || 'Murat Yıldız',
        rol: main.getAttribute('data-rol') || 'Tesis Şefi · Kemalpaşa Santrali',
      };
      var sar = document.createElement('div');
      sar.className = 'flex w-full min-h-screen';
      sar.innerHTML = kenarMenu(main.getAttribute('data-menu')) + '<div class="flex-1 flex flex-col min-w-0" data-icerik>' + baslik(main.getAttribute('data-baslik') || 'Şantiye Sevkiyat Değerlendirme', kisi) + '</div>';
      main.parentNode.insertBefore(sar, main);
      sar.querySelector('[data-icerik]').appendChild(main);
    }
    ikonlariCiz();
    akisCubugu();
  });
})();
