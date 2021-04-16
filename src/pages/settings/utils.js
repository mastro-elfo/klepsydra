// TODO: delete if not used

// export function dump(settings) {
//   localStorage.setItem("settings", JSON.stringify(settings));
// }
//
// const defaultValue = {
//   price: 10,
//   enableDiscountRound: false,
//   discountRound: 1,
//   currency: "€",
// };
//
// export function load() {
//   try {
//     const settings = localStorage.getItem("settings");
//     if (!settings) {
//       throw new Error("ValueError");
//     }
//     return Object.assign(defaultValue, JSON.parse(settings));
//   } catch {
//     return defaultValue;
//   }
// }
