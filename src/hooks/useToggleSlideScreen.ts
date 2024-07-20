import { useState } from "react";

function useToggleSlideScreen() {
  const [isSlideScreenOpen, setIsSlideScreenOpen] = useState(false);

  const toggleSlideScreen = () => {
    setIsSlideScreenOpen((prev) => !prev);
  };

  return {
    isSlideScreenOpen,
    toggleSlideScreen,
  };
}

export default useToggleSlideScreen;

