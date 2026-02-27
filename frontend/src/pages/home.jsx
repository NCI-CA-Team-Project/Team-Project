// homepage after successful login 

// IMPORTS ______________________________________________
import { useNavigate } from "react-router-dom";


//COMPONENT FUNCTION _____________________________________
export default function Home() {

  const navigate = useNavigate();//creates  a naviagtion function i can use 

  const handleLogout = () => {// calls on the logout function then bring suser to login page 
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.page}>

      {/* Welcome Header */}
      <div style={styles.header}>
        <h2>welcome back, name</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Card Section */}
      <div style={styles.main}>

        <button style={styles.arrow}>◀</button>

        <div style={styles.card}>
          <div style={styles.imageBox}>
            swiping picture
          </div>

          <div style={styles.info}>level</div>
          <div style={styles.info}>5/5 stars</div>
          <div style={styles.info}>interests</div>
        </div>

        <button style={styles.arrow}>▶</button>

      </div>

      {/* Bottom Nav */}
      <div style={styles.bottom}>
        <div>messages</div>
        <div>blahblah</div>
        <div>blahblah</div>
      </div>

    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 40,
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 40
  },
  card: {
    width: 250,
    border: "2px solid black",
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  imageBox: {
    height: 200,
    borderBottom: "2px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  info: {
    padding: 10,
    borderBottom: "1px solid black"
  },
  arrow: {
    fontSize: 24,
    cursor: "pointer",
    background: "none",
    border: "none"
  },
  bottom: {
    display: "flex",
    justifyContent: "space-around",
    borderTop: "2px solid black",
    paddingTop: 20
  }
};