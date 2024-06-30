import { useState } from "react";

function useOpenSlideScreen() {
  const [isSlideScreenOpen, setIsSlideScreenOpen] = useState(false);

  return {
    isSlideScreenOpen,
    setIsSlideScreenOpen,
  };
}

export default useOpenSlideScreen;

