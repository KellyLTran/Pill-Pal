import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Graph from "../components/Graph";
import AddInfo from "../components/AddInfo";
import useUserStore from "../hooks/userStore";
import useMedicationStore from "../hooks/medicationStore";

export default function HomePage() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  // Get user data from Zustand store
  const { user, isAuthenticated } = useUserStore();
  const { allMeds, selectedMed, fetchAllMeds, setSelectedMed, recordEntry } = useMedicationStore();

  // Function to determine the welcome message based on the time of day
  const getWelcomeMessage = () => {
    const currTime = new Date();
    const hour = currTime.getHours();

    if (hour >= 0 && hour < 12) {
      return "Good Morning, ";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon, ";
    } else {
      return "Good Evening, ";
    }
  };

  // Fetch medications and set welcome message on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setWelcomeMessage(getWelcomeMessage());
        await fetchAllMeds();
      } catch (error) {
        console.error("Error fetching medications:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [fetchAllMeds]);

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#ff6b6b] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ff6b6b] text-white font-montserrat font-bold">
      {/* Welcome Message */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl">
          {welcomeMessage} {user ? user.name : "Guest"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
        {/* AddInfo Component */}
        <div className="flex-1">
          <AddInfo allMeds={allMeds} setSelectedMed={setSelectedMed} />
        </div>

        {/* Graph Component */}
        <div className="flex-1">
          <Graph />
        </div>
      </div>

      {/* Record Entry Button (only for authenticated users) */}
      {isAuthenticated && (
        <div className="mt-8">
          <Button
            className="bg-white text-black border-none hover:bg-gray-100 transition-colors"
            disabled={!selectedMed}
            onClick={() => recordEntry(user.id)} // Pass the user ID to recordEntry
          >
            Record Entry
          </Button>
        </div>
      )}
    </div>
  );
}