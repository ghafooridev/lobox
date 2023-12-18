import DropDown from "@/components/DropDown";
import Game from "@/assets/img/game.png";
import Art from "@/assets/img/art.png";
import Ball from "@/assets/img/ball.png";
import Education from "@/assets/img/education.png";
import Sience from "@/assets/img/science.png";
import Health from "@/assets/img/health.png";

const DROP_DOWN_OPTIONS = [
  { label: "Science", icon: Sience },
  { label: "Education", icon: Education },
  { label: "Art", icon: Art },
  { label: "Sport", icon: Ball },
  { label: "Games", icon: Game },
  { label: "Health", icon: Health },
];

function App() {
  return <DropDown options={DROP_DOWN_OPTIONS} />;
}

export default App;
