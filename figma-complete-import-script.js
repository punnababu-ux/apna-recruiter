(async function importCompletePoneglyphDesignSystem() {
  console.log("🚀 Importing ALL 134 Primitives & 23 Semantics into Figma...");

  function hexToRgba(hex) {
    hex = hex.replace("#", "");
    return {
      r: parseInt(hex.substring(0, 2), 16) / 255,
      g: parseInt(hex.substring(2, 4), 16) / 255,
      b: parseInt(hex.substring(4, 6), 16) / 255,
      a: 1
    };
  }

  // 1. PRIMITIVES COLLECTION
  const primitivesCollection = figma.variables.createVariableCollection("Primitives");
  const primitiveModeId = primitivesCollection.modes[0].modeId;
  primitivesCollection.renameMode(primitiveModeId, "Value");

  const primitiveColors = {
    "color/gray/0": "#FFFFFF",
    "color/gray/50": "#F9FAFB",
    "color/gray/100": "#F3F4F6",
    "color/gray/200": "#E5E7EB",
    "color/gray/300": "#D1D5DB",
    "color/gray/400": "#9CA3AF",
    "color/gray/500": "#6B7280",
    "color/gray/600": "#4B5563",
    "color/gray/700": "#374151",
    "color/gray/800": "#1F2937",
    "color/gray/900": "#111827",
    "color/gray/950": "#030712",
    "color/gray/1000": "#000000",
    "color/apna-green/50": "#E6F7F0",
    "color/apna-green/100": "#C6EFE0",
    "color/apna-green/200": "#9DE2C9",
    "color/apna-green/300": "#6CD3AE",
    "color/apna-green/400": "#3EBA8D",
    "color/apna-green/500": "#00A86B",
    "color/apna-green/600": "#1F8268",
    "color/apna-green/700": "#186954",
    "color/apna-green/800": "#135343",
    "color/apna-green/900": "#0E4134",
    "color/apna-green/950": "#082820",
    "color/apna-gold/50": "#FFFBEB",
    "color/apna-gold/100": "#FEF3C7",
    "color/apna-gold/200": "#FDE68A",
    "color/apna-gold/300": "#FCD34D",
    "color/apna-gold/400": "#FFD166",
    "color/apna-gold/500": "#F59E0B",
    "color/apna-gold/600": "#D97706",
    "color/apna-gold/700": "#B45309",
    "color/apna-gold/800": "#92400E",
    "color/apna-gold/900": "#78350F",
    "color/apna-gold/950": "#451A03",
    "color/apna-navy/50": "#F5F3FF",
    "color/apna-navy/100": "#ECE9FE",
    "color/apna-navy/200": "#DDD6FE",
    "color/apna-navy/300": "#C4B5FD",
    "color/apna-navy/400": "#A78BFA",
    "color/apna-navy/500": "#8B5CF6",
    "color/apna-navy/600": "#7C3AED",
    "color/apna-navy/700": "#302640",
    "color/apna-navy/800": "#5B21B6",
    "color/apna-navy/900": "#1E182A",
    "color/apna-navy/950": "#0F0B1A",
    "color/red/50": "#FEF2F2",
    "color/red/100": "#FEE2E2",
    "color/red/200": "#FECACA",
    "color/red/300": "#FCA5A5",
    "color/red/400": "#F87171",
    "color/red/500": "#EF4444",
    "color/red/600": "#DC2626",
    "color/red/700": "#B91C1C",
    "color/red/800": "#991B1B",
    "color/red/900": "#7F1D1D",
    "color/red/950": "#450A0A",
    "color/green/50": "#F0FDF4",
    "color/green/100": "#DCFCE7",
    "color/green/200": "#BBF7D0",
    "color/green/300": "#86EFAC",
    "color/green/400": "#4ADE80",
    "color/green/500": "#22C55E",
    "color/green/600": "#16A34A",
    "color/green/700": "#15803D",
    "color/green/800": "#166534",
    "color/green/900": "#14532D",
    "color/green/950": "#052E16",
    "color/amber/50": "#FFFBEB",
    "color/amber/100": "#FEF3C7",
    "color/amber/200": "#FDE68A",
    "color/amber/300": "#FCD34D",
    "color/amber/400": "#FBBF24",
    "color/amber/500": "#F59E0B",
    "color/amber/600": "#D97706",
    "color/amber/700": "#B45309",
    "color/amber/800": "#92400E",
    "color/amber/900": "#78350F",
    "color/amber/950": "#451A03",
    "color/blue/50": "#EFF6FF",
    "color/blue/100": "#DBEAFE",
    "color/blue/200": "#BFDBFE",
    "color/blue/300": "#93C5FD",
    "color/blue/400": "#60A5FA",
    "color/blue/500": "#3B82F6",
    "color/blue/600": "#2563EB",
    "color/blue/700": "#1D4ED8",
    "color/blue/800": "#1E40AF",
    "color/blue/900": "#1E3A8A",
    "color/blue/950": "#172554",
    "color/apna-plum/600": "#4D3951",
    "color/apna-sky/400": "#83BDE4"
};
  const primitiveFloats = {
    "radius/none": 0,
    "radius/xs": 4,
    "radius/sm": 6,
    "radius/md": 8,
    "radius/lg": 10,
    "radius/xl": 12,
    "radius/2xl": 16,
    "radius/3xl": 20,
    "radius/full": 9999,
    "space/0": 0,
    "space/0-5": 2,
    "space/1": 4,
    "space/1-5": 6,
    "space/2": 8,
    "space/3": 12,
    "space/4": 16,
    "space/5": 20,
    "space/6": 24,
    "space/8": 32,
    "space/10": 40,
    "space/12": 48,
    "space/14": 56,
    "space/16": 64,
    "space/20": 80,
    "space/24": 96,
    "space/28": 112,
    "space/32": 128,
    "space/40": 160,
    "space/48": 192,
    "space/56": 224,
    "space/64": 256,
    "font-size/2xs": 10,
    "font-size/xs": 12,
    "font-size/sm": 14,
    "font-size/md": 16,
    "font-size/lg": 18,
    "font-size/xl": 20,
    "font-size/2xl": 24,
    "font-size/3xl": 30,
    "font-size/4xl": 36,
    "font-size/5xl": 48,
    "font-size/6xl": 60
};

  const primitiveVars = {};

  for (const [name, hex] of Object.entries(primitiveColors)) {
    const v = figma.variables.createVariable(name, primitivesCollection.id, "COLOR");
    v.setValueForMode(primitiveModeId, hexToRgba(hex));
    primitiveVars[name] = v;
  }

  for (const [name, val] of Object.entries(primitiveFloats)) {
    const v = figma.variables.createVariable(name, primitivesCollection.id, "FLOAT");
    v.setValueForMode(primitiveModeId, val);
    primitiveVars[name] = v;
  }

  // 2. SEMANTICS COLLECTION WITH VARIABLE ALIASES
  const semanticsCollection = figma.variables.createVariableCollection("Semantics");
  const lightModeId = semanticsCollection.modes[0].modeId;
  semanticsCollection.renameMode(lightModeId, "Light");
  const darkModeId = semanticsCollection.addMode("Dark");

  const semanticsMap = [
    [
        "surface/background",
        "color/gray/0",
        "color/apna-navy/950"
    ],
    [
        "surface/foreground",
        "color/gray/950",
        "color/gray/50"
    ],
    [
        "surface/card",
        "color/gray/0",
        "color/apna-navy/900"
    ],
    [
        "surface/card-foreground",
        "color/gray/950",
        "color/gray/50"
    ],
    [
        "surface/popover",
        "color/gray/0",
        "color/apna-navy/900"
    ],
    [
        "surface/popover-foreground",
        "color/gray/950",
        "color/gray/50"
    ],
    [
        "role/primary",
        "color/apna-green/600",
        "color/apna-green/500"
    ],
    [
        "role/primary-foreground",
        "color/gray/50",
        "color/gray/50"
    ],
    [
        "role/secondary",
        "color/gray/100",
        "color/apna-navy/800"
    ],
    [
        "role/secondary-foreground",
        "color/gray/900",
        "color/gray/50"
    ],
    [
        "role/muted",
        "color/gray/100",
        "color/apna-navy/800"
    ],
    [
        "role/muted-foreground",
        "color/gray/500",
        "color/gray/400"
    ],
    [
        "role/accent",
        "color/apna-green/50",
        "color/apna-navy/900"
    ],
    [
        "role/accent-foreground",
        "color/apna-green/700",
        "color/apna-green/200"
    ],
    [
        "role/highlight",
        "color/apna-gold/400",
        "color/apna-gold/400"
    ],
    [
        "role/highlight-foreground",
        "color/gray/950",
        "color/gray/950"
    ],
    [
        "role/destructive",
        "color/red/600",
        "color/red/400"
    ],
    [
        "role/destructive-subtle",
        "color/red/50",
        "color/red/900"
    ],
    [
        "role/success",
        "color/apna-green/600",
        "color/apna-green/500"
    ],
    [
        "role/success-subtle",
        "color/apna-green/100",
        "color/apna-green/900"
    ],
    [
        "role/border",
        "color/gray/200",
        "color/apna-navy/700"
    ],
    [
        "role/input",
        "color/gray/200",
        "color/apna-navy/700"
    ],
    [
        "role/ring",
        "color/apna-green/500",
        "color/apna-green/400"
    ]
];

  for (const [semName, lightPrim, darkPrim] of semanticsMap) {
    const semVar = figma.variables.createVariable(semName, semanticsCollection.id, "COLOR");
    if (primitiveVars[lightPrim]) {
      semVar.setValueForMode(lightModeId, figma.variables.createVariableAlias(primitiveVars[lightPrim]));
    }
    if (primitiveVars[darkPrim]) {
      semVar.setValueForMode(darkModeId, figma.variables.createVariableAlias(primitiveVars[darkPrim]));
    }
  }

  console.log("✅ COMPLETE: Created 134 Primitives + 23 Semantics (Light/Dark Aliased)!");
})();