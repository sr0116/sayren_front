import {statusLabelMap} from "@/utils/statusLabelMap";

export function getEnumOptions(enumType) {
  const enumMap = statusLabelMap[enumType];
  if (!enumMap) {
    console.warn(`Enum 타입 '${enumType}'을 찾을 수 없습니다.`);
    return [];
  }
  return Object.entries(enumMap).map(([value, label]) => ({
    value,
    label,
  }));
}