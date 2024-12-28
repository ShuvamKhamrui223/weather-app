type TAlert = {
  alertMessage: string;
  permissionHandler?: () => void;
};
const Alert = ({ alertMessage, permissionHandler }: TAlert) => {
  return (
    <div className="alert alert-error">
      <p className="">{alertMessage}</p>
      {permissionHandler && (
        <button
          className="btn text-cyan-50 capitalize"
          onClick={permissionHandler}
        >
          allow location
        </button>
      )}{" "}
    </div>
  );
};

export default Alert;
