import { useUserContext, useGameContext } from "./context"

const DEBUG_MODE = true;

const ContextDebugging = () => {

  const { user } = useUserContext();
  const { game } = useGameContext();

  if (!DEBUG_MODE) {
    return null
  }

  if (DEBUG_MODE){
    return (
      <div>
        {`USER CONTEXT: username: ${user.username},
        logged in: ${user.loggedIn}, \n

        GAME CONTEXT: ${Object.keys(game).map((key) => " " + key + ": " + game[key])}`}
      </div>
    )
  }
}

export default ContextDebugging;
