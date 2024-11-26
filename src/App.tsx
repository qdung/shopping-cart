import Header from "./components/Header";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
