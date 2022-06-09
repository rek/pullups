import * as React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "database";

import { Loading, UserName } from "../../common";
import { TitleHeader } from "../../common/components/TitleHeader";

import { ListLogItems } from "./ListLogItems";

export const ListLogs: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: userData, isLoading } = useUser(id);

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <div>This users data is missing: {id}</div>;
  }

  return (
    <>
      <TitleHeader>
        <UserName name={userData.name} />
      </TitleHeader>
      <ListLogItems user={userData} />
    </>
  );
};
