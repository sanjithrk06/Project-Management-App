import { useQuery } from "@apollo/client";
import ClientCard from "./ClientCard";
import { GET_CLIENTS } from "../queries/ClientQueries";


const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div className="text-center py-10">
            <h1 className="text-2xl mb-6">Clients</h1>
            <div className="mx-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7">
                {data.clients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Clients;
