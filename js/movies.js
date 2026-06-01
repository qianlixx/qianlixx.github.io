// 电影轮播
(function(){var mt=document.getElementById('movieTrack');var mi=[];var iconSVG1='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12" style="vertical-align:-2px;margin-right:2px"><path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>';
var iconSVG2='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12" style="vertical-align:-2px;margin-right:2px"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
var iconSVG3='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12" style="vertical-align:-2px;margin-right:2px"><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M17 22c0-1.76-.85-3.25-2.03-3.79-.5-.23-.97-.66-.97-1.21v-2.34M14 14H10a4 4 0 01-4-4V5a2 2 0 012-2h8a2 2 0 012 2v5a4 4 0 01-4 4z"/></svg>';
MOVIE_DATA.forEach(function(m){var item=document.createElement('div');item.className='movie-item';item.innerHTML='<div class="movie-card"><div class="poster"><div style="background-image:url(\''+m.poster+'\')"></div></div><div class="poster-overlay"></div></div><div class="movie-info"><h3>'+m.title+'</h3><div class="meta">'+iconSVG1+m.meta+'</div><div class="actors">'+iconSVG2+m.actors+'</div><div class="rating">'+iconSVG3+m.rating+'</div><div class="desc">'+m.desc+'</div></div>';mt.appendChild(item);mi.push(item)});

mi.slice(-3).forEach(function(i){mt.insertBefore(i.cloneNode(true),mt.firstChild)});mi.slice(0,3).forEach(function(i){mt.appendChild(i.cloneNode(true))});var ami=mt.querySelectorAll('.movie-item');var mi2=3,mt2=null;
function cm(a){var vw=mt.parentElement?.offsetWidth||window.innerWidth;mt.style.transition=a?'transform .5s cubic-bezier(0.22,1,0.36,1)':'none';mt.style.transform='translateX('+(vw/2-mi2*210-80)+'px)';ami.forEach(function(e,i){e.classList.toggle('focus',i===mi2);e.querySelector('.movie-card').classList.toggle('focus',i===mi2);e.querySelector('.movie-card').classList.toggle('side',Math.abs(i-mi2)===1)})}
function am(){mi2++;if(mi2>=MOVIE_DATA.length+3){mt.style.transition='none';mi2=3;cm(false)}else cm(true)}
function ms(i){if(mt2)clearInterval(mt2);mt2=setInterval(am,i||3500)}
cm(false);ms(120);var b=0;var sb=setInterval(function(){b++;am();if(b>=3){clearInterval(sb);ms()}},120);
ami.forEach(function(e,i){e.addEventListener('click',function(){if(mt2)clearInterval(mt2);mi2=i;cm(true);ms()})});
mt.addEventListener('mouseenter',function(){if(mt2)clearInterval(mt2)});mt.addEventListener('mouseleave',function(){ms()});
new IntersectionObserver(function(e){e.forEach(function(en){if(!en.isIntersecting&&mt2)clearInterval(mt2)})},{threshold:0.1}).observe(document.getElementById('movies'));
window.addEventListener('resize',function(){cm(false)})})();
