import { Card } from "react-bootstrap";

function CustomerDashboard(){

    return (
      <div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <Card>
                <Card.Header>My HEader</Card.Header>
                <Card.Title>something</Card.Title>
                <Card.Body>This is some text within a card body.
                        <br /><br />
                        This is some text within a card body.
                        <br /><br />
                        This is some text within a card body.
                        <br /><br />
                        This is some text within a card body.
                        <br /><br />
                        This is some text within a card body.
                        <br /> <br /><br />
                        This is some text within a card body.
                        <br /> <br /><br />
                        This is some text within a card body.
                        <br /> <br /><br />
                        This is some text within a card body.
                        <br />

                </Card.Body>
                <Card.Footer>Footer</Card.Footer>
              </Card>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <Card>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div className="col-md-12">
                  <Card>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
           
        </div>
      </div>
    );
}
export default CustomerDashboard;