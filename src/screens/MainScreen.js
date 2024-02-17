import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Budget from '../components/Budget';
import Methods from '../components/Methods';

export default () =>  {

    //RECORDS
    const [records, setRecords] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://finanzas.visssible.com/backend/apartados-consultar.php');
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []); // The empty dependency array ensures that this effect runs once on mount
    

    return (

        <div id="principal" className='pantalla completa' style={{paddingBottom: '66px'}}>

            <Methods/>
            
            <ul id='chart'></ul>

            <ul id="apartados">
                {records.map(record => (
                    <Budget 
                        key={record.id} 
                        name={record.nombre} 
                        amount={record.saldo} 
                        icon={record.icono} 
                        distribution={record.reparticion}
                    />
                ))}
            </ul>
        
        </div>
    );
  
}