import { useModalContext } from "@/context/store";
import { getAuthHeader } from "@/services/auth";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditableText from "./EditableText";
import StatusCard from "./StatusCard";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function TaskModal({ onSubmit }: { onSubmit: () => void }) {
  const taskInit = {
    title: "",
    description: "",
    status: "notStarted",
  };
  const { isOpen, onOpenChange, taskId } = useModalContext();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState(taskInit);
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const authToken = await getAuthHeader();
        const resp = await fetch(`/api/tasks/${taskId}`, {
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
        });
        if (resp.status === 401) {
          redirect("/login");
        }
        const data = await resp.json();
        setTask({
          ...data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (taskId) {
      fetchTask();
    }
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title || !task.description) {
      setError("Title and description are required");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const authToken = await getAuthHeader();
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          Authorization: `${authToken}`,
        },
      });

      if (response.status === 401) {
        redirect("/login");
      }
      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        throw new Error("Failed to create task");
      }
      setTask(taskInit);
      onOpenChange();
      onSubmit();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title || !task.description) {
      setError("Title and description are required");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const authToken = await getAuthHeader();
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          Authorization: `${authToken}`,
        },
      });
      if (response.status === 401) {
        redirect("/login");
      }
      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        throw new Error("Failed to update task");
      }

      setSubmitting(false);
      onOpenChange();
      onSubmit();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const authToken = await getAuthHeader();
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setDeleting(false);
      onOpenChange();
      onSubmit();
    } catch (error) {
      setError((error as any).message);
      setDeleting(false);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange}>
      <form onSubmit={taskId ? handleUpdate : handleCreate}>
        <ModalContent>
          {(onClose) =>
            loading ? (
              <div className="w-full h-72 flex justify-center items-center">
                <Spinner color="warning" />
              </div>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1 mt-3">
                  {!taskId ? (
                    <div className="text-3xl font-bold mb-5">New Task</div>
                  ) : null}
                  <EditableText
                    create={!taskId}
                    textStyles="text-3xl font-bold"
                    placeholder="Enter Task Title"
                    label="Task Title"
                    value={task.title}
                    onSave={(value) => setTask({ ...task, title: value })}
                  />
                </ModalHeader>
                <ModalBody>
                  {taskId && (
                    <StatusCard
                      onChange={(status) => setTask({ ...task, status })}
                      status={task.status}
                    />
                  )}
                  <EditableText
                    create={!taskId}
                    textarea
                    label="Task Description"
                    placeholder="Enter Task Description"
                    value={task.description}
                    onSave={(value) => setTask({ ...task, description: value })}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </ModalBody>
                <ModalFooter>
                  {taskId && (
                    <Button
                      isLoading={deleting}
                      disabled={submitting}
                      endContent={<TrashIcon className="w-3 h-3" />}
                      size="sm"
                      className="bg-red-600 text-white px-5 font-medium rounded-none brutal-shadow-sm transall"
                      onPress={handleDelete}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    type="submit"
                    isLoading={submitting}
                    size="sm"
                    className="bg-orange-500 text-white px-5 font-medium rounded-none brutal-shadow-sm transall"
                    onPress={() => console.log(task)}
                  >
                    Save Task
                  </Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </form>
    </Modal>
  );
}
