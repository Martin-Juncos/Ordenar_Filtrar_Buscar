import styles from "./ProductItem.module.css";
/* eslint-disable react/prop-types */
function ProductItem({ image, title, price }) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt={title} />
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.price}>$ {price}</p>
    </div>
  );
}

export default ProductItem;
