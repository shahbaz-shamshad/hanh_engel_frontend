import React from "react";
import "../../css/ui/ProgressStepper.css";

const ProgressStepper = ({ steps, currentStep }) => {
  return (
    <div className="progress-stepper">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-indicator ${index <= currentStep ? "active" : ""}`}
          ></div>
        ))}
      </div>
      <div className="step-labels">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-label ${index <= currentStep ? "active" : ""}`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
