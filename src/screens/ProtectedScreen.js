import TripsComponent from "../components/TripsComponent";

const ProtectedScreen = (props) => {
  return (
    <div>
      <h2 className="header">Trips Screen</h2>
      <TripsComponent {...props} />
    </div>
  );
};

export default ProtectedScreen;
