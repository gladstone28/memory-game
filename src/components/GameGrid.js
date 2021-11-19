import GameButton from './GameButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateLastTwoMoves,
  handleClickGameElement,
  hideGameElementsVisibility,
  disableElementsActiveState,
  changePlayerTurn,
} from '../store/gameSlice';
import { GAME_GRID_SIZES, GAME_THEMES, ICONS_ARR } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameGrid = () => {
  const gridSize = useSelector((state) => state.game.gridSize);
  const gridTheme = useSelector((state) => state.game.gridTheme);
  const gameElements = useSelector((state) => state.game.gameElements);
  const lastTwoMoves = useSelector((state) => state.game.lastTwoMoves);
  const numOfPlayers = useSelector((state) => state.game.numOfPlayers);
  const gridElements = [];

  const dispatch = useDispatch();

  const onMoveMadeHandler = (gameElement) => {
    dispatch(updateLastTwoMoves(gameElement));
    dispatch(handleClickGameElement(gameElement));

    if (lastTwoMoves.length === 2) {
      dispatch(disableElementsActiveState([lastTwoMoves[0], lastTwoMoves[1]]));
      if (lastTwoMoves[0].value !== lastTwoMoves[1].value) {
        dispatch(
          hideGameElementsVisibility([lastTwoMoves[0], lastTwoMoves[1]])
        );
        if (numOfPlayers > 1) dispatch(changePlayerTurn());
      }
    }
  };

  gameElements.forEach((gameElement, index) => {
    gridElements.push(
      <GameButton
        isVisible={gameElement.isVisible}
        isActive={gameElement.isActive}
        onMoveMade={onMoveMadeHandler.bind(null, {
          value: gameElement.value,
          index,
        })}
        key={index}
      >
        {gridTheme === GAME_THEMES.NUMBERS ? (
          gameElement.value
        ) : (
          <FontAwesomeIcon icon={ICONS_ARR[gameElement.value - 1]} />
        )}
      </GameButton>
    );
  });

  return (
    <div
      className={`game-grid game-grid-${
        gridSize === GAME_GRID_SIZES['4x4'] ? '4x4' : '6x6'
      }`}
    >
      {gridElements}
    </div>
  );
};

export default GameGrid;
