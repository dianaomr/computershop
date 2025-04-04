import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black p-4 text-white flex justify-between pl-16 pr-24 ">
      <div className="text-3xl font-bold">
        <img src="https://about.digikala.com/_next/static/media/fidibo.f7169ead.svg"></img>
      </div>
      <ul dir="rtl" className="flex space-x-10 text-lg">
        <li>
          <Link href="/">خانه</Link>
        </li>
        <li>
          <Link href="/products">محصولات</Link>
        </li>
        <li>
          <Link href="/aboutus">درباره ما</Link>
        </li>
        <li>
          <Link href="/contactus">تماس با ما</Link>
        </li>
        <li>
          <Link href="/cart">سبد خرید</Link>
        </li>
        <li>
          <Link href="/login">ورود / ثبت نام</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
