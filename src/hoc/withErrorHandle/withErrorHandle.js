import { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { Aux } from "../Aux/Aux";

const withErrorHandle = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    errorConfirmHandle = () => {
      this.setState({ error: null });
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(null, (error) => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.reject(this.reqInterceptor);
      axios.interceptors.response.reject(this.resInterceptor);
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClose={this.errorConfirmHandle}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandle;
