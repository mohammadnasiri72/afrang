import BoxImgHome from "./BoxImgHome";

async function BoxImgHomeSSR({ mainBanner }) {
  return (
    <BoxImgHome
      mainBanner={mainBanner.filter((e) => e.categoryKey === "banner_main")}
    />
  );
}

export default BoxImgHomeSSR;
