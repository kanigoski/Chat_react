import Chat from "views/Chat/Chat";

const dashboardRoutes = [
  {
    path: "/Chat",
    name: "Chat",
    icon: "pe-7s-look",
    component: Chat
  },
  { redirect: true, path: "/", to: "/chat", name: "Chat" }
];

export default dashboardRoutes;
