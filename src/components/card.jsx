import { useQuery } from "@tanstack/react-query";

const Card = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const dataFetch = await fetch("https://fakestoreapi.com/products");
      if (!dataFetch.ok) {
        throw new Error("Failed to fetch data");
        // this line handle error that occure during fetching
      }
      return dataFetch.json();
    },
    queryKey: ["getProducts"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("Error while fetching data");
    return <div>Error while fetching data</div>;
  }

  if (!data) {
    console.log("Data is undefined or null");
    return <div>No data found</div>;
  }

  console.log("data...", data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data?.map((item) => {
        return (
          <div
            key={item?.id}
            className="border rounded-lg p-4 shadow-lg flex flex-col items-center 
                      transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={item?.image}
              alt="picture"
              className="w-full object-cover mb-4"
            />

            <h1 className="text-xl font-semibold mb-2 hover:text-blue-600">
              {item.title}
            </h1>

            <h2 className="text-lg text-gray-700 mb-2">${item.price}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
