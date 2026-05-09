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
  {id:"w150",sub:"İsim",char:"おくさん",tr:"hanım / eş (başkasının)",read:"おくさん",ex:"おくさんはどちらですか？ — Hanımınız nerede?"},
  {id:"w151",sub:"İsim",char:"さんぽ",tr:"yürüyüş / gezinti",read:"さんぽ",ex:"犬とさんぽします。 — Köpekle yürüyüşe çıkıyorum."},
  {id:"w152",sub:"İsim",char:"学校",tr:"okul",read:"がっこう",ex:"学校にいきます。 — Okula gidiyorum."},
  {id:"w153",sub:"Fiil",char:"迎える",tr:"karşılamak",read:"むかえる",ex:"駅で迎えます。 — İstasyonda karşılıyorum."},
  {id:"w154",sub:"İsim",char:"りょしん",tr:"ebeveynler / anne baba",read:"りょしん",ex:"りょしんがいます。 — Ebeveynlerim var."},
  {id:"w155",sub:"İsim",char:"しゅうまつ",tr:"hafta sonu",read:"しゅうまつ",ex:"しゅうまつはひまです。 — Hafta sonu boşum."},
  {id:"w156",sub:"İsim",char:"かぞく",tr:"aile",read:"かぞく",ex:"かぞくがすきです。 — Ailemi seviyorum."},
  {id:"w157",sub:"い-Sıfat",char:"遠い",tr:"uzak",read:"とおい",ex:"えきがとおいです。 — İstasyon uzak."},
  {id:"w158",sub:"İsim",char:"つかれ",tr:"yorgunluk",read:"つかれ",ex:"つかれがとれました。 — Yorgunluğum geçti."},
  {id:"w159",sub:"İsim",char:"いっしょに",tr:"birlikte",read:"いっしょに",ex:"いっしょにいきましょう。 — Birlikte gidelim."},
  {id:"w160",sub:"İsim",char:"お正月",tr:"Yeni Yıl / Ocak ayı",read:"おしょうがつ",ex:"お正月にパーティーをしましょう。 — Yeni Yıl'da parti yapalım."},
  {id:"w161",sub:"İsim",char:"田舎",tr:"kırsal / taşra",read:"いなか",ex:"田舎の生活は静かです。 — Taşra hayatı sakindir."},
  {id:"w162",sub:"İsim",char:"パーティー",tr:"parti",read:"ぱーてぃー",ex:"パーティーをしましょう。 — Parti yapalım."},
  {id:"w163",sub:"な-Sıfat",char:"大変",tr:"zor / büyük sorun",read:"たいへん",ex:"町の生活は大変ですね。 — Şehir hayatı zor."},
  {id:"w164",sub:"İsim",char:"写真家",tr:"fotoğrafçı",read:"しゃしんか",ex:"わたしは写真家です。 — Ben fotoğrafçıyım."},
  {id:"w165",sub:"İsim",char:"畳",tr:"tatami (Japon hasır döşeme)",read:"たたみ",ex:"畳の部屋が好きです。 — Tatami odayı seviyorum."},
  {id:"w166",sub:"İsim",char:"こたつ",tr:"kotatsu (ısıtmalı masa)",read:"こたつ",ex:"こたつで温まります。 — Kotatsu'da ısınıyorum."},
  {id:"w167",sub:"İsim",char:"妻",tr:"eşim / karım",read:"つま",ex:"妻はいつも元気です。 — Eşim her zaman enerjik."},
  {id:"w168",sub:"İsim",char:"冬",tr:"kış",read:"ふゆ",ex:"冬の山はきれいです。 — Kış dağı güzeldir."},
  {id:"w169",sub:"İsim",char:"美術館",tr:"sanat müzesi",read:"びじゅつかん",ex:"美術館へ行きました。 — Sanat müzesine gittim."},
  {id:"w170",sub:"İsim",char:"真ん中",tr:"tam orta",read:"まんなか",ex:"絵の真ん中に町があります。 — Resmin tam ortasında kasaba var."},
  {id:"w171",sub:"İsim",char:"雲",tr:"bulut",read:"くも",ex:"山の上に白い雲があります。 — Dağın üstünde beyaz bulut var."},
  {id:"w172",sub:"İsim",char:"左",tr:"sol",read:"ひだり",ex:"左にあります。 — Solda var."},
  {id:"w173",sub:"İsim",char:"右",tr:"sağ",read:"みぎ",ex:"右にあります。 — Sağda var."},
  {id:"w174",sub:"İsim",char:"近く",tr:"yakın / yakınında",read:"ちかく",ex:"駅の近くにいます。 — İstasyonun yakınındayım."},
  {id:"w175",sub:"İsim",char:"ナイフ",tr:"bıçak",read:"ないふ",ex:"テーブルの上にナイフがあります。 — Masanın üstünde bıçak var."},
  {id:"w176",sub:"İsim",char:"ワイン",tr:"şarap",read:"わいん",ex:"ワインを飲みます。 — Şarap içiyorum."},
  {id:"w177",sub:"İsim",char:"ピアノ",tr:"piyano",read:"ぴあの",ex:"ピアノをひきます。 — Piyano çalıyorum."},
  {id:"w178",sub:"İsim",char:"お祭り",tr:"festival / şenlik",read:"おまつり",ex:"夏のお祭りはとても有名です。 — Yaz festivali çok ünlüdür."},
  {id:"w179",sub:"İsim",char:"ホームステイ",tr:"ev pansiyonu / homestay",read:"ほーむすてい",ex:"ホームステイをしました。 — Homestay yaptım."},
  {id:"w180",sub:"İsim",char:"神社",tr:"Shinto tapınağı",read:"じんじゃ",ex:"神社へ行きました。 — Tapınağa gittim."},
  {id:"w181",sub:"İsim",char:"ゲーム",tr:"oyun",read:"げーむ",ex:"ゲームをしました。 — Oyun oynadım."},
  {id:"w182",sub:"İsim",char:"おもちゃ",tr:"oyuncak",read:"おもちゃ",ex:"おもちゃの車をもらいました。 — Oyuncak araba aldım."},
  {id:"w183",sub:"İsim",char:"たこ焼き",tr:"takoyaki (ahtapot topları)",read:"たこやき",ex:"たこ焼きを食べました。 — Takoyaki yedim."},
  {id:"w184",sub:"İsim",char:"お好み焼き",tr:"okonomiyaki (Japon pizzası)",read:"おこのみやき",ex:"お好み焼きを食べました。 — Okonomiyaki yedim."},
  {id:"w185",sub:"İsim",char:"おみこし",tr:"omikoshi (taşınan tapınak sandığı)",read:"おみこし",ex:"おみこしを見ました。 — Omikoshi gördüm."},
  {id:"w186",sub:"İsim",char:"踊り",tr:"dans / halk dansı",read:"おどり",ex:"お祭りの踊りを見ました。 — Festival dansını izledim."},
  {id:"w187",sub:"İsim",char:"舞台",tr:"sahne",read:"ぶたい",ex:"舞台の上に女の人がいます。 — Sahnede bir kadın var."},
  {id:"w188",sub:"い-Sıfat",char:"かわいい",tr:"sevimli / şirin",read:"かわいい",ex:"かわいい猫ですね。 — Sevimli bir kedi."},
  {id:"w189",sub:"İsim",char:"回",tr:"kez / defa (sayaç)",read:"かい",ex:"3回しました。 — 3 kez yaptım."},
  {id:"w190",sub:"İsim",char:"枚",tr:"sayaç (ince/düz şeyler için)",read:"まい",ex:"2枚ください。 — 2 tane (ince şey) lütfen."},
  {id:"w191",sub:"İsim",char:"台",tr:"sayaç (araç/makine için)",read:"だい",ex:"車を2台もらいました。 — 2 araba aldım."}
]
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
  {id:"kw70",word:"森林",read:"しんりん",tr:"ormanlar",lesson:5},
  {id:"kw71",word:"時間",read:"じかん",tr:"zaman",lesson:5},
  {id:"kw72",word:"一年間",read:"いちねんかん",tr:"bir yıl (süre)",lesson:5},
  {id:"kw73",word:"花畑",read:"はなばたけ",tr:"çiçek bahçesi",lesson:5},
  {id:"kw74",word:"目次",read:"もくじ",tr:"içindekiler",lesson:6},
  {id:"kw75",word:"手紙",read:"てがみ",tr:"mektup",lesson:6},
  {id:"kw76",word:"歌手",read:"かしゅ",tr:"şarkıcı",lesson:6},
  {id:"kw77",word:"大雨",read:"おおあめ",tr:"sağanak yağmur",lesson:6},
  {id:"kw78",word:"米国",read:"べいこく",tr:"ABD",lesson:6},
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
  {id:"kw136",word:"一週間",read:"いっしゅうかん",tr:"bir hafta",lesson:10},,
{id:"kw137",word:"毎年",read:"まいとし",tr:"her yıl",lesson:10}
];


const NUMBERS = [

];

const TIMES = [

];

const NUMBERS = [
  {id:"w200",sub:"İsim",char:"１（一）",tr:"1 (bir)",read:"いち",ex:"１円はいちえんです。 — 1 yen, ichidir."},
  {id:"w201",sub:"İsim",char:"２（二）",tr:"2 (iki)",read:"に",ex:"２人はふたりです。 — 2 kişi, futaridir."},
  {id:"w202",sub:"İsim",char:"３（三）",tr:"3 (üç)",read:"さん",ex:"３月はさんがつです。 — 3. ay, Mart'tır."},
  {id:"w203",sub:"İsim",char:"４（四）",tr:"4 (dört)",read:"よん／し",ex:"４時はよじです。 — Saat 4, yojidir."},
  {id:"w204",sub:"İsim",char:"５（五）",tr:"5 (beş)",read:"ご",ex:"５分はごふんです。 — 5 dakika, gofundir."},
  {id:"w205",sub:"İsim",char:"６（六）",tr:"6 (altı)",read:"ろく",ex:"６月はろくがつです。 — 6. ay, Haziran'dır."},
  {id:"w206",sub:"İsim",char:"７（七）",tr:"7 (yedi)",read:"なな／しち",ex:"７時はしちじです。 — Saat 7, shichijidir."},
  {id:"w207",sub:"İsim",char:"８（八）",tr:"8 (sekiz)",read:"はち",ex:"８月ははちがつです。 — 8. ay, Ağustos'tur."},
  {id:"w208",sub:"İsim",char:"９（九）",tr:"9 (dokuz)",read:"きゅう／く",ex:"９時はくじです。 — Saat 9, kujidir."},
  {id:"w209",sub:"İsim",char:"１０（十）",tr:"10 (on)",read:"じゅう",ex:"１０月はじゅうがつです。 — 10. ay, Ekim'dir."},
  {id:"w210",sub:"İsim",char:"１１（十一）",tr:"11 (on bir)",read:"じゅういち",ex:"じゅういちえんです。"},
  {id:"w211",sub:"İsim",char:"１２（十二）",tr:"12 (on iki)",read:"じゅうに",ex:"じゅうにがつはDecemberです。"},
  {id:"w212",sub:"İsim",char:"１３（十三）",tr:"13 (on üç)",read:"じゅうさん",ex:"じゅうさんにんいます。"},
  {id:"w213",sub:"İsim",char:"１４（十四）",tr:"14 (on dört)",read:"じゅうよん／じゅうし",ex:"じゅうよんえんです。"},
  {id:"w214",sub:"İsim",char:"１５（十五）",tr:"15 (on beş)",read:"じゅうご",ex:"じゅうごふんです。"},
  {id:"w215",sub:"İsim",char:"２０（二十）",tr:"20 (yirmi)",read:"にじゅう",ex:"にじゅうえんです。"},
  {id:"w216",sub:"İsim",char:"３０（三十）",tr:"30 (otuz)",read:"さんじゅう",ex:"さんじゅうさいです。"},
  {id:"w217",sub:"İsim",char:"４０（四十）",tr:"40 (kırk)",read:"よんじゅう",ex:"よんじゅうえんです。"},
  {id:"w218",sub:"İsim",char:"５０（五十）",tr:"50 (elli)",read:"ごじゅう",ex:"ごじゅうえんです。"},
  {id:"w219",sub:"İsim",char:"６０（六十）",tr:"60 (altmış)",read:"ろくじゅう",ex:"ろくじゅうえんです。"},
  {id:"w220",sub:"İsim",char:"７０（七十）",tr:"70 (yetmiş)",read:"ななじゅう",ex:"ななじゅうえんです。"},
  {id:"w221",sub:"İsim",char:"８０（八十）",tr:"80 (seksen)",read:"はちじゅう",ex:"はちじゅうえんです。"},
  {id:"w222",sub:"İsim",char:"９０（九十）",tr:"90 (doksan)",read:"きゅうじゅう",ex:"きゅうじゅうえんです。"},
  {id:"w223",sub:"İsim",char:"１００（百）",tr:"100 (yüz)",read:"ひゃく",ex:"ひゃくえんです。 — 100 yen."},
  {id:"w224",sub:"İsim",char:"３００（三百）",tr:"300 (üç yüz)",read:"さんびゃく",ex:"さんびゃくえんです。"},
  {id:"w225",sub:"İsim",char:"６００（六百）",tr:"600 (altı yüz)",read:"ろっぴゃく",ex:"ろっぴゃくえんです。"},
  {id:"w226",sub:"İsim",char:"８００（八百）",tr:"800 (sekiz yüz)",read:"はっぴゃく",ex:"はっぴゃくえんです。"},
  {id:"w227",sub:"İsim",char:"１０００（千）",tr:"1000 (bin)",read:"せん",ex:"せんえんです。 — 1000 yen."},
  {id:"w228",sub:"İsim",char:"３０００（三千）",tr:"3000 (üç bin)",read:"さんぜん",ex:"さんぜんえんです。"},
  {id:"w229",sub:"İsim",char:"８０００（八千）",tr:"8000 (sekiz bin)",read:"はっせん",ex:"はっせんえんです。"},
  {id:"w230",sub:"İsim",char:"１万（一万）",tr:"10.000 (on bin)",read:"いちまん",ex:"いちまんえんです。 — 10.000 yen."},
  {id:"w231",sub:"İsim",char:"あさって",tr:"öbür gün / öbürsü gün",read:"あさって",ex:"あさってきます。 — Öbür gün geliyorum."},
  {id:"w240",sub:"İsim",char:"２００（二百）",tr:"200 (iki yüz)",read:"にひゃく",ex:"にひゃくえんです。"},
  {id:"w241",sub:"İsim",char:"４００（四百）",tr:"400 (dört yüz)",read:"よんひゃく",ex:"よんひゃくえんです。"},
  {id:"w242",sub:"İsim",char:"５００（五百）",tr:"500 (beş yüz)",read:"ごひゃく",ex:"ごひゃくえんです。"},
  {id:"w243",sub:"İsim",char:"７００（七百）",tr:"700 (yedi yüz)",read:"ななひゃく",ex:"ななひゃくえんです。"},
  {id:"w244",sub:"İsim",char:"９００（九百）",tr:"900 (dokuz yüz)",read:"きゅうひゃく",ex:"きゅうひゃくえんです。"},
  {id:"w245",sub:"İsim",char:"２０００（二千）",tr:"2000 (iki bin)",read:"にせん",ex:"にせんえんです。"},
  {id:"w246",sub:"İsim",char:"４０００（四千）",tr:"4000 (dört bin)",read:"よんせん",ex:"よんせんえんです。"},
  {id:"w247",sub:"İsim",char:"５０００（五千）",tr:"5000 (beş bin)",read:"ごせん",ex:"ごせんえんです。"},
  {id:"w248",sub:"İsim",char:"６０００（六千）",tr:"6000 (altı bin)",read:"ろくせん",ex:"ろくせんえんです。"},
  {id:"w249",sub:"İsim",char:"７０００（七千）",tr:"7000 (yedi bin)",read:"ななせん",ex:"ななせんえんです。"},
  {id:"w250",sub:"İsim",char:"９０００（九千）",tr:"9000 (dokuz bin)",read:"きゅうせん",ex:"きゅうせんえんです。"},
  {id:"w251",sub:"İsim",char:"２万（二万）",tr:"20.000 (yirmi bin)",read:"にまん",ex:"にまんえんです。"},
  {id:"w252",sub:"İsim",char:"５万（五万）",tr:"50.000 (elli bin)",read:"ごまん",ex:"ごまんえんです。"},
  {id:"w253",sub:"İsim",char:"１０万（十万）",tr:"100.000 (yüz bin)",read:"じゅうまん",ex:"じゅうまんえんです。"},
  {id:"w254",sub:"İsim",char:"１１（十一）",tr:"11 (on bir)",read:"じゅういち",ex:"じゅういちえんです。"},
  {id:"w255",sub:"İsim",char:"１７（十七）",tr:"17 (on yedi)",read:"じゅうなな／じゅうしち",ex:"じゅうなながつはありません。"},
  {id:"w256",sub:"İsim",char:"１９（十九）",tr:"19 (on dokuz)",read:"じゅうきゅう／じゅうく",ex:"じゅうきゅうさいです。"},
  {id:"w257",sub:"İsim",char:"２１（二十一）",tr:"21 (yirmi bir)",read:"にじゅういち",ex:"にじゅういちえんです。"},
  {id:"w258",sub:"İsim",char:"３５（三十五）",tr:"35 (otuz beş)",read:"さんじゅうご",ex:"さんじゅうごさいです。"},
  {id:"w259",sub:"İsim",char:"４８（四十八）",tr:"48 (kırk sekiz)",read:"よんじゅうはち",ex:"よんじゅうはちえんです。"},
  {id:"w260",sub:"İsim",char:"５５（五十五）",tr:"55 (elli beş)",read:"ごじゅうご",ex:"ごじゅうごえんです。"},
  {id:"w261",sub:"İsim",char:"７２（七十二）",tr:"72 (yetmiş iki)",read:"ななじゅうに",ex:"ななじゅうにえんです。"},
  {id:"w262",sub:"İsim",char:"９９（九十九）",tr:"99 (doksan dokuz)",read:"きゅうじゅうきゅう",ex:"きゅうじゅうきゅうえんです。"},
  {id:"w263",sub:"İsim",char:"１５０（百五十）",tr:"150 (yüz elli)",read:"ひゃくごじゅう",ex:"ひゃくごじゅうえんです。"},
  {id:"w264",sub:"İsim",char:"２５０（二百五十）",tr:"250 (iki yüz elli)",read:"にひゃくごじゅう",ex:"にひゃくごじゅうえんです。"},
  {id:"w265",sub:"İsim",char:"１２３（百二十三）",tr:"123 (yüz yirmi üç)",read:"ひゃくにじゅうさん",ex:"ひゃくにじゅうさんえんです。"},
  {id:"w266",sub:"İsim",char:"１５００（千五百）",tr:"1500 (bin beş yüz)",read:"せんごひゃく",ex:"せんごひゃくえんです。"},
  {id:"w267",sub:"İsim",char:"２５００（二千五百）",tr:"2500 (iki bin beş yüz)",read:"にせんごひゃく",ex:"にせんごひゃくえんです。"},
  {id:"w268",sub:"İsim",char:"１万２千（一万二千）",tr:"12.000 (on iki bin)",read:"いちまんにせん",ex:"いちまんにせんえんです。"},
  {id:"w269",sub:"İsim",char:"３万８千（三万八千）",tr:"38.000 (otuz sekiz bin)",read:"さんまんはっせん",ex:"さんまんはっせんえんです。"}
];

const TIMES = [
  {id:"t1",sub:"İsim",char:"１時",tr:"saat 1",read:"いちじ",ex:"いちじにきます。 — Saat 1'de geliyorum."},
  {id:"t2",sub:"İsim",char:"２時",tr:"saat 2",read:"にじ",ex:"にじにかえります。 — Saat 2'de dönüyorum."},
  {id:"t3",sub:"İsim",char:"３時",tr:"saat 3",read:"さんじ",ex:"さんじにたべます。 — Saat 3'te yiyorum."},
  {id:"t4",sub:"İsim",char:"４時",tr:"saat 4",read:"よじ",ex:"よじにいきます。 — Saat 4'te gidiyorum."},
  {id:"t5",sub:"İsim",char:"５時",tr:"saat 5",read:"ごじ",ex:"ごじにおきます。 — Saat 5'te kalkıyorum."},
  {id:"t6",sub:"İsim",char:"６時",tr:"saat 6",read:"ろくじ",ex:"ろくじにごはんをたべます。 — Saat 6'da yemek yiyorum."},
  {id:"t7",sub:"İsim",char:"７時",tr:"saat 7",read:"しちじ",ex:"しちじにがっこうへいきます。 — Saat 7'de okula gidiyorum."},
  {id:"t8",sub:"İsim",char:"８時",tr:"saat 8",read:"はちじ",ex:"はちじにしごとをします。 — Saat 8'de çalışıyorum."},
  {id:"t9",sub:"İsim",char:"９時",tr:"saat 9",read:"くじ",ex:"くじにねます。 — Saat 9'da uyuyorum."},
  {id:"t10",sub:"İsim",char:"１０時",tr:"saat 10",read:"じゅうじ",ex:"じゅうじにきます。 — Saat 10'da geliyorum."},
  {id:"t11",sub:"İsim",char:"１１時",tr:"saat 11",read:"じゅういちじ",ex:"じゅういちじにたべます。 — Saat 11'de yiyorum."},
  {id:"t12",sub:"İsim",char:"１２時",tr:"saat 12",read:"じゅうにじ",ex:"じゅうにじにひるごはんをたべます。 — Saat 12'de öğle yemeği yiyorum."},
  {id:"t13",sub:"İsim",char:"１時半",tr:"saat 1:30",read:"いちじはん",ex:"いちじはんにきます。 — Saat 1:30'da geliyorum."},
  {id:"t14",sub:"İsim",char:"２時半",tr:"saat 2:30",read:"にじはん",ex:"にじはんにかえります。"},
  {id:"t15",sub:"İsim",char:"３時半",tr:"saat 3:30",read:"さんじはん",ex:"さんじはんにたべます。"},
  {id:"t16",sub:"İsim",char:"４時半",tr:"saat 4:30",read:"よじはん",ex:"よじはんにいきます。"},
  {id:"t17",sub:"İsim",char:"５時半",tr:"saat 5:30",read:"ごじはん",ex:"ごじはんにおきます。"},
  {id:"t18",sub:"İsim",char:"６時半",tr:"saat 6:30",read:"ろくじはん",ex:"ろくじはんにごはんをたべます。"},
  {id:"t19",sub:"İsim",char:"７時半",tr:"saat 7:30",read:"しちじはん",ex:"しちじはんにがっこうへいきます。"},
  {id:"t20",sub:"İsim",char:"８時半",tr:"saat 8:30",read:"はちじはん",ex:"はちじはんにしごとをします。"},
  {id:"t21",sub:"İsim",char:"９時半",tr:"saat 9:30",read:"くじはん",ex:"くじはんにねます。"},
  {id:"t22",sub:"İsim",char:"１０時半",tr:"saat 10:30",read:"じゅうじはん",ex:"じゅうじはんにきます。"},
  {id:"t23",sub:"İsim",char:"１１時半",tr:"saat 11:30",read:"じゅういちじはん",ex:"じゅういちじはんにたべます。"},
  {id:"t24",sub:"İsim",char:"１２時半",tr:"saat 12:30",read:"じゅうにじはん",ex:"じゅうにじはんにひるごはんをたべます。"},
  {id:"t25",sub:"İsim",char:"１時１５分",tr:"saat 1:15",read:"いちじじゅうごふん",ex:"いちじじゅうごふんにきます。"},
  {id:"t26",sub:"İsim",char:"２時４５分",tr:"saat 2:45",read:"にじよんじゅうごふん",ex:"にじよんじゅうごふんにかえります。"},
  {id:"t27",sub:"İsim",char:"３時１０分",tr:"saat 3:10",read:"さんじじゅっぷん",ex:"さんじじゅっぷんにたべます。"},
  {id:"t28",sub:"İsim",char:"４時２０分",tr:"saat 4:20",read:"よじにじゅっぷん",ex:"よじにじゅっぷんにいきます。"},
  {id:"t29",sub:"İsim",char:"６時５分",tr:"saat 6:05",read:"ろくじごふん",ex:"ろくじごふんにごはんをたべます。"},
  {id:"t30",sub:"İsim",char:"７時４０分",tr:"saat 7:40",read:"しちじよんじゅっぷん",ex:"しちじよんじゅっぷんにがっこうへいきます。"},
  {id:"t31",sub:"İsim",char:"８時５５分",tr:"saat 8:55",read:"はちじごじゅうごふん",ex:"はちじごじゅうごふんにしごとをします。"},
  {id:"t32",sub:"İsim",char:"９時０５分",tr:"saat 9:05",read:"くじごふん",ex:"くじごふんにねます。"},
  {id:"t33",sub:"İsim",char:"１０時３０分",tr:"saat 10:30 (dakikalı)",read:"じゅうじさんじゅっぷん",ex:"じゅうじさんじゅっぷんにきます。"},
  {id:"t34",sub:"İsim",char:"１１時１５分",tr:"saat 11:15",read:"じゅういちじじゅうごふん",ex:"じゅういちじじゅうごふんにたべます。"},
  {id:"t35",sub:"İsim",char:"１２時５０分",tr:"saat 12:50",read:"じゅうにじごじゅっぷん",ex:"じゅうにじごじゅっぷんにひるごはんをたべます。"},
  {id:"t36",sub:"İsim",char:"何時",tr:"saat kaç",read:"なんじ",ex:"いまなんじですか。 — Şu an saat kaç?"},
  {id:"t37",sub:"İsim",char:"何時半",tr:"saat kaç buçuk",read:"なんじはん",ex:"なんじはんですか。 — Saat kaç buçuk?"}
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
// GRAMMAR QUESTIONS
// ══════════════════════════════════════════════════════════
const LESSON_SUMMARIES = {
  1: {
    title: "～は ～です / ～じゃありません",
    patterns: [
      {pattern:"わたしは [職業] です。",tr:"Ben [meslek]im.",example:"わたしは　がくせいです。"},
      {pattern:"[名前]さんは [職業] じゃありません。",tr:"[Ad] san [meslek] değil.",example:"ミラーさんは　かいしゃいんじゃありません。"},
      {pattern:"[名前]さんも [職業] です。",tr:"[Ad] san da [meslek].",example:"カリナさんも　がくせいです。"},
      {pattern:"[名前]さんは [職業] ですか。",tr:"[Ad] san [meslek] mi?",example:"ミラーさんは　かいしゃいんですか。"},
    ],
    vocab: ["わたし (ben)","がくせい (öğrenci)","かいしゃいん (şirket çalışanı)","せんせい (öğretmen)","いしゃ (doktor)","えんじにあ (mühendis)"],
    tip: "💡 「は」 konu partikülü. 「じゃありません」= 「ではありません」 daha resmi.",
  },
  2: {
    title: "これ・それ・あれ・この・の",
    patterns: [
      {pattern:"これは [もの] です。",tr:"Bu [şey].",example:"これは　じしょです。"},
      {pattern:"それは [人] の [もの] です。",tr:"O [kişinin] [şeyi].",example:"それは　わたしの　かさです。"},
      {pattern:"この [もの] は [人] のです。",tr:"Bu [şey] [kişinin].",example:"この　ほんは　わたしのです。"},
      {pattern:"この [もの] は　いくらですか。",tr:"Bu [şey] ne kadar?",example:"この　とけいは　いくらですか。"},
    ],
    vocab: ["これ (bu/yakın)","それ (o/orta)","あれ (o/uzak)","この/その/あの (bu/o/şu+isim)","だれの (kimin)","いくら (ne kadar)"],
    tip: "💡 これ/それ/あれ tek başına. この/その/あの mutlaka isimden önce gelir.",
  },
  3: {
    title: "ここ・そこ・あそこ / いくら",
    patterns: [
      {pattern:"ここは [場所] です。",tr:"Burası [yer].",example:"ここは　しょくどうです。"},
      {pattern:"[もの] は　あそこです。",tr:"[Şey] orada.",example:"えれべーたーは　あそこです。"},
      {pattern:"[もの] は　どこですか。",tr:"[Şey] nerede?",example:"トイレは　どこですか。"},
      {pattern:"この [もの] は　いくらですか。",tr:"Bu [şey] ne kadar?",example:"このとけいは　いくらですか。"},
    ],
    vocab: ["ここ (burada)","そこ (orada/yakın)","あそこ (orada/uzak)","どこ (nerede)","こちら/そちら/あちら (kibar)"],
    tip: "💡 ここ/そこ/あそこ yer. こちら/そちら/あちら daha kibar. どこ soru kelimesi.",
  },
  4: {
    title: "時間・に・から・まで / ました",
    patterns: [
      {pattern:"いまは [時間] です。",tr:"Şu an saat [saat].",example:"いま　４じ５ふんです。"},
      {pattern:"わたしは　まいあさ [時間] に [動詞] ます。",tr:"Her sabah [saat]'ta [fiil].",example:"わたしは　まいあさ　６じに　おきます。"},
      {pattern:"[場所] は [時間] から [時間] まで です。",tr:"[Yer] [saat]'tan [saat]'a kadar.",example:"ぎんこうは　９じから　３じまでです。"},
      {pattern:"わたしは　きのう [動詞] ました。",tr:"Dün [fiil]dim.",example:"わたしは　きのう　べんきょうしました。"},
    ],
    vocab: ["なんじ (saat kaç)","なんようび (haftanın hangi günü)","まいあさ (her sabah)","きのう (dün)","から (den)","まで (e kadar)"],
    tip: "💡 に = zamanda 'de/da'. から～まで = 'den～e kadar'. ました = geçmiş zaman.",
  },
  5: {
    title: "～へ いきます・きます・かえります / で・と",
    patterns: [
      {pattern:"わたしは [場所] へ　いきます。",tr:"[Yere] gidiyorum.",example:"わたしは　きょうとへ　いきます。"},
      {pattern:"わたしは [乗り物] で [場所] へ　かえります。",tr:"[Araçla] [yere] dönüyorum.",example:"わたしは　タクシーで　うちへ　かえります。"},
      {pattern:"わたしは [人] と [場所] へ　きました。",tr:"[Kişiyle] [yere] geldim.",example:"わたしは　かぞくと　にほんへ　きました。"},
      {pattern:"いつ　にほんへ　きましたか。",tr:"Ne zaman Japonya'ya geldiniz?",example:"３がつ２５にちに　きました。"},
    ],
    vocab: ["へ (yönelme)","で (araç ile)","と (birlikte)","いつ (ne zaman)","どこへも (hiçbir yere)"],
    tip: "💡 へ = yön. で = araç/ulaşım. と = 'ile/birlikte'. どこへもいきません = hiçbir yere gitmedim.",
  },
  6: {
    title: "～を [動詞] / で (場所) / ませんか・ましょう",
    patterns: [
      {pattern:"わたしは [もの] を [動詞] ます。",tr:"[Şeyi] [fiil].",example:"わたしは　ほんを　よみます。"},
      {pattern:"わたしは [場所] で [もの] を [動詞] ます。",tr:"[Yerde] [şeyi] [fiil].",example:"わたしは　えきで　しんぶんを　かいます。"},
      {pattern:"いっしょに [場所] へ　いきませんか。",tr:"Birlikte [yere] gitmez misiniz?",example:"いっしょに　こうべへ　いきませんか。"},
      {pattern:"ちょっと [動詞] ましょう。",tr:"Biraz [fiil]elim.",example:"ちょっと　やすみましょう。"},
    ],
    vocab: ["を (nesne partikülü)","で (yer partikülü)","ませんか (teklif/davet)","ましょう (birlikte yapalım)","なにも (hiçbir şeyi)"],
    tip: "💡 を = nesne partikülü. で = nerede yapıldığı. ませんか = kibar davet. ましょう = birlikte yapalım.",
  },
  7: {
    title: "で (手段) / に (相手) / あげます・もらいます・もう/まだ",
    patterns: [
      {pattern:"わたしは [手段] で [もの] を [動詞] ます。",tr:"[Araçla] [şeyi] [fiil].",example:"わたしは　パソコンで　えいがを　みます。"},
      {pattern:"わたしは [人] に [もの] を　あげます。",tr:"[Kişiye] [şey] veriyorum.",example:"わたしは　きむらさんに　はなを　あげます。"},
      {pattern:"わたしは [人] に [もの] を　もらいました。",tr:"[Kişiden] [şey] aldım.",example:"わたしは　カリナさんに　チョコレートを　もらいました。"},
      {pattern:"もう [もの] を [動詞] ましたか。",tr:"[Şeyi] yaptın mı (artık)?",example:"もう　メールを　おくりましたか。"},
    ],
    vocab: ["で (araç/dil)","に (kişi: verme/alma)","あげます (vermek)","もらいます (almak)","もう (artık/zaten)","まだ (henüz)"],
    tip: "💡 に = kişi partikülü (verme/alma). もう+肯定=zaten yaptım. まだ+否定=henüz yapmadım.",
  },
  8: {
    title: "い形容詞 / な形容詞 / とても・あまり・どんな",
    patterns: [
      {pattern:"[場所] は [な-adj] です。",tr:"[Yer] [sıfat].",example:"さくらは　きれいです。"},
      {pattern:"[もの] は [い-adj] です。",tr:"[Şey] [sıfat].",example:"ふじさんは　たかいです。"},
      {pattern:"[もの] は [な-adj] な [名詞] です。",tr:"[Şey] [sıfat] bir [isim].",example:"さくらは　きれいな　はなです。"},
      {pattern:"[もの] は [い-adj] ですが、[い-adj] です。",tr:"[Şey] [sıfat] ama [sıfat].",example:"りょうは　ふるいですが、べんりです。"},
    ],
    vocab: ["とても (çok)","あまり～ない (pek～değil)","どう (nasıl)","どんな (nasıl bir)","そして (ve/ayrıca)","でも (ama)"],
    tip: "💡 い-adj olumsuz: ～くない。な-adj olumsuz: ～じゃありません。いい→よくない (dikkat!).",
  },
  9: {
    title: "が (好き・嫌い・わかる・ある) / から (理由)",
    patterns: [
      {pattern:"わたしは [もの] が　すきです。",tr:"[Şeyi] seviyorum.",example:"わたしは　イタリアりょうりが　すきです。"},
      {pattern:"わたしは [言語] が　すこし　わかります。",tr:"[Dili] biraz anlıyorum.",example:"わたしは　にほんごが　すこし　わかります。"},
      {pattern:"[理由] ですから、[結果] ます。",tr:"[Sebep] olduğu için [sonuç].",example:"こどものたんじょうびですから、はやくかえります。"},
      {pattern:"どうして [動詞] ましたか。",tr:"Neden [fiil]diniz?",example:"どうして　やすみましたか。"},
    ],
    vocab: ["が (が partiküli)","すき (sevmek)","きらい (sevmemek)","じょうず (becerikli)","へた (beceriksiz)","から (çünkü/için)"],
    tip: "💡 が = sevgi/yetenek/anlayış/sahiplik. から = sebep (「から」cümle sonuna gelir).",
  },
  10: {
    title: "あります・います / 場所に / 位置を表す言葉",
    patterns: [
      {pattern:"[場所] に [もの] が　あります。",tr:"[Yerde] [şey] var.",example:"あそこに　こんびにが　あります。"},
      {pattern:"[場所] に [人/動物] が　います。",tr:"[Yerde] [kişi/hayvan] var.",example:"ロビーに　さとうさんが　います。"},
      {pattern:"[もの] は [場所] に　あります。",tr:"[Şey] [yerde].",example:"ゆうびんきょくは　えきの　まえに　あります。"},
      {pattern:"[人] は [場所] に　います。",tr:"[Kişi] [yerde].",example:"かぞくは　ニューヨークに　います。"},
    ],
    vocab: ["うえ (üst)","した (alt)","まえ (ön)","うしろ (arka)","みぎ (sağ)","ひだり (sol)","なか (içi)","となり (yanı)","ちかく (yakın)","あいだ (arasında)"],
    tip: "💡 あります = cansız. います = canlı. [もの]は[場所]に = 'şey yerde'. [場所]に[もの]が = 'yerde şey var'.",
  },
  11: {
    title: "助数詞 (sayı ekleri) / どのくらい・かかります",
    patterns: [
      {pattern:"[場所] に [もの] が [数+助数詞] あります。",tr:"[Yerde] [kaç] [şey] var.",example:"かいぎしつに　テーブルが　７つ　あります。"},
      {pattern:"[もの] を [数+助数詞] ください。",tr:"[Kaç] [şey] lütfen.",example:"きってを　５まい　ください。"},
      {pattern:"[場所] から [場所] まで [時間] かかります。",tr:"[Yerden] [yere] [süre] sürer.",example:"おおさかから　とうきょうまで　２じかん　かかります。"},
      {pattern:"[期間] に [回数] [動詞] ます。",tr:"[Sürede] [kaç kez] [fiil].",example:"いっしゅうかんに　２かい　します。"},
    ],
    vocab: ["つ (genel)","まい (kağıt/düz)","さつ (kitap)","だい (araç/makine)","ほん (uzun/silindirik)","ひき (küçük hayvan)","にん (kişi)","どのくらい (ne kadar)","かかります (sürmek)"],
    tip: "💡 ひとり・ふたり = 1,2 kişi (özel). 3人～ = にん. 1匹・2匹・3びき ses değişimi dikkat!",
  },
  12: {
    title: "過去形 / ～より・どちら / いちばん",
    patterns: [
      {pattern:"きのうは [な-adj] でした。",tr:"Dün [sıfat]tı.",example:"きのうは　さむかったです。"},
      {pattern:"[A] は [B] より [adj] です。",tr:"[A] [B]'den [sıfat].",example:"ほっかいどうは　きゅうしゅうより　おおきいです。"},
      {pattern:"[A] と [B] と　どちらが [adj] ですか。",tr:"[A] mı [B] mi [sıfat]?",example:"うみと　やまと　どちらが　すきですか。"},
      {pattern:"[グループ] で　なにが　いちばん [adj] ですか。",tr:"[Grupta] en [sıfat] ne?",example:"にほんりょうりで　なにが　いちばん　すきですか。"},
    ],
    vocab: ["より (den/dan daha)","どちら (hangisi/ikiden biri)","いちばん (en)","ずっと (çok daha)","どちらも (her ikisi de)"],
    tip: "💡 い-adj 過去: ～かったです。な-adj 過去: ～でした。いい→よかった。より = karşılaştırma.",
  },
  13: {
    title: "ほしい / ～たい / ～に いきます",
    patterns: [
      {pattern:"わたしは [もの] が　ほしいです。",tr:"[Şeyi] istiyorum.",example:"わたしは　くるまが　ほしいです。"},
      {pattern:"わたしは [もの] を [動詞] たいです。",tr:"[Şeyi] [fiil]mek istiyorum.",example:"わたしは　すしを　たべたいです。"},
      {pattern:"[もの] を [動詞] たくないです。",tr:"[Şeyi] [fiil]mek istemiyorum.",example:"なにも　したくないです。"},
      {pattern:"わたしは [場所] へ [目的] に　いきます。",tr:"[Yere] [amaç için] gidiyorum.",example:"こどもと　ふねを　みに　いきます。"},
    ],
    vocab: ["ほしい (istemek/sahip olmak)","～たい (yapmak istemek)","～たくない (yapmak istememek)","に (amaç partikülü)","ぜひ (mutlaka)"],
    tip: "💡 ほしい = sahip olmak istiyorum (が kullan). たい = yapmak istiyorum. に+いきます = amaç bildiren に.",
  },
  14: {
    title: "て形+ください / ましょうか / て形+います",
    patterns: [
      {pattern:"[動詞のて形] ください。",tr:"[Fiil]in lütfen.",example:"ちょっと　まって　ください。"},
      {pattern:"[動詞] ましょうか。",tr:"[Fiil]eyim mi?",example:"にもつを　もちましょうか。"},
      {pattern:"[人] は　いま [動詞のて形] います。",tr:"[Kişi] şu an [fiil]iyor.",example:"ミラーさんは　いま　でんわを　かけて　います。"},
      {pattern:"雨が [動詞のて形] いますか。",tr:"Yağmur yağıyor mu?",example:"あめが　ふっていますか。"},
    ],
    vocab: ["て形 (te formu)","ください (lütfen yapın)","ましょうか (yapayım mı)","います (devam eden eylem/durum)"],
    tip: "💡 て形: ～て+ください/います/から. います = şu an devam ediyor. ましょうか = teklif.",
  },
  15: {
    title: "～てもいい / ～てはいけない / て形+います (状態)",
    patterns: [
      {pattern:"[動詞のて形] も　いいですか。",tr:"[Fiil]ebilir miyim?",example:"しゃしんを　とっても　いいですか。"},
      {pattern:"[動詞のて形] は　いけません。",tr:"[Fiil]mek yasak.",example:"ここで　あそんでは　いけません。"},
      {pattern:"[人] は [もの] を　もって　います。",tr:"[Kişinin] [şeyi] var (taşıyor).",example:"サントスさんは　でんしじしょを　もって　います。"},
      {pattern:"[人] は [場所] に　すんで　います。",tr:"[Kişi] [yerde] yaşıyor.",example:"マリアさんは　おおさかに　すんで　います。"},
    ],
    vocab: ["てもいい (olur/yapabilirsin)","てはいけない (yasak/olmaz)","しって います (biliyor)","すんで います (yaşıyor)","けっこんして います (evli)"],
    tip: "💡 てもいい = izin. てはいけない = yasak. て+います = durum/hal bildiren (süregelen durum).",
  },
};

const GRAMMAR_SCRAMBLE = [
  {id:"sc1",lesson:1,parts:["わたし","は","がくせい","です"],answer:"わたしはがくせいです",hint:"Ben öğrenciyim."},
  {id:"sc2",lesson:1,parts:["ミラーさん","は","かいしゃいん","じゃありません"],answer:"ミラーさんはかいしゃいんじゃありません",hint:"Miller san şirket çalışanı değil."},
  {id:"sc3",lesson:1,parts:["あの　かた","は","だれ","ですか"],answer:"あのかたはだれですか",hint:"O kişi kim?"},
  {id:"sc4",lesson:1,parts:["カリナさん","も","がくせい","です"],answer:"カリナさんもがくせいです",hint:"Karina da öğrenci."},
  {id:"sc5",lesson:2,parts:["これ","は","じしょ","です"],answer:"これはじしょです",hint:"Bu sözlük."},
  {id:"sc6",lesson:2,parts:["それ","は","わたし","の","かさ","です"],answer:"それはわたしのかさです",hint:"O benim şemsiyem."},
  {id:"sc7",lesson:2,parts:["この","ほん","は","だれ","の","ですか"],answer:"このほんはだれのですか",hint:"Bu kitap kimin?"},
  {id:"sc8",lesson:2,parts:["この","とけい","は","いくら","ですか"],answer:"このとけいはいくらですか",hint:"Bu saat ne kadar?"},
  {id:"sc9",lesson:3,parts:["トイレ","は","どこ","ですか"],answer:"トイレはどこですか",hint:"Tuvalet nerede?"},
  {id:"sc10",lesson:3,parts:["えれべーたー","は","あそこ","です"],answer:"えれべーたーはあそこです",hint:"Asansör orada."},
  {id:"sc11",lesson:4,parts:["いま","なんじ","ですか"],answer:"いまなんじですか",hint:"Şu an saat kaç?"},
  {id:"sc12",lesson:4,parts:["わたし","は","まいあさ","６じ","に","おきます"],answer:"わたしはまいあさ６じにおきます",hint:"Her sabah 6'da kalkıyorum."},
  {id:"sc13",lesson:4,parts:["ぎんこう","は","９じ","から","３じ","まで","です"],answer:"ぎんこうは９じから３じまでです",hint:"Banka 9'dan 3'e kadar."},
  {id:"sc14",lesson:4,parts:["きのう","べんきょう","しました","か"],answer:"きのうべんきょうしましたか",hint:"Dün çalıştın mı?"},
  {id:"sc15",lesson:5,parts:["わたし","は","きょうと","へ","いきます"],answer:"わたしはきょうとへいきます",hint:"Kyoto'ya gidiyorum."},
  {id:"sc16",lesson:5,parts:["なん","で","とうきょう","へ","いきますか"],answer:"なんでとうきょうへいきますか",hint:"Tokyo'ya ne ile gidiyorsunuz?"},
  {id:"sc17",lesson:5,parts:["かぞく","と","にほん","へ","きました"],answer:"かぞくとにほんへきました",hint:"Ailesiyle Japonya'ya geldi."},
  {id:"sc18",lesson:6,parts:["わたし","は","ほん","を","よみます"],answer:"わたしはほんをよみます",hint:"Kitap okuyorum."},
  {id:"sc19",lesson:6,parts:["いっしょに","こうべ","へ","いきません","か"],answer:"いっしょにこうべへいきませんか",hint:"Birlikte Kobe'ye gitmez misiniz?"},
  {id:"sc20",lesson:6,parts:["ちょっと","やすみ","ましょう"],answer:"ちょっとやすみましょう",hint:"Biraz dinlenelim."},
  {id:"sc21",lesson:6,parts:["どこ","で","その","かばん","を","かいましたか"],answer:"どこでそのかばんをかいましたか",hint:"O çantayı nerede aldınız?"},
  {id:"sc22",lesson:7,parts:["わたし","は","きむらさん","に","はな","を","あげます"],answer:"わたしはきむらさんにはなをあげます",hint:"Kimura san'a çiçek veriyorum."},
  {id:"sc23",lesson:7,parts:["わたし","は","カリナさん","に","チョコレート","を","もらいました"],answer:"わたしはカリナさんにチョコレートをもらいました",hint:"Karina'dan çikolata aldım."},
  {id:"sc24",lesson:7,parts:["もう","メール","を","おくりました"],answer:"もうメールをおくりました",hint:"E-postayı gönderdim."},
  {id:"sc25",lesson:8,parts:["さくら","は","きれい","です"],answer:"さくらはきれいです",hint:"Kiraz çiçeği güzel."},
  {id:"sc26",lesson:8,parts:["ふじさん","は","たかい","やま","です"],answer:"ふじさんはたかいやまです",hint:"Fuji yüksek bir dağ."},
  {id:"sc27",lesson:8,parts:["おおさか","は","にぎやか","です","が","たべもの","も","おいしい","です"],answer:"おおさかはにぎやかですがたべものもおいしいです",hint:"Osaka kalabalık ama yemek de lezzetli."},
  {id:"sc28",lesson:9,parts:["わたし","は","おんがく","が","すき","です"],answer:"わたしはおんがくがすきです",hint:"Müziği seviyorum."},
  {id:"sc29",lesson:9,parts:["にほんご","が","すこし","わかります"],answer:"にほんごがすこしわかります",hint:"Japonca'yı biraz anlıyorum."},
  {id:"sc30",lesson:9,parts:["じかん","が","ありません","から","いきません"],answer:"じかんがありませんからいきません",hint:"Zamanım olmadığı için gitmiyorum."},
  {id:"sc31",lesson:10,parts:["あそこ","に","こんびに","が","あります"],answer:"あそこにこんびにがあります",hint:"Orada bir market var."},
  {id:"sc32",lesson:10,parts:["ろびー","に","さとうさん","が","います"],answer:"ろびーにさとうさんがいます",hint:"Lobide Sato san var."},
  {id:"sc33",lesson:10,parts:["ゆうびんきょく","は","えき","の","まえ","に","あります"],answer:"ゆうびんきょくはえきのまえにあります",hint:"Postane istasyonun önünde."},
  {id:"sc34",lesson:11,parts:["りんご","を","みっつ","かいました"],answer:"りんごをみっつかいました",hint:"Üç elma aldım."},
  {id:"sc35",lesson:11,parts:["おおさか","から","とうきょう","まで","しんかんせん","で","どのくらい","かかりますか"],answer:"おおさかからとうきょうまでしんかんせんでどのくらいかかりますか",hint:"Osaka'dan Tokyo'ya Shinkansen ile ne kadar sürer?"},
  {id:"sc36",lesson:12,parts:["きのう","は","さむかった","です"],answer:"きのうはさむかったです",hint:"Dün soğuktu."},
  {id:"sc37",lesson:12,parts:["ほっかいどう","は","きゅうしゅう","より","おおきい","です"],answer:"ほっかいどうはきゅうしゅうよりおおきいです",hint:"Hokkaido, Kyushu'dan büyük."},
  {id:"sc38",lesson:12,parts:["にほんりょうり","で","なに","が","いちばん","すきですか"],answer:"にほんりょうりでなにがいちばんすきですか",hint:"Japon yemeklerinde en çok neyi seviyorsunuz?"},
  {id:"sc39",lesson:13,parts:["わたし","は","くるま","が","ほしい","です"],answer:"わたしはくるまがほしいです",hint:"Araba istiyorum."},
  {id:"sc40",lesson:13,parts:["なつやすみ","は","おきなわ","へ","いきたい","です"],answer:"なつやすみはおきなわへいきたいです",hint:"Yaz tatilinde Okinawa'ya gitmek istiyorum."},
  {id:"sc41",lesson:13,parts:["こども","と","ふね","を","み","に","いきます"],answer:"こどもとふねをみにいきます",hint:"Çocukla gemi görmeye gidiyorum."},
  {id:"sc42",lesson:14,parts:["ちょっと","まって","ください"],answer:"ちょっとまってください",hint:"Biraz bekleyin lütfen."},
  {id:"sc43",lesson:14,parts:["にもつ","を","もちましょう","か"],answer:"にもつをもちましょうか",hint:"Bavulu taşıyayım mı?"},
  {id:"sc44",lesson:14,parts:["ミラーさん","は","いま","でんわ","を","かけて","います"],answer:"ミラーさんはいまでんわをかけています",hint:"Miller şu an telefonda."},
  {id:"sc45",lesson:15,parts:["しゃしん","を","とっても","いい","ですか"],answer:"しゃしんをとってもいいですか",hint:"Fotoğraf çekebilir miyim?"},
  {id:"sc46",lesson:15,parts:["ここ","で","あそんで","は","いけません"],answer:"ここであそんではいけません",hint:"Burada oynanmaz."},
  {id:"sc47",lesson:15,parts:["マリアさん","は","おおさか","に","すんで","います"],answer:"マリアさんはおおさかにすんでいます",hint:"Maria Osaka'da yaşıyor."},
];

const GRAMMAR_FILL = [
  {id:"fi1",lesson:1,sentence:"わたし___がくせいです。",blank:"は",hint:"Ben öğrenciyim.",choices:["は","が","を","に"]},
  {id:"fi2",lesson:1,sentence:"ミラーさん___かいしゃいんじゃありません。",blank:"は",hint:"Miller şirket çalışanı değil.",choices:["は","が","も","の"]},
  {id:"fi3",lesson:1,sentence:"カリナさん___がくせいです。",blank:"も",hint:"Karina da öğrenci. (も kullan)",choices:["も","は","が","の"]},
  {id:"fi4",lesson:2,sentence:"これ___わたし___かさです。",blank:"は・の",hint:"Bu benim şemsiyem.",choices:["は・の","が・の","は・を","も・の"]},
  {id:"fi5",lesson:2,sentence:"この___は何ですか。",blank:"かばん",hint:"Bu çanta ne?",choices:["かばん","ほん","とけい","さいふ"]},
  {id:"fi6",lesson:3,sentence:"トイレは___ですか。",blank:"どこ",hint:"Tuvalet nerede?",choices:["どこ","なに","だれ","いくら"]},
  {id:"fi7",lesson:3,sentence:"エレベーターは___です。",blank:"あそこ",hint:"Asansör orada (uzakta).",choices:["あそこ","ここ","そこ","どこ"]},
  {id:"fi8",lesson:4,sentence:"わたしはまいあさ６じ___おきます。",blank:"に",hint:"Her sabah saat 6'da kalkıyorum.",choices:["に","で","へ","から"]},
  {id:"fi9",lesson:4,sentence:"ぎんこうは９じ___３じ___です。",blank:"から・まで",hint:"Banka 9'dan 3'e kadar.",choices:["から・まで","に・へ","で・に","まで・から"]},
  {id:"fi10",lesson:4,sentence:"きのうべんきょう___ましたか。",blank:"し",hint:"Dün çalıştın mı?",choices:["し","き","い","み"]},
  {id:"fi11",lesson:5,sentence:"わたしはしんかんせん___とうきょうへいきます。",blank:"で",hint:"Shinkansen ile Tokyo'ya gidiyorum.",choices:["で","に","を","へ"]},
  {id:"fi12",lesson:5,sentence:"だれ___きょうとへいきますか。",blank:"と",hint:"Kiminle Kyoto'ya gidiyorsunuz?",choices:["と","に","で","を"]},
  {id:"fi13",lesson:6,sentence:"わたしはえき___しんぶんをかいます。",blank:"で",hint:"İstasyonda gazete alıyorum. (場所)",choices:["で","に","を","へ"]},
  {id:"fi14",lesson:6,sentence:"いっしょにこうべへいき___か。",blank:"ませんか",hint:"Birlikte Kobe'ye gitmez misiniz?",choices:["ませんか","ましょう","ました","ます"]},
  {id:"fi15",lesson:7,sentence:"わたしはきむらさん___はなをあげます。",blank:"に",hint:"Kimura san'a çiçek veriyorum.",choices:["に","を","で","と"]},
  {id:"fi16",lesson:7,sentence:"もうひるごはんをたべ___か。",blank:"ましたか",hint:"Öğle yemeğini yedini mi?",choices:["ましたか","ますか","ました","ません"]},
  {id:"fi17",lesson:7,sentence:"いいえ、___です。これからたべます。",blank:"まだ",hint:"Hayır, henüz. Şimdi yiyeceğim.",choices:["まだ","もう","また","まず"]},
  {id:"fi18",lesson:8,sentence:"おおさかはにぎやかです___、たべものもたかいです。",blank:"が",hint:"Osaka kalabalık ama yemek de pahalı.",choices:["が","も","は","から"]},
  {id:"fi19",lesson:8,sentence:"あまり___くないです。",blank:"さむ",hint:"Pek soğuk değil. (寒い→否定)",choices:["さむ","あつ","たか","やす"]},
  {id:"fi20",lesson:8,sentence:"きれいな___ですね。",blank:"まち",hint:"Güzel bir şehir!",choices:["まち","はな","うみ","やま"]},
  {id:"fi21",lesson:9,sentence:"わたしはサッカー___すきです。",blank:"が",hint:"Futbolu seviyorum.",choices:["が","は","を","に"]},
  {id:"fi22",lesson:9,sentence:"じかん___ありませんから、いきません。",blank:"が",hint:"Zamanım olmadığı için gitmiyorum.",choices:["が","は","を","に"]},
  {id:"fi23",lesson:9,sentence:"どうして___かえりましたか。",blank:"はやく",hint:"Neden erken döndünüz?",choices:["はやく","おそく","よく","まだ"]},
  {id:"fi24",lesson:10,sentence:"テーブルの___にほんがあります。",blank:"うえ",hint:"Masanın üstünde kitap var.",choices:["うえ","した","まえ","うしろ"]},
  {id:"fi25",lesson:10,sentence:"にわに___がいますか。",blank:"だれ",hint:"Bahçede kim var?",choices:["だれ","なに","どこ","いくら"]},
  {id:"fi26",lesson:10,sentence:"ゆうびんきょくはえきの___にあります。",blank:"ちかく",hint:"Postane istasyonun yakınında.",choices:["ちかく","うえ","なか","うしろ"]},
  {id:"fi27",lesson:11,sentence:"りんごを___かいましたか。",blank:"いくつ",hint:"Kaç elma aldınız?",choices:["いくつ","なんまい","なんだい","なんほん"]},
  {id:"fi28",lesson:11,sentence:"きって___まいください。",blank:"５",hint:"5 pul lütfen.",choices:["５","３","２","４"]},
  {id:"fi29",lesson:11,sentence:"しんかんせんで２じかん___かかります。",blank:"はん",hint:"Shinkansen ile 2,5 saat sürer.",choices:["はん","ごろ","ぐらい","まで"]},
  {id:"fi30",lesson:12,sentence:"きょうとはしずか___ありませんでした。",blank:"じゃ",hint:"Kyoto sakin değildi.",choices:["じゃ","く","では","に"]},
  {id:"fi31",lesson:12,sentence:"ニューヨークはおおさか___さむいです。",blank:"より",hint:"New York, Osaka'dan soğuk.",choices:["より","ほど","から","まで"]},
  {id:"fi32",lesson:12,sentence:"くうこうまでバスと電車と___がはやいですか。",blank:"どちら",hint:"Havalimanına otobüs mü tren mi hızlı?",choices:["どちら","どれ","どこ","どんな"]},
  {id:"fi33",lesson:13,sentence:"わたしはあたらしいけいたい___ほしいです。",blank:"が",hint:"Yeni telefon istiyorum.",choices:["が","を","は","に"]},
  {id:"fi34",lesson:13,sentence:"つかれましたから、なに___したくないです。",blank:"も",hint:"Yoruldum, hiçbir şey yapmak istemiyorum.",choices:["も","が","は","を"]},
  {id:"fi35",lesson:13,sentence:"こどもとふねを___いきます。",blank:"みに",hint:"Çocukla gemi görmeye gidiyorum.",choices:["みに","みて","みる","みた"]},
  {id:"fi36",lesson:14,sentence:"ボールペンでなまえを___ください。",blank:"かいて",hint:"Kalemle isminizi yazın lütfen.",choices:["かいて","かき","かく","かいた"]},
  {id:"fi37",lesson:14,sentence:"まどを___ましょうか。",blank:"あけ",hint:"Pencereyi açayım mı?",choices:["あけ","しめ","とじ","ひらき"]},
  {id:"fi38",lesson:14,sentence:"ミラーさんはいまかいぎしつで___います。",blank:"はなして",hint:"Miller şu an toplantı odasında konuşuyor.",choices:["はなして","いって","きて","かいて"]},
  {id:"fi39",lesson:15,sentence:"しゃしんをとっても___ですか。",blank:"いい",hint:"Fotoğraf çekebilir miyim?",choices:["いい","だめ","いけない","よくない"]},
  {id:"fi40",lesson:15,sentence:"ここであそんでは___。",blank:"いけません",hint:"Burada oynanmaz.",choices:["いけません","いいです","ください","います"]},
  {id:"fi41",lesson:15,sentence:"マリアさんはおおさかに___います。",blank:"すんで",hint:"Maria Osaka'da yaşıyor.",choices:["すんで","いって","きて","かって"]},
  {id:"sf1",lesson:3,sentence:"___はなんですか。",blank:"これ",hint:"なに/なん = Ne?",choices:["なに","だれ","どこ","いくら"],category:"soru"},
  {id:"sf2",lesson:2,sentence:"これは___ですか。",blank:"なん",hint:"なに/なん = Ne? (sayıdan önce なん)",choices:["なん","だれ","どこ","いつ"],category:"soru"},
  {id:"sf3",lesson:6,sentence:"まいあさ___をたべますか。",blank:"なに",hint:"なに = Ne? (fiilden önce なに)",choices:["なに","だれ","どこ","いつ"],category:"soru"},
  {id:"sf4",lesson:1,sentence:"あのかたは___ですか。",blank:"どなた",hint:"どなた = Kim? (kibar)",choices:["どなた","なに","どこ","いくら"],category:"soru"},
  {id:"sf5",lesson:2,sentence:"これは___のかばんですか。",blank:"だれ",hint:"だれ = Kimin?",choices:["だれ","なに","どこ","いつ"],category:"soru"},
  {id:"sf6",lesson:5,sentence:"___ときょうとへいきますか。",blank:"だれ",hint:"だれ = Kiminle?",choices:["だれ","なに","どこ","いつ"],category:"soru"},
  {id:"sf7",lesson:3,sentence:"トイレは___ですか。",blank:"どこ",hint:"どこ = Nerede?",choices:["どこ","なに","だれ","いつ"],category:"soru"},
  {id:"sf8",lesson:3,sentence:"おくには___ですか。",blank:"どちら",hint:"どちら = Neresi? (kibar)",choices:["どちら","どこ","なに","だれ"],category:"soru"},
  {id:"sf9",lesson:10,sentence:"ゆうびんきょくは___にありますか。",blank:"どこ",hint:"どこ = Nerede?",choices:["どこ","なに","だれ","いつ"],category:"soru"},
  {id:"sf10",lesson:4,sentence:"いま___ですか。",blank:"なんじ",hint:"なんじ = Saat kaç?",choices:["なんじ","なんようび","いつ","いくら"],category:"soru"},
  {id:"sf11",lesson:4,sentence:"やすみは___ですか。",blank:"なんようび",hint:"なんようび = Haftanın hangi günü?",choices:["なんようび","なんじ","いつ","なに"],category:"soru"},
  {id:"sf12",lesson:11,sentence:"えきまで___かかりますか。",blank:"どのくらい",hint:"どのくらい = Ne kadar (süre/miktar)?",choices:["どのくらい","なんじ","いつ","いくら"],category:"soru"},
  {id:"sf13",lesson:5,sentence:"___にほんへきましたか。",blank:"いつ",hint:"いつ = Ne zaman?",choices:["いつ","どこ","だれ","なに"],category:"soru"},
  {id:"sf14",lesson:5,sentence:"たんじょうびは___ですか。",blank:"いつ",hint:"いつ = Ne zaman?",choices:["いつ","なんじ","なんようび","いくら"],category:"soru"},
  {id:"sf15",lesson:3,sentence:"このとけいは___ですか。",blank:"いくら",hint:"いくら = Ne kadar? (fiyat)",choices:["いくら","なに","どこ","いつ"],category:"soru"},
  {id:"sf16",lesson:11,sentence:"ぜんぶで___ですか。",blank:"いくら",hint:"いくら = Hepsi ne kadar?",choices:["いくら","なんまい","なんこ","どのくらい"],category:"soru"},
  {id:"sf17",lesson:5,sentence:"___とうきょうへいきますか。",blank:"なんで",hint:"なんで = Ne ile? (ulaşım)",choices:["なんで","どうして","なぜ","どこで"],category:"soru"},
  {id:"sf18",lesson:9,sentence:"___やすみましたか。",blank:"どうして",hint:"どうして = Neden? (sebep)",choices:["どうして","なんで","なに","いつ"],category:"soru"},
  {id:"sf19",lesson:8,sentence:"___まちですか。",blank:"どんな",hint:"どんな = Nasıl bir?",choices:["どんな","どこ","なに","だれ"],category:"soru"},
  {id:"sf20",lesson:9,sentence:"___スポーツがすきですか。",blank:"どんな",hint:"どんな = Ne tür?",choices:["どんな","なに","どこ","いつ"],category:"soru"},
  {id:"pf1",lesson:1,sentence:"わたし___がくせいです。",blank:"は",hint:"は = konu partiküli",choices:["は","が","を","に"],category:"particle"},
  {id:"pf2",lesson:1,sentence:"ミラーさん___かいしゃいんじゃありません。",blank:"は",hint:"は = konu partiküli",choices:["は","が","も","の"],category:"particle"},
  {id:"pf3",lesson:1,sentence:"カリナさん___がくせいです。",blank:"も",hint:"も = de/da (aynı durum)",choices:["も","は","が","の"],category:"particle"},
  {id:"pf4",lesson:8,sentence:"たべもの___たかいです。",blank:"も",hint:"も = yemek de pahalı",choices:["も","は","が","を"],category:"particle"},
  {id:"pf5",lesson:2,sentence:"これはわたし___かさです。",blank:"の",hint:"の = sahiplik",choices:["の","を","に","で"],category:"particle"},
  {id:"pf6",lesson:2,sentence:"コンピューター___ざっしです。",blank:"の",hint:"の = bağlantı (bilgisayar dergisi)",choices:["の","を","が","は"],category:"particle"},
  {id:"pf7",lesson:6,sentence:"わたしはほん___よみます。",blank:"を",hint:"を = nesne partiküli",choices:["を","は","が","に"],category:"particle"},
  {id:"pf8",lesson:6,sentence:"まいあさなに___たべますか。",blank:"を",hint:"を = nesne partiküli",choices:["を","は","が","の"],category:"particle"},
  {id:"pf9",lesson:4,sentence:"まいあさ６じ___おきます。",blank:"に",hint:"に = zamanda 'de/da'",choices:["に","で","を","へ"],category:"particle"},
  {id:"pf10",lesson:4,sentence:"もくようび___やすみます。",blank:"に",hint:"に = günde 'de/da'",choices:["に","で","を","は"],category:"particle"},
  {id:"pf11",lesson:10,sentence:"つくえのうえ___ほんがあります。",blank:"に",hint:"に = varlık yeri",choices:["に","で","を","へ"],category:"particle"},
  {id:"pf12",lesson:10,sentence:"にわ___ねこがいます。",blank:"に",hint:"に = var olduğu yer",choices:["に","で","を","から"],category:"particle"},
  {id:"pf13",lesson:7,sentence:"きむらさん___はなをあげます。",blank:"に",hint:"に = verilen kişi",choices:["に","を","で","と"],category:"particle"},
  {id:"pf14",lesson:13,sentence:"スーパーへかいもの___いきます。",blank:"に",hint:"に = amaç (alışveriş için)",choices:["に","を","で","へ"],category:"particle"},
  {id:"pf15",lesson:5,sentence:"わたしはきょうと___いきます。",blank:"へ",hint:"へ = yön/hedef",choices:["へ","に","で","を"],category:"particle"},
  {id:"pf16",lesson:5,sentence:"かいしゃ___かえります。",blank:"へ",hint:"へ = yön",choices:["へ","に","で","から"],category:"particle"},
  {id:"pf17",lesson:6,sentence:"えき___しんぶんをかいます。",blank:"で",hint:"で = eylem yeri",choices:["で","に","を","へ"],category:"particle"},
  {id:"pf18",lesson:6,sentence:"としょかん___べんきょうします。",blank:"で",hint:"で = eylem yeri",choices:["で","に","を","へ"],category:"particle"},
  {id:"pf19",lesson:5,sentence:"しんかんせん___とうきょうへいきます。",blank:"で",hint:"で = araç/ulaşım",choices:["で","に","を","と"],category:"particle"},
  {id:"pf20",lesson:7,sentence:"にほんご___かきます。",blank:"で",hint:"で = dil/araç",choices:["で","に","を","へ"],category:"particle"},
  {id:"pf21",lesson:5,sentence:"ともだち___にほんへきました。",blank:"と",hint:"と = ile/birlikte",choices:["と","に","で","を"],category:"particle"},
  {id:"pf22",lesson:6,sentence:"パン___たまごをたべます。",blank:"と",hint:"と = ve (tam liste)",choices:["と","や","も","か"],category:"particle"},
  {id:"pf23",lesson:4,sentence:"ぎんこうは９じ___３じまでです。",blank:"から",hint:"から = başlangıç noktası",choices:["から","まで","に","で"],category:"particle"},
  {id:"pf24",lesson:4,sentence:"９じから５じ___です。",blank:"まで",hint:"まで = bitiş noktası",choices:["まで","から","に","で"],category:"particle"},
  {id:"pf25",lesson:9,sentence:"わたしはサッカー___すきです。",blank:"が",hint:"が = sevgi/yetenek partiküli",choices:["が","を","は","に"],category:"particle"},
  {id:"pf26",lesson:10,sentence:"にわにねこ___います。",blank:"が",hint:"が = varlık özne partiküli",choices:["が","は","を","に"],category:"particle"},
  {id:"pf27",lesson:9,sentence:"じかん___ありませんからいきません。",blank:"が",hint:"が = sahiplik özne",choices:["が","は","を","に"],category:"particle"},
  {id:"pf28",lesson:10,sentence:"ふるいてがみ___しゃしんがあります。",blank:"や",hint:"や = gibi/vs. (kısmi liste)",choices:["や","と","も","か"],category:"particle"},
];

const GRAMMAR_PATTERN = [
  {id:"pd1",lesson:1,pattern:"～は ～です",cue:"わたし / がくせい",answer:"わたしはがくせいです",hint:"Ben öğrenciyim."},
  {id:"pd2",lesson:1,pattern:"～は ～じゃありません",cue:"さとうさん / いしゃ",answer:"さとうさんはいしゃじゃありません",hint:"Sato doktor değil."},
  {id:"pd3",lesson:1,pattern:"～も ～です",cue:"ワンさん / えんじにあ",answer:"ワンさんもえんじにあです",hint:"Wang da mühendis."},
  {id:"pd4",lesson:2,pattern:"これは ～です",cue:"ほん",answer:"これはほんです",hint:"Bu kitap."},
  {id:"pd5",lesson:2,pattern:"それは ～の ～です",cue:"わたし / かさ",answer:"それはわたしのかさです",hint:"O benim şemsiyem."},
  {id:"pd6",lesson:2,pattern:"この ～は いくらですか",cue:"とけい",answer:"このとけいはいくらですか",hint:"Bu saat ne kadar?"},
  {id:"pd7",lesson:4,pattern:"～に ～ます",cue:"６じ / おきます",answer:"６じにおきます",hint:"Saat 6'da kalkıyorum."},
  {id:"pd8",lesson:4,pattern:"～から ～まで",cue:"９じ / ５じ",answer:"９じから５じまでです",hint:"9'dan 5'e kadar."},
  {id:"pd9",lesson:4,pattern:"～ました / ～ませんでした",cue:"きのう / べんきょうしません",answer:"きのうべんきょうしませんでした",hint:"Dün çalışmadım."},
  {id:"pd10",lesson:5,pattern:"～へ いきます",cue:"きょうと",answer:"きょうとへいきます",hint:"Kyoto'ya gidiyorum."},
  {id:"pd11",lesson:5,pattern:"～で ～へ いきます",cue:"しんかんせん / とうきょう",answer:"しんかんせんでとうきょうへいきます",hint:"Shinkansen ile Tokyo'ya gidiyorum."},
  {id:"pd12",lesson:5,pattern:"～と ～へ きました",cue:"ともだち / にほん",answer:"ともだちとにほんへきました",hint:"Arkadaşımla Japonya'ya geldim."},
  {id:"pd13",lesson:6,pattern:"～で ～を ～ます",cue:"としょかん / ほん / よみます",answer:"としょかんでほんをよみます",hint:"Kütüphanede kitap okuyorum."},
  {id:"pd14",lesson:6,pattern:"～を ～ませんか",cue:"いっしょに / テニス / します",answer:"いっしょにテニスをしませんか",hint:"Birlikte tenis oynar mıyız?"},
  {id:"pd15",lesson:6,pattern:"～で ～ましょう",cue:"えき / あいます",answer:"えきであいましょう",hint:"İstasyonda buluşalım."},
  {id:"pd16",lesson:7,pattern:"～に ～を あげます",cue:"はは / プレゼント",answer:"ははにプレゼントをあげます",hint:"Anneme hediye veriyorum."},
  {id:"pd17",lesson:7,pattern:"～に ～を もらいました",cue:"せんせい / ほん",answer:"せんせいにほんをもらいました",hint:"Öğretmenden kitap aldım."},
  {id:"pd18",lesson:8,pattern:"～は ～です",cue:"このまち / にぎやか",answer:"このまちはにぎやかです",hint:"Bu şehir kalabalık."},
  {id:"pd19",lesson:8,pattern:"～は ～ですが、～です",cue:"りょう / ふるい / べんり",answer:"りょうはふるいですがべんりです",hint:"Yurt eski ama kullanışlı."},
  {id:"pd20",lesson:8,pattern:"あまり ～くないです",cue:"さむい",answer:"あまりさむくないです",hint:"Pek soğuk değil."},
  {id:"pd21",lesson:9,pattern:"～が すきです",cue:"にほんりょうり",answer:"にほんりょうりがすきです",hint:"Japon yemeğini seviyorum."},
  {id:"pd22",lesson:9,pattern:"～が わかります",cue:"にほんご / すこし",answer:"にほんごがすこしわかります",hint:"Japonca'yı biraz anlıyorum."},
  {id:"pd23",lesson:9,pattern:"～ですから、～ます",cue:"いそがしい / いきません",answer:"いそがしいですからいきません",hint:"Meşgul olduğum için gitmiyorum."},
  {id:"pd24",lesson:10,pattern:"～に ～が あります",cue:"つくえのうえ / ほん",answer:"つくえのうえにほんがあります",hint:"Masanın üstünde kitap var."},
  {id:"pd25",lesson:10,pattern:"～に ～が います",cue:"にわ / ねこ",answer:"にわにねこがいます",hint:"Bahçede kedi var."},
  {id:"pd26",lesson:10,pattern:"～は ～に あります",cue:"ゆうびんきょく / えきのまえ",answer:"ゆうびんきょくはえきのまえにあります",hint:"Postane istasyonun önünde."},
  {id:"pd27",lesson:11,pattern:"～を ～ください",cue:"きって / ３まい",answer:"きってを３まいください",hint:"3 pul lütfen."},
  {id:"pd28",lesson:11,pattern:"～から ～まで ～で どのくらい かかりますか",cue:"えき / くうこう / バス",answer:"えきからくうこうまでバスでどのくらいかかりますか",hint:"İstasyondan havalimanına otobüsle ne kadar sürer?"},
  {id:"pd29",lesson:12,pattern:"～は ～より ～です",cue:"とうきょう / おおさか / おおきい",answer:"とうきょうはおおさかよりおおきいです",hint:"Tokyo, Osaka'dan büyük."},
  {id:"pd30",lesson:12,pattern:"～で ～が いちばん ～です",cue:"にほん / なに / たかい",answer:"にほんでなにがいちばんたかいですか",hint:"Japonya'da en pahalı şey nedir?"},
  {id:"pd31",lesson:13,pattern:"～が ほしいです",cue:"あたらしい　パソコン",answer:"あたらしいパソコンがほしいです",hint:"Yeni bilgisayar istiyorum."},
  {id:"pd32",lesson:13,pattern:"～を ～たいです",cue:"すし / たべます",answer:"すしをたべたいです",hint:"Suşi yemek istiyorum."},
  {id:"pd33",lesson:13,pattern:"～を ～に いきます",cue:"かいもの / スーパー",answer:"スーパーへかいものにいきます",hint:"Markete alışverişe gidiyorum."},
  {id:"pd34",lesson:14,pattern:"～て ください",cue:"まどをあけます",answer:"まどをあけてください",hint:"Pencereyi açın lütfen."},
  {id:"pd35",lesson:14,pattern:"～ましょうか",cue:"にもつをもちます",answer:"にもつをもちましょうか",hint:"Bavulu taşıyayım mı?"},
  {id:"pd36",lesson:14,pattern:"～て います",cue:"ミラーさん / でんわをかけます",answer:"ミラーさんはでんわをかけています",hint:"Miller telefonda konuşuyor."},
  {id:"pd37",lesson:15,pattern:"～ても いいですか",cue:"しゃしんをとります",answer:"しゃしんをとってもいいですか",hint:"Fotoğraf çekebilir miyim?"},
  {id:"pd38",lesson:15,pattern:"～ては いけません",cue:"ここでたばこをすいます",answer:"ここでたばこをすってはいけません",hint:"Burada sigara içilmez."},
  {id:"pd39",lesson:15,pattern:"～て います (状態)",cue:"けっこんします",answer:"けっこんしています",hint:"Evli."},
];

const GRAMMAR_QA = [
  {id:"qa1",lesson:1,question:"おなまえは？",answer:"わたしは___です",hint:"Adınız ne? → 私は〜です と答えてください",example:"わたしはミラーです"},
  {id:"qa2",lesson:1,question:"おしごとは　なんですか。",answer:"___です",hint:"İşiniz ne? → 〜です と答えてください",example:"エンジニアです"},
  {id:"qa3",lesson:2,question:"それは　なんですか。",answer:"___です",hint:"Bu ne? → 〜です と答えてください",example:"じしょです"},
  {id:"qa4",lesson:2,question:"これは　だれの　かばんですか。",answer:"___の　かばんです",hint:"Bu kimin çantası? → 〜のかばんです",example:"わたしのかばんです"},
  {id:"qa5",lesson:3,question:"トイレは　どこですか。",answer:"___です",hint:"Tuvalet nerede? → 〜です と答えてください",example:"あそこです"},
  {id:"qa6",lesson:3,question:"このかばんは　いくらですか。",answer:"___えんです",hint:"Bu çanta ne kadar? → 〜円です",example:"３５００えんです"},
  {id:"qa7",lesson:4,question:"まいあさ　なんじに　おきますか。",answer:"___じに　おきます",hint:"Her sabah saat kaçta kalkıyorsunuz?",example:"７じにおきます"},
  {id:"qa8",lesson:4,question:"きのう　どこへ　いきましたか。",answer:"___へ　いきました",hint:"Dün nereye gittiniz?",example:"スーパーへいきました"},
  {id:"qa9",lesson:5,question:"なんで　がっこうへ　いきますか。",answer:"___で　いきます",hint:"Okula ne ile gidiyorsunuz?",example:"でんしゃでいきます"},
  {id:"qa10",lesson:5,question:"だれと　にほんへ　きましたか。",answer:"___と　きました",hint:"Japonya'ya kiminle geldiniz?",example:"ともだちときました"},
  {id:"qa11",lesson:6,question:"まいにち　なにを　たべますか。",answer:"___を　たべます",hint:"Her gün ne yiyorsunuz?",example:"ごはんをたべます"},
  {id:"qa12",lesson:6,question:"どこで　にほんごを　べんきょうしますか。",answer:"___で　べんきょうします",hint:"Japonca'yı nerede çalışıyorsunuz?",example:"がっこうでべんきょうします"},
  {id:"qa13",lesson:7,question:"もう　ひるごはんを　たべましたか。",answer:"はい、もう___。／いいえ、まだです。",hint:"Öğle yemeğini yedini mi?",example:"はい、もうたべました"},
  {id:"qa14",lesson:8,question:"あなたの　まちは　どうですか。",answer:"___ですが、___です",hint:"Şehriniz nasıl? → 〜ですが、〜です",example:"にぎやかですが、べんりです"},
  {id:"qa15",lesson:8,question:"この　りょうりは　おいしいですか。",answer:"はい、とても___。／いいえ、あまり___。",hint:"Bu yemek lezzetli mi?",example:"はい、とてもおいしいです"},
  {id:"qa16",lesson:9,question:"どんな　おんがくが　すきですか。",answer:"___が　すきです",hint:"Ne tür müzik seviyorsunuz?",example:"クラシックがすきです"},
  {id:"qa17",lesson:9,question:"どうして　きのう　がっこうを　やすみましたか。",answer:"___から　です",hint:"Dün neden okula gelmediniz?",example:"びょうきでしたから"},
  {id:"qa18",lesson:10,question:"つくえの　うえに　なにが　ありますか。",answer:"___が　あります",hint:"Masanın üstünde ne var?",example:"ほんとペンがあります"},
  {id:"qa19",lesson:10,question:"ちかくに　ぎんこうが　ありますか。",answer:"はい、___に　あります。／いいえ、ありません。",hint:"Yakında banka var mı?",example:"はい、えきのまえにあります"},
  {id:"qa20",lesson:11,question:"かぞくは　なんにん　ですか。",answer:"___にん　です",hint:"Aileniz kaç kişi?",example:"４にんです"},
  {id:"qa21",lesson:11,question:"えきまで　どのくらい　かかりますか。",answer:"___ふん　かかります",hint:"İstasyona kaç dakika sürer?",example:"１０ふんかかります"},
  {id:"qa22",lesson:12,question:"りょこうは　どうでしたか。",answer:"___かったです",hint:"Seyahat nasıldı? → 〜かったです",example:"たのしかったです"},
  {id:"qa23",lesson:12,question:"うみと　やまと　どちらが　すきですか。",answer:"___の　ほうが　すきです",hint:"Deniz mi dağ mı?",example:"うみのほうがすきです"},
  {id:"qa24",lesson:13,question:"いま　なにが　いちばん　ほしいですか。",answer:"___が　ほしいです",hint:"Şu an en çok ne istiyorsunuz?",example:"あたらしいパソコンがほしいです"},
  {id:"qa25",lesson:13,question:"やすみは　どこへ　いきたいですか。",answer:"___へ　いきたいです",hint:"Tatilde nereye gitmek istiyorsunuz?",example:"おきなわへいきたいです"},
  {id:"qa26",lesson:14,question:"すみません、この　かんじの　よみかたを　おしえて　ください。",answer:"「___」ですよ",hint:"Bu kanjinin okunuşu nedir?",example:"「にほん」ですよ"},
  {id:"qa27",lesson:14,question:"さとうさんは　いま　どこに　いますか。",answer:"いま___て　います",hint:"Sato şu an nerede/ne yapıyor?",example:"いまかいぎしつではなしています"},
  {id:"qa28",lesson:15,question:"ここで　しゃしんを　とっても　いいですか。",answer:"はい、___。／すみません、ちょっと___。",hint:"Burada fotoğraf çekebilir miyim?",example:"はい、どうぞ"},
  {id:"qa29",lesson:15,question:"けっこんして　いますか。",answer:"はい、___います。／いいえ、___です。",hint:"Evli misiniz?",example:"はい、けっこんしています"},
];

const GRAMMAR_TRANS = [
  {id:"tr1",lesson:1,turkish:"Ben öğrenciyim.",answer:"わたしはがくせいです",hint:"は + です"},
  {id:"tr2",lesson:1,turkish:"Miller şirket çalışanı değil.",answer:"ミラーさんはかいしゃいんじゃありません",hint:"は + じゃありません"},
  {id:"tr3",lesson:1,turkish:"Karina da öğrenci.",answer:"カリナさんもがくせいです",hint:"も + です"},
  {id:"tr4",lesson:2,turkish:"Bu benim sözlüğüm.",answer:"これはわたしのじしょです",hint:"これは + の + です"},
  {id:"tr5",lesson:2,turkish:"O çanta kimin?",answer:"あのかばんはだれのですか",hint:"あの + は + だれの + ですか"},
  {id:"tr6",lesson:3,turkish:"Tuvalet nerede?",answer:"トイレはどこですか",hint:"は + どこ + ですか"},
  {id:"tr7",lesson:3,turkish:"Bu saat 18.600 yen.",answer:"このとけいは１８６００えんです",hint:"この + は + 円 + です"},
  {id:"tr8",lesson:4,turkish:"Her sabah saat 6'da kalkıyorum.",answer:"まいあさ６じにおきます",hint:"まいあさ + 時 + に + 動詞"},
  {id:"tr9",lesson:4,turkish:"Dün çalışmadım.",answer:"きのうべんきょうしませんでした",hint:"きのう + 動詞 + ませんでした"},
  {id:"tr10",lesson:4,turkish:"Banka 9'dan 5'e kadar.",answer:"ぎんこうは９じから５じまでです",hint:"から + まで"},
  {id:"tr11",lesson:5,turkish:"Shinkansen ile Tokyo'ya gidiyorum.",answer:"しんかんせんでとうきょうへいきます",hint:"で(手段) + へ + いきます"},
  {id:"tr12",lesson:5,turkish:"Arkadaşımla Japonya'ya geldim.",answer:"ともだちとにほんへきました",hint:"と(相手) + へ + きました"},
  {id:"tr13",lesson:6,turkish:"Kütüphanede kitap okuyorum.",answer:"としょかんでほんをよみます",hint:"で(場所) + を + 動詞"},
  {id:"tr14",lesson:6,turkish:"Birlikte tenis oynamaz mısınız?",answer:"いっしょにテニスをしませんか",hint:"いっしょに + を + ませんか"},
  {id:"tr15",lesson:6,turkish:"İstasyonda buluşalım.",answer:"えきであいましょう",hint:"で + ましょう"},
  {id:"tr16",lesson:7,turkish:"Anneme hediye veriyorum.",answer:"ははにプレゼントをあげます",hint:"に(相手) + を + あげます"},
  {id:"tr17",lesson:7,turkish:"Öğle yemeğini henüz yemedim.",answer:"まだひるごはんをたべていません",hint:"まだ + ていません"},
  {id:"tr18",lesson:8,turkish:"Fuji yüksek bir dağ.",answer:"ふじさんはたかいやまです",hint:"い-sıfat + 名詞 + です"},
  {id:"tr19",lesson:8,turkish:"Osaka kalabalık ama yemek de pahalı.",answer:"おおさかはにぎやかですがたべものもたかいです",hint:"ですが + も"},
  {id:"tr20",lesson:8,turkish:"Pek soğuk değil.",answer:"あまりさむくないです",hint:"あまり + くない"},
  {id:"tr21",lesson:9,turkish:"Futbolu seviyorum.",answer:"サッカーがすきです",hint:"が + すきです"},
  {id:"tr22",lesson:9,turkish:"Zamanım olmadığı için gitmiyorum.",answer:"じかんがありませんからいきません",hint:"ありません + から"},
  {id:"tr23",lesson:10,turkish:"Masanın üstünde kitap var.",answer:"つくえのうえにほんがあります",hint:"の上に + が + あります"},
  {id:"tr24",lesson:10,turkish:"Bahçede kimse yok.",answer:"にわにだれもいません",hint:"に + だれも + いません"},
  {id:"tr25",lesson:10,turkish:"Postane istasyonun önünde.",answer:"ゆうびんきょくはえきのまえにあります",hint:"は + の前に + あります"},
  {id:"tr26",lesson:11,turkish:"3 pul ve 2 kartpostal lütfen.",answer:"きってを３まいとはがきを２まいください",hint:"を + 枚 + と + を + 枚 + ください"},
  {id:"tr27",lesson:11,turkish:"Osaka'dan Tokyo'ya Shinkansen ile 2,5 saat sürer.",answer:"おおさかからとうきょうまでしんかんせんで２じかんはんかかります",hint:"から + まで + で + 時間半 + かかります"},
  {id:"tr28",lesson:12,turkish:"Seyahat eğlenceliydi.",answer:"りょこうはたのしかったです",hint:"い-sıfat + かったです"},
  {id:"tr29",lesson:12,turkish:"Tokyo, Osaka'dan büyük.",answer:"とうきょうはおおさかよりおおきいです",hint:"は + より + 比較"},
  {id:"tr30",lesson:12,turkish:"Japon yemeklerinde en çok neyi seviyorsunuz?",answer:"にほんりょうりでなにがいちばんすきですか",hint:"で + が + いちばん + すきですか"},
  {id:"tr31",lesson:13,turkish:"Yeni bilgisayar istiyorum.",answer:"あたらしいパソコンがほしいです",hint:"が + ほしいです"},
  {id:"tr32",lesson:13,turkish:"Suşi yemek istiyorum.",answer:"すしをたべたいです",hint:"を + たいです"},
  {id:"tr33",lesson:13,turkish:"Markete alışverişe gidiyorum.",answer:"スーパーへかいものにいきます",hint:"へ + 目的に + いきます"},
  {id:"tr34",lesson:14,turkish:"Pencereyi açın lütfen.",answer:"まどをあけてください",hint:"を + て形 + ください"},
  {id:"tr35",lesson:14,turkish:"Miller şu an toplantı odasında konuşuyor.",answer:"ミラーさんはいまかいぎしつではなしています",hint:"は + に + て形 + います"},
  {id:"tr36",lesson:15,turkish:"Fotoğraf çekebilir miyim?",answer:"しゃしんをとってもいいですか",hint:"を + て形 + もいいですか"},
  {id:"tr37",lesson:15,turkish:"Burada sigara içilmez.",answer:"ここでたばこをすってはいけません",hint:"で + を + て形 + はいけません"},
  {id:"tr38",lesson:15,turkish:"Maria Osaka'da yaşıyor.",answer:"マリアさんはおおさかにすんでいます",hint:"は + に + て形 + います"},
];

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

function makeNumberQ(item, dataType) {
  // dataType: "number" | "time"
  // Always: show character, ask reading
  const color = dataType === "time" ? "#16a085" : "#8e44ad";
  const label = dataType === "time" ? "時間" : "数字";
  return {
    uid: item.id + "_r",
    id: item.id, kind: dataType,
    typeColor: color, typeLabel: label,
    subLabel: dataType === "time" ? "Saat" : "Sayı",
    char: item.char, tr: item.tr, read: item.read, ex: item.ex||null,
    showFurigana: false,
    promptLabel: "Okuyuş",
    promptLine: "Japonca okuyuşunu hiragana ile yaz:",
    answer: item.read,
    isJpAnswer: true, isKun: false,
    mnemoType: "vocab",
    extraRows: [{label:"Anlam", val:item.tr, jp:false}],
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

  if (cfg.mode==="numbers") {
    const lessonFilter = cfg.numType || "all";
    const pool = lessonFilter==="time" ? TIMES : lessonFilter==="number" ? NUMBERS : [...NUMBERS, ...TIMES];
    shuffle(pool).slice(0, 20).forEach(item => {
      qs.push(makeNumberQ(item, TIMES.some(t=>t.id===item.id) ? "time" : "number"));
    });
    return shuffle(qs);
  }

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
function SettingsPage({onStart,onBrowse,onGrammar}){
  const [mode,setMode]=useState("vocab");
  const [wordType,setWT]=useState("all");
  const [wordDir,setWD]=useState("jp_to_tr");
  const [kanjiL,setKL]=useState("all");
  const [kanjiMode,setKM]=useState("both");
  const [numType,setNumType]=useState("all");
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
      <div style={{textAlign:"center",marginBottom:28,position:"relative"}}>
        <div style={{fontSize:11,color:C.textDim,letterSpacing:4,marginBottom:6}}>MINNA NO NIHONGO</div>
        <div style={{fontSize:40,fontFamily:"'Noto Serif JP',serif",fontWeight:700,color:C.text}}>日本語 SRS</div>
        <div style={{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",display:"flex",gap:6}}>
          <button onClick={()=>onGrammar()} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,color:C.textMid,cursor:"pointer",fontFamily:"'Noto Sans JP',sans-serif"}}>文法</button>
          <button onClick={()=>onBrowse()} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,color:C.textMid,cursor:"pointer",fontFamily:"'Noto Sans JP',sans-serif"}}>📚</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
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

      {mode==="numbers"&&(
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderTop:"4px solid #8e44ad",borderRadius:8,padding:"18px 18px 10px",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:"#8e44ad",marginBottom:14,letterSpacing:1}}>数字 AYARLARI</div>
          <Sec title="Tür">
            <Btn val="all"    cur={numType||"all"} set={v=>setNumType(v)} color="#8e44ad">Tümü ({NUMBERS.length+TIMES.length})</Btn>
            <Btn val="number" cur={numType||"all"} set={v=>setNumType(v)} color="#8e44ad">Sayılar ({NUMBERS.length})</Btn>
            <Btn val="time"   cur={numType||"all"} set={v=>setNumType(v)} color="#8e44ad">Saatler ({TIMES.length})</Btn>
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

      <button onClick={()=>onStart({mode,wordType,wordDir,kanjiLesson:kanjiL,kanjiMode,skipPreview,numType})} style={{
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

// ══════════════════════════════════════════════════════════
// BROWSE PAGE — tüm kelimeler, kanjiler, bileşik kelimeler
// ══════════════════════════════════════════════════════════
function BrowsePage({onBack}) {
  const [tab, setTab] = useState("words");      // words | kanji | kanjiwords
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [lessonFilter, setLessonFilter] = useState("all");

  const lessons = ["all", ...Array.from(new Set(KANJI.map(k=>k.lesson))).sort((a,b)=>a-b)];

  const filteredWords = WORDS.filter(w => {
    const matchType = typeFilter==="all" || w.sub===typeFilter;
    const matchSearch = !search || w.char.includes(search) || w.read.includes(search) || w.tr.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const filteredKanji = KANJI.filter(k => {
    const matchLesson = lessonFilter==="all" || k.lesson===Number(lessonFilter);
    const matchSearch = !search || k.k.includes(search) || k.kun.includes(search) || k.tr.toLowerCase().includes(search.toLowerCase());
    return matchLesson && matchSearch;
  });

  const filteredKW = KANJI_WORDS.filter(w => {
    const matchLesson = lessonFilter==="all" || w.lesson===Number(lessonFilter);
    const matchSearch = !search || w.word.includes(search) || w.read.includes(search) || w.tr.toLowerCase().includes(search.toLowerCase());
    return matchLesson && matchSearch;
  });

  const tabColor = tab==="words"?C.vocab:tab==="kanji"?C.kanji:"#c0392b";

  return (
    <div style={{maxWidth:620,width:"100%",margin:"0 auto",paddingBottom:48}}>
      {/* Header */}
      <div style={{background:C.navBg,padding:"0 16px",display:"flex",alignItems:"center",gap:16,height:48,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"#ccc",fontSize:18,cursor:"pointer"}}>⌂</button>
        <span style={{color:"#f0f0f0",fontSize:14,fontWeight:700,letterSpacing:1}}>TÜM LİSTE</span>
        <span style={{color:"#666",fontSize:12,marginLeft:"auto"}}>
          {tab==="words"?`${filteredWords.length} kelime`:tab==="kanji"?`${filteredKanji.length} kanji`:`${filteredKW.length} bileşik`}
        </span>
      </div>

      <div style={{padding:"16px 16px 0"}}>
        {/* Tabs */}
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {[
            {val:"words",  label:"単語 Kelimeler", color:C.vocab,  cnt:WORDS.length},
            {val:"kanji",  label:"漢字 Kanji",     color:C.kanji,  cnt:KANJI.length},
            {val:"kanjiwords", label:"漢字語 Bileşik", color:"#c0392b", cnt:KANJI_WORDS.length},
          ].map(({val,label,color,cnt})=>(
            <button key={val} onClick={()=>{setTab(val);setSearch("");setTypeFilter("all");setLessonFilter("all");}} style={{
              flex:1,padding:"10px 6px",borderRadius:6,cursor:"pointer",
              border:`2px solid ${tab===val?color:C.border}`,
              background:tab===val?color:"#fff",
              color:tab===val?"#fff":C.textMid,
              fontSize:11,fontWeight:tab===val?700:400,
              fontFamily:"'Noto Sans JP',sans-serif",
              transition:"all .15s",lineHeight:1.4,
            }}>
              <div>{label}</div>
              <div style={{opacity:.7,fontSize:10}}>{cnt} öğe</div>
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Japonca veya Türkçe ara..."
          style={{width:"100%",padding:"10px 14px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:14,outline:"none",marginBottom:10,fontFamily:"'Noto Serif JP',serif"}}
        />

        {/* Filters */}
        {tab==="words" && (
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            {["all","Fiil","い-Sıfat","な-Sıfat","İsim"].map(s=>{
              const a=typeFilter===s;
              return <button key={s} onClick={()=>setTypeFilter(s)} style={{
                padding:"4px 10px",borderRadius:20,fontSize:11,cursor:"pointer",
                border:`1px solid ${a?C.vocab:C.border}`,
                background:a?C.vocab+"18":"#fff",color:a?C.vocab:C.textDim,
              }}>{s==="all"?"Tümü":s}</button>;
            })}
          </div>
        )}
        {(tab==="kanji"||tab==="kanjiwords") && (
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            {lessons.map(l=>{
              const a=lessonFilter===String(l);
              const color=tab==="kanji"?C.kanji:"#c0392b";
              return <button key={l} onClick={()=>setLessonFilter(String(l))} style={{
                padding:"4px 10px",borderRadius:20,fontSize:11,cursor:"pointer",
                border:`1px solid ${a?color:C.border}`,
                background:a?color+"18":"#fff",color:a?color:C.textDim,
              }}>{l==="all"?"Tümü":`Ders ${l}`}</button>;
            })}
          </div>
        )}
      </div>

      {/* List */}
      <div style={{padding:"0 16px"}}>

        {/* WORDS */}
        {tab==="words" && filteredWords.map(w=>(
          <div key={w.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={{
              minWidth:56,height:56,background:C.vocab,borderRadius:8,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:w.char.length>4?16:w.char.length>2?20:26,
              fontFamily:"'Noto Serif JP',serif",color:"#fff",fontWeight:700,flexShrink:0,
            }}>{w.char}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                <span style={{fontSize:10,color:C.vocab,fontWeight:700,letterSpacing:1}}>{w.sub}</span>
              </div>
              <div style={{fontSize:13,fontFamily:"'Noto Serif JP',serif",color:"#888",marginBottom:2}}>{w.read}</div>
              <div style={{fontSize:14,fontWeight:700,color:C.text}}>{w.tr}</div>
            </div>
            {w.ex && <div style={{fontSize:11,color:C.textDim,fontFamily:"'Noto Serif JP',serif",maxWidth:160,textAlign:"right",lineHeight:1.5}}>{w.ex.split("—")[1]?.trim()}</div>}
          </div>
        ))}

        {/* KANJI */}
        {tab==="kanji" && filteredKanji.map(k=>(
          <div key={k.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={{
              minWidth:56,height:56,background:C.kanji,borderRadius:8,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:36,fontFamily:"'Noto Serif JP',serif",color:"#fff",fontWeight:700,flexShrink:0,
            }}>{k.k}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:10,color:C.kanji,fontWeight:700,letterSpacing:1,marginBottom:2}}>Ders {k.lesson}</div>
              <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:2}}>{k.tr}</div>
              <div style={{display:"flex",gap:10}}>
                <span style={{fontSize:12,fontFamily:"'Noto Serif JP',serif",color:"#888"}}>kun: {k.kun}</span>
                <span style={{fontSize:12,fontFamily:"'Noto Serif JP',serif",color:"#aaa"}}>on: {k.on}</span>
              </div>
            </div>
            {k.ex && <div style={{fontSize:10,color:C.textDim,fontFamily:"'Noto Serif JP',serif",maxWidth:160,textAlign:"right",lineHeight:1.6}}>{k.ex.split(";")[0]}</div>}
          </div>
        ))}

        {/* KANJI WORDS */}
        {tab==="kanjiwords" && filteredKW.map(w=>(
          <div key={w.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={{
              minWidth:56,height:56,background:"#c0392b",borderRadius:8,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:w.word.length>4?16:w.word.length>2?22:30,
              fontFamily:"'Noto Serif JP',serif",color:"#fff",fontWeight:700,flexShrink:0,
            }}>{w.word}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:10,color:"#c0392b",fontWeight:700,letterSpacing:1,marginBottom:2}}>Ders {w.lesson}</div>
              <div style={{fontSize:13,fontFamily:"'Noto Serif JP',serif",color:"#888",marginBottom:2}}>{w.read}</div>
              <div style={{fontSize:14,fontWeight:700,color:C.text}}>{w.tr}</div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {((tab==="words"&&filteredWords.length===0)||(tab==="kanji"&&filteredKanji.length===0)||(tab==="kanjiwords"&&filteredKW.length===0)) && (
          <div style={{textAlign:"center",padding:"40px 0",color:C.textDim,fontSize:14}}>Sonuç bulunamadı</div>
        )}
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════
// GRAMMAR LESSON PREVIEW
// ══════════════════════════════════════════════════════════
function LessonSummaryCard({ lessonNum, onClose }) {
  const data = LESSON_SUMMARIES[lessonNum];
  if (!data) return null;
  const ACCENT = "#16a085";
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#fff",borderRadius:16,maxWidth:560,width:"100%",maxHeight:"85vh",overflow:"auto",boxShadow:"0 20px 60px #0008"}}>
        {/* Header */}
        <div style={{background:ACCENT,padding:"20px 24px",borderRadius:"16px 16px 0 0",position:"sticky",top:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:"rgba(255,255,255,.7)",fontSize:11,letterSpacing:2,marginBottom:4}}>第{lessonNum}課 · DERS {lessonNum}</div>
              <div style={{color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'Noto Serif JP',serif"}}>{data.title}</div>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontSize:13,fontWeight:700}}>✕</button>
          </div>
        </div>

        <div style={{padding:"20px 24px"}}>
          {/* Patterns */}
          <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.textDim,marginBottom:12}}>文型 CÜMLE YAPILARI</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
            {data.patterns.map((p,i)=>(
              <div key={i} style={{background:"#f8fffe",border:`1px solid ${ACCENT}33`,borderLeft:`4px solid ${ACCENT}`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{display:"flex",gap:8,alignItems:"baseline",flexWrap:"wrap",marginBottom:6}}>
                  <span style={{fontFamily:"'Noto Serif JP',serif",fontSize:15,color:C.text,fontWeight:700}}>{p.pattern}</span>
                  <span style={{color:C.textDim,fontSize:12}}>→ {p.tr}</span>
                </div>
                <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:13,color:ACCENT,borderTop:`1px dashed ${ACCENT}33`,paddingTop:6}}>
                  例: {p.example}
                </div>
              </div>
            ))}
          </div>

          {/* Vocab */}
          <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.textDim,marginBottom:10}}>重要語彙 ÖNEMLİ KELİMELER</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
            {data.vocab.map((v,i)=>(
              <span key={i} style={{background:`${ACCENT}12`,border:`1px solid ${ACCENT}33`,color:ACCENT,borderRadius:20,padding:"4px 12px",fontSize:12,fontFamily:"'Noto Serif JP',serif"}}>{v}</span>
            ))}
          </div>

          {/* Tip */}
          <div style={{background:"#fffdf0",border:"1px solid #f0e68c",borderRadius:8,padding:"12px 14px",fontSize:13,color:"#555",lineHeight:1.7}}>
            {data.tip}
          </div>
        </div>

        <div style={{padding:"0 24px 20px"}}>
          <button onClick={onClose} style={{width:"100%",background:ACCENT,border:"none",borderRadius:8,padding:"14px 0",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>
            Alıştırmaya Başla →
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// GRAMMAR PAGE
// ══════════════════════════════════════════════════════════
function GrammarPage({ onBack }) {
  const [exerciseType, setExerciseType] = useState(null);
  const [lessonFilter, setLessonFilter] = useState("all");
  const [showLesson, setShowLesson] = useState(null); // lesson number to preview
  const [queue, setQueue] = useState([]);
  const [qi, setQi] = useState(0);
  const [ans, setAns] = useState("");
  const [submitted, setSub] = useState(false);
  const [correct, setOk] = useState(null);
  const [stats, setStats] = useState({c:0,w:0});
  const [scrambleParts, setScrambleParts] = useState([]);
  const [scrambleInput, setScrambleInput] = useState([]);
  const inputRef = useRef(null);
  const ACCENT = "#16a085";

  const TYPES = [
    {val:"scramble",   label:"🔀 Scramble",       desc:"Parçaları doğru sıraya diz",       data:GRAMMAR_SCRAMBLE},
    {val:"fill",       label:"✏️ Boşluk Doldur",  desc:"Eksik parçayı seç",                data:GRAMMAR_FILL},
    {val:"fill_soru",  label:"❓ Soru Kelimeleri", desc:"なに・だれ・どこ・いつ・いくら",     data:GRAMMAR_FILL.filter(q=>q.category==="soru")},
    {val:"fill_part",  label:"🔗 Partikül",        desc:"は・を・に・で・へ・と・から・まで", data:GRAMMAR_FILL.filter(q=>q.category==="particle")},
    {val:"pattern",    label:"🏗 Yapı Drill",      desc:"Yapı + ipucu → cümle kur",         data:GRAMMAR_PATTERN},
    {val:"qa",         label:"💬 Soru-Cevap",      desc:"Soruyu Japonca cevaplayın",        data:GRAMMAR_QA},
    {val:"translation",label:"🔤 Çeviri",          desc:"Türkçe'den Japonca'ya çevir",      data:GRAMMAR_TRANS},
  ];

  const lessons = ["all",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  const startQuiz = (type) => {
    const src = TYPES.find(t=>t.val===type).data;
    const pool = lessonFilter==="all" ? src : src.filter(q=>q.lesson===Number(lessonFilter));
    const q = shuffle([...pool]).slice(0,15);
    // fill_soru and fill_part run as fill exercises
    const effectiveType = (type==="fill_soru"||type==="fill_part") ? "fill" : type;
    setQueue(q); setQi(0); setAns(""); setSub(false); setOk(null);
    setStats({c:0,w:0}); setExerciseType(effectiveType);
    if (effectiveType==="scramble" && q.length>0) initScramble(q[0]);
  };

  const initScramble = (q) => {
    setScrambleParts(shuffle([...q.parts]));
    setScrambleInput([]);
  };

  const q = queue[qi];

  useEffect(()=>{
    if(!submitted && inputRef.current && exerciseType!=="scramble" && exerciseType!=="fill") {
      inputRef.current.focus();
    }
  },[qi,submitted,exerciseType]);

  const checkAnswer = (userAns) => {
    const norm = s => s.trim().replace(/\s+/g,"").replace(/[。、？！]/g,"");
    const correct = norm(userAns) === norm(q.answer) ||
      // also accept partial for qa
      (exerciseType==="qa" && norm(q.answer).includes("___") ? true : false);
    return norm(userAns) === norm(q.answer);
  };

  const submit = async (userAns) => {
    if (!q || submitted) return;
    const ua = userAns || ans;
    if (!ua.trim() && exerciseType!=="scramble") return;

    // For scramble, check assembled string
    const finalAns = exerciseType==="scramble"
      ? scrambleInput.join("")
      : ua;

    // Use AI for translation and qa (flexible)
    let ok = checkAnswer(finalAns);
    if (!ok && (exerciseType==="translation" || exerciseType==="qa" || exerciseType==="pattern")) {
      try {
        const r = await fetch("https://api.anthropic.com/v1/messages",{
          method:"POST",
          headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},
          body:JSON.stringify({
            model:"claude-sonnet-4-20250514", max_tokens:10,
            system:"Japonca dilbilgisi alıştırması değerlendirici. Sadece DOGRU veya YANLIS yaz. Anlam aynıysa, küçük farklar varsa veya eşdeğer yapıysa DOGRU kabul et.",
            messages:[{role:"user",content:`Doğru cevap: "${q.answer}"
Kullanıcı cevabı: "${finalAns}"
DOGRU mu YANLIS mi?`}]
          })
        });
        const d = await r.json();
        ok = d.content?.[0]?.text?.trim().toUpperCase()==="DOGRU";
      } catch { ok = checkAnswer(finalAns); }
    }

    setOk(ok); setSub(true);
    setStats(s=>({...s, [ok?"c":"w"]: s[ok?"c":"w"]+1}));
  };

  const next = () => {
    if (qi+1 >= queue.length) { setExerciseType("done"); return; }
    setQi(i=>i+1); setAns(""); setSub(false); setOk(null);
    if (exerciseType==="scramble") initScramble(queue[qi+1]);
  };

  // ── SETTINGS ──
  if (!exerciseType || exerciseType==="done") {
    const acc = stats.c+stats.w>0 ? Math.round(stats.c/(stats.c+stats.w)*100) : null;
    return (
      <div style={{maxWidth:560,width:"100%",margin:"0 auto",padding:"0 16px 48px"}}>
        {/* Header */}
        <div style={{background:C.navBg,margin:"0 -16px",padding:"0 16px",height:48,display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:"#ccc",fontSize:18,cursor:"pointer"}}>⌂</button>
          <span style={{color:"#f0f0f0",fontSize:14,fontWeight:700}}>文法 GRAMER</span>
        </div>

        {exerciseType==="done" && acc!==null && (
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderTop:`4px solid ${ACCENT}`,borderRadius:8,padding:20,marginBottom:20,textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:8}}>{acc>=90?"🌸":acc>=70?"🌿":acc>=50?"🌱":"💪"}</div>
            <div style={{fontSize:20,fontWeight:700,color:ACCENT}}>{acc}% Başarı</div>
            <div style={{color:C.textDim,fontSize:13,marginTop:4}}>✓ {stats.c} Doğru &nbsp; ✗ {stats.w} Yanlış</div>
          </div>
        )}

        <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.textDim,marginBottom:10}}>ALIŞTİRMA TÜRÜ</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:20}}>
          {TYPES.map(t=>{
            const isSubType = t.val==="fill_soru"||t.val==="fill_part";
            const cnt = t.data.filter(q=>lessonFilter==="all"||q.lesson===Number(lessonFilter)).length;
            return (
              <div key={t.val} onClick={()=>cnt>0&&startQuiz(t.val)} style={{
                background:"#fff",
                border:`1px solid ${isSubType?"#e8e8e8":C.border}`,
                borderLeft:`4px solid ${isSubType?ACCENT+"66":ACCENT}`,
                borderRadius:8,
                padding:isSubType?"10px 16px 10px 24px":"14px 16px",
                cursor:cnt>0?"pointer":"not-allowed",
                opacity:cnt>0?1:0.4,
                display:"flex",alignItems:"center",gap:12,
                marginLeft:isSubType?12:0,
                transition:"all .15s",
              }}
                onMouseEnter={e=>{if(cnt>0)e.currentTarget.style.background="#f0faf8"}}
                onMouseLeave={e=>e.currentTarget.style.background="#fff"}
              >
                <div style={{fontSize:isSubType?16:22,minWidth:28}}>{t.label.split(" ")[0]}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:isSubType?12:14,color:C.text}}>{t.label.split(" ").slice(1).join(" ")}</div>
                  <div style={{fontSize:11,color:C.textDim,fontFamily:"'Noto Serif JP',serif"}}>{t.desc}</div>
                </div>
                <div style={{marginLeft:"auto",color:C.textDim,fontSize:11}}>{cnt} soru</div>
              </div>
            );
          })}
        </div>

        {/* Quick reference: particles */}
        <details style={{marginBottom:16}}>
          <summary style={{cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:2,color:ACCENT,padding:"8px 0"}}>🔗 PARTİKÜL HIZLI BAŞVURU</summary>
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",marginTop:8}}>
            {[
              ["は","Konu","わたしは がくせい です"],
              ["も","De/da","カリナさんも がくせい です"],
              ["の","Sahiplik","わたしの かさ"],
              ["を","Nesne","ほんを よみます"],
              ["に","Zaman/Yer/Kişi","６じに おきます／えきに います"],
              ["へ","Yön","がっこうへ いきます"],
              ["で","Eylem yeri/Araç","えきで かいます／でんしゃで いきます"],
              ["と","Birlikte/Ve","ともだちと きました"],
              ["から","Başlangıç","９じから"],
              ["まで","Bitiş","５じまで"],
              ["が","Özne/Sevgi/Yetenek","ねこが います／おんがくが すきです"],
              ["や","Kısmi liste","てがみや しゃしん"],
            ].map(([p,fn,ex])=>(
              <div key={p} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 14px",borderBottom:`1px solid #f5f5f5`}}>
                <span style={{fontFamily:"'Noto Serif JP',serif",fontSize:18,fontWeight:700,color:ACCENT,minWidth:28}}>{p}</span>
                <span style={{fontSize:11,color:C.textDim,minWidth:110}}>{fn}</span>
                <span style={{fontSize:11,fontFamily:"'Noto Serif JP',serif",color:C.text}}>{ex}</span>
              </div>
            ))}
          </div>
        </details>

        {/* Quick reference: question words */}
        <details style={{marginBottom:16}}>
          <summary style={{cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:2,color:"#e67e22",padding:"8px 0"}}>❓ SORU KELİMELERİ HIZLI BAŞVURU</summary>
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",marginTop:8}}>
            {[
              ["なに／なん","Ne?","これはなんですか"],
              ["だれ／どなた","Kim? (どなた kibar)","これはだれのですか"],
              ["どこ／どちら","Nerede? (どちら kibar)","トイレはどこですか"],
              ["なんじ","Saat kaç?","いまなんじですか"],
              ["なんようび","Hangi gün?","やすみはなんようびですか"],
              ["いつ","Ne zaman?","いつきましたか"],
              ["いくら","Ne kadar? (fiyat)","いくらですか"],
              ["どのくらい","Ne kadar? (süre/miktar)","どのくらいかかりますか"],
              ["なんで","Ne ile? (araç)","なんでいきますか"],
              ["どうして","Neden?","どうしてやすみましたか"],
              ["どんな","Nasıl bir?","どんなまちですか"],
            ].map(([q,tr,ex])=>(
              <div key={q} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 14px",borderBottom:`1px solid #f5f5f5`}}>
                <span style={{fontFamily:"'Noto Serif JP',serif",fontSize:13,fontWeight:700,color:"#e67e22",minWidth:90}}>{q}</span>
                <span style={{fontSize:11,color:C.textDim,minWidth:110}}>{tr}</span>
                <span style={{fontSize:11,fontFamily:"'Noto Serif JP',serif",color:C.text}}>{ex}</span>
              </div>
            ))}
          </div>
        </details>

        <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.textDim,marginBottom:10}}>DERS FİLTRESİ</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
          {lessons.map(l=>(
            <button key={l} onClick={()=>setLessonFilter(String(l))} style={{
              padding:"5px 12px",borderRadius:20,fontSize:11,cursor:"pointer",
              border:`1px solid ${lessonFilter===String(l)?ACCENT:C.border}`,
              background:lessonFilter===String(l)?ACCENT+"18":"#fff",
              color:lessonFilter===String(l)?ACCENT:C.textDim,
            }}>{l==="all"?"Tümü":`Ders ${l}`}</button>
          ))}
        </div>

        {/* Lesson summary cards */}
        {lessonFilter!=="all" && LESSON_SUMMARIES[Number(lessonFilter)] && (
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.textDim,marginBottom:10}}>DERS ÖZETİ</div>
            <div style={{background:"#fff",border:`1px solid ${C.border}`,borderLeft:`4px solid ${ACCENT}`,borderRadius:8,padding:"14px 16px",marginBottom:8,cursor:"pointer"}}
              onClick={()=>setShowLesson(Number(lessonFilter))}>
              <div style={{fontWeight:700,fontSize:13,color:ACCENT,marginBottom:4}}>第{lessonFilter}課 · {LESSON_SUMMARIES[Number(lessonFilter)].title}</div>
              <div style={{color:C.textDim,fontSize:12}}>Ders özetini ve cümle yapılarını gör →</div>
            </div>
          </div>
        )}

        {showLesson && <LessonSummaryCard lessonNum={showLesson} onClose={()=>setShowLesson(null)} />}
      </div>
    );
  }

  if (!q) return null;

  const pct = queue.length > 0 ? (qi/queue.length)*100 : 0;
  const headerBg = submitted ? (correct ? C.correct : C.wrong) : ACCENT;

  // ── QUIZ ──
  return (
    <div style={{width:"100%",maxWidth:640,margin:"0 auto"}}>
      {/* Nav */}
      <div style={{background:C.navBg,padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:44}}>
        <button onClick={()=>setExerciseType(null)} style={{background:"none",border:"none",color:"#ccc",fontSize:18,cursor:"pointer"}}>⌂</button>
        <div style={{display:"flex",gap:20}}>
          <span style={{color:"#aaa",fontSize:13}}>✓ {stats.c}</span>
          <span style={{color:"#aaa",fontSize:13}}>✗ {stats.w}</span>
          <span style={{color:"#aaa",fontSize:12}}>{qi+1}/{queue.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{height:6,background:"#ddd"}}>
        <div style={{height:"100%",width:`${pct}%`,background:ACCENT,transition:"width .4s"}}/>
      </div>

      {/* Header */}
      <div style={{background:headerBg,padding:"24px 20px",transition:"background .25s",minHeight:160,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        {/* Type badge */}
        <div style={{marginBottom:12}}>
          <span style={{background:"rgba(0,0,0,.2)",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:3}}>
            {TYPES.find(t=>t.val===exerciseType)?.label} · Ders {q.lesson}
          </span>
        </div>

        {/* Question content */}
        {exerciseType==="scramble" && (
          <div>
            <div style={{color:"rgba(255,255,255,.8)",fontSize:13,marginBottom:12}}>{q.hint}</div>
            {/* Selected parts */}
            <div style={{display:"flex",flexWrap:"wrap",gap:6,minHeight:40,marginBottom:10,padding:"8px",background:"rgba(0,0,0,.15)",borderRadius:6}}>
              {scrambleInput.map((p,i)=>(
                <button key={i} onClick={()=>{
                  setScrambleInput(prev=>prev.filter((_,j)=>j!==i));
                  setScrambleParts(prev=>[...prev,p]);
                }} style={{padding:"4px 12px",background:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontFamily:"'Noto Serif JP',serif",fontSize:14,color:ACCENT,fontWeight:700}}>
                  {p}
                </button>
              ))}
              {scrambleInput.length===0 && <span style={{color:"rgba(255,255,255,.4)",fontSize:12,padding:"8px"}}>パーツを選んでください...</span>}
            </div>
            {/* Available parts */}
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {scrambleParts.map((p,i)=>(
                <button key={i} onClick={()=>{
                  setScrambleParts(prev=>prev.filter((_,j)=>j!==i));
                  setScrambleInput(prev=>[...prev,p]);
                }} style={{padding:"4px 12px",background:"rgba(255,255,255,.9)",border:"none",borderRadius:4,cursor:"pointer",fontFamily:"'Noto Serif JP',serif",fontSize:14,color:C.text}}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {exerciseType==="fill" && (
          <div>
            <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:18,color:"#fff",lineHeight:1.8,marginBottom:8}}>
              {q.sentence.split("___").map((part,i,arr)=>(
                <span key={i}>{part}{i<arr.length-1 && <span style={{background:"rgba(255,255,255,.25)",padding:"2px 20px",borderRadius:3,margin:"0 2px"}}>　</span>}</span>
              ))}
            </div>
            <div style={{color:"rgba(255,255,255,.7)",fontSize:12}}>{q.hint}</div>
            {/* Choices */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
              {q.choices.map(c=>(
                <button key={c} onClick={()=>!submitted&&submit(c)} style={{
                  padding:"8px 16px",background:submitted?(c===q.blank?(correct?"#2ecc71":"#e74c3c"):"rgba(255,255,255,.15)"):"rgba(255,255,255,.9)",
                  border:"none",borderRadius:6,cursor:submitted?"default":"pointer",
                  fontFamily:"'Noto Serif JP',serif",fontSize:14,
                  color:submitted?(c===q.blank?"#fff":C.textDim):C.text,
                  fontWeight:c===q.blank&&submitted?700:400,
                }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {exerciseType==="pattern" && (
          <div>
            <div style={{background:"rgba(0,0,0,.15)",borderRadius:6,padding:"8px 12px",marginBottom:10,display:"inline-block"}}>
              <span style={{color:"rgba(255,255,255,.9)",fontSize:12,fontFamily:"'DM Mono',monospace"}}>パターン: </span>
              <span style={{color:"#fff",fontSize:13,fontWeight:700,fontFamily:"'Noto Serif JP',serif"}}>{q.pattern}</span>
            </div>
            <div style={{color:"rgba(255,255,255,.8)",fontSize:13,marginBottom:4}}>ヒント: {q.hint}</div>
            <div style={{color:"#fff",fontSize:20,fontFamily:"'Noto Serif JP',serif",fontWeight:700}}>{q.cue}</div>
          </div>
        )}

        {exerciseType==="qa" && (
          <div>
            <div style={{color:"rgba(255,255,255,.7)",fontSize:12,marginBottom:6}}>質問：</div>
            <div style={{color:"#fff",fontSize:22,fontFamily:"'Noto Serif JP',serif",fontWeight:700,marginBottom:8}}>{q.question}</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:12}}>💡 {q.hint}</div>
          </div>
        )}

        {exerciseType==="translation" && (
          <div>
            <div style={{color:"rgba(255,255,255,.7)",fontSize:12,marginBottom:8}}>Türkçe → Japonca</div>
            <div style={{color:"#fff",fontSize:22,fontWeight:700,marginBottom:8}}>{q.turkish}</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:12}}>💡 {q.hint}</div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{background:"#f9f9f9"}}>
        {exerciseType!=="fill" && (
          <div style={{display:"flex",borderBottom:`3px solid ${submitted?(correct?C.correct:C.wrong):"#ccc"}`,transition:"border-color .2s"}}>
            {exerciseType==="scramble" ? (
              <button onClick={()=>!submitted&&submit(scrambleInput.join(""))} disabled={submitted||scrambleInput.length===0} style={{
                flex:1,padding:"18px 24px",background:submitted?(correct?"#eafaf1":"#fdf0f0"):"#fff",
                border:"none",color:submitted?C.text:"#888",fontSize:16,fontFamily:"'Noto Serif JP',serif",textAlign:"left",
                cursor:"default",
              }}>
                {scrambleInput.length>0 ? scrambleInput.join("") : "↑ パーツを選んでください"}
              </button>
            ) : (
              <input ref={inputRef} type="text" value={ans}
                onChange={e=>setAns(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")submitted?next():submit(ans);}}
                placeholder="Japonca yaz..."
                disabled={submitted}
                style={{flex:1,padding:"18px 24px",background:submitted?(correct?"#eafaf1":"#fdf0f0"):"#fff",border:"none",outline:"none",fontSize:18,color:C.text,fontFamily:"'Noto Serif JP',serif",transition:"background .25s"}}
              />
            )}
            <button onClick={submitted?next:(exerciseType==="scramble"?()=>submit(scrambleInput.join("")):()=>submit(ans))}
              style={{padding:"0 28px",minWidth:110,background:submitted?(correct?C.correct:C.wrong):"#555",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",transition:"background .2s"}}>
              {submitted?"SONRAKI ›":"KONTROL"}
            </button>
          </div>
        )}

        {/* Feedback */}
        {submitted && (
          <div style={{padding:"16px 20px",background:correct?"#f0faf4":"#fdf3f3",borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{color:correct?C.correct:C.wrong,fontSize:17,fontWeight:700}}>{correct?"✓ Doğru!":"✗ Yanlış"}</span>
              {!correct&&<span style={{color:C.text,fontSize:14,fontFamily:"'Noto Serif JP',serif"}}>→ <strong style={{color:ACCENT}}>{q.answer}</strong></span>}
            </div>
            {exerciseType==="qa" && q.example && (
              <div style={{fontSize:13,color:C.textMid}}>例: <span style={{fontFamily:"'Noto Serif JP',serif",color:C.text}}>{q.example}</span></div>
            )}
            {exerciseType==="fill" && (
              <button onClick={next} style={{marginTop:10,width:"100%",background:"transparent",border:`1px solid ${ACCENT}33`,borderRadius:6,padding:"9px 0",color:ACCENT,fontSize:11,letterSpacing:2,cursor:"pointer"}}>SONRAKI →</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState("home"); // home | preview | quiz | summary | browse | grammar
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
        {screen==="home"&&<div style={{padding:"0 16px 48px"}}><SettingsPage onStart={handleStart} onBrowse={()=>setScreen("browse")} onGrammar={()=>setScreen("grammar")}/></div>}
        {screen==="grammar"&&<GrammarPage onBack={()=>setScreen("home")}/>}
        {screen==="browse"&&<BrowsePage onBack={()=>setScreen("home")}/>}
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
