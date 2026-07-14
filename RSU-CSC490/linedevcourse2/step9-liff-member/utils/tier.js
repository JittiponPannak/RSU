/** คำนวณระดับสมาชิกจากแต้มสะสม */
export function getTier(points) {
  if (points >= 500) return 'gold';
  if (points >= 100) return 'silver';
  return 'bronze';
}

export const TIER_LABELS = {
  bronze: 'บรอนซ์',
  silver: 'ซิลเวอร์',
  gold: 'โกลด์',
};
