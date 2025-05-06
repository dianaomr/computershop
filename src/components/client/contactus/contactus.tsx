"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Calendar from "react-calendar";
import moment from "jalali-moment";
import "react-calendar/dist/Calendar.css";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
// import { FaClock, FaHeadphones, FaEnvelope } from "react-icons/fa";
// import "../../components/contactus/contactus.css";

const Map = dynamic(() => import("./map"), { ssr: false });

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام فقط باید شامل حروف فارسی باشد")
    .required("نام و نام خانوادگی الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  phone: yup
    .string()
    .matches(/^09\d{9}$/, "شماره تماس باید با 09 شروع شده و ۱۱ رقم باشد")
    .required("شماره تماس الزامی است"),
  subject: yup.string().required("موضوع الزامی است"),
  message: yup
    .string()
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد")
    .required("متن پیام الزامی است"),
});

const iranianHolidays: string[] = [
  "1403-01-01",
  "1403-01-02",
  "1403-01-12",
  "1403-01-13",
  "1403-03-14",
  "1403-03-15",
  "1403-11-22",
  "1403-12-29",
];

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [date, setDate] = useState<Date | null>(new Date());

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="contact-form rtl container mx-auto p-4 space-y-8 text-right">
      {/* فرم ارتباط با ما */}
      <h1 className="text-2xl font-bold m-1">تماس با ما</h1>
      <p className="text-md text-red text-black">
        لطفاً پیش از ارسال ایمیل یا تماس تلفنی، ابتدا پرسش‌‌های متداول را مشاهده کنید.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form flex flex-col items-center gap-8 bg-gray-100 p-6 rounded-lg shadow-lg text-right"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col w-full">
            <input
              {...register("name")}
              placeholder="نام و نام خانوادگی"
              className="input w-full h-10 text-right text-white p-2 rounded-md border"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              {...register("email")}
              placeholder="ایمیل"
              className="input w-full h-10 text-right text-white p-2 rounded-md border"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col w-full">
            <input
              {...register("phone")}
              placeholder="شماره تماس"
              className="input w-full h-10 text-right text-white p-2 rounded-md border"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              {...register("subject")}
              placeholder="موضوع"
              className="input w-full h-10 text-right text-white p-2 rounded-md border"
            />
            <p className="text-red-500 text-sm">{errors.subject?.message}</p>
          </div>
        </div>

        <div className="w-full">
          <textarea
            {...register("message")}
            placeholder="متن پیام"
            className="input w-full h-20 text-right text-white p-2 rounded-md border"
          ></textarea>
          <p className="text-red-500 text-sm">{errors.message?.message}</p>
        </div>

        <button type="submit" className="send text-blue px-6 py-2 rounded-lg">
          ارسال
        </button>
      </form>

      {/* تقویم فارسی */}
      <div className="Calendar bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-xl font-semibold mb-4">تعطیلات رسمی ما</h1>
        <p>
          روزهایی که به دلیل تعطیلی رسمی، که ما هیچ‌گونه پاسخگویی، سرویس‌دهی و خدماتی نداریم در سال ۱۴۰۳ به
          شرح زیر است:
        </p>
        <Calendar
          value={date ?? new Date()}
          onChange={(value) => setDate(value as Date)}
          locale="fa-IR"
          tileClassName={({ date }) => {
            const formattedDate = moment(date).format("jYYYY-jMM-jDD");
            return iranianHolidays.includes(formattedDate) ? "bg-red-500 text-white" : "";
          }}
          className="w-full border border-gray-400 bg-white font-sans"
        />
      </div>

      {/* اطلاعات تماس و نقشه */}
      <div className="map bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-xl font-bold">دفتر مرکزی</h1>
        <p>استان تهران، شهر تهران، خیابان گاندی جنوبی، نبش خیابان ۲۱، پلاک ۲۸</p>
        <div className="h-96 mt-4">
          <Map />
        </div>
      </div>
    </div>
  );
}

