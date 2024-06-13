
import Chat from "@/components/Chat";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <Chat />
      <Contact />
    </div>
  );
}
