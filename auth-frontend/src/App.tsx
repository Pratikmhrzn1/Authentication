import Navbar from '../src/components/navbar';
function App() {
  

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#ECEFCA]">
      <Navbar/>
      <div className='relative w-full max-w-10xl px-1 mt-0 mb-6 text-center'>
        <h1 className='lg:text-7xl md:text-4xl text-3xl font-medium text-[#24384B] mb-8'>
          Start Learning from 
          <span className='text-white text-1xl bg-linear-to-r from-orange-400 to-yellow-400 px-3 ml-2 py-3 font-bold'>TODAY!</span>
        </h1>
        <p className='text-xl text-gray-700 mb-12 max-w-6xl mx-auto'>Build your confidence and skills with Tic's course where you get personalized learning paths tailored to your individual
          progress and goals. Be a part of this community and grow along with millions of curious minds. 
        </p>
      </div>
      
    </div>
  );
}

export default App;