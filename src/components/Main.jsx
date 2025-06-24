import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import loader from "../assets/loader.gif";

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/task")
      .then((response) => {
        setTasks(response.data);
        console.log(tasks);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching tasks: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="main-content flex-1 h-screen overflow-y-auto p-8 text-black">
        <h1 className="primary-color font-bold text-3xl w-full text-center">
          Your Tasks
        </h1>
        <div className="flex items-center gap-1 wraponshrink">
          <div className="data mt-5 border rounded w-full md:w-1/2 bg-[whitesmoke] flex-shrink">
            <div className="bg-white m-3 p-5">
              <div className="header flex justify-between items-center">
                <div className="primary-color">To-Do</div>
                <button className="text-black p-2 primary-bg text-white rounded shadow flex items-center gap-3">
                  <span className="text-2xl">+ </span>Add Task
                </button>
              </div>
              {tasks.map((task) => {
                return (
                  <ol className="list-type-disc">
                    <div className="task p-5" key={task._id}>
                      <li className="text-lg font-semibold">{task.title}</li>
                      <div className="flex items-center justify-between w-1/2 wraponshrink">
                        {task.status === "Pending" ? (
                          <li className="text-red-700 w-full">
                            Status: {task.status}
                          </li>
                        ) : (
                          <li className="text-green-900 w-full">
                            Status: {task.status}
                          </li>
                        )}
                        <button className="text-black p-2 sec-color text-white rounded shadow flex items-center gap-3 text-sm mt-2 flex-wrap">
                          ✓ Mark as Finished
                        </button>
                      </div>
                    </div>
                  </ol>
                );
              })}
            </div>
          </div>
          <div className="data mt-5 border rounded w-full md:w-1/2 bg-[whitesmoke] flex-shrink">
            <div className="bg-white m-3 p-5">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
