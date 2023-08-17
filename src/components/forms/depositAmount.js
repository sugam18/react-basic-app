import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';

import taskApi from '../../services/apiService';
import { convertObjectToVariableData } from '../../utils/common';
import camundaRequestUrl from '../../utils/url';



const DepositAmount = ({ onSubmit, isAssigned, taskId }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = {
        accountNumber: formData.get('accountNumber'),
        depositAmount: parseFloat(formData.get('depositAmount')), // Convert to number
      };
    completeTask(formValues);
    // onSubmit(formValues); // Handle form submission
  };

  const completeTask = (variableData) => {
    const url = `${camundaRequestUrl.completeTask}/${taskId}/complete`;
    const body = {"variables" : convertObjectToVariableData(variableData)};
    taskApi.patch(url, body).then((response) => {
        onSubmit(true);
    })
    .catch((error) => {
        console.error(error);
    });
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Account Number"
        name="accountNumber"
        fullWidth
        margin="normal"
        disabled={!isAssigned}
      />
      <TextField
        label="Deposit Amount"
        name="depositAmount"
        type="number"
        fullWidth
        margin="normal"
        disabled={!isAssigned}

        InputProps={{
          inputProps: { min: 0 }, // Set minimum value to 0 for positive numbers
        }}
      />
      <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={!isAssigned}
      >
        Deposit
      </Button>
    </form>
    </div>
  );
};

export default DepositAmount;
