
(async function(){
  const response = await fetch('translations.json');
  const dict = await response.json();
  const params = new URLSearchParams(location.search);
  const saved = localStorage.getItem('petit-genie-lang');
  const initial = params.get('lang') || saved || 'fr';
  function applyLanguage(lang, updateUrl=true){
    if(!dict[lang]) lang='fr';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('arabic-mode', lang === 'ar');
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.getAttribute('data-i18n');
      if(dict[lang][key] !== undefined) el.innerHTML=dict[lang][key];
    });
    document.querySelectorAll('[data-i18n-category]').forEach(el=>{
      const key=el.getAttribute('data-i18n-category');
      if(dict[lang][key] !== undefined) el.textContent=dict[lang][key];
    });
    document.querySelectorAll('[data-lang-content]').forEach(el=>{
      el.style.display = el.getAttribute('data-lang-content') === lang ? '' : 'none';
    });
    document.querySelectorAll('.lang-switch button').forEach(btn=>{
      btn.setAttribute('aria-pressed', String(btn.dataset.lang===lang));
    });
    localStorage.setItem('petit-genie-lang',lang);
    if(updateUrl){
      const url=new URL(location.href); url.searchParams.set('lang',lang);
      history.replaceState({},'',url);
    }
  }
  document.querySelectorAll('[data-lang-content]').forEach(el=>{
      el.style.display = el.getAttribute('data-lang-content') === lang ? '' : 'none';
    });
    document.querySelectorAll('.lang-switch button').forEach(btn=>{
    btn.addEventListener('click',()=>applyLanguage(btn.dataset.lang));
  });
  applyLanguage(initial,false);
})();
