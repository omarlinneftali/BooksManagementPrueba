import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
      errorMessage: "",
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorMessage: errorInfo,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {

      return (
        <article className="wrapper">
          <section className="content d-flex align-items-center justify-content-center">
            <div className="  ">
              <div className=" d-flex justify-content-center">
               
              </div>

              <h2 className="text-white">
                <p>
                  La página que estás viendo es porque ha pasado un error muy
                </p>

                <p>
                  grave en los servicios del sistema, y por esto ha dejado de
                  funcionar.
                </p>
              </h2>
              <di className="d-flex justify-content-center mt-3">
                <a className="  btn btn-primary btn-lg w-25 " href="/">
                  <span style={{ fontSize: "30px" }}>Ir al inicio</span>
                </a>
              </di>
            </div>
       
          </section>
        </article>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
