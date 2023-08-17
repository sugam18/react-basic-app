import React, { useState, useEffect } from 'react';
import Formio from 'formiojs';
import taskApi from '../../services/apiService';
const TaskForm = ({ taskId, formKey }) => {
  const [formDefinition, setFormDefinition] = useState(null);

  useEffect(() => {
    const url = `/v1/forms/${getFormKey(formKey)}/`;
    taskApi.post(url).then((response) => {
        const formDef = response.data;
        setFormDefinition(formDef);
    })
    .catch((error) => {
        console.error(error);
    });
    // fetchCamundaFormDefinition(taskId)
    //   .then((formDef) => {
    //     setFormDefinition(formDef);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching form definition:', error);
    //   });
  }, [taskId]);

  useEffect(() => {
    if (formDefinition) {
      Formio.createForm(document.getElementById('formio'), formDefinition);
    }
  }, [formDefinition]);

  const getFormKey = (formKey) => {
    return formKey?.split(":")[2];
  };

  return (
    <div id="formio" />
  );
};

export default TaskForm;
