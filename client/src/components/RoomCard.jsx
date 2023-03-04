import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
export default function RoomCard({color, title}){
    return (
        <Card
        as={Link}
        to={title !== "sem salas" ? `/${title}` : "/"}
        bg={color}
        text={color === 'success' ? 'white' : 'dark' }
        style={{ width: '18rem' }}
        className="mb-2 text-decoration-none"
      >
        <Card.Body>
          <Card.Title as="h4">{title}</Card.Title>
          <Card.Text>lorem</Card.Text>
        </Card.Body>
      </Card>
    )
}