import useCountdown from 'hooks/useCountdown';

interface CountdownProps {
  counter: ReturnType<typeof useCountdown>;
}

const Countdown: React.FC<CountdownProps> = ({ counter }) => {
  return (
    <div className="row -m-1 justify-center mt-8">
      {Object.entries(counter).map(([key, value]) => (
        <div key={key} className="col auto p-1 text-center">
          <p className="uppercase -text-6 xs:-text-4 mb-2">{key}</p>
          <div className="relative w-14 h-14 xs:w-20 xs:h-20 flex items-center justify-center text-2 xs:text-4">
            <span role="presentation" className="block absolute inset-0 bg-white opacity-10" />
            <span className="relative font-bold">{String(value).padStart(2, '0')}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
