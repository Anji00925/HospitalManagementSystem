// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
//
// function Layout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <div style={{ display: "flex" }}>
//         <Sidebar />
//         <div style={styles.content}>
//           {children}
//         </div>
//       </div>
//     </>
//   );
// }
//
// const styles = {
//   content: {
//     flex: 1,
//     padding: "20px",
//     background: "#f5f5f5",
//     minHeight: "100vh"
//   }
// };
//
// export default Layout;


import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
