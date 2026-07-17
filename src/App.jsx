import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import UMKMDirectory from './components/UMKMDirectory';
import MapSection from './components/MapSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <UMKMDirectory />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
