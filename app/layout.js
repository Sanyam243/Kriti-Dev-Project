import Provider from "./provider";
import "./globals.css";
import Header from "./components/custom/Header";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata = {
  title: "Website AI",
  description: "A Website which generate websites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
       
        <ConvexClientProvider>
        <Provider>
        <Header/>
        {children}
        </Provider>
        </ConvexClientProvider>
        
      </body>
    </html>
  );
}
