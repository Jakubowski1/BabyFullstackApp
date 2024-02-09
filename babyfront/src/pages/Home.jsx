

const Home = () => {
    const [data, setData] = useState("default");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        if (data == "default") {
            axios
                .get("http://localhost:21436/api/Doctor")
                .then((response) => {
                    const data = response.data;

                    setData(data);
                })
                .catch((err) => console.log(err));
        }
    });

  return (
    
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="jumbotron text-center">
        <h1 className="display-4 custom-font">Welcome to Your Clinic!</h1>
        <p className="lead">
          We are dedicated to providing quality healthcare services for our valued patients.
        </p>
        <hr className="my-4" />
        <p>
          Explore our services and schedule an appointment to experience the best care.
        </p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="/services" role="button">
            Explore Services
          </a>
          <a className="btn btn-success btn-lg ml-3" href="/appointments" role="button">
            Schedule Appointment
          </a>
        </p>
      </div>
    </div>
    
  );
};

export default Home;
