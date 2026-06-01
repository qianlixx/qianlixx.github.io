// 导航 + 滚动控制
(function(){
var S=document.getElementById('splash'),Z=document.getElementById('zoomLightbox'),ZI=Z.querySelector('img'),AV=document.querySelector('.name-img'),CU=document.getElementById('cursor-ring'),CD=document.getElementById('cursor-dot'),SE=document.querySelectorAll('.section'),ND=document.querySelectorAll('.nav-dot'),MN=document.getElementById('main'),GL=document.querySelectorAll('#glassNav a'),ID=document.getElementById('navIndicator'),LS='about';
function SI(i){var l=document.querySelector('#glassNav a[href="#'+i+'"]');if(!l)return;var n=l.closest('.glass-nav-inner');var le=0,fo=false;n.querySelectorAll('a').forEach(function(a){if(a===l)fo=true;if(!fo)le+=a.offsetWidth});ID.style.left=le+'px';ID.style.width=l.offsetWidth+'px'}
function U(i){LS=i;SI(i);GL.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+i)});ND.forEach(function(d){d.classList.toggle('active',d.getAttribute('href')==='#'+i)})}
function dS(){if(S.classList.contains('dismissing'))return;S.classList.add('dismissing');setTimeout(function(){S.classList.add('hidden');document.body.style.overflow='';MN.style.overflowY='scroll';document.getElementById('about').querySelectorAll('.greeting,.hero-title,.hero-tagline,.hero-bio,.hero-btn,.title-divider').forEach(function(e,i){setTimeout(function(){e.classList.add('visible')},i*120)});U('about')},800)}
S.addEventListener('click',dS);setTimeout(function(){if(!S.classList.contains('hidden'))dS()},5000);
document.body.style.overflow='hidden';MN.style.overflowY='hidden';
AV.addEventListener('click',function(){ZI.src=AV.src;Z.classList.add('open');document.body.style.overflow='hidden';MN.style.overflowY='hidden'});
Z.addEventListener('click',function(){Z.classList.remove('open');document.body.style.overflow='';MN.style.overflowY='scroll'});
function US(){var v=MN.clientHeight,best=null,bv=0;SE.forEach(function(s){var r=s.getBoundingClientRect();if(r.bottom<=0||r.top>=v)return;var vi=(Math.min(r.bottom,v)-Math.max(r.top,0))/r.height;if(vi>bv){bv=vi;best=s.id}if(s.id==='about')s.querySelectorAll('.greeting,.hero-title,.hero-tagline,.hero-bio,.hero-btn').forEach(function(e){if(vi>0.15)e.classList.add('visible')});s.querySelectorAll('.animate').forEach(function(e){if(vi>0.1){e.classList.remove('exit');e.classList.add('visible')}else if(e.classList.contains('visible')){e.classList.remove('visible');e.classList.add('exit')}})});if(best&&best!==LS&&SE.length)U(best)}
MN.addEventListener('scroll',US,{passive:true});setTimeout(function(){U('about');US()},150);
ND.forEach(function(d){d.addEventListener('click',function(e){e.preventDefault();var t=document.querySelector(d.getAttribute('href'));if(t){U(t.id);t.scrollIntoView({behavior:'smooth',block:'start'})}})});
GL.forEach(function(l){l.addEventListener('click',function(e){e.preventDefault();var t=document.querySelector(l.getAttribute('href'));if(t){U(t.id);t.scrollIntoView({behavior:'smooth',block:'start'})}})});
})();
