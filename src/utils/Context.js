import React from "react";
export const roles = {
  master: "MASTER",
  editor: "EDITOR"
};

export const RoleContext = React.createContext({
  roles: [roles.master, roles.editor]
});
