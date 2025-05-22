import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch('/api/groups')
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
        <NavBar></NavBar>
      <h2 className="text-2xl font-bold mb-4">All Hobby Groups</h2>
      {groups.length === 0 ? (
        <p>No groups available yet.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {groups.map(group => (
            <li key={group._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <p>{group.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllGroups;
