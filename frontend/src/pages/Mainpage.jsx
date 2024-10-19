import Navbar from "../components/Navbar";
import Nickname from "../components/Mainpage/Nickname";
import video from "../assets/background.mp4"

export default function Mainpage() {


  return (
    <div className="relative w-full h-screen">
      <Navbar />
      <div className="absolute w-full h-screen overflow-hidden">
        {/* Video Background */}
        <video
          className="top-0 left-0 w-full h-full object-cover opacity-55"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <div className="absolute m-auto mt-24 w-full">
        <Nickname />
      </div>
    </div>
  )
}

