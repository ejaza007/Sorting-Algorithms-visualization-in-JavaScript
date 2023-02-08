import Link from "next/link"
import Navbar from "../components/navbar"

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center h-[90vh] font-mono font-extrabold text-[50px] text-center sm:pt-0 pt-5">
        PLEASE SELECT YOUR ALGORITHM FROM THE NAV BAR ABOVE
          <p>Made by Armaghen Ejaz</p>

      </div>


    </>

  )
}
