const discount = (amount: number) => {
  return (discount: number) => {
    let final = amount - (amount * discount) / 100;
    return parseFloat(final.toFixed(2));
  };
};

export default discount;
