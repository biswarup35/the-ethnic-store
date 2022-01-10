const fetchFavorites = async (list: string[]) => {
  const res = await fetch(
    `https://next-backend-api.vercel.app/api/products/f6cd05691ea`
  );

  console.log(res);
};

export default fetchFavorites;
