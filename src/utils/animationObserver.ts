
export const setupScrollAnimations = () => {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);
  const elements = document.querySelectorAll('.reveal-animation');

  elements.forEach((element) => {
    observer.observe(element);
  });

  return () => {
    elements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};
