const discount = (amount: number) => {
  return (discount: number) => {
    let final = amount - (amount * discount) / 100;
    return final.toFixed(2);
  };
};

export default discount;

// const discount = (amount: number) => (discount: number) => {
//   const final = amount - (amount * discount) / 100;
//   return final.toFixed(2);
// };
