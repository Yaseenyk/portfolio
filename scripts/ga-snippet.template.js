(function(){
var w=window,d=document,q=new URLSearchParams(location.search),st=null;
try{st=w.localStorage}catch(e){}
function g(k){return q.get(k)||''}
var ref=g('ref'),hasUtm=!!g('utm_source');
var ft=null;try{ft=JSON.parse(st.getItem('ga_ft')||'null')}catch(e){}
if(!ft){var rh='';try{rh=d.referrer?new URL(d.referrer).hostname:''}catch(e){}
ft={s:g('utm_source')||ref||rh||'direct',m:g('utm_medium')||(ref?'share':(rh?'referral':'none')),c:g('utm_campaign')||(ref?'ref-tag':'(not set)')};
try{st.setItem('ga_ft',JSON.stringify(ft))}catch(e){}}
w.dataLayer=w.dataLayer||[];
function gtag(){w.dataLayer.push(arguments)}
w.gtag=gtag;
gtag('js',new Date());
var cfg={};
if(!hasUtm&&ref){cfg.campaign_source=ref;cfg.campaign_medium='share';cfg.campaign_name='ref-tag'}
gtag('config','__GA_ID__',cfg);
w.gaEvent=function(n,p){try{p=p||{};p.first_source=ft.s;p.first_medium=ft.m;p.first_campaign=ft.c;p.cta_page=p.cta_page||location.pathname;gtag('event',n,p)}catch(e){}};
d.addEventListener('click',function(e){try{
var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;
var h=a.getAttribute('href')||'',n='';
if(/^(https?:)?\/\/(wa\.me|api\.whatsapp\.com)|^whatsapp:/i.test(h))n='whatsapp_click';
else if(/^mailto:/i.test(h))n='email_click';
else if(/^tel:/i.test(h))n='phone_click';
else if(/\.(apk|ipa)([?#]|$)/i.test(h))n='app_download';
else if(/\.md([?#]|$)/i.test(h))n='template_download';
if(n)w.gaEvent(n,{cta_text:(a.textContent||'').trim().slice(0,60),link_url:h.slice(0,100)});
}catch(x){}},true);
})();
