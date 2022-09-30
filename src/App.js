import React, { useEffect, useState } from "react";

import useHttp from "./hooks/use-http";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObject) => {
    console.log(tasksObject);
    const loadedTasks = [];

    for (const taskKey in tasksObject) {
      loadedTasks.push({ id: taskKey, text: tasksObject[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const http = useHttp(
    {
      url: "https://react-http-b3296-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    },
    transformTasks
  );

  const { isLoading, error, sendRequest: fetchTasks } = http;

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
