import { FaRegTrashAlt } from "react-icons/fa";
const FavoriteTable = ({ favorite, index, refetch }) => {
  const { chefName, mealName, price, createdAt, _id } = favorite;
  // delete favorite meal
  const handlefavoriteDelete = async (id) => {
    console.log("id........", id);
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
        <td onClick={() => handlefavoriteDelete(_id)}>
          <FaRegTrashAlt />
        </td>
      </tr>
    </>
  );
};

export default FavoriteTable;
