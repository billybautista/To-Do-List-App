import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";

function TodoCard({
  title,
  description,
  editCard,
  deleteCard,
  checked,
  isDone,
  key,
  disabled,
  img,
}) {
  return (
    <Card
      id={key}
      style={{
        width: 350,
        borderRadius: 10,
        marginBottom: 30,
        alignItems: "center",
      }}
    >
      <div style={{ height: 15 }} />
      {img !== "" ? (
        <img
          variant="top"
          src={img}
          style={{ height: 150, borderRadius: 10 }}
        />
      ) : null}
      <Card.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Card.Title>{title}</Card.Title>

          <Card.Text style={{ width: 300 }}>{description}</Card.Text>
          <div style={{ height: 0 }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            variant="primary"
            style={{ marginRight: 20 }}
            onClick={editCard}
            disabled={disabled}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            style={{ marginRight: 10 }}
            onClick={deleteCard}
            disabled={disabled}
          >
            Eliminar
          </Button>

          <input
            name="isGoing"
            type="checkbox"
            checked={checked}
            onChange={isDone}
            style={{ marginRight: 5 }}
          />
          <label>Done</label>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TodoCard;
