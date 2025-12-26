import Image from "next/image";
import AllPosts from "./posts/_components/AllPosts";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <AllPosts />
      </main>
    </div>
  );
}
