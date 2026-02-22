import React from "react";
import { useUsers } from "../hooks/useUsers";
import { StatCard } from "../components/ui";
import { Clock, User, UserCheck, UserMinus } from "lucide-react";

const Dashboard = () => {
  const { allUsers } = useUsers();

  const total = allUsers.length;
  const active = allUsers.filter((u) => u.status === "Active").length;
  const pending = allUsers.filter((u) => u.status === "Pending").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={total}
          icon={<User />}
          color="blue"
          trend="+12% "
        />
        <StatCard
          title="Acitve Users"
          value={active}
          icon={<UserCheck />}
          color="green"
          trend="+5% "
        />
        <StatCard
          title="Pending"
          value={pending}
          icon={<Clock />}
          color="orange"
        />
        <StatCard
          title="Inactive"
          value={total - active - pending}
          icon={<UserMinus />}
          color="purple"
        />
      </div>
    </div>
  );
};

export default Dashboard;
