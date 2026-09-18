/*
  Mise en forme des dates en français. Intl écrit « 1 décembre », l'usage
  français écrit « 1er décembre ».
*/
export function enClair(valeur) {
  const d = new Date(valeur);
  const s = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  return s.replace(/^1 /, '1er ');
}

/*
  L'année d'un chiffre, ajoutée au titre de sa source seulement si le titre
  ne la porte pas déjà, sinon on lirait « Rapport d'activité FEVE 2024, 2024 ».
*/
export function anneeUtile(date, sourceTitre) {
  if (!date) return null;
  const annee = String(date).slice(0, 4);
  return sourceTitre && sourceTitre.includes(annee) ? null : annee;
}
