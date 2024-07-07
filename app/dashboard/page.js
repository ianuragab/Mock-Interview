import AddInterview from "./_components/AddNewInterview";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="font-semibold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your AI Mockup Interview </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-4" >
        <AddInterview />
      </div>

      
    </div>
  );
}
