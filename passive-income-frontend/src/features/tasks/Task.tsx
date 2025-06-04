import { useFetch } from "../../hooks/useFetch";
import { Task as TaskI } from "../../../../shared/types";

export const Tasks = () => {
  const { data, loading, error } = useFetch<TaskI[]>("/api/tasks");

  console.log("Tasks data:", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No tasks found.</div>;
  }

  return (
    <div>
      <h1>Task Component</h1>
      <p>This is a placeholder for the Task component.</p>
      {data.length > 0 && (
        <ul>
          {data.map((task) => (
            <li key={task.taskId}>{task.programId}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
