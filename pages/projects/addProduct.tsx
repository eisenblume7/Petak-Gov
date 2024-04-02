"use client";
import { useState, SyntheticEvent } from "react";
import type { owner } from "@prisma/client";
/*import { useRouter } from 'next/navigation';*/
import axios from "axios";

const AddProduct = ({ owners }: { owners: owner[] }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [owner, setOwner] = useState("" );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

/*  const router = useRouter();*/
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post("/api/projects", {
      name: name,
      location: location,
      ownerId: Number(owner),
    });
    setIsLoading(false);
    setName("");
    setLocation("");
    setOwner("");
/*    router.refresh();*/
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Project</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Project Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input input-bordered"
                placeholder="Location"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Owner</label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Owner
                </option>
                {owners.map((owner) => (
                  <option value={owner.id} key={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
