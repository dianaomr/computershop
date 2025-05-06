import { FaClock, FaHeadphones, FaEnvelope , FaMapMarkedAlt } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
      <footer className="footer text-black text-center items-center p-4">
       <h1 className="text-lg font-bold text-center">پاسخگویی ۲۴ ساعته و ۷ روز هفته</h1>
       <div className="contact p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
         <div className="phone flex flex-col items-center p-4 rounded-lg shadow w-full md:w-1/2">
           <FaHeadphones className=" text-3xl mb-2" />
           <h2 className="text-lg font-bold">تلفن تماس و فکس</h2>
           <p className="text-lg">۰۲۱ - ۹۱۰۰۰۱۰۰</p>
           <p className="text-lg">۰۲۱ - ۶۱۹۳۰۰۰۰</p>
         </div>
 
         <div className="email flex flex-col items-center p-4 rounded-lg shadow w-full md:w-1/2">
           <FaEnvelope className=" text-3xl mb-2" />
           <h2 className="text-lg font-bold">ایمیل سازمانی</h2>
           <p className="text-lg">info@fidibo.com</p>
           <p className="text-lg">info@fidibo_contact.com</p>
         </div>

         <div className="email flex flex-col items-center p-4 rounded-lg shadow w-full md:w-1/2">
           <FaMapMarkedAlt className="text-3xl mb-2" />
           <h2 className="text-lg font-bold"> آدرس مجموعه</h2>
           <p className="text-lg">استان تهران، شهر تهران، خیابان گاندی جنوبی، نبش خیابان ۲۱، پلاک ۲۸
</p>
         </div>
       </div>
       <p className="pt-2"> کلیه حقوق مادی و معنوی این سایت متعلق به گروه فیدیبو می باشد &copy; {new Date().getFullYear()}</p>

      </footer>
   
    );
  };
  
  export default Footer;
  