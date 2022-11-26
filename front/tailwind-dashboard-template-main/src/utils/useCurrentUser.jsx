import { useEffect, useState } from "react";
import axios from "axios";

function useCurrentUser() {

    const [currentUserr, setCurrentUserr] = useState({});

    const getCurrentUser = async () => {
        await axios.get('http://localhost:8080/api/users/user/current').then(response=>{
            setCurrentUserr(response.data);
        })
    }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return [currentUserr];
}

export { useCurrentUser };