/* eslint-disable react/prop-types */
export default function LogoNiceLook({ className, onPress }) {
  return (
    <span onClick={onPress} className={`font-bold font-[Amaranth] ${className} cursor-pointer`}>
      Nice<span className="text-slate-700">Look</span>
      <span className="text-tulip-tree-400">.</span>
    </span>
  );
}
