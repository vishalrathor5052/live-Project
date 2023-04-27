import Form from 'react-bootstrap/Form';

const TextInput = () =>{
  return (
    <>
      <Form.Label htmlFor="inputPassword5">Text</Form.Label>
      <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
      <Form.Text id="passwordHelpBlock" muted>
       
      </Form.Text>
    </>
  );
}

export default TextInput;