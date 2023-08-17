import React, {useState} from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import taskApi from '../../services/apiService';
import Loader
 from '../shared/loader';
 import { redirectToRoute } from '../shared/routingUtils';


const ProcessCard = ({ process, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartProcess = () => {
    setIsLoading(true);
    const url = `/v1/internal/processes/${process.bpmnProcessId}/start`;
    taskApi.patch(url)
    .then((res) => {
      setIsLoading(false);
      console.log('Process started:', res.data);
      setTimeout(() => {
        redirectToRoute('/tasks');
      }, 3000);
      onSubmit();
    })
    .catch((err) => {
      setIsLoading(false);
      console.error('Error processing:', err);
    });
  };

  return (
    <div>
    <Card>
      <CardContent>
        <Typography variant="h6">{process.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {process.email}
        </Typography>
      </CardContent>
      <CardActions>
      <Button
          size="small"
          color="primary"
          sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': {
            backgroundColor: '#55abff', // Change to your desired hover color
          },}} // Set background color to primary color
          onClick={handleStartProcess}
        >
          Start Process
        </Button>
      </CardActions>
    </Card>
    <Loader isLoading={isLoading} /> {/* Use the Loader component */}

    {alert}
    </div>
  );
};

export default ProcessCard;
