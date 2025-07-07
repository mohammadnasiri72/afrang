import { setOpenMenuRes } from "@/redux/slices/menuResSlice";
import { Drawer, Menu } from "antd";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

function DrawerMenuResponsive() {
  const open = useSelector((store) => store.menuRes.openMenuRes);
  const disPatch = useDispatch();

  const showDrawer = () => {
    disPatch(setOpenMenuRes(true));
  };

  const onClose = () => {
    disPatch(setOpenMenuRes(false));
  };

  const Title = () => {
    return (
      <>
        <div className="flex justify-end">
          <img className="w-11" src="/images/logo.png" alt="" />
        </div>
      </>
    );
  };

  const menuData = [
    {
      key: "products",
      title: "محصولات",
      children: [
        {
          key: "DSLR",
          title: "دوربین DSLR",
          children: [
            {
              key: "connon",
              title: "دوربین کانن",
              children: [
                { key: "connon1", title: "connon1" },
                { key: "connon2", title: "connon2" },
                { key: "connon3", title: "connon3" },
                { key: "connon4", title: "connon4" },
              ],
            },
            { key: "nicon", title: "دوربین نیکون" },
            { key: "sony", title: "دوربین سونی" },
            { key: "pentax", title: "دوربین پنتاکس" },
            { key: "olimpus", title: "دوربین الیمپوس" },
            { key: "sigma", title: "دوربین سیگما" },
          ],
        },
        {
          key: "homeCamera",
          title: "دوربین عکاسی خانگی",
          children: [
            { key: "compactPlus", title: "کامپکت پیشرفته" },
            { key: "compactNoWater", title: "کامپکت ضدآب" },
            { key: "compactFast", title: "کامپکت چاپ سریع و لوازم جانبی" },
            { key: "compactZoom", title: "کامپکت سوپر زوم" },
            { key: "compactDefault", title: "کامپکت استاندارد" },
          ],
        },
        {
          key: "NotMirror",
          title: "دوربین بدون آینه",
          children: [
            { key: "connonMirror", title: "دوربین کانن" },
            { key: "niconMirror", title: "دوربین نیکون" },
            { key: "sonyMirror", title: "دوربین سونی" },
            { key: "fogy", title: "دوربین فوجی فیلم" },
            { key: "panasonic", title: "دوربین پاناسونیک" },
          ],
        },
        {
          key: "film",
          title: "دوربین فیلمبرداری",
          children: [
            { key: "hoselblad", title: "دوربین هاسلبلاد" },
            { key: "laika", title: "دوربین لایکا" },
            { key: "fogyFilm", title: "دوربین فوجی فیلم" },
            { key: "pentaxFilm", title: "دوربین پنتاکس" },
          ],
        },
      ],
    },

    {
      key: "maxPay",
      title: "پرفروش ها",
    },
    {
      key: "discount",
      title: "تخفیف ها و پیشنهادات",
    },
    {
      key: "about",
      title: "درباره ما",
    },
    {
      key: "priceList",
      title: "لیست قیمت",
    },
    {
      key: "Installment",
      title: "فروش اقساطی",
    },
    {
      key: "secondCategory",
      title: "دسته دوم ها",
    },
    {
      key: "news",
      title: "اخبار",
    },
    {
      key: "TechnicalVocabulary",
      title: "واژگان فنی",
    },
    {
      key: "gallery",
      title: "گالری",
    },
    {
      key: "warranty",
      title: "گارانتی",
    },
    {
      key: "links",
      title: "لینک ها",
    },
    {
      key: "contact",
      title: "تماس با ما",
    },
  ];

  // const renderMenuItems = (items) => {
  //   return items.map((item) => {
  //     if (item.children) {
  //       return (
  //         <Menu.SubMenu key={item.key} title={item.title}>
  //           {renderMenuItems(item.children)}
  //         </Menu.SubMenu>
  //       );
  //     }
  //     return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
  //   });
  // };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.children) {
        return {
          key: item.key,
          label: item.title,
          children: renderMenuItems(item.children),
        };
      }
      return {
        key: item.key,
        label: item.title,
      };
    });
  };

  const menuItems = renderMenuItems(menuData);

  return (
    <>
      <div className="cursor-pointer" onClick={showDrawer}>
        <FaBars className="text-2xl" />
      </div>
      <Drawer
        zIndex={1001}
        width={300}
        title={<Title />}
        onClose={onClose}
        styles={{
          direction: "ltr",
          width: "100%",
          body: {
            padding: 0,
          },
        }}
        open={open}
        closeIcon={
          <div className="bg-[#d1182b] rounded-full p-1 text-white ">
            <FaXmark className="text-xl" />
          </div>
        }
      >
        <div className="text-[#d1182b] mt-3 font-semibold px-3">صفحه نخست</div>
       
        <Menu
          mode="inline"
          style={{ width: "100%", direction: "rtl" , zIndex:'1000'}}
          className="custom-menu"
          items={menuItems} // استفاده از ویژگی items
        />
      </Drawer>
    </>
  );
}

export default DrawerMenuResponsive;
