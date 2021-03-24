import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks";
import { Loading } from "../../common";
import type { User } from "../../types";

export const ProvideUser: React.FC<{
  children: ({ user }: { user: User }) => React.ReactElement;
}> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useUser(id);

  // console.log('user', user)

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <div>This users data is missing: {id}</div>;
  }

  return <>{children && children({ user })}</>;

  // return (
  //   <>
  //     {React.Children.map(children, (child) => {
  //       if (React.isValidElement(child)) {
  //         return React.cloneElement(child, { user });
  //       }

  //       return null;
  //     })}
  //   </>
  // );
};
