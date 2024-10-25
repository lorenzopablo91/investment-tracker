import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <RocketLaunchIcon className="mr-2 h-12 w-12" />
      <p className="text-[24px]">Inversiones</p>
    </div>
  );
}