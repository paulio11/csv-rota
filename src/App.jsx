import { Container } from "react-bootstrap";
// Components
import Header from "./components/header/Header";
import ToTopBtn from "./components/ToTopBtn/ToTopBtn";
// Pages
import Rota from "./pages/rota/Rota";

function App() {
  return (
    <>
      <Header />
      <div className="background">
        <Container>
          {/* Space for future pages/routes here */}
          <Rota />
        </Container>
      </div>
      {/* Space at bottom for button and mobile navigation */}
      <div style={{ paddingBottom: "100px" }}></div>
      <ToTopBtn />
    </>
  );
}

export default App;
