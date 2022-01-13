import DisplayTripsComponent from "../components/DisplayTripsComponent";

const ProtectedScreen = (props) => {
  return (
    <div>
      <h2 className="header">ProtectedScreen</h2>
      <DisplayTripsComponent />
    </div>
  );
};

export default ProtectedScreen;
