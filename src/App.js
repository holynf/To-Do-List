import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const addTask = () => {
    if (text.trim()) {
      setTask((last) => [...last, { text, status: false }]);
      toast("😍 mission passed", {
        type: "success",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setText("");
  };
  const removeTask = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTask((last) => {
          const help = [...last];
          help.splice(index, 1);
          return [...help];
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const changeStatus = (index) => {
    setTask((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[index].status = !help[index].status;
      return [...help];
    });
  };

  return (
    <div className="App">
      <Form onSubmit={(e) => e.preventDefault()} className="mt-4">
        <Container>
          <Row>
            <Col xs={{ span: "4", offset: "3" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter Task"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs="2">
              <Button variant="primary" type="submit" onClick={addTask}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      <Container>
        <Row>
          {task.map((item, index) => {
            return (
              <Col key={index} xs="12" sm="6" md="4" lg="3" className="mb-4">
                <Card bg={item.status ? "success" : "danger"} text="white">
                  <Container>
                    <Row>
                      <Col xs={{ span: "1", offset: "10" }}>
                        <CloseButton
                          variant="white"
                          onClick={() => removeTask(index)}
                        />
                      </Col>
                    </Row>
                  </Container>
                  <Card.Body>
                    <Card.Title>{item.text} </Card.Title>
                    <Button
                      variant="light"
                      onClick={() => changeStatus(index)}
                      style={{ fontWeight: "bold" }}
                    >
                      {item.status ? "undone" : "done"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
