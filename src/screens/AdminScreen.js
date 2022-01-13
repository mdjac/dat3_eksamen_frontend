import CreateUserComponent from "../components/CreateUserComponent";
import CreateTripComponent from "../components/CreateTripComponent";

const AdminScreen = (props) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {props.user && props.user.roles.includes("admin") ? (
        <>
          <h2 className="header">AdminScreen</h2>
          <div style={{ marginBottom: 20 }}>
            <CreateUserComponent />
          </div>
          <div style={{ marginBottom: 20 }}>
            <CreateTripComponent />
          </div>
        </>
      ) : (
        <h2 className="header">You are not allowed here!</h2>
      )}
    </div>
  );
};

export default AdminScreen;
