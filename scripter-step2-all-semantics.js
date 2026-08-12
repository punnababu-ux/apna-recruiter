const primColl = figma.variables.getLocalVariableCollections().find(c => c.name === "Primitives");
const primVars = figma.variables.getLocalVariables().filter(v => v.variableCollectionId === primColl.id);
const primMap = {};
primVars.forEach(v => primMap[v.name] = v);

const semColl = figma.variables.createVariableCollection("Semantics");
const lightModeId = semColl.modes[0].modeId;
semColl.renameMode(lightModeId, "Light");
const darkModeId = semColl.addMode("Dark");

function addSem(name, lightPrim, darkPrim) {
  const semVar = figma.variables.createVariable(name, semColl.id, "COLOR");
  if (primMap[lightPrim]) {
    semVar.setValueForMode(lightModeId, figma.variables.createVariableAlias(primMap[lightPrim]));
  }
  if (primMap[darkPrim]) {
    semVar.setValueForMode(darkModeId, figma.variables.createVariableAlias(primMap[darkPrim]));
  }
}

addSem("surface/background", "color/gray/0", "color/apna-navy/950");
addSem("surface/foreground", "color/gray/950", "color/gray/50");
addSem("surface/card", "color/gray/0", "color/apna-navy/900");
addSem("surface/card-foreground", "color/gray/950", "color/gray/50");
addSem("surface/popover", "color/gray/0", "color/apna-navy/900");
addSem("surface/popover-foreground", "color/gray/950", "color/gray/50");
addSem("role/primary", "color/apna-green/600", "color/apna-green/500");
addSem("role/primary-foreground", "color/gray/50", "color/gray/50");
addSem("role/secondary", "color/gray/100", "color/apna-navy/800");
addSem("role/secondary-foreground", "color/gray/900", "color/gray/50");
addSem("role/muted", "color/gray/100", "color/apna-navy/800");
addSem("role/muted-foreground", "color/gray/500", "color/gray/400");
addSem("role/accent", "color/apna-green/50", "color/apna-navy/900");
addSem("role/accent-foreground", "color/apna-green/700", "color/apna-green/200");
addSem("role/highlight", "color/apna-gold/400", "color/apna-gold/400");
addSem("role/highlight-foreground", "color/gray/950", "color/gray/950");
addSem("role/destructive", "color/red/600", "color/red/400");
addSem("role/destructive-foreground", "color/gray/50", "color/gray/50");
addSem("role/destructive-subtle", "color/red/100", "color/red/900");
addSem("role/success", "color/apna-green/600", "color/apna-green/500");
addSem("role/success-foreground", "color/gray/50", "color/gray/50");
addSem("role/success-subtle", "color/apna-green/100", "color/apna-green/900");
addSem("role/warning", "color/amber/500", "color/amber/400");
addSem("role/warning-foreground", "color/gray/950", "color/gray/950");
addSem("role/warning-subtle", "color/amber/100", "color/amber/900");
addSem("role/info", "color/blue/600", "color/blue/400");
addSem("role/info-foreground", "color/gray/50", "color/gray/950");
addSem("role/info-subtle", "color/blue/100", "color/blue/900");
addSem("role/border", "color/gray/200", "color/apna-navy/700");
addSem("role/input", "color/gray/200", "color/apna-navy/700");
addSem("role/ring", "color/apna-green/500", "color/apna-green/400");
addSem("sidebar/background", "color/gray/0", "color/apna-navy/900");
addSem("sidebar/foreground", "color/gray/950", "color/gray/50");
addSem("sidebar/primary", "color/apna-green/600", "color/apna-green/500");
addSem("sidebar/primary-foreground", "color/gray/50", "color/gray/50");
addSem("sidebar/accent", "color/gray/200", "color/gray/800");
addSem("sidebar/accent-foreground", "color/gray/950", "color/gray/50");
addSem("sidebar/border", "color/gray/200", "color/apna-navy/700");
addSem("sidebar/ring", "color/apna-green/500", "color/apna-green/400");
addSem("chart/1", "color/apna-green/600", "color/apna-green/400");
addSem("chart/2", "color/apna-gold/500", "color/apna-gold/400");
addSem("chart/3", "color/apna-sky/400", "color/apna-sky/400");
addSem("chart/4", "color/apna-plum/600", "color/gray/400");
addSem("chart/5", "color/apna-green/300", "color/apna-green/700");
print("🎉 ALL 44 Semantics Created and Aliased to Primitives!");
