import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../graphql/products";
import { GET_TABLE } from "../graphql/tables";

export default function useDeleteProduct({ id }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_TABLE }, "getTable"],
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteProduct({ variables: { id } });
  };

  return { handleDelete, deleteLoading: loading };
}
