// import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./_components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { dark } from "@clerk/themes";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect(`/login`);
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <UserButton showName />
    </div>
  );
}

export default Home;