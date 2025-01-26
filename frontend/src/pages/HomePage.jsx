import React, { useState, useEffect } from "react";
import Graph from "../components/Graph";
import { Button } from "react-bootstrap";
import AddInfo from "../components/AddInfo";
import { axiosInstance } from "../lib/axios";

import useUserStore from "../hooks/userStore"; // Import Zustand store
import useMedicationStore from "../hooks/medicationStore";

export default function HomePage() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // Get user data from Zustand store
  const { user, isAuthenticated } = useUserStore();
  const {allMeds, selectedMed, fetchAllMeds, recordEntry} = useMedicationStore();

  useEffect(() => {
    const currTime = new Date();
    const morningTime = new Date();
    morningTime.setHours(0, 0, 0, 0);

    const afternoonTime = new Date();
    afternoonTime.setHours(12, 0, 0, 0);

    const eveningTime = new Date();
    eveningTime.setHours(17, 30, 0, 0);

    const messages = ["Good Morning, ", "Good Afternoon, ", "Good Evening, "];

    if (currTime >= morningTime && currTime < afternoonTime) {
      setWelcomeMessage(messages[0]);
    } else if (currTime >= afternoonTime && currTime < eveningTime) {
      setWelcomeMessage(messages[1]);
    } else {
      setWelcomeMessage(messages[2]);
    }

    fetchAllMeds();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Montserrat",
        fontWeight: "bold",
        backgroundColor: "#ff6b6b",
        height: "100vh",
      }}
      className="flex flex-col items-center justify-center pt-3 text-center text-white"
    >
      <div>
        <h1 className="mb-3 text-3xl">
          {welcomeMessage} {user ? user.name : "Guest"}
        </h1>
      </div>

      <div className="flex flex-row">
        <AddInfo allMeds={allMeds} setSelectedMed={setSelectedMed} />
        <Graph />
      </div>

      {isAuthenticated && (
        <Button
          style={{ backgroundColor: "white", color: "black", border: "none" }}
          disabled={!selectedMed}
          onClick={recordEntry}
        >
          Record Entry
        </Button>
      )}
    </div>
  );
}