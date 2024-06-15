"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

type Project = {
  id: number;
  name: string;
  location: string;
  kategoriId: number; // Change from string to number
  ownerId: number;
  statusId: number;
  kategori: {
    id: number;
    name: string;
  };
  owner: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
};

const DeleteProduct = ({ project }: { project: Project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (projectId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/projects/${projectId}`);
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
        <button className="btn btn-error btn-sm" onClick={handleModal}>
          Delete
        </button>

        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are sure to delete {project.name}?
            </h3>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                No
              </button>
              {!isLoading ? (
                  <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-primary"
                  >
                    Yes
                  </button>
              ) : (
                  <button type="button" className="btn loading">
                    Deleting...
                  </button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default DeleteProduct;
