import '../styles/Layout.scss';

function Layout({ children }) {
  return (
    <div className="layout-root">
      {children}
    </div>
  );
}

export default Layout;
