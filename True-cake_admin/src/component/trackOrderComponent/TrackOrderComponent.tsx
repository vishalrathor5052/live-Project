import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment";

const TrackOrderComponent = (data: any) => {
  const steps = [
    {
      label: "Order Placed",
      description: `Received Order 
                        ${moment(data?.data?.dateOfOrder).format(
                          "YYYY-MM-DD HH:MM A"
                        )}`,
    },
    {
      label: "Order Confirmed",
      description: `User Order has been confirmed\n${moment(
        data?.data?.dateOfOrder
      ).format("DD-MM-YYYY HH:MM A")}`,
    },
    {
      label: "Order Processed",
      description: `Preparing order
                   ${moment(data?.data?.dateOfOrder).format(
                     "YYYY-MM-DD HH:MM A"
                   )}`,
    },
    {
      label: "Ready To Pickup",
      description: `Order is ready
            ${moment(data?.data?.dateOfOrder).format("YYYY-MM-DD HH:MM A")} `,
    },
    // {
    //   label: "Cancel Order",
    //   description: `Order is ready
    //         ${data?.data?.dateOfOrder} `,
    // },
  ];
  const styles = (theme: any) => ({
    icon: {
      color: "red !important",
    },
  });
  const [activeStep, setActiveStep] = React.useState(0);
  React.useEffect(() => {
    const status: number = +data?.data?.orderStatus;
    setActiveStep(status);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              "&.MuiStepLabel-root .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed":
                {
                  color: "#1ab963",
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#1ab963", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label .Mui-completed": {
                color: "black !important",
              },
              "& .MuiStepLabel-root  .Mui-completed": {
                color: "#1ab963 !important",
              },
              "&  .css-1hv8oq8-MuiStepLabel-label": {
                color: "black !important",
                fontFamily: "Source Sans Pro !important",
                fontWeight: "bold !important",
                fontSize: "19px !important", // circle color (COMPLETED
              },
            }}
          >
            <StepLabel
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              <div style={{color:"black"}}>{step.label }</div>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {/* <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button> */}
                  {/* <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button> */}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            Order is ready<br></br>
            {moment(data?.data?.dateOfOrder).format("YYYY-MM-DD HH:MM A")}
          </Typography>
          {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button> */}
        </Paper>
      )}
    </Box>
  );
};

export default React.memo(TrackOrderComponent);
