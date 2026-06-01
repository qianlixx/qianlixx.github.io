// 播放器模块
(function(){
var ae=null,ci=null,loading=false,playing=false,queue=[],qi=0,midCache={};
var pb=document.getElementById('playerBar'),pbi=document.getElementById('pbImg'),pbn=document.getElementById('pbName'),pba=document.getElementById('pbArtist');
var pbp=document.getElementById('pbPlay'),pbg=document.getElementById('pbProgFill'),pbt=document.getElementById('pbTime');
var pbl=document.getElementById('pbLyrics'),pblb=document.getElementById('pbLyricBtn'),pbc=document.getElementById('pbClose');
var pbPrev=document.getElementById('pbPrev'),pbNext=document.getElementById('pbNext');

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function fmt(t){if(typeof t!=='number'||!isFinite(t)||t<0)return '0:00';var m=Math.floor(t/60),s=Math.floor(t%60);return m+':'+(s<10?'0':'')+s}
function clp(){document.querySelectorAll('.ti-p').forEach(function(b){b.classList.remove('playing')})}

// 歌词解析：提取纯文本
function extractLyricText(raw){
  if(!raw)return[];var lines=raw.split('\n'),result=[];
  lines.forEach(function(l){
    var t=l.replace(/^\[[\d:.]+\]\s*/,'').replace(/^\[{2}.*?\]{2}\s*/,'').trim();
    if(t&&!/^(作词|作曲|编曲|制作人|混音|母带|录音|OP|SP|版权|未经|推广|QQ|微信|对音乐)/.test(t)) result.push(t);
  });
  return result.length>3?result:null;
}
function showLyricsRaw(raw){
  pbl.innerHTML='';var lines=extractLyricText(raw);
  if(lines&&lines.length){var h='';lines.forEach(function(l){h+='<div class="pbl-line">'+esc(l)+'</div>'});pbl.innerHTML=h;}
  else{pbl.innerHTML='<div class="pbl-line" style="opacity:0.4">暂无歌词</div>';}
}

// s01s API 搜索（带缓存）
function s01sSearch(kw){
  var key=kw;if(midCache[key])return Promise.resolve(midCache[key]);
  return fetch('https://tang.api.s01s.cn/music_open_api.php?msg='+encodeURIComponent(kw)+'&type=json&mid=')
    .then(function(r){return r.json()})
    .then(function(d){if(Array.isArray(d)&&d.length&&d[0].song_mid){midCache[key]={mid:d[0].song_mid};return midCache[key];}throw new Error();});
}
function s01sDetail(name,mid){
  return fetch('https://tang.api.s01s.cn/music_open_api.php?msg='+encodeURIComponent(name||'')+'&type=json&mid='+encodeURIComponent(mid))
    .then(function(r){return r.json()});
}

// 获取歌词（与播放地址请求合并）
function fetchLyrics(name,artist){
  var kw=(name||'')+' '+(artist||'');
  s01sSearch(kw).then(function(c){
    if(!c||!c.mid)return;
    s01sDetail(name,c.mid).then(function(d){
      var lyric=d.lyric||d.song_lyric||'';
      if(lyric)showLyricsRaw(lyric);
    }).catch(function(){});
  }).catch(function(){});
}

function playUrl(url){
  if(!url)return;
  if(ae){ae.pause();ae=null}
  ae=new Audio(url);ae.volume=.5;ae.preload='auto';
  ae.play().then(function(){playing=true;loading=false;pbp.textContent='⏸'}).catch(function(){pbp.textContent='▶';loading=false});
  ae.addEventListener('timeupdate',function(){
    if(ae.duration){pbg.style.width=(ae.currentTime/ae.duration*100)+'%';pbt.textContent=fmt(ae.currentTime)+' / '+fmt(ae.duration)}
  });
  ae.addEventListener('ended',function(){setTimeout(function(){if(queue.length)pbNext.click()},500);pbp.textContent='▶';playing=false;pbg.style.width='0%';ci=null;clp()});
}

// 主播放函数
window.playTrack=function(id,pic,name,artist){
  // 统一处理：先构建队列
  if(id!==undefined&&!queue.length)buildQueue(id);

  if(ci===id&&ae){if(ae.paused){ae.play();pbp.textContent='⏸'}else{ae.pause();pbp.textContent='▶'}return;}
  if(ae){ae.pause();ae=null}
  ci=id;loading=true;playing=false;
  pbi.src=pic||'';pbn.textContent=name||'';pba.textContent=artist||'';pbp.textContent='⏳';
  pb.classList.add('show');clp();pbg.style.width='0%';pbt.textContent='加载中...';pbl.innerHTML='<div class="pbl-line" style="opacity:0.3">加载歌词...</div>';
  var b=document.querySelector('.ti-p[data-id="'+id+'"]');if(b)b.classList.add('playing');

  // 并行：歌词 + 音频
  fetchLyrics(name,artist);
  var local=(typeof AUDIO_MAP!=='undefined'&&AUDIO_MAP[String(id)]);
  if(local){playUrl(local);return;}

  // 在线播放（用缓存加速）
  var kw=(name||'')+' '+(artist||'');
  s01sSearch(kw).then(function(c){
    if(!c||!c.mid)throw new Error();
    return s01sDetail(name,c.mid);
  }).then(function(d){
    var u=d.song_play_url_standard||d.song_play_url_hq||d.song_play_url||'';
    if(!u)throw new Error();
    playUrl(u);
  }).catch(function(){loading=false;pbp.textContent='▶';pbt.textContent='无法播放'});
};

// 构建播放队列
function buildQueue(id){
  queue=[];qi=0;
  var all=document.querySelectorAll('.ti-p');
  all.forEach(function(b,i){queue.push({id:parseInt(b.dataset.id),pic:b.dataset.pic||'',name:b.dataset.name||'',artist:b.dataset.artist||''});if(b.dataset.id==String(id))qi=i;});
}

// Skip buttons（不检查 loading，直接切）
pbPrev.addEventListener('click',function(){
  if(!queue.length)return;
  if(ae){ae.pause();ae=null}ci=null;loading=false;
  qi=(qi-1+queue.length)%queue.length;
  playTrack(queue[qi].id,queue[qi].pic,queue[qi].name,queue[qi].artist);
});
pbNext.addEventListener('click',function(){
  if(!queue.length)return;
  if(ae){ae.pause();ae=null}ci=null;loading=false;
  qi=(qi+1)%queue.length;
  playTrack(queue[qi].id,queue[qi].pic,queue[qi].name,queue[qi].artist);
});

// Play/Pause
pbp.addEventListener('click',function(){
  if(!ae||!ci)return;
  if(ae.paused){ae.play();pbp.textContent='⏸'}else{ae.pause();pbp.textContent='▶'}
});
// Close
pbc.addEventListener('click',function(){
  if(ae){ae.pause();ae=null}ci=null;playing=false;loading=false;queue=[];
  pb.classList.remove('show');pbl.innerHTML='';pbl.classList.remove('show');clp();
});
// Progress bar
document.getElementById('pbProgBar').addEventListener('click',function(e){
  if(!ae||!ae.duration)return;
  var r=this.getBoundingClientRect(),p=(e.clientX-r.left)/r.width;
  ae.currentTime=p*ae.duration;
});
// Lyrics toggle
pblb.addEventListener('click',function(){pbl.classList.toggle('show');this.classList.toggle('active')});

// Override the inline click handlers to build queue
document.addEventListener('click',function(e){
  var btn=e.target.closest('.ti-p');if(!btn)return;
  e.stopPropagation();
  buildQueue(parseInt(btn.dataset.id));
  playTrack(parseInt(btn.dataset.id),btn.dataset.pic,btn.dataset.name,btn.dataset.artist);
});
})();
