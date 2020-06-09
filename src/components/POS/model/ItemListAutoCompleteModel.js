export default {
    collection: "positem",
    store:"posfrontend",
    populate: ["category","discount"],
    listData: {
      icon: "mdi-basket-outline",
      logo: "photo",
      title: "name",
      subtitle: "description"
    },
  }