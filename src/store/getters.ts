const getters = {
  sidebar: (state: any) => state.app.sidebar,
  theme: (state: any) => state.app.theme,
  locale: (state: any) => state.app.locale,
  roles: (state: any) => state.user.roles,
  user: (state: any) => state.user.user,
  permission_routers: (state: any) => state.user.permission_routers,
  permission_roles: (state: any) => state.user.permission_roles,
  spinning: (state: any) => state.user.spinning,
};
export default getters;
