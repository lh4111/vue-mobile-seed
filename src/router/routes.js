const Index = () => import("@/pages/Index");
const ContactUs = () => import("@/pages/ContactUs");
const ListTemp = () => import("@/pages/ListTemp");

export default [
  {
    path: "/",
    name: "list-temp",
    component: ListTemp
  },
  {
    path: "/index",
    name: "index",
    component: Index
  },
  {
    path: "/contact_us",
    name: "contact-us",
    component: ContactUs,
    meta: {
      title: "联系我们"
    }
  }
];
