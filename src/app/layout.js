import Container from "./container";
import "./global.css";

export const metadata = {
  title: "Coding Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Container></Container>
      </body>
    </html>
  );
}
