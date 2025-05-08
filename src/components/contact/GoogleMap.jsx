import { GrLocation } from "react-icons/gr";

function GoogleMap() {
  return (
    <>
      <div className="w-full -mt-14">
        <div className="mb-[30px]">
          <div className="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481569!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e52963ac45bbcb%3A0xf05e8d125e82af10!2sDos%20Mas!5e0!3m2!1sen!2sus!4v1671220374408!5m2!1sen!2sus"
              height="450"
              width="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="max-w-[600px] py-[25px] px-[20px] flex rounded-[7px] bg-[#ffffffeb] m-auto relative z-10 mt-[-40px] items-center text-[13px] text-[#210600]">
            <div className="bg-[#18d1be] text-white w-[40px] text-[16px] flex items-center h-[40px] justify-center rounded-[4px] ml-[15px]">
              <GrLocation />
            </div>
            <div>
              <span className="text-[#747475]">آدرس ما</span>
              <p className="mb-0 font-[600]">
                تهران- خیابان انقلاب -نرسیده به پیچ شمیران- بهار جنوبی - برج
                بهار - طبقه اول تجاری-واحد 205
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GoogleMap;
