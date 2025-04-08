import { FC } from 'react';

type Props = {
  on: boolean;
  onToggle: () => void;
};

const Toggle: FC<Props> = ({ on, onToggle }) => (
  <button
    className={`bg-slate-300 rounded-full w-10 h-6 p-1 cursor-pointer flex ${on ? 'justify-end' : 'justify-start'}`}
    onClick={onToggle}
  >
    <div className="w-4 h-4 bg-slate-600 rounded-full" />
  </button>
);

export default Toggle;
