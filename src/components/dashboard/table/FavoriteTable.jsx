
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Trash2 } from "lucide-react";
const FavoriteTable = ({ favorite, index, refetch }) => {
  const { chefName, mealName, price, createdAt, _id } = favorite;
  const axiosSecure = useAxiosSecure();
  // delete favorite meal
  const handlefavoriteDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/favorite/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your favorite meal has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <>
      {/* row 1 */}
      <tr className="bg-base-200">
        <th>{index + 1}</th>
        <td>{mealName}</td>
        <td>{chefName}</td>
        <td>{price}</td>
        <td>{new Date(createdAt).toDateString()}</td>
        <td  onClick={() => handlefavoriteDelete(_id)}>
         <Trash2 size={30} color="#ff0000" />
        </td>
      </tr>
    </>
  );
};

export default FavoriteTable;
