import { Link } from "react-router-dom";
import LoginButton from "../Autho/LoginButton/LoginButton";
import LogoutButton from "../Autho/LogoutButton/LogoutButton";
import styles from "./Navbar.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className={styles.navbar}>
      <div className={styles["nav-items"]}>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
      <div className={styles["auth-section"]}>
        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {`Hola ${user.given_name}`}
            <img
              src={user.picture}
              alt={user.name}
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}

export default Navbar;
