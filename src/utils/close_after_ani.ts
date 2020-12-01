



export function closeAfterAni(
    element,
    callBack,
    toggleAniCleanUp,
    setToggleAniCleanUp
  ) {
    if (toggleAniCleanUp) {
      element.style.animationName = "slideIn";
      element.removeEventListener("animationend", function (e) {
        callBack();
        setToggleAniCleanUp((a) => !a);
      });
    } else {
      element.style.animationName = "slideOut";
      element.addEventListener("animationend", function (e) {
        callBack();
        setToggleAniCleanUp((a) => !a);
      });
  
      setToggleAniCleanUp((a) => !a);
    }
  }