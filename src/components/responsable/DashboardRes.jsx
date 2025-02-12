import React, { useEffect, useState } from 'react';
import Welcome from '../cards/Welcome';
import StatsCard from '../cards/StatsCard';
import { CircleCheck, CircleX, Clock9, Loader, Users } from 'lucide-react';
import { getDmdForResponsable } from '../../api/axiosForDemande';
import { fetchEmployeesSameService } from '../../api/axiosService';

const DashboardRes = () => {
  // State to hold the values for the cards
  const [employeesCount, setEmployeesCount] = useState(0);
  const [demandes, setDemandes] = useState({
    enAttente: 0,
    approuve: 0,
    rejete: 0,
    enCours: 0,
  });

  useEffect(() => {
    // Fetch the number of employees
    fetchEmployeesSameService().then((response) => {
      setEmployeesCount(response.length); // Assuming the response is an array of employees
    });

    // Fetch the list of demands and filter by their status
    getDmdForResponsable().then((response) => {
      const demandesStatus = {
        enAttente: response.filter(dmd => dmd.status === 'en attente').length,
        approuve: response.filter(dmd => dmd.status === 'approuvé').length,
        rejete: response.filter(dmd => dmd.status === 'rejeté').length,
        enCours: response.filter(dmd => dmd.status === 'en cours').length,
      };
      setDemandes(demandesStatus);
    });
  }, []);

  return (
    <div className="mt-4">
      <Welcome />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
        <StatsCard
          title="Employés"
          value={employeesCount} // Display number of employees
          indicator={0} // No indicator
          type="primary"
          icon={<Users size={32} />}
        />
        <StatsCard
          title="Demandes Acceptées"
          value={demandes.approuve} // Display accepted demands
          indicator={0} // No indicator
          type="success"
          icon={<CircleCheck size={32} />}
        />
        <StatsCard
          title="Demandes En Attente"
          value={demandes.enAttente} // Display pending demands
          indicator={0} // No indicator
          type="attente"
          icon={<Clock9 size={32} />}
        />
        <StatsCard
          title="Demandes En Cours"
          value={demandes.enCours} // Display in-progress demands
          indicator={0} // No indicator
          type="warning"
          icon={<Loader size={32} />}
        />
        <StatsCard
          title="Demandes Rejetées"
          value={demandes.rejete} // Display rejected demands
          indicator={0} // No indicator
          type="dark"
          icon={<CircleX size={32} />}
        />
      </div>
    </div>
  );
};

export default DashboardRes;
