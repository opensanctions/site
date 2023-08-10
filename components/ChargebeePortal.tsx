"use client";

import { type ChargebeeInstance } from "@chargebee/chargebee-js-types";
import Script from "next/script";

import { API_URL, CHARGEBEE_PUBLISHABLE_KEY, CHARGEBEE_SITE } from "@/lib/constants";
import { useRef, type ReactNode } from "react";

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
