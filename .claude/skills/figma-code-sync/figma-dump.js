// use_figma script body. Replace IDS with the screen frame ids to dump (on page 441:2).
const IDS = ["306:3"];
const page = await figma.getNodeByIdAsync('441:2');
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = true;
const vc = {};
async function col(t){ const f=t.fills; if(f===figma.mixed) return 'mixed'; const p=f.find(x=>x.visible!==false); if(!p) return 'none'; const b=p.boundVariables?.color; if(b){ vc[b.id] ??= (await figma.variables.getVariableByIdAsync(b.id))?.name; const v=await figma.variables.getVariableByIdAsync(b.id); const rv=v.resolveForConsumer(t).value; const a=(rv.a??1)*(p.opacity??1); return vc[b.id] + ' ~#'+[rv.r,rv.g,rv.b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('') + (a<0.98 ? '/'+Math.round(a*100) : ''); } const c=p.color; return 'raw ~#'+[c.r,c.g,c.b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join(''); }
function vis(n){ while(n && n.type!=='PAGE'){ if(n.visible===false || n.opacity===0) return false; n=n.parent;} return true; }
async function comp(t){ let n=t.parent; while(n && n.type!=='PAGE'){ if(n.type==='INSTANCE'){ const m=await n.getMainComponentAsync(); return (m?.parent?.type==='COMPONENT_SET'? m.parent.name : m?.name) ?? '?'; } n=n.parent; } return '-'; }
const out=[];
for (const id of IDS){ const f=await figma.getNodeByIdAsync(id); out.push('== '+id+' '+f.name); const seen=new Set();
  for(const t of f.findAllWithCriteria({types:['TEXT']})){ if(!vis(t)) continue; const s=t.characters.replace(/\s+/g,' ').trim(); if(!s) continue;
    const key=`${s.slice(0,50)} | ${t.fontSize===figma.mixed?'mixed':t.fontSize} ${t.fontWeight===figma.mixed?'mixed':t.fontWeight} | ${await col(t)}${t.fontName!==figma.mixed && /Italic/.test(t.fontName.style)?' italic':''}${t.textDecoration==='STRIKETHROUGH'?' strike':''}`;
    if(seen.has(key)) continue; seen.add(key); out.push(`${key} | ${t.id} | ${await comp(t)}`); } }
return out.join('\n');
