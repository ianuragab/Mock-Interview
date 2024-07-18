import AddInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import ToggleTheme from "./_components/ThemeSwitch.jsx";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="font-bold text-primary text-4xl">Dashboard</h1>
      <h4 className="text-gray-500">Create and Start your AI Mockup Interview </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 my-4" >
        <AddInterview />
      </div>

      {/* Previous Interview List */}
      <InterviewList />
    </div>
  );
}
