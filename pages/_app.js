import "@/styles/main.css";
import "@/styles/bootstrap-grid.min.css";
import "@/styles/reset.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
