import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Alert from "../shared/alert";
import ProcessCard from "./processCard";
import ProcessFilter from "./processFilter";
import taskApi from '../../services/apiService'
import camundaRequestUrl from "../../utils/url";
// const processes = [
//   { id: 1, title: "Process 1", description: "Description of Process 1" },
//   { id: 2, title: "Process 2", description: "Description of Process 2" },
//   { id: 3, title: "Process 3", description: "Description of Process 3" },
//   { id: 4, title: "Process 4", description: "Description of Process 4" },
//   // Add more processes as needed
// ];

const ProcessList = () => {
  const [processes, setProcesses] = useState([]);
  const [filteredProcesses, setFilteredProcesses] = useState(processes);
  const [filterText, setFilterText] = useState('');
  const [alert, setAlert] = useState(null);

  // use effect block
  useEffect(() => {
    const url = camundaRequestUrl.deployedProcess;
    taskApi.get(url).then((response) => {
        setProcesses(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
  },[]);

  useEffect(() => {
    const filtered = processes.filter((process) => 
        process.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredProcesses(filtered);
  },[filterText, processes]);

  const handleFilterChange = (_) => {
    setFilterText(_);
  };
  const handleProcessStart = () => {
    setAlert(
        <Alert
          message="A new process has been started"
          severity="success"
          autoHideDuration={3} // In seconds
          onClose={() => setAlert(null)}
        />
      );
  }
  return (
    <div>
      <ProcessFilter onFilter={handleFilterChange} />

      <Grid container spacing={2}>
        {filteredProcesses.map((process) => (
          <Grid item xs={12} sm={6} md={3} key={process.id}>
            {" "}
            {/* Adjust width to fit 4 cards in a row */}
            <ProcessCard process={process} onSubmit={handleProcessStart}/>
          </Grid>
        ))}
      </Grid>
      {alert}
    </div>
  );
};

export default ProcessList;
