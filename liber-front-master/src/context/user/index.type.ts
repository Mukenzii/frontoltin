export interface UserAuthContextProps {
  currentUser: { access?: string; refresh?: string };
  setCurrentUser?: any;
}
