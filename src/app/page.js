import Chat from "@/components/Chat";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <Chat />
      <Contact />
    </div>
  );
}
