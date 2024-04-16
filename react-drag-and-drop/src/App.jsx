// App.jsx
import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";
import Comp1 from "./components/Comp1";
import Comp2 from "./components/Comp2";
import Comp3 from "./components/Comp3";

import "./App.css";
import { Task } from "./components/Task/Task";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, component: <Comp1 /> },
    { id: 2, component: <Comp2 /> },
    { id: 3, component: <Comp3 /> },
  ]);

  const addTask = (component) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, component }]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log({ event });
    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="App">
      {/* <h1>My Tasks ✅</h1>
      <Input onSubmit={addTask} /> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            {tasks.map((item, index) => {
              return (
                <div key={index} style={{}}>
                  <Task
                    id={tasks[index].id}
                    component={tasks[index].component}
                  />
                </div>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
          {/* <Task id={tasks[0].id} component={<Comp1 />} />
          <Task id={tasks[1].id} component={<Comp2 />} />
          <Task id={tasks[2].id} component={<Comp3 />} /> */}
          {tasks.map((item, index) => {
            return (
              <div key={index} style={{ width: "100%" }}>
                <Task id={tasks[index].id} component={tasks[index].component} />
              </div>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
