import useEvent from 'hooks/useEvent';
import { useEffect, useState } from 'react';
import { animationFrames, distinctUntilChanged, filter, map } from 'rxjs';

const useCountdown = (endDate: Date) => {
  const [counter, setCounter] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const getEndDate = useEvent(endDate);

  useEffect(() => {
    const subscription = animationFrames()
      .pipe(
        map(({ elapsed }) => Math.round(elapsed / 1000)),
        distinctUntilChanged(),
        map(() => Math.max(0, Math.round(getEndDate().getTime() - Date.now()) / 1000)),
        filter(time => time >= 0),
        distinctUntilChanged()
      )
      .subscribe(x =>
        setCounter({
          days: Math.floor(x / (60 * 60 * 24)),
          hours: Math.floor((x / (60 * 60)) % 24),
          minutes: Math.floor((x / 60) % 60),
          seconds: Math.floor(x % 60),
        })
      );

    return () => subscription.unsubscribe();
  }, [getEndDate]);

  return counter;
};

export default useCountdown;
