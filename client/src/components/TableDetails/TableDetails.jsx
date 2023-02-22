import React from "react";
import { Button, Popconfirm } from "antd";
import {
  PlusCircleOutlined,
  LeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ProductsList from "../ProductsList/ProductsList";
import ProductForm from "../ProductForm/ProductForm";
import useModal from "../../hooks/useModal";
import useDeleteTable from "../../hooks/useDeleteTable";
import { getTotalPrize } from "./getPrize";
import styles from "./TableDetails.module.css";
import useGetTable from "../../hooks/useGetTable";

export default function TableDetails() {
  const { navigate, params, loading, error, products, name } = useGetTable();
  const totalPrize = getTotalPrize({ products: products });
  const { handleDelete } = useDeleteTable({ params });
  const { open, handleOnClose, handleOpen } = useModal();

  return (
    <section className="mainContainer">
      {loading ? (
        <span className="containerLoader">
          <span className="loader"></span>
        </span>
      ) : error ? (
        <span className="containerError">
          <span className="error">Error de servidor</span>
        </span>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <Button
              title="Mesas"
              type="secondary"
              size={"large"}
              className={styles.goBack}
              onClick={() => navigate("/")}
            >
              <LeftOutlined />
            </Button>
            <h1 className={styles.title}>{name}</h1>
            <Button
              title="Agregar producto"
              type="secondary"
              size={"large"}
              className={styles.addProduct}
              onClick={handleOpen}
            >
              <PlusCircleOutlined />
            </Button>
          </div>
          <div className={styles.productList}>
            <ProductsList products={products} />
          </div>
          <div className={styles.footer}>
            <h2>Precio total: ${totalPrize}</h2>
            <Popconfirm
              placement="left"
              title={`¿Seguro que desea eliminar la ${name}?`}
              onConfirm={handleDelete}
              okText="Si"
              cancelText="No"
              icon={null}
            >
              <Button type="secondary" className={styles.deleteTable}>
                <DeleteOutlined />
                Borrar mesa
              </Button>
            </Popconfirm>
          </div>
          <ProductForm onClose={handleOnClose} visible={open} />
        </div>
      )}
    </section>
  );
}
