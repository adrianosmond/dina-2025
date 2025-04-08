import { useEffect, useState } from 'react';
import { thirtyEight } from './constants';
import pixelModeImg from './pixels.png';
import Toggle from './Toggle';

const App = () => {
  const [sceneReady, setSceneReady] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [grayscaleOn, setGrayscaleOn] = useState(false);
  const [contrastOn, setContrastOn] = useState(false);
  const [pixelMode, setPixelMode] = useState(false);
  const [code, setCode] = useState('');
  const binaryCode = code
    .split('')
    .map((char) => (char.charCodeAt(0) - 58).toString(2).padStart(6, '0'))
    .join('')
    .split('')
    .map((c) => parseInt(c, 10));

  const image = thirtyEight.map((v, i) =>
    typeof binaryCode[i] !== 'undefined' ? v ^ binaryCode[i] : v,
  );

  useEffect(() => {
    setSceneReady(true);
  }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'R' && e.ctrlKey) {
        setPixelMode((pm) => !pm);
      }
    };
    document.addEventListener('keyup', handler);

    return () => document.removeEventListener('keyup', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    };

    document.addEventListener('mousemove', handler);

    return () => document.removeEventListener('mousemove', handler);
  }, []);

  useEffect(() => {
    const filters = [];
    if (grayscaleOn) filters.push('grayscale(100%)');
    if (contrastOn) filters.push('contrast(10000%)');
    document.body.style.filter = filters.join(' ');
  }, [grayscaleOn, contrastOn]);

  return (
    <main className="p-4 flex flex-col items-center gap-6 min-h-svh justify-center">
      <div className="flex gap-8 items-center">
        {lightsOn && (
          <p className="w-36 text-slate-400 text-xs break-all opacity-0 hover:opacity-100 shrink">
            ::::@F=]?y=yM[_mcjJrpZrTU:fhvchMn^ivxLAay;:Fs^:;fr:ZnFE:TA;ZmCZr`ZjAyjR[rYV:ZAR:Qv[&lt;&lt;=JmAyrc;j:&gt;iI;h::::Y
          </p>
        )}
        <div className="grid grid-cols-[repeat(25,_minmax(0,_1fr))] shrink-0">
          {image.map((val, i) => (
            <div
              key={i}
              className={`aspect-square w-3 ${val === 0 ? 'bg-black' : 'bg-white'}`}
            />
          ))}
        </div>
        {lightsOn && (
          <p className="w-36 text-slate-400 text-xs break-all opacity-0 hover:opacity-100 shrink">
            ::::GcXU]NiN:nkdZ^UTD:RRSJFhWfxXe`y^AM=td;hGmV:@Vr:]FFFRuO=DU^[hfoJoMTb]sYvJ:AsBG[p_O;r;CVnJ&gt;b::JI\R::::Y
          </p>
        )}
        {pixelMode ? (
          <img
            src={pixelModeImg}
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover"
            style={{
              imageRendering: 'pixelated',
            }}
          />
        ) : (
          <div className="absolute bottom-2 right-2 flex flex-col gap-1">
            <Toggle
              on={grayscaleOn}
              onToggle={() => setGrayscaleOn((s) => !s)}
            />
            <Toggle on={contrastOn} onToggle={() => setContrastOn((s) => !s)} />
            <Toggle on={lightsOn} onToggle={() => setLightsOn((s) => !s)} />
          </div>
        )}
        {!lightsOn && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              ...(sceneReady
                ? {
                    background:
                      'radial-gradient(circle at var(--mouse-x) var(--mouse-y), transparent 0, transparent 100px, black 110px)',
                  }
                : { background: 'black' }),
            }}
          ></div>
        )}
      </div>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border"
      />
    </main>
  );
};

export default App;
