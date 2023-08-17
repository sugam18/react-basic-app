import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextareaAutosize,
} from "@mui/material";
import taskApi from "../../services/apiService";
import camundaRequestUrl from "../../utils/url";
import { transformListtoObject, convertObjectToVariableData } from "../../utils/common";


const VerifyBadge = ({ onSubmit, isAssigned, taskId }) => {
  const [formValues, setFormValues] = useState({
    accountNumber: "",
    depositAmount: "",
  });

  useEffect(() => {
    // Call API to get task variables based on taskId
    const url = `${camundaRequestUrl.taskApi}/${taskId}/variables/search`;
    const body = {"variableNames": ["accountNumber", "depositAmount"]}
    taskApi.post(url, body).then((response) => {
        const taskVariables = transformListtoObject(response?.data);
        setFormValues({
          accountNumber: JSON.parse(taskVariables.accountNumber) || '',
          depositAmount: JSON.parse(taskVariables.depositAmount) || '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // onSubmit(formData); // Handle form submission
    const formData = new FormData(event.target);
    const formValues = {
        accountNumber: formData.get('accountNumber'),
        depositAmount: parseFloat(formData.get('depositAmount')), // Convert to number
        status: formData.get('approvalStatus'),
        remarks: formData.get('remarks'), 
      };
    completeTask(formValues);
  };
  const completeTask = (variableData) => {
    const url = `${camundaRequestUrl.completeTask}/${taskId}/complete`;
    const body = {"variables" : convertObjectToVariableData(variableData)};
    taskApi.patch(url, body).then((response) => {
        const alertResponse = {
          message : "Task updated successfully",
          severity: "success",
        }
        onSubmit(alertResponse);
    })
    .catch((error) => {
      const alertResponse = {
        message : "Something went wrong",
        severity: "error"
      }
      onSubmit(alertResponse);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Account Number"
        name="accountNumber"
        value={formValues.accountNumber}
        fullWidth
        margin="normal"
        disabled={!isAssigned}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Deposit Amount"
        name="depositAmount"
        value={formValues.depositAmount} // Set the readonly value
        fullWidth
        margin="normal"
        disabled={!isAssigned}
        InputProps={{ readOnly: true }}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Approve/Reject</FormLabel>
        <RadioGroup
          row
          name="approvalStatus"
          defaultValue="approve"
          disabled={!isAssigned}
        >
          <FormControlLabel
            value="Approve"
            control={<Radio />}
            label="Approve"
          />
          <FormControlLabel value="Reject" control={<Radio />} label="Reject" />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Remarks"
        name="remarks"
        fullWidth
        margin="normal"
        disabled={!isAssigned}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isAssigned}
      >
        Complete
      </Button>
    </form>
  );
};

export default VerifyBadge;
