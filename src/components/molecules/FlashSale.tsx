import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, Button } from '../atoms';
import { cn } from '@/lib/utils';

interface FlashSaleProps {
  endTime: Date;
  className?: string;
}

export const FlashSale: React.FC<FlashSaleProps> = ({ endTime, className }) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <Card className={cn('bg-yellow-400 text-black border-0', className)}>
      <CardContent className="p-3 sm:p-6">
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-4 sm:hidden">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-2 rounded-full">
              <Clock className="h-5 w-5 text-yellow-900" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-900">Flash Sale!</h3>
              <p className="text-xs text-yellow-800">Limited time offer</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="text-center">
              <div className="bg-white text-black rounded-lg p-2 min-w-[2.5rem]">
                <div className="text-sm font-bold">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs text-yellow-800 mt-1">DAYS</div>
            </div>
            <div className="text-yellow-900 text-lg font-bold">:</div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg p-2 min-w-[2.5rem]">
                <div className="text-sm font-bold">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs text-yellow-800 mt-1">HRS</div>
            </div>
            <div className="text-yellow-900 text-lg font-bold">:</div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg p-2 min-w-[2.5rem]">
                <div className="text-sm font-bold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs text-yellow-800 mt-1">MIN</div>
            </div>
            <div className="text-yellow-900 text-lg font-bold">:</div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg p-2 min-w-[2.5rem]">
                <div className="text-sm font-bold">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs text-yellow-800 mt-1">SEC</div>
            </div>
          </div>

          <Button
            variant="outline"
            className="bg-white text-yellow-900 border-yellow-600 hover:bg-yellow-50 w-full"
          >
            Shop Now
          </Button>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-2 rounded-full">
              <Clock className="h-6 w-6 text-yellow-900" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-900">Flash Sale!</h3>
              <p className="text-sm text-yellow-800">Limited time offer</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-center">
              <div className="bg-white text-black rounded-lg p-2 min-w-[3rem]">
                <div className="text-lg font-bold">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs text-yellow-800 mt-1">DAYS</div>
            </div>
            <div className="text-yellow-900 text-xl font-bold">:</div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg p-2 min-w-[3rem]">
                <div className="text-lg font-bold">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs text-yellow-800 mt-1">HOURS</div>
            </div>
            <div className="text-yellow-900 text-xl font-bold">:</div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg p-2 min-w-[3rem]">
                <div className="text-lg font-bold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs text-yellow-800 mt-1">MINS</div>
            </div>
            <div className="text-yellow-900 text-xl font-bold">:</div>
            <div className="text-center">
              <div className="bg-white text-black rounded-lg p-2 min-w-[3rem]">
                <div className="text-lg font-bold">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs text-yellow-800 mt-1">SECS</div>
            </div>
          </div>

          <Button
            variant="outline"
            className="bg-white text-yellow-900 border-yellow-600 hover:bg-yellow-50"
          >
            Shop Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
