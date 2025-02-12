import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Welcome from '../cards/Welcome';
import StatsCard from '../cards/StatsCard';
import { fetchDemandes } from '../../api/axiosForDemande';
import { fetchEmployees, fetchServices } from '../../api/axiosService';
import { CircleCheck, CircleX, Clock9, Loader, Users, Server } from 'lucide-react';

const Dashboard = () => {
  // State to hold the values for the cards
  const [employeesCount, setEmployeesCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [demandesCounts, setDemandesCounts] = useState({
    enAttente: 0,
    approuve: 0,
    rejete: 0,
    enCours: 0,
  });

  useEffect(() => {
    // Fetch the number of employees
    fetchEmployees().then((response) => {
      setEmployeesCount(response.length); // Assuming response is an array of employees
    });

    // Fetch the number of services
    fetchServices().then((response) => {
      setServicesCount(response.length); // Assuming response is an array of services
    });

    // Fetch the demandes and filter by their status
    fetchDemandes().then((response) => {
      console.log(response,"222222222222222")
      const counts = {
        enAttente: 0,
        approuve: 0,
        rejete: 0,
        enCours: 0,
      };

      response.forEach((demande) => {
        switch (demande.status) {
          case 'en attente':
            counts.enAttente += 1;
            break;
          case 'approuvé':
            counts.approuve += 1;
            break;
          case 'rejeté':
            counts.rejete += 1;
            break;
          case 'en cours':
            counts.enCours += 1;
            break;
          default:
            break;
        }
      });

      setDemandesCounts(counts); // Update the state with the filtered counts
    });
  }, []);

  return (
    <div className="p-4">
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
          title="Services"
          value={servicesCount} // Display number of services
          indicator={0} // No indicator
          type="ser"
          icon={<Server size={32} />}
        />
        <StatsCard
          title="Demandes En Attente"
          value={demandesCounts.enAttente} // Display number of demandes En Attente
          indicator={0} // No indicator
          type="attente"
          icon={<Clock9 size={32} />}
        />
        <StatsCard
          title="Demandes Approuvées"
          value={demandesCounts.approuve} // Display number of demandes Approuvées
          indicator={0} // No indicator
          type="success"
          icon={<CircleCheck size={32} />}
        />
        <StatsCard
          title="Demandes Rejetées"
          value={demandesCounts.rejete} // Display number of demandes Rejetées
          indicator={0} // No indicator
          type="danger"
          icon={<CircleX size={32} />}
        />
        <StatsCard
          title="Demandes En Cours"
          value={demandesCounts.enCours} // Display number of demandes En Cours
          indicator={0} // No indicator
          type="warning"
          icon={<Loader size={32} />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
