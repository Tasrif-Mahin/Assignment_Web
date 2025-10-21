import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeaturesSection from '../components/Feature';
import WhyChooseUs from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/Faq';

const Home = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <div id="features-section">
        <FeaturesSection />
      </div>
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
