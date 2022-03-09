import Dock from "./components/Dock/Dock";
import Window from "./layouts/Window/Window";

function App() {
  return (
    <div className="App">
      <Window width={600} height={400} open />
      {/* <Window width={400} height={300} open /> */}
      <Dock />
    </div>
  );
}

export default App;
