# Osmani membasının gayesi nedir?

Latin harflerinin bulunduğu klavyeden Osmanlı Türkçesi yazabilmek için hazırlanmıştır.
Klavyeden basılan harfin yerine Osmani mukabilini yazar.

## Nasıl Kullanılır?

Bu memba React ile hazırlanan sahifelerde kullanılmak için geliştirilmiştir.
Sırası ile aşağıdaki adımları takip edelim:

Membayı projemize dahil ederiz:

```
  npm install osmani
```

**useOsmani** çengelini unsura dahil ederiz:

```
  const [kelime, metinSahasıİması] = useOsmani({
    aramaTalepEdilince: araKelimeyi,
  });

```

Bu çengel **[kelime, metinSahasıİması]** dizisini cevaben iletir.
**metinSahasıİması**, **input** unsurunun **ref** hususiyetine tanıtılmalıdır.
Bu sayede **useOsmani** **input** sahası seçiliyken basılan harfleri dinleyecek ve işbu harfleri
Osmani mubakilleri ile değiştirecektir. Osmani Elifba ile yazılmış **kelime** evvelki dizi ile
çengelden alınmıştı. **input** sahasının **defaulValue** kısmına işbu **kelime** tanıtılmalıdır.

```
<input
  ref={metinSahasıİması}
  dir="rtl"
  type="text"
  placeholder="كلمه"
  defaultValue={kelime}
/>
```
