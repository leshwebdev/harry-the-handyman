import { Card, Badge } from "react-bootstrap";
import UserForm from "./UserForm"

function Front(props) {
  return (
    <Card className="front text-center">
      <Card.Header>Sign In</Card.Header>
      <Card.Body>
        <Card.Title>Enter Your Credentials</Card.Title>
        <Card.Text>
          <UserForm typeIsSignIn={props.type} onSignIn={props.onSignIn} fields={props.fields} />
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div>Don't Have an Account?</div>
        <Badge variant="primary" onClick={props.onChangeType}>Sign Up</Badge>
      </Card.Footer>
    </Card>
  );
}

export default Front;
