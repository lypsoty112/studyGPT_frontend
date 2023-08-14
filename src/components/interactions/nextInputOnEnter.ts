export const nextInputOnEnter = (
  e: React.KeyboardEvent<HTMLInputElement>,
  ids: string[] | undefined,
  endFunction?: () => void
) => {
  if (e.key === "Enter" && ids) {
    const index = ids.indexOf(e.currentTarget.id);
    if (index !== -1 && index < ids.length - 1) {
      const nextInput = document.getElementById(ids[index + 1]);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (endFunction) {
      endFunction();
    }
  }
};
