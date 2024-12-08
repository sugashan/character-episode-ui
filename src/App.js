import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import CharacterListPage from "./pages/CharacterListPage";
import { logout } from "./services/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    await logout(localStorage.getItem("user").username)
    localStorage.removeItem("user");
    setLoggedIn(false);
  };


  return (
    <div>
      {loggedIn ? (
        <CharacterListPage onLogout={handleLogout}/>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
