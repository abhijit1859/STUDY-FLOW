 import Whiteboard from "@/components/WhiteBoard";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Canvas = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Whiteboard />
    </div>
  )
}

export default Canvas