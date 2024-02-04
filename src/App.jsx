import "reactflow/dist/style.css";
import Flow from "./Flow";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h1>Fund flow demo</h1>
      <Flow />
    </div>
  );
}
