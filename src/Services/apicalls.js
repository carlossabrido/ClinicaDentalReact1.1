import axios from "axios";

export const logMe = async (credentials) => {
  console.log(credentials);
  return await axios.post("http://localhost:9100/user/log", credentials);
};
export const registerMe = async (register) => {
  return await axios.post("http://localhost:9100/user", register);
};

export const bringUserProfile = async (credentials) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${credentials.bearer}`,
      },
    };
    const response = await axios.get(
      `http://localhost:9100/user/${credentials.token.id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const bringAllProfile = async (credentials,criteria) => {

  
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${credentials.bearer}`,
      },
      params:{
        name: criteria
      }
    };
    const response = await axios.get('http://localhost:9100/user',config);
  
    return response.data;
     
  } catch (error) {
    console.error('Error al obtener los perfiles:', error);
    throw error; 
  }
};


export const getFilteredProfiles = async (filter) => {
  const res = await axios.get(`http://localhost:9100/user${filter}`)
return res.data.results
}  

export const bringAppointment = async (credentials) => {
  
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${credentials.bearer}`,
      },
    };
    const response = await axios.get('http://localhost:9100/Appointment',config);
   
    return response.data;
     
  } catch (error) {
    console.error('Error al obtener los perfiles:', error);
    throw error; 
  }
};
export const bringDentist = async () => {
  
    const response = await axios.get(`http://localhost:9100/user/dentists`);
    return response.data;
    
};
export const bringTreatment = async () => {
  
    const response = await axios.get(`http://localhost:9100/Treatment`);
    return response.data;
    
};



export const makeAppointment = async (credentials,body) => {
  
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${credentials.bearer}`
      },
    };
    console.log(body)
    const response = await axios.post(
      `http://localhost:9100/Appointment`,body,config
    );
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
  export const modifyAppointment = async (credentials,id,body) => {
    
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${credentials.bearer}`
          
        },
       
      };
      const response = await axios.put(
        `http://localhost:9100/Appointment/${id}`,body,config
      );
      
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
