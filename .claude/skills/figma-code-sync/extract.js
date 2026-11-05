// Run in the page (javascript_tool). Set window.__root = '[role=dialog]' first to read only a pop-up.
(() => {
  const names = [];
  for (const sheet of document.styleSheets) { let rules; try { rules = sheet.cssRules } catch { continue }
    const walk = (rs) => { for (const r of rs) { if (r.style) for (const p of r.style) if (p.startsWith("--")) names.push(p); if (r.cssRules) walk(r.cssRules) } }; walk(rules); }
  const probe = document.createElement("span"); document.body.appendChild(probe); const map = {};
  for (const n of new Set(names)) { if (/^--(color-|tw-|font|text|space|radius|shadow|duration|ease|z-)/.test(n)) continue;
    probe.style.color = ""; probe.style.color = "var(" + n + ")"; const c = getComputedStyle(probe).color; if (!c) continue; (map[c] ??= []).push(n.slice(2)); }
  probe.remove();
  const pref = ["foreground","muted-foreground","checkout-primary","info","success","warning","destructive","primary","card-foreground","checkout-info"];
  const tok = (c) => { const l = map[c]; if (!l) return c; const p = pref.find(x => l.includes(x)); return p ?? l.slice(0,2).join("/"); };
  const cv = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const hex = (c) => { cv.clearRect(0,0,1,1); cv.fillStyle = "#000"; cv.fillStyle = c; cv.fillRect(0,0,1,1); const d = cv.getImageData(0,0,1,1).data; return "#" + [d[0],d[1],d[2]].map(x=>x.toString(16).padStart(2,"0")).join("") + (d[3] < 250 ? "/" + Math.round(d[3]/2.55) : ""); };
  const out = [];
  const roots = window.__root ? [...document.querySelectorAll(window.__root)] : [document.body];
  for (const root of roots) for (const el of root.querySelectorAll("*")) {
    const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join("").replace(/\s+/g, " ").trim(); if (!own) continue;
    const r = el.getBoundingClientRect(); if (!r.width) continue; const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || el.closest("[aria-hidden=true],.sr-only,script,style,nextjs-portal")) continue;
    out.push(own.slice(0, 50) + " | " + parseFloat(cs.fontSize) + " " + cs.fontWeight + " | " + tok(cs.color) + " ~" + hex(cs.color) + (cs.fontStyle === "italic" ? " italic" : "") + (cs.textDecorationLine === "line-through" ? " strike" : ""));
  }
  return [...new Set(out)].join("\n");
})()
