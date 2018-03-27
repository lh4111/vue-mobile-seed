const ContactUs = () => import('@/pages/ContactUs')

export default [
  // {
  //   path: '/',
  //   name: 'list-temp',
  //   component: ListTemp
  // },
  {
    path: '/contact_us',
    name: 'contact-us',
    component: ContactUs,
    meta: {
      title: '联系我们'
    }
  }
]
