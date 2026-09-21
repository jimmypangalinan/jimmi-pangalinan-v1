import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, "source");
const C = { wine:"#8B2448", wine2:"#63162F", ink:"#262327", ivory:"#F8F4EF", blush:"#F1E1E7", muted:"#716A6E", white:"#FFFFFF", green:"#438D68" };
const files = {};
for (const name of fs.readdirSync(src)) if (/\.(png|jpg|jpeg)$/i.test(name)) files[name] = `data:image/${name.endsWith(".png")?"png":"jpeg"};base64,${fs.readFileSync(path.join(src,name)).toString("base64")}`;
const esc = s => String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const text = (a,x,y,size,color=C.ink,weight=700,gap=1.14,anchor="start",extra="") => `<text x="${x}" y="${y}" fill="${color}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${size>44?-1.5:0}" ${extra}>${a.map((s,i)=>`<tspan x="${x}" dy="${i?size*gap:0}">${esc(s)}</tspan>`).join("")}</text>`;
const defs = `<defs><filter id="sh" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#24151C" flood-opacity=".2"/></filter><linearGradient id="wg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#A93660"/><stop offset="1" stop-color="#68162F"/></linearGradient></defs>`;
const brand = (x=64,y=54,dark=false) => `<g transform="translate(${x} ${y})"><image href="${files["arah-free-icon.png"]}" width="48" height="48"/><text x="64" y="33" fill="${dark?C.white:C.ink}" font-family="Arial" font-size="24" font-weight="700">Arah Free</text></g>`;
const chip = (label,x,y,w,dark=false) => `<g transform="translate(${x} ${y})"><rect width="${w}" height="46" rx="23" fill="${dark?"#FFFFFF18":C.white}" stroke="${dark?"#FFFFFF35":"#DED3D7"}"/><text x="${w/2}" y="30" text-anchor="middle" fill="${dark?C.white:C.wine}" font-family="Arial" font-size="16" font-weight="700">${esc(label)}</text></g>`;
const page = (body,w=1080,h=1350,bg=C.ivory) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}<rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;
const image = (name,x,y,w,h,fit="xMidYMin slice",r=0) => `<clipPath id="c${Math.abs(x+y+w+h+r)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath><image href="${files[name]}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${fit}" clip-path="url(#c${Math.abs(x+y+w+h+r)})"/>`;
const phone = (name,x,y,w,h,rot=0) => `<g transform="rotate(${rot} ${x+w/2} ${y+h/2})" filter="url(#sh)"><rect x="${x-12}" y="${y-12}" width="${w+24}" height="${h+24}" rx="${Math.min(56,w/8)}" fill="#171517"/>${image(name,x,y,w,h,"xMidYMin slice",Math.min(44,w/10))}</g>`;
const cta = (y=1130,dark=false,lead="Mau coba Arah?") => `${text([lead],540,y,38,dark?C.white:C.ink,800,1.1,"middle")}<rect x="230" y="${y+70}" width="620" height="78" rx="39" fill="${dark?C.white:C.wine}"/><text x="540" y="${y+120}" text-anchor="middle" fill="${dark?C.wine:C.white}" font-family="Arial" font-size="22" font-weight="800">Klik link di bio untuk download Arah.</text>`;

const postCopy = [
  [
    ["Kenalan sama","Arah."],["Biar rencana nggak","berhenti jadi wacana."],
    ["Arah Free itu apa?"],["Tempat sederhana untuk","menyusun tujuan, memecahnya","jadi tugas, lalu melihat progres."],
    ["Yang kamu butuhkan,","ada di satu alur."],["Tugas hari ini","Tujuan & daftar","Linimasa","Analisis progres"],
    ["Rencanamu.","Langkahmu.","Arahmu."],["Offline  •  Tanpa akun  •  Tanpa iklan"]
  ],
  [
    ["Banyak rencana.","Mulai dari mana?"],["Semua terasa penting.","Akhirnya nggak ada yang jalan."],
    ["Masalahnya sering bukan","kurang niat."],["Langkahnya saja belum terlihat."],
    ["Arah bantu merapikan","yang ada di kepala."],["Susun tujuan. Pecah jadi tugas.","Lihat apa yang perlu dikerjakan."],
    ["Nggak perlu beres","semuanya sekaligus."],["Mulai dari langkah yang paling masuk akal."]
  ],
  [
    ["Bukan cuma","daftar tugas."],["Ini cara Arah menjaga","tujuan tetap kelihatan."],
    ["Lihat yang perlu","dikerjakan sekarang."],["Hari Ini menampilkan tugas","dan progres harianmu."],
    ["Lihat tujuan sebagai","perjalanan, bukan tumpukan."],["Daftar dan Linimasa membantu","kamu membaca progres."],
    ["Cek kesiapan.","Bukan sekadar perasaan."],["Analisis membantu melihat progres","dan kesiapan rencana."]
  ],
  [
    ["Nggak harus tahu","seluruh jalannya."],["Cukup tahu langkah berikutnya."],
    ["Tujuan besar terasa jauh","kalau dilihat sekaligus."],["Bagi perjalanan menjadi titik-titik","yang bisa kamu jalani."],
    ["Di Arah, tiap tugas","punya tempat dalam tujuan."],["Jadi kamu tahu apa yang dikerjakan","dan kenapa itu penting."],
    ["Pelan nggak masalah.","Asal arahnya jelas."],["Arah bantu kamu tetap melihat","tujuan di balik setiap langkah."]
  ],
  [
    ["Gimana cara","mulai pakai Arah?"],["Tiga langkah. Nggak ribet."],
    ["01  Tentukan tujuan."],["Buat daftar untuk hal yang","benar-benar ingin kamu capai."],
    ["02  Pecah jadi tugas."],["Tambahkan langkah kecil, tenggat,","dan prioritas yang masuk akal."],
    ["03  Jalankan & pantau."],["Kerjakan dari Hari Ini, lalu lihat","progres dan linimasanya."]
  ],
  [
    ["Kalau tujuanmu penting,","jangan cuma disimpan."],["Kasih tempat. Kasih langkah.","Kasih Arah."],
    ["Satu aplikasi untuk","menjaga rencana tetap hidup."],["Susun tujuan  •  Kelola tugas","Pantau progres  •  Lihat linimasa"],
    ["Tetap sederhana.","Tetap milikmu."],["Offline  •  Tanpa akun","Tanpa iklan  •  Data tersimpan lokal"],
    ["Mau coba Arah?"],["Klik link di bio untuk download."]
  ]
];

function post(day,slide){
  const d=postCopy[day-1], a=d[(slide-1)*2], b=d[(slide-1)*2+1];
  if(day===1){
    if(slide===1) return page(`${brand()}<text x="66" y="210" fill="${C.wine}" font-family="Arial" font-size="18" font-weight="700" letter-spacing="4">APLIKASI PERENCANAAN PRIBADI</text>${text(a,66,340,76,C.ink,850)}${text(b,66,520,38,C.muted,600)}${phone("01-today.jpg",610,225,340,920,-3)}<path d="M66 1160 H520" stroke="${C.wine}" stroke-width="6"/><text x="66" y="1215" fill="${C.ink}" font-family="Arial" font-size="20">Geser untuk kenal lebih dekat  →</text>`);
    if(slide===2) return page(`${brand()}${text(a,64,220,62,C.ink,850)}${text(b,64,360,31,C.muted,500,1.35)}${image("03-lists.jpg",530,135,470,990,"xMidYMin slice",34)}<rect x="64" y="810" width="390" height="270" rx="30" fill="${C.white}" stroke="#DED3D7"/>${text(["Tujuan","→ tugas","→ progres"],105,875,30,C.wine,800,1.6)}`);
    if(slide===3) return page(`${brand()}${text(a,64,200,56,C.ink,850)}${image("01-today.jpg",70,360,270,650,"xMidYMin slice",28)}${image("03-lists.jpg",405,300,270,650,"xMidYMin slice",28)}${image("04-timeline.jpg",740,400,270,650,"xMidYMin slice",28)}${["Hari Ini","Daftar","Linimasa"].map((s,i)=>chip(s,82+i*335,1080,245)).join("")}`);
    return page(`${brand(64,54,true)}<rect x="0" y="0" width="1080" height="1350" fill="url(#wg)" opacity=".97"/>${brand(64,54,true)}<circle cx="865" cy="250" r="280" fill="#FFFFFF0D"/><image href="${files["arah-free-icon.png"]}" x="760" y="165" width="210" height="210"/>${text(a,64,500,72,C.white,850)}${text(b,64,790,25,"#F4DCE5",600)}${cta(950,true,"Siap memberi arah pada rencanamu?")}`);
  }
  if(day===2){
    if(slide===1) return page(`<rect x="0" y="0" width="480" height="1350" fill="${C.wine}"/>${brand(550,54)}${text(a,64,260,49,C.white,850,1.18)}${text(b,550,270,31,C.ink,700,1.35)}${image("illustration-day-02.png",430,450,600,760,"xMidYMid meet",0)}<path d="M420 640 C520 620 530 720 620 720" fill="none" stroke="${C.white}" stroke-width="5" stroke-dasharray="10 14"/>`);
    if(slide===2) return page(`${brand()}${text(a,64,250,58,C.ink,850)}${text(b,64,440,34,C.wine,700)}<g opacity=".8"><path d="M100 820 C260 650 380 1030 560 790 S850 670 990 900" fill="none" stroke="${C.wine}" stroke-width="16" stroke-linecap="round"/><circle cx="100" cy="820" r="30" fill="${C.wine}"/><circle cx="560" cy="790" r="30" fill="${C.wine}"/><circle cx="990" cy="900" r="30" fill="${C.wine}"/></g>${chip("Tugas",110,980,210)}${chip("Tenggat",435,980,210)}${chip("Prioritas",760,980,210)}`);
    if(slide===3) return page(`<rect width="1080" height="1350" fill="${C.ink}"/>${brand(64,54,true)}${text(a,64,230,54,C.white,850)}${text(b,64,380,28,"#D8CDD2",500,1.35)}${phone("02-planned.jpg",610,295,350,900,2)}<path d="M120 790 H500" stroke="${C.wine}" stroke-width="12"/><circle cx="120" cy="790" r="20" fill="${C.white}"/><circle cx="500" cy="790" r="20" fill="${C.white}"/>${text(["yang ada","di kepala"],120,880,28,"#D7C8CE",700)}${text(["jadi langkah","yang terlihat"],500,1010,28,C.white,800,"1.14","middle")}`);
    return page(`${brand()}${text(a,64,235,57,C.ink,850)}${text(b,64,430,31,C.muted,500,1.3)}${image("01-today.jpg",600,235,360,720,"xMidYMin slice",34)}<path d="M130 870 C260 650 370 980 520 760" fill="none" stroke="${C.wine}" stroke-width="8" stroke-linecap="round"/>${cta(1050,false,"Mulai dari satu langkah di Arah.")}`);
  }
  if(day===3){
    const dark=`<rect width="1080" height="1350" fill="#171518"/><path d="M0 180 H1080 M0 610 H1080 M0 1040 H1080" stroke="#FFFFFF0B"/>${brand(64,54,true)}`;
    if(slide===1) return page(`${dark}${text(a,64,240,62,C.white,850)}${text(b,64,350,29,"#CFC4C9",500)}${image("05-goal-detail.jpg",505,210,490,1030,"xMidYMin slice",28)}<rect x="55" y="730" width="390" height="175" rx="28" fill="#FFFFFF10" stroke="#FFFFFF28"/>${text(["TUJUAN","TUGAS","PROGRES"],95,785,22,"#E6B4C7",800,1.8)}`);
    if(slide===2) return page(`${dark}${text(a,64,210,52,C.white,850)}${text(b,64,350,27,"#CFC4C9",500)}${image("01-today.jpg",80,500,920,720,"xMidYMin slice",35)}<circle cx="806" cy="683" r="95" fill="none" stroke="${C.wine}" stroke-width="8"/><path d="M845 610 L985 465" stroke="${C.wine}" stroke-width="6"/><rect x="730" y="390" width="290" height="74" rx="26" fill="${C.wine}"/><text x="875" y="437" text-anchor="middle" fill="white" font-family="Arial" font-size="20" font-weight="700">ringkasan progres</text>`);
    if(slide===3) return page(`${dark}${text(a,64,190,49,C.white,850)}${text(b,64,315,26,"#CFC4C9",500)}${image("03-lists.jpg",55,470,455,740,"xMidYMin slice",28)}${image("04-timeline.jpg",570,470,455,740,"xMidYMin slice",28)}${chip("TUJUAN",145,1100,260,true)}${chip("PERJALANAN",665,1100,260,true)}`);
    return page(`${dark}${text(a,64,205,52,C.white,850)}${text(b,64,340,26,"#CFC4C9",500)}${image("06-analysis.jpg",380,480,640,610,"xMidYMin slice",30)}<g transform="translate(75 630)"><circle cx="120" cy="120" r="112" fill="${C.wine}"/><text x="120" y="105" text-anchor="middle" fill="white" font-family="Arial" font-size="24">PROGRES</text><text x="120" y="155" text-anchor="middle" fill="white" font-family="Arial" font-size="52" font-weight="800">25%</text></g>${cta(1130,true,"Lihat rencanamu dengan lebih jelas.")}`);
  }
  if(day===4){
    if(slide===1) return page(`${brand()}${text(a,64,260,71,C.ink,850)}${text(b,64,465,36,C.wine,700)}${image("illustration-day-04.png",475,280,590,900,"xMidYMid slice",0)}<path d="M70 1080 H460" stroke="${C.wine}" stroke-width="8"/>`);
    if(slide===2) return page(`<rect width="1080" height="1350" fill="${C.wine}"/>${brand(64,54,true)}<text x="70" y="260" fill="#EFCFDC" font-family="Arial" font-size="150" font-weight="900">01</text>${text(a,70,450,54,C.white,850)}${text(b,70,610,29,"#F2D9E2",500,1.35)}<path d="M120 1020 C340 850 520 1160 940 820" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-dasharray="18 18"/><circle cx="120" cy="1020" r="25" fill="white"/><path d="M920 790 l50 25 -45 32" fill="none" stroke="white" stroke-width="8"/>`);
    if(slide===3) return page(`${brand()}${text(a,64,210,56,C.ink,850)}${text(b,64,365,29,C.muted,500,1.35)}${image("05-goal-detail.jpg",480,340,500,830,"xMidYMin slice",34)}<g transform="translate(75 720)"><rect width="490" height="240" rx="30" fill="${C.white}" stroke="#DED3D7"/><text x="38" y="62" fill="${C.wine}" font-family="Arial" font-size="18" font-weight="800">TUJUAN → TUGAS</text>${text(["Langkah kecil tetap","punya alasan."],38,125,32,C.ink,800)}</g>`);
    return page(`<rect width="1080" height="1350" fill="${C.ink}"/>${brand(64,54,true)}${text(a,64,260,66,C.white,850)}${text(b,64,470,29,"#D8CDD2",500,1.35)}${image("04-timeline.jpg",610,255,330,750,"xMidYMin slice",30)}<path d="M90 900 C300 700 390 1050 600 800" fill="none" stroke="${C.wine}" stroke-width="10"/>${cta(1120,true,"Temukan langkah berikutnya di Arah.")}`);
  }
  if(day===5){
    if(slide===1) return page(`${brand()}${text(a,64,240,68,C.ink,850)}${text(b,64,430,32,C.wine,700)}${image("illustration-day-05.png",190,540,760,510,"xMidYMid meet",0)}<text x="540" y="1180" text-anchor="middle" fill="${C.muted}" font-family="Arial" font-size="21">Geser. Kita mulai dari yang paling dasar  →</text>`);
    const shots=["03-lists.jpg","05-goal-detail.jpg","01-today.jpg"], nums=["01","02","03"];
    const idx=slide-2;
    return page(`${brand()}<text x="64" y="285" fill="${C.blush}" font-family="Arial" font-size="180" font-weight="900">${nums[idx]}</text>${text(a,64,360,52,C.ink,850)}${text(b,64,500,28,C.muted,500,1.35)}${phone(shots[idx],600,225,350,880,idx===1?2:-2)}<path d="M120 890 C270 760 370 1040 535 860" fill="none" stroke="${C.wine}" stroke-width="9"/><circle cx="120" cy="890" r="21" fill="${C.wine}"/><circle cx="535" cy="860" r="21" fill="${C.wine}"/>${slide===4?cta(1130,false,"Siap menjalankan langkah pertamamu?"):""}`);
  }
  if(slide===1) return page(`<rect width="1080" height="1350" fill="url(#wg)"/>${brand(64,54,true)}${text(a,64,245,61,C.white,850)}${text(b,64,435,31,"#F2D8E2",600,1.35)}${phone("01-today.jpg",620,410,320,760,-5)}${phone("04-timeline.jpg",370,560,280,650,5)}<circle cx="160" cy="980" r="115" fill="#FFFFFF13"/><image href="${files["arah-free-icon.png"]}" x="95" y="915" width="130" height="130"/>`);
  if(slide===2) return page(`${brand()}${text(a,64,220,58,C.ink,850)}${text(b,64,370,28,C.muted,600,1.4)}${image("03-lists.jpg",65,520,285,650,"xMidYMin slice",28)}${image("05-goal-detail.jpg",398,450,285,720,"xMidYMin slice",28)}${image("06-analysis.jpg",730,520,285,650,"xMidYMin slice",28)}`);
  if(slide===3) return page(`<rect width="1080" height="1350" fill="${C.ink}"/>${brand(64,54,true)}${text(a,64,235,63,C.white,850)}${text(b,64,430,29,"#D7CCD1",600,1.45)}${["OFFLINE","TANPA AKUN","TANPA IKLAN","DATA LOKAL"].map((s,i)=>`<g transform="translate(${70+(i%2)*500} ${700+Math.floor(i/2)*150})"><circle cx="28" cy="28" r="28" fill="${C.wine}"/><text x="28" y="37" text-anchor="middle" fill="white" font-family="Arial" font-size="24" font-weight="800">✓</text><text x="78" y="37" fill="white" font-family="Arial" font-size="22" font-weight="700">${s}</text></g>`).join("")}`);
  return page(`<rect width="1080" height="1350" fill="${C.wine}"/>${brand(64,54,true)}<circle cx="540" cy="430" r="250" fill="#FFFFFF10"/><image href="${files["arah-free-icon.png"]}" x="400" y="290" width="280" height="280"/>${text(a,540,770,62,C.white,850,1.1,"middle")}${text(b,540,910,30,"#F6DDE6",700,1.2,"middle")}<rect x="215" y="1050" width="650" height="88" rx="44" fill="white"/><text x="540" y="1106" text-anchor="middle" fill="${C.wine}" font-family="Arial" font-size="24" font-weight="800">Klik link di bio untuk download Arah.</text><text x="540" y="1210" text-anchor="middle" fill="#F4D5E1" font-family="Arial" font-size="20">Arah Free untuk Android</text>`);
}

const storyData=[
  [
    {h:["Rencana banyak.","Tapi mulai dari mana?"],sub:"Arah bantu mengubah tujuan jadi langkah yang terlihat.",shot:"01-today.jpg",kind:"hero"},
    {h:["Menurutmu, Arah bisa","dipakai tanpa akun?"],sub:"Pilih jawabanmu.",kind:"quiz",opts:["Bisa","Harus daftar"]},
    {h:["Bisa. Bahkan tetap","jalan tanpa internet."],sub:"Klik link di bio untuk download Arah.",shot:"03-lists.jpg",kind:"cta"}
  ],
  [
    {h:["Pernah lihat tugas","menumpuk begini?"],sub:"Banyak yang penting. Nggak ada yang mulai.",art:"illustration-day-02.png",kind:"art"},
    {h:["Kalau tugas menumpuk,","kamu biasanya…"],sub:"Pasang Poll Instagram di area ini.",kind:"poll",opts:["Mulai asal","Bingung dulu"]},
    {h:["Coba rapikan jadi","langkah yang bisa dikerjakan."],sub:"Arah bantu kamu mulai. Link download ada di bio.",shot:"02-planned.jpg",kind:"cta"}
  ],
  [
    {h:["Yang perlu dikerjakan","sekarang, terlihat."],sub:"Kenalan dengan tampilan Hari Ini.",shot:"01-today.jpg",kind:"detail"},
    {h:["Kamu paling butuh","tampilan yang mana?"],sub:"Pasang Poll Instagram di area ini.",kind:"poll",opts:["Hari Ini","Linimasa"]},
    {h:["Tujuan, tugas, progres.","Satu alur di Arah."],sub:"Coba sendiri lewat link di bio.",shot:"04-timeline.jpg",kind:"cta"}
  ],
  [
    {h:["Nggak harus tahu","seluruh jalannya."],sub:"Kadang cukup tahu satu langkah berikutnya.",art:"illustration-day-04.png",kind:"art"},
    {h:["Seberapa jelas arah","rencanamu sekarang?"],sub:"Pasang Emoji Slider Instagram di area ini.",kind:"slider"},
    {h:["Buat langkahmu terlihat","di Arah."],sub:"Klik link di bio untuk download Arah.",shot:"05-goal-detail.jpg",kind:"cta"}
  ],
  [
    {h:["Mulai pakai Arah","nggak perlu ribet."],sub:"Ketuk untuk lihat tiga langkahnya.",art:"illustration-day-05.png",kind:"art"},
    {h:["Tentukan tujuan →","pecah jadi tugas."],sub:"Lalu jalankan dari Hari Ini.",shot:"05-goal-detail.jpg",kind:"detail"},
    {h:["Langkah pertama apa","yang mau kamu mulai?"],sub:"Pasang Question Sticker. Setelah itu, coba Arah lewat link di bio.",kind:"question"}
  ],
  [
    {h:["Rencana layak punya","tempat untuk tumbuh."],sub:"Arah menjaga tujuan, tugas, dan progres tetap dekat.",shot:"03-lists.jpg",kind:"hero"},
    {h:["Mau coba Arah?"],sub:"Pasang Poll Instagram di area ini.",kind:"poll",opts:["Mau","Banget"]},
    {h:["Temukan Arah kamu."],sub:"Klik link di bio untuk download Arah.",shot:"01-today.jpg",kind:"final"}
  ]
];

function story(day,slide){
  const s=storyData[day-1][slide-1], dark=(day===3||day===6), bg=dark?C.ink:(day===2&&slide===1?C.wine:C.ivory);
  let body=`${brand(64,70,dark||bg===C.wine)}<text x="1010" y="105" text-anchor="end" fill="${dark||bg===C.wine?"#FFFFFF99":C.muted}" font-family="Arial" font-size="18">ARAH FREE</text>`;
  if(s.shot){
    if(["detail","hero"].includes(s.kind)) body+=`${image(s.shot,110,250,860,920,"xMidYMin slice",42)}<rect x="110" y="1030" width="860" height="140" fill="${dark?"#171518DD":"#F8F4EFDD"}"/>`;
    else body+=phone(s.shot,580,270,340,880,day%2?3:-3);
  }
  if(s.art) body+=image(s.art,260,230,720,900,"xMidYMid meet",0);
  const ty=(s.shot&&["detail","hero"].includes(s.kind))?1250:(s.shot?420:(s.art?1130:420));
  body+=text(s.h,70,ty,58,(dark||bg===C.wine)?C.white:C.ink,850,1.12);
  body+=text([s.sub],70,ty+s.h.length*72+45,25,(dark||bg===C.wine)?"#D9CDD2":C.muted,500,1.3);
  if(["poll","quiz"].includes(s.kind)) body+=`<rect x="90" y="980" width="900" height="310" rx="38" fill="${dark?"#FFFFFF10":C.white}" stroke="${dark?"#FFFFFF2D":"#DDD2D7"}" stroke-width="3"/>${chip(s.opts[0],145,1100,330,dark)}${chip(s.opts[1],605,1100,330,dark)}`;
  if(s.kind==="slider") body+=`<rect x="90" y="1010" width="900" height="220" rx="38" fill="white" stroke="#DDD2D7"/><line x1="165" y1="1135" x2="915" y2="1135" stroke="${C.blush}" stroke-width="20" stroke-linecap="round"/><circle cx="650" cy="1135" r="48" fill="${C.wine}"/><text x="650" y="1152" text-anchor="middle" fill="white" font-family="Arial" font-size="36">🧭</text>`;
  if(s.kind==="question") body+=`<rect x="90" y="900" width="900" height="260" rx="38" fill="white" stroke="#DDD2D7"/><text x="540" y="1045" text-anchor="middle" fill="${C.muted}" font-family="Arial" font-size="25">Tulis jawabanmu di sini…</text>`;
  if(["cta","final"].includes(s.kind)) body+=`<rect x="140" y="1660" width="800" height="92" rx="46" fill="${dark?C.white:C.wine}"/><text x="540" y="1718" text-anchor="middle" fill="${dark?C.wine:C.white}" font-family="Arial" font-size="25" font-weight="800">Klik link di bio untuk download Arah.</text>`;
  body+=`<text x="540" y="1840" text-anchor="middle" fill="${dark||bg===C.wine?"#FFFFFF77":"#7A7175"}" font-family="Arial" font-size="18">@arahfree</text>`;
  return page(body,1080,1920,bg);
}

function render(svg,out,w,h){ const tmp=out.replace(/\.png$/,".svg"); fs.writeFileSync(tmp,svg); execFileSync("rsvg-convert",["-w",String(w),"-h",String(h),"-o",out,tmp]); fs.unlinkSync(tmp); }
for(const area of ["posts","stories"]){ const p=path.join(root,area); fs.mkdirSync(p,{recursive:true}); for(const n of fs.readdirSync(p)) if(/^hari-|^day-/.test(n)) fs.rmSync(path.join(p,n),{recursive:true,force:true}); }
for(let d=1;d<=6;d++){
  const pd=path.join(root,"posts",`day-${String(d).padStart(2,"0")}`), sd=path.join(root,"stories",`day-${String(d).padStart(2,"0")}`); fs.mkdirSync(pd,{recursive:true}); fs.mkdirSync(sd,{recursive:true});
  for(let s=1;s<=4;s++) render(post(d,s),path.join(pd,`day-${String(d).padStart(2,"0")}-feed-${String(s).padStart(2,"0")}.png`),1080,1350);
  for(let s=1;s<=3;s++) render(story(d,s),path.join(sd,`day-${String(d).padStart(2,"0")}-story-${String(s).padStart(2,"0")}.png`),1080,1920);
}
console.log("Rendered 24 feed slides and 18 stories.");
