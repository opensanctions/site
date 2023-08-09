"use client";

import Script from "next/script";
import { type ChargebeeInstance } from "@chargebee/chargebee-js-types";

import { type ReactNode, useRef } from "react";
import { API_URL } from "@/lib/constants";

// TODO: Grab from constants via NEXT_PUBLIC_ENV_VAR_NAME
const CHARGEBEE_SITE = "opensanctions-test";
const CHARGEBEE_PUBLISHABLE_KEY = "test_zPAH9l3rj4NgJawamAFWgsgDHZwODxGz";

type ChargebeePortalProps = {
  children: ReactNode;
};

export const ChargebeePortal: React.FC<ChargebeePortalProps> = ({
  children,
}) => {
  const chargebeeRef = useRef<ChargebeeInstance | null>(null);

  const openPortal = () => {
    const portal = chargebeeRef.current?.createChargebeePortal();

    // @ts-ignore: Portal.open doesn't require arguments
    portal.open();
  };

  return (
    <>
      <div onClick={openPortal}>{children}</div>
      <Script
        src="https://js.chargebee.com/v2/chargebee.js"
        onLoad={() => {
          // @ts-ignore: init always returns a ChargebeeInstance
          chargebeeRef.current = window.Chargebee.init({
            site: CHARGEBEE_SITE,
            publishableKey: CHARGEBEE_PUBLISHABLE_KEY,
          }) as ChargebeeInstance;

          chargebeeRef.current.setPortalSession(
            async () =>
              await (
                await fetch(`${API_URL}/auth/chargebee_portal_session`, {
                  credentials: "include",
                })
              ).json()
          );
        }}
      />
    </>
  );
};
