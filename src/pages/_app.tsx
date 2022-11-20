import "../../styles/global.css";
import "tailwindcss/tailwind.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { api, outsideApi } from "@/utils/api";

import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ParallaxProvider } from "react-scroll-parallax";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import { useContentAuth } from "@/hooks/useContentAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTagManager } from "@/hooks/useTagManager";
import ConversationBox from "@/components/ChatBox";
import { useChatBox } from "@/hooks/useChatBox";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { loading } = useContentAuth();
  const router = useRouter();
  const compileBrowserCurrency = useBrowserCurrency(
    (state) => state.setBrowserCurrency
  );
  const { chatData } = useChatBox();
  useTagManager();
  useEffect(() => {
    api<Currency[]>("currency", {
      method: "get",
    }).then((data) => {
      outsideApi("https://api.ipify.org/?format=json").then((res) => {
        if (res) {
          api("countries/detect", {
            method: "post",
            body: JSON.stringify({ ip: (res as { ip: string }).ip }),
          }).then((result) => {
            const current_country = (
              result as { actual_country: { country: string } }
            ).actual_country.country;
            let ipCurrency;
            switch (current_country) {
              case "SE":
                ipCurrency = "SEK";
                break;
              case "DK":
                ipCurrency = "DKK";
                break;
              case "GB":
                ipCurrency = "GBP";
                break;
              case "NO":
                ipCurrency = "NOK";
                break;
              default:
                ipCurrency = "EUR";
            }
            compileBrowserCurrency({
              currencies: data,
              currency: ipCurrency,
              current_country: current_country,
            });
          });
        }
      });
    });
  }, []);

  const content_auth = router.pathname === "/content-login";
  useAuthGuard();
  // show blank when content auth loading
  if (loading) {
    return null;
  }

  return (
    <ParallaxProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        {!content_auth && <Header />}
        <div className="px-[12px] md:p-[0px] overflow-x-hidden">
          <div className="z-0 pt-14">
            <Component {...pageProps} />
          </div>
        </div>
        {((chatData.product && chatData.conversation) ||
          (chatData.order && chatData.conversation)) && <ConversationBox />}
        {!content_auth && <Footer />}
      </QueryClientProvider>
    </ParallaxProvider>
  );
}
export default MyApp;
