export default function LottoButton({ onClick }) {
  console.log(`button 동작`);
  return <button onClick={onClick}>로또 생성기</button>;
}