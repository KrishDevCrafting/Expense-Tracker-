export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\S@]+\.[^\S@]+$/;

  return regex.text(email);
};
