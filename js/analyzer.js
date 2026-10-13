// Analyzer: scores a single piece of text (uses constants from data.js)
function score(t){
 const w=t.toLowerCase().replace(/n't/g," not").replace(/[^a-z\s]/g," ").split(/\s+/).filter(Boolean);
 let s=0;const hits=[];
 w.forEach((x,i)=>{if(!(x in L))return;let v=L[x];
  for(let k=1;k<=3&&i-k>=0;k++){const p=w[i-k];if(p in INT){v*=INT[p]}else if(NEG.has(p)){v*=-.8;break}}
  s+=v;hits.push([x,v])});
 if(s!==0)s+=Math.sign(s)*Math.min((t.match(/!/g)||[]).length,3)*.3;
 const c=s/Math.sqrt(s*s+15);
 return{c,label:c>=.15?"Positive":c<=-.15?"Negative":"Neutral",hits}}
