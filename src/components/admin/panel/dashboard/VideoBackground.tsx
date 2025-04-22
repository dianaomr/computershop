export default function VideoBackground() {
    return (
      <video
        autoPlay
        loop
        muted
        className=" absolute top-0 left-0 w-full h-full object-cover "
      >
        {/* <source src="/videos/background.mp4" type="video/mp4" /> */}
        <source src="/videos/back2.mp4" type="video/mp4" />

        مرورگر شما از ویدیو پشتیبانی نمی‌کند.
      </video>
      
      
    );
  }
  