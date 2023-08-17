// common.js
export const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Include AM/PM
    };
    return new Date(date).toLocaleString('en-GB', options);
  };

  export const convertObjectToVariableData = (obj) => {
    return Object.entries(obj).map(([key, value]) => ({
      name: key,
      value: JSON.stringify(value)
    }));
  }
  
  export const transformListtoObject = (list) => {
    const convertedObject = list.reduce((result, item) => {
      result[item.name] = item.value;
      return result;
    }, {});
    return  convertedObject;
  }

  export const getTasks = {
    allOpenTasks: '{"sort":[{"field":"creationTime","order":"DESC"}],"pageSize":50,"state":"CREATED"}',
    assignedTome: '{"sort":[{"field":"creationTime","order":"DESC"}],"pageSize":50,"assigned":true,"assignee":"sugampradhan1@gmail.com","state":"CREATED"}',
    unassigned: '{"sort":[{"field":"creationTime","order":"DESC"}],"pageSize":50,"assigned":false,"state":"CREATED"}',
    completedtasks: '{"sort":[{"field":"completionTime","order":"DESC"}],"pageSize":50,"state":"COMPLETED"}'
  }