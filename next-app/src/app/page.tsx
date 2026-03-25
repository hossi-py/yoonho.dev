import KoreaMap from "@/components/KoreaMap";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-full flex items-center justify-center">
        <KoreaMap />
      </div>
    </main>
  );
}
