import CreateUserComponent from "../components/CreateUserComponent";

const AdminScreen = (props) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {props.user && props.user.roles.includes("admin") ? (
        <>
          <h2 className="header">AdminScreen</h2>
          <CreateUserComponent />
        </>
      ) : (
        <h2 className="header">You are not allowed here!</h2>
      )}
    </div>
  );
};

export default AdminScreen;
