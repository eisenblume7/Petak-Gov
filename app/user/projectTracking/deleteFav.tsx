"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from 'next/navigation';
import type { ProjectTracking } from "@prisma/client";
import axios from "axios";

const DeleteFav = ({ projectTracking }: { projectTracking: ProjectTracking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (projectTrackingId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/pengguna/${projectTrackingId}`);
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

/*    router.refresh();*/
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div>
        <button className="btn btn-error btn-sm" onClick={() => handleDelete(projectTracking.id)}>
          Delete
        </button>
      </div>
  );
};

export default DeleteFav;
