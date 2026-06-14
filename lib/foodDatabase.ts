export const foodDatabase: Record<string, number> = {
  우유: 14,
  계란: 30,
  두부: 7,
  양배추: 21,
  당근: 14,
  양파: 30,
  감자: 30,
  김치: 60,
  돼지고기: 5,
  닭고기: 3,
  소고기: 5,
  버섯: 7,
  브로콜리: 7,
  사과: 21,
  바나나: 5,
  치즈: 21,
  요거트: 10
};

export function getRecommendedExpireDate(name: string) {
  const key = Object.keys(foodDatabase).find((item) => name.includes(item));
  const days = key ? foodDatabase[key] : 7;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
