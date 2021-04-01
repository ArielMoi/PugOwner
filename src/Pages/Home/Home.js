import PugStage from '../../Components/PugStage/PugStage.Component'
import LifeBarsBoard from '../../Components/LifeBarsBoard/LifeBarsBoard.Component'

const Home = () => {
    return (
      <div>
        <PugStage />
        <LifeBarsBoard
          foodAmount="80"
          sleepAmount="90"
          tripAmount="50"
          happinessAmount="70"
        />
      </div>
    );
}

export default Home;