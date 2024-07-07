import { useState } from "react";

function useOpenSlideScreen() {
  const [isSlideScreenOpen, setIsSlideScreenOpen] = useState(false);

  const openSlideScreen = () => {
    setIsSlideScreenOpen((prev) => !prev);
  };

  return {
    isSlideScreenOpen,
    openSlideScreen,
  };
}

export default useOpenSlideScreen;

