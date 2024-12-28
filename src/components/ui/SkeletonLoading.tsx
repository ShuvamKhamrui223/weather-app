const SkeletonLoading = () => {
  return (
    <div className="content-area grid grid-cols-4 grid-rows-2 gap-4">
      <div className="skeleton rounded-3xl row-start-1 row-end-2"></div>
      <div className="skeleton col-start-2 col-end-7 glass rounded-3xl"></div>
      <div className="skeleton glass rounded-3xl"></div>
    </div>
  );
};

export default SkeletonLoading;
