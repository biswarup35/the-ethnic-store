const truncateText = (text: string, lenghth: number) => {
  if (text.length > lenghth) {
    return text.slice(0, lenghth).concat("...");
  } else {
    return text;
  }
};

export default truncateText;
