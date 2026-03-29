import {
  Stage,
  Layer,
  Rect,
  Circle,
  Arrow,
  Line,
  Transformer,
} from "react-konva";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Konva from "konva";

import type {
  RectangleShape,
  CircleShape,
  ArrowShape,
  ScribbleShape,
} from "@/types/types";
import { ACTIONS, type ActionType } from "@/utils/constants";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  const isPainting = useRef(false);
  const currentShapeId = useRef<string | null>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  const [action, setAction] = useState<ActionType>(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#ff0000");
  const [strokeColor, setStrokeColor] = useState("#000000");

  const [rectangles, setRectangles] = useState<RectangleShape[]>([]);
  const [circles, setCircles] = useState<CircleShape[]>([]);
  const [arrows, setArrows] = useState<ArrowShape[]>([]);
  const [scribbles, setScribbles] = useState<ScribbleShape[]>([]);

  const isDraggable = action === ACTIONS.SELECT;

  /* ================= SIZE HANDLING ================= */
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ================= POINTER EVENTS ================= */

  const onPointerDown = () => {
    if (action === ACTIONS.SELECT || !stageRef.current) return;

    const pos = stageRef.current.getPointerPosition();
    if (!pos) return;

    const { x, y } = pos;
    const id = uuidv4();

    currentShapeId.current = id;
    isPainting.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((p) => [
          ...p,
          { id, x, y, width: 20, height: 20, fillColor, strokeColor },
        ]);
        break;

      case ACTIONS.CIRCLE:
        setCircles((p) => [
          ...p,
          { id, x, y, radius: 20, fillColor, strokeColor },
        ]);
        break;

      case ACTIONS.ARROW:
        setArrows((p) => [
          ...p,
          { id, points: [x, y, x + 20, y + 20], strokeColor },
        ]);
        break;

      case ACTIONS.SCRIBBLE:
        setScribbles((p) => [
          ...p,
          { id, points: [x, y], strokeColor },
        ]);
        break;
    }
  };

  const onPointerMove = () => {
    if (!isPainting.current || !stageRef.current) return;

    const pos = stageRef.current.getPointerPosition();
    if (!pos) return;

    const { x, y } = pos;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((p) =>
          p.map((r) =>
            r.id === currentShapeId.current
              ? { ...r, width: x - r.x, height: y - r.y }
              : r
          )
        );
        break;

      case ACTIONS.CIRCLE:
        setCircles((p) =>
          p.map((c) =>
            c.id === currentShapeId.current
              ? { ...c, radius: Math.hypot(x - c.x, y - c.y) }
              : c
          )
        );
        break;

      case ACTIONS.ARROW:
        setArrows((p) =>
          p.map((a) =>
            a.id === currentShapeId.current
              ? { ...a, points: [a.points[0], a.points[1], x, y] }
              : a
          )
        );
        break;

      case ACTIONS.SCRIBBLE:
        setScribbles((p) =>
          p.map((s) =>
            s.id === currentShapeId.current
              ? { ...s, points: [...s.points, x, y] }
              : s
          )
        );
        break;
    }
  };

  const onPointerUp = () => {
    isPainting.current = false;
  };

  const onSelect = (e: any) => {
    if (action !== ACTIONS.SELECT) return;
    transformerRef.current?.nodes([e.currentTarget]);
  };
 

  return (
    <div ref={containerRef} className="relative w-screen h-screen bg-gray-100">
     
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-xl border border-gray-200">
          {Object.values(ACTIONS).map((tool) => (
            <button
              key={tool}
              onClick={() => setAction(tool)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all
                ${
                  action === tool
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tool}
            </button>
          ))}

          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className="w-8 h-8 rounded-md cursor-pointer "
          />

          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-8 h-8 rounded-md cursor-pointer "
          />
        </div>
      </div>

   
      {size.width > 0 && size.height > 0 && (
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={size.width}
              height={size.height}
              fill="#ffffff"
              onClick={() => transformerRef.current?.nodes([])}
            />

            {rectangles.map((r) => (
              <Rect
                key={r.id}
                {...r}
                fill={r.fillColor}
                stroke={r.strokeColor}
                strokeWidth={2}
                draggable={isDraggable}
                onClick={onSelect}
              />
            ))}

            {circles.map((c) => (
              <Circle
                key={c.id}
                {...c}
                fill={c.fillColor}
                stroke={c.strokeColor}
                strokeWidth={2}
                draggable={isDraggable}
                onClick={onSelect}
              />
            ))}

            {arrows.map((a) => (
              <Arrow
                key={a.id}
                points={a.points}
                stroke={a.strokeColor}
                strokeWidth={2}
                draggable={isDraggable}
                onClick={onSelect}
              />
            ))}

            {scribbles.map((s) => (
              <Line
                key={s.id}
                points={s.points}
                stroke={s.strokeColor}
                strokeWidth={2}
                lineCap="round"
                lineJoin="round"
                draggable={isDraggable}
                onClick={onSelect}
              />
            ))}

            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      )}
    </div>
  );
}
