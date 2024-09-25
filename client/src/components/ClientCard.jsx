import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";

const ClientCard = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {
      id: client.id,
    },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id != deleteClient.id),
        },
      });
    },
  });

  return (
    <>
      <div
        key={client.id}
        className="border p-4 rounded-xl bg-slate-200 shadow-md"
      >
        <h2 className=" text-base font-semibold">
          <span className=" font-bold text-xl">{client.name}</span>
        </h2>
        <p className="text-base font-semibold">
          <span className=" text-lg">{client.email}</span>
        </p>
        <p className="text-base font-semibold">
          <span className=" text-lg">{client.phone}</span>
        </p>
        {/* Delete Button */}
        <button
          onClick={deleteClient}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </>
  );
};

export default ClientCard;
