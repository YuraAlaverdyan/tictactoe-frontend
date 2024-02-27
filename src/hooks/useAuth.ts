export const useAuth = () => {
  const user = localStorage.getItem('accessToken')

  return !!user;
};