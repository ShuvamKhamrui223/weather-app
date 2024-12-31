const SkeletonLoading = () => {
  return (
    <div className="lg:content-area min-h-screen grid  grid-cols-2 grid-rows-3 lg:grid-rows-2 lg:grid-cols-5 gap-4">
      {/* current weather */}
      <div className="skeleton md:h-full rounded-3xl row-start-1 row-end-2 col-start-1 col-end-6 lg:col-end-3 glass"></div>

      {/* highlights */}
      <div className="skeleton md:col-start-1 md:row-start-3 md:row-end-4 lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-6  col-end-6 col-start-1 glass rounded-3xl"></div>

      {/* forecast chart */}
      <div className="skeleton col-start-1 col-end-6 md:row-start-2 row-end-3 lg:row-end-2 lg:row-start-1 lg:col-start-3 lg:col-end-6 xl:col-start-3 glass rounded-3xl"></div>
    </div>
  );
};

export default SkeletonLoading;
