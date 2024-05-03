import Image from "next/image";
import x from "../../public/images/X.png"
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="md:flex p-5 space-y-10">
        <div>
          <Image className="w-24 md:w-full" src={x} alt="Profile Picture" />
        </div>
        <div className="space-y-10">
          <h1 className="text-6xl font-bold ">Happening now</h1>
          <p className="text-2xl font-extrabold">Join today.</p>

          <Link href="/signup">
            <button className="bg-blue-500 text-white text-xl rounded-full w-60 h-10 font-sans font-semibold text-center mt-5">Create account </button>
          </Link>

          <h1 className="font-bold">Already have an account?</h1>
          <Link href="/login">
            <button className="w-60 mt-8 rounded-full h-10 font-semibold text-blue-400" style={{ border: "1px solid #999" }}>Sign in</button>
          </Link>
        </div>

      </div>
    </>
  );
}
