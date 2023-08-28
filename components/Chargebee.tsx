"use client";

import { type ChargebeeInstance } from "@chargebee/chargebee-js-types";
import Script from "next/script";

import {
  API_URL,
  CHARGEBEE_PUBLISHABLE_KEY,
  CHARGEBEE_SITE,
} from "@/lib/constants";
import { useRef, type ReactNode } from "react";

const chargebeeJsSrc = "https://js.chargebee.com/v2/chargebee.js";

function initChargebee() {
  // @ts-ignore: init always returns a ChargebeeInstance
  return window.Chargebee.init({
    site: CHARGEBEE_SITE,
    publishableKey: CHARGEBEE_PUBLISHABLE_KEY,
  }) as ChargebeeInstance;
}

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
        src={chargebeeJsSrc}
        onLoad={() => {
          chargebeeRef.current = initChargebee();

          chargebeeRef.current.setPortalSession(
            async () =>
              await (
                await fetch(`${API_URL}/billing/chargebee_portal_session`, {
                  credentials: "include",
                })
              ).json()
          );
        }}
      />
    </>
  );
};

export const ChargebeeCheckout: React.FC<ChargebeePortalProps> = ({
  children,
}) => {
  const chargebeeRef = useRef<ChargebeeInstance | null>(null);

  const openCheckout = () => {
    // @ts-ignore: Passing hostedPage is sufficient
    chargebeeRef.current?.openCheckout({
      hostedPage: async () =>
        await (
          await fetch(`${API_URL}/billing/chargebee_checkout`, {
            credentials: "include",
          })
        ).json(),
      success: async () => {
        setTimeout(location.reload, 1000)
      },
    });
  };

  return (
    <>
      <div onClick={openCheckout}>{children}</div>
      <Script
        src={chargebeeJsSrc}
        onLoad={() => {
          chargebeeRef.current = initChargebee();
        }}
      />
    </>
  );
};
