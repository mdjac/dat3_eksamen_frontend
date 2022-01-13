import TripsComponent from "../components/TripsComponent";

const ProtectedScreen = (props) => {
  return (
    <div>
      <h2 className="header">ProtectedScreen</h2>
      <TripsComponent {...props} />
    </div>
  );
};

export default ProtectedScreen;
