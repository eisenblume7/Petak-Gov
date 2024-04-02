"use client";
import { useState, SyntheticEvent } from "react";
import type { owner } from "@prisma/client";
import type { kategori } from "@prisma/client";
import type { status } from "@prisma/client";
import { useRouter } from 'next/navigation';
import axios from "axios";

type Project = {
  id: number;
  name: string;
  location: string;
  kategoriId: string;
  ownerId: number;
  statusId: string;
};

const UpdateProduct = ({
                         owners,
                         kategories,
                         statuses,
                         project,
                       }: {
  owners: owner[];
  kategories: kategori[];
  statuses: status[];
  project: Project;
}) => {
  const [name, setName] = useState(project.name);
  const [location, setLocation] = useState(project.location);
  const [kategori, setKategori] = useState(project.kategoriId);
  const [owner, setOwner] = useState(project.ownerId);
  const [status, setStatus] = useState(project.statusId );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/projects/${project.id}`, {
      name: name,
      price: location,
      kategoriId: Number(kategori),
      ownerId: Number(owner),
      statusId: Number(status),
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div>
        <button className="btn" onClick={handleModal}>
          Edit
        </button>

        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update</h3>
            <form onSubmit={handleUpdate}>
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
                <label className="label font-bold">Kategori</label>
                <select
                    value={kategori}
                    onChange={(e) => setOwner(Number(e.target.value))}
                    className="select select-bordered"
                >

                  {kategories.map((kategori) => (
                      <option value={kategori.id} key={kategori.id}>
                        {kategori.name}
                      </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Owner</label>
                <select
                    value={owner}
                    onChange={(e) => setOwner(Number(e.target.value))}
                    className="select select-bordered"
                >

                  {owners.map((owner) => (
                      <option value={owner.id} key={owner.id}>
                        {owner.name}
                      </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Status</label>
                <select
                    value={status}
                    onChange={(e) => setOwner(Number(e.target.value))}
                    className="select select-bordered"
                >

                  {statuses.map((status) => (
                      <option value={status.id} key={status.id}>
                        {status.name}
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
                      Update
                    </button>
                ) : (
                    <button type="button" className="btn loading">
                      Updating...
                    </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default UpdateProduct;
