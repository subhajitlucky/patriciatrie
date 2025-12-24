import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Playground from './pages/Playground';
import Layout from './components/layout/Layout';
import TopicPage from './pages/TopicPage';
import { ThemeProvider } from './hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:topicId" element={<TopicPage />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;