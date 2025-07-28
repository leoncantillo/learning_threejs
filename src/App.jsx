import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Practice_1 from './page/Practice_1';
import Practice_2 from './page/Practice_2';
import './styles/App.scss';
import GoBackBtn from './components/GoBackBtn';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/practice_1" element={<><GoBackBtn /><Practice_1 /></>} />
          <Route path="/practice_2" element={<><GoBackBtn /><Practice_2 /></>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
