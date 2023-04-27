import Spinner from 'react-bootstrap/Spinner';
import "./style.css";

const Loader = () =>{
    return (
        <Spinner className='main-spinner' animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
}

export default Loader;