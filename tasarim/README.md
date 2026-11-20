# Çimbeton Şantiye Sevkiyat Platformu — Tıklanabilir Mockup

Statik HTML, derleme yok. `index.html`'i tarayıcıda açın. Alttaki koyu "Demo akışı" çubuğu EK-1 sırasıyla ekranları gezdirir.

## Tasarım dili (systek-clm kabuk v2)
- Yazı tipi **Inter**; zemin `#F4F5F7`; çizgi `#E8EAEE`; beyaz ince sol menü (w-20) + beyaz başlık şeridi (h-16).
- Kart: `bg-white rounded-2xl p-5 shadow-sm border border-slate-100`. Kart arası `space-y-5` / `gap-5`. Sayfa iç boşluğu `p-6 lg:p-7`.
- Birincil buton: `px-3 py-1.5 rounded-lg bg-slate-900 text-xs font-medium text-white shadow-sm shadow-slate-900/10 hover:bg-slate-800`.
- İkincil buton: `px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50`.
- Rozet (hap): `text-xs font-semibold px-2 py-0.5 rounded-full` — yüksek `text-rose-500 bg-rose-50`, orta `text-amber-700 bg-amber-50`, uygun `text-emerald-600 bg-emerald-50`, nötr `text-slate-600 bg-slate-100`.
- **Yapay zekâ dili:** lavanta. İkon kutusu `w-8 h-8 rounded-lg bg-[#E0E7FF] text-[#4338CA]` + `<i data-ikon="sparkle">`; "öneri" etiketi `text-[10px] font-semibold text-[#4338CA] bg-[#E0E7FF] px-1.5 py-0.5 rounded`; öneri kutusu `rounded-lg border border-[#E0E7FF] bg-[#EEF2FF] px-3 py-2.5`. YZ her zaman **öneri** verir, kanıt gösterir; karar insanındır (kabul ✓ / değiştir ✎ izi tutulur).
- Sekmeler: `rounded-xl bg-white border border-slate-100 shadow-sm p-1` içinde `px-3 py-1.5 rounded-lg text-xs font-medium`, seçili `bg-slate-900 text-white`.
- Tablo başlığı `text-[11px] font-semibold uppercase tracking-wide text-slate-400`, satır hover `hover:bg-slate-50`.
- Kırıntı: `text-xs text-slate-400`, sayfa başlığı `text-2xl font-bold tracking-tight text-slate-900`.
- Dış kullanıcı (portal) sayfaları: `bg-slate-50`, `max-w-lg mx-auto`, beyaz üst şerit (Çimbeton + "Size özel bağlantı"), mobil öncelikli, büyük dokunma alanları (min 44px).

## Ortak kabuk — `assets/kabuk.js`
Her sayfa `<head>`'de:
```html
<script src="https://cdn.tailwindcss.com/3.4.16?plugins=forms"></script>
<script src="assets/kabuk.js"></script>
```
- İç sayfa: `<body><main data-kabuk="ic" data-menu="pano|talepler|yeni|onaylar|acilis|raporlar|ayarlar" data-baslik="..." class="flex-1 p-6 lg:p-7 space-y-5">…</main></body>` — sol menü + başlık otomatik gelir. Farklı kişi için `data-kisi`, `data-rol`.
- Portal sayfası: `<body data-kabuk="portal">` — yalnız demo akış çubuğu eklenir.
- İkon: `<i data-ikon="ad" class="w-4 h-4"></i>` (liste kabuk.js `I` nesnesinde).
- Modal: tetikleyici `data-ac="id"`; modal `<div id="id" data-modal data-kapat-zemin class="hidden fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">`; kapatma `data-kapat`.
- Sekme: kapsayıcı `data-sekmeler`, düğme `data-sekme="x"`, panel `data-sekme-panel="x"`.
- Yapılmamış işlev: `data-toast="açıklama"`.

## Demo senaryosu (tüm ekranlarda aynı veri)
Kişiler hayalidir.

**Kurum:** Çimbeton Hazır Beton ve Prefabrik Yapı Elemanları San. Tic. A.Ş.
**Oturum (iç):** Murat Yıldız — Tesis Şefi · Kemalpaşa Santrali.
**Bölge müdürü:** Aylin Korkmaz — Ege Bölge Müdürü. **Master Data:** Deniz Arı — Group Master Data. **Satış:** Burak Şen — Satış Temsilcisi.

**Ana talep — ŞNT-2026-0418 "Yıldız Konutları B Blok"**
- Santral: Kemalpaşa Santrali · Müşteri/Bayi: Ege Yapı İnşaat Ltd. Şti. · Adres: Ulucak Mah. 1203 Sk. No:14, Kemalpaşa/İzmir · Mesafe 14,2 km (YZ hesapladı)
- Döküm: Pompalı · ~180 m³ · planlanan ilk döküm 21.11.2026 08:00 · Gündüz (gece dökümü yok)
- Şantiye yetkilisi: Kemal Aydın (Şantiye Şefi) 0532 *** 41 27 — Form 02 gönderdi 17.11.2026 16:40
- Pompa hizmet sağlayıcı: Akdeniz Pompa Hizmetleri Ltd. · operatör Serkan Demir · 42 m bom — Form 03 gönderdi 18.11.2026 10:15
- **Form 02 cevapları:** 1 altyapı sorunu yok = Evet · 2 yol levhaları/şev uygun = Evet · 3 *Enerji kesme izni gerektiren çalışma bulunmamaktadır* = **Evet** · 4 gece aydınlatması = Evet ("gece dökümü yok"). Sonuç: **Döküm yapılabilir**.
- **Form 03 cevapları:** 1 yol/manevra = Evet ("malzeme istifi var, mikser girişi dar") · 2 şev mesafesi = Evet · 3 aydınlatma = Evet · 4 ayak alanı genişliği = Evet · 5 altyapı = Evet · 6 işaretçi = Evet · 7 *havai hatta güvenli mesafe* = **Evet** · 8 zemin gözle uygun = Evet · 9 özel durum = Hayır. Beyan edilen en yakın havai hat mesafesi: **7,5–10 m**. Havai hat kriterleri sağlandı mı = Evet. Sonuç: **İlave tedbir sonrası döküm yapılabilir** (tedbir: "işaretçi bulundurulacak").
- Yüklenenler: 5 fotoğraf + 1 video (48 sn) + kroki (elle çizim fotoğrafı). Zorunlu 6 fotoğraf türünden **"Pompa ayağı zemini" eksik**.
  - `assets/foto-hat-bina.jpg` → YZ: "Havai hat ve pompa kurulacak alan birlikte" — bina çatısı üzerinden geçen **3 iletken hat**; tahmini yatay mesafe **6–8 m** (bom açılım alanı hattın altında); malzeme istifi manevra alanını daraltıyor.
  - `assets/foto-hat-sokak.jpg` → YZ: "Mikser güzergahı" — yol üzerinde **havai hat + beton direk**; yol genişliği ~6 m, araç parkı var.
- **YZ ön analizi:** Risk **Yüksek · 78/100**. 2 çelişki, 1 eksik, 2 uyarı:
  1. ÇELİŞKİ (yüksek): Form 02 m.3 "enerji kesme izni gerekmez" ↔ fotoğraf analizi hat mesafesini 6–8 m tahmin ediyor (6–7,5 m bandı = ilave tedbir zorunlu; <6 m olasılığı dışlanamıyor).
  2. ÇELİŞKİ (orta): Form 03 beyanı 7,5–10 m ↔ fotoğraf tahmini 6–8 m. Pompacının sonucu "ilave tedbir sonrası" ama m.7'ye "Evet" demiş.
  3. EKSİK: "Pompa ayağı zemini" fotoğrafı yok (Form 01 m.3 fotoğraflar tam değil).
  4. UYARI: Mikser güzergahında havai hat + park halindeki araçlar; manevra için işaretçi önerilir.
  5. UYARI: Hava tahmini 21.11 için %60 yağış → ÇSGB Kart 6'ya göre güvenli mesafe iki katına çıkar.
- **YZ önerisi:** "İlave bilgi iste" — (a) pompa ayağı zemini fotoğrafı, (b) hat ile pompa noktası arasında metre ile ölçüm fotoğrafı, (c) yağış halinde döküm planı. Tedbir önerileri: işaretçi, bariyerleme, bom çalışma alanının hattan uzak tarafa kaydırılması, gerekirse dağıtım şirketine (GDZ Elektrik) enerji kesme başvurusu.
- Durum: **İncelemede** (Tesis şefinde, 18.11.2026 10:17'den beri).

**Diğer talepler (listeler için)**
| No | Şantiye | Müşteri | Santral | Döküm | Durum | YZ risk |
|---|---|---|---|---|---|---|
| ŞNT-2026-0418 | Yıldız Konutları B Blok | Ege Yapı İnşaat | Kemalpaşa | Pompalı | İncelemede | Yüksek 78 |
| ŞNT-2026-0417 | Torbalı Fabrika Ek Bina | Kaya Endüstriyel | Torbalı | Pompalı | Formlar bekleniyor (Form 03) | — |
| ŞNT-2026-0416 | Bornova Okul Spor Salonu | Atlas Taahhüt | Bornova | Mikserli | İncelemede | Düşük 18 |
| ŞNT-2026-0415 | Gaziemir Villa Projesi | Demirtaş Yapı | Kemalpaşa | Pompalı | Ek bilgi istendi | Orta 52 |
| ŞNT-2026-0414 | Çiğli Ticaret Merkezi | Körfez İnşaat | Menemen | Pompalı | Bölge müdürü onayında | Orta 41 |
| ŞNT-2026-0412 | Buca Kentsel Dönüşüm 3. Etap | Yaşam Yapı | Bornova | Pompalı | Reddedildi (hat <6 m) | Yüksek 91 |
| ŞNT-2026-0409 | Menemen Lojistik Depo | Anadolu Lojistik | Menemen | Pompalı | Master Data bekliyor | Düşük 22 |
| ŞNT-2026-0405 | Kemalpaşa OSB Arıtma | Yeşil Çevre Müh. | Kemalpaşa | Mikserli | Şantiye açıldı | Düşük 12 |

**Durum makinesi:** Taslak → Formlar bekleniyor → YZ analizi → İncelemede → (Ek bilgi istendi ↺) → Bölge müdürü onayında → Master Data bekliyor → Şantiye açıldı · (her aşamadan Reddedildi).

## Ekranlar
| Dosya | Rol | İçerik |
|---|---|---|
| index.html | — | Tüm ekranlar, rol ve akış haritası |
| talep-yeni.html | Satış | Yeni talep, adres→YZ mesafe/santral önerisi, link gönderimi |
| portal-form02.html | Şantiye yetkilisi (mobil) | SMS doğrulama, KVKK, Form 02 sihirbazı, YZ tutarlılık uyarısı, imza |
| portal-form03.html | Pompacı (mobil) | Form 03 sihirbazı, havai hat kriteri, fotoğraf yükleme + anlık YZ sınıflandırma, kroki, imza |
| pano.html | Tesis şefi | KPI, YZ risk sıralı iş kuyruğu |
| talepler.html | Tesis şefi | Tüm talepler tablosu, filtreler |
| talep-detay.html | Tesis şefi | YZ ön analizi, çelişkiler, formlar yan yana, zaman çizelgesi |
| talep-fotograflar.html | Tesis şefi | Fotoğraf galerisi, YZ tespit kutuları, eksik tür, video kareleri, kroki |
| talep-form01.html | Tesis şefi | YZ ön dolu Form 01, kabul/değiştir, karar, ek bilgi taslağı |
| bolge-onay.html | Bölge müdürü (mobil) | 5 satır özet, risk kartı, onay/red |
| master-data.html | Master Data | Açılış bildirimi, kopyalanabilir alanlar, "Açıldı" |
