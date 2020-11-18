import { Card, Badge } from "react-bootstrap";
import UserForm from "./UserForm"

function Back(props) {
  return (
    <Card className="back text-center">
      <Card.Header>Sign Up</Card.Header>
      <Card.Body>
        <Card.Title>Fill in your Details</Card.Title>
        <Card.Text>
          <UserForm typeIsSignIn={props.type} onSignUp={props.onSignUp} fields={props.fields} />
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div>Already Have an Account?</div>
        <Badge variant="primary" onClick={props.onChangeType}>Sign In</Badge>
      </Card.Footer>
    </Card>
  );
}

export default Back;
