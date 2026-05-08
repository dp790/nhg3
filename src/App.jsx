import { useState, useEffect, useRef, useCallback } from "react";

// ══════════════════════════════════════════════════════════
// DATA — WORDS
// ══════════════════════════════════════════════════════════
const WORDS = [
  {id:"w0",sub:"Fiil",char:"います",tr:"olmak (canlılar)",read:"います",ex:"猫がいます。 — Kedi var."},
  {id:"w1",sub:"Fiil",char:"あります",tr:"olmak (cansızlar)",read:"あります",ex:"本があります。 — Kitap var."},
  {id:"w2",sub:"Fiil",char:"かかります",tr:"sürmek / tutmak (zaman/para)",read:"かかります",ex:"一時間かかります。 — Bir saat sürer."},
  {id:"w3",sub:"Fiil",char:"わかります",tr:"anlamak / bilmek",read:"わかります",ex:"日本語がわかります。 — Japonca anlıyorum."},
  {id:"w4",sub:"Fiil",char:"いきます",tr:"gitmek",read:"いきます",ex:"学校にいきます。 — Okula gidiyorum."},
  {id:"w5",sub:"Fiil",char:"きます",tr:"gelmek",read:"きます",ex:"友達がきます。 — Arkadaşım geliyor."},
  {id:"w6",sub:"Fiil",char:"かえります",tr:"dönmek / eve dönmek",read:"かえります",ex:"うちにかえります。 — Eve dönüyorum."},
  {id:"w7",sub:"Fiil",char:"でかけます",tr:"dışarı çıkmak",read:"でかけます",ex:"今日でかけます。 — Bugün dışarı çıkıyorum."},
  {id:"w8",sub:"Fiil",char:"たべます",tr:"yemek (fiil)",read:"たべます",ex:"ごはんをたべます。 — Yemek yiyorum."},
  {id:"w9",sub:"Fiil",char:"のみます",tr:"içmek",read:"のみます",ex:"水をのみます。 — Su içiyorum."},
  {id:"w10",sub:"Fiil",char:"みます",tr:"izlemek / bakmak",read:"みます",ex:"映画をみます。 — Film izliyorum."},
  {id:"w11",sub:"Fiil",char:"ききます",tr:"dinlemek / sormak",read:"ききます",ex:"音楽をききます。 — Müzik dinliyorum."},
  {id:"w12",sub:"Fiil",char:"かいます",tr:"satın almak",read:"かいます",ex:"本をかいます。 — Kitap satın alıyorum."},
  {id:"w13",sub:"Fiil",char:"よみます",tr:"okumak",read:"よみます",ex:"新聞をよみます。 — Gazete okuyorum."},
  {id:"w14",sub:"Fiil",char:"かきます",tr:"yazmak",read:"かきます",ex:"手紙をかきます。 — Mektup yazıyorum."},
  {id:"w15",sub:"Fiil",char:"とります",tr:"almak / çekmek",read:"とります",ex:"写真をとります。 — Fotoğraf çekiyorum."},
  {id:"w16",sub:"Fiil",char:"します",tr:"yapmak",read:"します",ex:"仕事をします。 — İş yapıyorum."},
  {id:"w17",sub:"Fiil",char:"あいます",tr:"buluşmak / görüşmek",read:"あいます",ex:"友達にあいます。 — Arkadaşımla buluşuyorum."},
  {id:"w18",sub:"Fiil",char:"あげます",tr:"vermek",read:"あげます",ex:"プレゼントをあげます。 — Hediye veriyorum."},
  {id:"w19",sub:"Fiil",char:"もらいます",tr:"almak / kabul etmek",read:"もらいます",ex:"本をもらいます。 — Kitap alıyorum."},
  {id:"w20",sub:"Fiil",char:"つかいます",tr:"kullanmak",read:"つかいます",ex:"パソコンをつかいます。 — Bilgisayar kullanıyorum."},
  {id:"w21",sub:"Fiil",char:"すいます",tr:"(sigara) içmek",read:"すいます",ex:"たばこをすいます。 — Sigara içiyorum."},
  {id:"w22",sub:"Fiil",char:"ならいます",tr:"öğrenmek",read:"ならいます",ex:"日本語をならいます。 — Japonca öğreniyorum."},
  {id:"w23",sub:"Fiil",char:"もちます",tr:"tutmak / taşımak",read:"もちます",ex:"かばんをもちます。 — Çanta taşıyorum."},
  {id:"w24",sub:"Fiil",char:"まちます",tr:"beklemek",read:"まちます",ex:"バスをまちます。 — Otobüs bekliyorum."},
  {id:"w25",sub:"Fiil",char:"たちます",tr:"ayağa kalkmak",read:"たちます",ex:"どうぞ、たってください。 — Lütfen ayağa kalkın."},
  {id:"w26",sub:"Fiil",char:"きります",tr:"kesmek / kapatmak",read:"きります",ex:"パンをきります。 — Ekmek kesiyorum."},
  {id:"w27",sub:"Fiil",char:"おくります",tr:"göndermek",read:"おくります",ex:"メールをおくります。 — E-posta gönderiyorum."},
  {id:"w28",sub:"Fiil",char:"ふります",tr:"(yağmur/kar) yağmak",read:"ふります",ex:"雨がふります。 — Yağmur yağıyor."},
  {id:"w29",sub:"Fiil",char:"すわります",tr:"oturmak",read:"すわります",ex:"いすにすわります。 — Sandalyeye oturuyorum."},
  {id:"w30",sub:"Fiil",char:"はいります",tr:"girmek",read:"はいります",ex:"部屋にはいります。 — Odaya giriyorum."},
  {id:"w31",sub:"Fiil",char:"いそぎます",tr:"acele etmek",read:"いそぎます",ex:"いそいでください。 — Lütfen acele edin."},
  {id:"w32",sub:"Fiil",char:"およぎます",tr:"yüzmek",read:"およぎます",ex:"プールでおよぎます。 — Havuzda yüzüyorum."},
  {id:"w33",sub:"Fiil",char:"やすみます",tr:"dinlenmek / tatil yapmak",read:"やすみます",ex:"日曜日にやすみます。 — Pazar günü dinleniyorum."},
  {id:"w34",sub:"Fiil",char:"よびます",tr:"çağırmak / davet etmek",read:"よびます",ex:"友達をよびます。 — Arkadaşımı davet ediyorum."},
  {id:"w35",sub:"Fiil",char:"あそびます",tr:"oynamak / eğlenmek",read:"あそびます",ex:"こどもがあそびます。 — Çocuk oynuyor."},
  {id:"w36",sub:"Fiil",char:"しにます",tr:"ölmek",read:"しにます",ex:"花がしにます。 — Çiçek ölüyor."},
  {id:"w37",sub:"Fiil",char:"はなします",tr:"konuşmak / anlatmak",read:"はなします",ex:"日本語ではなします。 — Japonca konuşuyorum."},
  {id:"w38",sub:"Fiil",char:"かします",tr:"ödünç vermek",read:"かします",ex:"本をかします。 — Kitabı ödünç veriyorum."},
  {id:"w39",sub:"Fiil",char:"けします",tr:"silmek / söndürmek",read:"けします",ex:"電気をけします。 — Işığı söndürüyorum."},
  {id:"w40",sub:"い-Sıfat",char:"高い",tr:"yüksek / pahalı",read:"たかい",ex:"このホテルは高いです。 — Bu otel pahalıdır."},
  {id:"w41",sub:"い-Sıfat",char:"安い",tr:"ucuz / hesaplı",read:"やすい",ex:"このみせは安いです。 — Bu dükkan ucuzdur."},
  {id:"w42",sub:"い-Sıfat",char:"新しい",tr:"yeni",read:"あたらしい",ex:"新しい車です。 — Yeni bir arabadır."},
  {id:"w43",sub:"い-Sıfat",char:"古い",tr:"eski",read:"ふるい",ex:"古い建物です。 — Eski bir binadır."},
  {id:"w44",sub:"い-Sıfat",char:"大きい",tr:"büyük",read:"おおきい",ex:"大きいかばんです。 — Büyük bir çantadır."},
  {id:"w45",sub:"い-Sıfat",char:"小さい",tr:"küçük",read:"ちいさい",ex:"小さいねこです。 — Küçük bir kedidir."},
  {id:"w46",sub:"い-Sıfat",char:"おいしい",tr:"lezzetli",read:"おいしい",ex:"このりょうりはおいしいです。 — Bu yemek lezzetlidir."},
  {id:"w47",sub:"い-Sıfat",char:"まずい",tr:"lezzetsiz / kötü (yemek)",read:"まずい",ex:"このりょうりはまずいです。 — Bu yemek lezzetsizdir."},
  {id:"w48",sub:"い-Sıfat",char:"忙しい",tr:"meşgul / yoğun",read:"いそがしい",ex:"今日はいそがしいです。 — Bugün meşgulüm."},
  {id:"w49",sub:"い-Sıfat",char:"難しい",tr:"zor / güç",read:"むずかしい",ex:"日本語はむずかしいです。 — Japonca zordur."},
  {id:"w50",sub:"い-Sıfat",char:"易しい",tr:"kolay",read:"やさしい",ex:"このしけんはやさしいです。 — Bu sınav kolaydır."},
  {id:"w51",sub:"い-Sıfat",char:"楽しい",tr:"eğlenceli / keyifli",read:"たのしい",ex:"パーティーはたのしいです。 — Parti eğlencelidir."},
  {id:"w52",sub:"い-Sıfat",char:"面白い",tr:"ilginç / komik",read:"おもしろい",ex:"この本はおもしろいです。 — Bu kitap ilginçtir."},
  {id:"w53",sub:"い-Sıfat",char:"つまらない",tr:"sıkıcı",read:"つまらない",ex:"この映画はつまらないです。 — Bu film sıkıcıdır."},
  {id:"w54",sub:"い-Sıfat",char:"いい / よい",tr:"iyi / güzel",read:"いい",ex:"いいてんきですね。 — Güzel hava değil mi?"},
  {id:"w55",sub:"い-Sıfat",char:"寒い",tr:"soğuk (hava)",read:"さむい",ex:"今日はさむいです。 — Bugün soğuk."},
  {id:"w56",sub:"い-Sıfat",char:"暑い",tr:"sıcak (hava)",read:"あつい",ex:"夏はあついです。 — Yaz sıcaktır."},
  {id:"w57",sub:"い-Sıfat",char:"熱い",tr:"sıcak (nesne/içecek)",read:"あつい",ex:"コーヒーがあついです。 — Kahve sıcak."},
  {id:"w58",sub:"い-Sıfat",char:"冷たい",tr:"soğuk (nesne/içecek)",read:"つめたい",ex:"水がつめたいです。 — Su soğuk."},
  {id:"w59",sub:"い-Sıfat",char:"多い",tr:"çok / fazla",read:"おおい",ex:"人がおおいです。 — İnsan çok."},
  {id:"w60",sub:"い-Sıfat",char:"少ない",tr:"az",read:"すくない",ex:"お金がすくないです。 — Para az."},
  {id:"w61",sub:"い-Sıfat",char:"近い",tr:"yakın",read:"ちかい",ex:"駅がちかいです。 — İstasyon yakın."},
  {id:"w62",sub:"い-Sıfat",char:"遠い",tr:"uzak",read:"とおい",ex:"会社がとおいです。 — Şirket uzak."},
  {id:"w63",sub:"い-Sıfat",char:"白い",tr:"beyaz",read:"しろい",ex:"しろいねこです。 — Beyaz bir kedidir."},
  {id:"w64",sub:"な-Sıfat",char:"きれい",tr:"güzel / temiz",read:"きれい",ex:"きれいなはなです。 — Güzel bir çiçektir."},
  {id:"w65",sub:"な-Sıfat",char:"にぎやか",tr:"kalabalık / neşeli",read:"にぎやか",ex:"この町はにぎやかです。 — Bu kasaba kalabalıktır."},
  {id:"w66",sub:"な-Sıfat",char:"しずか",tr:"sessiz / sakin",read:"しずか",ex:"図書館はしずかです。 — Kütüphane sessizdir."},
  {id:"w67",sub:"な-Sıfat",char:"有名",tr:"ünlü / meşhur",read:"ゆうめい",ex:"ゆうめいなみせです。 — Ünlü bir dükkan."},
  {id:"w68",sub:"な-Sıfat",char:"元気",tr:"sağlıklı / enerjik",read:"げんき",ex:"げんきですか？ — Nasılsınız?"},
  {id:"w69",sub:"な-Sıfat",char:"便利",tr:"kullanışlı / pratik",read:"べんり",ex:"べんりなアプリです。 — Kullanışlı bir uygulama."},
  {id:"w70",sub:"な-Sıfat",char:"親切",tr:"nazik / kibar",read:"しんせつ",ex:"しんせつなひとです。 — Nazik bir insandır."},
  {id:"w71",sub:"な-Sıfat",char:"上手",tr:"becerikli / iyi (bir şeyde)",read:"じょうず",ex:"日本語がじょうずです。 — Japoncası iyidir."},
  {id:"w72",sub:"な-Sıfat",char:"下手",tr:"beceriksiz / kötü (bir şeyde)",read:"へた",ex:"りょうりがへたです。 — Yemek yapmakta kötüyüm."},
  {id:"w73",sub:"な-Sıfat",char:"好き",tr:"sevmek / hoşlanmak",read:"すき",ex:"音楽がすきです。 — Müziği seviyorum."},
  {id:"w74",sub:"な-Sıfat",char:"嫌い",tr:"sevmemek / nefret etmek",read:"きらい",ex:"にんじんがきらいです。 — Havuçtan nefret ediyorum."},
  {id:"w75",sub:"な-Sıfat",char:"大切",tr:"önemli / değerli",read:"たいせつ",ex:"じかんはたいせつです。 — Zaman değerlidir."},
  {id:"w76",sub:"な-Sıfat",char:"大丈夫",tr:"sorun yok /괜찮다",read:"だいじょうぶ",ex:"だいじょうぶですか？ —괜찮으세요?"},
  {id:"w77",sub:"な-Sıfat",char:"暇",tr:"boş / boş vakti olan",read:"ひま",ex:"今日はひまです。 — Bugün boşum."},
  {id:"w78",sub:"な-Sıfat",char:"残念",tr:"üzücü / ne yazık ki",read:"ざんねん",ex:"ざんねんですね。 — Ne yazık ki."},
  {id:"w79",sub:"İsim",char:"富士山",tr:"Fuji Dağı",read:"ふじさん",ex:"富士山はきれいです。 — Fuji Dağı güzeldir."},
  {id:"w80",sub:"İsim",char:"桜",tr:"kiraz çiçeği / sakura",read:"さくら",ex:"桜がさいています。 — Sakura açmış."},
  {id:"w81",sub:"İsim",char:"山",tr:"dağ",read:"やま",ex:"山にのぼります。 — Dağa tırmanıyorum."},
  {id:"w82",sub:"İsim",char:"花",tr:"çiçek",read:"はな",ex:"花をかいます。 — Çiçek satın alıyorum."},
  {id:"w83",sub:"İsim",char:"町",tr:"kasaba / mahalle",read:"まち",ex:"この町はにぎやかです。 — Bu kasaba kalabalıktır."},
  {id:"w84",sub:"İsim",char:"食べ物",tr:"yiyecek / yemek",read:"たべもの",ex:"すきなたべものはすしです。 — Sevdiğim yemek suşidir."},
  {id:"w85",sub:"İsim",char:"乗り物",tr:"taşıt / araç",read:"のりもの",ex:"のりものにのります。 — Taşıta biniyorum."},
  {id:"w86",sub:"İsim",char:"温泉",tr:"kaplıca / sıcak su kaynağı",read:"おんせん",ex:"温泉にはいります。 — Kaplıcaya giriyorum."},
  {id:"w87",sub:"İsim",char:"寮",tr:"yurt / öğrenci yurdu",read:"りょう",ex:"大学のりょうにすんでいます。 — Üniversite yurdunda yaşıyorum."},
  {id:"w88",sub:"İsim",char:"部屋",tr:"oda",read:"へや",ex:"部屋をかたづけます。 — Odayı toparlıyorum."},
  {id:"w89",sub:"İsim",char:"仕事",tr:"iş / meslek",read:"しごと",ex:"仕事をしています。 — Çalışıyorum."},
  {id:"w90",sub:"İsim",char:"生活",tr:"yaşam / gündelik hayat",read:"せいかつ",ex:"日本の生活はどうですか？ — Japonya'daki yaşam nasıl?"},
  {id:"w91",sub:"İsim",char:"映画",tr:"film / sinema",read:"えいが",ex:"映画をみます。 — Film izliyorum."},
  {id:"w92",sub:"İsim",char:"辞書",tr:"sözlük",read:"じしょ",ex:"じしょをつかいます。 — Sözlük kullanıyorum."},
  {id:"w93",sub:"İsim",char:"お茶",tr:"çay / Japon çayı",read:"おちゃ",ex:"お茶をのみます。 — Çay içiyorum."},
  {id:"w94",sub:"İsim",char:"コーヒー",tr:"kahve",read:"こーひー",ex:"コーヒーをのみます。 — Kahve içiyorum."},
  {id:"w95",sub:"İsim",char:"音楽",tr:"müzik",read:"おんがく",ex:"音楽をききます。 — Müzik dinliyorum."},
  {id:"w96",sub:"İsim",char:"スポーツ",tr:"spor",read:"すぽーつ",ex:"スポーツがすきです。 — Sporu seviyorum."},
  {id:"w97",sub:"İsim",char:"料理",tr:"yemek / yemek pişirme",read:"りょうり",ex:"日本のりょうりがすきです。 — Japon yemeğini seviyorum."},
  {id:"w98",sub:"İsim",char:"野球",tr:"beyzbol",read:"やきゅう",ex:"やきゅうをみます。 — Beyzbol izliyorum."},
  {id:"w99",sub:"İsim",char:"サッカー",tr:"futbol",read:"さっかー",ex:"サッカーをします。 — Futbol oynuyorum."},
  {id:"w100",sub:"İsim",char:"ダンス",tr:"dans",read:"だんす",ex:"ダンスをならいます。 — Dans öğreniyorum."},
  {id:"w101",sub:"İsim",char:"旅行",tr:"seyahat / gezi",read:"りょこう",ex:"旅行がすきです。 — Seyahati seviyorum."},
  {id:"w102",sub:"İsim",char:"お酒",tr:"alkol / içki / sake",read:"おさけ",ex:"お酒をのみます。 — İçki içiyorum."},
  {id:"w103",sub:"İsim",char:"カラオケ",tr:"karaoke",read:"からおけ",ex:"カラオケにいきます。 — Karaokaya gidiyorum."},
  {id:"w104",sub:"İsim",char:"魚",tr:"balık",read:"さかな",ex:"魚をたべます。 — Balık yiyorum."},
  {id:"w105",sub:"İsim",char:"野菜",tr:"sebze",read:"やさい",ex:"野菜をたべます。 — Sebze yiyorum."},
  {id:"w106",sub:"İsim",char:"果物",tr:"meyve",read:"くだもの",ex:"果物がすきです。 — Meyveyi seviyorum."},
  {id:"w107",sub:"İsim",char:"絵",tr:"resim / tablo",read:"え",ex:"絵をかきます。 — Resim yapıyorum."},
  {id:"w108",sub:"İsim",char:"歌",tr:"şarkı",read:"うた",ex:"歌をうたいます。 — Şarkı söylüyorum."},
  {id:"w109",sub:"İsim",char:"子ども",tr:"çocuk",read:"こども",ex:"子どもがあそんでいます。 — Çocuk oynuyor."},
  {id:"w110",sub:"İsim",char:"誕生日",tr:"doğum günü",read:"たんじょうび",ex:"今日はたんじょうびです。 — Bugün doğum günüm."},
  {id:"w111",sub:"İsim",char:"時間",tr:"zaman / saat / süre",read:"じかん",ex:"時間がありますか？ — Zamanınız var mı?"},
  {id:"w112",sub:"İsim",char:"用事",tr:"yapılacak iş / işim var",read:"ようじ",ex:"ようじがあります。 — İşim var."},
  {id:"w113",sub:"İsim",char:"約束",tr:"randevu / söz / anlaşma",read:"やくそく",ex:"やくそくがあります。 — Randevum var."},
  {id:"w114",sub:"İsim",char:"今度",tr:"bir dahaki sefere / bu sefer",read:"こんど",ex:"今度いっしょにいきましょう。 — Bir dahaki sefere birlikte gidelim."},
  {id:"w115",sub:"İsim",char:"木",tr:"ağaç",read:"き",ex:"木のしたにすわります。 — Ağacın altına oturuyorum."},
  {id:"w116",sub:"İsim",char:"池",tr:"gölet / küçük göl",read:"いけ",ex:"池に魚がいます。 — Gölette balık var."},
  {id:"w117",sub:"İsim",char:"公園",tr:"park",read:"こうえん",ex:"公園であそびます。 — Parkta oynuyorum."},
  {id:"w118",sub:"İsim",char:"動物",tr:"hayvan",read:"どうぶつ",ex:"動物がすきです。 — Hayvanları seviyorum."},
  {id:"w119",sub:"İsim",char:"猫",tr:"kedi",read:"ねこ",ex:"ねこをかっています。 — Kedi besliyorum."},
  {id:"w120",sub:"İsim",char:"犬",tr:"köpek",read:"いぬ",ex:"いぬとさんぽします。 — Köpekle yürüyüşe çıkıyorum."},
  {id:"w121",sub:"İsim",char:"庭",tr:"bahçe / avlu",read:"にわ",ex:"にわに花があります。 — Bahçede çiçek var."},
  {id:"w122",sub:"İsim",char:"窓",tr:"pencere",read:"まど",ex:"窓をあけます。 — Pencereyi açıyorum."},
  {id:"w123",sub:"İsim",char:"箱",tr:"kutu",read:"はこ",ex:"はこにいれます。 — Kutuya koyuyorum."},
  {id:"w124",sub:"İsim",char:"手紙",tr:"mektup",read:"てがみ",ex:"手紙をかきます。 — Mektup yazıyorum."},
  {id:"w125",sub:"İsim",char:"写真",tr:"fotoğraf",read:"しゃしん",ex:"写真をとります。 — Fotoğraf çekiyorum."},
  {id:"w126",sub:"İsim",char:"郵便局",tr:"postane",read:"ゆうびんきょく",ex:"郵便局にいきます。 — Postaneye gidiyorum."},
  {id:"w127",sub:"İsim",char:"銀行",tr:"banka",read:"ぎんこう",ex:"銀行でお金をおろします。 — Bankadan para çekiyorum."},
  {id:"w128",sub:"İsim",char:"病院",tr:"hastane",read:"びょういん",ex:"病院にいきます。 — Hastaneye gidiyorum."},
  {id:"w129",sub:"İsim",char:"図書館",tr:"kütüphane",read:"としょかん",ex:"図書館で本をよみます。 — Kütüphanede kitap okuyorum."},
  {id:"w130",sub:"İsim",char:"地図",tr:"harita",read:"ちず",ex:"地図をみます。 — Haritaya bakıyorum."},
  {id:"w131",sub:"İsim",char:"会議室",tr:"toplantı odası",read:"かいぎしつ",ex:"会議室でかいぎをします。 — Toplantı odasında toplantı yapıyorum."},
  {id:"w132",sub:"İsim",char:"切手",tr:"pul",read:"きって",ex:"切手をかいます。 — Pul satın alıyorum."},
  {id:"w133",sub:"İsim",char:"はがき",tr:"kartpostal",read:"はがき",ex:"はがきをおくります。 — Kartpostal gönderiyorum."},
  {id:"w134",sub:"İsim",char:"封筒",tr:"zarf",read:"ふうとう",ex:"封筒にいれます。 — Zarfa koyuyorum."},
  {id:"w135",sub:"İsim",char:"新幹線",tr:"Shinkansen / yüksek hızlı tren",read:"しんかんせん",ex:"新幹線にのります。 — Shinkansen'e biniyorum."},
  {id:"w136",sub:"İsim",char:"飛行機",tr:"uçak",read:"ひこうき",ex:"飛行機でいきます。 — Uçakla gidiyorum."},
  {id:"w137",sub:"İsim",char:"兄弟",tr:"kardeş / kardeşler",read:"きょうだい",ex:"兄弟がいます。 — Kardeşim var."},
  {id:"w138",sub:"İsim",char:"姉",tr:"abla",read:"あね",ex:"姉は医者です。 — Ablam doktordur."},
  {id:"w139",sub:"İsim",char:"兄",tr:"ağabey",read:"あに",ex:"兄は学生です。 — Ağabeyim öğrencidir."},
  {id:"w140",sub:"İsim",char:"妹",tr:"kız kardeş (küçük)",read:"いもうと",ex:"妹は高校生です。 — Kız kardeşim lise öğrencisidir."},
  {id:"w141",sub:"İsim",char:"弟",tr:"erkek kardeş (küçük)",read:"おとうと",ex:"弟は小学生です。 — Erkek kardeşim ilkokul öğrencisidir."},
  {id:"w142",sub:"İsim",char:"つくえ",tr:"masa",read:"つくえ",ex:"つくえのうえに本があります。 — Masanın üstünde kitap var."},
  {id:"w143",sub:"İsim",char:"いす",tr:"sandalye / koltuk",read:"いす",ex:"いすにすわります。 — Sandalyeye oturuyorum."},
  {id:"w144",sub:"İsim",char:"ほん",tr:"kitap",read:"ほん",ex:"ほんをよみます。 — Kitap okuyorum."},
  {id:"w145",sub:"İsim",char:"かばん",tr:"çanta",read:"かばん",ex:"かばんをもちます。 — Çanta taşıyorum."},
  {id:"w146",sub:"İsim",char:"くるま",tr:"araba / otomobil",read:"くるま",ex:"くるまでいきます。 — Arabayla gidiyorum."},
  {id:"w147",sub:"İsim",char:"パン",tr:"ekmek",read:"ぱん",ex:"パンをたべます。 — Ekmek yiyorum."},
  {id:"w148",sub:"İsim",char:"にく",tr:"et",read:"にく",ex:"にくがすきです。 — Eti seviyorum."},
  {id:"w149",sub:"İsim",char:"コンサート",tr:"konser",read:"こんさーと",ex:"コンサートにいきます。 — Konsere gidiyorum."},
];

const KANJI = [
  {id:"k0",k:"日",tr:"güneş, gün",kun:"ひ",on:"ニチ／ジツ",lesson:1,ex:"日(ひ) güneş; 日曜日(にちようび) Pazar; 日本(にほん) Japonya"},
  {id:"k1",k:"月",tr:"ay, takvim ayı",kun:"つき",on:"ゲツ、ガツ",lesson:1,ex:"月(つき) ay; 月曜日(げつようび) Pazartesi; 1月(いちがつ) Ocak"},
  {id:"k2",k:"木",tr:"ağaç",kun:"き",on:"モク、ボク",lesson:1,ex:"木(き) ağaç; 木曜日(もくようび) Perşembe"},
  {id:"k3",k:"山",tr:"dağ",kun:"やま",on:"サン",lesson:1,ex:"山(やま) dağ; 富士山(ふじさん) Fuji Dağı"},
  {id:"k4",k:"川",tr:"nehir",kun:"かわ",on:"(セン)",lesson:1,ex:"川(かわ) nehir; 小川(おがわ) dere"},
  {id:"k5",k:"田",tr:"çeltik tarlası",kun:"た",on:"デン",lesson:1,ex:"田(た)んぼ çeltik tarlası; 田中(たなか) soyadı"},
  {id:"k6",k:"人",tr:"insan, kişi",kun:"ひと",on:"ジン、ニン",lesson:1,ex:"人(ひと) insan; 日本人(にほんじん) Japon"},
  {id:"k7",k:"口",tr:"ağız",kun:"くち",on:"コウ",lesson:1,ex:"口(くち) ağız; 入口(いりぐち) giriş; 出口(でぐち) çıkış"},
  {id:"k8",k:"車",tr:"araba, taşıt",kun:"くるま",on:"シャ",lesson:1,ex:"車(くるま) araba; 電車(でんしゃ) tren"},
  {id:"k9",k:"門",tr:"kapı (büyük)",kun:"かど",on:"モン",lesson:1,ex:"門(もん) kapı; 専門(せんもん) uzmanlık"},
  {id:"k10",k:"火",tr:"ateş",kun:"ひ",on:"カ",lesson:2,ex:"火(ひ) ateş; 火曜日(かようび) Salı; 火山(かざん) yanardağ"},
  {id:"k11",k:"水",tr:"su",kun:"みず",on:"スイ",lesson:2,ex:"水(みず) su; 水曜日(すいようび) Çarşamba"},
  {id:"k12",k:"金",tr:"altın, para",kun:"かね",on:"キン",lesson:2,ex:"お金(かね) para; 金曜日(きんようび) Cuma"},
  {id:"k13",k:"土",tr:"toprak",kun:"つち",on:"ド",lesson:2,ex:"土(つち) toprak; 土曜日(どようび) Cumartesi"},
  {id:"k14",k:"子",tr:"çocuk",kun:"こ",on:"シ",lesson:2,ex:"子(こ)ども çocuk; 女の子(おんなのこ) kız çocuk"},
  {id:"k15",k:"女",tr:"kadın",kun:"おんな",on:"ジョ",lesson:2,ex:"女(おんな) kadın; 彼女(かのじょ) o (kadın)"},
  {id:"k16",k:"学",tr:"öğrenmek",kun:"まな-ぶ",on:"ガク",lesson:2,ex:"学生(がくせい) öğrenci; 大学(だいがく) üniversite"},
  {id:"k17",k:"生",tr:"yaşamak, doğmak",kun:"い-きる",on:"セイ",lesson:2,ex:"先生(せんせい) öğretmen; 学生(がくせい) öğrenci"},
  {id:"k18",k:"先",tr:"önce, önceki",kun:"さき",on:"セン",lesson:2,ex:"先(さき) önde; 先生(せんせい) öğretmen"},
  {id:"k19",k:"私",tr:"ben",kun:"わたし",on:"シ",lesson:2,ex:"私(わたし) ben"},
  {id:"k20",k:"一",tr:"bir",kun:"ひと-つ",on:"イチ",lesson:3,ex:"一(いち) bir; 一月(いちがつ) Ocak"},
  {id:"k21",k:"二",tr:"iki",kun:"ふた-つ",on:"ニ",lesson:3,ex:"二(に) iki; 二月(にがつ) Şubat"},
  {id:"k22",k:"三",tr:"üç",kun:"みっ-つ",on:"サン",lesson:3,ex:"三(さん) üç; 三月(さんがつ) Mart"},
  {id:"k23",k:"四",tr:"dört",kun:"よっ-つ、よん",on:"シ",lesson:3,ex:"四月(しがつ) Nisan"},
  {id:"k24",k:"五",tr:"beş",kun:"いつ-つ",on:"ゴ",lesson:3,ex:"五月(ごがつ) Mayıs"},
  {id:"k25",k:"六",tr:"altı",kun:"むっ-つ",on:"ロク",lesson:3,ex:"六月(ろくがつ) Haziran"},
  {id:"k26",k:"七",tr:"yedi",kun:"なな-つ、なな",on:"シチ",lesson:3,ex:"七月(しちがつ) Temmuz"},
  {id:"k27",k:"八",tr:"sekiz",kun:"やっ-つ",on:"ハチ",lesson:3,ex:"八月(はちがつ) Ağustos"},
  {id:"k28",k:"九",tr:"dokuz",kun:"ここの-つ",on:"ク、キュウ",lesson:3,ex:"九月(くがつ) Eylül"},
  {id:"k29",k:"十",tr:"on",kun:"とお",on:"ジュウ",lesson:3,ex:"十月(じゅうがつ) Ekim"},
  {id:"k30",k:"百",tr:"yüz",kun:"—",on:"ヒャク",lesson:3,ex:"二百(にひゃく) 200"},
  {id:"k31",k:"千",tr:"bin",kun:"ち",on:"セン",lesson:3,ex:"千円(せんえん) 1000 yen"},
  {id:"k32",k:"万",tr:"on bin",kun:"—",on:"マン",lesson:3,ex:"一万円(いちまんえん) 10000 yen"},
  {id:"k33",k:"円",tr:"çember, yen",kun:"まる-い",on:"エン",lesson:3,ex:"百円(ひゃくえん) 100 yen"},
  {id:"k34",k:"年",tr:"yıl",kun:"とし",on:"ネン",lesson:3,ex:"去年(きょねん) geçen yıl; 来年(らいねん) gelecek yıl"},
  {id:"k35",k:"上",tr:"üst, yukarı",kun:"うえ",on:"ジョウ",lesson:4,ex:"上(うえ) üst; 年上(としうえ) büyük (yaş)"},
  {id:"k36",k:"下",tr:"alt, aşağı",kun:"した",on:"ゲ",lesson:4,ex:"下(した) alt; 地下(ちか) yeraltı"},
  {id:"k37",k:"中",tr:"orta, içinde",kun:"なか",on:"チュウ",lesson:4,ex:"中(なか) içinde; 中学校(ちゅうがっこう) ortaokul"},
  {id:"k38",k:"大",tr:"büyük",kun:"おお-きい",on:"ダイ",lesson:4,ex:"大(おお)きい büyük; 大学(だいがく) üniversite"},
  {id:"k39",k:"小",tr:"küçük",kun:"ちい-さい",on:"ショウ",lesson:4,ex:"小(ちい)さい küçük; 小学校(しょうがっこう) ilkokul"},
  {id:"k40",k:"本",tr:"kök, kitap",kun:"もと",on:"ホン",lesson:4,ex:"本(ほん) kitap; 日本(にほん) Japonya"},
  {id:"k41",k:"半",tr:"yarım",kun:"なか-ば",on:"ハン",lesson:4,ex:"半年(はんとし) yarım yıl; 三時半(さんじはん) 3:30"},
  {id:"k42",k:"分",tr:"bölüm, dakika",kun:"わ-かる",on:"フン",lesson:4,ex:"五分(ごふん) beş dakika; 分(わ)かる anlamak"},
  {id:"k43",k:"力",tr:"güç, kuvvet",kun:"ちから",on:"リョク",lesson:4,ex:"力(ちから) güç"},
  {id:"k44",k:"何",tr:"ne",kun:"なに、なん",on:"—",lesson:4,ex:"何(なに) ne; 何人(なんにん) kaç kişi"},
  {id:"k45",k:"明",tr:"parlak, açık",kun:"あか-るい",on:"メイ",lesson:5,ex:"明(あか)るい parlak; 明日(あした) yarın"},
  {id:"k46",k:"休",tr:"dinlenmek",kun:"やす-む",on:"キュウ",lesson:5,ex:"休(やす)む dinlenmek; 休日(きゅうじつ) tatil"},
  {id:"k47",k:"体",tr:"vücut",kun:"からだ",on:"タイ",lesson:5,ex:"体(からだ) vücut; 体力(たいりょく) fiziksel güç"},
  {id:"k48",k:"好",tr:"sevmek",kun:"す-き",on:"コウ",lesson:5,ex:"好(す)きな favori; 好物(こうぶつ) en sevilen şey"},
  {id:"k49",k:"男",tr:"erkek",kun:"おとこ",on:"ダン",lesson:5,ex:"男(おとこ) adam; 男の子(おとこのこ) erkek çocuk"},
  {id:"k50",k:"林",tr:"koruluk",kun:"はやし",on:"リン",lesson:5,ex:"林(はやし) koruluk; 小林(こばやし) soyadı"},
  {id:"k51",k:"森",tr:"orman",kun:"もり",on:"シン",lesson:5,ex:"森(もり) orman; 森林(しんりん) ormanlar"},
  {id:"k52",k:"間",tr:"arasında, aralık",kun:"あいだ",on:"カン",lesson:5,ex:"間(あいだ) arasında; 時間(じかん) zaman"},
  {id:"k53",k:"畑",tr:"tarla",kun:"はたけ",on:"—",lesson:5,ex:"畑(はたけ) tarla; 花畑(はなばたけ) çiçek bahçesi"},
  {id:"k54",k:"岩",tr:"kaya",kun:"いわ",on:"ガン",lesson:5,ex:"岩(いわ) kaya; 岩石(がんせき) kayalar"},
  {id:"k55",k:"目",tr:"göz",kun:"め",on:"モク",lesson:6,ex:"目(め) göz; 目次(もくじ) içindekiler"},
  {id:"k56",k:"耳",tr:"kulak",kun:"みみ",on:"ジ",lesson:6,ex:"耳(みみ) kulak"},
  {id:"k57",k:"手",tr:"el",kun:"て",on:"シュ",lesson:6,ex:"手(て) el; 手紙(てがみ) mektup"},
  {id:"k58",k:"足",tr:"ayak, bacak",kun:"あし",on:"ソク",lesson:6,ex:"足(あし) ayak; 足(た)りる yetmek"},
  {id:"k59",k:"雨",tr:"yağmur",kun:"あめ",on:"ウ",lesson:6,ex:"雨(あめ) yağmur; 大雨(おおあめ) sağanak"},
  {id:"k60",k:"竹",tr:"bambu",kun:"たけ",on:"チク",lesson:6,ex:"竹(たけ) bambu"},
  {id:"k61",k:"米",tr:"pirinç, Amerika",kun:"こめ",on:"マイ",lesson:6,ex:"米(こめ) pirinç; 米国(べいこく) ABD"},
  {id:"k62",k:"貝",tr:"deniz kabuğu",kun:"かい",on:"バイ",lesson:6,ex:"貝(かい) deniz kabuğu"},
  {id:"k63",k:"石",tr:"taş",kun:"いし",on:"セキ",lesson:6,ex:"石(いし) taş; 石油(せきゆ) petrol"},
  {id:"k64",k:"糸",tr:"iplik",kun:"いと",on:"シ",lesson:6,ex:"糸(いと) iplik; 毛糸(けいと) yün ipliği"},
  {id:"k65",k:"花",tr:"çiçek",kun:"はな",on:"カ",lesson:7,ex:"花(はな) çiçek; 花火(はなび) havai fişek"},
  {id:"k66",k:"茶",tr:"çay",kun:"—",on:"チャ",lesson:7,ex:"お茶(ちゃ) çay; 紅茶(こうちゃ) siyah çay"},
  {id:"k67",k:"肉",tr:"et",kun:"—",on:"ニク",lesson:7,ex:"肉(にく) et; 牛肉(ぎゅうにく) sığır eti"},
  {id:"k68",k:"文",tr:"yazı, cümle",kun:"ふみ",on:"ブン",lesson:7,ex:"文(ぶん) cümle; 文学(ぶんがく) edebiyat"},
  {id:"k69",k:"字",tr:"harf, karakter",kun:"あざ",on:"ジ",lesson:7,ex:"字(じ) karakter; 漢字(かんじ) Kanji"},
  {id:"k70",k:"物",tr:"şey, nesne",kun:"もの",on:"ブツ",lesson:7,ex:"物(もの) şey; 買物(かいもの) alışveriş"},
  {id:"k71",k:"牛",tr:"inek, öküz",kun:"うし",on:"ギュウ",lesson:7,ex:"牛(うし) inek; 牛乳(ぎゅうにゅう) süt"},
  {id:"k72",k:"馬",tr:"at",kun:"うま",on:"バ",lesson:7,ex:"馬(うま) at; 馬車(ばしゃ) at arabası"},
  {id:"k73",k:"鳥",tr:"kuş",kun:"とり",on:"チョウ",lesson:7,ex:"鳥(とり) kuş; 白鳥(はくちょう) kuğu"},
  {id:"k74",k:"魚",tr:"balık",kun:"さかな",on:"ギョ",lesson:7,ex:"魚(さかな) balık; 金魚(きんぎょ) japon balığı"},
  {id:"k75",k:"新",tr:"yeni",kun:"あたら-しい",on:"シン",lesson:8,ex:"新(あたら)しい yeni; 新聞(しんぶん) gazete"},
  {id:"k76",k:"古",tr:"eski",kun:"ふる-い",on:"コ",lesson:8,ex:"古(ふる)い eski; 古本(ふるほん) ikinci el kitap"},
  {id:"k77",k:"長",tr:"uzun",kun:"なが-い",on:"チョウ",lesson:8,ex:"長(なが)い uzun; 長男(ちょうなん) en büyük oğul"},
  {id:"k78",k:"短",tr:"kısa",kun:"みじか-い",on:"タン",lesson:8,ex:"短(みじか)い kısa"},
  {id:"k79",k:"高",tr:"yüksek, pahalı",kun:"たか-い",on:"コウ",lesson:8,ex:"高(たか)い yüksek/pahalı; 高校(こうこう) lise"},
  {id:"k80",k:"安",tr:"güvenli, ucuz",kun:"やす-い",on:"アン",lesson:8,ex:"安(やす)い ucuz; 安全(あんぜん) güvenli"},
  {id:"k81",k:"低",tr:"alçak, düşük",kun:"ひく-い",on:"テイ",lesson:8,ex:"低(ひく)い alçak"},
  {id:"k82",k:"暗",tr:"karanlık",kun:"くら-い",on:"アン",lesson:8,ex:"暗(くら)い karanlık"},
  {id:"k83",k:"多",tr:"çok, fazla",kun:"おお-い",on:"タ",lesson:8,ex:"多(おお)い çok; 多数(たすう) büyük sayı"},
  {id:"k84",k:"少",tr:"az",kun:"すく-ない",on:"ショウ",lesson:8,ex:"少(すく)ない az; 少(すこ)し biraz"},
  {id:"k85",k:"行",tr:"gitmek",kun:"い-く",on:"コウ",lesson:9,ex:"行(い)く gitmek; 旅行(りょこう) seyahat"},
  {id:"k86",k:"来",tr:"gelmek",kun:"く-る",on:"ライ",lesson:9,ex:"来(く)る gelmek; 来年(らいねん) gelecek yıl"},
  {id:"k87",k:"帰",tr:"geri dönmek",kun:"かえ-る",on:"キ",lesson:9,ex:"帰(かえ)る geri dönmek"},
  {id:"k88",k:"食",tr:"yemek",kun:"た-べる",on:"ショク",lesson:9,ex:"食(た)べる yemek; 食事(しょくじ) öğün"},
  {id:"k89",k:"飲",tr:"içmek",kun:"の-む",on:"イン",lesson:9,ex:"飲(の)む içmek; 飲み物(のみもの) içecek"},
  {id:"k90",k:"見",tr:"görmek",kun:"み-る",on:"ケン",lesson:9,ex:"見(み)る bakmak; 意見(いけん) görüş"},
  {id:"k91",k:"聞",tr:"duymak, dinlemek",kun:"き-く",on:"ブン",lesson:9,ex:"聞(き)く duymak; 新聞(しんぶん) gazete"},
  {id:"k92",k:"読",tr:"okumak",kun:"よ-む",on:"ドク",lesson:9,ex:"読(よ)む okumak; 読書(どくしょ) kitap okuma"},
  {id:"k93",k:"書",tr:"yazmak",kun:"か-く",on:"ショ",lesson:9,ex:"書(か)く yazmak; 書店(しょてん) kitapçı"},
  {id:"k94",k:"話",tr:"konuşmak",kun:"はな-す",on:"ワ",lesson:9,ex:"話(はな)す konuşmak; 電話(でんわ) telefon"},
  {id:"k95",k:"買",tr:"satın almak",kun:"か-う",on:"バイ",lesson:9,ex:"買(か)う satın almak; 買い物(かいもの) alışveriş"},
  {id:"k96",k:"教",tr:"öğretmek",kun:"おし-える",on:"キョウ",lesson:9,ex:"教(おし)える öğretmek; 教室(きょうしつ) sınıf"},
  {id:"k97",k:"朝",tr:"sabah",kun:"あさ",on:"チョウ",lesson:10,ex:"朝(あさ) sabah; 朝食(ちょうしょく) kahvaltı"},
  {id:"k98",k:"昼",tr:"öğle, gündüz",kun:"ひる",on:"チュウ",lesson:10,ex:"昼(ひる) öğle; 昼食(ちゅうしょく) öğle yemeği"},
  {id:"k99",k:"夜",tr:"gece",kun:"よる",on:"ヤ",lesson:10,ex:"夜(よる) gece; 今夜(こんや) bu gece"},
  {id:"k100",k:"晩",tr:"akşam, gece",kun:"ばん",on:"バン",lesson:10,ex:"晩(ばん) gece; 今晩(こんばん) bu gece"},
  {id:"k101",k:"夕",tr:"akşam üstü",kun:"ゆう",on:"セキ",lesson:10,ex:"夕食(ゆうしょく) akşam yemeği"},
  {id:"k102",k:"方",tr:"yön, yöntem",kun:"かた",on:"ホウ",lesson:10,ex:"書き方(かきかた) yazış biçimi"},
  {id:"k103",k:"午",tr:"öğle",kun:"うま",on:"ゴ",lesson:10,ex:"午前(ごぜん) öğleden önce; 午後(ごご) öğleden sonra"},
  {id:"k104",k:"前",tr:"önce, ön",kun:"まえ",on:"ゼン",lesson:10,ex:"前(まえ) önce; 前半(ぜんはん) ilk yarı"},
  {id:"k105",k:"後",tr:"sonra, arka",kun:"あと",on:"ゴ",lesson:10,ex:"後(あと) sonra; 後半(こうはん) son yarı"},
  {id:"k106",k:"毎",tr:"her",kun:"—",on:"マイ",lesson:10,ex:"毎日(まいにち) her gün; 毎週(まいしゅう) her hafta"},
  {id:"k107",k:"週",tr:"hafta",kun:"—",on:"シュウ",lesson:10,ex:"来週(らいしゅう) gelecek hafta; 週末(しゅうまつ) hafta sonu"},
  {id:"k108",k:"曜",tr:"haftanın günü",kun:"—",on:"ヨウ",lesson:10,ex:"月曜日(げつようび) Pazartesi; 火曜日(かようび) Salı"},
];

const KANJI_WORDS = [
  {id:"kw0",word:"日",read:"ひ",tr:"güneş",lesson:1},
  {id:"kw1",word:"日曜日",read:"にちようび",tr:"Pazar",lesson:1},
  {id:"kw2",word:"日本",read:"にほん",tr:"Japonya",lesson:1},
  {id:"kw3",word:"月",read:"つき",tr:"ay",lesson:1},
  {id:"kw4",word:"月曜日",read:"げつようび",tr:"Pazartesi",lesson:1},
  {id:"kw5",word:"木曜日",read:"もくようび",tr:"Perşembe",lesson:1},
  {id:"kw6",word:"山",read:"やま",tr:"dağ",lesson:1},
  {id:"kw7",word:"富士山",read:"ふじさん",tr:"Fuji Dağı",lesson:1},
  {id:"kw8",word:"火山",read:"かざん",tr:"yanardağ",lesson:1},
  {id:"kw9",word:"川",read:"かわ",tr:"nehir",lesson:1},
  {id:"kw10",word:"小川",read:"おがわ",tr:"dere",lesson:1},
  {id:"kw11",word:"水田",read:"すいでん",tr:"çeltik tarlası",lesson:1},
  {id:"kw12",word:"日本人",read:"にほんじん",tr:"Japon",lesson:1},
  {id:"kw13",word:"入口",read:"いりぐち",tr:"giriş",lesson:1},
  {id:"kw14",word:"出口",read:"でぐち",tr:"çıkış",lesson:1},
  {id:"kw15",word:"人口",read:"じんこう",tr:"nüfus",lesson:1},
  {id:"kw16",word:"電車",read:"でんしゃ",tr:"tren",lesson:1},
  {id:"kw17",word:"自動車",read:"じどうしゃ",tr:"otomobil",lesson:1},
  {id:"kw18",word:"専門",read:"せんもん",tr:"uzmanlık alanı",lesson:1},
  {id:"kw19",word:"火曜日",read:"かようび",tr:"Salı",lesson:2},
  {id:"kw20",word:"火事",read:"かじ",tr:"yangın",lesson:2},
  {id:"kw21",word:"水曜日",read:"すいようび",tr:"Çarşamba",lesson:2},
  {id:"kw22",word:"お金",read:"おかね",tr:"para",lesson:2},
  {id:"kw23",word:"金曜日",read:"きんようび",tr:"Cuma",lesson:2},
  {id:"kw24",word:"土曜日",read:"どようび",tr:"Cumartesi",lesson:2},
  {id:"kw25",word:"女子学生",read:"じょしがくせい",tr:"kız öğrenci",lesson:2},
  {id:"kw26",word:"彼女",read:"かのじょ",tr:"o (kadın) / kız arkadaş",lesson:2},
  {id:"kw27",word:"学生",read:"がくせい",tr:"öğrenci",lesson:2},
  {id:"kw28",word:"大学",read:"だいがく",tr:"üniversite",lesson:2},
  {id:"kw29",word:"学校",read:"がっこう",tr:"okul",lesson:2},
  {id:"kw30",word:"先生",read:"せんせい",tr:"öğretmen",lesson:2},
  {id:"kw31",word:"先月",read:"せんげつ",tr:"geçen ay",lesson:2},
  {id:"kw32",word:"私立大学",read:"しりつだいがく",tr:"özel üniversite",lesson:2},
  {id:"kw33",word:"一月",read:"いちがつ",tr:"Ocak",lesson:3},
  {id:"kw34",word:"一人",read:"ひとり",tr:"bir kişi",lesson:3},
  {id:"kw35",word:"二月",read:"にがつ",tr:"Şubat",lesson:3},
  {id:"kw36",word:"二人",read:"ふたり",tr:"iki kişi",lesson:3},
  {id:"kw37",word:"三月",read:"さんがつ",tr:"Mart",lesson:3},
  {id:"kw38",word:"四月",read:"しがつ",tr:"Nisan",lesson:3},
  {id:"kw39",word:"四日",read:"よっか",tr:"4. gün",lesson:3},
  {id:"kw40",word:"五月",read:"ごがつ",tr:"Mayıs",lesson:3},
  {id:"kw41",word:"六月",read:"ろくがつ",tr:"Haziran",lesson:3},
  {id:"kw42",word:"七月",read:"しちがつ",tr:"Temmuz",lesson:3},
  {id:"kw43",word:"七日",read:"なのか",tr:"7. gün",lesson:3},
  {id:"kw44",word:"八月",read:"はちがつ",tr:"Ağustos",lesson:3},
  {id:"kw45",word:"八日",read:"ようか",tr:"8. gün",lesson:3},
  {id:"kw46",word:"九月",read:"くがつ",tr:"Eylül",lesson:3},
  {id:"kw47",word:"十月",read:"じゅうがつ",tr:"Ekim",lesson:3},
  {id:"kw48",word:"十日",read:"とおか",tr:"10. gün",lesson:3},
  {id:"kw49",word:"千円",read:"せんえん",tr:"bin yen",lesson:3},
  {id:"kw50",word:"一万円",read:"いちまんえん",tr:"on bin yen",lesson:3},
  {id:"kw51",word:"百円",read:"ひゃくえん",tr:"yüz yen",lesson:3},
  {id:"kw52",word:"去年",read:"きょねん",tr:"geçen yıl",lesson:3},
  {id:"kw53",word:"来年",read:"らいねん",tr:"gelecek yıl",lesson:3},
  {id:"kw54",word:"地下",read:"ちか",tr:"yeraltı",lesson:4},
  {id:"kw55",word:"中学校",read:"ちゅうがっこう",tr:"ortaokul",lesson:4},
  {id:"kw56",word:"大人",read:"おとな",tr:"yetişkin",lesson:4},
  {id:"kw57",word:"小学校",read:"しょうがっこう",tr:"ilkokul",lesson:4},
  {id:"kw58",word:"本日",read:"ほんじつ",tr:"bugün (resmi)",lesson:4},
  {id:"kw59",word:"半年",read:"はんとし",tr:"yarım yıl",lesson:4},
  {id:"kw60",word:"半分",read:"はんぶん",tr:"yarı",lesson:4},
  {id:"kw61",word:"五分",read:"ごふん",tr:"beş dakika",lesson:4},
  {id:"kw62",word:"水力",read:"すいりょく",tr:"su gücü",lesson:4},
  {id:"kw63",word:"何人",read:"なんにん",tr:"kaç kişi",lesson:4},
  {id:"kw64",word:"明日",read:"あした",tr:"yarın",lesson:5},
  {id:"kw65",word:"休日",read:"きゅうじつ",tr:"tatil",lesson:5},
  {id:"kw66",word:"体力",read:"たいりょく",tr:"fiziksel güç",lesson:5},
  {id:"kw67",word:"好物",read:"こうぶつ",tr:"en sevilen yemek",lesson:5},
  {id:"kw68",word:"男子学生",read:"だんしがくせい",tr:"erkek öğrenci",lesson:5},
  {id:"kw69",word:"長男",read:"ちょうなん",tr:"en büyük oğul",lesson:5},
  {id:"kw70",word:"森林",read:"しんりん",tr:"ormanlar",lesson:5},
  {id:"kw71",word:"時間",read:"じかん",tr:"zaman",lesson:5},
  {id:"kw72",word:"一年間",read:"いちねんかん",tr:"bir yıl (süre)",lesson:5},
  {id:"kw73",word:"花畑",read:"はなばたけ",tr:"çiçek bahçesi",lesson:5},
  {id:"kw74",word:"目次",read:"もくじ",tr:"içindekiler",lesson:6},
  {id:"kw75",word:"手紙",read:"てがみ",tr:"mektup",lesson:6},
  {id:"kw76",word:"歌手",read:"かしゅ",tr:"şarkıcı",lesson:6},
  {id:"kw77",word:"大雨",read:"おおあめ",tr:"sağanak yağmur",lesson:6},
  {id:"kw78",word:"米国",read:"べいこく",tr:"ABD",lesson:6},
  {id:"kw79",word:"石油",read:"せきゆ",tr:"petrol",lesson:6},
  {id:"kw80",word:"毛糸",read:"けいと",tr:"yün ipliği",lesson:6},
  {id:"kw81",word:"花火",read:"はなび",tr:"havai fişek",lesson:7},
  {id:"kw82",word:"紅茶",read:"こうちゃ",tr:"siyah çay",lesson:7},
  {id:"kw83",word:"喫茶店",read:"きっさてん",tr:"kafe",lesson:7},
  {id:"kw84",word:"牛肉",read:"ぎゅうにく",tr:"sığır eti",lesson:7},
  {id:"kw85",word:"鳥肉",read:"とりにく",tr:"tavuk eti",lesson:7},
  {id:"kw86",word:"文学",read:"ぶんがく",tr:"edebiyat",lesson:7},
  {id:"kw87",word:"漢字",read:"かんじ",tr:"Kanji harfleri",lesson:7},
  {id:"kw88",word:"数字",read:"すうじ",tr:"sayı / rakam",lesson:7},
  {id:"kw89",word:"買物",read:"かいもの",tr:"alışveriş",lesson:7},
  {id:"kw90",word:"荷物",read:"にもつ",tr:"bagaj",lesson:7},
  {id:"kw91",word:"牛乳",read:"ぎゅうにゅう",tr:"inek sütü",lesson:7},
  {id:"kw92",word:"馬車",read:"ばしゃ",tr:"at arabası",lesson:7},
  {id:"kw93",word:"白鳥",read:"はくちょう",tr:"kuğu",lesson:7},
  {id:"kw94",word:"金魚",read:"きんぎょ",tr:"japon balığı",lesson:7},
  {id:"kw95",word:"新車",read:"しんしゃ",tr:"yeni araba",lesson:8},
  {id:"kw96",word:"新聞",read:"しんぶん",tr:"gazete",lesson:8},
  {id:"kw97",word:"新年",read:"しんねん",tr:"Yeni Yıl",lesson:8},
  {id:"kw98",word:"古本",read:"ふるほん",tr:"ikinci el kitap",lesson:8},
  {id:"kw99",word:"高校",read:"こうこう",tr:"lise",lesson:8},
  {id:"kw100",word:"高速",read:"こうそく",tr:"yüksek hız",lesson:8},
  {id:"kw101",word:"短大",read:"たんだい",tr:"iki yıllık üniversite",lesson:8},
  {id:"kw102",word:"低温",read:"ていおん",tr:"düşük sıcaklık",lesson:8},
  {id:"kw103",word:"暗室",read:"あんしつ",tr:"karanlık oda",lesson:8},
  {id:"kw104",word:"多数",read:"たすう",tr:"büyük sayı",lesson:8},
  {id:"kw105",word:"少年",read:"しょうねん",tr:"erkek çocuk",lesson:8},
  {id:"kw106",word:"少女",read:"しょうじょ",tr:"kız çocuk",lesson:8},
  {id:"kw107",word:"来月",read:"らいげつ",tr:"gelecek ay",lesson:9},
  {id:"kw108",word:"食事",read:"しょくじ",tr:"öğün",lesson:9},
  {id:"kw109",word:"夕食",read:"ゆうしょく",tr:"akşam yemeği",lesson:9},
  {id:"kw110",word:"意見",read:"いけん",tr:"görüş",lesson:9},
  {id:"kw111",word:"読書",read:"どくしょ",tr:"kitap okuma",lesson:9},
  {id:"kw112",word:"書店",read:"しょてん",tr:"kitapçı",lesson:9},
  {id:"kw113",word:"書道",read:"しょどう",tr:"kaligrafi",lesson:9},
  {id:"kw114",word:"会話",read:"かいわ",tr:"konuşma",lesson:9},
  {id:"kw115",word:"電話",read:"でんわ",tr:"telefon",lesson:9},
  {id:"kw116",word:"教室",read:"きょうしつ",tr:"sınıf",lesson:9},
  {id:"kw117",word:"朝食",read:"ちょうしょく",tr:"kahvaltı",lesson:10},
  {id:"kw118",word:"朝日",read:"あさひ",tr:"sabah güneşi",lesson:10},
  {id:"kw119",word:"昼食",read:"ちゅうしょく",tr:"öğle yemeği",lesson:10},
  {id:"kw120",word:"夜中",read:"よなか",tr:"gece yarısı",lesson:10},
  {id:"kw121",word:"今夜",read:"こんや",tr:"bu gece",lesson:10},
  {id:"kw122",word:"今晩",read:"こんばん",tr:"bu gece (akşam)",lesson:10},
  {id:"kw123",word:"晩御飯",read:"ばんごはん",tr:"akşam yemeği",lesson:10},
  {id:"kw124",word:"夕方",read:"ゆうがた",tr:"akşam üstü",lesson:10},
  {id:"kw125",word:"午前",read:"ごぜん",tr:"sabah / öğleden önce",lesson:10},
  {id:"kw126",word:"午後",read:"ごご",tr:"öğleden sonra",lesson:10},
  {id:"kw127",word:"正午",read:"しょうご",tr:"tam öğle",lesson:10},
  {id:"kw128",word:"前半",read:"ぜんはん",tr:"ilk yarı",lesson:10},
  {id:"kw129",word:"後半",read:"こうはん",tr:"son yarı",lesson:10},
  {id:"kw130",word:"毎日",read:"まいにち",tr:"her gün",lesson:10},
  {id:"kw131",word:"毎週",read:"まいしゅう",tr:"her hafta",lesson:10},
  {id:"kw132",word:"毎月",read:"まいつき",tr:"her ay",lesson:10},
  {id:"kw133",word:"来週",read:"らいしゅう",tr:"gelecek hafta",lesson:10},
  {id:"kw134",word:"先週",read:"せんしゅう",tr:"geçen hafta",lesson:10},
  {id:"kw135",word:"週末",read:"しゅうまつ",tr:"hafta sonu",lesson:10},
  {id:"kw136",word:"一週間",read:"いっしゅうかん",tr:"bir hafta",lesson:10},
];

const MNEMONIC_DB = {
  "日": "Dikdörtgen bir kutunun tam ortasında yatay bir çizgi var — sanki güneşin içindeki ışık hüzmesi. Bu kutu şekli 'güneş'i temsil eder.",
  "月": "İnce hilal biçiminde iki çizgi, içi boş bir ay. Gökyüzündeki ayı düşün — yarım daire, ortası açık.",
  "木": "Ortada düz bir gövde, yukarı çıkan dallar, aşağı uzanan kökler. Bu tam bir ağaç silueti!",
  "山": "Üç tepe yan yana — ortadaki en uzun, yanlardakiler daha kısa. Tipik bir 'dağ' silueti, üç sivri uç.",
  "川": "Üç dikey çizgi yan yana akıyor — tıpkı nehrin üç ayrı kolu gibi. Sol ve sağ eğik, orta dik.",
  "田": "Kare içinde artı işareti — bir çeltik tarlası tam ortadan bölünmüş, dört eşit parsel.",
  "人": "İki çizgi birbirini destekliyor, biri öne biri arkaya yaslanmış — iki bacağıyla yürüyen bir insan.",
  "口": "Basit bir kare — ağzın etrafındaki dudakların oluşturduğu dörtgen çerçeve.",
  "車": "Üstte bir kutu (kabin), ortada yatay çizgi, altında tekerlekler. Bir arabayı yukarıdan görmek gibi.",
  "門": "İki taraflı büyük kapı kanatları yan yana — büyük bir tapınak veya kale kapısı.",
  "火": "Ortada dikey gövde, iki yanda yukarı fırlayan alevler. Yanmakta olan bir ateşin silueti.",
  "水": "Ortada dikey çizgi, her iki yanda dışa kıvrılan su damlaları. Akan suyun dalgalanması.",
  "金": "Üstte çatı, altında iki nokta — toprağın altındaki altın madeni külçeleri.",
  "土": "Üstte yatay çizgi, ortada dikey direk, altta yatay taban — toprağa çakılmış bir kazık.",
  "子": "Başı büyük, kollarını açmış, bacakları sarılı — bebek gibi kıvrılmış küçük bir çocuk.",
  "女": "Dizleri üzerinde oturmuş, kollarını önünde kavuşturmuş bir figür — geleneksel kadın oturma pozu.",
  "学": "Üstte çaprazlanan çizgiler (öğretmenin tahtası), altında çocuk figürü — öğrenci sınıfta öğreniyor.",
  "生": "Topraktan fışkıran iki yaprak — bir tohumun filizlenip hayata tutunması.",
  "先": "Üstte kılavuzu izleyen adımlar, altında bacaklar — önde giden, yol gösteren kişi.",
  "私": "Sol tarafta buğday sapı (ben besleniyorum), sağda özel el hareketi — 'bu benim' der gibi.",
  "一": "Tek bir yatay çizgi. Daha basit olamaz — bir sayısı, tek çizgi.",
  "二": "İki yatay çizgi üst üste. İki sayısı, iki çizgi.",
  "三": "Üç yatay çizgi üst üste. Üç sayısı, üç çizgi.",
  "四": "Dört köşeli kutu içinde iki dikey çizgi — dört bölmeye ayrılmış pencere.",
  "五": "Ortada bir çarpı, etrafı çerçeveli — beş parmağın oluşturduğu şekil.",
  "上": "Bir çizginin üstüne çıkan küçük dikey çizgi — 'burası üst' diyor.",
  "下": "Bir çizginin altına inen küçük dikey çizgi — 'burası alt' diyor.",
  "中": "Dikdörtgen kutunun tam ortasından geçen dikey çizgi — 'tam orta' diyor.",
  "大": "Kollarını iki yana açmış, bacakları aralanmış büyük bir adam — 'büyük' dercesine kollarını germiş.",
  "小": "Ortada dikey çizgi, her iki yanda küçük noktalar — küçük, alçak, kısa bir şey.",
  "本": "木 (ağaç) kanjisinin altına yatay çizgi eklendi — kökü, temeli işaret ediyor. Kitap da bilginin kökü.",
  "半": "Ortadan bölünmüş bir şeyin üst yarısı — tam ortadan kesme işareti.",
  "力": "Kıvrılmış bir kol kası — güç gösterisi yapan biri gibi.",
  "明": "日 (güneş) + 月 (ay) yan yana — hem güneş hem ay aynı anda parlıyor, ortalık aydınlık.",
  "休": "人 (insan) + 木 (ağaç) — adam ağacın gölgesinde yaslanmış, dinleniyor.",
  "体": "人 (insan) + 本 (kök, temel) — insanın temeli, kökü: vücudu.",
  "男": "田 (tarla) + 力 (güç) — tarlada güçle çalışan: erkek.",
  "林": "İki 木 (ağaç) yan yana — iki ağaç bir araya gelince küçük koruluk olur.",
  "森": "Üç 木 (ağaç) üçgen düzeninde — üç ağaç bir araya gelince büyük orman.",
  "間": "門 (kapı) içinde 日 (güneş) — kapı aralığından güneş ışığı sızıyor: aradaki boşluk.",
  "目": "Göz şeklinde oval, içinde iki yatay çizgi — göz bebeği ve kirpikleri olan bir göz.",
  "耳": "Üstte yatay çizgiler (kepçe kulak), ortada dikey bağlantı — kulak kanalı ve kepçesi.",
  "手": "Beş parmak gibi uzanan çizgiler, ortak bir avuçta birleşiyor — el parmakları.",
  "足": "Üstte diz, altta ayak tabanı — tam bir bacak ve ayak profili.",
  "雨": "Üstte bulut çatısı, altında dörtgen içinde nokta yağmur damlaları — yağmur yağıyor.",
  "花": "草 (ot/bitki) köküne 化 (dönüşüm) eklendi — bitkinin en güzel dönüşümü: çiçek.",
  "茶": "Üstte bitki, ortada 人 (insan), altta 木 (ağaç) — insan ağaçtan bitki topluyor: çay.",
  "肉": "İçi çizgili et dilimleri — kasap tezgahındaki et bloğu.",
  "魚": "Üstte baş, ortada gövde, altta kuyruğu olan balık silueti — tam bir balık profili.",
  "新": "Sol tarafta ağaç, sağda balta — yeni kesilmiş, taze odun kokusu. 'Yeni'.",
  "古": "十 (on) + 口 (ağız) — on nesil ağızdan ağıza aktarılan: eski, köklü.",
  "高": "Üstte kule çatısı, ortada pencereli kısım, altta kapı — yüksek bir kule binası.",
  "安": "Çatı altında kadın figürü — çatı altında güvende olan kadın: güvenli, ucuz, huzurlu.",
  "行": "Dört çizgi, yol kavşağı gibi — yol ayrımında ilerleyen figür: gitmek.",
  "来": "中 (orta) + ağaç dalları — dalların ortaya doğru gelişmesi: gelmek.",
  "食": "Üstte çatı, altında kaşık tutan figür — çatı altında yemek yiyen: yemek.",
  "飲": "食 (yemek) + 欠 (esneme/ağız açma) — ağzını açıp bir şeyler alan: içmek.",
  "見": "目 (göz) + 人 (insan) — ayakta duran insanın gözü: görmek, bakmak.",
  "書": "Üstte kalem tutan el, altında düz çizgiler (kağıt) — kağıda kalemle yazmak.",
  "話": "言 (söz) + 舌 (dil) — dil ve söz bir arada: konuşmak.",
  "朝": "Sol: ay + sağ: güneş doğarken sis — sabah ışığı her iki yandan vuruyor.",
  "夜": "Üstte çatı (gece örtüsü) + insan figürü + ay — çatı altında, ay ışığında: gece.",
  "前": "Üstte tekne, altında ayak — ayakla tekneye binerken öne adım atmak: önce, ön.",
  "後": "İplik + adım atan ayak — arkada bırakılan iz, geride kalan: sonra.",
  "毎": "Her gün dönen takvim sayfaları gibi tekrar eden şekil — sürekli tekrar: 'her'.",
  "週": "Yol (辶) + etrafı çevrili alan — etrafını dolaşıp dönen: hafta.",
  // Vocab
  "います": "'İ-MA-SU' sesi — 'İma sus!' diye bağırıyorsun ama kedi orada duruyor (var/mevcut). Canlılar için olmak.",
  "あります": "'A-Rİ-MA-SU' — 'Arı masuta!' diye bağırıyorsun, kitap gerçekten masada var (cansızlar için).",
  "わかります": "'WA-KA-Rİ-MA-SU' — 'Vaka rimasuz!' diyorsun, yani vakayı (durumu) anlıyorsun.",
  "いきます": "'İ-Kİ-MA-SU' — 'İki masa' görmek için gidiyorsun. Gitmek.",
  "きます": "'Kİ-MA-SU' — 'Kımas' gibi, kımıldayarak geliyorsun. Gelmek.",
  "かえります": "'KA-E-Rİ-MA-SU' — 'Kaçar, eve geri!' — kaçmak değil, geri dönmek.",
  "たべます": "'TA-BE-MA-SU' — 'Tabe, masuda!' sofraya otur, yemeği ye!",
  "のみます": "'NO-Mİ-MA-SU' — 'Nomi masada' — nomi (Japonca içki) masada, için!",
  "みます": "'Mİ-MA-SU' — 'Mi masa?' masaya mı baktın? İzlemek, bakmak.",
  "ききます": "'Kİ-Kİ-MA-SU' — 'Kiki masada müzik' dinliyor. Dinlemek/sormak.",
  "かきます": "'KA-Kİ-MA-SU' — 'Kağıda ki, masuda' — kağıda bir şeyler yazıyorsun.",
  "します": "'Şİ-MA-SU' — 'Şimdi masuda' bir şey yapıyorsun. Yapmak.",
  "はなします": "'HA-NA-Şİ-MA-SU' — 'Hana şiması' — Hana (çiçek ismi) ada hakkında konuşuyor.",
  "たかい": "'TA-KA-İ' — 'Taka-i' uçan taka (şahin) çok yüksekte. Yüksek/pahalı.",
  "やすい": "'YA-SU-İ' — 'Yassı' fiyatlar, düz, ucuz. Yassı = ucuz.",
  "おおきい": "'O-O-Kİ-İ' — 'Ooki' diyince ağzın çok açılıyor, büyük bir şey için.",
  "ちいさい": "'Çİ-İ-SA-İ' — 'Çiçeksi' küçük bir şey, minik. Küçük.",
  "おいしい": "'O-İ-Şİ-İ' — 'Oy işi!' yedikten sonra haykırıyorsun, lezzetli!",
  "むずかしい": "'MU-ZU-KA-Şİ-İ' — 'Müzik şiiri' yazmak zor. Zor/güç.",
  "たのしい": "'TA-NO-Şİ-İ' — 'Tanoş-i' — tanışmak eğlenceli! Eğlenceli.",
  "おもしろい": "'O-MO-Şİ-RO-İ' — 'Homo şiro-i' değil, 'omoshiroi' — ilginç bir şey!",
  "げんき": "'GEN-Kİ' — 'Genç-ki' enerjik ve sağlıklı. Sağlıklı/enerjik.",
  "べんり": "'BEN-Rİ' — 'Ben ringlere gidiyorum' çünkü kullanışlı bir araç var. Kullanışlı.",
  "じょうず": "'JO-U-ZU' — 'Joker uzman' — joker gibi her şeyi beceriklilikle yapıyor.",
};

// ══════════════════════════════════════════════════════════
// COLORS
// ══════════════════════════════════════════════════════════
const C = {
  pageBg:"#f4f4f4", border:"#ddd",
  vocab:"#9b59b6", kanji:"#e84c3c", mixed:"#2980b9",
  correct:"#27ae60", wrong:"#e84c3c",
  text:"#333", textMid:"#666", textDim:"#999",
  navBg:"#333",
};

// ══════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}
function hasKanji(s){return /[\u4e00-\u9fff]/.test(s);}

// FIXED: normalize kun-yomi and accept partial matches
function normStr(s){ return s.trim().toLowerCase().replace(/\s+/g,"").replace(/[\/・\-\(\)（）、。，,]/g,""); }

function kunMatches(user, kun) {
  // kun may be "よっ-つ、よん" — accept any variant
  const u = normStr(user);
  if (normStr(kun) === u) return true;
  // split by common separators, check each piece
  const parts = kun.split(/[\/、，,・\s]+/).map(p => normStr(p.replace(/[ーっ\-]/g,"")));
  const uClean = normStr(user.replace(/[ーっ\-]/g,""));
  // also try stripping okurigana markers (e.g. よっ-つ → よっつ and よっ)
  for (const p of kun.split(/[\/、，,・\s]+/)) {
    const main = normStr(p.split("-")[0]); // before dash = root reading
    if (main === u || main === uClean) return true;
    if (normStr(p) === u || normStr(p) === uClean) return true;
  }
  return false;
}

function quickMatch(user, ans, isKun=false) {
  if (isKun) return kunMatches(user, ans);
  const u = normStr(user);
  if (!u) return false;
  if (normStr(ans) === u) return true;
  // Check slash-separated variants
  if (ans.split("/").some(v => normStr(v) === u)) return true;
  // Check comma-separated variants (e.g. "orta, içinde" → "orta" matches)
  if (ans.split(",").some(v => normStr(v.trim()) === u)) return true;
  // Check if user answer is a meaningful substring of correct answer
  // e.g. "olmak" in "olmak (cansızlar)", "dağ" in "dağ, tepe"
  const ansClean = normStr(ans.split("(")[0].split(",")[0].trim());
  if (ansClean === u && u.length >= 3) return true;
  return false;
}

// ══════════════════════════════════════════════════════════
// AI: ANSWER CHECK
// ══════════════════════════════════════════════════════════
async function checkAnswer(userAns, correctAns, displayChar, isJpAnswer, isKun=false) {
  if (quickMatch(userAns, correctAns, isKun)) return true;
  if (isJpAnswer) return false; // no AI for JP answers

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST", headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},
      body:JSON.stringify({
        model:"claude-sonnet-4-20250514", max_tokens:10,
        system:`Japonca-Türkçe SRS cevap değerlendirici. Sadece "DOGRU" veya "YANLIS" yaz.
Kurallar: eş anlamlı Türkçe kelimeler DOGRU (dinlemek=duymak, yemek=yiyecek, gitmek=hareket etmek HAYIR ama gitmek=ayrılmak EVET); yazım hatası DOGRU; kısmi doğru anlam DOGRU (olmak (canlılar) için "olmak" DOGRU).`,
        messages:[{role:"user",content:`Kelime: ${displayChar}\nDoğru: "${correctAns}"\nCevap: "${userAns}"`}]
      })
    });
    const d = await r.json();
    return d.content?.[0]?.text?.trim().toUpperCase() === "DOGRU";
  } catch { return false; }
}

// ══════════════════════════════════════════════════════════
// AI: MNEMONIC — stable per item (cached in module scope)
// ══════════════════════════════════════════════════════════
const mnemoCache = {};

async function getMnemonic(item) {
  const key = item.id + "_" + item.mnemoType;
  if (mnemoCache[key]) return mnemoCache[key];

  // Use pre-baked stories first (instant, no API needed)
  const prebaked = MNEMONIC_DB[item.char];
  if (prebaked) {
    mnemoCache[key] = prebaked;
    return prebaked;
  }

  try {
    const isKanji = item.kind === "kanji";
    const sys = isKanji
      ? `Sen Japonca kanji hafıza hikayeleri üretiyorsun. Hikaye MUTLAKA kanjinin görsel şekline / çizgilerine / radikal parçalarına dayansın. Türkçe, 2-3 cümle, görsel ve absürt olsun. Sadece hikayeyi yaz.`
      : `Sen Japonca kelime hafıza hikayeleri üretiyorsun. Hikaye kelimenin OKUNUŞUNA dayansın — Türkçede benzer ses çıkaran kelimeler bul. Türkçe, 2-3 cümle, eğlenceli ve absürt olsun. Sadece hikayeyi yaz.`;

    const msg = isKanji
      ? `Kanji: ${item.char}\nAnlamı: ${item.tr}\nKun-yomi: ${item.read}\n\nBu kanjinin görsel şekline bakarak hafıza hikayesi yaz.`
      : `Kelime: ${item.char} (okunuşu: ${item.read})\nAnlamı: ${item.tr}\n\nBu kelimenin okunuşunu Türkçe seslerle ilişkilendirerek hafıza hikayesi yaz.`;

    const r = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST", headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},
      body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:220, system:sys, messages:[{role:"user",content:msg}] })
    });
    const d = await r.json();
    const result = d.content?.[0]?.text?.trim() || null;
    if (result) mnemoCache[key] = result;
    return result;
  } catch { return null; }
}

// ══════════════════════════════════════════════════════════
// BUILD QUESTIONS
// ══════════════════════════════════════════════════════════
function makeWordQ(w, dir) {
  const pureKana = !hasKanji(w.char);
  const jpToTr = pureKana ? true : (dir === "jp_to_tr" || (dir === "mixed" && Math.random() > 0.5));
  return {
    uid: w.id+(jpToTr?"_m":"_r"),
    id: w.id, kind:"vocab",
    typeColor:C.vocab, typeLabel:"単語", subLabel:w.sub,
    char:w.char, tr:w.tr, read:w.read, ex:w.ex,
    showFurigana: jpToTr,
    promptLabel: jpToTr?"Anlam":"Okuyuş",
    promptLine: jpToTr?"Türkçe anlamı nedir?":"Furiganayı hiragana ile yaz:",
    answer: jpToTr ? w.tr : w.read,
    isJpAnswer: !jpToTr, isKun: false,
    mnemoType: "vocab",
    extraRows: jpToTr
      ? [{label:"Okuyuş",val:w.read,jp:true}]
      : [{label:"Anlam",val:w.tr,jp:false}],
  };
}

function makeKanjiQ(k, mode) {
  const doMeaning = mode==="meaning"||(mode==="both"&&Math.random()>0.5);
  return {
    uid: k.id+(doMeaning?"_m":"_k"),
    id: k.id, kind:"kanji",
    typeColor:C.kanji, typeLabel:"漢字", subLabel:`Ders ${k.lesson}`,
    char:k.k, tr:k.tr, read:k.kun, ex:k.ex,
    showFurigana: false,
    promptLabel: doMeaning?"Anlam":"Kun-yomi",
    promptLine: doMeaning?"Türkçe anlamı nedir?":"Kun-yomi'yi hiragana ile yaz:",
    answer: doMeaning ? k.tr : k.kun,
    isJpAnswer: !doMeaning, isKun: !doMeaning,
    mnemoType: doMeaning?"meaning":"reading",
    extraRows: doMeaning
      ? [{label:"Kun-yomi",val:k.kun,jp:true},{label:"On-yomi",val:k.on,jp:true}]
      : [{label:"Anlam",val:k.tr,jp:false},{label:"On-yomi",val:k.on,jp:true}],
    example: k.ex,
  };
}

function makeKanjiWordQ(w) {
  const jpToTr = Math.random() > 0.5;
  return {
    uid: w.id+(jpToTr?"_m":"_r"),
    id: w.id, kind:"kanjiword",
    typeColor:"#c0392b", typeLabel:"漢字語", subLabel:`Ders ${w.lesson}`,
    char:w.word, tr:w.tr, read:w.read, ex:null,
    showFurigana: jpToTr,
    promptLabel: jpToTr?"Anlam":"Okuyuş",
    promptLine: jpToTr?"Türkçe anlamı nedir?":"Hiragana ile yaz:",
    answer: jpToTr ? w.tr : w.read,
    isJpAnswer: !jpToTr, isKun: false,
    mnemoType: "vocab",
    extraRows: jpToTr
      ? [{label:"Okuyuş",val:w.read,jp:true}]
      : [{label:"Anlam",val:w.tr,jp:false}],
  };
}

function buildBatch(cfg) {
  const qs=[];
  if (cfg.mode==="vocab"||cfg.mode==="mixed") {
    const pool=cfg.wordType==="all"?WORDS:WORDS.filter(w=>w.sub===cfg.wordType);
    const n=cfg.mode==="mixed"?6:15;
    shuffle(pool).slice(0,n).forEach(w=>qs.push(makeWordQ(w,cfg.wordDir)));
  }
  if (cfg.mode==="kanji"||cfg.mode==="mixed") {
    const pool=cfg.kanjiLesson==="all"?KANJI:KANJI.filter(k=>k.lesson===cfg.kanjiLesson);
    const n=cfg.mode==="mixed"?5:8;
    shuffle(pool).slice(0,n).forEach(k=>qs.push(makeKanjiQ(k,cfg.kanjiMode)));
    // Also add kanji compound words from the same lesson(s)
    const kwPool=cfg.kanjiLesson==="all"?KANJI_WORDS:KANJI_WORDS.filter(k=>k.lesson===cfg.kanjiLesson);
    const nkw=cfg.mode==="mixed"?4:7;
    shuffle(kwPool).slice(0,nkw).forEach(w=>qs.push(makeKanjiWordQ(w)));
  }
  return shuffle(qs);
}
// Unique items in batch (for lesson preview)
function batchItems(qs) {
  const seen=new Set(); const items=[];
  for(const q of qs){
    if(!seen.has(q.id)){seen.add(q.id);items.push(q);}
  }
  return items;
}

// ══════════════════════════════════════════════════════════
// SETTINGS PAGE
// ══════════════════════════════════════════════════════════
function SettingsPage({onStart}){
  const [mode,setMode]=useState("vocab");
  const [wordType,setWT]=useState("all");
  const [wordDir,setWD]=useState("jp_to_tr");
  const [kanjiL,setKL]=useState("all");
  const [kanjiMode,setKM]=useState("both");
  const [skipPreview,setSkip]=useState(false);

  const modeColor=mode==="kanji"?C.kanji:mode==="vocab"?C.vocab:C.mixed;
  const lessons=["all",...Array.from(new Set(KANJI.map(k=>k.lesson))).sort((a,b)=>a-b)];

  const Btn=({val,cur,set,color,children})=>(
    <button onClick={()=>set(val)} style={{
      padding:"8px 14px",borderRadius:4,cursor:"pointer",
      border:cur===val?`2px solid ${color}`:`2px solid ${C.border}`,
      background:cur===val?color:"#fff",
      color:cur===val?"#fff":C.textMid,
      fontSize:13,fontWeight:cur===val?700:400,
      fontFamily:"'Noto Sans JP',sans-serif",transition:"all .15s",
    }}>{children}</button>
  );
  const Sec=({title,children})=>(
    <div style={{marginBottom:18}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.textDim,marginBottom:8,textTransform:"uppercase"}}>{title}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{children}</div>
    </div>
  );

  return (
    <div style={{maxWidth:560,width:"100%",margin:"0 auto",paddingTop:32}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:11,color:C.textDim,letterSpacing:4,marginBottom:6}}>MINNA NO NIHONGO</div>
        <div style={{fontSize:40,fontFamily:"'Noto Serif JP',serif",fontWeight:700,color:C.text}}>日本語 SRS</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
        {[{val:"vocab",color:C.vocab,icon:"単語",sub:"Kelime",cnt:`${WORDS.length} kelime`},
          {val:"kanji",color:C.kanji,icon:"漢字",sub:"Kanji",cnt:`${KANJI.length} kanji + ${KANJI_WORDS.length} kelime`},
          {val:"mixed",color:C.mixed,icon:"混合",sub:"Karışık",cnt:"ikisi birden"}
        ].map(({val,color,icon,sub,cnt})=>(
          <div key={val} onClick={()=>setMode(val)} style={{
            background:mode===val?color:"#fff", border:`2px solid ${mode===val?color:C.border}`,
            borderRadius:8,padding:"16px 10px",textAlign:"center",cursor:"pointer",
            transition:"all .15s",boxShadow:mode===val?`0 4px 14px ${color}44`:"none",
          }}>
            <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:26,color:mode===val?"#fff":color,fontWeight:700,marginBottom:4}}>{icon}</div>
            <div style={{fontSize:13,fontWeight:700,color:mode===val?"#fff":C.text}}>{sub}</div>
            <div style={{fontSize:11,color:mode===val?"rgba(255,255,255,.7)":C.textDim,marginTop:2}}>{cnt}</div>
          </div>
        ))}
      </div>

      {(mode==="vocab"||mode==="mixed")&&(
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderTop:`4px solid ${C.vocab}`,borderRadius:8,padding:"18px 18px 10px",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.vocab,marginBottom:14,letterSpacing:1}}>単語 AYARLARI</div>
          <Sec title="Soru Yönü">
            <Btn val="jp_to_tr" cur={wordDir} set={setWD} color={C.vocab}>JP → TR (anlam)</Btn>
            <Btn val="tr_to_jp" cur={wordDir} set={setWD} color={C.vocab}>TR → JP (okuyuş)</Btn>
            <Btn val="mixed" cur={wordDir} set={setWD} color={C.vocab}>Karışık</Btn>
          </Sec>
          <Sec title="Kelime Türü">
            {["all","Fiil","い-Sıfat","な-Sıfat","İsim"].map(s=>{
              const cnt=s==="all"?WORDS.length:WORDS.filter(w=>w.sub===s).length;
              return <Btn key={s} val={s} cur={wordType} set={setWT} color={C.vocab}>{s==="all"?"Tümü":s} ({cnt})</Btn>;
            })}
          </Sec>
        </div>
      )}

      {(mode==="kanji"||mode==="mixed")&&(
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderTop:`4px solid ${C.kanji}`,borderRadius:8,padding:"18px 18px 10px",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.kanji,marginBottom:14,letterSpacing:1}}>漢字 AYARLARI · <span style={{color:"#c0392b"}}>{KANJI_WORDS.length} bileşik kelime dahil</span></div>
          <Sec title="Soru Türü">
            <Btn val="both" cur={kanjiMode} set={setKM} color={C.kanji}>Anlam + Kun-yomi</Btn>
            <Btn val="meaning" cur={kanjiMode} set={setKM} color={C.kanji}>Sadece Anlam</Btn>
            <Btn val="reading" cur={kanjiMode} set={setKM} color={C.kanji}>Sadece Kun-yomi</Btn>
          </Sec>
          <Sec title="Ders">
            {lessons.map(l=>{
              const cnt=l==="all"?KANJI.length:KANJI.filter(k=>k.lesson===l).length;
              return <Btn key={l} val={l} cur={kanjiL} set={setKL} color={C.kanji}>{l==="all"?`Tümü (${cnt})`:`Ders ${l} (${cnt})`}</Btn>;
            })}
          </Sec>
        </div>
      )}

      {/* Skip preview toggle */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"10px 14px",background:"#fff",border:`1px solid ${C.border}`,borderRadius:8}}>
        <input type="checkbox" id="skip" checked={skipPreview} onChange={e=>setSkip(e.target.checked)}
          style={{width:16,height:16,cursor:"pointer"}}/>
        <label htmlFor="skip" style={{fontSize:13,color:C.textMid,cursor:"pointer"}}>
          Ders önizlemesini atla — direkt quiz'e başla
        </label>
      </div>

      <button onClick={()=>onStart({mode,wordType,wordDir,kanjiLesson:kanjiL,kanjiMode,skipPreview})} style={{
        width:"100%",padding:"16px 0",
        background:modeColor,border:"none",borderRadius:8,
        color:"#fff",fontSize:16,fontWeight:700,letterSpacing:2,
        fontFamily:"'Noto Sans JP',sans-serif",cursor:"pointer",
        boxShadow:`0 4px 18px ${modeColor}55`,transition:"filter .15s",
      }}
        onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.1)"}
        onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}
      >勉強を始める</button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// LESSON PREVIEW PAGE
// ══════════════════════════════════════════════════════════
function LessonPreview({queue, cfg, onStartQuiz, onBack}) {
  const items = batchItems(queue);
  const [mnemos, setMnemos] = useState({});
  const [loading, setLoading] = useState({});
  const modeColor = cfg.mode==="kanji"?C.kanji:cfg.mode==="vocab"?C.vocab:C.mixed;

  const loadMnemonic = useCallback(async (item) => {
    const key = item.id+"_"+item.mnemoType;
    if (mnemos[key] || loading[key]) return;
    setLoading(l=>({...l,[key]:true}));
    const m = await getMnemonic(item);
    setMnemos(prev=>({...prev,[key]:m}));
    setLoading(l=>({...l,[key]:false}));
  }, [mnemos, loading]);

  return (
    <div style={{maxWidth:600,width:"100%",margin:"0 auto",padding:"0 0 48px"}}>
      {/* Header */}
      <div style={{background:modeColor,padding:"24px 20px",textAlign:"center",color:"#fff"}}>
        <div style={{fontSize:12,letterSpacing:3,opacity:.75,marginBottom:6}}>BU OTURUMDA</div>
        <div style={{fontSize:26,fontFamily:"'Noto Serif JP',serif",fontWeight:700}}>{items.length} öğe</div>
        <div style={{fontSize:12,opacity:.7,marginTop:4}}>Önce tanı, sonra quiz!</div>
      </div>

      <div style={{padding:"20px 16px"}}>
        {items.map(item=>{
          const mKey = item.id+"_"+item.mnemoType;
          const mnemonic = mnemos[mKey];
          const isLoading = loading[mKey];
          const typeColor = item.kind==="kanji"?C.kanji:C.vocab;

          return (
            <div key={item.id} style={{
              background:"#fff",border:`1px solid ${C.border}`,
              borderLeft:`4px solid ${typeColor}`,
              borderRadius:8,marginBottom:14,overflow:"hidden",
            }}>
              {/* Top section */}
              <div style={{display:"flex",alignItems:"center",gap:16,padding:"16px 18px"}}>
                {/* Big character */}
                <div style={{
                  minWidth:72,height:72,background:typeColor,borderRadius:8,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:item.char.length>3?24:item.char.length>1?32:44,
                  fontFamily:"'Noto Serif JP',serif",color:"#fff",fontWeight:700,
                  flexShrink:0,
                }}>{item.char}</div>

                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <span style={{fontSize:10,fontWeight:700,color:typeColor,letterSpacing:1}}>{item.typeLabel}</span>
                    <span style={{fontSize:11,color:C.textDim}}>{item.subLabel}</span>
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:2}}>{item.tr}</div>
                  <div style={{fontSize:13,fontFamily:"'Noto Serif JP',serif",color:C.textMid}}>{item.read}</div>
                  {item.kind==="kanji"&&(
                    <div style={{fontSize:11,color:C.textDim,marginTop:2}}>On: {item.extraRows?.find(r=>r.label==="On-yomi")?.val}</div>
                  )}
                </div>

                {/* Load mnemonic button */}
                {!mnemonic&&!isLoading&&(
                  <button onClick={()=>loadMnemonic(item)} style={{
                    flexShrink:0,padding:"6px 12px",background:"#fffdf0",
                    border:"1px solid #f0e68c",borderRadius:6,cursor:"pointer",
                    fontSize:11,color:"#b8860b",fontFamily:"'Noto Sans JP',sans-serif",
                  }}>💡 Hikaye</button>
                )}
                {isLoading&&<div style={{fontSize:11,color:"#b8860b",flexShrink:0}}>⏳</div>}
              </div>

              {/* Example sentence */}
              {(item.ex||item.example)&&(
                <div style={{padding:"8px 18px",background:"#fafafa",borderTop:`1px solid ${C.border}`,fontSize:12,fontFamily:"'Noto Serif JP',serif",color:C.textMid,lineHeight:1.8}}>
                  📝 {item.ex||item.example}
                </div>
              )}

              {/* Mnemonic */}
              {mnemonic&&(
                <div style={{padding:"10px 18px",background:"#fffdf0",borderTop:"1px solid #f0e68c",fontSize:12,color:"#555",lineHeight:1.7}}>
                  💡 {mnemonic}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{display:"flex",gap:10,padding:"0 16px"}}>
        <button onClick={onBack} style={{padding:"13px 20px",background:"#fff",border:`2px solid ${C.border}`,borderRadius:6,color:C.textMid,fontSize:14,fontWeight:700,cursor:"pointer"}}>← Geri</button>
        <button onClick={onStartQuiz} style={{
          flex:1,padding:"15px 0",background:modeColor,border:"none",borderRadius:8,
          color:"#fff",fontSize:16,fontWeight:700,letterSpacing:2,
          fontFamily:"'Noto Sans JP',sans-serif",cursor:"pointer",
          boxShadow:`0 4px 18px ${modeColor}44`,
        }}>Quiz'i Başlat →</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// QUIZ PAGE
// ══════════════════════════════════════════════════════════
function QuizPage({queue:initialQueue, onDone, onBack}) {
  const [queue,setQueue]   = useState(initialQueue);
  const [qi,setQi]         = useState(0);
  const [ans,setAns]       = useState("");
  const [checking,setChk]  = useState(false);
  const [submitted,setSub] = useState(false);
  const [correct,setOk]    = useState(null);
  const [done,setDone]     = useState(0);
  const [stats,setStats]   = useState({c:0,w:0});
  const [mnemonic,setMnem] = useState(null);
  const [mnemoLoading,setML]= useState(false);
  const [history,setHistory] = useState([]); // [{q, ans, correct}]
  const [showHistory,setShowHist] = useState(false);
  const inputRef = useRef(null);

  const q=queue[qi];
  const TOTAL=Math.min(initialQueue.length,20);

  useEffect(()=>{ if(!submitted&&!checking) inputRef.current?.focus(); },[qi,submitted,checking]);

  const submit=async()=>{
    if(!q||submitted||checking||!ans.trim())return;
    setChk(true);
    const ok=await checkAnswer(ans,q.answer,q.char,q.isJpAnswer,q.isKun);
    setOk(ok);setSub(true);setChk(false);setMnem(null);
    setHistory(h=>[...h, {q, userAns:ans, correct:ok}]);
    if(ok){setDone(d=>d+1);setStats(s=>({...s,c:s.c+1}));}
    else{
      setStats(s=>({...s,w:s.w+1}));
      setQueue(bq=>{
        const rem=bq.slice(qi+1);
        const at=1+Math.floor(Math.random()*Math.max(1,rem.length));
        const nr=[...rem];nr.splice(at,0,{...q,uid:q.uid+"x"});
        return [...bq.slice(0,qi+1),...nr];
      });
      // Load mnemonic — for BOTH meaning and reading questions (kanji & vocab)
      setML(true);
      getMnemonic(q).then(m=>{setMnem(m);setML(false);});
    }
  };

  const next=()=>{
    if(done+(correct?1:0)>=TOTAL||qi+1>=queue.length){onDone(stats,TOTAL);return;}
    setQi(i=>i+1);setAns("");setSub(false);setOk(null);setMnem(null);
  };

  useEffect(()=>{if(done>=TOTAL)onDone(stats,TOTAL);},[done]);

  if(!q)return null;

  const headerBg=checking?"#777":submitted?(correct?C.correct:C.wrong):q.typeColor;
  const pct=TOTAL>0?(done/TOTAL)*100:0;

  return(
    <div style={{width:"100%",maxWidth:640,margin:"0 auto"}}>
      {/* Nav */}
      <div style={{background:C.navBg,padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:44}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"#ccc",fontSize:18,cursor:"pointer"}}>⌂</button>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <span style={{color:"#aaa",fontSize:13}}>{Math.round(stats.c/Math.max(1,stats.c+stats.w)*100)}%</span>
          <span style={{color:"#aaa",fontSize:13}}>✓ {stats.c}</span>
          <span style={{color:"#aaa",fontSize:13}}>□ {TOTAL-done}</span>
          {history.length>0&&(
            <button onClick={()=>setShowHist(h=>!h)} style={{
              background:"none",border:"1px solid #555",borderRadius:4,
              color:"#aaa",fontSize:11,cursor:"pointer",padding:"3px 8px",
            }}>↩ geçmiş</button>
          )}
        </div>
      </div>

      {/* History Panel */}
      {showHistory&&history.length>0&&(
        <div style={{background:"#2a2a2a",borderBottom:"2px solid #444",maxHeight:260,overflowY:"auto"}}>
          <div style={{padding:"8px 16px",fontSize:10,letterSpacing:2,color:"#666",borderBottom:"1px solid #333"}}>GEÇMİŞ SORULAR</div>
          {[...history].reverse().map((h,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 16px",borderBottom:"1px solid #222"}}>
              <span style={{fontSize:18,fontFamily:"'Noto Serif JP',serif",color:h.correct?"#2ecc71":"#e74c3c",minWidth:40,textAlign:"center"}}>{h.q.char}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:"#888",fontFamily:"'Noto Serif JP',serif"}}>{h.q.read}</div>
                <div style={{fontSize:12,color:"#aaa"}}>{h.q.tr}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:11,color:h.correct?"#2ecc71":"#e74c3c"}}>{h.correct?"✓":"✗"}</div>
                <div style={{fontSize:11,color:"#666"}}>{h.userAns}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress */}
      <div style={{height:6,background:"#ddd"}}>
        <div style={{height:"100%",width:`${pct}%`,background:C.correct,transition:"width .4s ease"}}/>
      </div>

      {/* Header */}
      <div style={{background:headerBg,padding:"36px 24px 28px",textAlign:"center",transition:"background .25s",minHeight:260,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{marginBottom:14,display:"flex",gap:8,justifyContent:"center",alignItems:"center"}}>
          <span style={{background:"rgba(0,0,0,.2)",color:"#fff",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:3,fontFamily:"'Noto Serif JP',serif"}}>{q.typeLabel}</span>
          <span style={{color:"rgba(255,255,255,.75)",fontSize:12}}>{q.subLabel}</span>
        </div>

        <div style={{fontSize:q.char.length>5?52:q.char.length>3?68:92,fontFamily:"'Noto Serif JP',serif",fontWeight:700,color:"#fff",lineHeight:1.1}}>
          {q.char}
        </div>

        {q.showFurigana&&(
          <div style={{fontSize:20,fontFamily:"'Noto Serif JP',serif",color:"rgba(255,255,255,.75)",marginTop:8,letterSpacing:3}}>{q.read}</div>
        )}

        <div style={{marginTop:18,fontSize:14,color:"rgba(255,255,255,.7)",letterSpacing:.5}}>
          {q.typeLabel} <strong style={{color:"#fff"}}>{q.promptLabel}</strong>
          <div style={{fontSize:12,marginTop:4,color:"rgba(255,255,255,.55)"}}>{q.promptLine}</div>
        </div>
      </div>

      {/* Input */}
      <div style={{background:"#f9f9f9"}}>
        <div style={{display:"flex",borderBottom:`3px solid ${submitted?(correct?C.correct:C.wrong):"#ccc"}`,transition:"border-color .2s"}}>
          <input ref={inputRef} type="text" value={ans}
            onChange={e=>setAns(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter")submitted?next():submit();}}
            placeholder={q.isJpAnswer?"hiragana ile yaz...":"türkçe yaz..."}
            disabled={submitted||checking}
            style={{
              flex:1,padding:"20px 24px",
              background:checking?"#f0f0f0":submitted?(correct?"#eafaf1":"#fdf0f0"):"#fff",
              border:"none",outline:"none",fontSize:22,color:C.text,
              fontFamily:q.isJpAnswer?"'Noto Serif JP',serif":"inherit",
              transition:"background .25s",
            }}
          />
          <button onClick={submitted?next:submit} disabled={checking} style={{
            padding:"0 28px",minWidth:120,
            background:checking?"#999":submitted?(correct?C.correct:C.wrong):"#555",
            border:"none",color:"#fff",fontSize:13,fontWeight:700,letterSpacing:1,
            fontFamily:"'Noto Sans JP',sans-serif",cursor:checking?"default":"pointer",
            transition:"background .2s",
          }}>
            {checking?"kontrol...":submitted?"SONRAKI ›":"KONTROL"}
          </button>
        </div>

        {/* Feedback */}
        {submitted&&(
          <div style={{padding:"16px 24px",background:correct?"#f0faf4":"#fdf3f3",borderBottom:`1px solid ${C.border}`}}>
            <div style={{marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
              <span style={{color:correct?C.correct:C.wrong,fontSize:17,fontWeight:700}}>
                {correct?"✓ Doğru!":"✗ Yanlış"}
              </span>
              {!correct&&(
                <span style={{color:C.text,fontSize:15,fontFamily:"'Noto Serif JP',serif"}}>
                  → <strong style={{color:C.kanji}}>{q.answer}</strong>
                </span>
              )}
            </div>

            <div style={{display:"flex",gap:24,flexWrap:"wrap",marginBottom:8}}>
              {q.extraRows?.map(({label,val,jp})=>(
                <div key={label} style={{fontSize:13}}>
                  <span style={{color:C.textDim,marginRight:4}}>{label}:</span>
                  <span style={{color:C.text,fontFamily:jp?"'Noto Serif JP',serif":"inherit"}}>{val}</span>
                </div>
              ))}
            </div>

            {/* Example sentence */}
            {(q.ex||q.example)&&(
              <div style={{marginBottom:8,padding:"8px 12px",background:"#fff",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,fontFamily:"'Noto Serif JP',serif",color:C.textMid,lineHeight:1.9}}>
                📝 {q.ex||q.example}
              </div>
            )}

            {/* Mnemonic — always shown on wrong, for BOTH kanji and vocab */}
            {!correct&&(
              <div style={{padding:"10px 12px",background:"#fffdf0",border:"1px solid #f0e68c",borderRadius:6}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"#b8860b",marginBottom:5}}>💡 HAFIZA HİKAYESİ</div>
                {mnemoLoading?(
                  <div style={{fontSize:12,color:"#b8860b",opacity:.7}}>oluşturuluyor...</div>
                ):mnemonic?(
                  <div style={{fontSize:13,color:"#555",lineHeight:1.7}}>{mnemonic}</div>
                ):null}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SUMMARY
// ══════════════════════════════════════════════════════════
function SummaryPage({stats,total,onRetry,onHome}){
  const acc=total>0?Math.round(stats.c/total*100):0;
  return(
    <div style={{maxWidth:480,width:"100%",margin:"0 auto",paddingTop:48,textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:16}}>{acc>=90?"🌸":acc>=70?"🌿":acc>=50?"🌱":"💪"}</div>
      <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:26,color:C.text,marginBottom:4}}>お疲れ様でした</div>
      <div style={{color:C.textDim,fontSize:11,letterSpacing:4,marginBottom:36}}>OTURUM TAMAMLANDI</div>
      <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:36}}>
        {[{l:"DOĞRU",v:stats.c,c:C.correct},{l:"YANLIŞ",v:stats.w,c:C.wrong},{l:"BAŞARI",v:acc+"%",c:C.mixed}].map(({l,v,c})=>(
          <div key={l} style={{background:"#fff",border:`1px solid ${C.border}`,borderTop:`4px solid ${c}`,borderRadius:8,padding:"18px 24px",minWidth:90}}>
            <div style={{color:c,fontSize:30,fontWeight:700}}>{v}</div>
            <div style={{color:C.textDim,fontSize:10,letterSpacing:2,marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <button onClick={onRetry} style={{padding:"13px 32px",background:C.vocab,border:"none",borderRadius:6,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>Tekrar</button>
        <button onClick={onHome} style={{padding:"13px 32px",background:"#fff",border:`2px solid ${C.border}`,borderRadius:6,color:C.textMid,fontSize:14,fontWeight:700,cursor:"pointer"}}>Ana Sayfa</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════
export default function App(){
  const [screen,setScreen]=useState("home"); // home | preview | quiz | summary
  const [cfg,setCfg]=useState(null);
  const [queue,setQueue]=useState(null);
  const [lastStats,setStats]=useState(null);
  const [lastTotal,setTotal]=useState(0);

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap');
    @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:${C.pageBg};color:${C.text};}
    input::placeholder{color:#bbb;}
    ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#ccc;border-radius:2px;}
  `;

  const handleStart=(c)=>{
    const q=buildBatch(c);
    setCfg(c);setQueue(q);
    if(c.skipPreview){setScreen("quiz");}
    else{setScreen("preview");}
  };

  return(
    <div style={{minHeight:"100vh",background:C.pageBg}}>
      <style>{css}</style>
      <div style={{animation:"fadeIn .35s ease"}}>
        {screen==="home"&&<div style={{padding:"0 16px 48px"}}><SettingsPage onStart={handleStart}/></div>}
        {screen==="preview"&&queue&&<LessonPreview
          queue={queue} cfg={cfg}
          onStartQuiz={()=>setScreen("quiz")}
          onBack={()=>setScreen("home")}
        />}
        {screen==="quiz"&&queue&&<QuizPage
          queue={queue}
          onDone={(s,t)=>{setStats(s);setTotal(t);setScreen("summary");}}
          onBack={()=>setScreen("home")}
        />}
        {screen==="summary"&&<div style={{padding:"0 16px 48px"}}><SummaryPage
          stats={lastStats} total={lastTotal}
          onRetry={()=>{const q=buildBatch(cfg);setQueue(q);setScreen(cfg.skipPreview?"quiz":"preview");}}
          onHome={()=>setScreen("home")}
        /></div>}
      </div>
    </div>
  );
}
