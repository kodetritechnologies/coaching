import React from "react";
import * as LucideIcons from "lucide-react";
import * as Hi2Icons from "react-icons/hi2";

export const DynamicIcon = ({ name, className }: { name?: string; className?: string }) => {
  if (!name) return null;
  
  let IconComponent;
  
  if (name.startsWith("Hi")) {
    IconComponent = (Hi2Icons as any)[name];
  } else {
    IconComponent = (LucideIcons as any)[name];
  }

  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};
