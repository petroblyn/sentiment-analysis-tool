// UI: reads input, renders the dashboard, wires up buttons (uses data.js and analyzer.js)
function esc(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function run(){
 const lines=document.getElementById("in").value.split("\n").map(x=>x.trim()).filter(Boolean);
 if(!lines.length){document.getElementById("out").hidden=true;return}
 const R=lines.map(t=>({t,...score(t)}));
 const n=R.length,cnt={Positive:0,Negative:0,Neutral:0};R.forEach(r=>cnt[r.label]++);
 const avg=R.reduce((a,r)=>a+r.c,0)/n;
 const pct=k=>Math.round(cnt[k]/n*100);
 document.getElementById("kpis").innerHTML=`<div class="kpi"><b>${n}</b><span>comments</span></div><div class="kpi"><b class="Positive">${pct("Positive")}%</b><span>positive</span></div><div class="kpi"><b class="Negative">${pct("Negative")}%</b><span>negative</span></div><div class="kpi"><b>${avg.toFixed(2)}</b><span>average score (−1 to +1)</span></div>`;
 const bar=document.getElementById("bar");bar.setAttribute("aria-label",`Positive ${pct("Positive")}%, neutral ${pct("Neutral")}%, negative ${pct("Negative")}%`);
 bar.innerHTML=["Positive","Neutral","Negative"].map(k=>`<div style="width:${cnt[k]/n*100}%;background:var(--${k[0]=="P"?"pos":k[0]=="N"&&k=="Negative"?"neg":"neu"})" title="${k}: ${cnt[k]}"></div>`).join("");
 // topics
 const T={};R.forEach(r=>{for(const k in TOP)if(TOP[k].test(r.t.toLowerCase())){(T[k]=T[k]||[]).push(r.c)}});
 const tl=Object.entries(T).map(([k,a])=>[k,a.reduce((x,y)=>x+y,0)/a.length,a.length]).sort((a,b)=>a[1]-b[1]);
 document.getElementById("topics").innerHTML=tl.map(([k,v,c])=>{const w=Math.abs(v)*50;const col=v>=0?"pos":"neg";
  return`<div class="row"><span>${k}</span><div class="track"><div class="mid"></div><div class="fill" style="background:var(--${col});width:${w}%;${v>=0?"left:50%":"right:50%"}"></div></div><span>${v.toFixed(2)}</span></div>`}).join("")+`<p style="color:var(--mut);font-size:13px;margin:8px 0 0">Average score per topic. Bars to the right are positive.</p>`;
 // words
 const W={};R.forEach(r=>r.hits.forEach(([x,v])=>{(W[x]=W[x]||{s:0,n:0});W[x].s+=v;W[x].n++}));
 const we=Object.entries(W);const pw=we.filter(e=>e[1].s>0).sort((a,b)=>b[1].s-a[1].s).slice(0,10),nw=we.filter(e=>e[1].s<0).sort((a,b)=>a[1].s-b[1].s).slice(0,10);
 document.getElementById("words").innerHTML=`<p style="margin:0 0 6px"><b>Positive</b></p>${pw.map(e=>`<span class="chip p">${e[0]} ×${e[1].n}</span>`).join("")}<p style="margin:10px 0 6px"><b>Negative</b></p>${nw.map(e=>`<span class="chip n">${e[0]} ×${e[1].n}</span>`).join("")}`;
 // insights
 const I=[];
 const dom=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0][0];
 I.push(`Overall mood is <b>${avg>=.15?"positive":avg<=-.15?"negative":"mixed"}</b>: ${pct("Positive")}% positive, ${pct("Neutral")}% neutral, ${pct("Negative")}% negative across ${n} comments (most common label: ${dom}).`);
 if(tl.length){const b=tl[0],g=tl[tl.length-1];
  if(b[1]<0)I.push(`<b>${b[0]}</b> is the biggest pain point, averaging ${b[1].toFixed(2)} across ${b[2]} comment${b[2]>1?"s":""}. Fixing it offers the largest gain in satisfaction.`);
  if(g[1]>0)I.push(`<b>${g[0]}</b> is the strongest area, averaging +${g[1].toFixed(2)}. Use it in marketing and protect it.`)}
 if(nw.length)I.push(`The most common complaint words are ${nw.slice(0,3).map(e=>"<i>"+e[0]+"</i>").join(", ")}. Reading these comments first will show the root causes fastest.`);
 if(pw.length)I.push(`Customers praise things with words like ${pw.slice(0,3).map(e=>"<i>"+e[0]+"</i>").join(", ")}.`);
 const worst=[...R].sort((a,b)=>a.c-b.c)[0];
 I.push(`Most negative comment (${worst.c.toFixed(2)}): “${esc(worst.t)}”`);
 I.push(`<b>Recommended actions:</b> (1) prioritise the lowest-scoring topic, (2) follow up with customers who left negative comments, (3) re-run this analysis after changes to measure improvement.`);
 document.getElementById("ins").innerHTML=I.map(x=>`<li>${x}</li>`).join("");
 document.getElementById("rows").innerHTML=R.map(r=>`<tr><td>${esc(r.t)}</td><td class="tag ${r.label}">${r.label}</td><td>${r.c.toFixed(2)}</td></tr>`).join("");
 document.getElementById("out").hidden=false;
}
document.getElementById("go").onclick=run;
document.getElementById("sample").onclick=()=>{document.getElementById("in").value=SAMPLE;run()};
document.getElementById("clear").onclick=()=>{document.getElementById("in").value="";run()};
document.getElementById("in").value=SAMPLE;run();
