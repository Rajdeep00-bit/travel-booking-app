import stays from "../data/stays.json";
import StayCard from "../components/StayCard";
import Hero from "../components/Hero";

export default function Home() {
  const handleBookNow = (stay) => {
    console.log("Booking Stay:", stay);
   
  };

  return (
    <div>
      <Hero />
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stays.map(stay => (
          <StayCard key={stay.id} stay={stay} onBook={handleBookNow} />
        ))}
      </section>
    </div>
  );
}
