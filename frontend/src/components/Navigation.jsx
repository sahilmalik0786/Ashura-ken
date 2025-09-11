import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "./ui/separator";
import { Link } from "react-router";
import GotoBtn from "./GotoBtn";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-2  items-center">
          <NavigationMenuLink asChild>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/about">About</Link>
          </NavigationMenuLink>

          <Separator orientation="vertical" />
          {isAuthenticated ? (
            <GotoBtn
              children={"Dashboard"}
              desti={"/dashboard"}
              size="sm"
              variant="ghost"
            />
          ) : (
            <GotoBtn
              children={"Get Started"}
              desti={"/auth/login"}
              size="sm"
              variant="ghost"
            />
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
