function AnalyticComponent({ icon, title, value }) {
  return (
    <div className="AnalyticComponentContainer">
      <div className="AnalyticComponentContainerHead">
        <i className={`fa-solid fa-${icon}`}></i>
        <h3 className="AnalyticComponentContainerHeading">{title}</h3>
      </div>
      <span className="AnalyticComponentContainerValue">{value}</span>
    </div>
  );
}

export default AnalyticComponent;
