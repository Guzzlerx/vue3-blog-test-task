export default {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          binding.value();
        }
      },
      { threshold: 1 }
    );
    observer.observe(el);
  },
  name: "intersection",
};
