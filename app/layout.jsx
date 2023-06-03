import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/global.css";
export const metadata = {
  title: "Promtopia",
  description: "This is an AI tool for promt",
};
const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="main">
          <div className="gradiant" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default layout;
