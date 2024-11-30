import { useState } from "react";
import Modal from "./Modal";

export default function EditTodo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Task Details">
      <p>Here you can edit the task or see its details.</p>
      <form>
        <label htmlFor="taskName">Task Name</label>
        <input type="text" id="taskName" placeholder="Enter task name" />
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
}
