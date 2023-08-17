import React, {useState, useEffect} from 'react';
import { Paper, Typography, Chip, Button, Breadcrumbs, Link, Container } from '@mui/material';
import Alert from '../shared/alert';
import Loader from '../shared/loader';

import camundaRequestUrl from '../../utils/url';
import taskApi from '../../services/apiService';
import VerifyBadge from '../forms/verifyBadge';
import DepositAmount from '../forms/depositAmount';
const TaskMainScreen = ({ selectedTask }) => {
    const [isAssigned, setIsAssigned] = useState(false);
    const [alert, setAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Update the isAssigned state based on the assignee field of selectedTask
        setIsAssigned(!!selectedTask?.assignee); // Assignee exists, so task is assigned
      }, [selectedTask]);

    
    const handleAssignToMe = () => {
        // setIsAssigned(prevState => !prevState);

        if(!isAssigned) {
            assignTask(selectedTask.id);
        } else {
            setIsAssigned(false);
        }
      };
      const assignTask = (taskId) => {
        setIsLoading(true);
        const url = `${camundaRequestUrl.assignTask}/${taskId}/assign`;
        selectedTask.assignee = 'sugam.pradhan@tcs.com';
        taskApi.patch(url, selectedTask).then((_) => {
            setIsAssigned(true);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setIsAssigned(false);
            setIsLoading(false);
        });
      };



    const renderHeaderLeft = () => {
        return (
          <div>
            <Typography variant="h6">{selectedTask?.name}</Typography>
            <Typography variant="subtitle1">{selectedTask?.processName}</Typography>
          </div>
        );
      };
      

      const renderHeaderRight = () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Chip
                label={isAssigned ? 'Assigned to me' : 'Unassign'}
                color={isAssigned ? 'default' : 'primary'}
                style={{ marginRight: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAssignToMe}
            >
              {isAssigned ? 'Unassign' : 'Assign to Me'}
            </Button>
          </div>
        );
      };
      const handleFormSubmit = (alertResponse) => {
        // Handle form submission based on the selected task or form
        setAlert(
          <Alert
            message={alertResponse.message}
            severity={alertResponse.severity}
            autoHideDuration={3} // In seconds
            onClose={() => setAlert(null)}
          />
        );
      };
      const renderForm = () => {
        console.log(selectedTask);
        switch (selectedTask?.taskDefinitionId) {
          case 'deposit_amount':
            return <DepositAmount isAssigned={isAssigned} taskId={selectedTask?.id} onSubmit={handleFormSubmit} />;
          case 'verify_loyality':
            return <VerifyBadge isAssigned={isAssigned} taskId={selectedTask?.id} onSubmit={handleFormSubmit} />;
          default:
            return null;
        }
      };
    

  return (
    <div>
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="#">
          Tasks
        </Link>
        <Link color="inherit" href="#">
          {selectedTask?.processInstanceKey}
        </Link>
        <Typography color="textPrimary">{selectedTask?.name}</Typography>
      </Breadcrumbs>
    </Container>
    <Paper elevation={3} style={{ padding: '16px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {renderHeaderLeft()}
        {renderHeaderRight()}
      </div>
      <div>
        {renderForm()}
      </div>
      {/* Rest of the task content */}
    </Paper>
    <Loader isLoading={isLoading} /> {/* Use the Loader component */}
    {alert}
    </div>
  );
};

export default TaskMainScreen;
