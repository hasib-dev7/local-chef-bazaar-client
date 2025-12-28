import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";
import FavoriteTable from "../../../../components/dashboard/table/FavoriteTable";

const UserFavoriteMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: favorite,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/favorite/${user?.email}`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  // console.log(favorite);
  return (
    <>
     <title>Local Chef Bazaar -Favorite Meals</title>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        My favorite
      </h1>

      {favorite.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not placed any review yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Meal Name</th>
                <th>Chef Name</th>
                <th>Price</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {favorite.map((favorite, index) => (
                <FavoriteTable
                  key={favorite._id}
                  favorite={favorite}
                  refetch={refetch}
                  index={index}
                ></FavoriteTable>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserFavoriteMeal;
