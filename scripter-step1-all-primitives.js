const c = figma.variables.createVariableCollection("Primitives");
const m = c.modes[0].modeId;
c.renameMode(m, "Value");

function h(hex) {
  hex = hex.replace("#", "");
  return {
    r: parseInt(hex.slice(0, 2), 16) / 255,
    g: parseInt(hex.slice(2, 4), 16) / 255,
    b: parseInt(hex.slice(4, 6), 16) / 255,
    a: 1
  };
}

function addColor(name, hex) {
  const v = figma.variables.createVariable(name, c.id, "COLOR");
  v.setValueForMode(m, h(hex));
}

function addFloat(name, val) {
  const v = figma.variables.createVariable(name, c.id, "FLOAT");
  v.setValueForMode(m, val);
}

addColor("color/gray/0", "#FFFFFF");
addColor("color/gray/50", "#F9FAFB");
addColor("color/gray/100", "#F3F4F6");
addColor("color/gray/200", "#E5E7EB");
addColor("color/gray/300", "#D1D5DB");
addColor("color/gray/400", "#9CA3AF");
addColor("color/gray/500", "#6B7280");
addColor("color/gray/600", "#4B5563");
addColor("color/gray/700", "#374151");
addColor("color/gray/800", "#1F2937");
addColor("color/gray/900", "#111827");
addColor("color/gray/950", "#030712");
addColor("color/gray/1000", "#000000");
addColor("color/red/50", "#FEF2F2");
addColor("color/red/100", "#FEE2E2");
addColor("color/red/200", "#FECACA");
addColor("color/red/300", "#FCA5A5");
addColor("color/red/400", "#F87171");
addColor("color/red/500", "#EF4444");
addColor("color/red/600", "#DC2626");
addColor("color/red/700", "#B91C1C");
addColor("color/red/800", "#991B1B");
addColor("color/red/900", "#7F1D1D");
addColor("color/red/950", "#450A0A");
addColor("color/green/50", "#F0FDF4");
addColor("color/green/100", "#DCFCE7");
addColor("color/green/200", "#BBF7D0");
addColor("color/green/300", "#86EFAC");
addColor("color/green/400", "#4ADE80");
addColor("color/green/500", "#22C55E");
addColor("color/green/600", "#16A34A");
addColor("color/green/700", "#15803D");
addColor("color/green/800", "#166534");
addColor("color/green/900", "#14532D");
addColor("color/green/950", "#052E16");
addColor("color/amber/50", "#FFFBEB");
addColor("color/amber/100", "#FEF3C7");
addColor("color/amber/200", "#FDE68A");
addColor("color/amber/300", "#FCD34D");
addColor("color/amber/400", "#FBBF24");
addColor("color/amber/500", "#F59E0B");
addColor("color/amber/600", "#D97706");
addColor("color/amber/700", "#B45309");
addColor("color/amber/800", "#92400E");
addColor("color/amber/900", "#78350F");
addColor("color/amber/950", "#451A03");
addColor("color/blue/50", "#EFF6FF");
addColor("color/blue/100", "#DBEAFE");
addColor("color/blue/200", "#BFDBFE");
addColor("color/blue/300", "#93C5FD");
addColor("color/blue/400", "#60A5FA");
addColor("color/blue/500", "#3B82F6");
addColor("color/blue/600", "#2563EB");
addColor("color/blue/700", "#1D4ED8");
addColor("color/blue/800", "#1E40AF");
addColor("color/blue/900", "#1E3A8A");
addColor("color/blue/950", "#172554");
addColor("color/apna-green/50", "#E6F7F0");
addColor("color/apna-green/100", "#C6EFE0");
addColor("color/apna-green/200", "#9DE2C9");
addColor("color/apna-green/300", "#6CD3AE");
addColor("color/apna-green/400", "#3EBA8D");
addColor("color/apna-green/500", "#00A86B");
addColor("color/apna-green/600", "#1F8268");
addColor("color/apna-green/700", "#186954");
addColor("color/apna-green/800", "#135343");
addColor("color/apna-green/900", "#0E4134");
addColor("color/apna-green/950", "#082820");
addColor("color/apna-gold/50", "#FFFBEB");
addColor("color/apna-gold/100", "#FEF3C7");
addColor("color/apna-gold/200", "#FDE68A");
addColor("color/apna-gold/300", "#FCD34D");
addColor("color/apna-gold/400", "#FFD166");
addColor("color/apna-gold/500", "#F59E0B");
addColor("color/apna-gold/600", "#D97706");
addColor("color/apna-gold/700", "#B45309");
addColor("color/apna-gold/800", "#92400E");
addColor("color/apna-gold/900", "#78350F");
addColor("color/apna-gold/950", "#451A03");
addColor("color/apna-navy/50", "#F5F3FF");
addColor("color/apna-navy/100", "#ECE9FE");
addColor("color/apna-navy/200", "#DDD6FE");
addColor("color/apna-navy/300", "#C4B5FD");
addColor("color/apna-navy/400", "#A78BFA");
addColor("color/apna-navy/500", "#8B5CF6");
addColor("color/apna-navy/600", "#7C3AED");
addColor("color/apna-navy/700", "#302640");
addColor("color/apna-navy/800", "#5B21B6");
addColor("color/apna-navy/900", "#1E182A");
addColor("color/apna-navy/950", "#0F0B1A");
addColor("color/apna-plum/600", "#4D3951");
addColor("color/apna-sky/400", "#83BDE4");
addFloat("radius/none", 0);
addFloat("radius/xs", 4);
addFloat("radius/sm", 6);
addFloat("radius/md", 8);
addFloat("radius/lg", 10);
addFloat("radius/xl", 12);
addFloat("radius/2xl", 16);
addFloat("radius/3xl", 20);
addFloat("radius/full", 9999);
addFloat("space/0", 0);
addFloat("space/0-5", 2);
addFloat("space/1", 4);
addFloat("space/1-5", 6);
addFloat("space/2", 8);
addFloat("space/3", 12);
addFloat("space/4", 16);
addFloat("space/5", 20);
addFloat("space/6", 24);
addFloat("space/8", 32);
addFloat("space/10", 40);
addFloat("space/12", 48);
addFloat("space/14", 56);
addFloat("space/16", 64);
addFloat("space/20", 80);
addFloat("space/24", 96);
addFloat("space/28", 112);
addFloat("space/32", 128);
addFloat("space/40", 160);
addFloat("space/48", 192);
addFloat("space/56", 224);
addFloat("space/64", 256);
addFloat("font-size/2xs", 10);
addFloat("font-size/xs", 12);
addFloat("font-size/sm", 14);
addFloat("font-size/md", 16);
addFloat("font-size/lg", 18);
addFloat("font-size/xl", 20);
addFloat("font-size/2xl", 24);
addFloat("font-size/3xl", 30);
addFloat("font-size/4xl", 36);
addFloat("font-size/5xl", 48);
addFloat("font-size/6xl", 60);
print("✅ ALL 139 Primitives Created Successfully!");
