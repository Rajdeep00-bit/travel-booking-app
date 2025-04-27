
import React from "react";
import StayCard from "./StayCard";

const StayList = ({ stays, onBook }) => {
  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {stays.map((stay) => (
        <StayCard key={stay.id} stay={stay} onBook={onBook} />
      ))}
    </div>
  );
};

export default StayList;
