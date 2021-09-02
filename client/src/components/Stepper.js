/**
 * This module contains a Stepper component to show journey type experience on pages.
 * <Stepper
      steps=> (Array) to show list of steps
      direction, => (classename to add on global container)
      currentStep, => user is currently on which step
    </Stepper>
 */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Stepper = ({
  steps,
  direction,
  className,
  currentStep = 1,
  isShowSteps = true
}) => {
  const [stepState, setStepState] = useState([]);
  const [component, setComponent] = useState();

  useEffect(() => {
    let createSteps = steps.map((step, idx) => ({
      description: step.description,
      component: step.component,
      completed: idx < currentStep - 1,
      selected: idx <= currentStep - 1,
      highlighted: idx === currentStep - 1
    }));
    setStepState(createSteps);
  }, [steps, currentStep]);

  useEffect(() => {
    if (stepState.length) {
      const steps = stepState.filter((step) => step.highlighted);
      setComponent(steps[0].component);
    }
  }, [stepState]);

  return (
    <React.Fragment>
      <div className={`stepper-wrapper-${direction} m-auto`}>
        {isShowSteps &&
          stepState.map(
            ({ selected, completed, highlighted, description }, idx) => (
              <React.Fragment key={idx}>
                <div className="step-wrapper" key={idx}>
                  <div
                    className={`step-number step-number-${
                      selected ? 'active' : 'disabled'
                    }`}
                  >
                    {completed ? <FontAwesomeIcon icon={faCheck} /> : idx + 1}
                  </div>
                  <div
                    className={`step-description ${
                      highlighted ? 'step-description-active' : ''
                    }`}
                  >
                    {description}
                  </div>
                  {idx + 1 !== stepState.length && (
                    <div
                      className={`divider-line divider-${
                        completed ? 'active' : 'disabled'
                      } divider-line-${stepState.length}`}
                    ></div>
                  )}
                </div>
              </React.Fragment>
            )
          )}
      </div>
      <div className={`w-100 ${className ? className : ''}`}>{component}</div>
    </React.Fragment>
  );
};

export default Stepper;
