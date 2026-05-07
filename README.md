# 日本語 SRS — Kurulum Rehberi

## Vercel ile Deploy (Ücretsiz, 5 dakika)

### 1. Hesap Aç
- https://vercel.com adresine git
- "Sign Up" → GitHub veya e-posta ile ücretsiz hesap oluştur

### 2. Projeyi Yükle — 2 Yöntem

#### Yöntem A: Sürükle-Bırak (En kolay)
1. vercel.com'da giriş yap
2. Dashboard'da "Add New → Project" tıkla
3. "Or deploy from your local project" seçeneğini bul
4. Bu klasörü (nihongo-srs) sürükle-bırak yap
5. "Deploy" tıkla → 1-2 dakikada hazır!

#### Yöntem B: GitHub üzerinden (Önerilen — otomatik güncelleme)
1. github.com'da ücretsiz hesap aç
2. "New repository" → nihongo-srs adıyla oluştur
3. Bu klasördeki dosyaları upload et (Add file → Upload files)
4. vercel.com'da "Import Git Repository" → GitHub'ı bağla → nihongo-srs seç
5. Deploy!

### 3. Telefona Kur (PWA)
Deploy sonrası sana bir URL verilir (örn: nihongo-srs-abc.vercel.app)

**iPhone:**
1. Safari'de URL'yi aç
2. Alttaki paylaş butonuna bas (kare + ok ikonu)
3. "Ana Ekrana Ekle" → "Ekle"
4. Artık uygulama gibi ikonla açılır!

**Android:**
1. Chrome'da URL'yi aç
2. Sağ üstteki 3 nokta menüsüne bas
3. "Ana ekrana ekle" → "Ekle"

---

## Lokal Çalıştırma (Bilgisayarda)
```bash
npm install
npm run dev
```
Tarayıcıda http://localhost:5173 adresi açılır.

---

## Özellikler
- 150 Minna no Nihongo kelimesi
- 109 BKB Vol.1 kanjisi + 137 bileşik kelime
- Kelime / Kanji / Karışık mod
- Ders önizleme ekranı
- AI destekli hafıza hikayeleri
- Esnek cevap kontrolü
- Geçmiş sorular paneli
- PWA — telefona uygulama olarak kurulabilir
